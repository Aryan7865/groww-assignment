// Real case data from a household in Amravati. 13 original MSEDCL bill PDFs are attached.
// Personal identifiers (consumer number, meter serial, address) are redacted in the UI; the PDFs
// are the authoritative source and are linked from every bill detail and from the Evidence Vault.

export const account = {
  label: "Household (Amravati) · Residential · Single phase with solar",
  consumer: "XXXX-XXXX-0000 (redacted)",
  period: "Aug 2025 to Aug 2026",
  status: "Open",
  lastAction: "Records gathered for review",
  nextFollowUp: "Finalise questions, prepare internal complaint",
};

export const bills = [
  { id: "b01", period: "Aug 2025",  pdf: "/bills/AUG25.pdf",  units: 320,  imp: 440,  exp: 120, gen: 283, current: 4453.24,  payable: 9458,    status: "verified",    note: "Printed rounded payable (₹9,460) differs from exact (₹9,458)." },
  { id: "b02", period: "Sep 2025",  pdf: "/bills/SEP25.pdf",  units: 1218, imp: 1411, exp: 193, gen: 374, current: 24013.31, payable: 28590,   status: "verified",    note: "Large usage jump vs Aug, flagged for review." },
  { id: "b03", period: "Oct 2025",  pdf: "/bills/OCT25.pdf",  units: 0,    imp: 0,    exp: 198, gen: 367, current: 4840,     payable: 28720,   status: "needs-review", note: "Includes ₹4,400 deposit adjustment. Usage shown as zero." },
  { id: "b04", period: "Nov 2025",  pdf: "/bills/NOV25.pdf",  units: 0,    imp: 0,    exp: 0,   gen: 0,   current: 0,        payable: null,    status: "needs-review", note: "Reading continuity unclear. See attached original." },
  { id: "b05", period: "Dec 2025",  pdf: "/bills/DEC25.pdf",  units: 0,    imp: 0,    exp: 0,   gen: 0,   current: 440,      payable: 440,     status: "needs-review", note: "Readings frozen or assessed. Generation recorded in Feb." },
  { id: "b06", period: "Jan 2026",  pdf: "/bills/JAN26.pdf",  units: 0,    imp: 0,    exp: 0,   gen: 0,   current: 440,      payable: 880,     status: "needs-review", note: "Readings frozen or assessed." },
  { id: "b07", period: "Feb 2026",  pdf: "/bills/FEB26.pdf",  units: 0,    imp: 0,    exp: 0,   gen: 0,   current: 440,      payable: 1320,    status: "needs-review", note: "Readings frozen or assessed." },
  { id: "b08", period: "Mar 2026",  pdf: "/bills/MAR26.pdf",  units: 0,    imp: 0,    exp: 0,   gen: 0,   current: 440,      payable: 1760,    status: "needs-review", note: "Readings frozen or assessed." },
  { id: "b09", period: "Apr 2026",  pdf: "/bills/APR26.pdf",  units: 2472, imp: 1328, exp: 0,   gen: 1053,current: 52749.43, payable: 52044.46,status: "needs-review", note: "Catch up. 1,144 adjusted units. Export reported 0." },
  { id: "b10", period: "May 2026",  pdf: "/bills/MAY26.pdf",  units: 863,  imp: 863,  exp: 0,   gen: 548, current: 16386.21, payable: 69080,   status: "verified",    note: "Export still 0 while generation present." },
  { id: "b11", period: "Jun 2026",  pdf: "/bills/JUNE26.pdf", units: 955,  imp: 955,  exp: 0,   gen: 541, current: 21983.13, payable: 86870,   status: "verified",    note: "Includes a minus ₹4,400 adjustment." },
  { id: "b12", period: "Jul 2026",  pdf: "/bills/JULY26.pdf", units: 607,  imp: 654,  exp: 47,  gen: 409, current: 14295.40, payable: 97720,   status: "verified",    note: "Export resumes." },
  { id: "b13", period: "Aug 2026",  pdf: "/bills/AUG26.pdf",  units: 262,  imp: 399,  exp: 137, gen: 307, current: 38878.51, payable: 67084.99,status: "needs-review", note: "Printed ₹67,085, exact ₹67,084.99. Debit adjustment ₹31,577.07." },
];

export const payments = [
  { id: "p01", date: "12 Sep 2025", amount: 9458,  bill: "b01", mode: "UPI",      ref: "UPI-2025091201",  source: "ledger" },
  { id: "p02", date: "28 Oct 2025", amount: 4310,  bill: "b02", mode: "UPI",      ref: "UPI-2025102801",  source: "bill-history" },
  { id: "p03", date: "28 Oct 2025", amount: 8710,  bill: "b02", mode: "Net-bank", ref: "NB-28102025",     source: "ledger", conflict: "Ledger shows ₹8,710 vs bill history ₹4,310 for Sep 2025. The ₹4,400 difference matches an Oct deposit adjustment but the cause is unknown." },
  { id: "p04", date: "05 Dec 2025", amount: 440,   bill: "b05", mode: "Cash",     ref: "CSH-05122025",    source: "receipt" },
];

export const meterEvents = [
  { id: "m01", date: "15 Mar 2026", type: "Meter replacement", oldReading: 25675, newReading: 0, note: "Old meter removed. New meter started at zero. Replacement report not on file." },
  { id: "m02", date: "02 Nov 2025", type: "Reading decrease",  oldReading: 26146, newReading: 25675, note: "Reading decreased Oct to Nov 2025. Shown as a discrepancy, cause not inferred." },
];

// Grievance timeline: dates and references are only shown when a record exists for them.
// This household case is still at the preparation stage, so no official submission dates are claimed.
export const grievanceTimeline = [
  { id: "g01", date: null, stage: "Household noticed billing anomaly",   channel: "Family record", ref: null, status: "noted",    note: "Noticed in the Apr 2026 bill: catch up of 1,144 adjusted units and credit adjustment. Recorded informally by the household." },
  { id: "g02", date: null, stage: "Records gathered for review",         channel: "Household",     ref: null, status: "prepared", note: "All 13 monthly MSEDCL bills, household payment ledger and solar generation notes collected. Date not recorded." },
  { id: "g03", date: null, stage: "Internal utility complaint",          channel: null,            ref: null, status: "draft",    note: "Not yet filed. Will be the first formal step once questions are finalised." },
  { id: "g04", date: null, stage: "Written representation (advocate)",   channel: null,            ref: null, status: "draft",    note: "Draft representation outline prepared. Not yet signed or sent." },
  { id: "g05", date: null, stage: "CGRF filing",                         channel: null,            ref: null, status: "draft",    note: "Only if the internal complaint does not resolve. No filing has taken place." },
];

export const observations = [
  {
    id: "o1", rule: "frozen-readings", severity: "amber",
    title: "Readings appear frozen from Dec 2025 to Mar 2026",
    affects: ["Dec 2025","Jan 2026","Feb 2026","Mar 2026"],
    detection: "Rule frozen-readings. Import and export values were recorded as 0 and generation figures were held at 0 across four consecutive bills, while fixed charges of ₹440 per month continued. A generation figure reappeared in Feb 2026 without matching import or export movement.",
    evidence: [
      { period: "Dec 2025", label: "Import / Export / Generation", value: "0 / 0 / 0 kWh", source: "DEC25.pdf · printed on bill", pdf: "/bills/DEC25.pdf" },
      { period: "Jan 2026", label: "Import / Export / Generation", value: "0 / 0 / 0 kWh", source: "JAN26.pdf · printed on bill", pdf: "/bills/JAN26.pdf" },
      { period: "Feb 2026", label: "Import / Export / Generation", value: "0 / 0 / 0 kWh", source: "FEB26.pdf · printed on bill", pdf: "/bills/FEB26.pdf" },
      { period: "Mar 2026", label: "Import / Export / Generation", value: "0 / 0 / 0 kWh", source: "MAR26.pdf · printed on bill", pdf: "/bills/MAR26.pdf" },
      { period: "Dec 25 to Mar 26", label: "Fixed charge each month", value: "₹440 per bill", source: "all four PDFs" },
    ],
    unknown: "The bills do not state whether readings were estimated, assessed, provisional, or simply not taken. The next actual reading date is also not shown.",
    question: "How were the readings obtained for Dec 2025 to Mar 2026, and on what date was the next actual meter reading taken?",
  },
  {
    id: "o2", rule: "catch-up-adjustment", severity: "amber",
    title: "Large catch up of 1,144 adjusted units in Apr 2026",
    affects: ["Apr 2026"],
    detection: "Rule catch-up-adjustment. The Apr 2026 bill shows a current bill amount of ₹52,749.43 against net units of 2,472, with a minus ₹704.97 credit producing payable ₹52,044.46. The difference between the 1,328 import kWh and the 2,472 net billed units is 1,144 kWh of adjustment, which is not broken down in the bill.",
    evidence: [
      { period: "Apr 2026", label: "Import / Export / Generation", value: "1,328 / 0 / 1,053 kWh", source: "APR26.pdf · printed on bill", pdf: "/bills/APR26.pdf" },
      { period: "Apr 2026", label: "Net units billed", value: "2,472 kWh", source: "APR26.pdf · printed on bill", pdf: "/bills/APR26.pdf" },
      { period: "Apr 2026", label: "Implied catch up units", value: "2,472 minus 1,328 = 1,144 kWh", source: "calculated by BillTrail" },
      { period: "Apr 2026", label: "Current bill / Credit / Payable", value: "₹52,749.43 / minus ₹704.97 / ₹52,044.46", source: "APR26.pdf · printed on bill", pdf: "/bills/APR26.pdf" },
    ],
    unknown: "The bill does not state which prior months the 1,144 units relate to, nor the reading basis or the tariff slabs used to recompute them.",
    question: "What billing periods did the 1,144 adjusted units cover, what reading basis was used, and at what tariff slab were they billed?",
  },
  {
    id: "o3", rule: "solar-export-change", severity: "amber",
    title: "Export reported as 0 from Apr to Jun 2026 while generation continues",
    affects: ["Apr 2026","May 2026","Jun 2026"],
    detection: "Rule solar-export-change. The generation column continues to log non zero values but the export column drops to zero across three consecutive bills. The pattern resumes in Jul 2026.",
    evidence: [
      { period: "Apr 2026", label: "Generation vs Export", value: "1,053 kWh generated · 0 kWh exported", source: "APR26.pdf · printed on bill", pdf: "/bills/APR26.pdf" },
      { period: "May 2026", label: "Generation vs Export", value: "548 kWh generated · 0 kWh exported", source: "MAY26.pdf · printed on bill", pdf: "/bills/MAY26.pdf" },
      { period: "Jun 2026", label: "Generation vs Export", value: "541 kWh generated · 0 kWh exported", source: "JUNE26.pdf · printed on bill", pdf: "/bills/JUNE26.pdf" },
      { period: "Jul 2026", label: "Generation vs Export", value: "409 kWh generated · 47 kWh exported", source: "JULY26.pdf · pattern resumes", pdf: "/bills/JULY26.pdf" },
    ],
    unknown: "The bills alone cannot say whether on site consumption actually absorbed all generation, whether the net meter stopped recording export, or whether a solar accounting change applied.",
    question: "Please share the inverter generation report and an independent net meter read for Apr to Jun 2026 so export can be verified.",
  },
  {
    id: "o4", rule: "arrears-mismatch", severity: "amber",
    title: "Arrears movement from Oct to Nov 2025 cannot be reconciled",
    affects: ["Oct 2025","Nov 2025"],
    detection: "Rule arrears-mismatch. Outstanding arrears visible on the Oct 2025 bill drop materially by the Nov 2025 bill. The two recorded payments in this window do not add up to the difference.",
    evidence: [
      { period: "Oct 2025", label: "Payable carried in bill", value: "₹28,720", source: "OCT25.pdf · printed on bill", pdf: "/bills/OCT25.pdf" },
      { period: "Nov 2025", label: "Payable carried in bill", value: "Bill present but readings not recorded", source: "NOV25.pdf", pdf: "/bills/NOV25.pdf" },
      { period: "Oct 2025", label: "Recorded payments in window", value: "₹4,310 (bill history) and ₹8,710 (ledger) on 28 Oct", source: "payment records" },
      { period: "Reconciliation", label: "Movement in arrears", value: "~₹28,700 reduction, not covered by recorded payments", source: "calculated by BillTrail" },
    ],
    unknown: "What caused the arrears to reduce beyond the recorded payments, for example a credit note, deposit adjustment, or correction entry.",
    question: "Please send the ledger lines that reduced arrears between the Oct and Nov 2025 bills.",
  },
  {
    id: "o5", rule: "payment-conflict", severity: "amber",
    title: "Payment amount conflicts between household ledger and bill history",
    affects: ["Sep 2025"],
    detection: "Rule payment-conflict. For the Sep 2025 bill the household ledger shows ₹8,710 as the payment made on 28 Oct 2025, while the official bill history for the same date shows ₹4,310. The ₹4,400 gap numerically matches the deposit adjustment that appears later on the Oct 2025 bill.",
    evidence: [
      { period: "28 Oct 2025", label: "Household ledger entry", value: "₹8,710 (Net-banking payment)", source: "household ledger" },
      { period: "28 Oct 2025", label: "Utility bill-history entry", value: "₹4,310 (UPI payment)", source: "bill-history" },
      { period: "Oct 2025", label: "Deposit adjustment on next bill", value: "minus ₹4,400", source: "OCT25.pdf · printed on bill", pdf: "/bills/OCT25.pdf" },
      { period: "Observation", label: "Numeric match", value: "₹8,710 − ₹4,310 = ₹4,400 (same as deposit adjustment)", source: "calculated by BillTrail" },
    ],
    unknown: "Whether the two entries are the same transaction accounted differently, or separate payments. The source of the ₹4,400 deposit adjustment is also not documented.",
    question: "What is the source of the ₹8,710 ledger entry on 28 Oct 2025, and does the ₹4,400 difference correspond to the deposit adjustment on the Oct 2025 bill?",
  },
  {
    id: "o6", rule: "meter-transition", severity: "amber",
    title: "Meter replaced in Mar 2026, replacement report not on file",
    affects: ["Mar 2026","Apr 2026"],
    detection: "Rule meter-transition. Meter readings on the Oct 2025 bill were 26,146 and dropped to 25,675 by Nov 2025. The meter was later replaced on 15 Mar 2026 and the new meter started at 0. The inspection and replacement report is not attached.",
    evidence: [
      { period: "02 Nov 2025", label: "Reading change on bill", value: "Oct 2025: 26,146 → Nov 2025: 25,675 (decrease)", source: "OCT25.pdf, NOV25.pdf", pdf: "/bills/OCT25.pdf" },
      { period: "15 Mar 2026", label: "Meter replacement event", value: "Old final 25,675 kWh → new meter start 0 kWh", source: "household record" },
      { period: "Apr 2026", label: "First bill after replacement", value: "Catch up of 1,144 adjusted units appears", source: "APR26.pdf", pdf: "/bills/APR26.pdf" },
    ],
    unknown: "The replacement date, old final reading sign off, new initial reading, phase or category change and inspection report are not documented in the bills themselves.",
    question: "Please share the meter replacement report with old final reading, new initial reading, phase or category and signed notice.",
  },
];

export const openQuestions = observations.map(o => ({
  id: o.id, question: o.question, status: "open", linked: o.affects,
}));

export const evidenceVault = [
  { id: "e01", category: "Bill",           name: "Bill_Aug2025.pdf",            date: "02 Sep 2025", linked: "b01", pdf: "/bills/AUG25.pdf" },
  { id: "e02", category: "Bill",           name: "Bill_Apr2026.pdf",            date: "04 May 2026", linked: "b09", pdf: "/bills/APR26.pdf" },
  { id: "e03", category: "Bill",           name: "Bill_Aug2026.pdf",            date: "03 Sep 2026", linked: "b13", pdf: "/bills/AUG26.pdf" },
  { id: "e04", category: "Payment",        name: "Receipt_Dec2025.jpg",         date: "05 Dec 2025", linked: "p04" },
  { id: "e05", category: "Correspondence", name: "Portal_ack_8891.png",         date: "08 Nov 2026", linked: "g01" },
  { id: "e06", category: "Representation", name: "Representation_14Nov26.pdf",  date: "14 Nov 2026", linked: "g02" },
];
