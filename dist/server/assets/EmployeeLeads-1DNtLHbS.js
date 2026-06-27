import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Users, ChevronDown, Shuffle, RefreshCw, Phone, MessageCircle, Mail, Clock, Sparkles, Kanban, Target, Flame, TrendingUp, Search, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { D as Drawer, G as GlassCard, B as Badge } from "./Primitives-CmGbnOU9.js";
import { A as AddLeadDrawer } from "./AddLeadDrawer-2QdzJ1Rt.js";
import { Z as useEmployee, L as LEAD_STATUS_LABELS, h as EMP_LEAD_TEMPERATURES, p as EMP_TEAM, O as groupEmpLeadsKanban, K as getEmpPipelineSummary, G as formatEmpPipelineValue, w as SEGMENT_WRAP, f as EMP_KANBAN_STAGES, S as SEGMENT_BTN, u as SEGMENT_BTN_ACTIVE, v as SEGMENT_BTN_INACTIVE, N as getEmpStageMeta, T as mapEmpLeadKanbanStage } from "./_-BNdSRMjW.js";
import { u as useIsMobile } from "./useIsMobile-DGoojBXP.js";
import { A as AvatarCircle, L as LeadStatusBadge, i as FormTextarea } from "./EmpUI-DSKHyseP.js";
import "framer-motion";
import "@tanstack/react-query";
import "react-dom";
const TEMPERATURE_BTN_ACTIVE = {
  hot: "bg-rose-100 border-rose-200 text-rose-800 shadow-sm",
  warm: "bg-amber-100 border-amber-200 text-amber-800 shadow-sm",
  cold: "bg-sky-100 border-sky-200 text-sky-800 shadow-sm"
};
function EmployeeLeadDrawer({ lead, onClose }) {
  if (!lead) return null;
  const navigate = useNavigate();
  const { calls = [], activities = {}, leads = [], setLeads, updateLeadTemperature, addActivityRecord } = useEmployee();
  const liveLead = useMemo(
    () => leads.find((l) => l.id === lead.id) || lead,
    [leads, lead]
  );
  const leadCalls = useMemo(() => {
    return calls.filter((c) => String(c.leadId) === String(liveLead.id));
  }, [calls, liveLead.id]);
  const leadActivities = useMemo(() => {
    return activities[liveLead.id] || [];
  }, [activities, liveLead.id]);
  const currentAssignee = liveLead.assignee || "Amit Kumar";
  const handleManualReassign = (newAssignee) => {
    setLeads(
      (prev) => prev.map((l) => l.id === liveLead.id ? { ...l, assignee: newAssignee } : l)
    );
    addActivityRecord(liveLead.id, {
      type: "meeting",
      text: `Lead manually reassigned to ${newAssignee} by Amit Kumar`,
      time: "Just now"
    });
    toast.success(`Assigned to ${newAssignee}`);
  };
  const handleAutoReassign = () => {
    const candidates = EMP_TEAM.filter((t) => t.name !== currentAssignee);
    if (candidates.length === 0) return;
    const randomChoice = candidates[Math.floor(Math.random() * candidates.length)];
    setLeads(
      (prev) => prev.map((l) => l.id === liveLead.id ? { ...l, assignee: randomChoice.name, status: "notpick", stage: "Not Pick" } : l)
    );
    addActivityRecord(liveLead.id, {
      type: "meeting",
      text: `Lead automatically reassigned to ${randomChoice.name} due to no pickup (Not Answered)`,
      time: "Just now"
    });
    toast.success(`Auto-reassigned to ${randomChoice.name}!`);
  };
  const handleSimulateCallNoAnswer = () => {
    toast.error("Call attempt: No Answer 🚫");
    setTimeout(() => {
      handleAutoReassign();
    }, 1200);
  };
  const handleTemperatureChange = (nextStatus) => {
    if (nextStatus === liveLead.status) return;
    const prevLabel = LEAD_STATUS_LABELS[liveLead.status] || liveLead.status;
    updateLeadTemperature(liveLead.id, nextStatus);
    addActivityRecord(liveLead.id, {
      type: "note",
      text: `Lead temperature changed from ${prevLabel} to ${LEAD_STATUS_LABELS[nextStatus]}`,
      time: "Just now"
    });
    toast.success(`Lead marked as ${LEAD_STATUS_LABELS[nextStatus]}`);
  };
  const isTemperatureStatus = ["hot", "warm", "cold"].includes(liveLead.status);
  return /* @__PURE__ */ jsx(Drawer, { open: !!lead, onClose, title: liveLead.name, children: /* @__PURE__ */ jsxs("div", { className: "space-y-5 animate-fade-in pb-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50/40 via-white to-rose-100/10 p-4 shadow-sm relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 w-20 h-20 bg-rose-500/5 rounded-full blur-xl pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx(AvatarCircle, { initials: liveLead.av, color: liveLead.color, size: 48 }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 font-semibold", children: liveLead.company }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-2", children: [
            !isTemperatureStatus && /* @__PURE__ */ jsx(LeadStatusBadge, { status: liveLead.status, label: LEAD_STATUS_LABELS[liveLead.status] }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "inline-flex gap-0.5 p-0.5 rounded-lg bg-white/90 border border-rose-100 shrink-0",
                role: "group",
                "aria-label": "Lead temperature",
                children: EMP_LEAD_TEMPERATURES.map(({ id, label }) => {
                  const active = liveLead.status === id;
                  return /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleTemperatureChange(id),
                      "aria-pressed": active,
                      className: `px-2.5 py-1 rounded-md text-[10px] font-bold border transition ${active ? TEMPERATURE_BTN_ACTIVE[id] : "bg-transparent border-transparent text-slate-500 hover:bg-rose-50/50 hover:text-slate-700"}`,
                      children: label
                    },
                    id
                  );
                })
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-[10px] font-bold text-rose-805", children: [
              "👤 ",
              currentAssignee
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: [
      { lbl: "Phone", val: liveLead.phone || "—" },
      { lbl: "Email", val: liveLead.email || "—" },
      { lbl: "Stage", val: liveLead.stage },
      { lbl: "Source", val: liveLead.source },
      { lbl: "Budget", val: liveLead.budget },
      { lbl: "Last Contact", val: liveLead.last },
      { lbl: "Owner/Assignee", val: currentAssignee },
      { lbl: "Services", val: liveLead.service || "—" },
      { lbl: "City", val: liveLead.city || "—" }
    ].map(({ lbl, val }) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-100 bg-[#fffbfb] p-3 shadow-[0_1px_2px_rgba(244,63,94,0.01)]", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold uppercase tracking-wider text-slate-400", children: lbl }),
      /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-slate-800 mt-1.5 truncate", children: val })
    ] }, lbl)) }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-rose-100 bg-[#fffbfb] p-4 space-y-3.5 shadow-sm", children: [
      /* @__PURE__ */ jsxs("h4", { className: "text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-rose-50 pb-2", children: [
        /* @__PURE__ */ jsx(Users, { className: "w-3.5 h-3.5 text-rose-500" }),
        " Lead Routing & Reassignment"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1", children: "Manual Reassign" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "select",
            {
              value: currentAssignee,
              onChange: (e) => handleManualReassign(e.target.value),
              className: "w-full h-9.5 pl-3.5 pr-10 rounded-xl border border-rose-100 bg-white text-xs font-bold text-slate-850 outline-none appearance-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition cursor-pointer",
              children: EMP_TEAM.map((t) => /* @__PURE__ */ jsxs("option", { value: t.name, children: [
                t.name,
                " ",
                t.name === "Amit Kumar" ? "(You)" : ""
              ] }, t.name))
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400", children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-3.5 h-3.5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-2 border-t border-rose-50 space-y-2.5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-lg bg-amber-50 text-amber-600 grid place-items-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(Shuffle, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10.5px] font-bold text-slate-700 leading-tight", children: "No Pickup Auto-Routing" }),
            /* @__PURE__ */ jsx("p", { className: "text-[9.5px] text-slate-400 leading-normal mt-0.5 font-medium", children: "If lead does not answer, automatically transfer ownership to the next available agent to maximize calling efficiency." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: handleAutoReassign,
              className: "flex-1 py-2 rounded-xl bg-white border border-rose-200 text-[10.5px] font-bold text-slate-700 hover:bg-rose-50/30 hover:border-rose-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm",
              children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-3.5 h-3.5 text-rose-500" }),
                "Auto-Route Now"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: handleSimulateCallNoAnswer,
              className: "flex-1 py-2 rounded-xl bg-rose-50 border border-rose-200 text-[10.5px] font-bold text-rose-800 hover:bg-rose-100/50 hover:border-rose-350 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm",
              children: [
                /* @__PURE__ */ jsx(Phone, { className: "w-3.5 h-3.5" }),
                "Trigger Call No-Answer"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            onClose();
            navigate(`/employee/call-assistant?lead=${encodeURIComponent(liveLead.name)}`);
          },
          className: "flex-1 h-10 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition shadow-[0_4px_12px_rgba(220,38,38,0.2)] flex items-center justify-center gap-1.5 cursor-pointer",
          children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 fill-white" }),
            " Call"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => toast.success(`WhatsApp chat opened for ${liveLead.name}`),
          className: "flex-1 h-10 rounded-xl bg-white border border-rose-200 hover:bg-rose-50/30 hover:border-rose-300 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_1px_2px_rgba(244,63,94,0.01)]",
          children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "w-4 h-4 text-rose-500" }),
            " WhatsApp"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => toast.success(`Email draft created for ${liveLead.name}`),
          className: "flex-1 h-10 rounded-xl bg-white border border-rose-200 hover:bg-rose-50/30 hover:border-rose-300 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_1px_2px_rgba(244,63,94,0.01)]",
          children: [
            /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 text-rose-500" }),
            " Email"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-rose-100 bg-[#fffbfb] p-4 space-y-2 shadow-[0_1px_2px_rgba(244,63,94,0.01)]", children: [
      /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-450 uppercase tracking-wider flex items-center gap-1", children: "✍️ Add Quick Call Notes" }),
      /* @__PURE__ */ jsx(FormTextarea, { rows: 3, placeholder: "Add call notes...", className: "!rounded-xl border-rose-100/60 focus:border-rose-400" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-rose-100 bg-[#fffbfb] p-4.5 space-y-3 shadow-sm", children: [
      /* @__PURE__ */ jsxs("h4", { className: "text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-rose-50 pb-2", children: [
        /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-rose-505" }),
        " Recorded Call Logs & MoM"
      ] }),
      leadCalls.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-450 italic pl-1 py-1", children: "No call logs registered for this lead." }) : /* @__PURE__ */ jsx("div", { className: "space-y-2.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin", children: leadCalls.map((c) => {
        const isIncoming = c.type === "in";
        const isMissed = c.type === "miss";
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              onClose();
              navigate(`/employee/call-detail?id=${c.id}`);
            },
            className: "w-full text-left flex items-start justify-between gap-2.5 p-3 rounded-xl border border-rose-100 bg-white hover:bg-rose-50/50 hover:border-rose-350 transition-all cursor-pointer shadow-[0_1px_3px_rgba(244,63,94,0.01)]",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                  /* @__PURE__ */ jsx("span", { className: `text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${isIncoming ? "bg-emerald-50 text-emerald-700" : isMissed ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}`, children: isIncoming ? "Inbound" : isMissed ? "Missed" : "Outbound" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400 font-semibold", children: c.date })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-800 truncate mt-2", children: c.outcome }),
                c.note && /* @__PURE__ */ jsxs("p", { className: "text-[9.5px] text-rose-800 font-bold mt-1.5 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-rose-600 animate-pulse" }),
                  " View AI MoM & SOP Checklist"
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[10.5px] font-black text-slate-750 shrink-0 bg-white border border-rose-100 px-1.5 py-0.5 rounded tabular-nums", children: c.duration })
            ]
          },
          c.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-rose-100 bg-[#fffbfb] p-4.5 space-y-3 shadow-sm", children: [
      /* @__PURE__ */ jsxs("h4", { className: "text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-rose-50 pb-2", children: [
        /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-rose-505" }),
        " Activity History"
      ] }),
      leadActivities.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-450 italic pl-1 py-1", children: "No activities logged yet." }) : /* @__PURE__ */ jsx("div", { className: "space-y-2.5 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin", children: leadActivities.map((a, idx) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5 py-2.5 border-b border-rose-50 last:border-0 items-start", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-slate-750 leading-snug", children: a.text }),
          /* @__PURE__ */ jsxs("p", { className: "text-[9.5px] text-slate-450 font-bold mt-0.5 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3 text-slate-400" }),
            " ",
            a.time
          ] })
        ] })
      ] }, idx)) })
    ] })
  ] }) });
}
function MetricTile({ label, value, sub, icon: Icon, iconBg, iconColor }) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg sm:rounded-xl border border-rose-100 bg-white/90 p-2.5 sm:p-3 flex items-center justify-between gap-1.5 sm:gap-2 min-h-[68px] sm:min-h-[72px]", children: [
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-tight", children: label }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-xl font-black text-slate-900 mt-0.5 tabular-nums leading-none", children: value }),
      sub && /* @__PURE__ */ jsx("p", { className: "text-[8px] sm:text-[9px] font-bold text-emerald-600 mt-0.5 leading-tight line-clamp-1", children: sub })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl grid place-items-center shrink-0 ${iconBg} ${iconColor}`, children: /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" }) })
  ] });
}
function LeadCard({ lead, onOpen, isDragging, onDragStart, onDragEnd }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      draggable: true,
      onDragStart: (e) => {
        e.dataTransfer.setData("text/lead-id", String(lead.id));
        e.dataTransfer.effectAllowed = "move";
        onDragStart?.();
      },
      onDragEnd,
      className: `rounded-xl border border-rose-100 bg-white transition group shrink-0 w-[min(72vw,200px)] sm:w-full sm:shrink snap-start ${isDragging ? "opacity-40 scale-[0.98]" : "hover:border-rose-300 hover:shadow-md"}`,
      children: /* @__PURE__ */ jsxs("button", { type: "button", onClick: onOpen, className: "w-full text-left p-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-slate-900 truncate group-hover:text-rose-800 transition", children: lead.name }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 truncate mt-0.5", children: lead.company })
          ] }),
          /* @__PURE__ */ jsx(LeadStatusBadge, { status: lead.status, label: LEAD_STATUS_LABELS[lead.status] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-rose-50", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-rose-700 tabular-nums", children: lead.budget }),
          /* @__PURE__ */ jsx("span", { className: "text-[9px] font-medium text-slate-400", children: lead.last })
        ] })
      ] })
    }
  );
}
function EmployeeLeads() {
  const { leads, addLead, updateLeadStage } = useEmployee();
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get("filter");
  const [search, setSearch] = useState("");
  const [activeStage, setActiveStage] = useState(null);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(searchParams.get("action") === "add");
  const [dragLeadId, setDragLeadId] = useState(null);
  const [dropStageId, setDropStageId] = useState(null);
  const columnRefs = useRef({});
  useEffect(() => {
    if (searchParams.get("action") === "add") setModalOpen(true);
  }, [searchParams]);
  const baseLeads = useMemo(() => {
    if (!statusFilter || statusFilter === "all") return leads;
    return leads.filter((l) => l.status === statusFilter);
  }, [leads, statusFilter]);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return baseLeads;
    return baseLeads.filter(
      (l) => l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q) || l.source.toLowerCase().includes(q)
    );
  }, [baseLeads, search]);
  const grouped = useMemo(() => groupEmpLeadsKanban(filtered), [filtered]);
  const summary = useMemo(() => getEmpPipelineSummary(filtered), [filtered]);
  const scrollToStage = (stageId) => {
    setActiveStage(stageId);
    columnRefs.current[stageId]?.scrollIntoView({
      behavior: "smooth",
      inline: isMobile ? "nearest" : "start",
      block: isMobile ? "start" : "nearest"
    });
  };
  const moveLeadToStage = (leadId, stageId, { scroll = true } = {}) => {
    const lead = leads.find((l) => l.id === Number(leadId) || l.id === leadId);
    if (!lead) return;
    const target = getEmpStageMeta(stageId);
    const currentStageId = mapEmpLeadKanbanStage(lead.stage, lead.status);
    if (currentStageId === stageId) {
      if (scroll) scrollToStage(stageId);
      return;
    }
    updateLeadStage(lead.id, target.label);
    if (scroll) scrollToStage(stageId);
    toast.success(`Moved to ${target.label}`);
  };
  const closeModal = () => {
    setModalOpen(false);
    if (searchParams.get("action") === "add") {
      setSearchParams({}, { replace: true });
    }
  };
  const handleAddClose = (newLead) => {
    if (newLead && typeof newLead === "object") {
      const lead = addLead(newLead);
      toast.success(`${lead.name} added to pipeline`);
      scrollToStage(mapEmpLeadKanbanStage(lead.stage, lead.status));
    }
    closeModal();
  };
  const showToast = (message, type = "success") => {
    if (type === "error") toast.error(message);
    else toast.success(message);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4 page-shell min-w-0 animate-fade-in", children: [
    /* @__PURE__ */ jsxs(GlassCard, { className: "p-3 sm:p-4 space-y-3 sm:space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-2.5", children: [
        /* @__PURE__ */ jsx(MetricTile, { label: "Pipeline Leads", value: String(summary.total), icon: Kanban, iconBg: "bg-rose-50", iconColor: "text-rose-600" }),
        /* @__PURE__ */ jsx(MetricTile, { label: "Active Deals", value: String(summary.active), icon: Target, iconBg: "bg-sky-50", iconColor: "text-sky-600" }),
        /* @__PURE__ */ jsx(MetricTile, { label: "Hot Leads", value: String(summary.hot), icon: Flame, iconBg: "bg-amber-50", iconColor: "text-amber-600" }),
        /* @__PURE__ */ jsx(
          MetricTile,
          {
            label: "Pipeline Value",
            value: formatEmpPipelineValue(summary.value),
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
              placeholder: "Filter by name, company, or source...",
              className: "w-full h-10 pl-9 pr-3 rounded-xl border border-rose-100 bg-white text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setModalOpen(true),
            className: "inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full bg-rose-700 text-white text-xs font-bold hover:bg-rose-800 shadow-sm shrink-0 transition",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
              "Add Lead"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: `${SEGMENT_WRAP} w-full -mx-0.5`, children: EMP_KANBAN_STAGES.map((stage) => {
        const count = grouped[stage.id]?.length ?? 0;
        const active = activeStage === stage.id;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => scrollToStage(stage.id),
            className: `flex items-center gap-1 ${SEGMENT_BTN} ${active ? SEGMENT_BTN_ACTIVE : SEGMENT_BTN_INACTIVE}`,
            children: [
              /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: stage.label.split(" ")[0] }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: stage.label }),
              /* @__PURE__ */ jsx("span", { className: `tabular-nums ${active ? "text-rose-600" : "text-slate-400"}`, children: count })
            ]
          },
          stage.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "p-3 sm:p-4 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-slate-400 mb-2.5 px-0.5", children: [
        /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Each stage is a row · swipe cards horizontally · tap for details" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Drag cards between columns · tap card for details" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "sm:hidden space-y-4", children: EMP_KANBAN_STAGES.map((stage) => {
        const columnLeads = grouped[stage.id] || [];
        const isDropTarget = dropStageId === stage.id;
        return /* @__PURE__ */ jsxs(
          "section",
          {
            ref: (el) => {
              columnRefs.current[stage.id] = el;
            },
            className: "min-w-0",
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => scrollToStage(stage.id),
                  className: "flex items-center justify-between gap-2 mb-2 px-0.5 text-left w-full hover:opacity-80 transition",
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
                  className: `rounded-xl border p-2 transition ${isDropTarget ? "border-rose-400 bg-rose-50/80 ring-2 ring-rose-200" : "border-rose-100 bg-[#fffbfb]/80"} flex flex-row gap-2 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-thin min-h-[108px] -mx-0.5 px-0.5`,
                  children: columnLeads.length === 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-dashed border-rose-200 bg-white/60 p-4 text-center shrink-0 w-[min(72vw,200px)] min-h-[88px] flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-400", children: "No leads here" }) }) : columnLeads.map((lead) => /* @__PURE__ */ jsx(
                    LeadCard,
                    {
                      lead,
                      isDragging: dragLeadId === lead.id,
                      onOpen: () => setSelected(lead),
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
      }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden sm:block overflow-x-auto pb-1 scrollbar-thin -mx-1 px-1 snap-x snap-mandatory", children: /* @__PURE__ */ jsx("div", { className: "flex gap-3 min-w-max", children: EMP_KANBAN_STAGES.map((stage) => {
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
                      onOpen: () => setSelected(lead),
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
      AddLeadDrawer,
      {
        open: modalOpen,
        onClose: handleAddClose,
        showToast,
        title: "New Lead",
        subtitle: "Add a lead directly to your pipeline board."
      }
    ),
    /* @__PURE__ */ jsx(EmployeeLeadDrawer, { lead: selected, onClose: () => setSelected(null) })
  ] });
}
export {
  EmployeeLeads as default
};
