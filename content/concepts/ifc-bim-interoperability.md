---
id: concept-ifc-bim-interoperability
title: Industry Foundation Classes (IFC) & BIM Interoperability
tier: free
category: Technology, Data & Sustainability
definition: >
  An open, vendor-neutral file format that lets BIM models built in different
  software,     such as Revit, ArchiCAD, and Tekla, be exchanged between
  disciplines and platforms without     losing the underlying building data,
  as opposed to each vendor's own proprietary file     format that only its
  own software reads fully.
whyItMatters: >
  A design team using five different BIM platforms across architecture,
  structural, and MEP     can't coordinate models at all unless each
  discipline exports to a shared, non-proprietary     format, which is exactly
  the interoperability problem IFC exists to solve.
example: >
  A structural engineer's Tekla model exports to IFC so the architect's
  Revit-based     coordination model can reference it directly, without
  needing a Tekla license or losing the     steel connection data embedded in
  the original file.
careerAngle: >
  A [[career-bim-vdc-specialist|BIM/VDC Specialist]] sets the IFC export
  settings and naming     conventions a project's
  [[concept-bim-execution-plan|BIM Execution Plan]] requires, since a
  poorly configured export can silently drop critical data during the handoff
  between     platforms.
whatGoesWrong: >
  A team exports a model to IFC assuming all the original data carries over
  automatically,     when specific object properties and parameters can
  silently fail to translate depending on     each platform's own IFC export
  settings, a gap that isn't caught until the receiving     discipline notices
  missing data.
relatedIds:
  - concept-bim
  - concept-bim-execution-plan
  - concept-common-data-environment
  - career-bim-vdc-specialist
---
