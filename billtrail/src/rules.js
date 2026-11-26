// Pure, deterministic rule and arithmetic functions.
// Shared by the UI and the test suite (one source of truth).

/** True implied-adjusted units on a bill, derived from printed source fields. */
export function adjustedUnits(bill) {
  return bill.units - bill.imp;
}

/** Amount carried over from earlier bills (payable minus this month's bill). */
export function carriedOver(bill) {
  if (bill.payable == null) return null;
  return bill.payable - bill.current;
}

/** Frozen-readings rule: at least `window` consecutive bills with import+export == 0
 *  while fixed charges continued to apply. Returns the list of affected periods, or []. */
export function detectFrozenReadings(bills, window = 3) {
  const affected = [];
  for (const b of bills) {
    if (b.imp === 0 && b.exp === 0) affected.push(b.period);
    else {
      if (affected.length >= window) return affected;
      affected.length = 0;
    }
  }
  return affected.length >= window ? affected : [];
}

/** Solar-export-change rule: generation > 0 and export == 0 for >= window consecutive bills. */
export function detectSolarExportDrop(bills, window = 3) {
  const affected = [];
  for (const b of bills) {
    if (b.gen > 0 && b.exp === 0) affected.push(b.period);
    else {
      if (affected.length >= window) return affected;
      affected.length = 0;
    }
  }
  return affected.length >= window ? affected : [];
}

/** Catch-up-adjustment rule: adjusted > catchUpThreshold kWh on a single bill. */
export function detectCatchUp(bills, catchUpThreshold = 500) {
  return bills.filter(b => Math.abs(adjustedUnits(b)) >= catchUpThreshold).map(b => b.period);
}

/** Payment-conflict rule: two payments on the same date for the same bill with different amounts. */
export function detectPaymentConflicts(payments) {
  const conflicts = [];
  const byKey = new Map();
  for (const p of payments) {
    const key = `${p.bill}|${p.date}`;
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(p);
  }
  for (const list of byKey.values()) {
    if (list.length < 2) continue;
    const amounts = new Set(list.map(p => p.amount));
    if (amounts.size > 1) conflicts.push(list);
  }
  return conflicts;
}

/** Redact a consumer number to the final 4 digits. Null-safe. */
export function redactConsumer(num) {
  if (!num || typeof num !== "string") return "";
  const digits = num.replace(/\D/g, "");
  if (digits.length < 4) return "****";
  return "XXXX-XXXX-" + digits.slice(-4);
}

/** True only for events that have a verifiable date record. Events without a date
 *  must never be shown with a fabricated one. */
export function hasVerifiedDate(event) {
  return typeof event.date === "string" && event.date.trim().length > 0;
}

/** Returns the share of material values that carry a traceable source label.
 *  A value is "traced" if its source is one of: printed on bill, ledger, receipt,
 *  solar inverter log, bill-history, calculated. */
const TRACED = ["printed", "ledger", "receipt", "inverter", "bill-history", "calculated", "household", "pdf", "record", "pattern"];
export function provenanceCoverage(evidenceList) {
  if (!evidenceList.length) return 0;
  let traced = 0;
  for (const e of evidenceList) {
    const t = (e.source || "").toLowerCase();
    if (TRACED.some(k => t.includes(k))) traced++;
  }
  return traced / evidenceList.length;
}
