---
id: quiz-find-your-career
title: "Find Your Career Match"
tier: free
tagline: "A few honest questions about your background and what actually interests you, matched to real careers, not just a category."
metaDescription: "An 8-question quiz that matches your background and interests to specific construction careers, not just a broad category."
relatedIds:
  - career-electrician
  - career-superintendent
  - career-estimator
questions:
  - question: "What did you study, or are you studying now?"
    options:
      - label: "A trade or vocational program, like welding, electrical, HVAC, or automotive"
        pointsToCategories: ["Field & Trades"]
        pointsToCareerIds: ["career-electrician", "career-plumber", "career-hvac-technician", "career-welder"]
      - label: "Business, finance, or accounting"
        pointsToCategories: ["Business"]
        pointsToCareerIds: ["career-construction-accountant", "career-contracts-administrator", "career-procurement-manager"]
      - label: "Engineering, architecture, computer science, or another technical field"
        pointsToCategories: ["Technology & Design"]
        pointsToCareerIds: ["career-bim-vdc-specialist", "career-cad-technician", "career-surveyor", "career-construction-data-analyst"]
      - label: "Nothing specific to any of these, or I'm in school for something unrelated"
        pointsToCategories: ["Project & Operations"]
        pointsToCareerIds: ["career-project-engineer", "career-assistant-project-manager", "career-laborer"]
      - label: "Nothing formal — whatever I know, I've picked up through work, family, or figuring things out myself"
        pointsToCategories: ["Field & Trades"]
        pointsToCareerIds: ["career-laborer", "career-equipment-operator", "career-concrete-worker"]
  - question: "Forget what you studied for a second. Which of these actually sounds like you?"
    options:
      - label: "I want to build or fix something real with my hands"
        pointsToCategories: ["Field & Trades"]
        pointsToCareerIds: ["career-carpenter", "career-mason", "career-laborer", "career-concrete-worker"]
      - label: "I want to be the person everyone comes to when something needs organizing"
        pointsToCategories: ["Project & Operations"]
        pointsToCareerIds: ["career-superintendent", "career-project-manager", "career-assistant-project-manager"]
      - label: "I want to work with numbers and figure out what things should cost"
        pointsToCategories: ["Preconstruction & Estimating"]
        pointsToCareerIds: ["career-estimator", "career-cost-engineer"]
      - label: "I want to use technology and data to solve real problems"
        pointsToCategories: ["Technology & Design"]
        pointsToCareerIds: ["career-construction-data-analyst", "career-bim-vdc-specialist"]
  - question: "Something goes wrong on a project. What's your instinct?"
    options:
      - label: "Get in there and actually fix the problem"
        pointsToCategories: ["Field & Trades"]
        pointsToCareerIds: ["career-electrician", "career-plumber", "career-hvac-technician"]
      - label: "Figure out who's responsible and what it'll cost to make right"
        pointsToCategories: ["Insurance & Claims"]
        pointsToCareerIds: ["career-insurance-adjuster", "career-public-adjuster"]
      - label: "Get the schedule back on track before it slips further"
        pointsToCategories: ["Project & Operations"]
        pointsToCareerIds: ["career-scheduler", "career-superintendent"]
      - label: "Rework the budget to absorb the change"
        pointsToCategories: ["Preconstruction & Estimating"]
        pointsToCareerIds: ["career-cost-engineer", "career-estimator"]
  - question: "Which work environment actually sounds good to you?"
    options:
      - label: "Outdoors, on a job site, something different every day"
        pointsToCategories: ["Field & Trades"]
        pointsToCareerIds: ["career-equipment-operator", "career-roofer", "career-ironworker", "career-painter"]
      - label: "An office most days, but out visiting sites regularly"
        pointsToCategories: ["Project & Operations"]
        pointsToCareerIds: ["career-project-manager", "career-quality-control-manager", "career-safety-manager"]
      - label: "Mostly an office or remote, working through data and reports"
        pointsToCategories: ["Technology & Design"]
        pointsToCareerIds: ["career-construction-data-analyst", "career-bim-vdc-specialist"]
      - label: "A mix, meeting clients, visiting sites, and working from an office depending on the day"
        pointsToCategories: ["Consultants & Advisory"]
        pointsToCareerIds: ["career-construction-consultant", "career-scheduling-delay-consultant"]
  - question: "Which part of a project would you actually find interesting to work on?"
    options:
      - label: "Making sure an older building gets restored the right way, not just the fast way"
        pointsToCategories: ["Specialized Construction"]
        pointsToCareerIds: ["career-restoration-project-manager", "career-facilities-manager"]
      - label: "Negotiating the contract that decides who's on the hook if something goes wrong"
        pointsToCategories: ["Business"]
        pointsToCareerIds: ["career-contracts-administrator", "career-procurement-manager"]
      - label: "Using drone footage or a 3D model to catch a problem before it costs real money"
        pointsToCategories: ["Technology & Design"]
        pointsToCareerIds: ["career-drone-uav-specialist", "career-bim-vdc-specialist"]
      - label: "Digging into the numbers to figure out exactly what a job should cost"
        pointsToCategories: ["Preconstruction & Estimating"]
        pointsToCareerIds: ["career-cost-engineer", "career-quantity-surveyor"]
  - question: "A major storm just hit a neighborhood. What job would you want in the aftermath?"
    options:
      - label: "Going door to door assessing what got damaged and what it's actually worth"
        pointsToCategories: ["Insurance & Claims"]
        pointsToCareerIds: ["career-insurance-adjuster", "career-public-adjuster"]
      - label: "Managing the crews actually doing the rebuild"
        pointsToCategories: ["Specialized Construction"]
        pointsToCareerIds: ["career-restoration-project-manager"]
      - label: "Being the expert called in when the homeowner and the insurance company disagree"
        pointsToCategories: ["Consultants & Advisory"]
        pointsToCareerIds: ["career-construction-claims-consultant"]
      - label: "Making sure everyone descending on the area actually gets paid and has a valid contract"
        pointsToCategories: ["Business"]
        pointsToCareerIds: ["career-contracts-administrator", "career-hr-manager-construction"]
  - question: "Which of these skills would you most want to be known for?"
    options:
      - label: "Handling hazardous materials safely, the job nobody else wants to do"
        pointsToCategories: ["Specialized Construction"]
        pointsToCareerIds: ["career-environmental-remediation-specialist"]
      - label: "Reading a contract closely enough to catch the one clause that actually matters"
        pointsToCategories: ["Business"]
        pointsToCareerIds: ["career-contracts-administrator"]
      - label: "Explaining clearly, under pressure, what actually caused a construction failure"
        pointsToCategories: ["Consultants & Advisory"]
        pointsToCareerIds: ["career-expert-witness-construction-litigation"]
      - label: "Fighting for a fair settlement on someone's behalf after a loss"
        pointsToCategories: ["Insurance & Claims"]
        pointsToCareerIds: ["career-public-adjuster", "career-insurance-adjuster"]
  - question: "Last one. Which of these would you actually want to picture yourself doing?"
    options:
      - label: "Managing a building through years of real use after construction wraps up"
        pointsToCategories: ["Specialized Construction"]
        pointsToCareerIds: ["career-facilities-manager", "career-owners-representative"]
      - label: "Being the person people call before they sign anything, to make sure it's actually a good deal"
        pointsToCategories: ["Consultants & Advisory"]
        pointsToCareerIds: ["career-construction-consultant"]
      - label: "Making sure a damaged home gets back to code, and back to normal, for the people living there"
        pointsToCategories: ["Insurance & Claims"]
        pointsToCareerIds: ["career-insurance-restoration-estimator"]
      - label: "Reviewing a set of drawings and catching a measurement that's off before it becomes an expensive mistake"
        pointsToCategories: ["Preconstruction & Estimating"]
        pointsToCareerIds: ["career-quantity-surveyor", "career-senior-estimator"]
---
Eight questions built to feel like real self-assessment, not a personality quiz. The first two are deliberately plain: what you actually studied (or are studying), and what genuinely interests you, since those two answers don't always point the same direction, and that gap is useful signal on its own. The remaining six are built around real project scenarios and specific tasks rather than headlines, superpowers, or documentaries, so answering them feels like picturing an actual workday, not guessing what a quiz wants to hear.

Every answer counts toward both a broad category and a handful of specific careers within it, so the result isn't just "you're a Field & Trades person," it's a short list of specific careers your actual answers pointed toward, falling back to other careers in your best-fit category only if your answers didn't produce enough specific signal on their own.
