---
id: lesson-hvac-and-building-systems-in-practice
title: "HVAC & Building Systems in Practice: From Refrigerant to Commissioning"
tier: free
sections:
  - content: >
      Picture yourself as an [[career-hvac-technician|HVAC Technician]], and
      picture the one credential nearly every technician earns before touching
      a real refrigerant line:
      [[concept-epa-608-certification|EPA Section 608 certification]]. The
      rule exists because of ozone depletion. Older refrigerants,
      chlorofluorocarbons and hydrochlorofluorocarbons, destroy the
      stratospheric ozone layer when released into the atmosphere, and the
      Clean Air Act flatly prohibits venting them. Recovery and recycling is
      required instead, every time a system is serviced, repaired, or disposed
      of. The certification itself splits into four tiers that match the
      equipment, not one blanket test: Type I covers small appliances holding
      under five pounds of refrigerant, Type II covers high-pressure equipment
      like most rooftop and split systems, Type III covers low-pressure
      equipment such as large chillers, and Universal covers all three.
      Skipping this isn't a minor paperwork risk either. The maximum civil
      penalty for illegally venting refrigerant currently runs well over a
      hundred thousand dollars per violation, per day.
    quiz:
      question: "Why does EPA Section 608 require refrigerant to be recovered rather than vented to the atmosphere during service or disposal?"
      options:
        - "Recovery mainly protects the owner's budget by preventing refrigerant waste, with the environmental angle being a secondary benefit rather than the actual legal basis for the rule"
        - "Venting restrictions apply mainly to large commercial chiller systems, while most small residential equipment falls under a separate, less strict EPA recovery standard"
        - "Many refrigerants deplete the stratospheric ozone layer when released, so the Clean Air Act requires recovery and recycling instead of venting, carrying real civil penalties for violations"
      answerIndex: 2
      explanation: >
        The rule's actual basis is environmental, not financial.
        Ozone-depleting refrigerants are what the Clean Air Act is protecting
        against, which is why recovery is required across every equipment
        category, not just the large commercial ones.
  - content: >
      Not every building gets its heating and cooling from the same kind of
      equipment. A [[concept-rooftop-unit|rooftop unit]] packages cooling,
      heating, and air movement into one self-contained box sitting on the
      roof, simple to install and service since everything lives in one place.
      A larger building more often runs a central plant instead: a
      [[concept-chiller|chiller]] and [[concept-cooling-tower|cooling tower]]
      work together to produce chilled water. The chiller does the actual
      refrigeration cycle while the cooling tower rejects the heat it collects
      out into the outside air, and that chilled water then gets pumped out to
      [[concept-air-handling-unit|air handling units]] throughout the building,
      each one using it to cool the air it pushes into the ductwork. Heating
      usually runs on a parallel hot-water loop from a boiler instead. A
      technician troubleshooting a comfort complaint has to know which
      architecture they're actually looking at, since a rooftop unit's
      self-contained refrigerant circuit and a central plant's water-side
      plumbing fail in genuinely different ways.
    quiz:
      question: "What's the real difference between a packaged rooftop unit and a central chiller plant?"
      options:
        - "A rooftop unit packages cooling, heating, and air movement into one self-contained box, while a central plant makes chilled water at a chiller and tower and pumps it out to separate air handling units"
        - "A central plant works basically the same way as a rooftop unit, just at a larger physical size, with the same refrigerant circuit scaled up to cover a bigger building's load"
        - "Rooftop units mostly handle heating duties on their own, while a chiller and cooling tower together take care of all the cooling for a larger building's interior spaces"
      answerIndex: 0
      explanation: >
        These are two genuinely different architectures, not one scaled up from
        the other. A rooftop unit is self-contained; a central plant splits
        refrigeration, heat rejection, and air distribution across separate
        pieces of equipment tied together by water.
  - content: >
      Even a well-designed central plant still has a problem a single supply of
      chilled or hot water can't solve on its own: a building's interior zones
      rarely need the same amount of heating or cooling at the same time. A
      conference room full of people and a sun-facing office along the same
      duct run can have opposite needs within the same hour. A
      [[concept-vav-box|VAV (variable air volume) box]] sits in the ductwork at
      each zone and adjusts how much conditioned air actually reaches that
      zone, opening or throttling back based on what that zone's own thermostat
      is calling for, independent of every other zone on the same system.
      Without zone-level control like this, a building-wide system can only
      really chase one average setpoint, overcooling some rooms and
      undercooling others at the exact same time.
    quiz:
      question: "Why does a building need zone-level control like a VAV box instead of relying on one building-wide thermostat setting?"
      options:
        - "Different zones in a building often need different amounts of heating or cooling at the same time, so a VAV box lets each zone's airflow adjust independently instead of the whole system chasing one average setpoint"
        - "A single building-wide thermostat setting actually averages conditions more accurately than zone-by-zone control can, which is why VAV boxes are installed mainly to cut equipment costs rather than to improve comfort"
        - "VAV boxes mainly exist to dampen noise transmitted through the ductwork between two adjoining zones, with any resulting effect on actual temperature control being only a minor, secondary side benefit of the design"
      answerIndex: 0
      explanation: >
        A single setpoint can only chase one average condition. VAV boxes exist
        specifically because different zones' actual needs diverge at the same
        moment, not because of noise or cost.
  - content: >
      Every piece of equipment this lesson has covered, the rooftop unit, the
      chiller, each VAV box, actually gets told what to do by a controller
      running [[concept-direct-digital-control|direct digital control (DDC)]],
      a programmed sequence of operation rather than a mechanical thermostat
      reacting on its own. Stack enough of those individual controllers
      together across a whole building and feed them into one shared interface,
      and that's a
      [[concept-building-automation-system|building automation system (BAS)]],
      the dashboard a facilities team actually uses to view every zone's
      temperature, adjust setpoints, and schedule after-hours setbacks without
      walking to each piece of equipment individually. A BAS is genuinely only
      as good as what's actually programmed into it, though. A facilities team
      that inherits a dashboard whose alarm thresholds were never tuned past
      default settings can end up flooded with nuisance alarms and quietly
      disabling the very alarms meant to catch a real failure.
    quiz:
      question: "What's the relationship between direct digital control (DDC) and a building automation system (BAS)?"
      options:
        - "A BAS physically replaces every individual DDC controller once it's installed, so a fully automated building ends up running without any equipment-level controllers left in place at all"
        - "DDC is the individual programmed controller running one piece of equipment, while a BAS aggregates many controllers into a shared dashboard a facilities team can monitor and adjust from"
        - "DDC and BAS are really just two different industry terms for the exact same layer of a building's control system, with no real distinction between them"
      answerIndex: 1
      explanation: >
        A BAS doesn't replace DDC, it aggregates it. Each piece of equipment
        still runs its own DDC controller; the BAS is the shared dashboard
        built on top of all of them.
  - content: >
      None of this, the refrigerant handling, the equipment architecture, the
      zone control, the controls layer, actually proves itself until
      [[concept-commissioning|commissioning]], the process of testing a
      building's systems after installation to confirm they genuinely work, and
      work together, the way the design intended. Part of that process is
      [[concept-hvac-balancing|testing, adjusting, and balancing (TAB)]],
      performed by an independent contractor who measures the actual airflow
      and water flow at every single outlet and adjusts dampers and valves
      until each one matches the design's own numbers, work kept separate from
      the installing contractor specifically so nobody's grading their own
      installation. A [[career-commissioning-agent|Commissioning Agent]]
      witnesses this testing and signs off that the whole system, not just each
      individual piece, performs the way it was designed to before an owner
      ever takes over. For readers interested in this side of HVAC and building
      systems, the [[interview-field-trades|field trades interview guide]]
      covers what these interviews actually test for, and the
      [[exam-nate-ready-to-work|NATE Ready to Work exam]] is a recognized
      starting credential for the trade.
    quiz:
      question: "Why is TAB (testing, adjusting, and balancing) typically performed by an independent contractor rather than the installer who did the original work?"
      options:
        - "Installers are legally barred from adjusting any damper or valve once their own installation work is complete, which is why a separate TAB contractor has to step in"
        - "Independent TAB contractors mainly use specialized tools the original installer doesn't own, which is the main reason this work gets split out to a separate company"
        - "Independent TAB keeps the verification unbiased, since an installer checking their own work might not catch a system that doesn't actually hit the design's airflow and water flow numbers"
      answerIndex: 2
      explanation: >
        The point of independence is bias, not tooling or legality. An
        installer checking their own work has less reason to catch a shortfall
        than a separate contractor with nothing riding on the original
        installation.
keyTerms:
  - concept-rooftop-unit
  - concept-chiller
  - concept-cooling-tower
  - concept-air-handling-unit
  - concept-vav-box
  - concept-direct-digital-control
  - concept-building-automation-system
  - concept-commissioning
  - concept-hvac-balancing
  - concept-epa-608-certification
relatedIds:
  - concept-rooftop-unit
  - concept-chiller
  - concept-cooling-tower
  - concept-air-handling-unit
  - concept-vav-box
  - concept-direct-digital-control
  - concept-building-automation-system
  - concept-commissioning
  - concept-hvac-balancing
  - career-hvac-technician
  - career-commissioning-agent
  - interview-field-trades
  - exam-nate-ready-to-work
  - concept-epa-608-certification
minutes: 13
---
