#!/usr/bin/env node
/**
 * Content integrity check.
 *
 * With no database, this script is what stands between "add a markdown
 * file" and a silently broken cross-link somewhere in the spiderweb. It
 * runs automatically before every `npm run build` (see package.json
 * "prebuild") and can also be run on its own via `npm run validate`.
 *
 * Checks:
 *  - every content file has all fields its type requires
 *  - every id is unique across the whole site (not just within one folder)
 *  - every relatedIds entry points at an id that actually exists
 *  - every slug (id with the type prefix stripped) is unique, since that's
 *    the real URL
 *  - every inline wiki-link ([[some-id]] or [[some-id|label]], used in
 *    narrative text so the Prose component can render a clickable link
 *    right where a concept is mentioned) points at an id that actually
 *    exists, and is also reflected in that file's own relatedIds/keyTerms/
 *    conceptIds so the "Explore next" list and inline links never drift
 *    apart — and, for lessons specifically, every keyTerms id is actually
 *    linked somewhere in the lesson body (keyTerms is the checklist of
 *    concepts a lesson promises to surface inline, not just decoration)
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

const TYPE_CONFIG = {
  careers: { type: "career", prefix: "career-", required: ["id", "title", "category", "tagline", "whatIs"] },
  concepts: {
    type: "concept",
    prefix: "concept-",
    // careerAngle/whatGoesWrong are the two fields that are supposed to
    // make a concept page worth more than a Google definition — required,
    // no exceptions, for every concept on the site.
    required: ["id", "title", "category", "definition", "careerAngle", "whatGoesWrong"],
  },
  phases: { type: "phase", prefix: "phase-", required: ["id", "title", "order", "whatHappens"] },
  lessons: { type: "lesson", prefix: "lesson-", required: ["id", "title", "minutes", "sections"] },
  software: {
    type: "software",
    prefix: "software-",
    required: ["id", "title", "category", "whatItIs", "whatItDoes"],
  },
  pathways: {
    type: "pathway",
    prefix: "pathway-",
    required: ["id", "title", "category", "careerId", "tagline", "lessonIds"],
  },
  resumes: {
    type: "resume",
    prefix: "resume-",
    required: ["id", "title", "tagline", "sections"],
  },
  interviews: {
    type: "interview",
    prefix: "interview-",
    required: ["id", "title", "tagline", "questions"],
  },
  exams: {
    type: "exam",
    prefix: "exam-",
    // "questions" is deliberately not required here — a comingSoon: true
    // placeholder is allowed to have none yet. The structural check below
    // enforces the real 5-question minimum once comingSoon is false.
    required: ["id", "title", "examName", "tagline"],
  },
  cheatsheets: {
    type: "cheatsheet",
    prefix: "cheatsheet-",
    required: ["id", "title", "tagline", "conceptIds"],
  },
  quizzes: {
    type: "quiz",
    prefix: "quiz-",
    required: ["id", "title", "tagline", "questions"],
  },
  programs: {
    type: "program",
    prefix: "program-",
    required: ["id", "title", "programType", "organization", "location", "tagline"],
  },
};

let errors = [];
let warnings = [];
const allIds = new Map(); // id -> file path
const allSlugs = new Map(); // slug -> file path

const entries = [];

// Matches [[some-id]] or [[some-id|display text]] anywhere in a string.
const WIKI_LINK_RE = /\[\[([a-z0-9-]+)(?:\|[^\]]+)?\]\]/g;

// Walks any frontmatter value (or the raw markdown body) looking for
// wiki-links, recording where each one was found for error messages.
function collectWikiLinks(value, pathLabel, out) {
  if (typeof value === "string") {
    WIKI_LINK_RE.lastIndex = 0;
    let m;
    while ((m = WIKI_LINK_RE.exec(value)) !== null) {
      out.push({ id: m[1], pathLabel });
    }
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => collectWikiLinks(v, `${pathLabel}[${i}]`, out));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      collectWikiLinks(v, pathLabel ? `${pathLabel}.${k}` : k, out);
    }
  }
}

for (const [dir, config] of Object.entries(TYPE_CONFIG)) {
  const dirPath = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(dirPath)) continue;

  for (const filename of fs.readdirSync(dirPath)) {
    if (!filename.endsWith(".md")) continue;
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(path.join(dirPath, filename), "utf8");
    let data, body;
    try {
      ({ data, content: body } = matter(raw));
    } catch (e) {
      errors.push(`${filePath}: could not parse frontmatter (${e.message})`);
      continue;
    }

    for (const field of config.required) {
      if (data[field] === undefined || data[field] === null || data[field] === "") {
        errors.push(`${filePath}: missing required field "${field}"`);
      }
    }

    if (config.type === "lesson" && Array.isArray(data.sections)) {
      if (data.sections.length === 0) {
        errors.push(`${filePath}: sections is empty — a lesson needs at least one`);
      }
      data.sections.forEach((section, i) => {
        if (!section.content) {
          errors.push(`${filePath}: sections[${i}] is missing "content"`);
        }
        if (section.quiz) {
          if (!Array.isArray(section.quiz.options) || section.quiz.options.length < 2) {
            errors.push(`${filePath}: sections[${i}].quiz needs at least 2 options`);
          } else if (
            typeof section.quiz.answerIndex !== "number" ||
            section.quiz.answerIndex < 0 ||
            section.quiz.answerIndex >= section.quiz.options.length
          ) {
            errors.push(`${filePath}: sections[${i}].quiz.answerIndex is out of range for its options`);
          }
        }
      });
    }

    if (config.type === "software" && Array.isArray(data.tutorialVideos)) {
      data.tutorialVideos.forEach((video, i) => {
        if (!video.title || !video.url) {
          errors.push(`${filePath}: tutorialVideos[${i}] needs both "title" and "url"`);
        }
      });
    }

    if (config.type === "pathway" && Array.isArray(data.lessonIds)) {
      if (data.lessonIds.length < 5) {
        errors.push(
          `${filePath}: lessonIds has ${data.lessonIds.length}, needs at least 5 — a pathway should be a real course`
        );
      }
    }

    if (config.type === "resume" && Array.isArray(data.sections)) {
      if (data.sections.length === 0) {
        errors.push(`${filePath}: sections is empty — a resume guide needs at least one`);
      }
      data.sections.forEach((section, i) => {
        if (!section.heading || !section.content) {
          errors.push(`${filePath}: sections[${i}] needs both "heading" and "content"`);
        }
      });
    }

    if (config.type === "interview" && Array.isArray(data.questions)) {
      if (data.questions.length === 0) {
        errors.push(`${filePath}: questions is empty — an interview guide needs at least one`);
      }
      data.questions.forEach((q, i) => {
        if (!q.question) {
          errors.push(`${filePath}: questions[${i}] is missing "question"`);
        }
      });
    }

    if (config.type === "exam") {
      const isComingSoon = data.comingSoon === true;
      const questions = Array.isArray(data.questions) ? data.questions : [];
      if (!isComingSoon && questions.length < 5) {
        errors.push(
          `${filePath}: questions has ${questions.length}, needs at least 5 — an exam prep needs a real question bank (or set comingSoon: true while it's still a placeholder)`
        );
      }
      questions.forEach((q, i) => {
        if (!Array.isArray(q.options) || q.options.length < 2) {
          errors.push(`${filePath}: questions[${i}] needs at least 2 options`);
        } else if (
          typeof q.answerIndex !== "number" ||
          q.answerIndex < 0 ||
          q.answerIndex >= q.options.length
        ) {
          errors.push(`${filePath}: questions[${i}].answerIndex is out of range for its options`);
        }
      });
    }

    if (config.type === "cheatsheet" && Array.isArray(data.conceptIds)) {
      if (data.conceptIds.length === 0) {
        errors.push(`${filePath}: conceptIds is empty — a cheat sheet needs at least one`);
      }
    }

    if (config.type === "quiz" && Array.isArray(data.questions)) {
      if (data.questions.length < 3) {
        errors.push(
          `${filePath}: questions has ${data.questions.length}, needs at least 3 — a match quiz needs enough signal to point somewhere useful`
        );
      }
      data.questions.forEach((q, i) => {
        if (!Array.isArray(q.options) || q.options.length < 2) {
          errors.push(`${filePath}: questions[${i}] needs at least 2 options`);
        }
      });
    }

    if (data.id) {
      if (!data.id.startsWith(config.prefix)) {
        warnings.push(
          `${filePath}: id "${data.id}" doesn't start with expected prefix "${config.prefix}"`
        );
      }
      if (allIds.has(data.id)) {
        errors.push(`${filePath}: duplicate id "${data.id}" (also used by ${allIds.get(data.id)})`);
      } else {
        allIds.set(data.id, filePath);
      }

      const slug = data.id.startsWith(config.prefix) ? data.id.slice(config.prefix.length) : data.id;
      const slugKey = `${config.type}:${slug}`;
      if (allSlugs.has(slugKey)) {
        errors.push(`${filePath}: duplicate URL /${dir}/${slug} (also used by ${allSlugs.get(slugKey)})`);
      } else {
        allSlugs.set(slugKey, filePath);
      }
    }

    entries.push({ filePath, data, body });
  }
}

// Second pass: cross-references can only be checked once every id is known.
for (const { filePath, data, body } of entries) {
  const relatedIds = Array.isArray(data.relatedIds) ? data.relatedIds : [];
  for (const relatedId of relatedIds) {
    if (!allIds.has(relatedId)) {
      errors.push(`${filePath}: relatedIds references unknown id "${relatedId}"`);
    }
  }

  if (data.careerId && !allIds.has(data.careerId)) {
    errors.push(`${filePath}: careerId references unknown id "${data.careerId}"`);
  }

  const lessonIds = Array.isArray(data.lessonIds) ? data.lessonIds : [];
  for (const lessonId of lessonIds) {
    if (!allIds.has(lessonId)) {
      errors.push(`${filePath}: lessonIds references unknown id "${lessonId}"`);
    }
  }

  const keyConcepts = Array.isArray(data.keyConcepts) ? data.keyConcepts : [];
  for (const conceptId of keyConcepts) {
    if (!allIds.has(conceptId)) {
      errors.push(`${filePath}: keyConcepts references unknown id "${conceptId}"`);
    }
  }

  const careerIds = Array.isArray(data.careerIds) ? data.careerIds : [];
  for (const careerId of careerIds) {
    if (!allIds.has(careerId)) {
      errors.push(`${filePath}: careerIds references unknown id "${careerId}"`);
    }
  }

  const conceptIds = Array.isArray(data.conceptIds) ? data.conceptIds : [];
  for (const conceptId of conceptIds) {
    if (!allIds.has(conceptId)) {
      errors.push(`${filePath}: conceptIds references unknown id "${conceptId}"`);
    }
  }

  const quizQuestions = Array.isArray(data.questions) ? data.questions : [];
  quizQuestions.forEach((q, i) => {
    const options = Array.isArray(q.options) ? q.options : [];
    options.forEach((opt, j) => {
      const pointsToCareerIds = Array.isArray(opt.pointsToCareerIds) ? opt.pointsToCareerIds : [];
      for (const careerId of pointsToCareerIds) {
        if (!allIds.has(careerId)) {
          errors.push(
            `${filePath}: questions[${i}].options[${j}].pointsToCareerIds references unknown id "${careerId}"`
          );
        }
      }
    });
  });

  // Inline wiki-links ([[id]] / [[id|label]]) in frontmatter narrative
  // fields and in the markdown body — these are what Prose.tsx turns into
  // clickable links right inside a lesson/phase/interview's example text.
  const wikiLinks = [];
  collectWikiLinks(data, "", wikiLinks);
  if (body) collectWikiLinks(body, "body", wikiLinks);

  const declaredIds = new Set([
    ...relatedIds,
    ...keyConcepts,
    ...conceptIds,
    ...careerIds,
    ...lessonIds,
    ...(data.careerId ? [data.careerId] : []),
  ]);

  const linkedIds = new Set();
  for (const { id, pathLabel } of wikiLinks) {
    if (!allIds.has(id)) {
      errors.push(`${filePath}: ${pathLabel} has a wiki-link [[${id}]] that references unknown id "${id}"`);
      continue;
    }
    linkedIds.add(id);
    if (!declaredIds.has(id)) {
      warnings.push(
        `${filePath}: ${pathLabel} wiki-links "${id}" but it isn't in relatedIds (or keyConcepts/conceptIds) — add it so "Explore next" and the inline link stay in sync`
      );
    }
  }

  // keyTerms is the lesson's own checklist of concepts it promises to
  // surface inline — a term listed there that's never actually wiki-linked
  // in the body is a broken promise, not just a missed nice-to-have.
  const keyTerms = Array.isArray(data.keyTerms) ? data.keyTerms : [];
  for (const term of keyTerms) {
    if (!allIds.has(term)) {
      errors.push(`${filePath}: keyTerms references unknown id "${term}"`);
    } else if (!linkedIds.has(term)) {
      errors.push(
        `${filePath}: keyTerms lists "${term}" but it's never wiki-linked ([[${term}]]) anywhere in the lesson body`
      );
    }
  }
}

console.log(`Checked ${entries.length} content file(s).`);

if (warnings.length > 0) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  - ${w}`);
}

if (errors.length > 0) {
  console.error(`\n${errors.length} error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error("\nFix the above before building — a broken relatedIds link fails silently otherwise.");
  process.exit(1);
}

console.log("Content OK — every link resolves, every required field is filled in.");
