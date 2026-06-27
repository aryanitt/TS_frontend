import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import { FileText, Activity, Users, DollarSign, Trophy, Medal, GitBranch, BarChart3, CalendarDays, CheckCircle2, AlertTriangle, Zap, Sparkles, TrendingUp, Bell, ArrowRight, Search, X, ChevronDown, Info as Info$1 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell, Area } from "recharts";
import { D as Drawer, a as StatCard, A as Avatar, B as Badge, s as stageTone, p as priorityTone } from "./Primitives-CmGbnOU9.js";
import { r as revenueSeries } from "./mock-slc6FWz6.js";
import { Y as useDateRange } from "./_-BNdSRMjW.js";
import "react-router-dom";
import "@tanstack/react-query";
import "react-hot-toast";
const iconMap = { DollarSign, Users, Activity, FileText };
const PANEL = "rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]";
function SectionHead({ icon: Icon, title, sub, action, compact = false }) {
  return /* @__PURE__ */ jsxs("div", { className: `flex items-start justify-between gap-2 sm:gap-3 min-w-0 ${compact ? "mb-2.5 sm:mb-4" : "mb-4"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1", children: [
      /* @__PURE__ */ jsx("div", { className: `rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 grid place-items-center shrink-0 ${compact ? "w-8 h-8" : "w-9 h-9"}`, children: /* @__PURE__ */ jsx(Icon, { className: `text-slate-600 ${compact ? "w-3.5 h-3.5" : "w-4 h-4"}` }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("h3", { className: `font-display font-bold text-slate-900 ${compact ? "text-xs sm:text-sm" : "text-sm"}`, children: title }),
        sub && /* @__PURE__ */ jsx("p", { className: `text-slate-500 mt-0.5 line-clamp-2 sm:line-clamp-none ${compact ? "text-[10px]" : "text-[11px]"}`, children: sub })
      ] })
    ] }),
    action
  ] });
}
const SERVICE_OPTIONS = [
  "All Services",
  "Web Development",
  "SEO",
  "UI/UX Design",
  "Automation",
  "CRM Setup",
  "Marketing"
];
const SERVICE_PIPELINE = {
  today: {
    "All Services": [14, 12, 6, 4, 2, 1],
    "Web Development": [5, 4, 2, 2, 1, 1],
    "SEO": [3, 3, 1, 1, 0, 0],
    "UI/UX Design": [2, 2, 1, 0, 0, 0],
    "Automation": [2, 1, 1, 0, 0, 0],
    "CRM Setup": [1, 1, 1, 1, 1, 0],
    "Marketing": [1, 1, 0, 0, 0, 0]
  },
  week: {
    "All Services": [100, 92, 40, 30, 12, 10],
    "Web Development": [32, 28, 14, 10, 4, 3],
    "SEO": [22, 20, 8, 6, 2, 2],
    "UI/UX Design": [18, 16, 7, 5, 2, 2],
    "Automation": [14, 12, 5, 4, 2, 1],
    "CRM Setup": [8, 8, 4, 3, 1, 1],
    "Marketing": [6, 8, 2, 2, 1, 1]
  },
  month: {
    "All Services": [380, 344, 148, 112, 48, 40],
    "Web Development": [120, 108, 48, 36, 16, 13],
    "SEO": [82, 74, 30, 24, 9, 8],
    "UI/UX Design": [68, 62, 28, 20, 8, 7],
    "Automation": [54, 48, 20, 16, 7, 5],
    "CRM Setup": [32, 30, 14, 10, 5, 4],
    "Marketing": [24, 22, 8, 6, 3, 3]
  }
};
const SERVICE_BREAKDOWN = {
  today: {
    "All Services": [
      { name: "Web Development", leads: 28, qualified: 18, conv: 9, rev: "₹0.6L" },
      { name: "SEO", leads: 22, qualified: 14, conv: 6, rev: "₹0.5L" },
      { name: "UI/UX Design", leads: 18, qualified: 10, conv: 5, rev: "₹0.4L" },
      { name: "Automation", leads: 15, qualified: 8, conv: 3, rev: "₹0.3L" },
      { name: "CRM Setup", leads: 12, qualified: 6, conv: 2, rev: "₹0.2L" }
    ],
    "Web Development": [{ name: "Web Development", leads: 28, qualified: 18, conv: 9, rev: "₹0.6L" }],
    "SEO": [{ name: "SEO", leads: 22, qualified: 14, conv: 6, rev: "₹0.5L" }],
    "UI/UX Design": [{ name: "UI/UX Design", leads: 18, qualified: 10, conv: 5, rev: "₹0.4L" }],
    "Automation": [{ name: "Automation", leads: 15, qualified: 8, conv: 3, rev: "₹0.3L" }],
    "CRM Setup": [{ name: "CRM Setup", leads: 12, qualified: 6, conv: 2, rev: "₹0.2L" }],
    "Marketing": [{ name: "Marketing", leads: 10, qualified: 5, conv: 1, rev: "₹0.1L" }]
  },
  week: {
    "All Services": [
      { name: "Web Development", leads: 160, qualified: 112, conv: 48, rev: "₹1.8L" },
      { name: "SEO", leads: 140, qualified: 92, conv: 38, rev: "₹1.6L" },
      { name: "UI/UX Design", leads: 120, qualified: 78, conv: 30, rev: "₹1.4L" },
      { name: "Automation", leads: 100, qualified: 60, conv: 22, rev: "₹1.1L" },
      { name: "CRM Setup", leads: 80, qualified: 42, conv: 14, rev: "₹0.8L" }
    ],
    "Web Development": [{ name: "Web Development", leads: 160, qualified: 112, conv: 48, rev: "₹1.8L" }],
    "SEO": [{ name: "SEO", leads: 140, qualified: 92, conv: 38, rev: "₹1.6L" }],
    "UI/UX Design": [{ name: "UI/UX Design", leads: 120, qualified: 78, conv: 30, rev: "₹1.4L" }],
    "Automation": [{ name: "Automation", leads: 100, qualified: 60, conv: 22, rev: "₹1.1L" }],
    "CRM Setup": [{ name: "CRM Setup", leads: 80, qualified: 42, conv: 14, rev: "₹0.8L" }],
    "Marketing": [{ name: "Marketing", leads: 60, qualified: 32, conv: 10, rev: "₹0.6L" }]
  },
  month: {
    "All Services": [
      { name: "Web Development", leads: 620, qualified: 442, conv: 190, rev: "₹7.2L" },
      { name: "SEO", leads: 540, qualified: 368, conv: 148, rev: "₹6.4L" },
      { name: "UI/UX Design", leads: 460, qualified: 302, conv: 112, rev: "₹5.6L" },
      { name: "Automation", leads: 380, qualified: 244, conv: 88, rev: "₹4.4L" },
      { name: "CRM Setup", leads: 310, qualified: 188, conv: 58, rev: "₹3.2L" }
    ],
    "Web Development": [{ name: "Web Development", leads: 620, qualified: 442, conv: 190, rev: "₹7.2L" }],
    "SEO": [{ name: "SEO", leads: 540, qualified: 368, conv: 148, rev: "₹6.4L" }],
    "UI/UX Design": [{ name: "UI/UX Design", leads: 460, qualified: 302, conv: 112, rev: "₹5.6L" }],
    "Automation": [{ name: "Automation", leads: 380, qualified: 244, conv: 88, rev: "₹4.4L" }],
    "CRM Setup": [{ name: "CRM Setup", leads: 310, qualified: 188, conv: 58, rev: "₹3.2L" }],
    "Marketing": [{ name: "Marketing", leads: 240, qualified: 148, conv: 42, rev: "₹2.4L" }]
  }
};
const FILTER_DATA = {
  today: {
    kpis: [
      { label: "Revenue", value: "₹31.4L", icon: "DollarSign" },
      { label: "Cash Collected", value: "₹18.7L", icon: "Users" },
      { label: "Conversion Rate", value: "24%", icon: "Activity" },
      { label: "Qualified Leads", value: "2,840", icon: "FileText" },
      { label: "Pipeline Value", value: "₹19.2L", icon: "DollarSign" }
    ],
    leaderboard: [
      { name: "Aryan S.", leads: 18, resp: "1h 20m", qualR: "72%", convR: "19%", conv: 3, rev: "₹0.3L" },
      { name: "Priya M.", leads: 14, resp: "1h 45m", qualR: "66%", convR: "14%", conv: 2, rev: "₹0.2L" },
      { name: "Rahul K.", leads: 11, resp: "2h 10m", qualR: "59%", convR: "11%", conv: 1, rev: "₹0.1L" }
    ],
    metrics: { pickup: 68, qualification: 38, conversion: 8 },
    insights: [
      { type: "check", text: "₹0.2L stuck in negotiation > 2 days" },
      { type: "check", text: "6 leads inactive since 4 hours" },
      { type: "warn", text: "Meta CAC increased 4%" },
      { type: "warn", text: "Aryan outperforming team by 38%" },
      { type: "warn", text: "1 high-ticket lead inactive for 4h" },
      { type: "warn", text: "Meeting-to-close rate dropped 3%" }
    ],
    activity: [
      { type: "check", text: "Meeting-to-close rate dropped 3%" },
      { type: "check", text: "Rahul at 118% capacity today" },
      { type: "warn", text: "1 high-ticket lead inactive for 4h" },
      { type: "check", text: "New lead from paid campaign — Web Dev" },
      { type: "warn", text: "Aryan's follow-up overdue by 2h" },
      { type: "check", text: "CRM Setup proposal sent to Nexus Corp" },
      { type: "warn", text: "SEO lead dropped from Qualified to Contact" },
      { type: "check", text: "Priya closed ₹0.08L deal — UI/UX Design" },
      { type: "check", text: "3 discovery calls completed before noon" },
      { type: "warn", text: "Rahul at 118% capacity today" }
    ]
  },
  week: {
    kpis: [
      { label: "Revenue", value: "₹7.9L", sub: "Growth: +18.4%", icon: "DollarSign", trend: 18, trendVal: "+18.4%" },
      { label: "Cash Collected", value: "₹4.2L", sub: "Lead Q: 31.6%", icon: "Users", trend: 11, trendVal: "+11%" },
      { label: "Conversion Rate", value: "21%", sub: "Invoice Gen: ₹5.3L", icon: "Activity", trend: 2, trendVal: "+2%" },
      { label: "Qualified Leads", value: "721", sub: "Avg resp: 7h 14m", icon: "FileText", trend: -4, trendVal: "-4%" },
      { label: "Pipeline Value", value: "₹4.7L", sub: "Schema Ret: 81.2%", icon: "DollarSign", trend: 22, trendVal: "+22%" }
    ],
    leaderboard: [
      { name: "Aman T.", leads: 142, resp: "4h 20m", qualR: "78%", convR: "24%", conv: 34, rev: "₹1.2L" },
      { name: "Priya M.", leads: 118, resp: "5h 10m", qualR: "71%", convR: "19%", conv: 22, rev: "₹0.9L" },
      { name: "Rahul K.", leads: 98, resp: "6h 45m", qualR: "64%", convR: "14%", conv: 14, rev: "₹0.6L" }
    ],
    metrics: { pickup: 73, qualification: 41, conversion: 10 },
    insights: [
      { type: "check", text: "₹2.4L stuck in negotiation > 14 days" },
      { type: "check", text: "43 leads inactive since 7 days" },
      { type: "warn", text: "Meta CAC increased 28%" },
      { type: "warn", text: "Aman outperforming team by 41%" },
      { type: "warn", text: "3 high-ticket leads inactive for 48h" },
      { type: "warn", text: "Meeting-to-close rate dropped 14%" },
      { type: "check", text: "Automation service generated 32% more qualified leads" },
      { type: "warn", text: "12 proposals are pending approval for over 5 days" }
    ],
    activity: [
      { type: "check", text: "Meeting-to-close rate dropped 14%" },
      { type: "check", text: "Rahul overloaded at 127% capacity" },
      { type: "warn", text: "3 high-ticket leads inactive for 48h" },
      { type: "check", text: "Aman closed ₹0.4L deal — Automation" },
      { type: "warn", text: "SEO pipeline conversion below target" },
      { type: "check", text: "Marketing campaign drove 14 new leads" },
      { type: "warn", text: "CRM Setup proposal pending for 5 days" },
      { type: "check", text: "Priya's qualification rate up to 71%" },
      { type: "warn", text: "2 demos no-showed this week" },
      { type: "check", text: "UI/UX Design revenue target exceeded" },
      { type: "warn", text: "CRM Setup proposal pending for 5 days" },
      { type: "check", text: "Priya's qualification rate up to 71%" },
      { type: "warn", text: "2 demos no-showed this week" }
    ]
  },
  month: {
    kpis: [
      { label: "Revenue", value: "₹31.4L", icon: "DollarSign" },
      { label: "Cash Collected", value: "₹18.7L", icon: "Users" },
      { label: "Conversion Rate", value: "24%", icon: "Activity" },
      { label: "Qualified Leads", value: "2,840", icon: "FileText" },
      { label: "Pipeline Value", value: "₹19.2L", icon: "DollarSign" }
    ],
    leaderboard: [
      { name: "Aman T.", leads: 560, resp: "3h 40m", qualR: "82%", convR: "28%", conv: 157, rev: "₹4.8L" },
      { name: "Priya M.", leads: 480, resp: "4h 20m", qualR: "74%", convR: "22%", conv: 106, rev: "₹3.9L" },
      { name: "Rahul K.", leads: 390, resp: "5h 55m", qualR: "68%", convR: "16%", conv: 62, rev: "₹2.4L" }
    ],
    metrics: { pickup: 79, qualification: 46, conversion: 14 },
    insights: [
      { type: "check", text: "₹8.4L stuck in negotiation > 30 days" },
      { type: "check", text: "174 leads inactive since 14 days" },
      { type: "warn", text: "Meta CAC increased 18% MoM" },
      { type: "warn", text: "Aman outperforming team by 52%" },
      { type: "warn", text: "11 high-ticket leads inactive for 72h" },
      { type: "warn", text: "Meeting-to-close rate dropped 8%" }
    ],
    activity: [
      { type: "check", text: "Monthly close target exceeded by 4%" },
      { type: "check", text: "Pipeline coverage at 3.2x — healthy" },
      { type: "warn", text: "11 high-ticket leads inactive for 72h" },
      { type: "warn", text: "Rahul overloaded at 134% capacity" },
      { type: "warn", text: "CAC up 18% vs last month" },
      { type: "check", text: "Aman's team hit 28% conversion rate" },
      { type: "check", text: "Web Dev revenue at ₹7.2L — record high" },
      { type: "warn", text: "Marketing funnel drop-off at Qualified" },
      { type: "check", text: "CRM Setup closed 58 deals this month" },
      { type: "warn", text: "UI/UX Design CAC rose 12% this month" },
      { type: "check", text: "Monthly close target exceeded by 4%" },
      { type: "check", text: "Pipeline coverage at 3.2x — healthy" },
      { type: "warn", text: "11 high-ticket leads inactive for 72h" },
      { type: "warn", text: "Rahul overloaded at 134% capacity" },
      { type: "warn", text: "CAC up 18% vs last month" }
    ]
  }
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }
  })
};
function useIsMobile(bp = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < bp : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < bp);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [bp]);
  return isMobile;
}
function Donut({ pct, size = 80, stroke = 8, color = "#6366f1", label, compact = false }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const val = pct / 100 * c;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1 sm:gap-2 w-full min-w-0", children: [
    /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, className: "shrink-0", style: { overflow: "visible" }, children: [
      /* @__PURE__ */ jsx("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: "#f1f5f9", strokeWidth: stroke }),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: size / 2,
          cy: size / 2,
          r,
          fill: "none",
          stroke: color,
          strokeWidth: stroke,
          strokeDasharray: `${val} ${c}`,
          strokeLinecap: "round",
          transform: `rotate(-90 ${size / 2} ${size / 2})`
        }
      ),
      /* @__PURE__ */ jsxs(
        "text",
        {
          x: size / 2,
          y: size / 2 + (compact ? 4 : 5),
          textAnchor: "middle",
          fill: "#0f172a",
          fontSize: compact ? 11 : 15,
          fontWeight: "700",
          children: [
            pct,
            "%"
          ]
        }
      )
    ] }),
    label && /* @__PURE__ */ jsx(
      "span",
      {
        className: `text-slate-600 font-medium text-center leading-tight w-full min-w-0 px-0.5 ${compact ? "text-[8px] sm:text-[10px]" : "text-[10px] max-w-[88px]"}`,
        children: label
      }
    )
  ] });
}
function KPICardsRow({ kpiData, filterKey }) {
  const cardDefaults = [
    { change: "+14.2%", sub: "MoM Gross Payout" },
    { change: "+8.5%", sub: "Per Active Performer" },
    { change: "-2.1d", sub: "Awaiting Audit" },
    { change: "+18.4%", sub: "Cash Generated" },
    { change: "+4.2%", sub: "Target vs Achieved" }
  ];
  const tones = ["success", "purple", "warning", "info", "primary"];
  return /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4",
      initial: "hidden",
      animate: "show",
      exit: "hidden",
      variants: { show: { transition: { staggerChildren: 0.06 } } },
      children: kpiData.map((k, i) => {
        const Icon = iconMap[k.icon] || DollarSign;
        const defaultVal = cardDefaults[i] || { change: "+4.2%", sub: "vs last period" };
        const change = k.trendVal || defaultVal.change;
        const subText = k.sub || defaultVal.sub;
        const tone = tones[i % tones.length];
        return /* @__PURE__ */ jsx(
          motion.div,
          {
            variants: fadeUp,
            custom: i,
            className: i === 0 ? "col-span-2 lg:col-span-1 min-w-0" : "col-span-1 min-w-0",
            children: /* @__PURE__ */ jsx(
              StatCard,
              {
                label: k.label,
                value: k.value,
                change,
                sub: subText,
                icon: Icon,
                tone,
                hover: true
              }
            )
          },
          k.label
        );
      })
    },
    filterKey
  ) });
}
function LeaderDonut({ pct, size = 88, stroke = 7, gradientId, colors, textColor = "#1e293b", fontSize = 16 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const val = Math.min(pct, 100) / 100 * c;
  return /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, className: "overflow-visible", children: [
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: gradientId, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
      /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: colors[0] }),
      /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: colors[1] })
    ] }) }),
    /* @__PURE__ */ jsx(
      "circle",
      {
        cx: size / 2,
        cy: size / 2,
        r,
        fill: "none",
        stroke: "#f1f5f9",
        strokeWidth: stroke
      }
    ),
    /* @__PURE__ */ jsx(
      "circle",
      {
        cx: size / 2,
        cy: size / 2,
        r,
        fill: "none",
        stroke: `url(#${gradientId})`,
        strokeWidth: stroke,
        strokeDasharray: `${val} ${c}`,
        strokeLinecap: "round",
        transform: `rotate(-90 ${size / 2} ${size / 2})`,
        style: { filter: `drop-shadow(0 2px 6px ${colors[0]}44)` }
      }
    ),
    /* @__PURE__ */ jsxs(
      "text",
      {
        x: size / 2,
        y: size / 2 + 5,
        textAnchor: "middle",
        fill: textColor,
        fontSize,
        fontWeight: "700",
        children: [
          pct,
          "%"
        ]
      }
    )
  ] });
}
function getConvPct(emp) {
  return emp.leads ? Math.round(emp.conv / emp.leads * 100) : 0;
}
const LEADERBOARD_RANKS = [
  {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    medal: "text-amber-500 fill-amber-100",
    colors: ["#f59e0b", "#eab308"],
    textColor: "#b45309"
  },
  {
    badge: "bg-slate-50 text-slate-600 border-slate-200",
    medal: "text-slate-400 fill-slate-100",
    colors: ["#94a3b8", "#64748b"],
    textColor: "#475569"
  },
  {
    badge: "bg-orange-50 text-orange-700 border-orange-200",
    medal: "text-orange-600 fill-orange-100",
    colors: ["#fb923c", "#ea580c"],
    textColor: "#c2410c"
  }
];
function LeaderBoardTooltip({ emp, anchorRef, visible }) {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState("above");
  useEffect(() => {
    if (!visible || !anchorRef?.current) return;
    const update = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;
      const TOOLTIP_W = 220, TOOLTIP_H = 210, MARGIN = 8;
      const vw = window.innerWidth, vh = window.innerHeight;
      const spaceAbove = rect.top, spaceBelow = vh - rect.bottom;
      const above = spaceAbove >= TOOLTIP_H + MARGIN || spaceAbove > spaceBelow;
      setPlacement(above ? "above" : "below");
      let left = rect.left + rect.width / 2 - TOOLTIP_W / 2 + window.scrollX;
      left = Math.max(MARGIN, Math.min(left, vw - TOOLTIP_W - MARGIN));
      const top = above ? rect.top + window.scrollY - TOOLTIP_H - MARGIN : rect.bottom + window.scrollY + MARGIN;
      setPos({ top, left });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [visible, anchorRef]);
  if (typeof document === "undefined") return null;
  const rows = [
    { key: "leads", label: "Leads" },
    { key: "resp", label: "Avg Response" },
    { key: "qualR", label: "Qual. Ratio" },
    { key: "convR", label: "Conv. Rate" },
    { key: "conv", label: "Conversions" },
    { key: "rev", label: "Revenue" }
  ];
  return ReactDOM.createPortal(
    /* @__PURE__ */ jsx(AnimatePresence, { children: visible && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: placement === "above" ? 6 : -6, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: placement === "above" ? 6 : -6, scale: 0.95 },
        transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
        style: { position: "absolute", top: pos.top, left: pos.left, zIndex: 99999, pointerEvents: "none" },
        children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl p-4 shadow-xl shadow-slate-200/60 w-[220px]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[11px] font-extrabold text-slate-800 mb-3 uppercase tracking-wider border-b border-slate-100 pb-2", children: emp.name }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: rows.map((r) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 text-[10px] uppercase tracking-wider font-semibold", children: r.label }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-800 tabular-nums", children: emp[r.key] })
            ] }, r.key)) })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-slate-200 bg-white
                ${placement === "above" ? "-bottom-[6px] border-b border-r" : "-top-[6px] border-t border-l"}`,
              style: { zIndex: 1 }
            }
          )
        ] })
      }
    ) }),
    document.body
  );
}
function LeaderBoard({ employees, filterKey }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const cardRefs = useRef([]);
  const isMobile = useIsMobile(640);
  return /* @__PURE__ */ jsxs("div", { className: `${PANEL} p-3 sm:p-4 md:p-5 min-w-0`, children: [
    /* @__PURE__ */ jsx(SectionHead, { icon: Trophy, title: "Leader Board", sub: "Top performers by conversion rate" }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "grid grid-cols-3 gap-1.5 sm:gap-3",
        initial: "hidden",
        animate: "show",
        exit: "hidden",
        variants: { show: { transition: { staggerChildren: 0.06 } } },
        children: employees.map((emp, i) => {
          const rank = LEADERBOARD_RANKS[i] || LEADERBOARD_RANKS[2];
          const convPct = getConvPct(emp);
          const donutSize = isMobile ? 56 : 76;
          const donutStroke = isMobile ? 5 : 6;
          return /* @__PURE__ */ jsxs("div", { className: "relative min-w-0", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                ref: (el) => {
                  cardRefs.current[i] = el;
                },
                variants: fadeUp,
                custom: i,
                onMouseEnter: () => setHoveredIdx(i),
                onMouseLeave: () => setHoveredIdx(null),
                onClick: () => setHoveredIdx((prev) => prev === i ? null : i),
                animate: { y: hoveredIdx === i ? -2 : 0 },
                transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                className: "rounded-lg sm:rounded-xl bg-slate-50/60 border border-slate-200/80 hover:border-slate-300 hover:bg-white transition-all duration-200 cursor-default flex flex-col items-center justify-center py-2.5 sm:py-4 px-1 sm:px-3 gap-1.5 sm:gap-2.5 min-h-[128px] sm:min-h-[168px]",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: `inline-flex items-center gap-0.5 sm:gap-1 text-[7px] sm:text-[9px] font-bold uppercase tracking-wide sm:tracking-widest px-1.5 sm:px-2 py-0.5 rounded-full border ${rank.badge}`, children: [
                    /* @__PURE__ */ jsx(Medal, { className: `w-2.5 h-2.5 sm:w-3 sm:h-3 ${rank.medal}` }),
                    "#",
                    i + 1
                  ] }),
                  /* @__PURE__ */ jsx(
                    LeaderDonut,
                    {
                      pct: convPct,
                      size: donutSize,
                      stroke: donutStroke,
                      fontSize: isMobile ? 11 : 16,
                      gradientId: `leader-gradient-${filterKey}-${i}`,
                      colors: rank.colors,
                      textColor: rank.textColor
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "text-center w-full min-w-0 px-0.5", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs font-bold text-slate-800 truncate", children: emp.name }),
                    /* @__PURE__ */ jsxs("p", { className: "text-[8px] sm:text-[10px] text-slate-500 mt-0.5 tabular-nums leading-tight truncate", children: [
                      emp.conv,
                      " conv · ",
                      emp.rev
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              LeaderBoardTooltip,
              {
                emp,
                anchorRef: { current: cardRefs.current[i] },
                visible: hoveredIdx === i
              }
            )
          ] }, emp.name);
        })
      },
      filterKey
    ) })
  ] });
}
function ServiceDropdown({ value, onChange, options }) {
  const isMobile = useIsMobile(640);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 220 });
  const calcPos = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight;
    const MENU_W = 224, MENU_H = 300;
    const spaceBelow = vh - rect.bottom;
    const above = spaceBelow < MENU_H && rect.top > spaceBelow;
    let left = rect.left + window.scrollX;
    if (rect.left + MENU_W > vw) left = rect.right - MENU_W + window.scrollX;
    left = Math.max(8, left);
    const top = above ? rect.top + window.scrollY - MENU_H - 4 : rect.bottom + window.scrollY + 4;
    setMenuPos({ top, left, width: Math.max(rect.width, MENU_W), above });
  };
  useEffect(() => {
    if (!open || isMobile) return;
    const h = (e) => {
      if (btnRef.current && !btnRef.current.contains(e.target) && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open, isMobile]);
  useEffect(() => {
    if (open && isMobile) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open, isMobile]);
  useEffect(() => {
    if (!open || isMobile) return;
    const update = () => calcPos();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, isMobile]);
  const handleOpen = () => {
    if (!open && !isMobile) calcPos();
    setOpen((o) => !o);
    setSearch("");
  };
  const filtered = options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));
  const desktopMenu = open && !isMobile && typeof document !== "undefined" && ReactDOM.createPortal(
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        ref: menuRef,
        initial: { opacity: 0, y: menuPos.above ? 6 : -6, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: menuPos.above ? 6 : -6, scale: 0.97 },
        transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] },
        style: { position: "absolute", top: menuPos.top, left: menuPos.left, width: menuPos.width, zIndex: 99999, maxHeight: "min(320px, 60vh)" },
        className: "rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 overflow-hidden flex flex-col",
        children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 border-b border-slate-100 flex-shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-3 h-3 text-slate-400 flex-shrink-0" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Search...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "bg-transparent text-[11px] text-slate-800 placeholder:text-slate-400 focus:outline-none w-full",
                autoFocus: true
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "py-1.5 overflow-y-auto", children: [
            filtered.map((opt) => /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  onChange(opt);
                  setOpen(false);
                  setSearch("");
                },
                className: `w-full text-left px-3 py-2.5 text-xs transition-all duration-150 flex items-center gap-2
              ${value === opt ? "text-rose-700 bg-rose-50 font-semibold" : "text-slate-700 hover:bg-slate-50"}`,
                children: [
                  value === opt && /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" }),
                  value !== opt && /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 flex-shrink-0" }),
                  opt
                ]
              },
              opt
            )),
            filtered.length === 0 && /* @__PURE__ */ jsx("p", { className: "px-3 py-2 text-xs text-slate-400", children: "No results" })
          ] })
        ]
      }
    ),
    document.body
  );
  const mobileSheet = open && isMobile && typeof document !== "undefined" && ReactDOM.createPortal(
    /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.18 },
          onClick: () => setOpen(false),
          style: { position: "fixed", inset: 0, zIndex: 99998 },
          className: "bg-black/40 backdrop-blur-sm"
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          ref: menuRef,
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 30 },
          transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
          style: { position: "fixed", left: 12, right: 12, bottom: 12, zIndex: 99999 },
          className: "rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden max-h-[70vh] flex flex-col",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 border-b border-slate-100", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-slate-800 tracking-wide", children: "Select Service" }),
              /* @__PURE__ */ jsx("button", { onClick: () => setOpen(false), className: "w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-100 transition-colors", children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-slate-500" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-3 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200", children: [
              /* @__PURE__ */ jsx(Search, { className: "w-3.5 h-3.5 text-slate-400 flex-shrink-0" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Search services...",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  className: "bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none w-full",
                  autoFocus: true
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "overflow-y-auto py-1.5 flex-1", children: [
              filtered.map((opt) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    onChange(opt);
                    setOpen(false);
                    setSearch("");
                  },
                  className: `w-full text-left px-4 py-3 text-sm transition-all duration-150 flex items-center gap-3
                ${value === opt ? "text-rose-700 bg-rose-50 font-semibold" : "text-slate-700 hover:bg-slate-50"}`,
                  children: [
                    value === opt && /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" }),
                    value !== opt && /* @__PURE__ */ jsx("span", { className: "w-2 h-2 flex-shrink-0" }),
                    opt
                  ]
                },
                opt
              )),
              filtered.length === 0 && /* @__PURE__ */ jsx("p", { className: "px-4 py-3 text-xs text-slate-400", children: "No results" })
            ] })
          ]
        }
      )
    ] }),
    document.body
  );
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        ref: btnRef,
        onClick: handleOpen,
        className: `flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200
          ${open ? "border-slate-300 bg-white text-slate-900 shadow-sm" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"}`,
        children: [
          /* @__PURE__ */ jsx("span", { className: "max-w-[110px] truncate", children: value }),
          /* @__PURE__ */ jsx(ChevronDown, { className: `w-3.5 h-3.5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}` })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(AnimatePresence, { children: [
      desktopMenu,
      mobileSheet
    ] })
  ] });
}
function PipelineTooltip({ stage, count, convPct, dropPct, prevStage, anchorRef, visible }) {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  useEffect(() => {
    if (!visible || !anchorRef?.current) return;
    const TOOLTIP_W = 192, TOOLTIP_H = 110, MARGIN = 8;
    const update = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;
      const vw = window.innerWidth;
      let left = rect.left + rect.width / 2 - TOOLTIP_W / 2 + window.scrollX;
      left = Math.max(MARGIN, Math.min(left, vw - TOOLTIP_W - MARGIN));
      const top = rect.top + window.scrollY - TOOLTIP_H - 10;
      setPos({ top, left });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [visible, anchorRef]);
  if (typeof document === "undefined") return null;
  return ReactDOM.createPortal(
    /* @__PURE__ */ jsx(AnimatePresence, { children: visible && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 6, scale: 0.94 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 6, scale: 0.94 },
        transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
        style: {
          position: "fixed",
          top: pos.top,
          left: pos.left,
          zIndex: 99999,
          pointerEvents: "none",
          width: 192
        },
        children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white border border-slate-200 rounded-xl p-3.5 shadow-lg shadow-slate-200/50", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-slate-800 mb-2.5", children: stage }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-500", children: "Count" }),
                /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-slate-800 tabular-nums", children: count.toLocaleString() })
              ] }),
              convPct !== null && /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-slate-500", children: [
                  "From ",
                  prevStage
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-semibold text-emerald-600 tabular-nums", children: [
                  convPct,
                  "% conv"
                ] })
              ] }),
              dropPct !== null && /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-500", children: "Drop-off" }),
                /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-semibold text-rose-600 tabular-nums", children: [
                  "↓ ",
                  dropPct,
                  "%"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute left-1/2 -translate-x-1/2 -bottom-[7px] w-3.5 h-3.5 rotate-45 border-b border-r border-slate-200 bg-white",
              style: { zIndex: 1 }
            }
          )
        ] })
      }
    ) }),
    document.body
  );
}
const SEGMENTED_STAGES = ["Contacted", "Qualified", "Meeting", "Negotiation", "Conversion"];
function PipelineBubble({ stage, count, convPct, dropOff, prevStage, index, rowKey, bubbleRefs, hoveredBubble, setHoveredBubble }) {
  const isHov = hoveredBubble && hoveredBubble.row === rowKey && hoveredBubble.col === index;
  const bubbleRef = useRef(null);
  useEffect(() => {
    bubbleRefs.current[`${rowKey}-${index}`] = bubbleRef.current;
  }, [rowKey, index, bubbleRefs]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: bubbleRef,
      className: "absolute w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200 transition-all duration-200 cursor-pointer z-20 hover:scale-110 hover:border-slate-300 hover:shadow-md",
      style: {
        left: `${10 + index * 20}%`,
        transform: "translate(-50%, -50%)",
        top: "50%"
      },
      onMouseEnter: () => setHoveredBubble({ row: rowKey, col: index }),
      onMouseLeave: () => setHoveredBubble(null),
      children: [
        /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
          motion.span,
          {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.8, opacity: 0 },
            transition: { duration: 0.15 },
            className: "text-[8px] sm:text-[10px] md:text-xs font-black text-gray-800 tabular-nums select-none",
            children: count
          },
          count
        ) }),
        /* @__PURE__ */ jsx(
          PipelineTooltip,
          {
            stage,
            count,
            convPct,
            dropPct: dropOff,
            prevStage,
            anchorRef: { current: bubbleRefs.current[`${rowKey}-${index}`] },
            visible: !!isHov
          }
        )
      ]
    }
  );
}
function PipelineRow({ rowKey, label, stops, data, bubbleRefs, hoveredBubble, setHoveredBubble }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 group", children: [
    /* @__PURE__ */ jsx("div", { className: "w-9 sm:w-12 flex-shrink-0 text-right pr-0.5 sm:pr-1", children: /* @__PURE__ */ jsx("span", { className: "text-[8px] sm:text-[10px] font-black text-slate-600 tracking-wider uppercase", children: label }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 relative h-9 sm:h-10 md:h-11 bg-slate-50 border border-slate-200/80 rounded-lg sm:rounded-xl flex items-center", children: [
      /* @__PURE__ */ jsxs("svg", { className: "absolute inset-0 w-full h-full pointer-events-none", viewBox: "0 0 1000 100", preserveAspectRatio: "none", children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("linearGradient", { id: `ribbon-grad-${rowKey}`, x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: stops.map((s, idx) => /* @__PURE__ */ jsx("stop", { offset: s.offset, stopColor: s.color }, idx)) }) }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M 0,16 L 50,17 C 75,17, 75,18, 100,18 C 200,18, 200,26, 300,26 C 400,26, 400,34, 500,34 C 600,34, 600,40, 700,40 C 800,40, 800,46, 900,46 C 950,46, 950,47, 1000,47 L 1000,53 C 950,53, 950,54, 900,54 C 800,54, 800,60, 700,60 C 600,60, 600,66, 500,66 C 400,66, 400,74, 300,74 C 200,74, 200,82, 100,82 C 75,82, 75,83, 50,83 L 0,84 Z",
            fill: `url(#ribbon-grad-${rowKey})`,
            opacity: 0.85
          }
        )
      ] }),
      SEGMENTED_STAGES.map((stage, i) => {
        const count = data[i] ?? 0;
        const convPct = i > 0 && data[i - 1] > 0 ? Math.round(count / data[i - 1] * 100) : null;
        const dropOff = i > 0 && data[i - 1] > 0 ? Math.round((data[i - 1] - count) / data[i - 1] * 100) : null;
        return /* @__PURE__ */ jsx(
          PipelineBubble,
          {
            stage,
            count,
            convPct,
            dropOff,
            prevStage: i > 0 ? SEGMENTED_STAGES[i - 1] : null,
            index: i,
            rowKey,
            bubbleRefs,
            hoveredBubble,
            setHoveredBubble
          },
          stage
        );
      })
    ] })
  ] });
}
function LeadPipeline({ pipelineData, filterKey, selectedService, onServiceChange }) {
  const [hoveredBubble, setHoveredBubble] = useState(null);
  const bubbleRefs = useRef({});
  const data = pipelineData[selectedService] || pipelineData["All Services"];
  const total = data[0] ?? 0;
  const closed = data[data.length - 1] ?? 0;
  const overallConv = total > 0 ? Math.round(closed / total * 100) : 0;
  const contacted = data[1] ?? 0;
  const qualified = data[2] ?? 0;
  const meeting = data[3] ?? 0;
  const negotiation = data[4] ?? 0;
  const conversion = data[5] ?? 0;
  const hotData = [
    Math.round(contacted * 0.45),
    Math.round(qualified * 0.55),
    Math.round(meeting * 0.6),
    Math.round(negotiation * 0.65),
    Math.round(conversion * 0.7)
  ];
  const warmData = [
    Math.round(contacted * 0.35),
    Math.round(qualified * 0.3),
    Math.round(meeting * 0.25),
    Math.round(negotiation * 0.22),
    Math.round(conversion * 0.2)
  ];
  const coldData = [
    Math.max(0, contacted - hotData[0] - warmData[0]),
    Math.max(0, qualified - hotData[1] - warmData[1]),
    Math.max(0, meeting - hotData[2] - warmData[2]),
    Math.max(0, negotiation - hotData[3] - warmData[3]),
    Math.max(0, conversion - hotData[4] - warmData[4])
  ];
  const hotStops = [
    { offset: "0%", color: "#9f1239" },
    { offset: "40%", color: "#e11d48" },
    { offset: "75%", color: "#f43f5e" },
    { offset: "100%", color: "#fda4af" }
  ];
  const warmStops = [
    { offset: "0%", color: "#ea580c" },
    { offset: "50%", color: "#f97316" },
    { offset: "100%", color: "#fcd34d" }
  ];
  const coldStops = [
    { offset: "0%", color: "#2563eb" },
    { offset: "50%", color: "#3b82f6" },
    { offset: "100%", color: "#93c5fd" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: `${PANEL} p-3 sm:p-4 md:p-5 min-w-0 overflow-hidden`, children: [
    /* @__PURE__ */ jsx(
      SectionHead,
      {
        icon: GitBranch,
        title: "Sales Pipeline Status",
        sub: "Temperature-segmented conversion progression",
        action: /* @__PURE__ */ jsx(
          ServiceDropdown,
          {
            value: selectedService,
            onChange: onServiceChange,
            options: SERVICE_OPTIONS
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto scrollbar-hide -mx-0.5 sm:-mx-1 px-0.5 sm:px-1", children: /* @__PURE__ */ jsxs("div", { className: "min-w-[460px] sm:min-w-[560px] md:min-w-[640px] space-y-1.5 sm:space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-9 sm:w-12 flex-shrink-0" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 relative h-3.5 sm:h-4 text-slate-500 text-[7px] sm:text-[8px] md:text-[9px] font-semibold tracking-wider uppercase", children: [
          /* @__PURE__ */ jsx("span", { className: "absolute left-[10%] -translate-x-1/2", children: "Contacted" }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-[30%] -translate-x-1/2", children: "Qualified" }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-[50%] -translate-x-1/2", children: "Meeting" }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-[70%] -translate-x-1/2", children: "Negotiation" }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-[90%] -translate-x-1/2", children: "Conversion" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        PipelineRow,
        {
          rowKey: "hot",
          label: "Hot",
          stops: hotStops,
          data: hotData,
          bubbleRefs,
          hoveredBubble,
          setHoveredBubble
        }
      ),
      /* @__PURE__ */ jsx(
        PipelineRow,
        {
          rowKey: "warm",
          label: "Warm",
          stops: warmStops,
          data: warmData,
          bubbleRefs,
          hoveredBubble,
          setHoveredBubble
        }
      ),
      /* @__PURE__ */ jsx(
        PipelineRow,
        {
          rowKey: "cold",
          label: "Cold",
          stops: coldStops,
          data: coldData,
          bubbleRefs,
          hoveredBubble,
          setHoveredBubble
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-100 grid grid-cols-3 gap-1.5 sm:gap-2", children: [
      { label: "Total Leads", value: total.toLocaleString() },
      { label: "Conversions", value: closed.toLocaleString() },
      { label: "Overall Conv", value: `${overallConv}%` }
    ].map(({ label, value }) => /* @__PURE__ */ jsxs("div", { className: "text-center rounded-lg bg-slate-50 border border-slate-100 py-1.5 sm:py-2 px-0.5 min-w-0", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm font-bold text-slate-800 tabular-nums", children: value }),
      /* @__PURE__ */ jsx("p", { className: "text-[8px] sm:text-[9px] text-slate-500 mt-0.5 leading-tight", children: label })
    ] }, label)) })
  ] });
}
function AIInsightsPanel({ insights, filterKey }) {
  const isMobile = useIsMobile();
  const [refreshing, setRefreshing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2e3);
    }, 800);
  };
  return /* @__PURE__ */ jsxs("div", { className: `${PANEL} p-2.5 sm:p-5 relative overflow-hidden min-w-0 w-full`, children: [
    /* @__PURE__ */ jsx(
      SectionHead,
      {
        compact: isMobile,
        icon: Sparkles,
        title: "AI Insights Center",
        sub: isMobile ? "Next-best actions" : "Next-best-action & risk assessment",
        action: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleRefresh,
            className: "text-[10px] sm:text-[11px] font-semibold text-slate-500 hover:text-rose-600 transition-colors shrink-0",
            children: refreshing ? "Refreshing…" : "Refresh"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2 sm:space-y-3 min-w-0", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          whileHover: isMobile ? void 0 : { y: -1 },
          className: "p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 sm:gap-3 w-full min-w-0",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0", children: /* @__PURE__ */ jsx(TrendingUp, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" }) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[11px] sm:text-xs font-bold text-slate-800 leading-snug", children: "Expand Opportunity: Global Logix" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-relaxed", children: "High engagement in APAC. Potential ₹10L upsell based on usage patterns." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3", children: [
                /* @__PURE__ */ jsx("button", { type: "button", className: "w-full sm:w-auto px-3.5 py-1.5 bg-rose-600 text-white text-[11px] font-bold rounded-lg hover:bg-rose-700 transition-colors", children: "Open Deal" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400 text-center sm:text-left", children: "Confidence: 94%" })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          whileHover: isMobile ? void 0 : { y: -1 },
          className: "p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 sm:gap-3 w-full min-w-0",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" }) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[11px] sm:text-xs font-bold text-slate-800 leading-snug", children: "Lead At Risk: TechNova Inc." }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-relaxed", children: "No contact in 14 days. Competitor mentioned in last email thread." })
              ] }),
              /* @__PURE__ */ jsx("button", { type: "button", className: "w-full sm:w-auto px-3.5 py-1.5 border border-slate-300 text-slate-700 hover:border-rose-300 hover:text-rose-700 text-[11px] font-bold rounded-lg bg-white transition-colors", children: "Schedule Follow-up" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          whileHover: isMobile ? void 0 : { y: -1 },
          className: "p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 flex flex-col w-full min-w-0",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2 mb-2 sm:mb-3 w-full min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-500 font-semibold", children: "Quarterly Forecast" }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mt-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-lg sm:text-xl font-black tracking-tight text-slate-900 tabular-nums", children: "₹12.4L" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-[9px] sm:text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5", children: [
                    /* @__PURE__ */ jsx(TrendingUp, { className: "w-3 h-3" }),
                    "+15% over target"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(BarChart3, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-1.5 bg-slate-200 rounded-full overflow-hidden w-full", children: /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { width: 0 },
                animate: { width: "80%" },
                transition: { duration: 1, ease: "easeOut" },
                className: "h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full"
              }
            ) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: showNotification && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 },
        className: "absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-800 text-white text-[10px] font-semibold rounded-lg shadow-lg z-10",
        children: "Insights updated"
      }
    ) })
  ] });
}
function ImpMetrics({ metrics, filterKey }) {
  const isMobile = useIsMobile();
  const cards = [
    { label: "Pickup Rate", shortLabel: "Pickup", value: metrics.pickup, color: "#e11d48" },
    { label: "Qualification Rate", shortLabel: "Qualify", value: metrics.qualification, color: "#6366f1" },
    { label: "Conversion Rate", shortLabel: "Convert", value: metrics.conversion, color: "#10b981" }
  ];
  const ringSize = isMobile ? 58 : 78;
  const ringStroke = isMobile ? 5 : 7;
  return /* @__PURE__ */ jsxs("div", { className: `${PANEL} p-2.5 sm:p-5 min-w-0 w-full`, children: [
    /* @__PURE__ */ jsx(
      SectionHead,
      {
        compact: isMobile,
        icon: Activity,
        title: "Key Metrics",
        sub: isMobile ? "Pickup, qualify & convert" : "Pickup, qualification & conversion rates"
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "grid grid-cols-3 gap-1.5 sm:gap-3 w-full min-w-0",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.35 },
        children: cards.map((c, i) => /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "min-w-0 w-full flex justify-center",
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: i * 0.08, duration: 0.35 },
            children: /* @__PURE__ */ jsx(
              Donut,
              {
                pct: c.value,
                size: ringSize,
                stroke: ringStroke,
                color: c.color,
                label: isMobile ? c.shortLabel : c.label,
                compact: isMobile
              }
            )
          },
          c.label
        ))
      },
      filterKey
    ) })
  ] });
}
function ActivityHistoryDrawerContent({ items }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", "Team", "Deals", "Alerts", "System"];
  const enrichedItems = useMemo(() => {
    return items.map((item, idx) => {
      const text = item.text;
      const t = text.toLowerCase();
      let cat = "System";
      if (t.includes("seo") || t.includes("web dev") || t.includes("ui/ux") || t.includes("crm") || t.includes("automation")) {
        cat = "Deals";
      } else if (t.includes("rahul") || t.includes("priya") || t.includes("aman") || t.includes("aryan")) {
        cat = "Team";
      }
      let isAlert = false;
      if (t.includes("drop") || t.includes("below") || t.includes("no-showed") || t.includes("overdue") || t.includes("inactive") || t.includes("overloaded")) {
        isAlert = true;
      }
      return {
        ...item,
        category: cat,
        isAlert,
        time: getRelativeTime(idx),
        catTag: getCategoryTag(text)
      };
    });
  }, [items]);
  const filteredItems = useMemo(() => {
    return enrichedItems.filter((item) => {
      const matchesSearch = item.text.toLowerCase().includes(search.toLowerCase());
      if (activeFilter === "All") return matchesSearch;
      if (activeFilter === "Team") return item.category === "Team" && matchesSearch;
      if (activeFilter === "Deals") return item.category === "Deals" && matchesSearch;
      if (activeFilter === "Alerts") return item.isAlert && matchesSearch;
      if (activeFilter === "System") return item.category === "System" && matchesSearch;
      return matchesSearch;
    });
  }, [enrichedItems, search, activeFilter]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5 flex flex-col h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/50 border border-border", children: [
      /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Search activity timeline...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none w-full"
        }
      ),
      search && /* @__PURE__ */ jsx("button", { onClick: () => setSearch(""), children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5 text-muted-foreground hover:text-foreground" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide", children: categories.map((cat) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setActiveFilter(cat),
        className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeFilter === cat ? "bg-rose-600 text-white shadow-sm" : "bg-secondary/40 border border-border text-gray-500 hover:text-rose-700 hover:border-rose-200"}`,
        children: cat
      },
      cat
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto pr-1 relative min-h-0", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-6 top-3 bottom-3 w-0.5 bg-rose-100/60" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 relative", children: [
        filteredItems.map((item, i) => {
          const config = getActivityIconConfig(item.text);
          const Icon = config.icon;
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -6 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: Math.min(i * 0.04, 0.4) },
              className: "flex items-start gap-4 group cursor-default",
              children: [
                /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 z-10 bg-white transition-all shadow-sm ${config.bg}`, children: /* @__PURE__ */ jsx(Icon, { className: "w-4.5 h-4.5" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-white/40 border border-rose-100/30 group-hover:border-rose-200 hover:bg-rose-50/20 rounded-2xl p-3.5 transition-all", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 mb-1", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-wider text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md", children: item.catTag }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 font-bold tracking-tight whitespace-nowrap", children: item.time })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-700 group-hover:text-gray-900 leading-relaxed font-medium", children: item.text })
                ] })
              ]
            },
            i
          );
        }),
        filteredItems.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-muted-foreground py-8", children: "No activities found matching filters." })
      ] })
    ] })
  ] });
}
const getRelativeTime = (index) => {
  const times = [
    "12 mins ago",
    "45 mins ago",
    "1 hour ago",
    "2 hours ago",
    "4 hours ago",
    "5 hours ago",
    "Yesterday, 4:10 PM",
    "Yesterday, 11:20 AM",
    "2 days ago",
    "3 days ago",
    "3 days ago",
    "4 days ago",
    "5 days ago",
    "1 week ago"
  ];
  return times[index % times.length];
};
const getCategoryTag = (text) => {
  const t = text.toLowerCase();
  if (t.includes("seo")) return "SEO";
  if (t.includes("web dev")) return "Web Dev";
  if (t.includes("ui/ux")) return "UI/UX";
  if (t.includes("crm")) return "CRM Setup";
  if (t.includes("automation")) return "Automation";
  if (t.includes("rahul") || t.includes("priya") || t.includes("aman") || t.includes("aryan")) return "Team";
  return "System";
};
const getActivityIconConfig = (text) => {
  const t = text.toLowerCase();
  if (t.includes("drop") || t.includes("below") || t.includes("no-showed") || t.includes("overdue") || t.includes("inactive")) {
    return {
      bg: "bg-amber-50 border-amber-100 text-amber-600 shadow-sm shadow-amber-500/10",
      icon: AlertTriangle
    };
  }
  if (t.includes("overloaded") || t.includes("overcapacity") || t.includes("delay")) {
    return {
      bg: "bg-red-50 border-red-100 text-rose-600 shadow-sm shadow-red-500/10",
      icon: AlertTriangle
    };
  }
  if (t.includes("closed") || t.includes("exceeded") || t.includes("up to") || t.includes("completed") || t.includes("drove") || t.includes("sent")) {
    return {
      bg: "bg-emerald-50 border-emerald-100 text-emerald-600 shadow-sm shadow-emerald-500/10",
      icon: CheckCircle2
    };
  }
  return {
    bg: "bg-blue-50 border-blue-100 text-blue-600 shadow-sm shadow-blue-500/10",
    icon: Info$1
  };
};
function RecentActivityPanel({ items, filterKey }) {
  const isMobile = useIsMobile();
  const [activityDrawerOpen, setActivityDrawerOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: `${PANEL} p-2.5 sm:p-5 min-w-0 w-full`, children: [
    /* @__PURE__ */ jsx(
      SectionHead,
      {
        compact: isMobile,
        icon: Bell,
        title: "Recent Activity",
        sub: isMobile ? "Team & deal updates" : "Live team & deal updates",
        action: /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-semibold text-slate-400 flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md", children: [
          /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }),
          "Live"
        ] })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: `space-y-0.5 pr-1 ${items.length > 6 ? "overflow-y-auto" : "overflow-y-hidden"}`,
        style: { maxHeight: "240px" },
        initial: "hidden",
        animate: "show",
        exit: "hidden",
        variants: { show: { transition: { staggerChildren: 0.04 } } },
        children: items.map((item, i) => {
          const config = getActivityIconConfig(item.text);
          const Icon = config.icon;
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              variants: fadeUp,
              custom: i,
              className: "group flex items-start gap-2.5 py-1.5 px-1.5 rounded-lg border border-transparent hover:bg-slate-50 hover:border-slate-100 transition-all duration-200 cursor-default",
              children: [
                /* @__PURE__ */ jsx("div", { className: `w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 bg-white shadow-sm ${config.bg}`, children: /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-baseline gap-2 mb-0.5", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[8px] font-bold uppercase text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded", children: getCategoryTag(item.text) }),
                    /* @__PURE__ */ jsx("span", { className: "text-[8px] text-slate-400 font-medium shrink-0", children: getRelativeTime(i) })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-700 group-hover:text-slate-900 leading-snug font-medium line-clamp-2", children: item.text })
                ] })
              ]
            },
            i
          );
        })
      },
      filterKey
    ) }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActivityDrawerOpen(true),
        className: "mt-3 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-center gap-1",
        children: [
          "View all history",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 opacity-60" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Drawer,
      {
        open: activityDrawerOpen,
        onClose: () => setActivityDrawerOpen(false),
        title: "Activity Timeline History",
        children: /* @__PURE__ */ jsx(ActivityHistoryDrawerContent, { items })
      }
    )
  ] });
}
function Info({ label, value }) {
  return /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-secondary/40 border border-border", children: [
    /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("div", { className: "text-sm font-medium mt-1", children: value })
  ] });
}
function LeadDrawerContent({ lead }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(Avatar, { initials: lead.company.slice(0, 2).toUpperCase(), size: 56 }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-display text-xl font-semibold", children: lead.company }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
          lead.contact,
          " · ",
          lead.email
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx(Info, { label: "Stage", value: /* @__PURE__ */ jsx(Badge, { tone: stageTone(lead.stage), children: lead.stage }) }),
      /* @__PURE__ */ jsx(Info, { label: "Priority", value: /* @__PURE__ */ jsx(Badge, { tone: priorityTone(lead.priority), children: lead.priority }) }),
      /* @__PURE__ */ jsx(Info, { label: "Revenue", value: `$${lead.revenue.toLocaleString()}` }),
      /* @__PURE__ */ jsx(Info, { label: "Assignee", value: lead.assignee }),
      /* @__PURE__ */ jsx(Info, { label: "Phone", value: lead.phone }),
      /* @__PURE__ */ jsx(Info, { label: "Follow-up", value: lead.followUp })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-2", children: "Notes" }),
      /* @__PURE__ */ jsx("div", { className: "p-4 rounded-xl bg-secondary/40 border border-border text-sm", children: lead.notes })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-2", children: "AI Suggestions" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: ["Send case study from similar customer", "Book technical deep-dive in next 5 days", "Loop in solutions engineer Priya"].map((s) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 text-sm p-3 rounded-xl bg-primary/10 border border-primary/30", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-primary mt-0.5" }),
        " ",
        s
      ] }, s)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-2", children: "Follow-up timeline" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: ["Email opened", "Discovery call completed", "Proposal sent", "Next: follow-up scheduled"].map((t, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 text-sm", children: [
        /* @__PURE__ */ jsx("div", { className: `w-2.5 h-2.5 rounded-full mt-1.5 ${i < 3 ? "bg-primary" : "bg-muted"}` }),
        /* @__PURE__ */ jsx("div", { children: t })
      ] }, t)) })
    ] })
  ] });
}
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const rev = payload.find((p) => p.dataKey === "revenue")?.value || 0;
    const fore = payload.find((p) => p.dataKey === "forecast")?.value || 0;
    const diff = rev - fore;
    const isPositive = diff >= 0;
    const pct = fore > 0 ? (diff / fore * 100).toFixed(1) : "0";
    return /* @__PURE__ */ jsxs("div", { className: "bg-white/95 backdrop-blur-md border border-rose-100 rounded-2xl p-4 shadow-xl min-w-[200px] text-gray-800 transition-all z-[99999]", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-xs uppercase font-extrabold text-rose-700 tracking-wider mb-2.5", children: [
        label,
        " 2026"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-gray-500 font-medium", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-rose-500" }),
            "Actual Revenue"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "font-extrabold text-gray-900", children: [
            "₹",
            rev.toFixed(1),
            "L"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-gray-500 font-medium", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-blue-500" }),
            "Forecast Target"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold text-gray-600", children: [
            "₹",
            fore.toFixed(1),
            "L"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-px bg-gray-100 my-2" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-500 font-medium", children: "Variance" }),
          /* @__PURE__ */ jsxs("span", { className: `font-bold flex items-center gap-1 ${isPositive ? "text-emerald-600" : "text-rose-600"}`, children: [
            isPositive ? "+" : "",
            "₹",
            diff.toFixed(1),
            "L (",
            isPositive ? "+" : "",
            pct,
            "%)"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `mt-3 text-[10px] font-bold text-center px-2 py-1 rounded-lg ${isPositive ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50/50 text-rose-700 border border-rose-100"}`, children: isPositive ? "🎯 TARGET EXCEEDED" : "⚠️ UNDER TARGET" })
    ] });
  }
  return null;
};
function RevenueTrajectory({ data }) {
  const [viewMode, setViewMode] = useState("monthly");
  const isMobile = useIsMobile(768);
  const chartHeight = isMobile ? 168 : 250;
  const chartMargin = isMobile ? { top: 6, right: 4, left: -12, bottom: 2 } : { top: 15, right: 30, left: 10, bottom: 8 };
  const totalActual = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalForecast = data.reduce((sum, item) => sum + item.forecast, 0);
  const variance = totalActual - totalForecast;
  totalActual / data.length;
  let momSum = 0;
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    const prev = data[i - 1].revenue;
    const curr = data[i].revenue;
    if (prev > 0) {
      momSum += (curr - prev) / prev * 100;
      count++;
    }
  }
  const avgGrowthPct = count > 0 ? momSum / count : 0;
  const monthlyData = data.map((item) => ({
    ...item,
    variance: item.revenue - item.forecast
  }));
  let runningActual = 0;
  let runningForecast = 0;
  const cumulativeData = data.map((item) => {
    runningActual += item.revenue;
    runningForecast += item.forecast;
    return {
      month: item.month,
      revenue: runningActual,
      forecast: runningForecast,
      variance: runningActual - runningForecast
    };
  });
  const activeData = viewMode === "monthly" ? monthlyData : cumulativeData;
  return /* @__PURE__ */ jsxs("div", { className: `${PANEL} p-3 sm:p-5`, children: [
    /* @__PURE__ */ jsx(
      SectionHead,
      {
        icon: BarChart3,
        title: "Revenue Trajectory",
        sub: isMobile ? "Actual vs forecast" : "Last 12 months — actual vs forecast",
        action: /* @__PURE__ */ jsx("div", { className: "inline-flex p-0.5 sm:p-1 rounded-lg bg-slate-100 border border-slate-200", children: ["monthly", "cumulative"].map((mode) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setViewMode(mode),
            className: `px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-bold rounded-md transition ${viewMode === mode ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`,
            children: mode === "monthly" ? "Monthly" : "Cumulative"
          },
          mode
        )) })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg sm:rounded-xl bg-slate-50 border border-slate-100 p-2 sm:p-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0", children: /* @__PURE__ */ jsx(DollarSign, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[8px] sm:text-[9px] uppercase font-semibold text-slate-400 tracking-wide truncate", children: viewMode === "monthly" ? "Total Revenue" : "Cumulative YTD" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm font-bold text-slate-900 tabular-nums", children: [
            "₹",
            totalActual.toFixed(1),
            "L"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg sm:rounded-xl bg-slate-50 border border-slate-100 p-2 sm:p-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0", children: /* @__PURE__ */ jsx(CalendarDays, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[8px] sm:text-[9px] uppercase font-semibold text-slate-400 tracking-wide", children: "Target" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm font-bold text-slate-900 tabular-nums", children: [
            "₹",
            totalForecast.toFixed(1),
            "L"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `rounded-lg sm:rounded-xl border p-2 sm:p-3 flex items-center gap-2 ${variance >= 0 ? "bg-emerald-50/50 border-emerald-100" : "bg-rose-50/50 border-rose-100"}`, children: [
        /* @__PURE__ */ jsx("div", { className: `w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg flex items-center justify-center border shrink-0 ${variance >= 0 ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-rose-50 border-rose-100 text-rose-600"}`, children: variance >= 0 ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" }) : /* @__PURE__ */ jsx(AlertTriangle, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[8px] sm:text-[9px] uppercase font-semibold text-slate-400 tracking-wide", children: "Variance" }),
          /* @__PURE__ */ jsxs("p", { className: `text-xs sm:text-sm font-bold tabular-nums truncate ${variance >= 0 ? "text-emerald-600" : "text-rose-600"}`, children: [
            variance >= 0 ? "+" : "",
            "₹",
            variance.toFixed(1),
            "L"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg sm:rounded-xl bg-slate-50 border border-slate-100 p-2 sm:p-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0", children: /* @__PURE__ */ jsx(Zap, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[8px] sm:text-[9px] uppercase font-semibold text-slate-400 tracking-wide", children: "MoM Growth" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm font-bold text-slate-900 tabular-nums", children: [
            avgGrowthPct.toFixed(1),
            "%"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: isMobile ? "w-full min-w-0" : "rev-scroll overflow-x-auto", children: /* @__PURE__ */ jsx("div", { style: isMobile ? { height: chartHeight, width: "100%" } : { minWidth: 400, height: chartHeight }, children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: chartHeight, children: /* @__PURE__ */ jsxs(ComposedChart, { data: activeData, margin: chartMargin, children: [
      /* @__PURE__ */ jsxs("defs", { children: [
        /* @__PURE__ */ jsxs("linearGradient", { id: "actualGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#e11d48", stopOpacity: 0.25 }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#e11d48", stopOpacity: 0.01 })
        ] }),
        /* @__PURE__ */ jsxs("linearGradient", { id: "forecastGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#3b82f6", stopOpacity: 0.1 }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#3b82f6", stopOpacity: 0 })
        ] })
      ] }),
      /* @__PURE__ */ jsx(CartesianGrid, { stroke: "#f1f5f9", vertical: false, strokeDasharray: "3 3" }),
      /* @__PURE__ */ jsx(
        XAxis,
        {
          dataKey: "month",
          stroke: "#94a3b8",
          fontSize: isMobile ? 8 : 10,
          interval: isMobile ? 1 : 0,
          tick: { dy: 4, fill: "#475569", fontWeight: 500, fontSize: isMobile ? 8 : 10 },
          tickMargin: 2,
          axisLine: { stroke: "#e2e8f0" },
          tickLine: false
        }
      ),
      /* @__PURE__ */ jsx(
        YAxis,
        {
          stroke: "#94a3b8",
          fontSize: isMobile ? 8 : 10,
          width: isMobile ? 26 : 40,
          tickMargin: 2,
          tickFormatter: (v) => isMobile ? `${v}L` : `₹${v}L`,
          tick: { fill: "#475569", fontWeight: 500, fontSize: isMobile ? 8 : 10 },
          axisLine: false,
          tickLine: false
        }
      ),
      /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}), cursor: { stroke: "#fecdd3", strokeWidth: 1.5, strokeDasharray: "3 3" } }),
      /* @__PURE__ */ jsx(Bar, { dataKey: "variance", radius: [3, 3, 0, 0], barSize: isMobile ? 8 : 14, children: activeData.map((entry, index) => {
        const isPositive = entry.variance >= 0;
        return /* @__PURE__ */ jsx(
          Cell,
          {
            fill: isPositive ? "#10b981" : "#ef4444",
            fillOpacity: 0.15,
            stroke: isPositive ? "#059669" : "#dc2626",
            strokeOpacity: 0.3,
            strokeWidth: 1
          },
          `cell-${index}`
        );
      }) }),
      /* @__PURE__ */ jsx(
        Area,
        {
          type: "monotone",
          dataKey: "forecast",
          stroke: "#3b82f6",
          strokeWidth: isMobile ? 1.5 : 2,
          strokeDasharray: "5 5",
          fill: "url(#forecastGrad)",
          name: "Forecast"
        }
      ),
      /* @__PURE__ */ jsx(
        Area,
        {
          type: "monotone",
          dataKey: "revenue",
          stroke: "#e11d48",
          strokeWidth: isMobile ? 2 : 2.5,
          fill: "url(#actualGrad)",
          name: "Revenue",
          activeDot: { r: isMobile ? 4 : 6, fill: "#e11d48", stroke: "#fff", strokeWidth: 2 }
        }
      )
    ] }) }) }) })
  ] });
}
function Dashboard() {
  const [lead, setLead] = useState(null);
  const { preset } = useDateRange();
  const [selectedService, setSelectedService] = useState("All Services");
  const filterKey = preset === "custom" ? "week" : preset;
  const fd = FILTER_DATA[filterKey];
  useEffect(() => {
    setSelectedService("All Services");
  }, [filterKey]);
  const serviceBreakdownData = SERVICE_BREAKDOWN[filterKey];
  serviceBreakdownData[selectedService] || serviceBreakdownData["All Services"];
  const pipelineData = SERVICE_PIPELINE[filterKey];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-5 page-shell min-w-0", children: [
    /* @__PURE__ */ jsx(KPICardsRow, { kpiData: fd.kpis, filterKey }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-[1fr_minmax(0,_36%)] gap-3 sm:gap-4 items-start min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:gap-4 min-w-0", children: [
        /* @__PURE__ */ jsx(LeaderBoard, { employees: fd.leaderboard, filterKey }),
        /* @__PURE__ */ jsx(
          LeadPipeline,
          {
            pipelineData,
            filterKey,
            selectedService,
            onServiceChange: setSelectedService
          }
        ),
        /* @__PURE__ */ jsx(RevenueTrajectory, { data: revenueSeries })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:gap-4 min-w-0 w-full", children: [
        /* @__PURE__ */ jsx(AIInsightsPanel, { insights: fd.insights, filterKey }),
        /* @__PURE__ */ jsx(ImpMetrics, { metrics: fd.metrics, filterKey }),
        /* @__PURE__ */ jsx(RecentActivityPanel, { items: fd.activity, filterKey })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Drawer, { open: !!lead, onClose: () => setLead(null), title: lead?.company || "", children: lead && /* @__PURE__ */ jsx(LeadDrawerContent, { lead }) })
  ] });
}
export {
  Dashboard as default
};
