---
id: concept-cpm-logic-relationships
title: CPM Logic Relationships, Predecessor/Successor
tier: free
category: Project Process & Lifecycle
definition: >
  The dependency links between activities in a critical path method
  schedule, defining which activities, predecessors, must happen before
  others, successors, can start or finish. These relationships are the actual
  logic that determines the [[concept-critical-path|critical path]], not just
  a list of dates.
whyItMatters: >
  Two activities that could genuinely overlap get treated as sequential
  purely because of how the logic relationship was set up, not because the
  real-world work actually requires it, and that single choice can stretch a
  schedule's calculated duration for no real reason.
example: >
  A scheduler links drywall installation to start only after all electrical
  rough-in is fully complete in every room, when the real-world sequence
  actually allows drywall to begin in rooms where rough-in is already done,
  a looser logic relationship that would shorten the schedule.
careerAngle: >
  A [[career-scheduler|Scheduler]] sets the logic relationships between
  activities, the actual decisions that determine which activities end up on
  the critical path.
whatGoesWrong: >
  A scheduler links two activities with a simple finish-to-start relationship
  when the real-world logic actually allows them to overlap. That single
  choice artificially extends the schedule's calculated duration, making the
  project look further behind than the real site conditions actually
  require.
relatedIds:
  - career-scheduler
  - concept-critical-path
  - concept-float
---
