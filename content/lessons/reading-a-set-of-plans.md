---
id: lesson-reading-a-set-of-plans
title: "Reading a Set of Plans"
tier: free
minutes: 14
sections:
  - content: >
      Hand someone new to the industry a full construction drawing set for even a
      modest building, and the reaction is usually the same: a three-inch-thick stack
      of sheets, dozens of unfamiliar symbols, and no idea where to even start looking
      for the answer to a simple question like "how tall is this wall supposed to be."
      The good news is that drawing sets aren't actually random. They follow a
      standardized organization, based on the National CAD Standard, specifically so
      that anyone on a project, from an electrician to a building inspector, can flip
      straight to the right sheet without reading the whole set cover to cover.

      That organization starts with a letter, called a discipline designator, at the
      front of every sheet number. A sheet starting with G is General: cover sheets,
      symbol legends, code summaries. C is Civil, the site and utilities. S is
      Structural, the building's frame and foundation. A is Architectural, the actual
      floor plans, walls, and finishes most people picture when they hear
      "blueprints." M, E, and P cover Mechanical, Electrical, and Plumbing
      respectively. Learn to read that first letter, and you already know which sheets
      to open for almost any question that comes up in the field.

      Sheets are also ordered deliberately, from most general to most specific. The
      General sheets come first because they set context for everything after them;
      Civil comes early because the site itself has to be established before anyone
      can talk about what sits on it; then Structural, Architectural, and the building
      systems follow, roughly in the order a building actually gets assembled,
      foundation up.
    quiz:
      question: On a construction drawing set, what does the letter at the start of a sheet number (like the "S" in "S-201") actually tell you?
      options:
        - Which discipline that sheet belongs to (Structural, Architectural, Mechanical, and so on), following a standardized national convention
        - Which specific architectural firm or engineering consultant on the project actually produced that particular sheet, for internal billing purposes
        - The exact date the sheet was last revised, tracked instead through a separate revision block printed in the corner of each sheet
      answerIndex: 0
      explanation: >
        The discipline designator is one of the most useful things to learn early:
        once you can read that single letter, you can navigate an unfamiliar drawing
        set almost immediately, instead of flipping through dozens of sheets hoping
        to stumble onto the right one.

  - content: >
      After the discipline letter comes the rest of the sheet number, and that follows
      a pattern too. A typical number like A-101 breaks down into the discipline (A,
      Architectural), a digit for the sheet type, commonly 1 for plans, 2 for
      elevations, 3 for sections, 5 for details, and 6 for schedules, and a two-digit
      sequence number. So A-101 is the first architectural floor plan, while A-501
      several pages later is the first sheet of architectural details, the zoomed-in,
      fabrication-level drawings showing exactly how two materials meet at a specific
      point, a window sill, a roof edge, a stair nosing. Learn that pattern, and a
      sheet number alone tells you roughly what you're about to look at before you
      even turn to it.

      It's worth being honest about what a set of plans actually promises and what it
      doesn't. A floor plan, a "1" sheet, shows where things go from directly
      overhead; an elevation, a "2" sheet, shows what a wall or facade looks like from
      the side; a section, a "3" sheet, is a vertical slice straight through the
      building, showing how floors, walls, and roof actually stack on top of each
      other. None of these views alone tells the whole story, which is exactly why a
      competent reader learns to cross-reference: check the plan, then the matching
      section, then the detail it points to, before assuming any single sheet has the
      whole answer.
    quiz:
      question: If you needed to see exactly how a specific window sill was supposed to be built, layer by layer, which kind of sheet would you look for?
      options:
        - A 2-series elevation sheet, since it shows the wall's finished outside appearance in enough detail to work from directly
        - A 1-series plan sheet, since the overhead view it provides already shows roughly where each window sits along the wall
        - A 5-series detail sheet, since details show the zoomed-in, fabrication-level information a plan or elevation doesn't include
      answerIndex: 2
      explanation: >
        Plans and elevations tell you where things are and what they look like from a
        distance; details are where the actual "how it goes together" information
        lives, which is exactly the kind of question a detail sheet exists to answer.

  - content: >
      Here's where a lot of newcomers get surprised: the architect's drawings,
      however detailed, are not actually what most trades build from directly. They
      show design intent, not fabrication instructions. A steel fabricator, for
      instance, takes the architect's structural drawings and produces their own
      [[concept-shop-drawings|shop drawings]], detailed enough to show exact bolt
      patterns, weld types, and connection dimensions the original drawings were never
      meant to include. Someone on the design team then has to catch any mistakes in
      that translation before the steel actually gets fabricated, which is exactly
      what the [[concept-submittal|submittal]] process exists for: review and
      approval by the architect or engineer before anything is ordered or installed.

      On a project of any real size, dozens or hundreds of these submittals move
      through review at once, which is why a
      [[concept-submittal-log|submittal log]] exists as its own tracked document:
      every required submittal, its due date, its current review status, and where it
      sits in the approval cycle. A submittal that quietly sits unreviewed past its
      due date can blow a material's lead time before anyone even notices there's a
      problem, which is exactly the gap an actively maintained log is meant to catch
      early.

      For certain high-visibility or high-risk assemblies, a curtain wall corner, a
      typical hotel room layout, even the submittal process isn't quite enough. That's
      when a [[concept-mock-up|mock-up]] gets built: a full-scale physical sample,
      approved before that same assembly gets repeated across an entire building.
      Catching a problem in one approved sample is far cheaper than discovering the
      same problem after it's been built a hundred times over.
    quiz:
      question: Why does a steel fabricator produce their own shop drawings instead of just building straight from the architect's original drawings?
      options:
        - The architect's drawings show design intent, not fabrication-level detail like exact bolt patterns and connections, which the fabricator has to work out and document themselves
        - Shop drawings are mainly required so the general contractor has a complete paper trail to bill the owner for each fabricated piece
        - Fabricators redraw the architect's sheets at a larger scale purely so the drawings are easier for the field crew to read on site
      answerIndex: 0
      explanation: >
        An architect's drawings communicate what the finished building should be; a
        fabricator still has to figure out and document exactly how their specific
        piece gets built and connected, which is what shop drawings capture.

  - content: >
      Reading a set of plans well matters to more than just the people building from
      them. Before construction can legally start, a local building department
      examines the submitted drawings against the applicable
      [[concept-building-code|building code]], a process called
      [[concept-plan-review|plan review]], checking everything from structural loads
      to fire separation to accessibility. Catching a code problem here, on paper, is
      far cheaper and faster than catching the same problem after it's actually been
      built, which is the entire reason plan review exists as a formal gatekeeping
      step rather than something left to chance later.

      Passing plan review is what actually earns a project its
      [[concept-building-permit|building permit]], the government authorization
      required before most work can legally begin. Because building code isn't one
      uniform national standard, it's a model code adopted and locally amended, the
      specific requirements a set of drawings has to satisfy can genuinely differ from
      one jurisdiction to the next, even for a nearly identical building. In large
      cities with slow-moving, complicated permitting bureaucracies, that's
      specialized enough work that an entire career, the
      [[career-permit-expediter|Permit Expediter]], exists around preparing permit
      applications, tracking them through review, and resolving plan review comments
      so a project can start on schedule instead of stalling in a review queue for
      months.
    quiz:
      question: What is plan review actually checking a set of drawings against?
      options:
        - The applicable building code, catching potential code compliance problems on paper before construction starts
        - The project's total budget and whether the contractor's bid actually matches what the owner agreed to pay for the work
        - Whether the building's design is aesthetically consistent with the surrounding neighborhood, a review usually handled by a separate design review board
      answerIndex: 0
      explanation: >
        Plan review is a code compliance check, not a design critique or a budget
        review. It exists specifically to push the discovery of a code problem as
        early as possible, back when it's still just a line on a drawing instead of a
        completed wall.

  - content: >
      Once construction is actually underway, the plans keep evolving, on purpose.
      Field conditions rarely match a drawing exactly, a wall shifts a few inches
      around an unexpected obstruction, a pipe gets rerouted, and those changes get
      tracked and folded into a final set of
      [[concept-as-built-drawings|as-built drawings]], the record of what actually got
      built rather than just what was originally designed. Years later, when someone
      needs to renovate or repair the building without demolishing a wall just to see
      what's behind it, as-builts are often the only reliable way to know.

      For the work that becomes invisible once it's covered, a structural weld inside
      a column, rebar buried in a concrete pour, drawings alone can't verify anything
      after the fact. That's what [[concept-special-inspection|special inspection]]
      exists for: an independent, qualified third party checking specific critical
      work in the field, in real time, precisely because self-certification isn't
      considered good enough for the work that holds a building up. And increasingly,
      projects coordinate all of this digitally as well as on paper, guided by a
      [[concept-bim-execution-plan|BIM execution plan]] that spells out how a 3D model
      gets built and shared before modeling work even begins, so different trades
      aren't discovering mismatched models only once it's time to coordinate them on
      site.

      Keeping all of this straight, drawing revisions, submittal status, RFI answers,
      is usually a [[career-project-engineer|Project Engineer]]'s first real
      responsibility, and it's precisely why the role is such a common entry point
      into a project management career: nothing teaches you to actually read and
      trust a set of plans faster than being the person everyone asks when two sheets
      seem to disagree.

      If you remember one thing from this lesson, make it this: a set of plans isn't
      one document, it's a coordinated system of general-to-specific sheets, backed up
      by an entire submittal and permitting process designed to catch a mismatch on
      paper instead of in the field. Learn to navigate that system, and a drawing set
      stops being an intimidating stack of paper and starts being the most reliable
      answer available on a job site.
    quiz:
      question: What's the common thread connecting plan review, submittals, and special inspection?
      options:
        - Each one exists to catch a specific kind of mismatch or mistake, on paper or independently verified, before it becomes far more expensive to fix in the finished building
        - They're all steps mainly required on large public projects, with most private commercial work able to skip them without consequence
        - They're all performed by the general contractor's own quality control team, independent of the architect, engineer, or local building department
      answerIndex: 0
      explanation: >
        From code compliance to fabrication accuracy to critical structural work, the
        pattern repeats throughout this lesson: verification that happens before or
        during construction is dramatically cheaper than discovering the same problem
        after the fact.
keyTerms:
  - concept-shop-drawings
  - concept-submittal
  - concept-submittal-log
  - concept-mock-up
  - concept-building-code
  - concept-plan-review
  - concept-building-permit
  - concept-as-built-drawings
  - concept-special-inspection
  - concept-bim-execution-plan
relatedIds:
  - concept-shop-drawings
  - concept-submittal
  - concept-submittal-log
  - concept-mock-up
  - concept-building-code
  - concept-plan-review
  - concept-building-permit
  - concept-as-built-drawings
  - concept-special-inspection
  - concept-bim-execution-plan
  - career-permit-expediter
  - career-project-engineer
  - interview-project-operations
  - exam-cdt
---
