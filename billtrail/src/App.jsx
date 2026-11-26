import { useEffect, useMemo, useState } from "react";
import Icon from "./Icon";
import {
  account, bills, payments, meterEvents, grievanceTimeline,
  observations, openQuestions, evidenceVault,
} from "./data";

const TABS = [
  { id: "home",    label: "Home",    icon: "home" },
  { id: "bills",   label: "Bills",   icon: "receipt" },
  { id: "analyse", label: "Analyse", icon: "chart" },
  { id: "case",    label: "Case",    icon: "folder" },
];

export default function App() {
  const [tab, setTab] = useState("home");
  const [tourOpen, setTourOpen] = useState(false);
  const [billId, setBillId] = useState(null);
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("billtrail.tourSeen")) setTourOpen(true);
  }, []);
  const closeTour = () => {
    localStorage.setItem("billtrail.tourSeen", "1");
    setTourOpen(false);
  };

  return (
    <div className="min-h-dvh w-full bg-canvas flex items-center justify-center md:py-6">
      <DesktopContext />

      <div className="phone-outer shadow-phone md:shadow-phone">
        <div className="phone-notch hidden md:block" />
        <div className="phone-inner">
          <StatusBar />
          <TopBar onTourClick={() => setTourOpen(true)} />

          <main className="h-[calc(100%-56px-56px-28px)] overflow-y-auto no-scrollbar scroll-smooth">
            <div className="px-5 pt-3 pb-36 fade-in" key={tab + (billId || "")}>
              {tab === "home"    && <Home onOpenBill={(id)=>{setBillId(id); setTab("bills");}} onOpenExport={()=>setExportOpen(true)} onOpenCase={()=>setTab("case")} onOpenAnalyse={()=>setTab("analyse")} />}
              {tab === "bills"   && <Bills billId={billId} setBillId={setBillId} />}
              {tab === "analyse" && <Analyse />}
              {tab === "case"    && <MyCase onOpenExport={()=>setExportOpen(true)} />}
            </div>
          </main>

          <BottomNav tab={tab} setTab={(t)=>{setTab(t); setBillId(null);}} />
        </div>
      </div>

      {tourOpen   && <Tour onClose={closeTour} />}
      {exportOpen && <ExportPreview onClose={()=>setExportOpen(false)} />}
    </div>
  );
}

/* ---------- desktop context ---------- */
function DesktopContext() {
  return (
    <div className="hidden lg:flex flex-col items-start justify-center pr-10 max-w-sm">
      <img src="/assets/logo.png" alt="BillTrail" className="h-10 w-auto img-contain" />
      <p className="mt-6 text-ink/90 text-lg leading-snug tracking-tightish">
        A calm, consumer owned case file for electricity bills.
      </p>
      <p className="mt-3 text-sm text-muted leading-relaxed">
        Designed for mobile. Open on your phone, or tap the tour inside the preview for a 60 second walkthrough.
      </p>
      <div className="mt-6 flex items-center gap-2 text-xs text-muted">
        <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
        Real household case from Amravati · 13 original MSEDCL bills attached
      </div>
    </div>
  );
}

/* ---------- status bar + top bar ---------- */
function StatusBar() {
  return (
    <div className="h-7 px-5 flex items-center justify-between text-[11px] font-semibold text-ink">
      <span>9:41</span>
      <span className="flex items-center gap-1.5 opacity-80">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="4" width="3" height="6" rx="1"/><rect x="5" y="2" width="3" height="8" rx="1"/><rect x="10" y="0" width="3" height="10" rx="1"/></svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M1 4c3-3 9-3 12 0M3 6c2-2 6-2 8 0M6 8l1 1 1-1" strokeLinecap="round"/></svg>
        <svg width="22" height="10" viewBox="0 0 22 10" fill="none"><rect x="0.5" y="0.5" width="18" height="9" rx="2" stroke="currentColor"/><rect x="2" y="2" width="14" height="6" rx="1" fill="currentColor"/><rect x="19.5" y="3" width="2" height="4" rx="0.5" fill="currentColor"/></svg>
      </span>
    </div>
  );
}

function TopBar({ onTourClick }) {
  return (
    <header className="h-14 px-5 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <img src="/assets/logo-mark.png" alt="" className="w-9 h-9 img-contain" />
        <div className="leading-none">
          <div className="text-[15px] font-semibold tracking-tightish">BillTrail</div>
          <div className="text-[10px] text-muted mt-0.5">Case file · Household A</div>
        </div>
      </div>
      <button
        onClick={onTourClick}
        className="chip bg-sage-900 text-lime-400 pr-3 active:scale-95 transition"
        aria-label="Take the tour"
      >
        <span className="w-4 h-4 rounded-full bg-lime-400 text-sage-900 flex items-center justify-center text-[10px] font-bold">?</span>
        Tour
      </button>
    </header>
  );
}

/* ---------- bottom nav ---------- */
function BottomNav({ tab, setTab }) {
  return (
    <div className="absolute bottom-0 inset-x-0 safe-bottom pb-3 pt-2 px-5 pointer-events-none">
      <nav className="pointer-events-auto bg-sage-900/95 backdrop-blur text-white rounded-full px-2 py-2 flex items-center justify-between shadow-float">
        {TABS.map(t => {
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={()=>setTab(t.id)}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-medium transition-all duration-300 active:scale-95
                ${active ? "bg-lime-400 text-sage-900" : "text-white/80 hover:text-white"}`}>
              <Icon name={t.icon} className={`w-[18px] h-[18px] ${active ? "" : "opacity-80 invert brightness-0"}`} />
              {active && <span className="animate-[fadeIn_200ms_ease]">{t.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/* ================= HOME ================= */
function Home({ onOpenBill, onOpenExport, onOpenCase, onOpenAnalyse }) {
  const latest = bills[bills.length - 1];
  const prev   = bills[bills.length - 2];
  const trend  = latest.payable - prev.payable;
  const [openObs, setOpenObs] = useState(null);

  return (
    <div className="space-y-4">
      {/* Greeting */}
      <section className="flex items-center justify-between">
        <div>
          <div className="eyebrow">Good morning</div>
          <h1 className="h-display text-[30px] text-ink leading-tight mt-1">Hello, Priya</h1>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-black/5 shadow-cardsm">
          <img src="/assets/priya.jpg" alt="" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Hero case card (dark) */}
      <section className="hero-dark text-white rounded-[28px] p-5 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-lime-400 font-medium">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-60 animate-ping"/>
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-lime-400"/>
              </span>
              Case status · Open
            </div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/50">Aug 25 to Aug 26</div>
          </div>

          <div className="mt-4 text-[12px] text-white/60">Outstanding balance on latest bill</div>
          <div className="mt-1 flex items-end gap-2">
            <div className="text-[44px] font-semibold leading-none tracking-tighter2">₹{latest.payable.toLocaleString("en-IN")}</div>
          </div>
          <div className="mt-2 text-[11px] text-white/55 max-w-[220px] leading-snug">
            Includes ₹{Math.max(latest.payable - latest.current, 0).toLocaleString("en-IN")} carried from earlier bills
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <button onClick={onOpenCase} className="btn-lime !py-2.5 !rounded-full text-[13px]">
              Continue my case
            </button>
            <button onClick={onOpenExport} className="btn !py-2.5 !rounded-full text-[13px] bg-white/10 text-white hover:bg-white/20 border border-white/10">
              <Icon name="download" className="w-4 h-4 invert brightness-0" /> Export
            </button>
          </div>
        </div>
        <img src="/assets/hero.png" alt=""
             className="absolute -right-8 -bottom-8 w-44 h-44 img-contain opacity-90 pointer-events-none select-none" />
      </section>

      <section className="grid grid-cols-2 gap-3">
        <MetricTile label="Open questions" value={openQuestions.length} sub="Awaiting reply" tone="lime" />
        <MetricTile label="Bills on file" value={bills.length} sub="Aug 25 to Aug 26" tone="sage" />
      </section>

      {/* What changed */}
      <section className="card p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[15px]">What changed this bill</h3>
          <button onClick={()=>onOpenBill(latest.id)} className="text-[12px] font-medium text-sage-900 active:scale-95 transition">Open ›</button>
        </div>
        <div className="mt-2 text-[12px] text-muted">{latest.period}</div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <Stat small label="This month" value={`₹${(latest.current/1000).toFixed(1)}k`} />
          <Stat small label="Units billed" value={`${latest.units} kWh`} />
          <Stat small label="Balance" value={`₹${(latest.payable/1000).toFixed(1)}k`} trend={trend} />
        </div>
        <div className="mt-4 rounded-2xl bg-warn-50 border border-warn-600/15 px-3 py-2.5 text-[12px] text-warn-600">
          {latest.note}
        </div>
      </section>

      {/* Sparkline card */}
      <section className="card p-5 cursor-pointer hover:shadow-card transition" onClick={onOpenAnalyse} role="button">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[15px]">Payable · 12 months</h3>
            <div className="text-[11px] text-muted mt-0.5">Tap to analyse</div>
          </div>
          <Icon name="chart" className="w-5 h-5" />
        </div>
        <MiniChart data={bills.map(b=>b.payable||0)} labels={bills.map(b=>b.period.split(" ")[0])} />
      </section>

      {/* Attention list */}
      <section className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-[15px]">Needs attention</h3>
          <span className="chip bg-sage-50 text-sage-900">{observations.length}</span>
        </div>
        <div className="space-y-2">
          {observations.slice(0,3).map(o => (
            <button key={o.id} onClick={()=>setOpenObs(o)}
              className="w-full flex gap-3 p-3 rounded-2xl bg-sage-50/60 text-left active:scale-[0.99] hover:bg-sage-50 transition">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-black/5">
                <Icon name="info" className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium leading-snug">{o.title}</div>
                <div className="text-[11px] text-muted mt-1 line-clamp-2">{o.detection}</div>
              </div>
              <span className="text-sage-900 font-semibold text-sm shrink-0 self-center">›</span>
            </button>
          ))}
        </div>
      </section>

      <PrivacyFooter />
      {openObs && <ObservationDetail o={openObs} onClose={()=>setOpenObs(null)} />}
    </div>
  );
}

function MetricTile({ label, value, sub, tone }) {
  const cls = tone === "lime" ? "bg-lime-200 text-sage-900" : "bg-sage-100 text-sage-900";
  return (
    <div className={`rounded-3xl p-4 ${cls}`}>
      <div className="text-[11px] opacity-70">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tightish">{value}</div>
      <div className="text-[11px] opacity-70">{sub}</div>
    </div>
  );
}

function Stat({ label, value, trend, small }) {
  return (
    <div>
      <div className={`${small ? "text-[11px]" : "text-xs"} text-muted`}>{label}</div>
      <div className={`font-semibold ${small ? "text-[15px]" : "text-lg"} tracking-tightish mt-0.5`}>{value}</div>
      {typeof trend === "number" && (
        <div className={`text-[10px] mt-0.5 ${trend < 0 ? "text-sage-700" : "text-warn-600"}`}>
          {trend > 0 ? "▲" : "▼"} ₹{Math.abs(trend).toLocaleString("en-IN")} vs last
        </div>
      )}
    </div>
  );
}

function MiniChart({ data, labels }) {
  const max = Math.max(...data, 1);
  const w = 320, h = 90, step = w/(data.length-1 || 1);
  const pts = data.map((d,i) => [i*step, h - (d/max)*h*0.9 - 4]);
  const line = pts.map(([x,y],i)=> (i?`L${x.toFixed(1)} ${y.toFixed(1)}`:`M${x.toFixed(1)} ${y.toFixed(1)}`)).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  return (
    <div className="mt-3">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[90px]">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C5F26A" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#C5F26A" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={area} fill="url(#g1)" />
        <path d={line} fill="none" stroke="#1F3B29" strokeWidth="1.6" strokeLinejoin="round"/>
        {pts.map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={i===pts.length-1 ? 3.2 : 1.6} fill={i===pts.length-1 ? "#1F3B29" : "#39543B"}/>
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-muted">
        {labels.filter((_,i)=> i%3===0 || i===labels.length-1).map((l,idx)=> <span key={idx}>{l}</span>)}
      </div>
    </div>
  );
}

/* ================= BILLS ================= */
function Bills({ billId, setBillId }) {
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => filter==="all" ? bills : bills.filter(b => b.status === filter), [filter]);

  if (billId) {
    const b = bills.find(x=>x.id===billId);
    if (b) return <BillDetail bill={b} onBack={()=>setBillId(null)} />;
  }

  return (
    <div className="space-y-4">
      <header>
        <div className="eyebrow">13 months · Aug 25 to Aug 26</div>
        <h1 className="h-display text-[30px] leading-tight mt-1">Bills</h1>
      </header>

      <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
        {[["all","All"],["verified","Confirmed"],["needs-review","Needs check"],["incomplete","Missing"]].map(([f,label]) => (
          <button key={f} onClick={()=>setFilter(f)}
            className={`chip shrink-0 px-3 py-1.5 transition active:scale-95 ${filter===f ? "bg-sage-900 text-lime-400" : "bg-white text-ink border border-black/5"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {filtered.map(b => (
          <button key={b.id} onClick={()=>setBillId(b.id)}
            className="card w-full text-left p-4 hover:shadow-card active:scale-[0.99] transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sage-50 flex items-center justify-center">
                  <Icon name="receipt" className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-[14px] tracking-tightish">{b.period}</div>
                  <div className="text-[11px] text-muted mt-0.5">{b.units} kWh · current ₹{b.current.toLocaleString("en-IN")}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-semibold tracking-tightish">
                  {b.payable!=null ? `₹${b.payable.toLocaleString("en-IN")}` : "n/a"}
                </div>
                <StatusPill s={b.status} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StatusPill({ s, full = false }) {
  const map = {
    "verified":     ["bg-sage-100 text-sage-900", full ? "Figures confirmed" : "Confirmed",   "●"],
    "needs-review": ["bg-warn-50 text-warn-600",   full ? "Needs checking"   : "Check",      "●"],
    "incomplete":   ["bg-black/5 text-muted",      full ? "Missing record"   : "Missing",    "○"],
  };
  const [cls, label, dot] = map[s] || ["bg-black/5 text-muted", s, "○"];
  return (
    <span className={`chip mt-1 whitespace-nowrap ${cls}`}>
      <span className="text-[8px] leading-none">{dot}</span>{label}
    </span>
  );
}

function StatusHelper({ status }) {
  const msg = {
    "verified":     "The figures on this bill have been read and match the attached PDF. This does not say the bill is correct.",
    "needs-review": "Something on this bill needs a second look before it is treated as final.",
    "incomplete":   "Key fields are not recorded for this month. Nothing has been assumed.",
  }[status];
  if (!msg) return null;
  return <div className="mt-2 text-[11px] text-muted leading-relaxed">{msg}</div>;
}

function BillDetail({ bill, onBack }) {
  const linkedPayments = payments.filter(p => p.bill === bill.id);
  const adjusted = bill.units - bill.imp; // implied adjustment on net billed units
  const carriedOver = bill.payable != null ? bill.payable - bill.current : null;

  return (
    <div className="space-y-4 fade-in">
      <button onClick={onBack} className="text-sm text-sage-900 font-medium active:scale-95 transition">‹ All bills</button>

      <section className="card-tinted p-5">
        <div className="text-[12px] text-muted">Billing period</div>
        <h2 className="h-display text-[30px] leading-tight mt-0.5">{bill.period}</h2>
        <StatusPill s={bill.status} full />
        <StatusHelper status={bill.status} />

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <div className="text-[11px] text-muted">This month's bill</div>
            <div className="text-[22px] font-semibold tracking-tighter2">₹{bill.current.toLocaleString("en-IN")}</div>
          </div>
          <div>
            <div className="text-[11px] text-muted">Outstanding balance</div>
            <div className="text-[22px] font-semibold text-sage-900 tracking-tighter2">
              {bill.payable!=null ? `₹${bill.payable.toLocaleString("en-IN")}` : "n/a"}
            </div>
          </div>
        </div>

        {bill.payable!=null && carriedOver > 0 && (
          <div className="mt-3 rounded-2xl bg-white/70 border border-black/5 p-3 text-[11px] text-ink/80 leading-relaxed">
            The <b>outstanding balance</b> of ₹{bill.payable.toLocaleString("en-IN")} is not just this month's bill. It is ₹{bill.current.toLocaleString("en-IN")} for {bill.period} plus ₹{carriedOver.toLocaleString("en-IN")} carried over from earlier unpaid months. Both numbers are printed on the bill.
          </div>
        )}

        <div className="mt-3 text-[12px] text-muted">{bill.note}</div>

        {bill.pdf && (
          <a href={bill.pdf} target="_blank" rel="noreferrer"
             className="mt-4 w-full btn-dark !py-2.5 !rounded-full text-[13px]">
            <Icon name="evidence" className="w-4 h-4 invert brightness-0" />
            View original PDF
          </a>
        )}
      </section>

      <Section title="Units">
        <KV k="Import"          v={`${bill.imp} kWh`}    source={{ text: "printed on bill", pdf: bill.pdf }} />
        <KV k="Export"          v={`${bill.exp} kWh`}    source={{ text: "printed on bill", pdf: bill.pdf }} />
        <KV k="Generation"      v={`${bill.gen} kWh`}    source={{ text: "solar inverter log · household record" }} />
        {adjusted !== 0 && (
          <KV k="Adjusted units" v={`${adjusted > 0 ? "+" : ""}${adjusted} kWh`}
              source={{ text: "calculated: net billed minus import" }} highlight />
        )}
        <KV k="Net units billed" v={`${bill.units} kWh`} source={{ text: "printed on bill", pdf: bill.pdf }} bold />
      </Section>

      <Section title="Charges">
        <KV k="This month's bill" v={`₹${bill.current.toLocaleString("en-IN")}`} source={{ text: "printed on bill", pdf: bill.pdf }} />
        {carriedOver != null && carriedOver !== 0 && (
          <KV k={carriedOver > 0 ? "Carried from earlier bills" : "Credit adjustment"}
              v={`${carriedOver < 0 ? "−" : "+"}₹${Math.abs(carriedOver).toLocaleString("en-IN")}`}
              source={{ text: "calculated: payable minus this month's bill" }} highlight />
        )}
        <KV k="Outstanding balance" v={bill.payable!=null ? `₹${bill.payable.toLocaleString("en-IN")}` : "Not recorded"}
            source={{ text: bill.payable!=null ? "printed on bill" : "missing", pdf: bill.payable!=null ? bill.pdf : null }} bold />
      </Section>

      <Section title="Arithmetic check">
        <div className="text-[12px] text-ink/80 leading-relaxed">
          BillTrail displays the figures exactly as they appear on the printed bill and shows how they relate. An arithmetic check that reconciles <b>does not</b> mean the bill is correct, only that its own numbers add up. Whether the adjustments, tariff slabs or reading basis are themselves correct is a question for the utility.
        </div>
      </Section>

      <Section title="Payments">
        {linkedPayments.length === 0 ? (
          <div className="text-[13px] text-muted">No payment record for this bill.</div>
        ) : linkedPayments.map(p => (
          <div key={p.id} className="flex items-start justify-between text-[13px] py-2 border-t border-hairline first:border-t-0">
            <div>
              <div className="font-semibold">₹{p.amount.toLocaleString("en-IN")}</div>
              <div className="text-[11px] text-muted mt-0.5">{p.date} · {p.mode} · {p.ref}</div>
              {p.conflict && <div className="text-[11px] text-warn-600 mt-1 max-w-[220px]">⚠ {p.conflict}</div>}
            </div>
            <span className="chip bg-sage-50 text-sage-900">from {p.source}</span>
          </div>
        ))}
      </Section>

      <div className="rounded-2xl bg-sage-50 p-3 text-[11px] text-muted leading-relaxed">
        Every number carries a source. BillTrail shows what the document says, it does not rewrite source values or decide whether the bill is correct.
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="card p-5">
      <h3 className="font-semibold text-[15px] mb-2">{title}</h3>
      {children}
    </section>
  );
}

function KV({ k, v, source, bold, highlight }) {
  const src = typeof source === "string" ? { text: source } : (source || {});
  return (
    <div className={`flex items-start justify-between py-2.5 border-t border-hairline first:border-t-0 text-[13px] ${highlight ? "bg-lime-200/30 -mx-5 px-5 border-t border-lime-400/30" : ""}`}>
      <div className={`${bold ? "text-ink font-semibold" : "text-muted"}`}>{k}</div>
      <div className="text-right">
        <div className={`${bold ? "text-[15px] font-semibold tracking-tightish" : "font-semibold"}`}>{v}</div>
        <div className="text-[10px] uppercase tracking-wider text-muted/80 mt-0.5 flex items-center gap-1 justify-end">
          <span>{src.text}</span>
          {src.pdf && (
            <a href={src.pdf} target="_blank" rel="noreferrer"
               className="ml-1 text-sage-900 normal-case tracking-normal font-semibold hover:underline">· view</a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= ANALYSE ================= */
function Analyse() {
  const [metric, setMetric] = useState("payable");
  const [openObs, setOpenObs] = useState(null);
  const series = useMemo(() => bills.map(b => ({
    label: b.period.slice(0,3),
    value: metric === "payable" ? (b.payable || 0)
         : metric === "units"   ? b.units
         : metric === "import"  ? b.imp
         : metric === "export"  ? b.exp : b.gen,
  })), [metric]);

  const max = Math.max(...series.map(s => s.value), 1);
  const total = series.reduce((a,s)=>a+s.value,0);
  const avg = Math.round(total/series.length);

  const metricLabels = {
    payable: ["Total payable","₹"], units:["Net units"," kWh"],
    import:["Import"," kWh"], export:["Export"," kWh"], gen:["Generation"," kWh"],
  };
  const [name, unit] = metricLabels[metric];

  return (
    <div className="space-y-4">
      <header>
        <div className="eyebrow">Patterns across months</div>
        <h1 className="h-display text-[30px] leading-tight mt-1">Analyse</h1>
      </header>

      <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
        {Object.entries(metricLabels).map(([id,[label]]) => (
          <button key={id} onClick={()=>setMetric(id)}
            className={`chip shrink-0 px-3 py-1.5 transition active:scale-95 ${metric===id ? "bg-sage-900 text-lime-400" : "bg-white text-ink border border-black/5"}`}>
            {label}
          </button>
        ))}
      </div>

      <section className="card p-5" key={metric}>
        <div className="flex items-baseline justify-between fade-in">
          <div>
            <div className="text-[12px] text-muted">{name} · avg / month</div>
            <div className="text-[28px] font-semibold tracking-tighter2">
              {unit === "₹" ? `₹${avg.toLocaleString("en-IN")}` : `${avg.toLocaleString("en-IN")}${unit}`}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-muted">Total</div>
            <div className="text-[14px] font-semibold">
              {unit === "₹" ? `₹${total.toLocaleString("en-IN")}` : `${total.toLocaleString("en-IN")}${unit}`}
            </div>
          </div>
        </div>

        <CoverageNote metric={metric} series={series} />

        <div className="mt-8 h-44 flex items-stretch gap-1.5">
          {series.map((s,i) => {
            const h = (s.value/max)*100;
            const isLast = i === series.length-1;
            return (
              <div key={i} className="flex-1 flex flex-col justify-end items-center group">
                <div className={`w-full rounded-t-lg relative bar-grow transition-colors duration-300 ${isLast ? "bg-lime-400" : "bg-sage-900 group-hover:bg-sage-700"}`}
                     style={{height: `${Math.max(h, 3)}%`, animationDelay: `${i*18}ms`}}>
                  {isLast && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-sage-900 bg-lime-400 px-1.5 py-0.5 rounded">
                      {unit==="₹" ? `₹${Math.round(s.value/1000)}k` : `${s.value}${unit.trim()}`}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex gap-1.5">
          {series.map((s,i)=> <div key={i} className="flex-1 text-center text-[10px] text-muted">{s.label}</div>)}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="font-semibold text-[15px]">Observations</h3>
          <span className="chip bg-warn-50 text-warn-600">Worth checking</span>
        </div>
        <div className="space-y-2">
          {observations.map(o => <ObservationCard key={o.id} o={o} onOpen={()=>setOpenObs(o)} />)}
        </div>
      </section>

      {openObs && <ObservationDetail o={openObs} onClose={()=>setOpenObs(null)} />}
    </div>
  );
}

function ObservationCard({ o, onOpen }) {
  return (
    <button onClick={onOpen} className="card p-4 w-full text-left active:scale-[0.99] hover:shadow-card transition">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-warn-50 flex items-center justify-center shrink-0">
          <span className="w-2 h-2 rounded-full bg-warn-600"/>
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-medium text-[14px] leading-snug">{o.title}</div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {o.affects.slice(0,3).map(x => <span key={x} className="chip bg-sage-50 text-sage-900">{x}</span>)}
            {o.affects.length > 3 && <span className="chip bg-sage-50 text-sage-900">+{o.affects.length-3}</span>}
          </div>
        </div>
        <span className="text-sage-900 font-semibold text-sm shrink-0">›</span>
      </div>
    </button>
  );
}

function ObservationDetail({ o, onClose }) {
  return (
    <Sheet title="Observation" onClose={onClose}>
      <div className="px-5 pt-1 pb-4 max-h-[75vh] overflow-y-auto">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-warn-50 flex items-center justify-center shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-warn-600"/>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] uppercase tracking-wider text-warn-600 font-semibold">Worth checking</div>
            <h3 className="font-semibold text-[16px] leading-snug mt-1">{o.title}</h3>
            <div className="mt-2 flex flex-wrap gap-1">
              {o.affects.map(x => <span key={x} className="chip bg-sage-50 text-sage-900">{x}</span>)}
            </div>
          </div>
        </div>

        <ObsBlock label="Why BillTrail flagged this">
          <p className="text-[13px] text-ink/80 leading-relaxed">{o.detection}</p>
          <div className="mt-2 text-[10px] uppercase tracking-wider text-muted">Rule · {o.rule}</div>
        </ObsBlock>

        <ObsBlock label="Supporting records">
          <div className="space-y-2">
            {o.evidence.map((e, idx) => (
              <div key={idx} className="rounded-2xl bg-sage-50/70 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-muted">{e.period}</div>
                    <div className="text-[13px] font-medium mt-0.5">{e.label}</div>
                    <div className="text-[13px] font-semibold text-sage-900 mt-1">{e.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted mt-1.5">{e.source}</div>
                  </div>
                  {e.pdf && (
                    <a href={e.pdf} target="_blank" rel="noreferrer"
                       className="chip bg-sage-900 text-lime-400 shrink-0 active:scale-95 transition">
                      View PDF
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ObsBlock>

        <ObsBlock label="What remains unknown">
          <p className="text-[13px] text-ink/80 leading-relaxed">{o.unknown}</p>
        </ObsBlock>

        <ObsBlock label="What to ask next">
          <div className="rounded-2xl bg-lime-200/60 border border-lime-400/30 p-3">
            <p className="text-[13px] text-sage-900 leading-relaxed">{o.question}</p>
          </div>
        </ObsBlock>

        <div className="mt-4 text-[11px] text-muted leading-relaxed">
          This is a neutral observation, not a fault conclusion. BillTrail organises what the attached bills show, it does not determine whether a meter is faulty, a bill is unlawful, or the utility is at fault.
        </div>
      </div>
    </Sheet>
  );
}

function CoverageNote({ metric, series }) {
  const total = series.length;
  const zeros = series.filter(s => s.value === 0).length;
  // Which months with zero might actually be missing-not-truly-zero
  const frozenPeriods = ["Dec","Jan","Feb","Mar","Nov"];
  const zeroButLikelyMissing = series.filter(s => s.value === 0 && frozenPeriods.includes(s.label)).map(s=>s.label);

  const metricHints = {
    payable: "Figures are the outstanding balance printed on each bill.",
    units:   "Net units billed as printed on each bill. Four months (Dec 2025 to Mar 2026) show 0 kWh which may reflect assessed or missing readings, not actual zero consumption.",
    import:  "Import kWh as printed. Zero values during Dec 2025 to Mar 2026 may reflect assessed or missing readings.",
    export:  "Export kWh as printed. Zero does not automatically mean nothing was exported, see the solar export observation.",
    gen:     "Generation from household solar inverter log, not the utility bill. Figures for Dec 2025 to Mar 2026 are not recorded.",
  }[metric];

  return (
    <div className="mt-3 rounded-2xl bg-sage-50/70 p-3 text-[11px] text-ink/75 leading-relaxed">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-sage-900 font-semibold mb-1">
        <span>Coverage</span>
        <span className="text-muted normal-case tracking-normal font-normal">
          {total} months · Aug 2025 to Aug 2026
        </span>
      </div>
      <p>{metricHints}</p>
      {zeros > 0 && (
        <p className="mt-1.5 text-muted">
          <b className="text-ink/80">{zeros} of {total} bills show 0</b> for this metric.
          {zeroButLikelyMissing.length > 0 && (
            <> Zeros in {zeroButLikelyMissing.join(", ")} overlap the period where readings appear frozen, so they may not be true zeros.</>
          )}
        </p>
      )}
    </div>
  );
}

function ObsBlock({ label, children }) {
  return (
    <section className="mt-5">
      <div className="text-[10px] uppercase tracking-wider text-sage-900 font-semibold">{label}</div>
      <div className="mt-2">{children}</div>
    </section>
  );
}

/* ================= MY CASE ================= */
function MyCase({ onOpenExport }) {
  const [sub, setSub] = useState("timeline");
  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="eyebrow">{openQuestions.length} open questions</div>
          <h1 className="h-display text-[30px] leading-tight mt-1">My case</h1>
        </div>
        <img src="/assets/resolved.png" alt="" className="w-16 h-16 img-contain opacity-90" />
      </header>

      <button onClick={onOpenExport} className="w-full card p-4 flex items-center justify-between hover:shadow-float active:scale-[0.99] transition">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-lime-200 flex items-center justify-center">
            <Icon name="download" className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-[14px]">Export case file</div>
            <div className="text-[11px] text-muted">PDF summary and JSON backup</div>
          </div>
        </div>
        <span className="text-sage-900 font-semibold text-sm">›</span>
      </button>

      <div className="flex gap-1.5">
        {[["timeline","Timeline"],["questions","Questions"],["vault","Evidence"]].map(([id,label])=>(
          <button key={id} onClick={()=>setSub(id)}
            className={`chip px-3 py-1.5 flex-1 justify-center transition active:scale-95 ${sub===id ? "bg-sage-900 text-lime-400" : "bg-white text-ink border border-black/5"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="fade-in" key={sub}>
        {sub==="timeline" && (
          <section className="card p-5">
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-sage-200" />
              {grievanceTimeline.map(ev => (
                <div key={ev.id} className="relative pl-7 pb-5 last:pb-0">
                  <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full bg-lime-400 ring-4 ring-white border border-sage-900/10" />
                  <div className="text-[11px] text-muted">{ev.date || "Date not recorded"}</div>
                  <div className="font-semibold text-[14px] leading-snug">{ev.stage}</div>
                  <div className="text-[11px] text-muted mt-0.5">
                    {ev.channel ? `${ev.channel} · ` : ""}{ev.ref || "no reference"} · <span className="text-sage-900 font-medium">{ev.status}</span>
                  </div>
                  <div className="text-[12px] text-ink/80 mt-1 leading-relaxed">{ev.note}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {sub==="questions" && (
          <section className="space-y-2">
            {openQuestions.map(q => (
              <div key={q.id} className="card p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-sage-50 flex items-center justify-center shrink-0">
                    <Icon name="question" className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] leading-snug">{q.question}</div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {q.linked.map(l => <span key={l} className="chip bg-sage-50 text-sage-900">{l}</span>)}
                    </div>
                  </div>
                  <span className="chip bg-warn-50 text-warn-600 shrink-0">Open</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {sub==="vault" && (
          <section className="space-y-2">
            {evidenceVault.map(e => {
              const Row = e.pdf ? "a" : "div";
              const rowProps = e.pdf ? { href: e.pdf, target: "_blank", rel: "noreferrer" } : {};
              return (
                <Row key={e.id} {...rowProps}
                  className={`card p-3 flex items-center gap-3 ${e.pdf ? "active:scale-[0.99] hover:shadow-card transition" : ""}`}>
                  <div className="w-11 h-14 rounded-xl bg-sage-50 border border-black/5 flex items-center justify-center">
                    <Icon name="evidence" className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold truncate">{e.name}</div>
                    <div className="text-[11px] text-muted mt-0.5">{e.date} · linked {e.linked}</div>
                  </div>
                  <span className="chip bg-sage-50 text-sage-900 shrink-0">{e.category}</span>
                </Row>
              );
            })}
          </section>
        )}
      </div>

      {/* Advocate card */}
      <section className="card-tinted p-5 flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full bg-white overflow-hidden flex items-center justify-center ring-1 ring-black/5">
          <img src="/assets/advocate.png" alt="" className="w-16 h-16 img-contain -translate-y-0.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold">Share with your advocate</div>
          <div className="text-[11px] text-muted mt-0.5">Hand off a neutral, source linked case file in one PDF.</div>
        </div>
      </section>

      <PrivacyFooter />
    </div>
  );
}

/* ================= EXPORT PREVIEW ================= */
function ExportPreview({ onClose }) {
  return (
    <Sheet title="Case file · Preview" onClose={onClose}>
      <div className="px-5 py-4 max-h-[70vh] overflow-y-auto space-y-4 text-[13px]">
        <div className="flex items-center gap-3">
          <img src="/assets/resolved.png" className="w-14 h-14 img-contain" alt="" />
          <div>
            <div className="font-semibold">BillTrail · Neutral case summary</div>
            <div className="text-[11px] text-muted">Generated 26 Nov 2026 · Draft for human review</div>
          </div>
        </div>
        <Block title="Cover">
          Household A · Residential · Aug 2025 to Aug 2026 · Status <b>Unresolved</b>.
          Frozen readings Dec 2025 to Mar 2026, catch up of 1,144 adjusted units in Apr 2026, solar export zero Apr to Jun 2026 while generation continues.
        </Block>
        <Block title="Chronology">
          13 billing events · 4 payments · 2 meter events · 4 grievance events.
        </Block>
        <Block title={`Open questions (${openQuestions.length})`}>
          Catch up calculation and reading basis for Apr 2026 · Meter replacement report Mar 2026 · Solar export zero Apr to Jun 2026 · Ledger vs bill history (₹8,710 vs ₹4,310) · Arrears Oct to Nov 2025 · Reading basis Dec 2025 to Mar 2026.
        </Block>
        <Block title="Disclaimer">
          BillTrail organises the household's own records. It does not file complaints, interpret the law, decide who is right, or determine whether a bill or meter is faulty.
        </Block>
      </div>
      <div className="flex items-center justify-between gap-2 px-5 py-4 border-t border-hairline">
        <span className="text-[11px] text-muted">PDF and JSON. Privacy scan before sharing.</span>
        <div className="flex gap-2">
          <button className="btn-plain !py-2 !px-3 text-[13px]" onClick={onClose}>Close</button>
          <button className="btn-dark !py-2 !px-3 text-[13px]"
            onClick={()=>alert("Demo. A PDF plus JSON would be prepared, then a privacy scan confirms before sharing.")}>
            Generate PDF
          </button>
        </div>
      </div>
    </Sheet>
  );
}

function Block({ title, children }) {
  return (
    <section>
      <div className="text-[10px] uppercase tracking-wider text-sage-900 font-semibold">{title}</div>
      <div className="mt-1 text-ink/80 leading-relaxed">{children}</div>
    </section>
  );
}

/* ================= TOUR ================= */
function Tour({ onClose }) {
  const [i, setI] = useState(0);
  const slides = [
    { title: "Reconstruct your case", body: "A calm place to put every electricity bill, meter event, payment and reply into one clear record.", img: "/assets/hero.png" },
    { title: "Home at a glance",      body: "Status, last action, next follow up, open questions and the latest bill snapshot.", icon: "home" },
    { title: "Every number has a source", body: "Each figure is labelled. From the printed bill, your ledger, a receipt, or calculated by BillTrail.", icon: "receipt" },
    { title: "One chart at a time",   body: "Switch between payable, units, import, export and generation. Amber items are worth checking.", icon: "chart" },
    { title: "Chronology and evidence", body: "A single timeline of complaints and replies, with a tagged evidence vault.", icon: "folder" },
    { title: "Export a neutral file", body: "A PDF summary plus JSON backup. Privacy scan before sharing. No invented dates or replies.", img: "/assets/resolved.png" },
  ];
  const s = slides[i];
  const last = i === slides.length - 1;

  return (
    <Sheet title={`Welcome · ${i+1} / ${slides.length}`} onClose={onClose}>
      <div className="px-5 pt-3 pb-5 text-center fade-in" key={i}>
        <div className="mx-auto w-full aspect-[5/4] rounded-3xl bg-sage-50 flex items-center justify-center overflow-hidden">
          {s.img
            ? <img src={s.img} className="w-3/4 h-3/4 img-contain" alt="" />
            : <div className="w-24 h-24 rounded-3xl bg-white border border-black/5 flex items-center justify-center shadow-cardsm">
                <Icon name={s.icon} className="w-12 h-12" />
              </div>}
        </div>
        <h3 className="h-display text-[26px] leading-tight mt-5">{s.title}</h3>
        <p className="text-[13px] text-muted mt-2 max-w-xs mx-auto leading-relaxed">{s.body}</p>
      </div>
      <div className="px-5 pb-5 flex items-center justify-between">
        <div className="flex gap-1.5">
          {slides.map((_,idx)=>(
            <span key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx===i ? "w-5 bg-sage-900" : "w-1.5 bg-black/15"}`} />
          ))}
        </div>
        <div className="flex gap-2">
          {i>0 && <button className="btn-plain !py-2 !px-3 text-[13px]" onClick={()=>setI(i-1)}>Back</button>}
          {!last && <button className="btn-dark !py-2 !px-3 text-[13px]" onClick={()=>setI(i+1)}>Next</button>}
          {last  && <button className="btn-lime !py-2 !px-3 text-[13px]" onClick={onClose}>Start ›</button>}
        </div>
      </div>
    </Sheet>
  );
}

/* ---------- shared ---------- */
function Sheet({ title, children, onClose }) {
  useEffect(()=>{
    const k = (e)=> e.key==="Escape" && onClose();
    window.addEventListener("keydown",k);
    return ()=>window.removeEventListener("keydown",k);
  },[onClose]);
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div onClick={e=>e.stopPropagation()}
           className="w-full md:max-w-[400px] bg-app rounded-t-[28px] md:rounded-[28px] overflow-hidden shadow-float"
           style={{animation: "slideUp 280ms cubic-bezier(.2,.9,.3,1) both"}}>
        <div className="pt-2 flex justify-center"><div className="w-10 h-1 rounded-full bg-black/15"/></div>
        <div className="flex items-center justify-between px-5 py-3">
          <div className="text-[13px] font-semibold text-muted">{title}</div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-xl text-muted">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function PrivacyFooter() {
  return (
    <div className="flex items-start gap-2 p-3 rounded-2xl bg-sage-50 text-[11px] text-sage-900">
      <Icon name="shield" className="w-4 h-4 mt-0.5" />
      <div>
        <b>Consumer owned, local first.</b> Your records stay in your browser. BillTrail does not file complaints or claim legal authority.
      </div>
    </div>
  );
}
