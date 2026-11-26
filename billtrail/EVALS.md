# BillTrail · Evaluation suite

What was tested, how to reproduce it, and what each test proves about the product's trust model.

## How to run

```bash
cd billtrail
npm install
npm test         # runs the suite, writes results.json
```

20 tests across 7 groups. All must pass before publishing an evaluator-facing build.

```
Test Files  1 passed (1)
     Tests  20 passed (20)
```

## Source of truth

The rule functions (`src/rules.js`) are **pure and deterministic**, shared between the UI and the test suite. The tests load the real case data (`src/data.js`, built from the 13 attached MSEDCL bill PDFs) so a passing test exercises the same code paths and the same values users see in the app.

## Groups

### 1 · Data fidelity
Prove that figures shown in the app match the printed figures on the attached PDFs to the paisa.

- `Aug 2026 printed payable matches bill record` → payable = ₹67,084.99, this-month = ₹38,878.51.
- `Apr 2026 implied adjustment is exactly 1,144 kWh` → net billed (2,472) minus import (1,328).
- `Apr 2026 credit adjustment reconciles` → payable = this-month + (-₹704.97).

### 2 · Arithmetic
Prove that every derived number is computed from source fields, not stored independently.

- `carriedOver is always payable minus current` for every bill.
- `Jun 2026 includes a -4,400 adjustment vs May 2026 running balance` — surfaces the June bill's negative adjustment without claiming its cause.

### 3 · Observation rule engine
Prove that the six observations trigger from the data, not from hardcoded strings.

- `frozen-readings` fires for Dec 2025 → Mar 2026.
- `solar-export-change` fires for Apr → Jun 2026.
- `catch-up` fires only for Apr 2026 when the threshold is 500 kWh.
- `payment-conflict` flags the 28 Oct 2025 ₹8,710 vs ₹4,310 mismatch.

### 4 · Negative controls
Prove that rules do NOT fire on ordinary months — the biggest risk in a fault-flagging product.

- Catch-up rule returns `[]` for all months except Apr 2026.
- A single month of zero export does not trigger the solar-export rule (requires a streak).
- Jul 2026 export is non-zero (the streak breaks correctly).

### 5 · Provenance
Prove that every material number ships with a source label.

- Every observation has at least one supporting evidence line.
- ≥ 90% of evidence lines are traceable to a named source (`printed on bill`, `ledger`, `receipt`, `inverter`, `bill-history`, `calculated`, `household`, `pdf`, `record`).
- Every bill with a non-null payable has an attached source PDF under `/bills/`.

### 6 · Date honesty
Prove that no event invents a date or reference number for something that has not been formally recorded.

- Every grievance event in `draft`, `prepared`, or `noted` state has `date === null`.
- Draft events never carry a reference number.

### 7 · Privacy
Prove that no raw utility-side identifier (consumer number, meter serial, 10+ digit ID) appears in any user-facing descriptive string.

- `redactConsumer` masks to the final 4 digits.
- Account label, bill notes, observation titles / detections / evidence, and grievance notes contain no 10+ digit runs.
- `account.consumer` is masked, not raw.

## Manual acceptance checks (not automated)

Also verified by hand before shipping:

- Open any bill from the Bills tab → "View original PDF" opens the correct source document.
- Tap any observation on Home or Analyse → detail sheet shows comparison months, exact values, per-row PDF links, what is unknown, and the neutral question to ask next.
- Analyse → each metric shows a Coverage note stating months included and how zero values should be interpreted.
- Export preview → cover summary, chronology, open questions and disclaimer all match the current records; no invented dates.
- Tour → 6 slides, resumable, auto-opens on first visit only.

## Known limitations

- Arithmetic check reconciles printed values. It does **not** validate that the adjustments, tariff slabs or reading basis themselves are correct.
- Zero-reading months (Dec 2025 → Mar 2026) are displayed as printed. The app explicitly surfaces that these zeros may reflect assessed or missing readings, not actual zero consumption.
- The 6 observations and their rules are the MVP set. Additional rules (`unexplained-adjustment`, `tariff-change`, `year-on-year-change`) are documented in the blueprint but not yet implemented.
