import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, Trophy, Percent, Flame, History, ChevronDown, Phone, Mail, MapPin, StickyNote, User, Calendar, Sparkles, Star, PhoneCall, Clock, Plus, CheckCircle2, Circle, Trash2, Kanban, Target, TrendingUp, Search } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { D as Drawer, G as GlassCard, B as Badge } from "./Primitives-CmGbnOU9.js";
import { A as AddLeadDrawer } from "./AddLeadDrawer-2QdzJ1Rt.js";
import { d as EMP_CALLS } from "./_-BNdSRMjW.js";
import { d as getStageMeta, b as PRIORITY_BADGE, f as formatPipelineValue, c as PRIORITY_OPTIONS, a as PIPELINE_STAGES, t as timeAgoShort, p as patchLead, P as PIPELINE_LEADS, e as groupLeadsByStage, g as getPipelineSummary, l as leadFromForm } from "./pipelineMock-BrKX7IAf.js";
import "framer-motion";
import "@tanstack/react-query";
import "react-dom";
const ACTIVITY_ICONS = {
  created: StickyNote,
  call: PhoneCall,
  email: Mail,
  meeting: Calendar,
  note: StickyNote,
  won: Trophy
};
const labelClass = "text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2";
const MOOD_META = {
  positive: { label: "Excited 😊", bg: "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold" },
  neutral: { label: "Neutral 😐", bg: "bg-slate-50 border-slate-200 text-slate-650 font-bold" },
  negative: { label: "Hesitant 😟", bg: "bg-amber-50 border-amber-200 text-amber-700 font-bold" }
};
function PipelineLeadDrawer({ open, onClose, lead, onUpdateLead, onStageChange }) {
  const [tab, setTab] = useState("details");
  const [newTask, setNewTask] = useState("");
  const [calls, setCalls] = useState([]);
  useEffect(() => {
    if (open) {
      setTab("details");
      setNewTask("");
      const saved = localStorage.getItem("emp_calls_list");
      if (saved) {
        setCalls(JSON.parse(saved));
      } else {
        setCalls(EMP_CALLS);
      }
    }
  }, [open, lead?.id]);
  const leadCalls = useMemo(() => {
    if (!lead) return [];
    return calls.filter(
      (c) => String(c.leadId) === String(lead.id) || c.name && lead.name && c.name.toLowerCase() === lead.name.toLowerCase()
    );
  }, [calls, lead]);
  if (!lead) return null;
  const stage = getStageMeta(lead.stage);
  PRIORITY_BADGE[lead.priority] || "muted";
  const setPriority = (priority) => {
    if (priority === lead.priority) return;
    const updated = patchLead(lead, { priority }, `Temperature changed to ${priority}`);
    onUpdateLead(updated);
    toast.success(`Set to ${priority}`);
  };
  const setStage = (stageId) => {
    if (stageId === lead.stage) return;
    const target = getStageMeta(stageId);
    const updated = patchLead(
      lead,
      { stage: stageId },
      `Moved to ${target.label}`,
      stageId === "closed_won" ? "won" : "note"
    );
    onUpdateLead(updated);
    onStageChange?.(stageId, lead.id);
    toast.success(`Moved to ${target.label}`);
  };
  const toggleTask = (taskId) => {
    onUpdateLead({
      ...lead,
      tasks: lead.tasks.map((t) => t.id === taskId ? { ...t, done: !t.done } : t)
    });
  };
  const addTask = () => {
    if (!newTask.trim()) return;
    onUpdateLead({
      ...lead,
      tasks: [...lead.tasks, { id: Date.now(), text: newTask.trim(), done: false }]
    });
    setNewTask("");
    setTab("tasks");
    toast.success("Task added");
  };
  const removeTask = (taskId) => {
    onUpdateLead({
      ...lead,
      tasks: lead.tasks.filter((t) => t.id !== taskId)
    });
  };
  return /* @__PURE__ */ jsx(Drawer, { open, onClose, title: lead.name, width: "drawer-panel", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50/40 via-white to-rose-100/10 p-5 relative overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-12 h-12 rounded-xl grid place-items-center text-sm font-black text-white shrink-0 shadow-sm transition-all",
            style: {
              backgroundColor: lead.priority === "HOT" ? "#dc2626" : lead.priority === "WARM" ? "#f59e0b" : "#0ea5e9",
              boxShadow: lead.priority === "HOT" ? "0 4px 12px rgba(220,38,38,0.2)" : lead.priority === "WARM" ? "0 4px 12px rgba(245,158,11,0.2)" : "0 4px 12px rgba(14,165,233,0.2)"
            },
            children: lead.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base font-black text-slate-900 leading-tight truncate", children: lead.name }),
            /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${lead.priority === "HOT" ? "bg-rose-50 border-rose-200 text-rose-700" : lead.priority === "WARM" ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-sky-50 border-sky-200 text-sky-700"}`, children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-current animate-pulse" }),
              lead.priority
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-slate-500", children: lead.company })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mt-4 pt-3 border-t border-rose-50/50", children: [
        /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10.5px] font-bold border transition ${stage.id === "closed_won" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-rose-50/50 border-rose-100 text-rose-800"}`, children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
          " ",
          stage.label
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10.5px] font-bold border bg-white border-rose-100 text-rose-700 shadow-[0_1px_2px_rgba(244,63,94,0.02)]", children: [
          /* @__PURE__ */ jsx(Trophy, { className: "w-3.5 h-3.5" }),
          " ",
          formatPipelineValue(lead.value)
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10.5px] font-bold border bg-slate-50 border-slate-200 text-slate-650", children: [
          /* @__PURE__ */ jsx(Percent, { className: "w-3.5 h-3.5" }),
          " ",
          lead.winProbability,
          "% win"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-rose-100 bg-[#fffbfb] p-4.5 space-y-4.5 shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { className: `${labelClass} !mb-2 flex items-center gap-1`, children: [
          /* @__PURE__ */ jsx(Flame, { className: "w-3.5 h-3.5 text-rose-500" }),
          " Lead Temperature"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-white border border-rose-100", children: PRIORITY_OPTIONS.map((p) => {
          const isActive = lead.priority === p;
          const activeClasses = p === "HOT" ? "bg-rose-600 text-white shadow-[0_2px_8px_rgba(220,38,38,0.25)]" : p === "WARM" ? "bg-amber-500 text-white shadow-[0_2px_8px_rgba(245,158,11,0.25)]" : "bg-sky-500 text-white shadow-[0_2px_8px_rgba(14,165,233,0.25)]";
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setPriority(p),
              className: `py-2 rounded-lg text-[10.5px] font-bold transition flex items-center justify-center gap-1 ${isActive ? activeClasses : "text-slate-605 hover:bg-rose-50/50 hover:text-rose-800"}`,
              children: [
                /* @__PURE__ */ jsx("span", { children: p === "HOT" ? "🔥" : p === "WARM" ? "⚡" : "❄️" }),
                /* @__PURE__ */ jsx("span", { children: p })
              ]
            },
            p
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { className: `${labelClass} !mb-2 flex items-center gap-1`, children: [
          /* @__PURE__ */ jsx(History, { className: "w-3.5 h-3.5 text-rose-500" }),
          " Pipeline Stage"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "select",
            {
              value: lead.stage,
              onChange: (e) => setStage(e.target.value),
              className: "w-full h-10.5 pl-3.5 pr-10 rounded-xl border border-rose-100 bg-white text-xs font-bold text-slate-800 outline-none appearance-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition",
              children: PIPELINE_STAGES.map((s) => /* @__PURE__ */ jsx("option", { value: s.id, children: s.label }, s.id))
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400", children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4" }) })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-[9px] text-slate-400 mt-2 font-medium flex items-center gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-400" }),
          " Board scrolls to the selected column automatically."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-1 p-1 rounded-xl bg-rose-50/50 border border-rose-100", children: ["details", "activity", "calls", "tasks"].map((t) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setTab(t),
        className: `flex-1 py-2 text-[11px] font-bold capitalize rounded-lg transition ${tab === t ? "bg-white text-rose-800 shadow-sm ring-1 ring-rose-200" : "text-slate-500 hover:text-rose-700 hover:bg-white/60"}`,
        children: t
      },
      t
    )) }),
    tab === "details" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-100 bg-[#fffbfb] p-4 grid grid-cols-2 gap-3.5", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-2 flex items-start gap-3 pb-2 border-b border-rose-50/50", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-rose-50 text-rose-600 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(Phone, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold uppercase tracking-wider text-slate-400", children: "Phone" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-800 mt-0.5 break-words", children: lead.phone || "—" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2 flex items-start gap-3 pb-2 border-b border-rose-50/50", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-rose-50 text-rose-600 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(Mail, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold uppercase tracking-wider text-slate-400", children: "Email" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-800 mt-0.5 break-words", children: lead.email || "—" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-rose-50 text-rose-600 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(MapPin, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold uppercase tracking-wider text-slate-400", children: "City" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-slate-800 mt-0.5 truncate", children: lead.city || "—" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-rose-50 text-rose-600 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(StickyNote, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold uppercase tracking-wider text-slate-400", children: "Source" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-slate-800 mt-0.5 truncate", children: lead.source || "—" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-rose-50 text-rose-600 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(User, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold uppercase tracking-wider text-slate-400", children: "Owner" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-slate-800 mt-0.5 truncate", children: lead.owner || "—" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-rose-50 text-rose-600 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold uppercase tracking-wider text-slate-400", children: "Next Follow-up" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-slate-800 mt-0.5 truncate", children: lead.nextFollowUp || "—" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-150/70 bg-gradient-to-br from-rose-50/20 via-white to-amber-50/10 p-4 space-y-3 relative overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute right-2 top-2 pointer-events-none opacity-10", children: /* @__PURE__ */ jsx(Sparkles, { className: "w-10 h-10 text-rose-600 animate-pulse" }) }),
        /* @__PURE__ */ jsxs("h4", { className: "text-[10px] font-extrabold text-rose-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-rose-100/50 pb-2", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-rose-600 animate-pulse" }),
          " Latest Call AI MoM"
        ] }),
        leadCalls.length > 0 ? (() => {
          const latestCall = leadCalls[0];
          const moodInfo = MOOD_META[latestCall.mood] || MOOD_META.neutral;
          return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 text-[11px] font-semibold text-slate-505 flex-wrap", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "By: ",
                /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-800", children: "Amit Kumar" })
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Date: ",
                /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-800", children: latestCall.date })
              ] })
            ] }),
            latestCall.note ? /* @__PURE__ */ jsx("div", { className: "bg-white/90 border border-rose-50 p-3 rounded-lg text-[11.5px] leading-relaxed font-medium text-slate-650 shadow-[0_1px_3px_rgba(244,63,94,0.01)] whitespace-pre-line", children: latestCall.note }) : /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-450 italic", children: "No AI summary notes recorded for this call." }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 pt-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider", children: [
              /* @__PURE__ */ jsx("span", { className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] ${moodInfo.bg}`, children: moodInfo.label }),
              latestCall.rating > 0 && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0.5", children: Array.from({ length: 5 }).map((_, idx) => /* @__PURE__ */ jsx(
                Star,
                {
                  className: `w-3 h-3 ${idx < latestCall.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`
                },
                idx
              )) })
            ] })
          ] });
        })() : /* @__PURE__ */ jsxs("div", { className: "text-center py-3 text-slate-400 text-xs", children: [
          /* @__PURE__ */ jsx(PhoneCall, { className: "w-5 h-5 text-rose-300 mx-auto mb-1.5" }),
          /* @__PURE__ */ jsx("span", { children: "No calls or AI MoM registered yet." })
        ] })
      ] })
    ] }),
    tab === "activity" && /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-rose-100 bg-[#fffbfb] p-4 space-y-3", children: lead.activities.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 text-center py-6", children: "No activity logged yet." }) : lead.activities.map((item) => {
      const Icon = ACTIVITY_ICONS[item.type] || StickyNote;
      return /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-rose-50 text-rose-600 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 pb-3 border-b border-rose-50 last:border-0 last:pb-0", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-800", children: item.text }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-1", children: timeAgoShort(item.at) })
        ] })
      ] }, item.id);
    }) }),
    tab === "calls" && /* @__PURE__ */ jsx("div", { className: "space-y-4", children: leadCalls.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-dashed border-rose-200 bg-[#fffbfb] p-6 text-center", children: [
      /* @__PURE__ */ jsx(PhoneCall, { className: "w-8 h-8 text-rose-300 mx-auto mb-2" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-700", children: "No Call Logs" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-1", children: "No call logs or AI MoMs recorded by employees for this lead." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3.5 max-h-[calc(100dvh-360px)] overflow-y-auto pr-1.5 scrollbar-thin", children: leadCalls.map((c) => {
      const isIncoming = c.type === "in";
      const isMissed = c.type === "miss";
      const moodInfo = MOOD_META[c.mood] || MOOD_META.neutral;
      return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-100 bg-white p-3.5 space-y-3 relative overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 border-b border-rose-50/70 pb-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
            /* @__PURE__ */ jsx("span", { className: `text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${isIncoming ? "bg-emerald-50 text-emerald-700" : isMissed ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}`, children: isIncoming ? "Inbound" : isMissed ? "Missed" : "Outbound" }),
            /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-slate-400 font-semibold flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-rose-500" }),
              " ",
              c.date
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[10.5px] font-black text-slate-750 bg-white border border-rose-100 px-1.5 py-0.5 rounded tabular-nums", children: c.duration })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-slate-650", children: [
          /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-rose-500 shrink-0" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Contacted By: ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-800", children: "Amit Kumar" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-[9.5px] text-slate-400 font-medium", children: "(Sales Manager)" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "font-bold text-slate-800", children: [
            "Outcome: ",
            /* @__PURE__ */ jsx("span", { className: "text-rose-700 font-black", children: c.outcome || "No outcome recorded" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9.5px] ${moodInfo.bg}`, children: moodInfo.label })
        ] }),
        c.note ? /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-rose-50/30 to-white border border-rose-100/60 p-3 rounded-lg space-y-1.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-[9.5px] font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-rose-600 animate-pulse" }),
            " AI Call Summary & MoM"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[11.5px] text-slate-650 leading-relaxed font-medium whitespace-pre-line", children: c.note })
        ] }) : /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-400 italic", children: "No notes recorded for this call." }),
        c.rating > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-rose-50/50 mt-1 text-[9.5px] font-bold text-slate-450 uppercase tracking-wider", children: [
          /* @__PURE__ */ jsx("span", { children: "Quality Audit Rating" }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0.5", children: Array.from({ length: 5 }).map((_, idx) => /* @__PURE__ */ jsx(
            Star,
            {
              className: `w-3.5 h-3.5 ${idx < c.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`
            },
            idx
          )) })
        ] })
      ] }, c.id);
    }) }) }),
    tab === "tasks" && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            value: newTask,
            onChange: (e) => setNewTask(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && addTask(),
            placeholder: "Add a task...",
            className: "flex-1 h-10 px-3 rounded-xl border border-rose-100 bg-white text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: addTask,
            className: "h-10 px-3 rounded-xl bg-rose-700 text-white text-xs font-bold hover:bg-rose-800 shrink-0 inline-flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
              "Add"
            ]
          }
        )
      ] }),
      lead.tasks.length === 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-dashed border-rose-200 bg-[#fffbfb] p-6 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "No tasks yet." }) }) : /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: lead.tasks.map((task) => /* @__PURE__ */ jsxs(
        "li",
        {
          className: "flex items-center gap-2 rounded-xl border border-rose-100 bg-white px-3 py-2.5",
          children: [
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => toggleTask(task.id), className: "shrink-0", children: task.done ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-600" }) : /* @__PURE__ */ jsx(Circle, { className: "w-4 h-4 text-slate-300" }) }),
            /* @__PURE__ */ jsx("span", { className: `flex-1 text-sm ${task.done ? "line-through text-slate-400" : "text-slate-800 font-medium"}`, children: task.text }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeTask(task.id), className: "text-slate-300 hover:text-rose-600 shrink-0", children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }) })
          ]
        },
        task.id
      )) })
    ] })
  ] }) });
}
function MetricTile({ label, value, sub, icon: Icon, iconBg, iconColor }) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-100 bg-white/90 p-3 flex items-center justify-between gap-2 min-h-[72px]", children: [
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-tight", children: label }),
      /* @__PURE__ */ jsx("p", { className: "text-xl font-black text-slate-900 mt-0.5 tabular-nums leading-none", children: value }),
      sub && /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-emerald-600 mt-1", children: sub })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `w-9 h-9 rounded-xl grid place-items-center shrink-0 ${iconBg} ${iconColor}`, children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }) })
  ] });
}
function LeadCard({ lead, onOpen, isDragging, onDragStart, onDragEnd }) {
  const priorityTone = PRIORITY_BADGE[lead.priority] || "muted";
  return /* @__PURE__ */ jsx(
    "div",
    {
      draggable: true,
      onDragStart: (e) => {
        e.dataTransfer.setData("text/lead-id", lead.id);
        e.dataTransfer.effectAllowed = "move";
        onDragStart?.();
      },
      onDragEnd,
      className: `rounded-xl border border-rose-100 bg-white transition group ${isDragging ? "opacity-40 scale-[0.98]" : "hover:border-rose-300 hover:shadow-md"}`,
      children: /* @__PURE__ */ jsxs("button", { type: "button", onClick: onOpen, className: "w-full text-left p-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-slate-900 truncate group-hover:text-rose-800 transition", children: lead.name }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 truncate mt-0.5", children: lead.company })
          ] }),
          /* @__PURE__ */ jsx(Badge, { tone: priorityTone, children: lead.priority })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-rose-50", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-rose-700 tabular-nums", children: formatPipelineValue(lead.value) }),
          /* @__PURE__ */ jsx("span", { className: "text-[9px] font-medium text-slate-400", children: timeAgoShort(lead.updatedAt) })
        ] })
      ] })
    }
  );
}
function Pipeline() {
  const navigate = useNavigate();
  const location = useLocation();
  const [leads, setLeads] = useState(PIPELINE_LEADS);
  const [search, setSearch] = useState("");
  const [activeStage, setActiveStage] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [dragLeadId, setDragLeadId] = useState(null);
  const [dropStageId, setDropStageId] = useState(null);
  const columnRefs = useRef({});
  useEffect(() => {
    if (new URLSearchParams(location.search).get("action") === "addLead") {
      setAddOpen(true);
    }
  }, [location.search]);
  const showToast = (message, type = "success") => {
    if (type === "error") toast.error(message);
    else toast.success(message);
  };
  const handleAddClose = (newLead) => {
    if (newLead && typeof newLead === "object") {
      const pipelineLead = leadFromForm(newLead);
      setLeads((prev) => [pipelineLead, ...prev]);
      scrollToStage(pipelineLead.stage);
    }
    setAddOpen(false);
    if (new URLSearchParams(location.search).get("action") === "addLead") {
      navigate("/pipeline", { replace: true });
    }
  };
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter(
      (l) => l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q)
    );
  }, [leads, search]);
  const grouped = useMemo(() => groupLeadsByStage(filtered), [filtered]);
  const summary = useMemo(() => getPipelineSummary(filtered), [filtered]);
  const scrollToStage = (stageId) => {
    setActiveStage(stageId);
    columnRefs.current[stageId]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };
  const handleUpdateLead = (updated) => {
    setLeads((prev) => prev.map((l) => l.id === updated.id ? updated : l));
    setSelectedLead(updated);
  };
  const moveLeadToStage = (leadId, stageId, { scroll = true } = {}) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead || lead.stage === stageId) {
      if (scroll) scrollToStage(stageId);
      return;
    }
    const target = getStageMeta(stageId);
    const updated = patchLead(
      lead,
      { stage: stageId },
      `Moved to ${target.label}`,
      stageId === "closed_won" ? "won" : "note"
    );
    handleUpdateLead(updated);
    if (scroll) scrollToStage(stageId);
    toast.success(`Moved to ${target.label}`);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 page-shell min-w-0", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "p-4 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-2.5", children: [
        /* @__PURE__ */ jsx(MetricTile, { label: "Pipeline Leads", value: String(summary.total), icon: Kanban, iconBg: "bg-rose-50", iconColor: "text-rose-600" }),
        /* @__PURE__ */ jsx(MetricTile, { label: "Active Deals", value: String(summary.active), icon: Target, iconBg: "bg-sky-50", iconColor: "text-sky-600" }),
        /* @__PURE__ */ jsx(MetricTile, { label: "Hot Leads", value: String(summary.hot), icon: Flame, iconBg: "bg-amber-50", iconColor: "text-amber-600" }),
        /* @__PURE__ */ jsx(
          MetricTile,
          {
            label: "Pipeline Value",
            value: formatPipelineValue(summary.value),
            sub: `${summary.winRate}% won · closed rate`,
            icon: TrendingUp,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2.5 pt-1 border-t border-rose-50", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300 pointer-events-none" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Filter by name or company...",
              className: "w-full h-10 pl-9 pr-3 rounded-xl border border-rose-100 bg-white text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setAddOpen(true),
            className: "inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full bg-rose-700 text-white text-xs font-bold hover:bg-rose-800 shadow-sm shrink-0 transition",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
              "Add Lead"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto pb-0.5 scrollbar-thin -mx-1 px-1", children: PIPELINE_STAGES.map((stage) => {
        const count = grouped[stage.id]?.length ?? 0;
        const active = activeStage === stage.id;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => scrollToStage(stage.id),
            className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold border transition shrink-0 ${active ? "bg-rose-50 border-rose-400 text-rose-800 shadow-sm" : "bg-white border-rose-100 text-slate-600 hover:border-rose-200 hover:bg-rose-50/50"}`,
            children: [
              stage.label,
              /* @__PURE__ */ jsx("span", { className: `tabular-nums ${active ? "text-rose-600" : "text-slate-400"}`, children: count })
            ]
          },
          stage.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "p-3 sm:p-4 overflow-hidden", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mb-2.5 px-0.5", children: "Drag cards between columns · tap card for details" }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto pb-1 scrollbar-thin -mx-1 px-1 snap-x snap-mandatory", children: /* @__PURE__ */ jsx("div", { className: "flex gap-3 min-w-max", children: PIPELINE_STAGES.map((stage) => {
        const columnLeads = grouped[stage.id] || [];
        const isDropTarget = dropStageId === stage.id;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            ref: (el) => {
              columnRefs.current[stage.id] = el;
            },
            className: "w-[252px] shrink-0 snap-start flex flex-col",
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => scrollToStage(stage.id),
                  className: "flex items-center justify-between gap-2 mb-2.5 px-0.5 text-left hover:opacity-80 transition",
                  children: [
                    /* @__PURE__ */ jsx(Badge, { tone: stage.badgeTone, children: stage.label }),
                    /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-lg bg-rose-50 border border-rose-100 text-[10px] font-black text-rose-700 grid place-items-center tabular-nums", children: columnLeads.length })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  onDragOver: (e) => {
                    e.preventDefault();
                    setDropStageId(stage.id);
                  },
                  onDragLeave: () => setDropStageId(null),
                  onDrop: (e) => {
                    e.preventDefault();
                    setDropStageId(null);
                    setDragLeadId(null);
                    const id = e.dataTransfer.getData("text/lead-id");
                    if (id) moveLeadToStage(id, stage.id);
                  },
                  className: `rounded-xl border p-2 space-y-2 max-h-[calc(100dvh-400px)] min-h-[320px] overflow-y-auto overscroll-contain scrollbar-thin transition ${isDropTarget ? "border-rose-400 bg-rose-50/80 ring-2 ring-rose-200" : "border-rose-100 bg-[#fffbfb]/80"}`,
                  children: columnLeads.length === 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-dashed border-rose-200 bg-white/60 p-4 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-400", children: "Drop leads here" }) }) : columnLeads.map((lead) => /* @__PURE__ */ jsx(
                    LeadCard,
                    {
                      lead,
                      isDragging: dragLeadId === lead.id,
                      onOpen: () => setSelectedLead(lead),
                      onDragStart: () => setDragLeadId(lead.id),
                      onDragEnd: () => setDragLeadId(null)
                    },
                    lead.id
                  ))
                }
              )
            ]
          },
          stage.id
        );
      }) }) })
    ] }),
    /* @__PURE__ */ jsx(
      PipelineLeadDrawer,
      {
        open: !!selectedLead,
        onClose: () => setSelectedLead(null),
        lead: selectedLead,
        onUpdateLead: handleUpdateLead,
        onStageChange: scrollToStage
      }
    ),
    /* @__PURE__ */ jsx(
      AddLeadDrawer,
      {
        open: addOpen,
        onClose: handleAddClose,
        showToast,
        title: "New Lead",
        subtitle: "Add a lead directly to your pipeline board."
      }
    )
  ] });
}
export {
  Pipeline as default
};
