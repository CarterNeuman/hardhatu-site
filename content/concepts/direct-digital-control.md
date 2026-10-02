---
id: concept-direct-digital-control
title: Direct Digital Control (DDC)
tier: free
category: Materials & Systems
csiDivision: "25, Integrated Automation"
definition: >
  The individual electronic controllers, sensors, and actuators installed at each
  piece of mechanical equipment, an air handler, a VAV box, a boiler, that read
  real-time conditions and adjust equipment output automatically according to a
  programmed sequence of operation, the field-level hardware a
  [[concept-building-automation-system|building automation system]] sits on top of
  and coordinates.
whyItMatters: >
  A DDC controller can fail or be miswired at an individual piece of equipment
  even when the building-wide BAS dashboard looks completely normal, a problem the
  software layer can't fix if the field hardware underneath it isn't actually
  working correctly.
example: >
  A controls contractor installs a DDC controller at a VAV box that reads the
  space's actual temperature and modulates the box's damper to hold the programmed
  setpoint, reporting its status up to the building automation system.
careerAngle: >
  An [[career-electrician|Electrician]] or specialty controls technician installs
  and wires the individual DDC controllers. A [[career-mep-engineer|MEP Engineer]]
  writes the sequence of operation each controller executes.
whatGoesWrong: >
  A controls technician wires a VAV box's DDC controller to the wrong terminal.
  The box reports normal status on the BAS dashboard while actually stuck fully
  open, and the mistake isn't caught until an occupant complains the space is too
  cold and a technician traces the fault back to the field wiring.
relatedIds:
  - career-electrician
  - career-mep-engineer
  - concept-building-automation-system
  - concept-commissioning
  - concept-bms-integration
  - lesson-hvac-and-building-systems-in-practice
---
