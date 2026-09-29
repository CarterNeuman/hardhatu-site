---
id: concept-data-center-infrastructure
title: Data Center Infrastructure
tier: free
category: Materials & Systems
csiDivision: "27, Communications"
definition: >
  The specialized structured cabling, cable pathways, and raised access
  flooring that carry and organize a data center's network connections,
  paired with the redundant power distribution, precision cooling, and
  specialized fire suppression built around it, together engineered to a
  specific reliability tier, the Uptime Institute's Tier I through Tier IV
  classification, for example, based on how much downtime the owner can
  tolerate. The communications and cabling scope sits in this CSI division;
  the redundant power, cooling, and fire suppression systems it depends on
  are designed under their own respective divisions.
whyItMatters: >
  A higher reliability tier requires genuinely redundant infrastructure, such
  as two completely independent electrical and cooling paths, not just
  backup equipment sitting idle, and building to a tier the owner's actual
  uptime requirements don't justify wastes significant construction budget on
  redundancy the owner doesn't need.
example: >
  A financial services company specifies its data center be built to Tier III
  reliability, requiring concurrently maintainable redundant power and
  cooling paths so any single piece of infrastructure can be taken offline for
  maintenance without interrupting server operations.
careerAngle: >
  A [[career-mep-engineer|MEP Engineer]] designs the redundant power and
  cooling infrastructure to the specified tier. A
  [[career-commissioning-agent|Commissioning Agent]] verifies the redundancy
  actually functions as designed, including testing that a single failure
  doesn't take down the whole facility.
whatGoesWrong: >
  A data center's electrical infrastructure is designed with two power paths
  on paper, but both paths are found during commissioning to share a single
  upstream transformer that was never actually made redundant. The facility
  doesn't discover the shared single point of failure until a commissioning
  test deliberately fails one path and the whole facility loses power instead
  of failing over cleanly.
relatedIds:
  - career-mep-engineer
  - career-commissioning-agent
  - concept-switchgear
---
