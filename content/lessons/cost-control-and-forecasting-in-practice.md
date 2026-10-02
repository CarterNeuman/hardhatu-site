---
id: lesson-cost-control-and-forecasting-in-practice
title: "Cost Control and Forecasting: Catching the Problem Before the Report Does"
tier: free
sections:
  - content: >
      Picture yourself as a [[career-cost-engineer|Cost Engineer]] reviewing
      this month's numbers. Long before a
      [[concept-change-order|change order]] is ever fully signed, it usually lives for weeks as a
      potential change order, a cost impact that's already been identified,
      maybe from an RFI answer that revealed extra work nobody planned for,
      but that hasn't been priced and formally approved yet. A cost engineer
      tracks every open potential change order in the forecast the moment
      it's identified, not the moment the signature finally happens, because
      waiting for approval to acknowledge a cost that's already functionally
      real means the forecast is already behind reality by the time anyone
      reads the report. A pile of unresolved potential change orders sitting
      in a drawer is exactly how a project's actual financial position ends
      up looking nothing like what the official numbers say.
    quiz:
      question: "Why does a cost engineer track a potential change order in the forecast before it's formally signed?"
      options:
        - "A potential change order only becomes worth tracking once the paperwork is signed, since until then the cost impact hasn't actually been confirmed by anyone involved"
        - "Waiting for a signature to acknowledge a cost that's already functionally identified means the forecast is already out of date the moment anyone reads it"
        - "Potential change orders get tracked in a separate log from the main forecast, so they only move into the budget once a change order is formally priced"
      answerIndex: 1
      explanation: >
        A cost impact doesn't wait for paperwork to become real. Tracking it
        the moment it's identified, rather than once it's signed, is what
        keeps the forecast honest instead of quietly behind reality.
  - content: >
      Here's a genuinely counterintuitive fact worth sitting with: spending
      more than budgeted isn't automatically bad news, and spending less isn't
      automatically good news. Comparing committed and actual cost against the
      budget only shows how much money went out the door; it says nothing
      about how much actual work that money bought.
      [[concept-cost-performance-index|The cost performance index, or CPI,]]
      fixes that by comparing the value of work actually completed against the
      money actually spent to do it. A crew that spent $105,000 but completed
      $115,000 worth of planned work has a CPI over 1.0, genuinely efficient,
      even though the raw spending number looks over budget. A crew that spent
      only $90,000 but completed just $80,000 worth of work has a CPI under
      1.0, a real efficiency problem, even though the raw spending looks like
      it's coming in under budget. Raw dollars spent, on their own, can tell a
      flattering story that CPI exposes as false.
    quiz:
      question: "Why can a crew that spent more than its budget actually be performing well, while a crew that spent less can actually be performing poorly?"
      options:
        - "CPI compares the value of work actually completed to money spent, so spending more while completing even more value is efficient, and spending less while completing even less value is not"
        - "CPI measures how many labor hours a crew burns against the schedule, not how actual spending compares to the value of completed work"
        - "Spending more than budgeted on its own means a crew is falling behind, while spending less than budgeted means the crew is comfortably ahead of plan"
      answerIndex: 0
      explanation: >
        Raw spending alone doesn't show how much work that money actually
        bought. CPI connects spending to completed value, which is exactly
        why a flattering or alarming spending number can be misleading on
        its own.
  - content: >
      CPI usually confirms something a sharp cost engineer or superintendent
      already suspects, because the earliest real warning sign shows up before
      it ever reaches a dollar figure: productivity. Every trade's estimate
      assumes a production rate, such as a certain quantity of work per labor
      hour, concrete finished per crew-day, or conduit pulled per shift. When a
      trade starts falling behind that assumed rate in the field, that slippage
      is visible in daily reports weeks before it fully shows up as a cost
      variance in a monthly report. A crew consistently running behind its
      assumed production rate is quietly burning labor hours the budget never
      accounted for. Catching that gap early, by adding a crew, resequencing
      the work, or fixing whatever's actually slowing them down, is a far
      cheaper fix than discovering the same problem for the first time in next
      month's numbers.
    quiz:
      question: "Why does tracking a trade's field productivity catch a cost problem earlier than waiting for the monthly cost report?"
      options:
        - "Productivity tracking mainly helps a scheduler forecast the finish date, while a trade's actual cost impact still only becomes visible once the monthly report is compiled"
        - "Daily field productivity and the monthly cost report are built from the same underlying data, so a slipping trade shows up in both at roughly the same time"
        - "A trade falling behind its assumed production rate shows up in daily field data weeks before that slippage fully translates into a dollar variance in a monthly report"
      answerIndex: 2
      explanation: >
        Productivity is a leading indicator, cost variance is a lagging one.
        By the time slipping productivity shows up as dollars in a report,
        weeks of correctable labor hours have usually already been lost.
  - content: >
      All of this feeds one forecasting question that matters more than any
      other: given how the job has actually performed so far, what will it
      genuinely cost to finish? One real formula answers that directly: the
      estimate at completion equals the total original budget divided by
      CPI, assuming the job's cost efficiency so far continues for the rest
      of the work. A project with a CPI of 0.80, spending more than it's
      earning in completed value, forecasts a final cost meaningfully higher
      than the original budget if nothing changes, not because anyone
      guessed pessimistically, but because the math is simply projecting
      the job's actual performance forward instead of hoping the rest of it
      somehow performs better than what's already happened. That forecast is
      exactly what separates a team that's managing its budget from one
      that's just hoping it holds.
    quiz:
      question: "Why does the estimate-at-completion formula (budget divided by CPI) forecast a higher final cost when CPI is below 1.0?"
      options:
        - "A CPI below 1.0 means the project is actually ahead of schedule, so the formula adjusts the cost upward to match"
        - "The formula builds in a flat ten percent contingency regardless of how the job has actually performed so far, to cover unexpected cost growth"
        - "Dividing the budget by a CPI below 1.0 projects the job's actual cost inefficiency forward for the remaining work, rather than assuming performance will suddenly improve"
      answerIndex: 2
      explanation: >
        The formula assumes the trend observed so far continues. A CPI below
        1.0 reflects real inefficiency already happening, and the math
        simply carries that same rate forward instead of assuming it will
        correct itself without anyone changing anything.
  - content: >
      Every piece of this, tracked potential change orders, CPI, productivity,
      and an estimate at completion built from real performance, gets
      packaged into the monthly cost report a project team actually reviews
      together, usually flagged by cost code so a problem in the electrical
      scope doesn't get buried inside an otherwise-healthy overall number. A
      [[career-project-manager|Project Manager]] uses that report to decide
      where attention is actually needed, and this entire practice is what
      [[lesson-the-estimate-becomes-the-budget|turning an estimate into a budget]]
      actually looks like once a job is underway, not a one-time
      translation but an ongoing discipline that catches a drifting number
      while there's still time to do something about it. If this kind of
      work interests you, the
      [[interview-preconstruction-estimating|Preconstruction & Estimating interview guide]]
      covers what these roles actually look for.
    quiz:
      question: "Why does a monthly cost report break performance down by cost code instead of just showing one overall project number?"
      options:
        - "A single overall project number can hide a real problem in one trade's scope behind an otherwise healthy project total, while cost-code detail surfaces it"
        - "Breaking the report down by cost code mainly helps the accounting team close out invoices faster, with little effect on how problems actually get noticed"
        - "Cost codes exist mainly to match the owner's billing categories, so internal reviews of trade performance work the same whether or not the report uses them"
      answerIndex: 0
      explanation: >
        An overall project number can average out a serious problem in one
        scope against good performance elsewhere. Breaking it down by cost
        code is what actually surfaces where attention is needed.
keyTerms:
  - concept-change-order
  - concept-cost-performance-index
relatedIds:
  - concept-change-order
  - career-cost-engineer
  - career-project-manager
  - interview-preconstruction-estimating
  - lesson-the-estimate-becomes-the-budget
  - concept-cost-performance-index
minutes: 13
---
