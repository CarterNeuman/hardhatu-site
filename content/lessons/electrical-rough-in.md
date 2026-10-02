---
id: lesson-electrical-rough-in
title: "Wiring a Building Before the Walls Close Up"
tier: free
sections:
  - content: >
      By the time the [[career-electrician|electrician]] starts
      [[concept-rough-in-electrical|electrical rough-in]], the framers have
      already left and the plumbing and HVAC crews are fighting for the same
      wall cavities and ceiling space. Rough-in means running everything that
      has to be inside the walls before drywall closes them up for good:
      boxes, conduit or cable, and the wire itself. Nothing gets a cover
      plate, a switch, or a light fixture yet, that comes later, after the
      walls are finished, in a phase called
      [[concept-electrical-trim-out|trim-out]]. The whole point of rough-in is
      to get every run in place and inspected while a mistake still just means
      pulling more wire, not cutting open a finished wall.
    quiz:
      question: "What is the main goal of the electrical rough-in phase?"
      options:
        - "Install the light fixtures, switch plates, and cover plates that will be visible on the finished wall once drywall and paint are complete"
        - "Connect the building's wiring to the utility's permanent power meter so the site can run off full power instead of a temporary construction feed"
        - "Get boxes, conduit or cable, and wire in place before drywall closes the walls"
      answerIndex: 2
      explanation: >
        Rough-in places the boxes and wiring inside open walls. Fixtures,
        switches, and cover plates are installed later during trim-out,
        after drywall is finished.
  - content: >
      The first physical task is setting the boxes, the plastic or metal
      enclosures nailed or screwed to studs everywhere a switch, outlet, or
      fixture will eventually go. Box placement follows the electrical
      drawings, but the electrician still has to resolve real conflicts on the
      wall: a box can't land where a stud brace or a duct from HVAC rough-in
      already sits. Every box also has a limit on how many wires can legally
      terminate inside it, called [[concept-electrical-box-fill|box fill]].
      [[concept-national-electrical-code|The National Electrical Code]]
      assigns a cubic-inch volume allowance per conductor size, and a box
      crammed with more wire than its fill allowance permits is a code
      violation, because overstuffed conductors trap heat against their own
      insulation and leave too little room to safely splice, bend, or
      terminate a wire without nicking its insulation. A box that will need
      six conductors has to be sized for six conductors from the start, not
      patched later by swapping in a bigger box after the wall is already
      closed.
    quiz:
      question: "Why does the electrical code set a box fill limit?"
      options:
        - "To prevent too many conductors from being crammed into a box, where overcrowding traps heat against the wire's own insulation and leaves no room to safely splice it"
        - "To give the inspector a simpler count to verify on site, since box fill is mostly a paperwork checklist rather than a safety-driven limit"
        - "To limit how many expensive junction boxes a contractor has to buy and install across the whole job, keeping the overall material cost down"
      answerIndex: 0
      explanation: >
        Box fill limits exist for heat dissipation and safe handling. A
        box with more conductors than its rated volume allows traps heat
        against the wire insulation and leaves too little room to safely
        splice or terminate a conductor without damaging it.
  - content: >
      Once boxes are set, the electrician runs the actual wiring between them,
      either [[concept-conduit|conduit]] with individual conductors pulled
      through afterward, or
      [[concept-nm-cable|NM cable (nonmetallic sheathed cable, commonly known by the brand name Romex)]],
      which already has its conductors bundled inside a single jacket. Conduit
      is standard on commercial jobs because it lets the electrician replace
      or add wire later without opening a wall, and it's required in exposed
      locations where cable would be vulnerable to damage. Residential work
      leans on NM cable because it's faster to install and the walls are
      rarely reopened once finished. Either way, the electrician is also
      leaving
      [[concept-service-loop|service loops, extra slack coiled behind each box]],
      so a future repair or a reconnection after drywall doesn't come up a few
      inches short.
    quiz:
      question: "Why is conduit more common than NM cable on commercial jobs?"
      options:
        - "Conduit uses thinner, less expensive wire than NM cable, so the material cost alone makes it the standard choice on most commercial jobs"
        - "NM cable is legal in commercial buildings but slows down inspections so much that most commercial electricians avoid specifying it on anything but small jobs"
        - "Conduit lets an electrician pull out old conductors or add new ones later, as the building's electrical loads change, without ever having to open a finished wall"
      answerIndex: 2
      explanation: >
        Conduit's main advantage is future flexibility. Conductors can be
        pulled out and replaced, or new ones added, through conduit that
        stays in place, which commercial buildings value given how often
        their electrical loads change over time.
  - content: >
      Rough-in is also where the code decides which rooms get extra
      protection, built on top of the building's
      [[concept-grounding-bonding|grounding and bonding]] system, and the
      rules for two very different devices often get confused. A
      [[concept-gfci|GFCI (ground-fault circuit interrupter)]] protects people
      from shock by shutting the circuit off in a fraction of a second if
      current starts leaking to ground, so it's required anywhere water is
      likely: bathrooms, garages, outdoor outlets, kitchen countertop
      receptacles, and anywhere within six feet of a sink or tub. An
      [[concept-afci|AFCI (arc-fault circuit interrupter)]] instead protects
      against fire by detecting the electrical signature of a dangerous arc,
      like a nail through a cable inside a wall, and it's required in the
      rooms people actually live in, bedrooms, living rooms, family rooms, and
      similar spaces under the National Electrical Code. The gotcha that trips
      up a lot of new electricians: a kitchen needs both, GFCI protection on
      its countertop receptacles for shock, and AFCI protection on its general
      lighting and other circuits for fire, because the code is protecting
      against two different hazards on two different circuits in the same
      room.
    quiz:
      question: "Why does a kitchen typically require both GFCI and AFCI protection?"
      options:
        - "GFCI and AFCI both protect against the same arc-fault hazard, just using two different detection methods built into the same type of breaker"
        - "AFCI protection is required on a kitchen's countertop receptacles specifically, while GFCI protection covers the kitchen's general lighting and other circuits instead"
        - "GFCI protects against shock near water and AFCI protects against arc fires, and a kitchen has both risks on different circuits"
      answerIndex: 2
      explanation: >
        GFCI and AFCI guard against different hazards. A kitchen's
        countertop receptacles sit near water, so they need GFCI, while its
        general circuits run through walls where an arc fault could start a
        fire, so those need AFCI. The two protections apply to different
        circuits in the same room.
  - content: >
      Every circuit roughed in eventually lands back at the building's
      [[concept-panel-board|panel board]], where the branch circuits split
      off from the main electrical service, and that's part of why rough-in
      gets inspected before anything is buried behind drywall. This is also
      the moment the electrician resolves conflicts with other trades still
      working the same walls: if a duct ends up exactly where a switch box
      needs to sit, that gets flagged and relocated now, while moving a box
      is a ten-minute fix instead of a demolition job. The electrician
      documents the final box and circuit layout so it matches the
      as-built drawings, because six months after drywall goes up, the only
      record of what's actually inside that wall is the paperwork from this
      inspection. Get electrical rough-in wrong and signed off, and the fix
      later means cutting open a finished, painted wall to get at it, which
      is exactly the kind of expensive rework the whole rough-in phase
      exists to prevent. For how the trades in this lesson connect into the
      larger sequence of a project, see
      [[lesson-building-sequence|Who Builds in What Order]], and see the
      [[interview-field-trades|field trades interview guide]] if electrical
      work interests you as a career.
    quiz:
      question: "Why does electrical rough-in happen before drywall is installed?"
      options:
        - "A conflict or mistake caught now costs a small fix, while the same mistake found after drywall means cutting open a finished wall"
        - "The electrical code requires every run to be visually inspected while still exposed, a formality that has to happen regardless of when the mistake would actually be found"
        - "Rough-in happens before drywall mainly to keep the electrician's schedule from overlapping with the drywall crew's own schedule on the same floor"
      answerIndex: 0
      explanation: >
        Rough-in's whole value is catching problems while walls are still
        open. A box in the wrong spot or a code violation found during
        rough-in inspection is a quick correction, but the same issue
        discovered after drywall means demolition and repair.
keyTerms:
  - concept-rough-in-electrical
  - concept-conduit
  - concept-grounding-bonding
  - concept-panel-board
  - concept-electrical-trim-out
  - concept-electrical-box-fill
  - concept-national-electrical-code
  - concept-nm-cable
  - concept-service-loop
  - concept-gfci
  - concept-afci
relatedIds:
  - concept-rough-in-electrical
  - concept-conduit
  - concept-grounding-bonding
  - concept-panel-board
  - career-electrician
  - interview-field-trades
  - lesson-building-sequence
  - concept-electrical-trim-out
  - concept-electrical-box-fill
  - concept-national-electrical-code
  - concept-nm-cable
  - concept-service-loop
  - concept-gfci
  - concept-afci
minutes: 13
---
