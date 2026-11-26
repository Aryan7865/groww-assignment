// Synthetic demo data derived from the BillTrail blueprint (Section 9, family case study).
// All identifiers are redacted. Attached PDFs are the real source bills, provided for inspection.

export const account = {
  label: "Household A · Residential · Single phase",
  consumer: "XXXX-XXXX-0000 (redacted)",
  period: "Aug 2025 to Aug 2026",
  status: "Unresolved",
  lastAction: "Representation drafted · 14 Nov 2026",
  nextFollowUp: "Await utility response · due 28 Nov 2026",
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

export const grievanceTimeline = [
  { id: "g01", date: "08 Nov 2026", stage: "Internal utility complaint", channel: "Portal", ref: "WEB-INT-8891", status: "acknowledged", note: "Submitted via consumer portal. Acknowledgement SMS received." },
  { id: "g02", date: "14 Nov 2026", stage: "Written representation",      channel: "Email",  ref: "EM-14NOV26",   status: "submitted",    note: "Representation prepared by advocate and sent to Nodal Officer." },
  { id: "g03", date: null,          stage: "CGRF filing",                 channel: null,     ref: null,           status: "prepared",     note: "Draft prepared, not yet submitted." },
  { id: "g04", date: "20 Nov 2026", stage: "Consumer forum registration", channel: "Portal", ref: "CF-REG-2210",  status: "acknowledged", note: "User reported registration. Status: unresolved." },
];

export const observations = [
  { id: "o1", rule: "frozen-readings",    severity: "amber", title: "Readings appear frozen Dec 2025 to Mar 2026",
    affects: ["Dec 2025","Jan 2026","Feb 2026","Mar 2026"],
    caveat: "Import and export unchanged across 4 consecutive bills while generation was logged in Feb. Could reflect missing or assessed readings.",
    question: "How were readings obtained for Dec 2025 to Mar 2026, and when was the next actual reading taken?",
  },
  { id: "o2", rule: "catch-up-adjustment", severity: "amber", title: "Large catch up of 1,144 adjusted units in Apr 2026",
    affects: ["Apr 2026"],
    caveat: "Current bill ₹52,749.43 with payable ₹52,044.46 after minus ₹704.97 credit. Period, basis and source of the adjusted units are not established in attached records.",
    question: "What period and calculation produced the 1,144 adjusted units, and what reading basis was used?",
  },
  { id: "o3", rule: "solar-export-change", severity: "amber", title: "Export reported as 0 from Apr to Jun 2026 while generation continues",
    affects: ["Apr 2026","May 2026","Jun 2026"],
    caveat: "Generation shown (1,053, 548, 541 kWh) but export recorded zero. Higher on site use may explain lower export. A meter or accounting cause is also possible.",
    question: "Request inverter report and independent net meter readings for Apr to Jun 2026.",
  },
  { id: "o4", rule: "arrears-mismatch",   severity: "amber", title: "Arrears movement Oct to Nov 2025 cannot be reconciled",
    affects: ["Oct 2025","Nov 2025"],
    caveat: "About ₹28,700 moves out of arrears across these months. Recorded payments alone do not account for the movement.",
    question: "Request the ledger lines that reduced arrears between Oct and Nov 2025.",
  },
  { id: "o5", rule: "payment-conflict",   severity: "amber", title: "Payment amount conflicts between ledger and bill history",
    affects: ["Sep 2025"],
    caveat: "Household ledger shows ₹8,710 for Sep 2025. Bill history shows ₹4,310 on 28 Oct 2025. The ₹4,400 difference matches an Oct deposit adjustment numerically, but the cause is unknown.",
    question: "What is the source of the ₹8,710 ledger entry, and does the ₹4,400 difference correspond to a deposit adjustment?",
  },
  { id: "o6", rule: "meter-transition",   severity: "amber", title: "Meter replaced Mar 2026, replacement report not on file",
    affects: ["Mar 2026","Apr 2026"],
    caveat: "Old final reading 25,675. New meter started at 0 on 15 Mar 2026. Replacement date, phase or category and inspection report are not attached.",
    question: "Request meter replacement report with old final reading, new initial reading, phase or category and signed notice.",
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
