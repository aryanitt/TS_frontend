import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { Target, Scale, Percent, FileSliders, Search, AlertTriangle, RefreshCw } from "lucide-react";
import { B as Badge } from "./Primitives-CmGbnOU9.js";
import toast, { Toaster } from "react-hot-toast";
import { D as DashboardScrollbarStyles, A as AdminProfileHeader, S as SettingsMobileTabs, c as SettingsSidebar, b as SettingsPanel, P as PanelFooter } from "./SettingsLayout-B-65zgtQ.js";
import "framer-motion";
import "react-router-dom";
import "./_-BNdSRMjW.js";
import "@tanstack/react-query";
import "react-dom";
const tabs = [
  { id: "targets", label: "Target Management", icon: Target },
  { id: "kpis", label: "KPI Weightages", icon: Scale },
  { id: "incentives", label: "Incentive & Slabs", icon: Percent },
  { id: "calculations", label: "Performance Formulas", icon: FileSliders }
];
function Settings() {
  const [activeTab, setActiveTab] = useState("targets");
  const [draftCount, setDraftCount] = useState(2);
  const [currentVersion, setCurrentVersion] = useState("v2.3");
  const [employeeTargets, setEmployeeTargets] = useState([
    { id: 1, name: "Sarah Chen", team: "Sales & Growth", calls: 450, leads: 45, meetings: 35, revenue: 145e3 },
    { id: 2, name: "James Wilson", team: "Enterprise Sales", calls: 390, leads: 39, meetings: 30, revenue: 118e3 },
    { id: 3, name: "Emily Davis", team: "Sales & Growth", calls: 540, leads: 54, meetings: 40, revenue: 24e4 },
    { id: 4, name: "Lisa Park", team: "Inbound Growth", calls: 312, leads: 31, meetings: 25, revenue: 72e3 },
    { id: 5, name: "Marcus Brody", team: "Enterprise Sales", calls: 490, leads: 49, meetings: 38, revenue: 195e3 },
    { id: 6, name: "Siddharth Mehta", team: "Sales & Growth", calls: 416, leads: 41, meetings: 30, revenue: 132e3 }
  ]);
  const [targetSearch, setTargetSearch] = useState("");
  const [selectedTargetEmp, setSelectedTargetEmp] = useState(1);
  const [bulkTeam, setBulkTeam] = useState("Sales & Growth");
  const [bulkValue, setBulkValue] = useState("");
  const [bulkField, setBulkField] = useState("calls");
  const [kpiWeights, setKpiWeights] = useState([
    { id: "revenue", label: "Cash Collected / Revenue", weight: 35, enabled: true },
    { id: "leads", label: "Converted Leads", weight: 25, enabled: true },
    { id: "meetings", label: "Completed Meetings", weight: 20, enabled: true },
    { id: "calls", label: "Call Volume Completed", weight: 20, enabled: true }
  ]);
  const [incentiveSlabs, setIncentiveSlabs] = useState([
    { id: 1, tier: "Bronze", min: 0, max: 1e5, rate: 3 },
    { id: 2, tier: "Silver", min: 1e5, max: 25e4, rate: 4.5 },
    { id: 3, tier: "Gold", min: 25e4, max: 4e5, rate: 6 },
    { id: 4, tier: "Platinum", min: 4e5, max: 1e6, rate: 8 }
  ]);
  const [baseIncentiveRate, setBaseIncentiveRate] = useState(2.5);
  const [targetBonusAmount, setTargetBonusAmount] = useState(2500);
  const [formulaType, setFormulaType] = useState("weighted");
  const [ratingThresholds, setRatingThresholds] = useState({
    outstanding: 110,
    excellent: 100,
    good: 85,
    average: 70
  });
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, action: "Published incentive rule config v2.3", admin: "Alex Chen", timestamp: "2026-06-19 10:14" },
    { id: 2, action: "Bulk updated call targets for Sales & Growth", admin: "Alex Chen", timestamp: "2026-06-18 16:02" }
  ]);
  const totalKpiWeight = useMemo(() => {
    return kpiWeights.reduce((sum, item) => sum + (item.enabled ? Number(item.weight) : 0), 0);
  }, [kpiWeights]);
  const isWeightValid = totalKpiWeight === 100;
  const activeTargetEmp = useMemo(() => {
    return employeeTargets.find((e) => e.id === Number(selectedTargetEmp)) || employeeTargets[0];
  }, [employeeTargets, selectedTargetEmp]);
  const handleSaveDraft = () => {
    setDraftCount((prev) => prev + 1);
    toast.success("Draft version saved successfully!");
  };
  const handlePublish = () => {
    if (!isWeightValid) {
      toast.error("Cannot publish: KPI Weightages must sum to 100%. Current: " + totalKpiWeight + "%");
      return;
    }
    const nextVerNum = "v2." + (Number(currentVersion.split(".")[1]) + 1);
    setCurrentVersion(nextVerNum);
    setDraftCount(0);
    toast.success(`Published rule configs successfully! Rule Engine upgraded to ${nextVerNum}`);
  };
  const handleBulkUpdate = () => {
    if (!bulkValue || isNaN(Number(bulkValue))) {
      toast.error("Please enter a valid numeric bulk update value.");
      return;
    }
    const numVal = Number(bulkValue);
    setEmployeeTargets(
      (prev) => prev.map((e) => e.team === bulkTeam ? { ...e, [bulkField]: numVal } : e)
    );
    const newLog = {
      id: Date.now(),
      action: `Bulk updated ${bulkField} target to ${numVal} for team: ${bulkTeam}`,
      admin: "Alex Chen",
      timestamp: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " "),
      type: "targets"
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    setDraftCount((prev) => prev + 1);
    toast.success(`Successfully bulk updated ${bulkField} targets for all ${bulkTeam} employees.`);
  };
  const handleTargetChange = (field, value) => {
    if (value === "" || isNaN(Number(value))) return;
    setEmployeeTargets(
      (prev) => prev.map((e) => e.id === activeTargetEmp.id ? { ...e, [field]: Number(value) } : e)
    );
  };
  const handleWeightChange = (id, val) => {
    const num = Number(val);
    if (isNaN(num)) return;
    setKpiWeights(
      (prev) => prev.map((item) => item.id === id ? { ...item, weight: num } : item)
    );
  };
  const handleKpiToggle = (id) => {
    setKpiWeights(
      (prev) => prev.map((item) => item.id === id ? { ...item, enabled: !item.enabled } : item)
    );
  };
  const handleSlabChange = (id, field, val) => {
    const num = Number(val);
    if (isNaN(num)) return;
    setIncentiveSlabs(
      (prev) => prev.map((s) => s.id === id ? { ...s, [field]: num } : s)
    );
  };
  const filteredTargets = useMemo(() => {
    return employeeTargets.filter(
      (e) => e.name.toLowerCase().includes(targetSearch.toLowerCase())
    );
  }, [employeeTargets, targetSearch]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6 page-shell min-w-0", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
    /* @__PURE__ */ jsx(DashboardScrollbarStyles, {}),
    /* @__PURE__ */ jsx(AdminProfileHeader, {}),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 sm:gap-6 min-w-0", children: [
      /* @__PURE__ */ jsx(
        SettingsMobileTabs,
        {
          tabs,
          activeTab,
          onTabChange: setActiveTab,
          tabExtra: (t) => t.id === "kpis" && !isWeightValid ? /* @__PURE__ */ jsx("span", { className: "absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-600 animate-ping" }) : null
        }
      ),
      /* @__PURE__ */ jsx(
        SettingsSidebar,
        {
          title: "Business Control",
          subtitle: "Configure operational business rules",
          tabs,
          activeTab,
          onTabChange: setActiveTab,
          tabExtra: (t) => t.id === "kpis" && !isWeightValid ? /* @__PURE__ */ jsx("span", { className: "absolute right-3 w-2 h-2 rounded-full bg-rose-600 animate-ping" }) : null
        }
      ),
      /* @__PURE__ */ jsxs(
        SettingsPanel,
        {
          footer: /* @__PURE__ */ jsx(
            PanelFooter,
            {
              left: /* @__PURE__ */ jsx(Badge, { tone: draftCount > 0 ? "warning" : "muted", children: draftCount > 0 ? `${draftCount} Pending Edits` : "Buffer Synchronized" }),
              actions: /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleSaveDraft,
                    className: "flex-1 sm:flex-initial px-4 py-2 border border-rose-200 hover:border-rose-400 text-[#be123c] rounded-xl text-xs font-bold transition-all shadow-sm bg-white",
                    children: "Save Draft"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handlePublish,
                    className: "flex-1 sm:flex-initial px-4 py-2 bg-[#be123c] hover:bg-[#a20f32] text-white rounded-xl text-xs font-bold transition-all shadow-md active:translate-y-px flex items-center justify-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                      " Publish Configuration"
                    ]
                  }
                )
              ] })
            }
          ),
          children: [
            activeTab === "targets" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-extrabold text-slate-800 uppercase tracking-wider", children: "Employee Target Slates" }),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Manage quotas and target levels assigned to performers" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-4 border border-rose-100/50 rounded-2xl bg-slate-50/50 flex flex-col gap-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        placeholder: "Search employee...",
                        value: targetSearch,
                        onChange: (e) => setTargetSearch(e.target.value),
                        className: "w-full pl-8 pr-3 py-1.5 border border-rose-200 rounded-xl bg-white text-slate-800 placeholder:text-slate-400 text-xs outline-none focus:border-rose-400"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "space-y-1 overflow-y-auto max-h-48 pr-1 no-sb", children: filteredTargets.map((e) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      onClick: () => setSelectedTargetEmp(e.id),
                      className: `p-2 rounded-xl text-xs font-bold cursor-pointer transition flex justify-between items-center ${activeTargetEmp.id === e.id ? "bg-rose-50 border border-rose-200 text-rose-700" : "hover:bg-slate-100 text-slate-600 border border-transparent"}`,
                      children: [
                        /* @__PURE__ */ jsx("span", { children: e.name }),
                        /* @__PURE__ */ jsx("span", { className: "text-[9px] text-slate-400 font-medium truncate", children: e.team })
                      ]
                    },
                    e.id
                  )) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 p-4 border border-rose-100/50 rounded-2xl bg-white space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pb-2 border-b border-slate-100", children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-xs font-black text-[#be123c] uppercase", children: [
                      activeTargetEmp.name,
                      "'s Target slate"
                    ] }),
                    /* @__PURE__ */ jsx(Badge, { tone: "primary", children: activeTargetEmp.team })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400 uppercase block mb-1", children: "Monthly Call Target" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          value: activeTargetEmp.calls,
                          onChange: (e) => handleTargetChange("calls", e.target.value),
                          className: "w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 text-xs font-bold outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400 uppercase block mb-1", children: "Converted Leads Target" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          value: activeTargetEmp.leads,
                          onChange: (e) => handleTargetChange("leads", e.target.value),
                          className: "w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 text-xs font-bold outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400 uppercase block mb-1", children: "Meetings Scheduled Target" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          value: activeTargetEmp.meetings,
                          onChange: (e) => handleTargetChange("meetings", e.target.value),
                          className: "w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 text-xs font-bold outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400 uppercase block mb-1", children: "Revenue Collection Target ($)" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          value: activeTargetEmp.revenue,
                          onChange: (e) => handleTargetChange("revenue", e.target.value),
                          className: "w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 text-xs font-bold outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                        }
                      )
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 border border-rose-100 rounded-2xl bg-gradient-to-r from-rose-50/10 via-rose-50/20 to-rose-50/10", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-rose-700 uppercase tracking-wider block", children: "Bulk Target Slate Assigner" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400 font-medium", children: "Re-assign targets to all team members collectively" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-3 items-end", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "text-[9px] font-bold text-slate-400 uppercase block mb-1", children: "Target Team" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: bulkTeam,
                        onChange: (e) => setBulkTeam(e.target.value),
                        className: "w-full px-3 py-1.5 border border-slate-200 rounded-xl bg-white text-slate-700 text-xs outline-none",
                        children: [
                          /* @__PURE__ */ jsx("option", { children: "Sales & Growth" }),
                          /* @__PURE__ */ jsx("option", { children: "Enterprise Sales" }),
                          /* @__PURE__ */ jsx("option", { children: "Inbound Growth" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "text-[9px] font-bold text-slate-400 uppercase block mb-1", children: "Metric Target Field" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: bulkField,
                        onChange: (e) => setBulkField(e.target.value),
                        className: "w-full px-3 py-1.5 border border-slate-200 rounded-xl bg-white text-slate-700 text-xs outline-none",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "calls", children: "Call Volume" }),
                          /* @__PURE__ */ jsx("option", { value: "leads", children: "Converted Leads" }),
                          /* @__PURE__ */ jsx("option", { value: "meetings", children: "Scheduled Meetings" }),
                          /* @__PURE__ */ jsx("option", { value: "revenue", children: "Revenue Quota" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "text-[9px] font-bold text-slate-400 uppercase block mb-1", children: "New Target Value" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        placeholder: "e.g. 500",
                        value: bulkValue,
                        onChange: (e) => setBulkValue(e.target.value),
                        className: "w-full px-3 py-1.5 border border-slate-200 rounded-xl bg-white text-slate-700 text-xs outline-none"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: handleBulkUpdate,
                      className: "w-full py-1.5 bg-[#be123c] hover:bg-[#a20f32] text-white rounded-xl text-xs font-bold shadow-sm active:translate-y-px transition",
                      children: "Apply Bulk Change"
                    }
                  ) })
                ] })
              ] })
            ] }),
            activeTab === "kpis" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-sm font-extrabold text-slate-800 uppercase tracking-wider", children: "KPI Rules & Weightages" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Determine the score weight allocation and status of core metric KPIs" })
                ] }),
                isWeightValid ? /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1", children: "✓ Total validated: 100%" }) : /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1", children: [
                  "⚠ Weights Total: ",
                  totalKpiWeight,
                  "% (must equal 100%)"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: kpiWeights.map((item) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `p-4 border rounded-2xl transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${item.enabled ? "bg-white border-rose-100" : "bg-slate-50/60 border-slate-100 opacity-60"}`,
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => handleKpiToggle(item.id),
                          className: `w-9 h-5 rounded-full transition relative shrink-0 ${item.enabled ? "bg-[#be123c]" : "bg-slate-200"}`,
                          children: /* @__PURE__ */ jsx("div", { className: `absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all ${item.enabled ? "translate-x-4" : ""}` })
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-800 block", children: item.label }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400", children: item.enabled ? "Active rule vector" : "De-activated vector" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "range",
                          min: "0",
                          max: "100",
                          disabled: !item.enabled,
                          value: item.enabled ? item.weight : 0,
                          onChange: (e) => handleWeightChange(item.id, e.target.value),
                          className: "w-36 h-1.5 rounded-lg bg-slate-100 accent-[#be123c]"
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "number",
                            disabled: !item.enabled,
                            value: item.enabled ? item.weight : 0,
                            onChange: (e) => handleWeightChange(item.id, e.target.value),
                            className: "w-16 px-2 py-1 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 text-xs font-bold text-center outline-none focus:border-rose-400"
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-400", children: "%" })
                      ] })
                    ] })
                  ]
                },
                item.id
              )) }),
              !isWeightValid && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-rose-50/40 border border-rose-200 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 text-rose-600 shrink-0 animate-bounce" }),
                /* @__PURE__ */ jsxs("span", { className: "text-xs text-rose-700 font-medium", children: [
                  "Live Validation Notice: Total weight sum is ",
                  /* @__PURE__ */ jsxs("strong", { children: [
                    totalKpiWeight,
                    "%"
                  ] }),
                  ". You must scale the percentages so they sum to ",
                  /* @__PURE__ */ jsx("strong", { children: "100%" }),
                  " to enable publishing configurations."
                ] })
              ] })
            ] }),
            activeTab === "incentives" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-extrabold text-slate-800 uppercase tracking-wider", children: "Incentive Slabs & Salary Rules" }),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Configure commission slabs, default baseline rates, and target bonuses" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-4 border border-rose-100/50 rounded-2xl bg-slate-50/40", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400 uppercase block mb-1", children: "Baseline Incentive Rate (%)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      step: "0.1",
                      value: baseIncentiveRate,
                      onChange: (e) => setBaseIncentiveRate(Number(e.target.value)),
                      className: "w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-bold outline-none"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "text-[9px] text-slate-400 mt-1 block", children: "Default rate when target threshold achievements are below bronze levels" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-4 border border-rose-100/50 rounded-2xl bg-slate-50/40", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400 uppercase block mb-1", children: "Monthly Target Reached Bonus ($)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      value: targetBonusAmount,
                      onChange: (e) => setTargetBonusAmount(Number(e.target.value)),
                      className: "w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 text-xs font-bold outline-none"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "text-[9px] text-slate-400 mt-1 block", children: "Standard target achievement cash incentive bonus" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-slate-800 uppercase tracking-wider", children: "Target Performance Slabs" }),
                  /* @__PURE__ */ jsxs(Badge, { tone: "info", children: [
                    incentiveSlabs.length,
                    " Slabs Configured"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "space-y-3", children: incentiveSlabs.map((slab) => /* @__PURE__ */ jsxs("div", { className: "p-4 border border-rose-50 rounded-2xl bg-white flex flex-col sm:flex-row items-center gap-4 justify-between", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-extrabold text-slate-800 w-24", children: [
                    slab.tier,
                    " Tier"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-wrap gap-4 items-center justify-end", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold text-slate-400 uppercase block mb-0.5", children: "Min collection ($)" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          value: slab.min,
                          onChange: (e) => handleSlabChange(slab.id, "min", e.target.value),
                          className: "w-28 px-2 py-1 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 text-xs font-bold outline-none"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold text-slate-400 uppercase block mb-0.5", children: "Max collection ($)" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          value: slab.max,
                          onChange: (e) => handleSlabChange(slab.id, "max", e.target.value),
                          className: "w-28 px-2 py-1 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 text-xs font-bold outline-none"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold text-slate-400 uppercase block mb-0.5", children: "Commission Rate (%)" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          step: "0.1",
                          value: slab.rate,
                          onChange: (e) => handleSlabChange(slab.id, "rate", e.target.value),
                          className: "w-20 px-2 py-1 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 text-xs font-bold outline-none text-center"
                        }
                      )
                    ] })
                  ] })
                ] }, slab.id)) })
              ] })
            ] }),
            activeTab === "calculations" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-extrabold text-slate-800 uppercase tracking-wider", children: "Performance Formula Configurations" }),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Select and calibrate calculation formulas for scoring teammates" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-4 border border-rose-100 rounded-2xl bg-white flex flex-col justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-extrabold text-slate-800 uppercase block mb-1", children: "Calculation Rule Sets" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400", children: "Formula used to combine weighted KPI scores" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "space-y-2 mt-4", children: [
                    { id: "weighted", label: "Weighted Summation", desc: "Linear sum of weights multiplied by achievement percentages" },
                    { id: "threshold", label: "Threshold Gated", desc: "Allows scoring only if base minimum thresholds are cleared" },
                    { id: "stepped", label: "Stepped slab Matrix", desc: "Gradual multiplier increases as target vectors hit increments" }
                  ].map((f) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      onClick: () => setFormulaType(f.id),
                      className: `p-3 rounded-xl border cursor-pointer transition ${formulaType === f.id ? "bg-rose-50 border-rose-200 text-rose-700" : "bg-slate-50/50 hover:bg-slate-50 border-slate-100 text-slate-600"}`,
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold block", children: f.label }),
                        /* @__PURE__ */ jsx("span", { className: "text-[9px] text-slate-400", children: f.desc })
                      ]
                    },
                    f.id
                  )) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-4 border border-rose-100 rounded-2xl bg-white space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-extrabold text-slate-800 uppercase block mb-1", children: "Grading & Rating Limits" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400", children: "Target performance thresholds for rating slates" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[10px] font-bold text-slate-500 mb-1", children: [
                        /* @__PURE__ */ jsx("span", { children: "Outstanding limit threshold" }),
                        /* @__PURE__ */ jsxs("span", { children: [
                          ratingThresholds.outstanding,
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "range",
                          min: "95",
                          max: "150",
                          value: ratingThresholds.outstanding,
                          onChange: (e) => setRatingThresholds({ ...ratingThresholds, outstanding: Number(e.target.value) }),
                          className: "w-full h-1 bg-slate-100 accent-[#be123c]"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[10px] font-bold text-slate-500 mb-1", children: [
                        /* @__PURE__ */ jsx("span", { children: "Excellent limit threshold" }),
                        /* @__PURE__ */ jsxs("span", { children: [
                          ratingThresholds.excellent,
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "range",
                          min: "80",
                          max: "110",
                          value: ratingThresholds.excellent,
                          onChange: (e) => setRatingThresholds({ ...ratingThresholds, excellent: Number(e.target.value) }),
                          className: "w-full h-1 bg-slate-100 accent-[#be123c]"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[10px] font-bold text-slate-500 mb-1", children: [
                        /* @__PURE__ */ jsx("span", { children: "Good limit threshold" }),
                        /* @__PURE__ */ jsxs("span", { children: [
                          ratingThresholds.good,
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "range",
                          min: "70",
                          max: "95",
                          value: ratingThresholds.good,
                          onChange: (e) => setRatingThresholds({ ...ratingThresholds, good: Number(e.target.value) }),
                          className: "w-full h-1 bg-slate-100 accent-[#be123c]"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[10px] font-bold text-slate-500 mb-1", children: [
                        /* @__PURE__ */ jsx("span", { children: "Average limit threshold" }),
                        /* @__PURE__ */ jsxs("span", { children: [
                          ratingThresholds.average,
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "range",
                          min: "50",
                          max: "80",
                          value: ratingThresholds.average,
                          onChange: (e) => setRatingThresholds({ ...ratingThresholds, average: Number(e.target.value) }),
                          className: "w-full h-1 bg-slate-100 accent-[#be123c]"
                        }
                      )
                    ] })
                  ] })
                ] })
              ] })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  Settings as default
};
