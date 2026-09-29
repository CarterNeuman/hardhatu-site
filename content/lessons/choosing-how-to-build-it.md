---
id: lesson-choosing-how-to-build-it
title: "Choosing How to Build It"
tier: free
minutes: 14
sections:
  - content: >
      An owner sitting down to plan a new medical office building faces a decision
      most people never realize gets made this early: not what the building looks
      like, but how the whole project gets structured. Before an architect is even
      hired, before a single bid goes out, the owner has to choose a project delivery
      method, and that one choice quietly determines who's liable for what, how much
      price certainty the owner gets, and how fast the project can realistically move.

      The traditional default is [[concept-design-bid-build|Design-Bid-Build]]: the
      owner hires an architect to complete the design first, bids that finished
      design out to general contractors, and then hires the winning contractor to
      build it, three separate, sequential contracts rather than one combined one.
      It's still the most common method precisely because the design is fully
      finished before pricing starts, giving the owner real price certainty from a
      competitive bid. The tradeoff is time: nothing about construction can start
      until design is completely done, stretching the overall schedule longer than
      faster-moving alternatives.
    quiz:
      question: Under Design-Bid-Build, why does the owner typically get more price certainty than under faster delivery methods?
      options:
        - Design-Bid-Build always uses the cheapest contractors available
        - The design is fully complete before contractors bid on it, so the bid reflects a known, finished scope rather than an estimate against an unfinished design
        - Design-Bid-Build contracts are legally required to include a price guarantee
      answerIndex: 1
      explanation: >
        Price certainty here comes from sequencing, not a legal requirement. A
        contractor bidding on a finished design is pricing something known, not
        guessing at something still being figured out.

  - content: >
      That sequential structure has a real consequence beyond just timeline. Under
      Design-Bid-Build, the architect and the general contractor each hold a separate
      contract with the owner, and each is liable to the owner only for their own
      piece: a design error is the architect's problem, a construction defect is the
      contractor's, and when something goes wrong at the boundary between the two,
      whose drawing was ambiguous, whose installation didn't match the intent, the
      owner can end up mediating a dispute between two parties who each have every
      incentive to point at the other.

      [[concept-design-build|Design-Build]] exists partly to close that gap. A single
      design-builder holds one contract covering both design and construction, which
      means the owner has exactly one party liable, for the whole result, not two
      parties each defending their own half. That single point of accountability can
      genuinely speed up delivery, since design and construction can overlap instead
      of waiting on each other in sequence, but it also means the owner gives up the
      built-in check of an independent architect reviewing the contractor's work on
      their behalf.
    quiz:
      question: >
        Under Design-Bid-Build, if a construction problem turns out to trace back to
        an ambiguous detail in the architect's drawings, who is actually on the hook?
      options:
        - It depends, and figuring out whether it was a design error or a construction error is exactly the kind of dispute Design-Bid-Build's separate contracts can create between the architect and the GC
        - The general contractor automatically, regardless of the cause
        - Neither party; the owner absorbs all such costs under Design-Bid-Build by default
      answerIndex: 0
      explanation: >
        This is exactly the seam Design-Bid-Build creates: two separately liable
        parties, each only on the hook for their own piece, with real potential for
        disagreement about which piece actually caused the problem.

  - content: >
      A third structure tries to blend the two. Under [[concept-cm-at-risk|CM at Risk]],
      a construction manager gets hired early, during design, purely to
      provide cost estimating and constructability input, essentially the
      design-build advantage of early contractor involvement, while the owner still
      hires the architect separately, keeping the independent design check
      Design-Build gives up. Once design is far enough along, that same CM converts
      into the general contractor, taking on the job at a
      [[concept-guaranteed-maximum-price|Guaranteed Maximum Price (GMP)]], a cost
      ceiling they now guarantee, at risk, meaning any cost beyond that ceiling comes
      out of their own margin rather than the owner's pocket.

      There's a real catch worth understanding here: a GMP set before the design is
      actually complete is really a guess dressed up as a guarantee. If real gaps
      remain in the design at the moment the GMP locks in, those gaps become the
      contractor's financial problem to absorb, which is exactly why a CM's early
      cost input during design matters so much, it's their best chance to catch a gap
      before it becomes their own liability.
    quiz:
      question: Why does it matter whether a CM at Risk's GMP gets set before or after the design is actually complete?
      options:
        - It doesn't matter; a GMP means the same thing regardless of design completeness
        - A GMP locked in against an incomplete design is essentially a guess; any real gaps left in the design become the contractor's financial risk to absorb once that price is guaranteed
        - A GMP fixes the total price no matter how incomplete the design is, so the contractor takes on zero extra risk either way
      answerIndex: 1
      explanation: >
        The earlier and more incomplete the design when a GMP locks in, the more
        risk the contractor is silently absorbing. That's exactly why a CM's early
        involvement during design is treated as so valuable.

  - content: >
      It's worth untangling a common point of confusion here: delivery method and
      contract pricing type are two different decisions, not one. Delivery method
      decides who holds which contract and when, Design-Bid-Build, Design-Build, CM
      at Risk. Contract pricing type decides how the risk of cost overruns actually
      gets split between the owner and the contractor, regardless of which delivery
      method got chosen. A [[concept-lump-sum-contract|lump sum contract]] has the
      contractor agree to one fixed total price for a defined scope, putting the risk
      of an inaccurate estimate on the contractor. A
      [[concept-cost-plus-contract|cost-plus contract]] instead has the owner pay
      actual documented costs plus a fee, shifting that risk onto the owner instead,
      often used when the scope genuinely isn't fully defined yet or speed matters
      more than price certainty. A GMP, as it happens, is really a cost-plus contract
      with a ceiling attached: the owner gets cost-plus flexibility up to a point, and
      the contractor absorbs anything past it.

      A handful of further variations exist for specific situations.
      [[concept-integrated-project-delivery|Integrated Project Delivery]] has the
      owner, architect, and key contractors sign one shared multi-party contract with
      pooled risk and reward, explicitly designed to remove the adversarial
      incentives Design-Bid-Build can create.
      [[concept-bridging-delivery-method|Bridging]] splits the difference on design
      control: an owner-hired designer develops the project partway, then a
      design-build team takes it the rest of the way. And on the ownership side, some
      owners skip a single general contractor altogether through
      [[concept-multiple-prime-contracting|multiple prime contracting]], contracting
      directly with several primes and taking on the coordination burden themselves.
    quiz:
      question: What's the actual difference between a project's delivery method and its contract pricing type?
      options:
        - They're the same decision described two different ways
        - Delivery method determines who holds which contract and when (Design-Bid-Build, Design-Build, CM at Risk); pricing type determines how cost-overrun risk is split between owner and contractor (lump sum, cost-plus), and the two are chosen somewhat independently
        - Pricing type only applies to Design-Bid-Build projects
      answerIndex: 1
      explanation: >
        Newcomers often collapse these into one decision. They're actually two
        separate axes: one about contract structure and sequencing, the other about
        who absorbs the risk of costs running over.

  - content: >
      Go back to that medical office owner. There's no universally "best" delivery
      method, only a best fit for what that specific owner actually needs most:
      Design-Bid-Build for maximum price certainty and a fully baked design before
      committing; Design-Build for speed and a single point of accountability; CM at
      Risk for an owner who wants early cost feedback but isn't ready to give up an
      independent architect. Every one of these tradeoffs traces back to the same two
      questions: who's liable if something goes wrong, and how much of the cost risk
      is the owner willing to hold onto themselves.

      This is exactly the decision a [[career-owners-representative|Owner's Representative]]
      helps an owner actually work through, since it's one of the
      highest-stakes calls made on a project, often before most of the eventual
      project team is even hired. And once a delivery method that involves early
      contractor input gets chosen, CM at Risk especially, it's a
      [[career-preconstruction-manager|Preconstruction Manager]] who actually runs
      that early estimating and constructability work the whole approach depends on.

      If you remember one thing from this lesson, make it this: how a project gets
      delivered isn't a technical formality decided by lawyers after the real
      decisions are made. It's one of the earliest, highest-leverage decisions on the
      entire project, and it quietly sets who's accountable for what long before
      anyone breaks ground.
    quiz:
      question: What's the common thread connecting Design-Bid-Build, Design-Build, and CM at Risk?
      options:
        - They're all essentially the same arrangement with different names
        - Each one represents a different tradeoff between price certainty, schedule speed, and who's liable for what, chosen based on what a specific owner needs most
        - Only one of them is legally permitted for public projects
      answerIndex: 1
      explanation: >
        None of these methods is objectively "best." Each one trades price
        certainty, speed, and liability differently, and the right choice depends
        entirely on what a specific owner values most for that specific project.
keyTerms:
  - concept-design-bid-build
  - concept-design-build
  - concept-cm-at-risk
  - concept-guaranteed-maximum-price
  - concept-lump-sum-contract
  - concept-cost-plus-contract
  - concept-integrated-project-delivery
  - concept-bridging-delivery-method
  - concept-multiple-prime-contracting
relatedIds:
  - concept-design-bid-build
  - concept-design-build
  - concept-cm-at-risk
  - concept-guaranteed-maximum-price
  - concept-lump-sum-contract
  - concept-cost-plus-contract
  - concept-integrated-project-delivery
  - concept-bridging-delivery-method
  - concept-multiple-prime-contracting
  - career-owners-representative
  - career-preconstruction-manager
---
