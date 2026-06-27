import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "react-hot-toast";
import { Phone, TrendingUp, Clock, Zap, Search, CheckCircle2, AlertCircle, RotateCcw, PhoneMissed, PhoneOutgoing, PhoneIncoming, Star } from "lucide-react";
import { a as StatCard, G as GlassCard, B as Badge } from "./Primitives-CmGbnOU9.js";
import { Z as useEmployee, e as EMP_CALL_STATS, w as SEGMENT_WRAP, S as SEGMENT_BTN, u as SEGMENT_BTN_ACTIVE, v as SEGMENT_BTN_INACTIVE, q as EMP_TEAM_CALL } from "./_-BNdSRMjW.js";
import { E as EmpEmptyState, A as AvatarCircle } from "./EmpUI-DSKHyseP.js";
import "framer-motion";
import "@tanstack/react-query";
import "react-dom";
const PERIOD_LABEL = { today: "Today", week: "This Week", month: "This Month" };
const TYPE_META = {
  in: { icon: PhoneIncoming, label: "Inbound", tone: "success", bg: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  out: { icon: PhoneOutgoing, label: "Outbound", tone: "primary", bg: "bg-rose-50 text-rose-600 border-rose-100" },
  miss: { icon: PhoneMissed, label: "Missed", tone: "warning", bg: "bg-amber-50 text-amber-700 border-amber-100" }
};
function useRingOffset(pct) {
  const circ = 100;
  const [offset, setOffset] = useState(circ);
  useEffect(() => {
    const t = setTimeout(() => setOffset(circ * (1 - pct)), 100);
    return () => clearTimeout(t);
  }, [pct]);
  return offset;
}
function MetricRingChart({ pct, color, sizeClass = "w-10 h-10 sm:w-14 sm:h-14", labelClass = "text-[9px] sm:text-[11px]" }) {
  const offset = useRingOffset(pct);
  return /* @__PURE__ */ jsxs("div", { className: `relative shrink-0 mx-auto sm:mx-0 ${sizeClass}`, children: [
    /* @__PURE__ */ jsxs("svg", { width: "100%", height: "100%", viewBox: "0 0 56 56", className: "-rotate-90", children: [
      /* @__PURE__ */ jsx("circle", { cx: "28", cy: "28", r: "22", fill: "none", stroke: "#ffe4e6", strokeWidth: "5" }),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: "28",
          cy: "28",
          r: "22",
          fill: "none",
          stroke: color,
          strokeWidth: "5",
          strokeLinecap: "round",
          strokeDasharray: 100,
          strokeDashoffset: offset,
          className: "transition-[stroke-dashoffset] duration-[1.2s] ease-out"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `absolute inset-0 grid place-items-center font-black ${labelClass}`, style: { color }, children: [
      Math.round(pct * 100),
      "%"
    ] })
  ] });
}
function RingMini({ pct, color, label, shortLabel }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center gap-1 sm:flex-row sm:items-center sm:text-left sm:gap-3 min-w-0", children: [
    /* @__PURE__ */ jsx(MetricRingChart, { pct, color }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 w-full", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-[8px] sm:text-xs font-bold text-slate-900 leading-tight", children: [
        /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: shortLabel || label }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: label })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "hidden sm:block text-[10px] text-slate-500 mt-0.5", children: "Target benchmark" })
    ] })
  ] });
}
function CallMetricCard({ pct, color, label, shortLabel, footer, accentRgb }) {
  return /* @__PURE__ */ jsxs(GlassCard, { className: "p-2 sm:p-4 min-w-0 lg:p-0 lg:overflow-hidden lg:relative lg:flex lg:flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:hidden", children: [
      /* @__PURE__ */ jsx(RingMini, { pct, color, label, shortLabel }),
      /* @__PURE__ */ jsx("p", { className: "hidden sm:block text-[10px] text-slate-500 mt-3 font-medium", children: footer })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex lg:flex-col lg:flex-1 lg:min-h-[108px]", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "pointer-events-none absolute inset-0 opacity-90",
          style: {
            background: `radial-gradient(ellipse 120% 80% at 100% 100%, rgba(${accentRgb}, 0.08) 0%, transparent 55%), linear-gradient(180deg, #fffafa 0%, #ffffff 100%)`
          }
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative flex items-center gap-3.5 px-4 pt-3.5 pb-3 flex-1 min-h-0", children: [
        /* @__PURE__ */ jsx(MetricRingChart, { pct, color, sizeClass: "w-[62px] h-[62px]", labelClass: "text-sm" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900 leading-tight", children: label }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-500 mt-0.5", children: "Target benchmark" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "relative shrink-0 px-4 py-2 border-t border-rose-100/80 text-[11px] text-slate-500 font-medium bg-white/70", children: footer })
    ] })
  ] });
}
function CallLogItem({ call, active, onSelect }) {
  const meta = TYPE_META[call.type] || TYPE_META.out;
  const Icon = meta.icon;
  const timeOnly = call.date?.includes("Today") ? call.date.replace("Today ", "") : call.date?.split(",")?.pop()?.trim() || call.date;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick: () => onSelect(call),
      className: `w-full text-left border transition-all duration-200 min-w-0 ${active ? "border-rose-300 bg-rose-50/60 shadow-[0_4px_16px_rgba(244,63,94,0.1)] ring-1 ring-rose-100" : "border-rose-100/80 bg-white hover:border-rose-200 hover:bg-rose-50/30"} p-2 rounded-lg sm:p-4 sm:rounded-xl`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0 sm:hidden", children: [
          /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-lg grid place-items-center shrink-0 border ${meta.bg}`, children: /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-1.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-900 truncate leading-tight", children: call.name }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 truncate leading-tight", children: call.company })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] font-black text-slate-900 tabular-nums shrink-0", children: call.duration })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 mt-1 min-w-0", children: [
              /* @__PURE__ */ jsx("span", { className: "inline-flex max-w-[38%] shrink-0", children: /* @__PURE__ */ jsx("span", { className: `text-[7px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border truncate block ${meta.bg}`, children: call.outcome }) }),
              call.rating > 0 && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-600 shrink-0", children: [
                /* @__PURE__ */ jsx(Star, { className: "w-2.5 h-2.5 fill-amber-400 text-amber-400" }),
                " ",
                call.rating
              ] }),
              call.hasRec && /* @__PURE__ */ jsx("span", { className: "text-[7px] font-bold text-violet-700 bg-violet-50 px-1 py-0.5 rounded border border-violet-100 shrink-0", children: "REC" }),
              /* @__PURE__ */ jsx("span", { className: "text-[9px] font-semibold text-slate-400 truncate ml-auto shrink-0 min-w-0", children: timeOnly })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-start gap-3 min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-xl grid place-items-center shrink-0 border ${meta.bg}`, children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900 truncate leading-tight", children: call.name }),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-500 truncate mt-0.5", children: call.company })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-slate-900 tabular-nums shrink-0", children: call.duration })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsx(Badge, { tone: meta.tone, children: call.outcome }),
              call.rating > 0 && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600", children: [
                /* @__PURE__ */ jsx(Star, { className: "w-3 h-3 fill-amber-400 text-amber-400" }),
                " ",
                call.rating
              ] }),
              call.hasRec && /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold text-violet-700 bg-violet-50 px-1.5 py-0.5 rounded border border-violet-100", children: "REC" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold text-slate-400 ml-auto", children: call.date })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function EmployeeCalls() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const period = searchParams.get("period") || "today";
  const { calls: contextCalls = [] } = useEmployee();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const stats = EMP_CALL_STATS[period] || EMP_CALL_STATS.today;
  const calls = useMemo(() => {
    let list = period === "today" ? contextCalls.filter((c) => c.period === "today") : period === "week" ? contextCalls.filter((c) => c.period === "today" || c.period === "week") : contextCalls;
    if (typeFilter !== "all") list = list.filter((c) => c.type === typeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) => c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.outcome.toLowerCase().includes(q) || c.note && c.note.toLowerCase().includes(q)
      );
    }
    return list;
  }, [contextCalls, period, typeFilter, search]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4 page-shell min-w-0 animate-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4", children: [
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "Total Dials", value: String(stats.dials), icon: Phone, tone: "primary", change: `${stats.connected} connected`, sub: "" }),
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "Pickup Rate", value: `${stats.pickupRate}%`, icon: TrendingUp, tone: "success", change: `${stats.missed} missed`, changeTone: "warning", sub: "" }),
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "Avg Duration", value: stats.avgDuration, icon: Clock, tone: "warning", change: stats.totalTalk, sub: "" }),
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "Hot Leads", value: String(stats.hotLeads), icon: Zap, tone: "danger", change: `${stats.callbacks} callbacks set`, sub: "" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-1.5 sm:gap-3 lg:gap-4 lg:items-stretch", children: [
      /* @__PURE__ */ jsx(
        CallMetricCard,
        {
          pct: stats.pickupRate / 100,
          color: "#e11d48",
          label: "Pickup Rate",
          shortLabel: "Pickup",
          accentRgb: "225,29,72",
          footer: `${stats.connected} picked / ${stats.dials} dialed · ${PERIOD_LABEL[period]}`
        }
      ),
      /* @__PURE__ */ jsx(
        CallMetricCard,
        {
          pct: stats.quality / 100,
          color: "#10b981",
          label: "Quality Score",
          shortLabel: "Quality",
          accentRgb: "16,185,129",
          footer: `Avg ${stats.avgDuration} · ${stats.quality}% quality`
        }
      ),
      /* @__PURE__ */ jsx(
        CallMetricCard,
        {
          pct: stats.missRate / 100,
          color: "#f59e0b",
          label: "Miss Rate",
          shortLabel: "Miss",
          accentRgb: "245,158,11",
          footer: `${stats.missed} missed · ${stats.callbacks} re-attempted`
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "p-3 sm:p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: SEGMENT_WRAP, children: [
          { id: "all", label: "All" },
          { id: "out", label: "Outbound" },
          { id: "in", label: "Inbound" },
          { id: "miss", label: "Missed" }
        ].map(({ id, label }) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setTypeFilter(id),
            className: `${SEGMENT_BTN} ${typeFilter === id ? SEGMENT_BTN_ACTIVE : SEGMENT_BTN_INACTIVE}`,
            children: label
          },
          id
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-[160px]", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500 pointer-events-none" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search calls, leads, outcomes…",
              className: "w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-rose-100 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-semibold text-slate-400 mt-2 sm:hidden", children: [
        PERIOD_LABEL[period],
        " · ",
        calls.length,
        " calls"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-[11px] font-semibold text-slate-400 mt-2 hidden sm:block", children: [
        PERIOD_LABEL[period],
        " · ",
        calls.length,
        " calls · ",
        stats.callbacks,
        " callbacks scheduled"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-3", children: /* @__PURE__ */ jsxs(GlassCard, { className: "p-2.5 sm:p-5 flex flex-col min-h-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mb-1.5 sm:mb-4 shrink-0 px-0.5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display font-bold text-slate-900 text-xs sm:text-base", children: "Call Log" }),
        /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[9px] sm:text-[11px] font-bold tabular-nums shrink-0", children: calls.length })
      ] }),
      calls.length === 0 ? /* @__PURE__ */ jsx(EmpEmptyState, { icon: "📞", title: "No calls in this period", subtitle: "Try a different filter or time range" }) : /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1.5 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 max-h-none sm:max-h-[640px] sm:overflow-y-auto sm:overscroll-contain sm:scrollbar-thin sm:pr-1", children: calls.map((c) => /* @__PURE__ */ jsx(
        CallLogItem,
        {
          call: c,
          active: false,
          onSelect: (call) => navigate(`/employee/call-detail?id=${call.id}`)
        },
        c.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "hidden sm:grid sm:grid-cols-4 gap-2", children: [
      { val: stats.dials, lbl: "Dials", color: "#e11d48", icon: Phone },
      { val: stats.connected, lbl: "Connected", color: "#10b981", icon: CheckCircle2 },
      { val: stats.missed, lbl: "Missed", color: "#f59e0b", icon: AlertCircle },
      { val: stats.callbacks, lbl: "Callbacks", color: "#7c3aed", icon: RotateCcw }
    ].map(({ val, lbl, color, icon: Icon }) => /* @__PURE__ */ jsxs(GlassCard, { className: "p-2.5 sm:p-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xl font-black tabular-nums", style: { color }, children: val }),
        /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-lg grid place-items-center", style: { background: `${color}15`, color }, children: /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5" }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-slate-500", children: lbl }),
      /* @__PURE__ */ jsx("div", { className: "h-1 rounded-full bg-rose-50 mt-1.5 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full transition-all duration-700", style: { width: `${Math.min(100, val / stats.dials * 100)}%`, background: color } }) })
    ] }, lbl)) }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mb-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-display font-bold text-slate-900 text-sm", children: "Team Call Performance" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-slate-500", children: [
            PERIOD_LABEL[period],
            " · leaderboard"
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Badge, { tone: "muted", children: [
          EMP_TEAM_CALL.length,
          " reps"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: EMP_TEAM_CALL.map((m) => {
        const scale = period === "today" ? 0.35 : period === "week" ? 0.65 : 1;
        const callsCount = Math.round(m.calls * scale);
        const pct = Math.round(callsCount / 150 * 100);
        const scTone = m.score >= 85 ? "success" : m.score >= 70 ? "warning" : "danger";
        return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl border border-rose-100 bg-white/80", children: [
          /* @__PURE__ */ jsx(AvatarCircle, { initials: m.av, color: m.color === "#2563eb" ? "#be123c" : m.color, size: 32 }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-800 truncate", children: m.name }),
              /* @__PURE__ */ jsx(Badge, { tone: scTone, children: m.score })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full bg-rose-50 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full transition-all duration-700 bg-gradient-to-r from-rose-500 to-rose-600", style: { width: `${pct}%` } }) }),
            /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-semibold text-slate-500 mt-1", children: [
              callsCount,
              " calls · ",
              pct,
              "% of target"
            ] })
          ] })
        ] }, m.name);
      }) })
    ] })
  ] });
}
export {
  EmployeeCalls as default
};
