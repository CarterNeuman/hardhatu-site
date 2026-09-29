# HardHatU — site scaffold

This is the first 10% slice: a working Next.js site with the schema, the
design system, SEO basics, and one real example of each content type
(1 career, 5 concepts, 1 phase, 1 lesson with a quiz, 1 software profile),
all cross-linked.

## Running it

You'll need [Node.js](https://nodejs.org) installed (the LTS version — 20 or
22 both work). To check if you already have it, open a terminal in this
folder and run:

```
node -v
```

If that prints a version number, you're set. If it errors, install Node from
nodejs.org first (the default options are fine), then reopen your terminal.

Then, in this folder, run:

```
npm install
npm run dev
```

The first command downloads the project's dependencies (only needs to be run
once, or again later if dependencies change). The second starts the site.
Once it says "Ready", open **http://localhost:3000** in your browser.

To stop the server, click back in the terminal and press Ctrl+C.

## Adding or editing content

Every page on the site is a plain text file in `/content`, organized by
type: `content/careers/`, `content/concepts/`, `content/phases/`,
`content/lessons/`, `content/software/`. Open any existing one as a
template — copy it, change the fields, save it as a new file, and it
becomes a new page automatically the next time the site rebuilds (no code
changes needed).

Software profiles (`content/software/`) are meant to hold the deeper,
in-depth material — key features, real-world uses, and eventually tutorial
videos (`tutorialVideos` in the frontmatter, empty for now) — that's the
actual thing worth paying for later. Every content type has a `tier` field
(`free` or `premium`) already; a `premium` item just shows a small
"Premium" badge today; it isn't gated yet — see "What's deliberately not
built yet" below.

The block between the `---` lines at the top of each file is structured
data (its title, tags, links to other pages, etc.); everything below it
would be free-form body text if you want it, though the current templates
render the structured fields directly.

Before every `npm run build`, a check automatically runs that catches
common mistakes — a missing required field, a broken link to another page,
two pages with the same ID. You can also run it on its own any time:

```
npm run validate
```

If it reports an error, it names the exact file and field to fix.

## What's here

- `app/` — the site's pages and routing (Next.js App Router)
- `content/` — the actual text content, as Markdown files with structured
  frontmatter
- `lib/` — reads and validates content files, matches them to the schema
- `components/` — shared UI pieces (badges, tags, the "Explore next" links,
  the quiz)
- `scripts/validate-content.mjs` — the content integrity check described
  above

## What's deliberately not built yet

Per the build plan: search, Pathways/Programs (the "how to actually get
this job" content), named employer profiles, and the paywall/premium tier
logic. The schema already has room for all of these — they're additions,
not rebuilds, when it's time.

## Deploying

Not needed yet for local preview, but when you're ready to put this on the
internet: push this folder to a GitHub repository, then connect that
repository to [Vercel](https://vercel.com) (their free tier covers this
comfortably) — it builds and deploys automatically, and gives you a preview
link for every future change before it goes live.
