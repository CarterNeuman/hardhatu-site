---
id: lesson-drones-scanning-and-mapping
title: "Drones, Scanning, and Mapping: Turning the Site Into Data"
tier: free
sections:
  - content: >
      Picture yourself as a
      [[career-drone-uav-specialist|Drone/UAV Specialist]], and picture the one
      requirement standing between you and legally flying a drone commercially
      on any job site: the FAA's Part 107 Remote Pilot Certificate. Earning it
      means passing the Unmanned Aircraft General, Small (UAG) knowledge test,
      which covers airspace classifications, aviation weather, how weather
      actually affects a small aircraft's performance, emergency procedures,
      and basic radio communication. None of that has much to do with
      construction itself. It's entirely about sharing the sky safely with
      crewed aircraft. The certificate doesn't stay valid forever without
      upkeep either: every 24 calendar months, a certificated remote pilot has
      to complete one of the FAA's free online recurrent training courses to
      keep flying commercially, a real recurring requirement most construction
      credentials on this site don't have. What you're actually licensed to
      capture, aerial imagery and 3D data used for everything from progress
      documentation to earthwork volumes, is one of construction's two main
      forms of [[concept-reality-capture|reality capture]], alongside
      ground-based laser scanning.
    quiz:
      question: "What does earning and keeping a Part 107 Remote Pilot Certificate actually require?"
      options:
        - "A one-time knowledge test with no renewal requirement at all, similar to how a standard driver's license never requires retesting once issued"
        - "Several years of flight training comparable to what a commercial airline pilot completes, since the FAA classifies drone operations under the same certification track"
        - "Passing an aeronautical knowledge test covering airspace, weather, and emergency procedures, then completing a free online recurrent training course every 24 calendar months to keep flying commercially"
      answerIndex: 2
      explanation: >
        Part 107 isn't a one-time credential. The recurring training
        requirement is what keeps a certificated pilot's knowledge current, and
        it's a real, ongoing obligation most construction credentials on this
        site don't share.
  - content: >
      Flying the mission itself is only step one. Turning a few hundred
      individual photos into one usable map is
      [[concept-drone-mapping|photogrammetry]]'s job, and it depends entirely
      on how the photos were shot: a typical mapping flight overlaps each photo
      with the next by around seventy-five percent along the flight path and
      sixty percent side to side, enough redundancy for the processing software
      to recognize the same ground features across multiple photos and
      calculate exactly how the camera moved between each shot. The result is
      an orthomosaic, a single, seamless, geometrically corrected map, not just
      a simple stitched-together collage of photos. That correction,
      orthorectification, is what actually removes the distortion a camera
      angle and the ground's own terrain introduce, which is the entire
      difference between a nice-looking aerial photo and a map accurate enough
      to measure from.
    quiz:
      question: "What makes an orthomosaic different from a simple stitched-together collage of drone photos?"
      options:
        - "Nothing meaningful in practice, orthomosaic is mostly just a more technical-sounding name construction software companies use for the same simple stitched image"
        - "An orthomosaic is geometrically corrected (orthorectified) to remove the distortion caused by camera angle and terrain, making it accurate enough to measure from, unlike a visual-only stitch"
        - "An orthomosaic corrects for camera angle but still can't account for the ground's own elevation changes, so steep or uneven sites need a separate survey"
      answerIndex: 1
      explanation: >
        A simple photo stitch only has to look right. Orthorectification is
        what makes an orthomosaic measurable instead of merely presentable, by
        correcting for both camera angle and terrain distortion.
  - content: >
      That orthomosaic can still be wrong in an important way: internally
      consistent but positioned incorrectly in the real world, an error
      invisible just by looking at it. Fixing that requires ground control
      points, physical markers placed across the site and measured precisely,
      often by a [[career-surveyor|Surveyor]] using GPS or a total station, a
      surveying instrument that measures precise angles and distances, before
      the drone ever takes off. Without them, combined errors from the drone's
      own motion and the camera's calibration can throw the model off by tens
      of centimeters. With a handful of properly measured ground control points
      tying the model back to known, real-world coordinates, that same model's
      accuracy tightens down to centimeters, the actual gold standard for
      anything the project will treat as survey-grade rather than just a
      nice-looking reference map.
    quiz:
      question: "Why are ground control points necessary even when a drone's own onboard GPS already records where each photo was taken?"
      options:
        - "Onboard GPS alone can leave combined positioning errors of tens of centimeters; ground control points, measured precisely on the ground, tie the model to real-world coordinates and tighten that accuracy down to centimeters"
        - "Ground control points mainly help the processing software align overlapping photos faster, a processing-speed benefit rather than something that changes the model's real-world accuracy"
        - "Onboard GPS is already accurate enough on its own for survey-grade work, so ground control points mainly exist as a backup in case the drone's GPS signal is lost entirely"
      answerIndex: 0
      explanation: >
        Onboard GPS alone leaves real, measurable error in the model. Ground
        control points are what actually anchor that model to true real-world
        coordinates, not a backup for a failure that hasn't happened.
  - content: >
      All of that captured data, such as survey points, drone photogrammetry,
      and existing utility records, eventually lands on a
      [[career-gis-specialist|GIS Specialist]]'s desk, and raw spatial data
      isn't useful on its own until it's layered with everything else that
      matters about a piece of land. Overlaying a site boundary against a FEMA
      flood zone map might reveal part of a proposed building footprint
      actually sits inside a mapped floodplain, a fact that changes a project's
      feasibility and permitting path long before a single design drawing
      exists. The same layering works for zoning boundaries, buried utility
      records, and existing infrastructure, turning scattered data points
      collected by a surveyor and a drone pilot into the kind of map an owner
      or permitting agency can actually make a decision from.
    quiz:
      question: "Why does raw spatial data, like a drone-captured site map or a survey point file, need a GIS Specialist's layering work before it's useful for a decision like site feasibility?"
      options:
        - "Raw spatial data is already decision-ready on its own, and a GIS Specialist mostly just makes the existing data look more polished for presentations"
        - "GIS layering mainly matters for government permitting agencies, with most private construction teams relying on the raw drone and survey data directly instead"
        - "Raw spatial data shows what's physically there, but a decision like feasibility or permitting depends on layering that data against other spatial information, like flood zones or zoning, that the raw capture alone doesn't include"
      answerIndex: 2
      explanation: >
        A capture only shows what's physically on the ground. Layering it
        against zoning, floodplain, or utility data is what turns it into
        something a feasibility or permitting decision can actually be made
        from.
  - content: >
      Put the three roles together and a site's actual workflow looks like
      this: a Surveyor establishes and measures the ground control points
      everything else gets checked against, a Drone/UAV Specialist captures the
      site from the air, and a GIS Specialist turns both into the maps and
      analysis the rest of the project actually uses. One more real-world
      wrinkle belongs in this picture: flying below 400 feet in controlled
      airspace near an airport means getting airspace authorization first,
      which the FAA's LAANC system, Low Altitude Authorization and Notification
      Capability, now automates into a near-real-time approval instead of a
      slow manual request, at over seven hundred airports nationwide. None of
      this work makes it into a finished building's drawings the way a beam or
      a duct run does, but a site that was never accurately captured and mapped
      in the first place is a site every later discipline (design, estimating,
      BIM coordination) ends up building on top of bad information without
      knowing it. If this side of construction interests you, the
      [[interview-technology-design|Technology & Design interview guide]]
      covers what these interviews actually test for.
    quiz:
      question: "Why does getting airspace authorization through the FAA's LAANC system matter for a drone flight near an airport?"
      options:
        - "LAANC authorization is mainly a courtesy notification to nearby air traffic, not an actual legal requirement a pilot has to secure before flying"
        - "LAANC automates what used to be a slow manual airspace-authorization request into a near-real-time approval, which a pilot operating below 400 feet in controlled airspace near an airport needs before flying"
        - "LAANC mainly applies to recreational drone flights under the TRUST safety test, while commercial construction flights go through a separate, slower manual process instead"
      answerIndex: 1
      explanation: >
        Flying in controlled airspace near an airport legally requires
        authorization first. LAANC is what turned that from a slow manual
        process into a near-real-time one, not an optional courtesy step.
keyTerms:
  - concept-reality-capture
  - concept-drone-mapping
relatedIds:
  - concept-reality-capture
  - concept-drone-mapping
  - career-drone-uav-specialist
  - career-surveyor
  - career-gis-specialist
  - interview-technology-design
minutes: 13
---
