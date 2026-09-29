---
id: concept-uninterruptible-power-supply
title: Uninterruptible Power Supply (UPS)
tier: free
category: Materials & Systems
csiDivision: "26, Electrical"
definition: >
  A battery-backed electrical system that provides instantaneous, gap-free
  backup power to critical equipment, such as servers or medical devices,
  bridging the brief gap between a utility outage and a standby generator
  actually starting and coming online, distinct from a generator since a UPS
  responds in milliseconds rather than seconds.
whyItMatters: >
  A generator alone still has a startup delay of several seconds before it
  can supply power, long enough to crash a server or interrupt a sensitive
  piece of medical equipment, a UPS is what covers that gap, and equipment
  that genuinely can't tolerate any interruption at all needs both a UPS and a
  generator working together, not one or the other.
example: >
  A data center's servers are protected by a UPS that instantly takes over
  the electrical load the moment utility power drops, holding the load until
  the facility's standby generator starts and comes fully online several
  seconds later.
careerAngle: >
  An [[career-electrician|Electrician]] installs the UPS and its battery
  system. A [[career-mep-engineer|MEP Engineer]] sizes the UPS's battery
  runtime specifically to bridge the generator's actual startup and transfer
  time.
whatGoesWrong: >
  A facility installs a UPS sized only for a brief, generic runtime without
  confirming it actually covers the specific standby generator's real startup
  time. During an actual outage, the generator takes longer to reach full
  capacity than assumed, the UPS batteries deplete before the generator can
  take over, and critical equipment loses power anyway despite the UPS being
  in place.
relatedIds:
  - career-electrician
  - career-mep-engineer
  - concept-standby-generator
  - concept-battery-energy-storage-system
---
