import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useMemo, useEffect } from "react";
import { Clock, Phone, Target, MessageSquare, TrendingUp, Repeat, Users, Calendar, Calculator, Kanban, Award, ChevronDown, Mail, Tag } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts";
import { G as GlassCard, B as Badge, D as Drawer } from "./Primitives-CmGbnOU9.js";
import { b as PRIORITY_BADGE, f as formatPipelineValue, t as timeAgoShort } from "./pipelineMock-BrKX7IAf.js";
import { u as useIsMobile } from "./use-mobile-BsFue-bT.js";
import toast, { Toaster } from "react-hot-toast";
import "framer-motion";
const MONTH_OPTIONS = [
  { value: "2026-06", label: "June, 2026" },
  { value: "2026-05", label: "May, 2026" },
  { value: "2026-04", label: "April, 2026" },
  { value: "2026-03", label: "March, 2026" },
  { value: "2026-02", label: "February, 2026" },
  { value: "2026-01", label: "January, 2026" }
];
const LEAD_TABS = ["Converted", "Qualified", "Un-Qualified", "Not Interested"];
const LEAD_CARD_ROW_PX = 84;
const LEAD_GRID_GAP_PX = 6;
const LEAD_VISIBLE_ROWS = 3;
const LEAD_GRID_VIEWPORT_PX = LEAD_VISIBLE_ROWS * LEAD_CARD_ROW_PX + (LEAD_VISIBLE_ROWS - 1) * LEAD_GRID_GAP_PX;
const LEAD_STATUS_TONE = {
  Converted: "success",
  Qualified: "info",
  "Un-Qualified": "warning",
  "Not Interested": "danger"
};
const LEAD_SERVICES = [
  "AI Automation Suite",
  "CRM Setup & Onboarding",
  "Lead Gen Engine",
  "Custom Software Dev",
  "Strategic Consulting"
];
const LEAD_SOURCES = ["Website", "Meta Ads", "Referral", "Google Ads", "WhatsApp"];
const LEAD_STATUS_CARD_POOL = [
  { name: "Ananya Sharma", company: "Penguin India", value: 478e3, priority: "HOT" },
  { name: "Rohan Mehta", company: "Mehta Textiles", value: 215e3, priority: "WARM" },
  { name: "Kavya Nair", company: "Nair Foods", value: 89e3, priority: "COLD" },
  { name: "Meera Joshi", company: "Joshi Retail", value: 175e3, priority: "HOT" },
  { name: "Isha Banerjee", company: "Banerjee Media", value: 34e4, priority: "HOT" },
  { name: "Deepak Malhotra", company: "Malhotra Finance", value: 52e4, priority: "HOT" },
  { name: "Vivek Choudhary", company: "Choudhary Pharma", value: 75e4, priority: "WARM" },
  { name: "Amit Desai", company: "Desai Logistics", value: 45e4, priority: "HOT" },
  { name: "Rohit Saxena", company: "Saxena Auto", value: 89e4, priority: "WARM" },
  { name: "Arjun Patel", company: "Patel Logistics", value: 156e3, priority: "COLD" },
  { name: "Neha Gupta", company: "ScaleUp Co", value: 28e4, priority: "WARM" },
  { name: "Karan Malhotra", company: "SaaS.io", value: 52e3, priority: "COLD" }
];
function getLeadSnapshot(employee, month) {
  if (employee.leadDataByMonth?.[month]) {
    return employee.leadDataByMonth[month];
  }
  if (month === "2026-06") {
    return {
      leadStatus: employee.leadStatus,
      weeklyLeads: employee.weeklyLeads
    };
  }
  const seed = String(employee.id + month).split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const factor = 0.65 + seed % 35 / 100;
  const leadStatus = {};
  const weeklyLeads = {};
  LEAD_TABS.forEach((tab) => {
    const baseCount = employee.leadStatus[tab] ?? 0;
    const total = Math.max(0, Math.round(baseCount * factor));
    leadStatus[tab] = total;
    const baseWeeks = employee.weeklyLeads?.[tab] || [0, 0, 0, 0];
    const baseSum = baseWeeks.reduce((sum, n) => sum + n, 0) || 1;
    const scaled = baseWeeks.map((n) => Math.max(0, Math.round(n / baseSum * total)));
    const scaledSum = scaled.reduce((sum, n) => sum + n, 0);
    if (scaled.length && scaledSum !== total) {
      scaled[scaled.length - 1] += total - scaledSum;
    }
    weeklyLeads[tab] = scaled;
  });
  return { leadStatus, weeklyLeads };
}
function buildFilteredLeads(leadChartData, leadTab, employee, monthLabel) {
  const tabSeed = LEAD_TABS.indexOf(leadTab);
  const empSeed = employee.id * 13;
  const leads = [];
  let idx = 0;
  leadChartData.forEach((weekRow, weekIdx) => {
    for (let i = 0; i < weekRow.count; i += 1) {
      const template = LEAD_STATUS_CARD_POOL[(empSeed + tabSeed * 7 + weekIdx * 4 + i) % LEAD_STATUS_CARD_POOL.length];
      const firstName = template.name.split(" ")[0].toLowerCase();
      const companySlug = template.company.split(" ")[0].toLowerCase();
      leads.push({
        id: `${employee.id}-${monthLabel}-${leadTab}-${weekRow.week}-${i}`,
        ...template,
        status: leadTab,
        week: weekRow.week,
        weekLabel: weekRow.weekLabel,
        weekRange: weekRow.range,
        owner: employee.name,
        employeeId: employee.id,
        month: monthLabel,
        service: LEAD_SERVICES[(empSeed + weekIdx + i) % LEAD_SERVICES.length],
        source: LEAD_SOURCES[(empSeed + weekIdx + i) % LEAD_SOURCES.length],
        phone: `+91 98${String(1e7 + empSeed * 100 + tabSeed * 10 + idx).slice(-8)}`,
        email: `${firstName}@${companySlug}.in`,
        updatedAt: new Date(Date.now() - (idx + 1) * 72e5).toISOString(),
        notes: `${leadTab} lead for ${employee.name} in ${monthLabel} (${weekRow.week}, ${weekRow.range}).`
      });
      idx += 1;
    }
  });
  return leads;
}
function LeadStatusCard({ lead, onClick }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "w-full text-left rounded-lg border border-rose-100 bg-white p-2 shrink-0 hover:border-rose-300 hover:shadow-sm transition group",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-1 mb-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-slate-900 truncate group-hover:text-rose-800 transition", children: lead.name }),
            /* @__PURE__ */ jsx("p", { className: "text-[8px] text-slate-500 truncate", children: lead.company })
          ] }),
          /* @__PURE__ */ jsx(Badge, { tone: PRIORITY_BADGE[lead.priority] || "muted", children: lead.priority })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-rose-50", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-rose-700 tabular-nums", children: formatPipelineValue(lead.value) }),
          /* @__PURE__ */ jsx("span", { className: "text-[8px] font-medium text-slate-400", children: timeAgoShort(lead.updatedAt) })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-[8px] text-slate-400 mt-1 truncate", children: [
          lead.week,
          " · ",
          lead.weekRange
        ] })
      ]
    }
  );
}
function LeadStatusDetailDrawer({ open, onClose, lead, monthLabel }) {
  if (!lead) return null;
  return /* @__PURE__ */ jsx(
    Drawer,
    {
      open,
      onClose,
      title: "Lead Information",
      width: "drawer-panel sm:max-w-md",
      children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-100 bg-rose-50/40 p-3.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-slate-900", children: lead.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: lead.company })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end gap-1 shrink-0", children: [
              /* @__PURE__ */ jsx(Badge, { tone: LEAD_STATUS_TONE[lead.status] || "muted", children: lead.status }),
              /* @__PURE__ */ jsx(Badge, { tone: PRIORITY_BADGE[lead.priority] || "muted", children: lead.priority })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-rose-700 tabular-nums mt-3", children: formatPipelineValue(lead.value) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2.5", children: [
          { label: "Week", value: `${lead.week} · ${lead.weekRange}` },
          { label: "Month", value: lead.month || monthLabel },
          { label: "Service", value: lead.service },
          { label: "Source", value: lead.source },
          { label: "Owner", value: lead.owner },
          { label: "Last Update", value: timeAgoShort(lead.updatedAt) }
        ].map((row) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-slate-100 bg-slate-50/80 px-2.5 py-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-slate-400 uppercase tracking-wide", children: row.label }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold text-slate-800 mt-0.5 leading-snug", children: row.value })
        ] }, row.label)) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider", children: "Contact" }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-slate-100 bg-white px-3 py-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-3.5 h-3.5 text-rose-500 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-slate-700 tabular-nums", children: lead.phone })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-slate-100 bg-white px-3 py-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Mail, { className: "w-3.5 h-3.5 text-rose-500 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-slate-700 truncate", children: lead.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-slate-100 bg-slate-50/80 p-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1.5", children: [
            /* @__PURE__ */ jsx(Tag, { className: "w-3.5 h-3.5 text-slate-400" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider", children: "Notes" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: lead.notes })
        ] })
      ] })
    }
  );
}
const DEFAULT_KRA_ROWS = [
  { key: "calls", label: "Call Conversations", weight: 25 },
  { key: "qualified", label: "Qualified Leads", weight: 25 },
  { key: "meetings", label: "Meetings Scheduled", weight: 25 },
  { key: "cash", label: "Cash Collection", weight: 25 }
];
const INITIAL_TEAMMATES = [
  {
    id: 1,
    name: "Suresh Kumar",
    role: "Senior Sales Executive",
    team: "Sales & Growth",
    status: "APPROVED",
    baseSalary: 12e3,
    callsCompleted: 200,
    callsTarget: 250,
    qualifiedLeads: 40,
    qualifiedTarget: 50,
    meetingsScheduled: 20,
    meetingsTarget: 25,
    cashCollected: 2e4,
    cashTarget: 4e4,
    incRate: 6,
    incBonus: 0,
    penaltyDeduction: 0,
    responseTimeMin: 1.8,
    pickupRate: 78,
    qualificationRate: 80,
    objectionHandling: 88,
    conversionRate: 45,
    followUpQuality: 82,
    leadStatus: { Converted: 18, Qualified: 40, "Un-Qualified": 52, "Not Interested": 30 },
    weeklyLeads: {
      Converted: [3, 4, 5, 6],
      Qualified: [8, 10, 11, 11],
      "Un-Qualified": [12, 13, 14, 13],
      "Not Interested": [6, 7, 8, 9]
    },
    competency: {
      "Product Value Alignment": 78,
      "Call Control": 85,
      "Listening Skills": 72,
      "KYC Questioning": 80,
      "Objection Handling": 88
    }
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Senior Sales Executive",
    team: "Sales & Growth",
    status: "APPROVED",
    baseSalary: 8500,
    callsCompleted: 456,
    callsTarget: 400,
    qualifiedLeads: 45,
    qualifiedTarget: 40,
    meetingsScheduled: 38,
    meetingsTarget: 35,
    cashCollected: 145e3,
    cashTarget: 125e3,
    incRate: 3.5,
    incBonus: 2500,
    penaltyDeduction: 0,
    responseTimeMin: 1.2,
    pickupRate: 92,
    qualificationRate: 112,
    objectionHandling: 91,
    conversionRate: 73,
    followUpQuality: 94,
    leadStatus: { Converted: 45, Qualified: 62, "Un-Qualified": 38, "Not Interested": 22 },
    weeklyLeads: {
      Converted: [9, 11, 12, 13],
      Qualified: [14, 16, 16, 16],
      "Un-Qualified": [8, 10, 10, 10],
      "Not Interested": [4, 6, 6, 6]
    },
    competency: {
      "Product Value Alignment": 92,
      "Call Control": 88,
      "Listening Skills": 90,
      "KYC Questioning": 85,
      "Objection Handling": 91
    }
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Key Account Manager",
    team: "Enterprise Sales",
    status: "PAID",
    baseSalary: 7500,
    callsCompleted: 392,
    callsTarget: 400,
    qualifiedLeads: 39,
    qualifiedTarget: 40,
    meetingsScheduled: 28,
    meetingsTarget: 30,
    cashCollected: 118e3,
    cashTarget: 12e4,
    incRate: 2.8,
    incBonus: 1e3,
    penaltyDeduction: 104,
    responseTimeMin: 2.1,
    pickupRate: 71,
    qualificationRate: 97,
    objectionHandling: 74,
    conversionRate: 81,
    followUpQuality: 76,
    leadStatus: { Converted: 39, Qualified: 48, "Un-Qualified": 44, "Not Interested": 19 },
    weeklyLeads: {
      Converted: [8, 9, 11, 11],
      Qualified: [10, 12, 13, 13],
      "Un-Qualified": [9, 11, 12, 12],
      "Not Interested": [4, 5, 5, 5]
    },
    competency: {
      "Product Value Alignment": 75,
      "Call Control": 70,
      "Listening Skills": 78,
      "KYC Questioning": 72,
      "Objection Handling": 74
    }
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Outbound Sales Associate",
    team: "Sales & Growth",
    status: "PENDING",
    baseSalary: 6e3,
    callsCompleted: 540,
    callsTarget: 400,
    qualifiedLeads: 54,
    qualifiedTarget: 40,
    meetingsScheduled: 42,
    meetingsTarget: 35,
    cashCollected: 24e4,
    cashTarget: 177778,
    incRate: 4,
    incBonus: 4500,
    penaltyDeduction: 0,
    responseTimeMin: 1,
    pickupRate: 96,
    qualificationRate: 135,
    objectionHandling: 89,
    conversionRate: 100,
    followUpQuality: 91,
    leadStatus: { Converted: 54, Qualified: 71, "Un-Qualified": 29, "Not Interested": 15 },
    weeklyLeads: {
      Converted: [11, 13, 15, 15],
      Qualified: [15, 18, 19, 19],
      "Un-Qualified": [6, 7, 8, 8],
      "Not Interested": [3, 4, 4, 4]
    },
    competency: {
      "Product Value Alignment": 88,
      "Call Control": 94,
      "Listening Skills": 86,
      "KYC Questioning": 90,
      "Objection Handling": 89
    }
  }
];
function getSafeNum(val) {
  const num = Number(val);
  return Number.isNaN(num) ? 0 : num;
}
function pct(actual, target) {
  const t = getSafeNum(target) || 1;
  return Math.round(getSafeNum(actual) / t * 1e3) / 10;
}
function formatCash(val) {
  const v = getSafeNum(val);
  if (v >= 1e3) return `$${(v / 1e3).toFixed(v % 1e3 === 0 ? 0 : 1)}K`;
  return `$${v.toLocaleString()}`;
}
function getWeekRanges(monthValue) {
  const [y, m] = monthValue.split("-").map(Number);
  const ranges = [];
  const daysInMonth = new Date(y, m, 0).getDate();
  const chunks = [
    [1, 7],
    [8, 14],
    [15, 21],
    [22, daysInMonth]
  ];
  const monthShort = new Date(y, m - 1).toLocaleString("en", { month: "short" });
  chunks.forEach(([start, end], i) => {
    ranges.push({
      key: `W${i + 1}`,
      label: `Week ${i + 1}`,
      range: `${monthShort} ${start}–${end}`
    });
  });
  return ranges;
}
function getInsightValues(emp, key) {
  switch (key) {
    case "calls":
      return { actual: emp.callsCompleted, target: emp.callsTarget };
    case "qualified":
      return { actual: emp.qualifiedLeads, target: emp.qualifiedTarget };
    case "meetings":
      return { actual: emp.meetingsScheduled, target: emp.meetingsTarget };
    case "cash":
      return { actual: emp.cashCollected, target: emp.cashTarget };
    default:
      return { actual: 0, target: 1 };
  }
}
function formatTargetDisplay(key, actual, target) {
  if (key === "cash") return `${formatCash(actual)}/${formatCash(target)}`;
  return `${actual}/${target}`;
}
function computeKraEarned(actual, target, weight) {
  const achievement = pct(actual, target);
  return Math.round(achievement / 100 * weight * 10) / 10;
}
function computeIncentiveFromDraft(draft) {
  const comm = Math.round(getSafeNum(draft.cashCollected) * (getSafeNum(draft.incRate) / 100));
  const bonus = getSafeNum(draft.incBonus);
  const penalty = getSafeNum(draft.penaltyDeduction);
  return Math.round(comm + bonus - penalty);
}
function computeWeightedScore(emp, kraRows) {
  let earned = 0;
  kraRows.forEach((row) => {
    const { actual, target } = getInsightValues(emp, row.key);
    earned += computeKraEarned(actual, target, row.weight);
  });
  return Math.round(earned * 10) / 10;
}
function incentiveStatusTone(status) {
  if (status === "PAID") return "success";
  if (status === "APPROVED") return "info";
  if (status === "REJECTED") return "danger";
  return "warning";
}
function SelectField({ label, value, onChange, options, icon: Icon, compact = false }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
    /* @__PURE__ */ jsx("label", { className: `font-bold text-slate-400 uppercase tracking-wider block ${compact ? "text-[9px] mb-1" : "text-[10px] mb-1.5"}`, children: label }),
    /* @__PURE__ */ jsxs("div", { className: "relative min-w-0", children: [
      Icon && /* @__PURE__ */ jsx(Icon, { className: `absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-rose-300 pointer-events-none ${compact ? "w-3.5 h-3.5" : "w-4 h-4"}` }),
      /* @__PURE__ */ jsx(
        "select",
        {
          value,
          onChange: (e) => onChange(e.target.value),
          className: `w-full min-w-0 appearance-none rounded-lg sm:rounded-xl border border-rose-100 bg-white text-slate-800 font-semibold py-0 pr-8 outline-none focus:border-rose-400 transition truncate ${compact ? "h-9 text-[11px] sm:text-sm" : "h-10 text-sm"} ${Icon ? compact ? "pl-8" : "pl-9" : "pl-3"}`,
          children: options.map((o) => /* @__PURE__ */ jsx("option", { value: o.value, children: o.label }, o.value))
        }
      ),
      /* @__PURE__ */ jsx(ChevronDown, { className: `absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none ${compact ? "w-3.5 h-3.5" : "w-4 h-4"}` })
    ] })
  ] });
}
const STATUS_PILL_CLASS = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  info: "bg-sky-50 text-sky-700 border-sky-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  muted: "bg-slate-100 text-slate-600 border-slate-200"
};
function MetricTile({ label, value, score, icon: Icon, suffix = "%" }) {
  const barPct = Math.min(100, getSafeNum(score));
  const displayValue = suffix === "%" && typeof value === "number" ? `${value}%` : value;
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-100 bg-white/90 p-2.5 sm:p-3 flex flex-col justify-between h-full min-h-[88px]", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-rose-50 text-rose-600 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg font-black text-slate-900 tabular-nums leading-none", children: displayValue })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-slate-500 uppercase tracking-wide truncate", children: label }),
      /* @__PURE__ */ jsx("div", { className: "mt-1.5 h-1 rounded-full bg-slate-100 overflow-hidden", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full rounded-full bg-gradient-to-r from-rose-500 to-rose-600 transition-all duration-500",
          style: { width: `${barPct}%` }
        }
      ) })
    ] })
  ] });
}
function KraInsightRow({ row, onWeightChange }) {
  const achievement = row.weight ? Math.min(100, Math.round(row.earned / row.weight * 1e3) / 10) : 0;
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-slate-100 bg-white/80 px-3 py-2.5 grid grid-cols-[minmax(0,1fr)_72px_56px] sm:grid-cols-[minmax(0,1fr)_88px_64px] gap-2 sm:gap-3 items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-slate-800 truncate", children: row.label }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-slate-500 tabular-nums shrink-0", children: row.display })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-1 rounded-full bg-slate-100 overflow-hidden", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full rounded-full bg-gradient-to-r from-rose-500 to-rose-600",
          style: { width: `${achievement}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[8px] font-bold text-slate-400 uppercase", children: "Earned" }),
      /* @__PURE__ */ jsxs("p", { className: "text-[11px] font-black text-rose-700 tabular-nums mt-0.5", children: [
        row.earned,
        "%",
        /* @__PURE__ */ jsxs("span", { className: "text-slate-400 font-semibold", children: [
          " / ",
          row.weight,
          "%"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-[8px] font-bold text-slate-400 uppercase text-center mb-1", children: "Weight" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "number",
          min: 0,
          max: 100,
          value: row.weight,
          onChange: (e) => onWeightChange(row.key, e.target.value),
          className: "w-full text-center rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-800 py-1 outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
        }
      )
    ] })
  ] });
}
function buildDraftFromEmployee(emp) {
  return {
    baseSalary: emp.baseSalary,
    callsCompleted: emp.callsCompleted,
    callsTarget: emp.callsTarget,
    qualifiedLeads: emp.qualifiedLeads,
    qualifiedTarget: emp.qualifiedTarget,
    meetingsScheduled: emp.meetingsScheduled,
    meetingsTarget: emp.meetingsTarget,
    cashCollected: emp.cashCollected,
    cashTarget: emp.cashTarget,
    incRate: emp.incRate,
    incBonus: emp.incBonus,
    penaltyDeduction: emp.penaltyDeduction
  };
}
function Incentives() {
  const isMobile = useIsMobile();
  const [teammates] = useState(INITIAL_TEAMMATES);
  const [selectedId, setSelectedId] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("2026-06");
  const [leadTab, setLeadTab] = useState("Converted");
  const [activeLead, setActiveLead] = useState(null);
  const [kraRows, setKraRows] = useState(DEFAULT_KRA_ROWS.map((r) => ({ ...r })));
  const [calcOpen, setCalcOpen] = useState(false);
  const [calcDraft, setCalcDraft] = useState(null);
  const [calcResult, setCalcResult] = useState(null);
  const selected = useMemo(
    () => teammates.find((t) => t.id === selectedId) || teammates[0],
    [teammates, selectedId]
  );
  const employeeOptions = teammates.map((t) => ({ value: String(t.id), label: t.name }));
  const weekRanges = useMemo(() => getWeekRanges(selectedMonth), [selectedMonth]);
  const totalKraWeight = useMemo(() => kraRows.reduce((s, r) => s + getSafeNum(r.weight), 0), [kraRows]);
  const insightRows = useMemo(() => kraRows.map((row) => {
    const { actual, target } = getInsightValues(selected, row.key);
    const earned = computeKraEarned(actual, target, row.weight);
    return {
      ...row,
      actual,
      target,
      display: formatTargetDisplay(row.key, actual, target),
      earned
    };
  }), [selected, kraRows]);
  const serviceMetrics = useMemo(() => [
    { label: "Response Time", shortLabel: "Response", value: `${selected.responseTimeMin} min`, score: Math.max(0, 100 - selected.responseTimeMin * 20), icon: Clock, suffix: "" },
    { label: "Pickup Rate", shortLabel: "Pickup", value: selected.pickupRate, score: selected.pickupRate, icon: Phone },
    { label: "Qualification Rate", shortLabel: "Qualify", value: Math.min(99, selected.qualificationRate), score: Math.min(100, selected.qualificationRate), icon: Target },
    { label: "Objection Handling", shortLabel: "Objection", value: selected.objectionHandling, score: selected.objectionHandling, icon: MessageSquare },
    { label: "Conversion Rate", shortLabel: "Convert", value: selected.conversionRate, score: selected.conversionRate, icon: TrendingUp },
    { label: "Follow-up Quality", shortLabel: "Follow-up", value: selected.followUpQuality, score: selected.followUpQuality, icon: Repeat }
  ], [selected]);
  const monthLabel = MONTH_OPTIONS.find((m) => m.value === selectedMonth)?.label ?? selectedMonth;
  const leadSnapshot = useMemo(
    () => getLeadSnapshot(selected, selectedMonth),
    [selected, selectedMonth]
  );
  const leadChartData = useMemo(() => {
    const values = leadSnapshot.weeklyLeads?.[leadTab] || [0, 0, 0, 0];
    return weekRanges.map((w, i) => ({
      week: w.key,
      weekLabel: w.label,
      range: w.range,
      count: values[i] ?? 0
    }));
  }, [leadSnapshot, leadTab, weekRanges]);
  const leadChartTotal = useMemo(
    () => leadSnapshot.leadStatus?.[leadTab] ?? leadChartData.reduce((s, d) => s + d.count, 0),
    [leadSnapshot, leadTab, leadChartData]
  );
  const filteredLeads = useMemo(
    () => buildFilteredLeads(leadChartData, leadTab, selected, monthLabel),
    [leadChartData, leadTab, selected, monthLabel]
  );
  const avgServiceScore = useMemo(
    () => serviceMetrics.length ? Math.round(serviceMetrics.reduce((sum, m) => sum + Math.min(100, getSafeNum(m.score)), 0) / serviceMetrics.length) : 0,
    [serviceMetrics]
  );
  const radarData = useMemo(
    () => Object.entries(selected.competency).map(([skill, score]) => ({ skill, score })),
    [selected]
  );
  const avgCompetency = useMemo(
    () => radarData.length ? Math.round(radarData.reduce((sum, d) => sum + d.score, 0) / radarData.length) : 0,
    [radarData]
  );
  const topCompetency = useMemo(
    () => [...radarData].sort((a, b) => b.score - a.score)[0],
    [radarData]
  );
  const weakestCompetency = useMemo(
    () => [...radarData].sort((a, b) => a.score - b.score)[0],
    [radarData]
  );
  const focusSkills = useMemo(
    () => radarData.filter((d) => d.score < 80).sort((a, b) => a.score - b.score),
    [radarData]
  );
  const weightedPerformance = useMemo(
    () => computeWeightedScore(selected, kraRows),
    [selected, kraRows]
  );
  useEffect(() => {
    setActiveLead(null);
  }, [leadTab, selectedId, selectedMonth]);
  useEffect(() => {
    if (calcOpen && selected) {
      setCalcDraft(buildDraftFromEmployee(selected));
      setCalcResult(null);
    }
  }, [calcOpen, selected]);
  const handleCalculateOpen = () => {
    setCalcOpen(true);
  };
  const handleRunCalculation = () => {
    if (!calcDraft) return;
    if (totalKraWeight !== 100) {
      toast.error("KRA weights must total 100%");
      return;
    }
    const incentiveAmount = computeIncentiveFromDraft(calcDraft);
    const commission = Math.round(getSafeNum(calcDraft.cashCollected) * (getSafeNum(calcDraft.incRate) / 100));
    const performance = computeWeightedScore(
      { ...selected, ...calcDraft },
      kraRows
    );
    setCalcResult({
      incentiveAmount,
      commission,
      performance,
      totalRemuneration: getSafeNum(calcDraft.baseSalary) + incentiveAmount
    });
    toast.success(`Calculated for ${selected.name}`);
  };
  const handleEmployeeChange = (id) => {
    setSelectedId(Number(id));
    setCalcResult(null);
    setCalcOpen(false);
  };
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setCalcResult(null);
  };
  const updateKraWeight = (key, val) => {
    const w = Math.max(0, Math.min(100, getSafeNum(val)));
    setKraRows((prev) => prev.map((r) => r.key === key ? { ...r, weight: w } : r));
  };
  const updateDraft = (field, val) => {
    setCalcDraft((prev) => ({ ...prev, [field]: val === "" ? "" : getSafeNum(val) || val }));
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 page-shell min-w-0", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "p-2.5 sm:p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2.5 sm:gap-4 lg:flex-row lg:items-end lg:justify-between min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 sm:gap-3 flex-1 lg:max-w-lg min-w-0 w-full", children: [
          /* @__PURE__ */ jsx(
            SelectField,
            {
              label: "Employee",
              value: String(selectedId),
              onChange: handleEmployeeChange,
              options: employeeOptions,
              icon: Users,
              compact: isMobile
            }
          ),
          /* @__PURE__ */ jsx(
            SelectField,
            {
              label: "Month",
              value: selectedMonth,
              onChange: handleMonthChange,
              options: MONTH_OPTIONS,
              icon: Calendar,
              compact: isMobile
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-stretch gap-2 w-full lg:w-auto min-w-0", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `inline-flex items-center justify-center h-9 sm:h-10 px-2.5 sm:px-3 rounded-lg sm:rounded-xl border text-[9px] sm:text-[10px] font-bold uppercase tracking-wide shrink-0 ${STATUS_PILL_CLASS[incentiveStatusTone(selected.status)] || STATUS_PILL_CLASS.muted}`,
              children: selected.status
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: handleCalculateOpen,
              className: "flex-1 min-w-0 lg:flex-initial inline-flex items-center justify-center gap-1.5 h-9 sm:h-10 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-[11px] sm:text-xs font-bold shadow-sm transition whitespace-nowrap",
              children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" }),
                "Calculate"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-rose-50 min-w-0 shrink-0", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-[10px] sm:text-[11px] font-semibold text-slate-700 truncate", children: [
          selected.name,
          " · ",
          selected.role
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-slate-500 mt-0.5 truncate", children: [
          selected.team,
          " · ",
          monthLabel
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-5 gap-4 xl:items-stretch min-h-0", children: [
      /* @__PURE__ */ jsxs(GlassCard, { className: "p-4 xl:col-span-3 flex flex-col h-full min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-extrabold text-slate-800 uppercase tracking-wider", children: "Performance & Incentive" }),
            /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-slate-500 mt-0.5 truncate", children: [
              selected.name,
              " · ",
              monthLabel
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-rose-50 border border-rose-100 px-2.5 py-1.5 text-center shrink-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[8px] font-bold text-slate-400 uppercase", children: "Score" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm font-black text-rose-700 tabular-nums leading-none mt-0.5", children: [
              calcResult ? calcResult.performance : weightedPerformance,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 flex flex-col justify-evenly gap-2 min-h-0", children: insightRows.map((row) => /* @__PURE__ */ jsx(KraInsightRow, { row, onWeightChange: updateKraWeight }, row.key)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-3 border-t border-rose-50 flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-slate-400 uppercase", children: "KRA Weight" }),
              /* @__PURE__ */ jsxs("p", { className: `text-sm font-black tabular-nums ${totalKraWeight === 100 ? "text-emerald-600" : "text-rose-600"}`, children: [
                totalKraWeight,
                "%"
              ] })
            ] }),
            calcResult && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-slate-400 uppercase", children: "Incentive" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-rose-700 tabular-nums", children: formatCash(calcResult.incentiveAmount) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: handleCalculateOpen,
              className: "inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition shrink-0",
              children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-3.5 h-3.5" }),
                calcResult ? "Recalculate" : "Calculate"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(GlassCard, { className: "p-4 xl:col-span-2 flex flex-col h-full min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-extrabold text-slate-800 uppercase tracking-wider", children: "Service Metrics" }),
            /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-slate-500 mt-0.5 truncate", children: [
              selected.name,
              " · ",
              monthLabel
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-slate-50 border border-slate-100 px-2.5 py-1.5 text-center shrink-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[8px] font-bold text-slate-400 uppercase", children: "Avg" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm font-black text-slate-800 tabular-nums leading-none mt-0.5", children: [
              avgServiceScore,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 grid-rows-3 gap-2 flex-1 min-h-0 auto-rows-fr", children: serviceMetrics.map((m) => /* @__PURE__ */ jsx(MetricTile, { ...m }, m.label)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-3 border-t border-rose-50 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-[9px] text-slate-500 leading-snug", children: [
            "Tracking ",
            /* @__PURE__ */ jsxs("span", { className: "font-semibold text-slate-700", children: [
              serviceMetrics.length,
              " service KPIs"
            ] }),
            " for ",
            selected.name
          ] }),
          /* @__PURE__ */ jsx("span", { className: `text-[10px] font-bold shrink-0 ${avgServiceScore >= 80 ? "text-emerald-600" : "text-amber-600"}`, children: avgServiceScore >= 80 ? "On track" : "Needs focus" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4 lg:items-stretch min-h-0", children: [
      /* @__PURE__ */ jsxs(GlassCard, { className: "p-4 flex flex-col h-full min-h-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 mb-3 shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-extrabold text-slate-800 uppercase tracking-wider", children: "Lead Status" }),
            /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-slate-500 mt-0.5 truncate", children: [
              selected.name,
              " · ",
              monthLabel
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold text-slate-600 tabular-nums", children: [
              leadChartTotal,
              " total"
            ] }),
            /* @__PURE__ */ jsx(Kanban, { className: "w-4 h-4 text-rose-500/70" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 mb-3 shrink-0", children: LEAD_TABS.map((tab) => {
          const count = leadSnapshot.leadStatus[tab] ?? 0;
          const active = leadTab === tab;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setLeadTab(tab),
              className: `px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${active ? "bg-rose-700 text-white border-rose-700" : "bg-slate-100 text-slate-600 border-slate-200 hover:border-rose-300"}`,
              children: [
                tab,
                /* @__PURE__ */ jsxs("span", { className: `ml-1 ${active ? "text-rose-100" : "text-slate-400"}`, children: [
                  "(",
                  count,
                  ")"
                ] })
              ]
            },
            tab
          );
        }) }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-slate-200 bg-slate-50/50 p-2 flex flex-col shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mb-2 px-0.5 shrink-0", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-[9px] text-slate-400", children: [
              "Showing ",
              /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-600", children: filteredLeads.length }),
              " ",
              leadTab.toLowerCase(),
              " leads for ",
              selected.name
            ] }),
            /* @__PURE__ */ jsx(Badge, { tone: LEAD_STATUS_TONE[leadTab] || "muted", children: leadTab })
          ] }),
          filteredLeads.length === 0 ? /* @__PURE__ */ jsx("div", { className: "min-h-[120px] rounded-lg border border-dashed border-rose-200 bg-white/60 flex items-center justify-center px-3 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-slate-400", children: [
            "No ",
            leadTab.toLowerCase(),
            " leads for ",
            selected.name,
            " in ",
            monthLabel
          ] }) }) : /* @__PURE__ */ jsx(
            "div",
            {
              className: "overflow-y-auto overscroll-contain scrollbar-thin shrink-0",
              style: { height: LEAD_GRID_VIEWPORT_PX, maxHeight: LEAD_GRID_VIEWPORT_PX },
              children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-1.5 content-start", children: filteredLeads.map((lead) => /* @__PURE__ */ jsx(
                LeadStatusCard,
                {
                  lead,
                  onClick: () => setActiveLead(lead)
                },
                lead.id
              )) })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0 shrink-0", "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ jsxs(GlassCard, { className: "p-4 flex flex-col h-full min-h-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 mb-3 shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-extrabold text-slate-800 uppercase tracking-wider", children: "Competency Breakdown" }),
            /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-slate-500 mt-0.5 truncate", children: [
              "Skill radar · ",
              selected.name
            ] })
          ] }),
          /* @__PURE__ */ jsx(Award, { className: "w-4 h-4 text-amber-500/80 shrink-0" })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `flex flex-row gap-2 items-stretch min-w-0 shrink-0 ${isMobile ? "h-[210px]" : "flex-1 min-h-[180px]"}`,
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `rounded-xl border border-slate-200 bg-slate-50/50 p-1.5 flex-1 min-w-0 ${isMobile ? "h-[210px]" : "min-h-[190px] h-full"}`,
                  children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: isMobile ? 196 : "100%", children: /* @__PURE__ */ jsxs(
                    RadarChart,
                    {
                      cx: "50%",
                      cy: "52%",
                      outerRadius: isMobile ? "58%" : "68%",
                      data: radarData,
                      children: [
                        /* @__PURE__ */ jsx(PolarGrid, { stroke: "#cbd5e1" }),
                        /* @__PURE__ */ jsx(
                          PolarAngleAxis,
                          {
                            dataKey: "skill",
                            tick: { fontSize: isMobile ? 7 : 8, fill: "#64748b" }
                          }
                        ),
                        /* @__PURE__ */ jsx(Radar, { name: "Score", dataKey: "score", stroke: "#be123c", fill: "#be123c", fillOpacity: 0.22, strokeWidth: 2 }),
                        /* @__PURE__ */ jsx(
                          Tooltip,
                          {
                            contentStyle: { borderRadius: 10, border: "1px solid #fecdd3", fontSize: 11 },
                            formatter: (v) => [`${v}%`, "Score"]
                          }
                        )
                      ]
                    }
                  ) })
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `shrink-0 flex flex-col gap-1 min-w-0 ${isMobile ? "w-[118px] h-[210px]" : "sm:w-[156px] flex-1 sm:flex-none min-h-[190px]"}`,
                  children: radarData.map((d) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "flex-1 min-h-0 flex flex-col justify-center rounded-lg bg-slate-50 border border-slate-100 px-2 py-1",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-1.5 mb-1", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-[8px] text-slate-500 leading-tight line-clamp-2 flex-1 min-w-0", children: d.skill }),
                          /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-black text-rose-700 tabular-nums shrink-0", children: [
                            d.score,
                            "%"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "h-1 rounded-full bg-slate-200 overflow-hidden", children: /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "h-full rounded-full bg-gradient-to-r from-rose-500 to-rose-600",
                            style: { width: `${d.score}%` }
                          }
                        ) })
                      ]
                    },
                    d.skill
                  ))
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mt-2.5 grid grid-cols-2 gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-emerald-100 bg-emerald-50/40 p-2.5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[8px] font-bold text-emerald-700 uppercase tracking-wide", children: "Strongest" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold text-slate-800 mt-1 truncate", children: topCompetency?.skill }),
            /* @__PURE__ */ jsxs("p", { className: "text-base font-black text-emerald-700 tabular-nums leading-none mt-1", children: [
              topCompetency?.score,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-amber-100 bg-amber-50/40 p-2.5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[8px] font-bold text-amber-700 uppercase tracking-wide", children: "Needs Focus" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold text-slate-800 mt-1 truncate", children: weakestCompetency?.skill }),
            /* @__PURE__ */ jsxs("p", { className: "text-base font-black text-amber-700 tabular-nums leading-none mt-1", children: [
              weakestCompetency?.score,
              "%"
            ] })
          ] })
        ] }),
        focusSkills.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-2 rounded-lg border border-rose-100 bg-rose-50/30 p-2.5 shrink-0", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[8px] font-bold text-slate-500 uppercase tracking-wide mb-1.5", children: "Coaching priorities" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: focusSkills.map((d) => /* @__PURE__ */ jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-rose-100 text-[9px] font-semibold text-slate-700",
              children: [
                d.skill,
                /* @__PURE__ */ jsxs("span", { className: "text-rose-700 tabular-nums", children: [
                  d.score,
                  "%"
                ] })
              ]
            },
            d.skill
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-2.5 border-t border-rose-50 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-[9px] text-slate-500 leading-snug min-w-0", children: [
            "Avg score ",
            /* @__PURE__ */ jsxs("span", { className: "font-black text-rose-800 tabular-nums", children: [
              avgCompetency,
              "%"
            ] }),
            topCompetency && /* @__PURE__ */ jsxs(Fragment, { children: [
              " ",
              "· Strongest: ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-700", children: topCompetency.skill })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-emerald-700 shrink-0 tabular-nums", children: avgCompetency >= 80 ? "Above target" : "Needs coaching" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      LeadStatusDetailDrawer,
      {
        open: !!activeLead,
        onClose: () => setActiveLead(null),
        lead: activeLead,
        monthLabel
      }
    ),
    /* @__PURE__ */ jsx(
      Drawer,
      {
        open: calcOpen,
        onClose: () => setCalcOpen(false),
        title: `Incentive Calculator · ${selected.name}`,
        width: "drawer-panel sm:max-w-lg",
        children: calcDraft && /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-rose-50/60 border border-rose-100 p-3 text-xs text-slate-600", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-slate-800", children: selected.name }),
            /* @__PURE__ */ jsxs("p", { className: "mt-0.5", children: [
              selected.role,
              " · ",
              selected.team
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 text-slate-500", children: [
              monthLabel,
              " · Status: ",
              selected.status
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3", children: "Performance Inputs" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: [
              { field: "baseSalary", label: "Base Salary ($)" },
              { field: "callsCompleted", label: "Calls Completed" },
              { field: "callsTarget", label: "Calls Target" },
              { field: "qualifiedLeads", label: "Qualified Leads" },
              { field: "qualifiedTarget", label: "Qualified Target" },
              { field: "meetingsScheduled", label: "Meetings Scheduled" },
              { field: "meetingsTarget", label: "Meetings Target" },
              { field: "cashCollected", label: "Cash Collected ($)" },
              { field: "cashTarget", label: "Cash Target ($)" }
            ].map(({ field, label }) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1", children: label }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  value: calcDraft[field],
                  onChange: (e) => updateDraft(field, e.target.value),
                  className: "w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 text-xs font-bold outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                }
              )
            ] }, field)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3", children: "Incentive Settings" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: [
              { field: "incRate", label: "Incentive Rate (%)" },
              { field: "incBonus", label: "Bonus ($)" },
              { field: "penaltyDeduction", label: "Penalty ($)" }
            ].map(({ field, label }) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1", children: label }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  value: calcDraft[field],
                  onChange: (e) => updateDraft(field, e.target.value),
                  className: "w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 text-xs font-bold outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                }
              )
            ] }, field)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-slate-200 overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "px-3 py-2 bg-slate-100 text-[10px] font-bold text-slate-500 uppercase", children: "KRA Weights (from table)" }),
            kraRows.map((row) => {
              const { actual, target } = getInsightValues({ ...selected, ...calcDraft }, row.key);
              const earned = computeKraEarned(actual, target, row.weight);
              return /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-3 py-2 border-t border-slate-100 text-xs", children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: row.label }),
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsxs("span", { className: "font-bold text-rose-700", children: [
                    earned,
                    "%"
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "text-slate-400", children: [
                    " / ",
                    row.weight,
                    "%"
                  ] })
                ] })
              ] }, row.key);
            }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-3 py-2 border-t border-slate-200 bg-slate-50 text-xs font-bold", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: "Total Weight" }),
              /* @__PURE__ */ jsxs("span", { className: totalKraWeight === 100 ? "text-emerald-600" : "text-rose-600", children: [
                totalKraWeight,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: handleRunCalculation,
              className: "w-full py-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-sm font-bold shadow-md flex items-center justify-center gap-2 transition",
              children: [
                /* @__PURE__ */ jsx(Calculator, { className: "w-4 h-4" }),
                "Calculate Incentive"
              ]
            }
          ),
          calcResult && /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-200 bg-gradient-to-b from-rose-50/80 to-white p-4 space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-slate-500", children: [
                "Commission (",
                calcDraft.incRate,
                "%)"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "font-bold", children: formatCash(calcResult.commission) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Incentive Amount" }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-rose-700", children: formatCash(calcResult.incentiveAmount) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "KRA Performance" }),
              /* @__PURE__ */ jsxs("span", { className: "font-bold", children: [
                calcResult.performance,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-rose-100 pt-3 flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-slate-700", children: "Total Remuneration" }),
              /* @__PURE__ */ jsx("span", { className: "text-2xl font-black text-rose-700", children: formatCash(calcResult.totalRemuneration) })
            ] })
          ] })
        ] })
      }
    )
  ] });
}
export {
  Incentives as default
};
