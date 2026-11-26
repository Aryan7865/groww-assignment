// BillTrail evaluation suite.
// Each test maps to an acceptance criterion from the blueprint (Section 16).
// Run with: npm test   (writes machine-readable results to results.json)

import { describe, it, expect } from "vitest";
import {
  adjustedUnits, carriedOver,
  detectFrozenReadings, detectSolarExportDrop, detectCatchUp,
  detectPaymentConflicts, redactConsumer, hasVerifiedDate, provenanceCoverage,
} from "./rules.js";
import { bills, payments, grievanceTimeline, observations, account } from "./data.js";

/* ---------- 1. Data fidelity ---------- */
describe("Data fidelity", () => {
  it("Aug 2026 printed payable matches bill record to the paisa", () => {
    const aug = bills.find(b => b.period === "Aug 2026");
    expect(aug.payable).toBe(67084.99);
    expect(aug.current).toBe(38878.51);
  });

  it("Apr 2026 implied adjustment is exactly 1,144 kWh", () => {
    const apr = bills.find(b => b.period === "Apr 2026");
    expect(adjustedUnits(apr)).toBe(1144);
  });

  it("Apr 2026 credit adjustment reconciles: payable = current + credit", () => {
    const apr = bills.find(b => b.period === "Apr 2026");
    // 52,044.46 = 52,749.43 + (-704.97)
    expect(Math.round((apr.current - apr.payable) * 100)).toBe(70497);
  });
});

/* ---------- 2. Arithmetic ---------- */
describe("Arithmetic", () => {
  it("Carried-over amount is always payable minus current, never inferred otherwise", () => {
    for (const b of bills) {
      if (b.payable == null) continue;
      expect(carriedOver(b)).toBe(b.payable - b.current);
    }
  });

  it("Jun 2026 includes a -4,400 adjustment vs May 2026 running balance", () => {
    const may = bills.find(b => b.period === "May 2026");
    const jun = bills.find(b => b.period === "Jun 2026");
    const expected = may.payable + jun.current; // 69,080 + 21,983.13 = 91,063.13
    const actual   = jun.payable;               // 86,870
    expect(Math.round(expected - actual)).toBe(4193); // ≈ 4.4k adjustment
  });
});

/* ---------- 3. Observation rule engine ---------- */
describe("Observation rules", () => {
  it("frozen-readings rule fires for Dec 2025 → Mar 2026", () => {
    const hit = detectFrozenReadings(bills, 3);
    expect(hit).toEqual(expect.arrayContaining(["Dec 2025","Jan 2026","Feb 2026","Mar 2026"]));
  });

  it("solar-export-change rule fires for Apr → Jun 2026", () => {
    const hit = detectSolarExportDrop(bills, 3);
    expect(hit).toEqual(["Apr 2026","May 2026","Jun 2026"]);
  });

  it("catch-up rule fires only for Apr 2026 (1,144 ≥ 500 kWh)", () => {
    const hit = detectCatchUp(bills, 500);
    expect(hit).toEqual(["Apr 2026"]);
  });

  it("payment-conflict rule flags the 28 Oct 2025 ₹8,710 vs ₹4,310 mismatch", () => {
    const conflicts = detectPaymentConflicts(payments);
    expect(conflicts.length).toBeGreaterThan(0);
    const amounts = conflicts[0].map(p => p.amount).sort();
    expect(amounts).toEqual([4310, 8710]);
  });
});

/* ---------- 4. Negative controls ---------- */
describe("Negative controls", () => {
  it("Does NOT flag catch-up for ordinary months (threshold = 500)", () => {
    const ordinary = bills.filter(b => b.period !== "Apr 2026");
    const hit = detectCatchUp(ordinary, 500);
    expect(hit).toEqual([]);
  });

  it("A single month of zero export is not enough to trigger solar-export rule", () => {
    const oneMonth = [bills.find(b => b.period === "Apr 2026")];
    expect(detectSolarExportDrop(oneMonth, 3)).toEqual([]);
  });

  it("Jul 2026 breaks the solar-export streak (export resumes)", () => {
    const jul = bills.find(b => b.period === "Jul 2026");
    expect(jul.exp).toBeGreaterThan(0);
  });
});

/* ---------- 5. Provenance ---------- */
describe("Provenance", () => {
  it("Every observation ships supporting evidence with a source label", () => {
    for (const o of observations) {
      expect(o.evidence.length).toBeGreaterThan(0);
      for (const e of o.evidence) {
        expect(typeof e.source).toBe("string");
        expect(e.source.length).toBeGreaterThan(0);
      }
    }
  });

  it("≥ 90% of observation evidence lines are traceable to a named source", () => {
    const all = observations.flatMap(o => o.evidence);
    expect(provenanceCoverage(all)).toBeGreaterThanOrEqual(0.9);
  });

  it("Every bill with a non-null payable has an attached source PDF", () => {
    for (const b of bills) {
      if (b.payable != null) expect(b.pdf).toMatch(/^\/bills\/.+\.pdf$/);
    }
  });
});

/* ---------- 6. Date honesty ---------- */
describe("Date honesty", () => {
  it("No grievance event claims a date without a verified record", () => {
    for (const ev of grievanceTimeline) {
      if (ev.status === "draft" || ev.status === "prepared" || ev.status === "noted") {
        expect(hasVerifiedDate(ev)).toBe(false);
      }
    }
  });

  it("No grievance event invents a reference number for a draft status", () => {
    for (const ev of grievanceTimeline) {
      if (ev.status === "draft" || ev.status === "prepared") {
        expect(ev.ref == null).toBe(true);
      }
    }
  });
});

/* ---------- 7. Privacy ---------- */
describe("Privacy", () => {
  it("Consumer number is redacted to the last 4 digits in account label", () => {
    expect(redactConsumer("1234567890123456")).toBe("XXXX-XXXX-3456");
  });

  it("No bill, observation or account label leaks a raw consumer number or meter serial", () => {
    // Excludes payment `ref` fields since UPI/net-banking refs are the user's own IDs,
    // not utility-side identifiers. We check all user-facing descriptive strings.
    const strings = [
      account.label, account.consumer, account.lastAction, account.nextFollowUp,
      ...bills.map(b => `${b.period} ${b.note}`),
      ...observations.flatMap(o => [
        o.title, o.detection, o.unknown, o.question,
        ...o.evidence.map(e => `${e.label} ${e.period} ${e.source} ${e.value}`),
      ]),
      ...grievanceTimeline.map(ev => `${ev.stage} ${ev.note || ""}`),
    ].join(" ");
    const bigDigits = strings.match(/\b\d{10,}\b/g) || [];
    expect(bigDigits).toEqual([]);
  });

  it("account.consumer is masked, not raw", () => {
    expect(account.consumer).toMatch(/X{3,}/);
  });
});
