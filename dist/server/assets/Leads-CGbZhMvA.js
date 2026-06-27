import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { u as useIsMobile } from "./use-mobile-BsFue-bT.js";
import { ArrowRightLeft, User, History, Phone, Mail, Calendar, Users, PhoneCall, Flame, Target, Shuffle, Zap, Search, Layers, Plus, GripVertical, ChevronUp, ChevronDown, CheckCircle2, X, Play, Pause } from "lucide-react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";
import { a as dummyLeads, d as dummyEmployees, c as createDemoAssignmentState, b as resolveDemoLeads, r as resolveDemoEmployees, A as AddLeadDrawer } from "./AddLeadDrawer-2QdzJ1Rt.js";
import { D as Drawer, B as Badge, a as StatCard, G as GlassCard, S as SectionHeader } from "./Primitives-CmGbnOU9.js";
import { V as readCachedJson, z as apiGet, J as getAdminCrmHeaders, W as unwrapApiData, B as apiLeadToAdmin, y as apiEmployeeToAdmin, C as apiPost, Q as invalidateCache, w as SEGMENT_WRAP, S as SEGMENT_BTN, u as SEGMENT_BTN_ACTIVE, v as SEGMENT_BTN_INACTIVE, P as PERIOD_PILL_BTN, t as PERIOD_PILL_INACTIVE } from "./_-BNdSRMjW.js";
import "react-router-dom";
import "@tanstack/react-query";
import "react-dom";
import "react-hot-toast";
const STORAGE_KEY = "crm_lead_assignment_v1";
const defaultState = () => ({
  assignments: {},
  employeeSettings: {},
  distribution: {
    mode: "round-robin",
    roundRobinOrder: [],
    rrIndex: 0,
    autoAssign: true
  },
  auditLog: [],
  todayKey: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  todayStats: { total: 0, byEmployee: {} }
});
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    if (parsed.todayKey !== today) {
      parsed.todayKey = today;
      parsed.todayStats = { total: 0, byEmployee: {} };
    }
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
}
function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
  }
}
function getAssignmentState() {
  return loadState();
}
function persistAssignmentState(state) {
  saveState(state);
}
function normalizeSource(raw = "") {
  const s = String(raw || "").toLowerCase().trim();
  if (!s) return "api";
  if (s.includes("facebook") || s.includes("instagram") || s.includes("meta")) return "meta_ads";
  if (s.includes("google")) return "google_ads";
  if (s.includes("whatsapp") || s.includes("wa ")) return "whatsapp";
  if (s.includes("website") || s.includes("organic") || s.includes("web")) return "website";
  if (s.includes("manual") || s.includes("referral")) return "manual";
  if (s.includes("n8n") || s.includes("webhook") || s.includes("zapier")) return "n8n";
  if (s.includes("api")) return "api";
  return s.replace(/\s+/g, "_");
}
function isConverted(lead) {
  const stage = String(lead.pipeline_stage || lead.status || "").toLowerCase();
  return stage.includes("won") || stage.includes("convert") || stage.includes("closed won");
}
function isActiveLead(lead) {
  return !isConverted(lead) && String(lead.status || "").toLowerCase() !== "closed lost";
}
function getLeadId(lead) {
  return lead.id ?? lead.lead_id ?? lead._id;
}
function appendAudit(state, entry) {
  const log = [
    { id: Date.now(), at: (/* @__PURE__ */ new Date()).toISOString(), ...entry },
    ...state.auditLog
  ].slice(0, 200);
  return { ...state, auditLog: log };
}
function recordTodayAssignment(state, employeeId) {
  const key = String(employeeId);
  return {
    ...state,
    todayStats: {
      total: (state.todayStats?.total || 0) + 1,
      byEmployee: {
        ...state.todayStats?.byEmployee || {},
        [key]: (state.todayStats?.byEmployee?.[key] || 0) + 1
      }
    }
  };
}
function assignLead(state, lead, employee, method = "manual") {
  const leadId = String(getLeadId(lead));
  const empId = String(employee.id);
  let next = {
    ...state,
    assignments: {
      ...state.assignments,
      [leadId]: {
        employeeId: empId,
        employeeName: employee.name,
        assignedAt: (/* @__PURE__ */ new Date()).toISOString(),
        method
      }
    }
  };
  next = recordTodayAssignment(next, empId);
  next = appendAudit(next, {
    action: method === "reassign" ? "reassigned" : "assigned",
    leadId,
    leadName: lead.lead_name || lead.company_name || "Lead",
    employeeId: empId,
    employeeName: employee.name,
    method
  });
  saveState(next);
  return next;
}
function bulkAssign(state, leads, employee, method = "bulk") {
  let next = state;
  for (const lead of leads) {
    next = assignLead(next, lead, employee, method);
  }
  return next;
}
function toggleEmployeeReceiving(state, employeeId) {
  const key = String(employeeId);
  const cur = state.employeeSettings[key] || { receivingPaused: false, maxCapacity: 15, skills: [] };
  const next = {
    ...state,
    employeeSettings: {
      ...state.employeeSettings,
      [key]: { ...cur, receivingPaused: !cur.receivingPaused }
    }
  };
  saveState(next);
  return next;
}
function setDistributionMode(state, mode) {
  const next = { ...state, distribution: { ...state.distribution, mode } };
  saveState(next);
  return next;
}
function setAutoAssign(state, autoAssign) {
  const next = { ...state, distribution: { ...state.distribution, autoAssign } };
  saveState(next);
  return next;
}
function initRoundRobinOrder(state, employees) {
  const active = employees.filter(
    (e) => e.status !== "inactive" && e.status !== "on_leave"
  );
  const order = active.map((e) => e.id);
  const next = {
    ...state,
    distribution: { ...state.distribution, roundRobinOrder: order, rrIndex: 0 }
  };
  saveState(next);
  return next;
}
function employeeCapacity(emp, settings, workload) {
  const s = settings[String(emp.id)] || {};
  return s.maxCapacity ?? 15;
}
function employeeUtilization(emp, settings, workload) {
  const cap = employeeCapacity(emp, settings);
  const assigned = workload[emp.id]?.active ?? 0;
  return cap > 0 ? Math.round(assigned / cap * 100) : 0;
}
function isAvailable(emp, settings, workload) {
  const s = settings[String(emp.id)] || {};
  if (s.receivingPaused || emp.status === "inactive" || emp.status === "on_leave") return false;
  const util = employeeUtilization(emp, settings, workload);
  return util < 100;
}
function skillMatch(lead, emp) {
  const dept = String(emp.department || "").toLowerCase();
  const source = normalizeSource(lead.source || lead.form_name);
  const map = {
    meta_ads: ["sales", "marketing"],
    google_ads: ["sales", "marketing"],
    website: ["sales", "support"],
    whatsapp: ["sales", "support"],
    manual: ["sales"],
    api: ["sales"],
    n8n: ["sales", "marketing"]
  };
  const allowed = map[source] || ["sales"];
  return !dept || allowed.some((d) => dept.includes(d));
}
function computeWorkload(employees, assignments, leads) {
  const byEmp = {};
  for (const emp of employees) {
    byEmp[emp.id] = { assigned: 0, active: 0, converted: 0, followUps: 0 };
  }
  for (const lead of leads) {
    const lid = String(getLeadId(lead));
    const a = assignments[lid];
    if (!a) continue;
    const eid = Number(a.employeeId) || a.employeeId;
    if (!byEmp[eid]) byEmp[eid] = { assigned: 0, active: 0, converted: 0, followUps: 0 };
    byEmp[eid].assigned += 1;
    if (isConverted(lead)) byEmp[eid].converted += 1;
    else if (isActiveLead(lead)) byEmp[eid].active += 1;
    if (lead.next_followup_date) byEmp[eid].followUps += 1;
  }
  return byEmp;
}
function workloadStatus(utilPct) {
  if (utilPct >= 90) return { label: "Fully Occupied", color: "#dc2626", bg: "#fef2f2", dot: "#ef4444" };
  if (utilPct >= 55) return { label: "Moderate Load", color: "#d97706", bg: "#fffbeb", dot: "#f59e0b" };
  return { label: "Available", color: "#16a34a", bg: "#f0fdf4", dot: "#22c55e" };
}
function pickNextEmployee(state, employees, lead, workload) {
  const { mode } = state.distribution;
  const settings = state.employeeSettings;
  let pool = employees.filter((e) => isAvailable(e, settings, workload));
  if (mode === "skill") {
    pool = pool.filter((e) => skillMatch(lead, e));
  }
  if (!pool.length) return null;
  if (mode === "workload") {
    pool.sort(
      (a, b) => employeeUtilization(a, settings, workload) - employeeUtilization(b, settings, workload)
    );
    return pool[0];
  }
  if (mode === "skill") {
    const dept = String(lead.source || "").toLowerCase();
    const skilled = pool.filter((e) => {
      const d = String(e.department || e.role || "").toLowerCase();
      return !dept || d.includes("sales") || d.includes(dept.split(" ")[0]);
    });
    if (skilled.length) pool = skilled;
    pool.sort(
      (a, b) => employeeUtilization(a, settings, workload) - employeeUtilization(b, settings, workload)
    );
    return pool[0];
  }
  const order = state.distribution.roundRobinOrder?.length ? state.distribution.roundRobinOrder : employees.map((e) => e.id);
  const idx = state.distribution.rrIndex || 0;
  for (let i = 0; i < order.length; i += 1) {
    const empId = order[(idx + i) % order.length];
    const emp = pool.find((e) => String(e.id) === String(empId));
    if (emp) {
      return { employee: emp, nextIndex: (idx + i + 1) % order.length };
    }
  }
  return pool[0] ? { employee: pool[0], nextIndex: idx } : null;
}
function distributeUnassigned(state, employees, leads, options = {}) {
  const {
    includeManual = false,
    allLeads,
    forceAssign = false
  } = options;
  let next = state;
  if (!next.distribution.roundRobinOrder?.length && employees.length) {
    next = initRoundRobinOrder(next, employees);
  }
  const workloadLeads = allLeads || leads;
  let workload = computeWorkload(employees, next.assignments, workloadLeads);
  let assignedCount = 0;
  for (const lead of leads) {
    const lid = String(getLeadId(lead));
    if (!lid || lid === "undefined") continue;
    if (isConverted(lead)) continue;
    const alreadyAssigned = Boolean(next.assignments[lid]);
    if (alreadyAssigned && !forceAssign) continue;
    const src = normalizeSource(lead.source || lead.form_name);
    if (!includeManual && !forceAssign && src === "manual") continue;
    const pick = pickNextEmployee(next, employees, lead, workload);
    if (!pick) continue;
    const emp = pick.employee || pick;
    const method = alreadyAssigned ? "reassign" : `auto-${next.distribution.mode}`;
    next = assignLead(next, lead, emp, method);
    assignedCount += 1;
    if (pick.nextIndex != null) {
      next = {
        ...next,
        distribution: { ...next.distribution, rrIndex: pick.nextIndex }
      };
    }
    workload = computeWorkload(employees, next.assignments, workloadLeads);
  }
  saveState(next);
  return { state: next, assignedCount };
}
function autoAssignUnassigned(state, employees, leads) {
  if (!state.distribution.autoAssign) return state;
  return distributeUnassigned(state, employees, leads, {
    includeManual: false,
    allLeads: leads
  }).state;
}
function runDistributionNow(state, employees, allLeads, selectedLeads = null) {
  const targets = selectedLeads?.length ? selectedLeads : allLeads;
  return distributeUnassigned(state, employees, targets, {
    includeManual: true,
    allLeads,
    forceAssign: Boolean(selectedLeads?.length)
  });
}
function getAssignmentForLead(state, lead) {
  const local = state.assignments[String(getLeadId(lead))];
  if (local) return local;
  const assigned = lead.assignedTo;
  if (assigned && typeof assigned === "object" && assigned.name) {
    return {
      employeeId: String(assigned.id),
      employeeName: assigned.name,
      assignedAt: lead.assigned_at || lead.assignedAt,
      method: lead.assignment_method || lead.assignmentMethod || "api"
    };
  }
  return null;
}
const SOURCE_LABELS$1 = {
  meta_ads: { label: "Meta Ads", tone: "info" },
  google_ads: { label: "Google Ads", tone: "warning" },
  website: { label: "Website", tone: "success" },
  whatsapp: { label: "WhatsApp", tone: "success" },
  manual: { label: "Manual", tone: "muted" },
  api: { label: "API", tone: "primary" },
  n8n: { label: "N8N", tone: "info" }
};
function SourceBadge$1({ lead }) {
  const key = normalizeSource(lead.source || lead.form_name);
  const cfg = SOURCE_LABELS$1[key] || { label: lead.source || "Unknown", tone: "muted" };
  return /* @__PURE__ */ jsx(Badge, { tone: cfg.tone, children: cfg.label });
}
function LeadDetailDrawer({
  open,
  onClose,
  lead,
  assignment,
  employees,
  onAssign,
  auditEntries = []
}) {
  if (!lead) return null;
  const field = (label, value, icon) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 py-2.5 border-b border-rose-50 last:border-0", children: [
    icon && /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-rose-50 text-rose-600 grid place-items-center shrink-0", children: icon }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-400", children: label }),
      /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-800 mt-0.5 break-words", children: value || "—" })
    ] })
  ] });
  return /* @__PURE__ */ jsx(Drawer, { open, onClose, title: "Lead Details", children: /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-rose-100 bg-gradient-to-br from-white to-rose-50/30 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900", children: lead.lead_name || "Unnamed Lead" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-0.5", children: lead.company_name || "No company" })
        ] }),
        /* @__PURE__ */ jsx(SourceBadge$1, { lead })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mt-3", children: [
        /* @__PURE__ */ jsx(Badge, { tone: assignment ? "success" : "warning", children: assignment ? `Assigned · ${assignment.employeeName}` : "Unassigned" }),
        lead.pipeline_stage && /* @__PURE__ */ jsx(Badge, { tone: "info", children: lead.pipeline_stage }),
        lead.temperature && /* @__PURE__ */ jsx(Badge, { tone: "primary", children: lead.temperature })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-rose-100 bg-white p-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-rose-700 mb-2", children: "Contact & Pipeline" }),
      field("Phone", lead.phone || lead.phone_number, /* @__PURE__ */ jsx(Phone, { size: 14 })),
      field("Email", lead.email, /* @__PURE__ */ jsx(Mail, { size: 14 })),
      field("City", lead.city, null),
      field("Follow-up", lead.next_followup_date, /* @__PURE__ */ jsx(Calendar, { size: 14 })),
      field("Expected Revenue", lead.expected_revenue ? `₹${Number(lead.expected_revenue).toLocaleString("en-IN")}` : "—", null),
      field("Service / Requirements", lead.requirements || "—", null)
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-rose-100 bg-white p-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-rose-700 mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(ArrowRightLeft, { size: 14 }),
        " Quick Assign"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto", children: employees.map((emp) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onAssign(lead, emp),
          className: "text-left px-3 py-2 rounded-xl border border-rose-100 hover:border-rose-300 hover:bg-rose-50 transition text-sm font-semibold text-slate-700",
          children: [
            /* @__PURE__ */ jsx(User, { size: 12, className: "inline mr-1 text-rose-500" }),
            emp.name
          ]
        },
        emp.id
      )) })
    ] }),
    auditEntries.length > 0 && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-rose-100 bg-white p-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-rose-700 mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(History, { size: 14 }),
        " Assignment History"
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-2 max-h-36 overflow-y-auto", children: auditEntries.map((e) => /* @__PURE__ */ jsxs("li", { className: "text-[11px] text-slate-600 border-l-2 border-rose-200 pl-3", children: [
        /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-800 capitalize", children: e.action }),
        " · ",
        e.employeeName || "—",
        /* @__PURE__ */ jsxs("span", { className: "block text-slate-400 mt-0.5", children: [
          new Date(e.at).toLocaleString(),
          " · ",
          e.method
        ] })
      ] }, e.id)) })
    ] })
  ] }) });
}
const SOURCE_LABELS = {
  meta_ads: { label: "Meta Ads", tone: "info", color: "#2563eb" },
  google_ads: { label: "Google Ads", tone: "warning", color: "#d97706" },
  website: { label: "Website", tone: "success", color: "#16a34a" },
  whatsapp: { label: "WhatsApp", tone: "success", color: "#059669" },
  manual: { label: "Manual", tone: "muted", color: "#64748b" },
  api: { label: "API", tone: "primary", color: "#be123c" },
  n8n: { label: "N8N", tone: "info", color: "#7c3aed" }
};
const CHART_COLORS = ["#f43f5e", "#fb7185", "#fda4af", "#be123c", "#9f1239", "#881337"];
const cardBase = {
  background: "#fff",
  border: "1px solid #fecdd3",
  borderRadius: 16,
  boxShadow: "0 2px 8px rgba(0,0,0,.04)"
};
const VISIBLE_EMPLOYEE_COUNT = 2;
const EMPLOYEE_CARD_HEIGHT_PX = 190;
const EMPLOYEE_LIST_VIEWPORT_PX = VISIBLE_EMPLOYEE_COUNT * EMPLOYEE_CARD_HEIGHT_PX + (VISIBLE_EMPLOYEE_COUNT - 1) * 10;
function SourceBadge({ lead, compact = false }) {
  const key = normalizeSource(lead.source || lead.form_name);
  const cfg = SOURCE_LABELS[key] || { label: lead.source || "Other", tone: "muted" };
  return /* @__PURE__ */ jsx(Badge, { tone: cfg.tone, children: /* @__PURE__ */ jsx("span", { className: compact ? "text-[9px] normal-case tracking-normal" : void 0, children: cfg.label }) });
}
function EmployeeCard({ emp, stats, utilPct, status, paused, onTogglePause, onDrop, dragOver }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onDragOver: (e) => {
        e.preventDefault();
        onDrop?.(true);
      },
      onDragLeave: () => onDrop?.(false),
      onDrop: (e) => {
        e.preventDefault();
        onDrop?.(false, emp);
      },
      className: `rounded-xl border p-3 transition-all shrink-0 ${dragOver ? "border-rose-500 bg-rose-50 shadow-md scale-[1.01]" : "border-rose-100 bg-white hover:border-rose-300"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg gradient-primary grid place-items-center text-[10px] font-bold text-white shrink-0", children: (emp.name || "?").slice(0, 2).toUpperCase() }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-900 truncate", children: emp.name }),
              /* @__PURE__ */ jsx("p", { className: "text-[9px] text-slate-500 truncate", children: emp.role || emp.department || "Sales" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => onTogglePause(emp.id),
              title: paused ? "Resume receiving" : "Pause receiving",
              className: `w-7 h-7 rounded-md grid place-items-center shrink-0 transition ${paused ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`,
              children: paused ? /* @__PURE__ */ jsx(Play, { size: 12 }) : /* @__PURE__ */ jsx(Pause, { size: 12 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
          /* @__PURE__ */ jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-md",
              style: { background: status.bg, color: status.color },
              children: [
                /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full", style: { background: status.dot } }),
                status.label
              ]
            }
          ),
          paused && /* @__PURE__ */ jsx(Badge, { tone: "warning", children: /* @__PURE__ */ jsx("span", { className: "text-[9px]", children: "Paused" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-1.5 text-center mb-2", children: [
          ["Assigned", stats.assigned],
          ["Active", stats.active],
          ["Converted", stats.converted],
          ["Follow-ups", stats.followUps]
        ].map(([l, v]) => /* @__PURE__ */ jsxs("div", { className: "rounded-md bg-rose-50/50 py-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[8px] font-bold text-slate-400 uppercase", children: l }),
          /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-slate-800", children: v })
        ] }, l)) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[9px] font-bold mb-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Capacity" }),
            /* @__PURE__ */ jsxs("span", { style: { color: status.color }, children: [
              utilPct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-1.5 rounded-full bg-rose-50 overflow-hidden", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-full rounded-full transition-all duration-500",
              style: {
                width: `${Math.min(utilPct, 100)}%`,
                background: status.dot
              }
            }
          ) })
        ] })
      ]
    }
  );
}
function Leads() {
  const isMobile = useIsMobile();
  const [leads, setLeads] = useState(() => {
    const cached = readCachedJson("/api/sales/leads");
    if (cached?.success && cached.leads?.length) return cached.leads;
    return dummyLeads;
  });
  const [employees, setEmployees] = useState(dummyEmployees);
  const [assignState, setAssignState] = useState(() => {
    const existing = getAssignmentState();
    if (Object.keys(existing.assignments || {}).length > 0) return existing;
    return createDemoAssignmentState(existing, dummyEmployees, dummyLeads);
  });
  const [loading, setLoading] = useState(() => {
    const cached = readCachedJson("/api/sales/leads");
    return !(cached?.success && cached.leads?.length);
  });
  const [addOpen, setAddOpen] = useState(false);
  const [detailLead, setDetailLead] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [assignFilter, setAssignFilter] = useState("All");
  const [selected, setSelected] = useState(/* @__PURE__ */ new Set());
  const [dragLeadId, setDragLeadId] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [sortKey, setSortKey] = useState("created_at");
  const [sortDir] = useState("desc");
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3e3);
  };
  useEffect(() => {
    const id = window.setTimeout(() => setSearch(searchInput), 250);
    return () => window.clearTimeout(id);
  }, [searchInput]);
  useEffect(() => {
    Promise.all([
      apiGet("/api/v1/leads?limit=200", { headers: getAdminCrmHeaders(), skipCache: true, cacheTtl: 0 }).then((res) => {
        const items = unwrapApiData(res);
        if (items.length) return { success: true, leads: items.map(apiLeadToAdmin), fromV1: true };
        throw new Error("empty");
      }).catch(() => apiGet("/api/sales/leads").catch(() => ({ success: false, leads: [] }))),
      apiGet("/api/v1/employees", { headers: getAdminCrmHeaders(), skipCache: true, cacheTtl: 0 }).then((res) => {
        const items = unwrapApiData(res);
        if (items.length) return { success: true, employees: items.map(apiEmployeeToAdmin) };
        throw new Error("empty");
      }).catch(() => apiGet("/api/team/employees").catch(() => ({ success: false, employees: [] })))
    ]).then(([leadData, empData]) => {
      const leadList = resolveDemoLeads(leadData.success ? leadData.leads : []);
      const empList = resolveDemoEmployees(empData.success ? empData.employees : []);
      const isDemo = !leadData.success || !leadData.leads?.length;
      setLeads(leadList);
      setEmployees(empList);
      setAssignState((prev) => {
        const hasAssignments = Object.keys(prev.assignments || {}).length > 0;
        let s = prev.distribution?.roundRobinOrder?.length ? prev : initRoundRobinOrder(prev, empList);
        if (isDemo && !hasAssignments) {
          s = createDemoAssignmentState(s, empList, leadList);
          persistAssignmentState(s);
        } else if (!isDemo && !leadData.fromV1) {
          s = autoAssignUnassigned(s, empList, leadList);
        }
        return s;
      });
    }).catch(() => {
      setLeads(dummyLeads);
      setEmployees(dummyEmployees);
      setAssignState((prev) => {
        const s = createDemoAssignmentState(prev, dummyEmployees, dummyLeads);
        persistAssignmentState(s);
        return s;
      });
    }).finally(() => setLoading(false));
  }, []);
  const workload = useMemo(
    () => computeWorkload(employees, assignState.assignments, leads),
    [employees, assignState.assignments, leads]
  );
  const enrichedLeads = useMemo(
    () => leads.map((l) => ({
      ...l,
      _assignment: getAssignmentForLead(assignState, l),
      _sourceKey: normalizeSource(l.source || l.form_name)
    })),
    [leads, assignState]
  );
  const metrics = useMemo(() => {
    const total = leads.length;
    const pickup = enrichedLeads.filter((l) => !l._assignment && !isConverted(l)).length;
    const hotLeads = leads.filter(
      (l) => String(l.temperature || "").toLowerCase().includes("hot")
    ).length;
    const converted = leads.filter(isConverted).length;
    return { total, pickup, hotLeads, converted };
  }, [leads, enrichedLeads]);
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return enrichedLeads.filter((l) => {
      if (sourceFilter !== "All" && l._sourceKey !== sourceFilter) return false;
      if (assignFilter === "Assigned" && !l._assignment) return false;
      if (assignFilter === "Unassigned" && l._assignment) return false;
      if (!q) return true;
      return [l.lead_name, l.company_name, l.email, l.phone, l.phone_number].some((f) => String(f || "").toLowerCase().includes(q));
    }).sort((a, b) => {
      const va = a[sortKey] ?? "";
      const vb = b[sortKey] ?? "";
      return sortDir === "asc" ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });
  }, [enrichedLeads, search, sourceFilter, assignFilter, sortKey, sortDir]);
  const handleAssign = useCallback(
    async (lead, employee, method = "manual") => {
      const next = assignLead(assignState, lead, employee, method);
      setAssignState(next);
      try {
        await apiPost("/api/v1/assignment/assign", {
          leadId: getLeadId(lead),
          employeeId: employee.id,
          method: method === "drag-drop" ? "manual" : method
        }, { headers: getAdminCrmHeaders() });
        invalidateCache("/api/v1");
        setLeads((prev) => prev.map((l) => String(getLeadId(l)) === String(getLeadId(lead)) ? { ...l, assignedTo: { id: employee.id, name: employee.name } } : l));
      } catch {
      }
      showToast(`Assigned to ${employee.name}`);
    },
    [assignState]
  );
  const handleBulkAssign = (employee) => {
    const toAssign = filtered.filter((l) => selected.has(String(getLeadId(l))));
    if (!toAssign.length) return showToast("Select leads first", "error");
    const next = bulkAssign(assignState, toAssign, employee, "bulk");
    setAssignState(next);
    setSelected(/* @__PURE__ */ new Set());
    setBulkOpen(false);
    showToast(`${toAssign.length} leads assigned to ${employee.name}`);
  };
  const handleDropOnEmployee = (cardEmp, dragOverOnly, droppedEmployee) => {
    if (dragOverOnly === true) {
      setDropTarget(cardEmp?.id);
      return;
    }
    setDropTarget(null);
    if (!droppedEmployee || !dragLeadId) return;
    const lead = leads.find((l) => String(getLeadId(l)) === dragLeadId);
    const target = employees.find((e) => e.id === droppedEmployee.id);
    if (lead && target) handleAssign(lead, target, "drag-drop");
    setDragLeadId(null);
  };
  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleSelectAll = () => {
    if (selected.size === filtered.length) setSelected(/* @__PURE__ */ new Set());
    else setSelected(new Set(filtered.map((l) => String(getLeadId(l)))));
  };
  const sourcePerformance = useMemo(() => {
    const map = {};
    for (const l of enrichedLeads) {
      const k = l._sourceKey;
      if (!map[k]) map[k] = { source: SOURCE_LABELS[k]?.label || k, leads: 0, converted: 0 };
      map[k].leads += 1;
      if (isConverted(l)) map[k].converted += 1;
    }
    return Object.values(map);
  }, [enrichedLeads]);
  const employeeChartData = useMemo(
    () => employees.map((e) => ({
      name: (e.name || "").split(" ")[0],
      assigned: workload[e.id]?.assigned ?? 0,
      converted: workload[e.id]?.converted ?? 0
    })),
    [employees, workload]
  );
  const distributionPie = useMemo(() => {
    const assigned = metrics.assigned;
    const unassigned = metrics.unassigned;
    return [
      { name: "Assigned", value: assigned },
      { name: "Unassigned", value: unassigned }
    ].filter((d) => d.value > 0);
  }, [metrics]);
  const unassignedTrend = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i -= 1) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const count = enrichedLeads.filter((l) => {
        if (l._assignment) return false;
        const created = (l.created_at || "").slice(0, 10);
        return created <= key;
      }).length;
      days.push({ day: d.toLocaleDateString("en-IN", { weekday: "short" }), unassigned: count });
    }
    return days;
  }, [enrichedLeads]);
  const rrOrder = useMemo(() => {
    const order = assignState.distribution.roundRobinOrder?.length ? assignState.distribution.roundRobinOrder : employees.map((e) => e.id);
    return order.map((id, i) => {
      const emp = employees.find((e) => String(e.id) === String(id));
      if (!emp) return null;
      const s = assignState.employeeSettings[String(id)] || {};
      return {
        order: i + 1,
        name: emp.name,
        paused: s.receivingPaused,
        today: assignState.todayStats?.byEmployee?.[String(id)] || 0
      };
    }).filter(Boolean);
  }, [assignState, employees]);
  const leadAudit = (lead) => {
    if (!lead) return [];
    const lid = String(getLeadId(lead));
    return assignState.auditLog.filter((e) => e.leadId === lid);
  };
  const handleAddClose = (newLead) => {
    if (newLead && typeof newLead === "object") {
      const withSource = { ...newLead, source: newLead.source || "Manual" };
      setLeads((prev) => [withSource, ...prev]);
    }
    setAddOpen(false);
  };
  const modeLabels = {
    "round-robin": "Round Robin",
    workload: "Workload-based",
    skill: "Skill-based"
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 pb-6 page-shell min-w-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Total Leads", value: metrics.total, icon: Users, tone: "primary", change: `${metrics.total} in pipeline`, sub: "" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Pickup", value: metrics.pickup, icon: PhoneCall, tone: "info", change: metrics.pickup ? "Awaiting assignment" : "Queue clear", sub: "" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Hot Leads", value: metrics.hotLeads, icon: Flame, tone: "warning", change: metrics.hotLeads ? "High intent" : "None hot right now", sub: "" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Converted", value: metrics.converted, icon: Target, tone: "success", change: "Closed won", sub: "" })
    ] }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "p-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-3 sm:px-4 py-2.5 sm:py-3 border-b border-rose-100 flex flex-col md:flex-row md:items-center md:justify-between gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0 shrink-0", children: [
          /* @__PURE__ */ jsx(Shuffle, { className: "w-4 h-4 text-rose-600 shrink-0" }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm font-bold text-slate-900 truncate", children: "Round Robin Distribution" }),
            /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-slate-500 truncate", children: [
              modeLabels[assignState.distribution.mode],
              " · ",
              assignState.distribution.autoAssign ? "Auto ON" : "Auto OFF"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap md:flex-nowrap items-center gap-1.5 w-full md:w-auto md:justify-end", children: [
          /* @__PURE__ */ jsx("div", { className: `${SEGMENT_WRAP} w-full md:w-auto`, children: ["round-robin", "workload", "skill"].map((m) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setAssignState(setDistributionMode(assignState, m)),
              className: `${SEGMENT_BTN} ${assignState.distribution.mode === m ? SEGMENT_BTN_ACTIVE : SEGMENT_BTN_INACTIVE}`,
              children: modeLabels[m]
            },
            m
          )) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setAssignState(setAutoAssign(assignState, !assignState.distribution.autoAssign)),
              className: `${PERIOD_PILL_BTN} ${PERIOD_PILL_INACTIVE}`,
              children: assignState.distribution.autoAssign ? "Disable Auto" : "Enable Auto"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                if (selected.size === 0) {
                  showToast("Select leads in the queue, choose a mode, then Run Now", "error");
                  return;
                }
                const selectedLeads = leads.filter(
                  (l) => selected.has(String(getLeadId(l)))
                );
                setAssignState((prev) => {
                  const { state: next, assignedCount } = runDistributionNow(
                    prev,
                    employees,
                    leads,
                    selectedLeads
                  );
                  if (assignedCount === 0) {
                    showToast(
                      "Could not assign — reps may be paused, on leave, or at capacity",
                      "error"
                    );
                  } else {
                    showToast(
                      `${assignedCount} selected lead${assignedCount === 1 ? "" : "s"} assigned via ${modeLabels[prev.distribution.mode]}`
                    );
                    setSelected(/* @__PURE__ */ new Set());
                  }
                  return next;
                });
              },
              className: `${PERIOD_PILL_BTN} bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 flex items-center gap-1`,
              children: [
                /* @__PURE__ */ jsx(Zap, { size: 11 }),
                " Run Now",
                selected.size > 0 && /* @__PURE__ */ jsx("span", { className: "ml-0.5 px-1 py-0 rounded bg-emerald-600 text-white text-[9px]", children: selected.size })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4 md:hidden", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5", children: "Allocation Order" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1", children: rrOrder.map((r) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: `flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg border ${r.paused ? "bg-amber-50/80 border-amber-200" : "bg-white border-rose-100"}`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-full bg-rose-100 text-rose-700 grid place-items-center text-[9px] font-black shrink-0", children: r.order }),
                /* @__PURE__ */ jsx("span", { className: `text-[11px] font-semibold truncate ${r.paused ? "text-amber-800" : "text-slate-700"}`, children: r.name })
              ] }),
              r.today > 0 && /* @__PURE__ */ jsx(Badge, { tone: "success", children: /* @__PURE__ */ jsxs("span", { className: "text-[9px]", children: [
                r.today,
                " today"
              ] }) })
            ]
          },
          r.order
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 mt-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-rose-50/80 px-2 py-2 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-slate-500 uppercase", children: "Assigned Today" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-rose-700 leading-tight", children: assignState.todayStats?.total || 0 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-emerald-50/80 px-2 py-2 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-slate-500 uppercase", children: "Active Reps" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-emerald-700 leading-tight", children: employees.filter((e) => {
              const s = assignState.employeeSettings[String(e.id)] || {};
              return !s.receivingPaused && e.status !== "inactive";
            }).length })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:block p-3 sm:p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-3 flex-wrap xl:flex-nowrap", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[280px]", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5", children: "Allocation Order" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: rrOrder.map((r) => /* @__PURE__ */ jsxs(
            "span",
            {
              className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border whitespace-nowrap ${r.paused ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-white border-rose-100 text-slate-700"}`,
              children: [
                /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-md bg-rose-100 text-rose-700 grid place-items-center text-[9px] shrink-0", children: r.order }),
                r.name,
                r.today > 0 && /* @__PURE__ */ jsx(Badge, { tone: "success", children: /* @__PURE__ */ jsxs("span", { className: "text-[9px]", children: [
                  r.today,
                  " today"
                ] }) })
              ]
            },
            r.order
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 shrink-0 ml-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-rose-50/80 px-3 py-2 text-center min-w-[96px]", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-slate-500 uppercase whitespace-nowrap", children: "Assigned Today" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl font-black text-rose-700 leading-tight", children: assignState.todayStats?.total || 0 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-emerald-50/80 px-3 py-2 text-center min-w-[96px]", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-slate-500 uppercase whitespace-nowrap", children: "Active Reps" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl font-black text-emerald-700 leading-tight", children: employees.filter((e) => {
              const s = assignState.employeeSettings[String(e.id)] || {};
              return !s.receivingPaused && e.status !== "inactive";
            }).length })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 items-stretch min-w-0", children: [
      /* @__PURE__ */ jsx("div", { className: "xl:col-span-2 flex flex-col min-h-0 min-w-0", children: /* @__PURE__ */ jsxs("div", { style: cardBase, className: "overflow-hidden flex flex-col flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx("div", { className: "px-3 sm:px-4 py-2.5 border-b border-rose-50", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-2 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:flex-1 sm:min-w-[180px] sm:max-w-[240px]", children: [
              /* @__PURE__ */ jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-rose-300 pointer-events-none" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  value: searchInput,
                  onChange: (e) => setSearchInput(e.target.value),
                  placeholder: "Search leads…",
                  className: "w-full h-8 pl-8 pr-2.5 rounded-lg border border-rose-100 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-rose-400 bg-white"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-1.5 sm:contents", children: [
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: sourceFilter,
                  onChange: (e) => setSourceFilter(e.target.value),
                  className: "w-full sm:w-auto sm:min-w-[112px] h-8 px-2 rounded-lg border border-rose-100 text-[10px] sm:text-[11px] font-bold text-rose-800 bg-white outline-none focus:border-rose-400",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "All", children: "All Sources" }),
                    Object.entries(SOURCE_LABELS).map(([k, v]) => /* @__PURE__ */ jsx("option", { value: k, children: v.label }, k))
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: assignFilter,
                  onChange: (e) => setAssignFilter(e.target.value),
                  className: "w-full sm:w-auto sm:min-w-[104px] h-8 px-2 rounded-lg border border-rose-100 text-[10px] sm:text-[11px] font-bold text-rose-800 bg-white outline-none focus:border-rose-400",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "All", children: "All Status" }),
                    /* @__PURE__ */ jsx("option", { value: "Unassigned", children: "Unassigned" }),
                    /* @__PURE__ */ jsx("option", { value: "Assigned", children: "Assigned" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 shrink-0 w-full sm:w-auto", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setHistoryOpen(true),
                className: "flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 h-8 px-2.5 rounded-lg border border-rose-200 text-rose-700 text-[10px] sm:text-[11px] font-bold hover:bg-rose-50 transition whitespace-nowrap",
                children: [
                  /* @__PURE__ */ jsx(History, { size: 12 }),
                  " Audit Log"
                ]
              }
            ),
            selected.size > 0 && /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setBulkOpen(true),
                className: "inline-flex items-center justify-center gap-1 h-8 px-2.5 rounded-lg border border-rose-200 text-rose-700 text-[10px] sm:text-[11px] font-bold hover:bg-rose-50 transition whitespace-nowrap",
                children: [
                  /* @__PURE__ */ jsx(Layers, { size: 12 }),
                  " Bulk (",
                  selected.size,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setAddOpen(true),
                className: "flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 h-8 px-2.5 rounded-lg gradient-primary text-white text-[10px] sm:text-[11px] font-bold shadow-glow hover:opacity-95 transition whitespace-nowrap",
                children: [
                  /* @__PURE__ */ jsx(Plus, { size: 12 }),
                  " New Lead"
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "max-h-[480px] overflow-y-auto", children: loading ? /* @__PURE__ */ jsx("p", { className: "p-6 text-center text-rose-300 font-semibold text-xs", children: "Loading queue…" }) : filtered.length === 0 ? /* @__PURE__ */ jsx("p", { className: "p-6 text-center text-slate-400 text-xs", children: "No leads match filters" }) : isMobile ? /* @__PURE__ */ jsx("div", { className: "p-2 sm:p-3 flex flex-col gap-2", children: filtered.map((lead) => {
          const lid = String(getLeadId(lead));
          return /* @__PURE__ */ jsxs(
            "div",
            {
              draggable: true,
              onDragStart: () => setDragLeadId(lid),
              onDragEnd: () => setDragLeadId(null),
              className: "rounded-xl border border-rose-100 bg-white p-2.5 active:bg-rose-50/30",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      className: "shrink-0 w-3.5 h-3.5",
                      checked: selected.has(lid),
                      onChange: () => toggleSelect(lid)
                    }
                  ),
                  /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setDetailLead(lead), className: "text-left flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-900 truncate leading-tight", children: lead.lead_name || "—" }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 truncate", children: lead.company_name || lead.email })
                  ] }),
                  /* @__PURE__ */ jsx(GripVertical, { size: 14, className: "text-rose-300 shrink-0" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1 mt-1.5 pl-5", children: [
                  /* @__PURE__ */ jsx(SourceBadge, { lead, compact: true }),
                  lead._assignment ? /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-emerald-700 truncate max-w-[40%]", children: lead._assignment.employeeName }) : /* @__PURE__ */ jsx(Badge, { tone: "warning", children: /* @__PURE__ */ jsx("span", { className: "text-[9px]", children: "Unassigned" }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold text-slate-500", children: lead.pipeline_stage || lead.status || "—" })
                ] })
              ]
            },
            lid
          );
        }) }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm min-w-[640px]", children: [
          /* @__PURE__ */ jsx("thead", { className: "sticky top-0 z-10 bg-slate-50", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "p-2 w-8", children: /* @__PURE__ */ jsx("input", { type: "checkbox", checked: selected.size === filtered.length && filtered.length > 0, onChange: toggleSelectAll }) }),
            /* @__PURE__ */ jsx("th", { className: "p-2 text-left text-[9px] font-bold text-rose-700 uppercase tracking-wider", children: "Lead" }),
            /* @__PURE__ */ jsx("th", { className: "p-2 text-left text-[9px] font-bold text-rose-700 uppercase tracking-wider", children: "Source" }),
            /* @__PURE__ */ jsx("th", { className: "p-2 text-left text-[9px] font-bold text-rose-700 uppercase tracking-wider", children: "Assignment" }),
            /* @__PURE__ */ jsx("th", { className: "p-2 text-left text-[9px] font-bold text-rose-700 uppercase tracking-wider", children: "Stage" }),
            /* @__PURE__ */ jsx("th", { className: "p-2 w-8" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: filtered.map((lead) => {
            const lid = String(getLeadId(lead));
            return /* @__PURE__ */ jsxs(
              "tr",
              {
                draggable: true,
                onDragStart: () => setDragLeadId(lid),
                onDragEnd: () => setDragLeadId(null),
                className: "border-t border-rose-50/80 hover:bg-rose-50/40 cursor-grab active:cursor-grabbing",
                children: [
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsx("input", { type: "checkbox", checked: selected.has(lid), onChange: () => toggleSelect(lid) }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setDetailLead(lead), className: "text-left", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-900", children: lead.lead_name || "—" }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400", children: lead.company_name || lead.email })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsx(SourceBadge, { lead, compact: true }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: lead._assignment ? /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-emerald-700", children: lead._assignment.employeeName }) : /* @__PURE__ */ jsx(Badge, { tone: "warning", children: /* @__PURE__ */ jsx("span", { className: "text-[9px]", children: "Unassigned" }) }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold text-slate-600", children: lead.pipeline_stage || lead.status || "—" }) }),
                  /* @__PURE__ */ jsx("td", { className: "p-2 text-rose-300", children: /* @__PURE__ */ jsx(GripVertical, { size: 14 }) })
                ]
              },
              lid
            );
          }) })
        ] }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "px-3 sm:px-4 py-2 border-t border-rose-50 text-[9px] sm:text-[10px] text-slate-400", children: [
          "Select leads → pick mode → Run Now · drag onto employee cards · ",
          filtered.length,
          " in queue"
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col min-h-0 min-w-0", children: /* @__PURE__ */ jsxs("div", { style: cardBase, className: "flex flex-col flex-1 overflow-hidden h-full min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-3 sm:px-4 py-2.5 border-b border-rose-50 shrink-0", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-900", children: "Employee Workload" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500", children: "Drop leads here to assign" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 min-h-0", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "overflow-y-auto overflow-x-hidden px-3 pt-3 pb-2 space-y-2 shrink-0 scrollbar-thin",
              style: { height: EMPLOYEE_LIST_VIEWPORT_PX, maxHeight: EMPLOYEE_LIST_VIEWPORT_PX },
              children: employees.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 text-center py-8", children: "No team members loaded" }) : employees.map((emp) => {
                const stats = workload[emp.id] || { assigned: 0, active: 0, converted: 0, followUps: 0 };
                const settings = assignState.employeeSettings[String(emp.id)] || {};
                const cap = settings.maxCapacity ?? 15;
                const utilPct = cap > 0 ? Math.round(stats.active / cap * 100) : 0;
                const status = workloadStatus(utilPct);
                return /* @__PURE__ */ jsx(
                  EmployeeCard,
                  {
                    emp,
                    stats,
                    utilPct,
                    status,
                    paused: settings.receivingPaused,
                    onTogglePause: (id) => setAssignState(toggleEmployeeReceiving(assignState, id)),
                    onDrop: (a, b) => handleDropOnEmployee(emp, a, b),
                    dragOver: dropTarget === emp.id
                  },
                  emp.id
                );
              })
            }
          ),
          employees.length > VISIBLE_EMPLOYEE_COUNT && /* @__PURE__ */ jsxs("p", { className: "px-4 pb-3 pt-1 text-[10px] font-semibold text-slate-400 text-center shrink-0", children: [
            "Scroll for ",
            employees.length - VISIBLE_EMPLOYEE_COUNT,
            " more team member",
            employees.length - VISIBLE_EMPLOYEE_COUNT === 1 ? "" : "s"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0", "aria-hidden": true })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowAnalytics((v) => !v),
          className: "flex items-center gap-2 text-sm font-bold text-rose-700 mb-4",
          children: [
            showAnalytics ? /* @__PURE__ */ jsx(ChevronUp, { size: 18 }) : /* @__PURE__ */ jsx(ChevronDown, { size: 18 }),
            "Analytics & Performance"
          ]
        }
      ),
      /* @__PURE__ */ jsx(AnimatePresence, { children: showAnalytics && /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, height: 0 },
          animate: { opacity: 1, height: "auto" },
          exit: { opacity: 0, height: 0 },
          className: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5",
          children: [
            /* @__PURE__ */ jsxs(GlassCard, { className: "p-5", children: [
              /* @__PURE__ */ jsx(SectionHeader, { title: "Lead Source Performance", subtitle: "Volume & conversions by channel" }),
              /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 220, className: "chart-wrap", children: /* @__PURE__ */ jsxs(BarChart, { data: sourcePerformance, children: [
                /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#fecdd3" }),
                /* @__PURE__ */ jsx(XAxis, { dataKey: "source", tick: { fontSize: 10 } }),
                /* @__PURE__ */ jsx(YAxis, { tick: { fontSize: 10 } }),
                /* @__PURE__ */ jsx(Tooltip, {}),
                /* @__PURE__ */ jsx(Bar, { dataKey: "leads", fill: "#fda4af", name: "Leads", radius: [4, 4, 0, 0] }),
                /* @__PURE__ */ jsx(Bar, { dataKey: "converted", fill: "#be123c", name: "Converted", radius: [4, 4, 0, 0] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(GlassCard, { className: "p-5", children: [
              /* @__PURE__ */ jsx(SectionHeader, { title: "Lead Distribution", subtitle: "Assigned vs unassigned" }),
              /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 220, className: "chart-wrap", children: /* @__PURE__ */ jsxs(PieChart, { children: [
                /* @__PURE__ */ jsx(Pie, { data: distributionPie, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 80, label: true, children: distributionPie.map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: CHART_COLORS[i % CHART_COLORS.length] }, i)) }),
                /* @__PURE__ */ jsx(Tooltip, {}),
                /* @__PURE__ */ jsx(Legend, {})
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(GlassCard, { className: "p-5", children: [
              /* @__PURE__ */ jsx(SectionHeader, { title: "Employee Workload", subtitle: "Assigned & converted per rep" }),
              /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 220, className: "chart-wrap", children: /* @__PURE__ */ jsxs(BarChart, { data: employeeChartData, children: [
                /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#fecdd3" }),
                /* @__PURE__ */ jsx(XAxis, { dataKey: "name", tick: { fontSize: 10 } }),
                /* @__PURE__ */ jsx(YAxis, { tick: { fontSize: 10 } }),
                /* @__PURE__ */ jsx(Tooltip, {}),
                /* @__PURE__ */ jsx(Bar, { dataKey: "assigned", fill: "#fb7185", name: "Assigned" }),
                /* @__PURE__ */ jsx(Bar, { dataKey: "converted", fill: "#16a34a", name: "Converted" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(GlassCard, { className: "p-5", children: [
              /* @__PURE__ */ jsx(SectionHeader, { title: "Unassigned Lead Trend", subtitle: "Last 7 days" }),
              /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 220, className: "chart-wrap", children: /* @__PURE__ */ jsxs(AreaChart, { data: unassignedTrend, children: [
                /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#fecdd3" }),
                /* @__PURE__ */ jsx(XAxis, { dataKey: "day", tick: { fontSize: 10 } }),
                /* @__PURE__ */ jsx(YAxis, { tick: { fontSize: 10 } }),
                /* @__PURE__ */ jsx(Tooltip, {}),
                /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "unassigned", stroke: "#be123c", fill: "#fecdd3", name: "Unassigned" })
              ] }) })
            ] })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(AddLeadDrawer, { open: addOpen, onClose: handleAddClose, showToast }),
    /* @__PURE__ */ jsx(
      LeadDetailDrawer,
      {
        open: !!detailLead,
        onClose: () => setDetailLead(null),
        lead: detailLead,
        assignment: detailLead ? getAssignmentForLead(assignState, detailLead) : null,
        employees,
        onAssign: (lead, emp) => {
          handleAssign(lead, emp, detailLead?._assignment ? "reassign" : "manual");
          setDetailLead(null);
        },
        auditEntries: detailLead ? leadAudit(detailLead) : []
      }
    ),
    /* @__PURE__ */ jsx(Drawer, { open: historyOpen, onClose: () => setHistoryOpen(false), title: "Assignment Audit Log", children: /* @__PURE__ */ jsx("ul", { className: "space-y-3 max-h-[70vh] overflow-y-auto", children: assignState.auditLog.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 text-center py-8", children: "No assignment events yet" }) : assignState.auditLog.map((e) => /* @__PURE__ */ jsxs("li", { className: "rounded-xl border border-rose-100 p-3 text-sm", children: [
      /* @__PURE__ */ jsx("span", { className: "font-bold capitalize text-slate-800", children: e.action }),
      " — ",
      /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: e.leadName }),
      " → ",
      /* @__PURE__ */ jsx("span", { className: "text-rose-700 font-semibold", children: e.employeeName || "—" }),
      /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-slate-400 mt-1", children: [
        new Date(e.at).toLocaleString(),
        " · ",
        e.method
      ] })
    ] }, e.id)) }) }),
    /* @__PURE__ */ jsxs(Drawer, { open: bulkOpen, onClose: () => setBulkOpen(false), title: `Bulk Assign (${selected.size} leads)`, children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mb-4", children: "Choose an employee to receive selected leads." }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-2", children: employees.map((emp) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => handleBulkAssign(emp),
          className: "w-full text-left px-4 py-3 rounded-xl border border-rose-100 hover:border-rose-400 hover:bg-rose-50 font-semibold text-slate-800 transition",
          children: [
            emp.name,
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400 block", children: emp.department || emp.role })
          ]
        },
        emp.id
      )) })
    ] }),
    toast && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        className: "fixed bottom-6 right-6 z-[9999] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-medium",
        style: {
          background: toast.type === "success" ? "#f0fdf4" : "#fef2f2",
          border: `1px solid ${toast.type === "success" ? "#bbf7d0" : "#fecdd3"}`,
          color: toast.type === "success" ? "#15803d" : "#be123c"
        },
        children: [
          toast.type === "success" ? /* @__PURE__ */ jsx(CheckCircle2, { size: 16 }) : /* @__PURE__ */ jsx(X, { size: 16 }),
          toast.message
        ]
      }
    )
  ] });
}
export {
  Leads as default
};
