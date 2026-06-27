import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Flame, ChevronRight, Plus, Users, CheckCircle2, ClipboardList, Target, ArrowRight, TrendingUp, Zap, Calendar, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell, LabelList, PieChart, Pie } from "recharts";
import { B as Badge } from "./Primitives-CmGbnOU9.js";
import { Z as useEmployee, a as EMP_AGENDA, g as EMP_LEADS, k as EMP_PIPELINE, w as SEGMENT_WRAP, S as SEGMENT_BTN, u as SEGMENT_BTN_ACTIVE, v as SEGMENT_BTN_INACTIVE, r as EmployeeDoodleAvatar, L as LEAD_STATUS_LABELS, o as EMP_SOURCE_CHART, E as EMP_ACTIVITY } from "./_-BNdSRMjW.js";
import { A as AvatarCircle } from "./EmpUI-DSKHyseP.js";
import { u as useIsMobile } from "./useIsMobile-DGoojBXP.js";
import "framer-motion";
import "@tanstack/react-query";
import "react-dom";
const PANEL = "rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]";
const STAT_CARDS = [
  { label: "Total Leads", value: "248", change: "↑ 12%", icon: Users, iconTone: "bg-sky-50 text-sky-600 border-sky-100", link: "/employee/leads" },
  { label: "Hot Leads", value: "42", change: "↑ +5", icon: Flame, iconTone: "bg-orange-50 text-orange-600 border-orange-100", filter: "hot" },
  { label: "Converted", value: "24", change: "24.2% rate", icon: CheckCircle2, iconTone: "bg-emerald-50 text-emerald-600 border-emerald-100", filter: "converted" },
  { label: "Tasks Due", value: "8", change: "3 done", icon: ClipboardList, iconTone: "bg-violet-50 text-violet-600 border-violet-100", link: "/employee/tasks" }
];
const PIPE_FILTERS = [
  { id: "all", label: "All" },
  { id: "hot", label: "Hot", icon: Flame },
  { id: "warm", label: "Warm" },
  { id: "cold", label: "Cold" }
];
const PERIODS = ["Today", "This Week", "This Month"];
function KpiCard({ label, value, change, icon: Icon, iconTone, className = "" }) {
  return /* @__PURE__ */ jsxs("article", { className: `${PANEL} p-2.5 sm:p-4 flex flex-col justify-between min-h-[88px] sm:min-h-[100px] hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition-all duration-200 ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-1.5 sm:gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[8px] sm:text-[10px] font-semibold text-slate-500 uppercase tracking-wide leading-tight", children: label }),
        /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-2xl font-black text-slate-900 mt-0.5 sm:mt-1 tabular-nums leading-none", children: value })
      ] }),
      Icon && /* @__PURE__ */ jsx("div", { className: `w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl grid place-items-center shrink-0 border ${iconTone}`, children: /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" }) })
    ] }),
    change && /* @__PURE__ */ jsxs("p", { className: "text-[9px] sm:text-[10px] font-semibold text-emerald-600 mt-2 sm:mt-3 leading-tight", children: [
      change,
      /* @__PURE__ */ jsx("span", { className: "hidden sm:inline text-slate-400 font-medium", children: " vs last period" })
    ] })
  ] });
}
function SectionHead({ icon: Icon, title, sub, action, stackAction }) {
  return /* @__PURE__ */ jsxs("div", { className: `flex ${stackAction ? "flex-col sm:flex-row" : ""} items-start justify-between gap-2 sm:gap-3 mb-2 sm:mb-4`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-2.5 min-w-0", children: [
      /* @__PURE__ */ jsx("div", { className: "w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display font-bold text-slate-900 text-xs sm:text-sm", children: title }),
        sub && /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-tight", children: sub })
      ] })
    ] }),
    action && /* @__PURE__ */ jsx("div", { className: `${stackAction ? "w-full sm:w-auto overflow-x-auto scrollbar-none" : ""} shrink-0`, children: action })
  ] });
}
function EmployeeDashboard() {
  const { employee } = useEmployee();
  const navigate = useNavigate();
  const isMobile = useIsMobile(640);
  const [period, setPeriod] = useState("Today");
  const [pipeFilter, setPipeFilter] = useState("all");
  const [agenda, setAgenda] = useState(EMP_AGENDA);
  const filteredPipeLeads = useMemo(() => {
    if (pipeFilter === "all") return null;
    return EMP_LEADS.filter((l) => l.status === pipeFilter);
  }, [pipeFilter]);
  const callPct = Math.round(employee.callsDone / employee.callsTarget * 100);
  const pendingAgenda = agenda.filter((a) => !a.done).length;
  const pipelineTotal = EMP_PIPELINE.reduce((s, p) => s + p.count, 0);
  const convertedCount = EMP_PIPELINE.find((p) => p.label === "Converted")?.count ?? 0;
  const markAgendaDone = (idx) => {
    setAgenda((prev) => prev.map((a, i) => i === idx ? { ...a, done: true } : a));
    toast.success("Marked done");
  };
  const dateLabel = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
    weekday: isMobile ? "short" : "long",
    day: "numeric",
    month: "short"
  });
  const pipeChartHeight = isMobile ? 156 : 220;
  const pipeFilters = /* @__PURE__ */ jsx("div", { className: `${SEGMENT_WRAP} max-w-full`, children: PIPE_FILTERS.map((f) => /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick: () => setPipeFilter(f.id),
      className: `flex items-center gap-0.5 sm:gap-1 ${SEGMENT_BTN} ${pipeFilter === f.id ? SEGMENT_BTN_ACTIVE : SEGMENT_BTN_INACTIVE}`,
      children: [
        f.icon && /* @__PURE__ */ jsx(f.icon, { className: "w-2.5 h-2.5 sm:w-3 sm:h-3" }),
        f.label
      ]
    },
    f.id
  )) });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-3 sm:space-y-5 page-shell min-w-0 animate-fade-in", children: [
    /* @__PURE__ */ jsx("div", { className: `${PANEL} p-3 sm:p-5`, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5 sm:gap-4 min-w-0", children: [
        /* @__PURE__ */ jsx(EmployeeDoodleAvatar, { size: isMobile ? 40 : 52, className: "shrink-0" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-[9px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wide leading-tight", children: [
            period === "This Week" ? "Week" : period === "This Month" ? "Month" : period,
            " · ",
            dateLabel
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "font-display text-base sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5 leading-tight", children: [
            "Good morning, ",
            employee.name.split(" ")[0]
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-1.5 mt-2 overflow-x-auto scrollbar-none -mx-0.5 px-0.5 pb-0.5", children: [
            { label: "8 hot follow-ups", to: "/employee/follow-ups" },
            { label: "3 meetings", to: "/employee/meetings" },
            { label: `${pendingAgenda} agenda`, to: null }
          ].map((chip) => chip.to ? /* @__PURE__ */ jsxs(
            Link,
            {
              to: chip.to,
              className: "inline-flex items-center gap-0.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-slate-50 border border-slate-200 text-[10px] sm:text-[11px] font-semibold text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition shrink-0",
              children: [
                chip.label,
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-50" })
              ]
            },
            chip.label
          ) : /* @__PURE__ */ jsx("span", { className: "inline-flex px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-slate-50 border border-slate-200 text-[10px] sm:text-[11px] font-semibold text-slate-600 shrink-0", children: chip.label }, chip.label)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 lg:shrink-0", children: [
        /* @__PURE__ */ jsx("div", { className: `${SEGMENT_WRAP} flex-1 sm:flex-none min-w-0`, children: PERIODS.map((d) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setPeriod(d),
            className: `${SEGMENT_BTN} ${period === d ? SEGMENT_BTN_ACTIVE : SEGMENT_BTN_INACTIVE}`,
            children: [
              /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: d === "This Week" ? "Week" : d === "This Month" ? "Month" : d }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: d })
            ]
          },
          d
        )) }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate("/employee/leads?action=add"),
            className: "hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-rose-600 text-white text-xs sm:text-sm font-bold hover:bg-rose-700 transition shadow-sm shrink-0",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              " Add Lead"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4", children: STAT_CARDS.map((s) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          if (s.link) navigate(s.link);
          else if (s.filter) setPipeFilter(s.filter);
        },
        className: "text-left w-full min-w-0",
        children: /* @__PURE__ */ jsx(KpiCard, { ...s })
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-3 sm:gap-4 md:gap-5 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4 md:space-y-5 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: `${PANEL} p-3 sm:p-4 md:p-5 min-w-0 overflow-hidden`, children: [
          /* @__PURE__ */ jsx(
            SectionHead,
            {
              icon: Target,
              title: "Lead Pipeline",
              sub: isMobile ? "Stage breakdown" : "Stage-wise breakdown",
              stackAction: true,
              action: pipeFilters
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-1.5 sm:gap-2 mb-3 sm:mb-4", children: [
            { label: "In pipeline", val: pipelineTotal },
            { label: "Converted", val: convertedCount },
            { label: "Conv. rate", val: "9.7%" }
          ].map((s) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg sm:rounded-xl bg-slate-50 border border-slate-100 px-2 py-1.5 sm:px-3 sm:py-2 text-center min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base font-black text-slate-900 tabular-nums", children: s.val }),
            /* @__PURE__ */ jsx("p", { className: "text-[8px] sm:text-[10px] font-medium text-slate-500 leading-tight", children: s.label })
          ] }, s.label)) }),
          /* @__PURE__ */ jsx("div", { className: "w-full min-w-0", style: { height: pipeChartHeight }, children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: pipeChartHeight, children: /* @__PURE__ */ jsxs(
            BarChart,
            {
              data: EMP_PIPELINE,
              layout: "vertical",
              margin: { top: 2, right: isMobile ? 18 : 28, left: 0, bottom: 2 },
              children: [
                /* @__PURE__ */ jsx(XAxis, { type: "number", hide: true }),
                /* @__PURE__ */ jsx(
                  YAxis,
                  {
                    dataKey: "label",
                    type: "category",
                    axisLine: false,
                    tickLine: false,
                    fontSize: isMobile ? 9 : 11,
                    fontWeight: 600,
                    tick: { fill: "#64748b" },
                    width: isMobile ? 58 : 84
                  }
                ),
                /* @__PURE__ */ jsx(
                  Tooltip,
                  {
                    cursor: { fill: "rgba(148, 163, 184, 0.08)" },
                    contentStyle: {
                      borderRadius: 10,
                      border: "1px solid #e2e8f0",
                      fontSize: 11,
                      padding: "6px 10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
                    },
                    formatter: (val) => [`${val} leads`, "Count"]
                  }
                ),
                /* @__PURE__ */ jsxs(Bar, { dataKey: "count", radius: [0, 6, 6, 0], barSize: isMobile ? 11 : 16, children: [
                  EMP_PIPELINE.map((entry) => /* @__PURE__ */ jsx(Cell, { fill: entry.color, fillOpacity: 0.85 }, entry.label)),
                  /* @__PURE__ */ jsx(
                    LabelList,
                    {
                      dataKey: "count",
                      position: "right",
                      style: { fontSize: isMobile ? 9 : 11, fontWeight: 700, fill: "#475569" }
                    }
                  )
                ] })
              ]
            }
          ) }) }),
          pipeFilter !== "all" && filteredPipeLeads && /* @__PURE__ */ jsxs("div", { className: "mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-[11px] sm:text-xs font-bold text-slate-900", children: [
                LEAD_STATUS_LABELS[pipeFilter],
                " Leads"
              ] }),
              /* @__PURE__ */ jsxs(Link, { to: `/employee/leads?filter=${pipeFilter}`, className: "text-[10px] sm:text-[11px] font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-0.5", children: [
                "View all ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 sm:gap-2", children: filteredPipeLeads.slice(0, 4).map((l) => /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => navigate("/employee/leads"),
                className: "inline-flex items-center gap-1.5 pl-1 pr-2 sm:pr-3 py-0.5 sm:py-1 rounded-full border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition text-left max-w-full",
                children: [
                  /* @__PURE__ */ jsx(AvatarCircle, { initials: l.av, color: l.color, size: isMobile ? 20 : 24 }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] font-semibold text-slate-800 max-w-[72px] sm:max-w-[90px] truncate", children: l.name }),
                  /* @__PURE__ */ jsx("span", { className: "text-[9px] sm:text-[10px] font-bold text-slate-500", children: l.budget })
                ]
              },
              l.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `${PANEL} overflow-hidden min-w-0`, children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 md:divide-x divide-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4 md:p-5", children: [
            /* @__PURE__ */ jsx(SectionHead, { icon: TrendingUp, title: "Lead Sources", sub: isMobile ? "Top channels" : "Top channels this month" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center py-1 sm:py-2", children: [
              /* @__PURE__ */ jsxs("div", { className: `relative ${isMobile ? "w-[112px] h-[112px]" : "w-[148px] h-[148px]"}`, children: [
                /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
                  /* @__PURE__ */ jsx(
                    Pie,
                    {
                      data: EMP_SOURCE_CHART.map((s) => ({ name: s.label, value: s.pct, color: s.color })),
                      dataKey: "value",
                      cx: "50%",
                      cy: "50%",
                      innerRadius: isMobile ? 32 : 44,
                      outerRadius: isMobile ? 50 : 68,
                      paddingAngle: 3,
                      stroke: "#fff",
                      strokeWidth: 2,
                      children: EMP_SOURCE_CHART.map((s) => /* @__PURE__ */ jsx(Cell, { fill: s.color }, s.label))
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Tooltip,
                    {
                      formatter: (val, _n, props) => [`${val}%`, props.payload.name],
                      contentStyle: { borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 11 }
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none", children: [
                  /* @__PURE__ */ jsx("span", { className: `${isMobile ? "text-base" : "text-xl"} font-black text-slate-900`, children: "100%" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[9px] sm:text-[10px] text-slate-400 font-medium", children: "Total" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-1 mt-3 sm:mt-4 w-full max-w-[240px]", children: EMP_SOURCE_CHART.map((s) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] text-slate-600 min-w-0", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0", style: { background: s.color } }),
                /* @__PURE__ */ jsx("span", { className: "truncate flex-1", children: s.label }),
                /* @__PURE__ */ jsxs("span", { className: "font-bold text-slate-800 shrink-0", children: [
                  s.pct,
                  "%"
                ] })
              ] }, s.label)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4 md:p-5 border-t md:border-t-0 border-slate-100", children: [
            /* @__PURE__ */ jsx(
              SectionHead,
              {
                icon: Zap,
                title: "Recent Activity",
                sub: "Last 24 hours",
                action: /* @__PURE__ */ jsx(Badge, { tone: "muted", children: "Live" })
              }
            ),
            /* @__PURE__ */ jsx("ul", { className: "space-y-1 sm:space-y-1.5", children: EMP_ACTIVITY.map((a) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-2.5 p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-slate-50 transition", children: [
              /* @__PURE__ */ jsx("div", { className: "w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg grid place-items-center text-xs sm:text-sm shrink-0 bg-slate-100 border border-slate-200", children: a.emoji }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-[11px] font-semibold text-slate-800 leading-snug line-clamp-2", children: a.text }),
                /* @__PURE__ */ jsx("p", { className: "text-[9px] sm:text-[10px] text-slate-400 mt-0.5", children: a.time })
              ] })
            ] }) }, a.text)) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 sm:space-y-3 xl:sticky xl:top-24 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: `${PANEL} p-3 sm:p-4 md:p-5`, children: [
          /* @__PURE__ */ jsx(
            SectionHead,
            {
              icon: Calendar,
              title: "Today's Agenda",
              sub: `${pendingAgenda} remaining`,
              action: /* @__PURE__ */ jsx(Link, { to: "/employee/meetings", className: "text-[10px] sm:text-[11px] font-semibold text-slate-600 hover:text-slate-900 shrink-0", children: "+ Meeting" })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-100 mb-3 sm:mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative w-10 h-10 sm:w-12 sm:h-12 shrink-0", children: [
              /* @__PURE__ */ jsxs("svg", { className: "w-full h-full -rotate-90", viewBox: "0 0 36 36", children: [
                /* @__PURE__ */ jsx("circle", { cx: "18", cy: "18", r: "15.5", fill: "none", stroke: "#e2e8f0", strokeWidth: "3" }),
                /* @__PURE__ */ jsx(
                  "circle",
                  {
                    cx: "18",
                    cy: "18",
                    r: "15.5",
                    fill: "none",
                    stroke: "#f43f5e",
                    strokeWidth: "3",
                    strokeLinecap: "round",
                    strokeDasharray: `${callPct} 100`,
                    className: "transition-all duration-700"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsx(Phone, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-base sm:text-lg font-black text-slate-900 tabular-nums leading-none", children: [
                employee.callsDone,
                /* @__PURE__ */ jsxs("span", { className: "text-xs sm:text-sm text-slate-400 font-semibold", children: [
                  "/",
                  employee.callsTarget
                ] })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[10px] sm:text-[11px] font-medium text-slate-500 mt-0.5 leading-tight", children: [
                "Calls today · ",
                callPct,
                "% of target"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `space-y-1.5 sm:space-y-2 ${isMobile ? "max-h-[240px]" : "max-h-[340px]"} overflow-y-auto pr-0.5`, children: agenda.map((a, i) => /* @__PURE__ */ jsx(
            "div",
            {
              className: `rounded-lg sm:rounded-xl border p-2.5 sm:p-3 transition ${a.done ? "border-slate-100 bg-slate-50/50 opacity-60" : a.hot ? "border-rose-100 bg-rose-50/30" : "border-slate-100 bg-white hover:border-slate-200"}`,
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 sm:gap-1.5 flex-wrap", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[9px] sm:text-[10px] font-bold text-slate-500 tabular-nums", children: a.time }),
                    a.hot && !a.done && /* @__PURE__ */ jsx(Badge, { tone: "danger", children: "Hot" }),
                    a.done && /* @__PURE__ */ jsx(Badge, { tone: "success", children: "Done" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: `text-[11px] sm:text-xs font-bold mt-0.5 sm:mt-1 leading-snug ${a.done ? "line-through text-slate-400" : "text-slate-900"}`, children: a.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-[9px] sm:text-[10px] text-slate-500 mt-0.5 line-clamp-1", children: a.sub })
                ] }),
                !a.done && /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => markAgendaDone(i),
                    className: "shrink-0 text-[9px] sm:text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-emerald-100 hover:bg-emerald-100 transition",
                    children: "Done"
                  }
                )
              ] })
            },
            a.time + a.title
          )) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-1.5 sm:gap-2", children: [
          { label: "Follow-ups", to: "/employee/follow-ups", icon: Zap, count: 8 },
          { label: "All Leads", to: "/employee/leads", icon: Target, count: 24 }
        ].map((q) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: q.to,
            className: `${PANEL} flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 hover:border-slate-300 hover:shadow-sm transition group min-w-0`,
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-slate-50 border border-slate-200 grid place-items-center group-hover:bg-slate-100 transition shrink-0", children: /* @__PURE__ */ jsx(q.icon, { className: "w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-600" }) }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-[11px] font-bold text-slate-900 truncate", children: q.label }),
                /* @__PURE__ */ jsxs("p", { className: "text-[9px] sm:text-[10px] text-slate-400", children: [
                  q.count,
                  " items"
                ] })
              ] })
            ]
          },
          q.to
        )) })
      ] })
    ] })
  ] });
}
export {
  EmployeeDashboard as default
};
