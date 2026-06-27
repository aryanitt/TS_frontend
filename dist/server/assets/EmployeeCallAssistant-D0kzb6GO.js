import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { G as GlassCard, B as Badge, D as Drawer } from "./Primitives-CmGbnOU9.js";
import { Z as useEmployee, U as notifyCallStarted, h as EMP_LEAD_TEMPERATURES } from "./_-BNdSRMjW.js";
import { u as useIsMobile } from "./useIsMobile-DGoojBXP.js";
import { c as ChooseLeadPanel, b as BtnSecondary, d as EmpModal } from "./EmpUI-DSKHyseP.js";
import { Play, PhoneOff, Clock, Search, Star, BookOpen, ChevronDown, CheckCircle2, Check, MessageSquare, DollarSign, Shield, ArrowRight, RotateCcw, User, Copy, Info, AlertTriangle, Sparkles } from "lucide-react";
import "framer-motion";
import "@tanstack/react-query";
import "react-dom";
function SopStepCTA({ steps, activeStepIndex, onStepChange, isMobile, completionPercentage, sopTitle, embedded = false, desktopBar = false }) {
  if (!steps?.length) return null;
  const pillClass = (isCompleted, isActive) => {
    if (isActive) return "bg-rose-700 border-rose-700 text-white shadow-sm";
    if (isCompleted) return "bg-rose-50 border-rose-200 text-rose-800";
    return "bg-white border-slate-100 text-slate-500 hover:border-rose-200 hover:bg-rose-50/30";
  };
  const stepPillsDesktop = /* @__PURE__ */ jsx(
    "div",
    {
      className: "grid gap-1.5 w-full min-w-0",
      style: { gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` },
      children: steps.map((step, idx) => {
        const isCompleted = idx < activeStepIndex;
        const isActive = idx === activeStepIndex;
        return /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => onStepChange(idx),
            className: `${desktopBar ? "h-9" : "h-10"} flex items-center justify-center min-w-0 text-center px-1.5 rounded-xl border text-[10px] font-bold transition ${pillClass(isCompleted, isActive)}`,
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-1 w-full min-w-0", children: [
              isCompleted && /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 text-rose-700 shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "truncate leading-tight", children: step.label })
            ] })
          },
          step.id
        );
      })
    }
  );
  if (desktopBar) {
    return /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 flex flex-col justify-center py-0.5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 mb-1.5 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0", children: "Call Stages" }),
          sopTitle && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-200 shrink-0", "aria-hidden": "true", children: "|" }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-slate-700 truncate", children: sopTitle })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-black text-rose-600 tabular-nums shrink-0", children: [
          activeStepIndex + 1,
          "/",
          steps.length,
          /* @__PURE__ */ jsxs("span", { className: "text-slate-400 font-semibold", children: [
            " · ",
            completionPercentage,
            "%"
          ] })
        ] })
      ] }),
      stepPillsDesktop
    ] });
  }
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mb-2 min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[9px] sm:text-[10px] font-black uppercase text-slate-400 tracking-wider", children: "Call Stages" }),
        sopTitle && /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-[11px] font-semibold text-slate-600 truncate mt-0.5", children: sopTitle })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-black text-rose-600 tabular-nums shrink-0", children: [
        activeStepIndex + 1,
        "/",
        steps.length,
        /* @__PURE__ */ jsxs("span", { className: "hidden sm:inline text-slate-400 font-semibold", children: [
          " · ",
          completionPercentage,
          "%"
        ] })
      ] })
    ] }),
    isMobile ? /* @__PURE__ */ jsx("div", { className: "flex gap-1 overflow-x-auto scrollbar-none pb-0.5 -mx-0.5 px-0.5", children: steps.map((step, idx) => {
      const isCompleted = idx < activeStepIndex;
      const isActive = idx === activeStepIndex;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onStepChange(idx),
          className: `shrink-0 min-w-[4.5rem] h-9 flex flex-col items-center justify-center gap-0.5 px-2 rounded-lg border text-[9px] font-bold transition ${pillClass(isCompleted, isActive)}`,
          children: [
            isCompleted && /* @__PURE__ */ jsx(Check, { className: "w-2.5 h-2.5 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "truncate max-w-[5.5rem] leading-tight", children: step.label.split(" ")[0] })
          ]
        },
        step.id
      );
    }) }) : stepPillsDesktop,
    isMobile && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0 mt-2", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 h-1.5 bg-rose-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-300",
          style: { width: `${completionPercentage}%` }
        }
      ) }),
      /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-black text-rose-700 tabular-nums shrink-0", children: [
        completionPercentage,
        "%"
      ] })
    ] })
  ] });
  if (embedded) {
    return /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1 lg:flex lg:flex-col lg:justify-center", children: content });
  }
  return /* @__PURE__ */ jsx("div", { className: "rounded-xl sm:rounded-2xl border border-rose-100/60 bg-white p-2.5 sm:p-3 shadow-sm min-w-0", children: content });
}
function EmployeeCallAssistant() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const urlLead = searchParams.get("lead");
  const urlSop = searchParams.get("sop");
  const { leads, addCallRecord, addActivityRecord, sops } = useEmployee();
  const [selectedSopId, setSelectedSopId] = useState(1);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [leadName, setLeadName] = useState(urlLead || "");
  const [repName, setRepName] = useState("Amit Kumar");
  const [favorites, setFavorites] = useState([1]);
  const [recentlyUsed, setRecentlyUsed] = useState([1, 2]);
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedObjectionIndex, setSelectedObjectionIndex] = useState(0);
  const [generalNotes, setGeneralNotes] = useState("");
  const [discoveryAnswers, setDiscoveryAnswers] = useState({});
  const [callDuration, setCallDuration] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1e3);
    return () => clearInterval(timer);
  }, []);
  const formatDuration = (totalSecs) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };
  const [isEndingCall, setIsEndingCall] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [aiMoM, setAiMoM] = useState("");
  const [callOutcome, setCallOutcome] = useState("Discovery complete");
  const [callRating, setCallRating] = useState(5);
  const [callLeadTemp, setCallLeadTemp] = useState("warm");
  const [sopPickerOpen, setSopPickerOpen] = useState(false);
  const matchedLead = useMemo(() => {
    return leads.find((l) => l.name.toLowerCase() === leadName.toLowerCase());
  }, [leads, leadName]);
  const companyName = matchedLead ? matchedLead.company : "TechSales Lead";
  const handleEndCallClick = () => {
    if (matchedLead?.status && ["hot", "warm", "cold"].includes(matchedLead.status)) {
      setCallLeadTemp(matchedLead.status);
    }
    setIsEndingCall(true);
    setIsGeneratingSummary(true);
    setTimeout(() => {
      const completedQuestionsText = activeSop.steps.flatMap((step) => step.questions).filter((q) => checkedQuestions[`${selectedSopId}-${q.id}`]).map((q) => `• Verified Checklist: ${q.text}`).join("\n");
      const discoveryNotesText = Object.entries(discoveryAnswers).filter(([key]) => key.startsWith(`${selectedSopId}-`)).map(([key, val]) => {
        const fieldKey = key.replace(`${selectedSopId}-`, "");
        const label = fieldKey.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        return `• ${label}: ${val}`;
      }).join("\n");
      const summaryText = `[AI SUMMARY & MINUTES OF MEETING]
Call Date: ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-IN")} at ${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
SOP Guidance Used: ${activeSop.title} (${activeSop.category})
Rep: ${repName} | Client Lead: ${leadName} (${companyName})
Call Duration: ${formatDuration(callDuration)}

Key Discussed Points & Qualifications Met:
${completedQuestionsText || "• No standard qualification checklist checked during call."}

Discovery Parameters Captured:
${discoveryNotesText || "• No specific discovery notes registered."}

Rep Custom Call Notes:
"${generalNotes || "No custom notes recorded."}"

Budget Bracket Assessment:
• Confirmed Budget: ${selectedBudget || "Standard SOP limits (" + activeSop.budgetRange + ")"}

AI Insights & Follow-up Actions:
• Pitch Urgency: ${completionPercentage > 60 ? "HIGH" : completionPercentage > 20 ? "MODERATE" : "LOW"} (Target checklist completed: ${completionPercentage}%)
• Next Steps: ${activeStepIndex === activeSop.steps.length - 1 ? "Schedule kickoff call." : "Schedule follow-up to address subsequent checklist stages."}`;
      setAiMoM(summaryText);
      setIsGeneratingSummary(false);
    }, 2500);
  };
  const handleSaveCallToLogs = () => {
    const callId = Date.now();
    const newCallLog = {
      id: callId,
      leadId: matchedLead ? matchedLead.id : 1,
      name: leadName,
      company: companyName,
      duration: formatDuration(callDuration),
      type: "out",
      date: "Today " + (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      period: "today",
      outcome: callOutcome,
      hasRec: true,
      rating: callRating,
      mood: callLeadTemp,
      phone: matchedLead ? matchedLead.phone : `+91 ${Math.floor(6e9 + Math.random() * 4e9)}`,
      note: aiMoM,
      sopId: selectedSopId,
      checkedQuestions
    };
    addCallRecord(newCallLog);
    addActivityRecord(newCallLog.leadId, {
      type: "call",
      text: `Outbound Call — ${callOutcome} (${formatDuration(callDuration)})`,
      time: "Just now"
    });
    if (aiMoM) {
      addActivityRecord(newCallLog.leadId, {
        type: "note",
        text: `AI Call Minutes of Meeting auto-summarized & logged by ${repName}.`,
        time: "Just now"
      });
    }
    toast.success("Call saved to Reporting database!");
    setIsEndingCall(false);
    navigate("/employee/calls");
  };
  const activeSop = useMemo(() => {
    if (!sops.length) return null;
    return sops.find((s) => s.id === selectedSopId) || sops[0];
  }, [selectedSopId, sops]);
  useEffect(() => {
    if (sops.length && !sops.some((s) => s.id === selectedSopId)) {
      setSelectedSopId(sops[0].id);
    }
  }, [sops, selectedSopId]);
  useEffect(() => {
    if (!urlSop || !sops.length) return;
    const id = Number(urlSop);
    const match = sops.find((s) => s.id === id || String(s.id) === urlSop);
    if (match) setSelectedSopId(match.id);
  }, [urlSop, sops]);
  const sopCategories = useMemo(
    () => ["All", ...Array.from(new Set(sops.map((s) => s.category).filter(Boolean)))],
    [sops]
  );
  const activeStep = useMemo(() => {
    if (!activeSop || !activeSop.steps) return null;
    return activeSop.steps[activeStepIndex] || activeSop.steps[0];
  }, [activeSop, activeStepIndex]);
  const completionPercentage = useMemo(() => {
    if (!activeSop || !activeSop.steps) return 0;
    const allQs = activeSop.steps.reduce((acc, step) => [...acc, ...step.questions], []);
    if (allQs.length === 0) return 0;
    const checkedCount = allQs.filter((q) => !!checkedQuestions[`${selectedSopId}-${q.id}`]).length;
    return Math.round(checkedCount / allQs.length * 100);
  }, [activeSop, checkedQuestions, selectedSopId]);
  const filteredSops = useMemo(() => {
    return sops.filter((s) => {
      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.sub.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "All" || s.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [sops, searchQuery, categoryFilter]);
  const notifiedLeadRef = useRef(null);
  useEffect(() => {
    if (!urlLead || notifiedLeadRef.current === urlLead) return;
    notifiedLeadRef.current = urlLead;
    setLeadName(urlLead);
    notifyCallStarted(urlLead);
  }, [urlLead]);
  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(
      (prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    toast.success(favorites.includes(id) ? "Removed from Favorites" : "Added to Favorites");
  };
  const handleSopSelect = (id) => {
    setSelectedSopId(id);
    setActiveStepIndex(0);
    setSelectedBudget(null);
    setSopPickerOpen(false);
    if (!recentlyUsed.includes(id)) {
      setRecentlyUsed((prev) => [id, ...prev.slice(0, 3)]);
    }
    toast.success(`Loaded SOP: ${sops.find((s) => s.id === id)?.title}`);
  };
  const handleQuestionToggle = (qId) => {
    const key = `${selectedSopId}-${qId}`;
    setCheckedQuestions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const handleStepChange = (index) => {
    if (index >= 0 && index < activeSop.steps.length) {
      setActiveStepIndex(index);
    }
  };
  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    toast.success("Script copied to clipboard!");
  };
  const formatScriptText = (text) => {
    if (!text) return "";
    return text.replace(/{leadName}/g, leadName || "Lead").replace(/{repName}/g, repName || "Rep");
  };
  const handleDiscoveryChange = (key, value) => {
    setDiscoveryAnswers((prev) => ({
      ...prev,
      [`${selectedSopId}-${key}`]: value
    }));
  };
  const handleSaveNotes = () => {
    toast.success("Notes & Discovery saved to CRM local memory");
  };
  if (!activeSop) {
    return /* @__PURE__ */ jsx("div", { className: "page-shell min-w-0 p-4 text-sm text-slate-500", children: "No SOP guides available." });
  }
  const needsLeadPick = Boolean(urlSop && !urlLead);
  if (needsLeadPick) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-4 page-shell min-w-0 animate-fade-in pb-10 max-w-lg mx-auto", children: [
      /* @__PURE__ */ jsxs(GlassCard, { className: "p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-base sm:text-lg font-display font-bold text-slate-900", children: "Choose a lead" }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-slate-500 mt-1", children: [
          "Select who you want to call using ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-700", children: activeSop.title })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(GlassCard, { className: "p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx(
          ChooseLeadPanel,
          {
            leads,
            onSelect: (lead) => {
              navigate(
                `/employee/call-assistant?sop=${urlSop}&lead=${encodeURIComponent(lead.name)}`,
                { replace: true }
              );
            }
          }
        ),
        /* @__PURE__ */ jsx(BtnSecondary, { onClick: () => navigate(-1), className: "w-full mt-4 !rounded-xl", children: "Cancel" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4 page-shell min-w-0 animate-fade-in pb-6 sm:pb-10 relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-20 rounded-xl sm:rounded-2xl border border-rose-100/60 bg-white p-2.5 sm:p-3.5 shadow-sm min-w-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 min-w-0 lg:hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 min-w-0 pb-3 border-b border-rose-50", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 min-w-0 flex-1", children: [
              /* @__PURE__ */ jsx(Play, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600 shrink-0" }),
              /* @__PURE__ */ jsx("h1", { className: "text-xs sm:text-sm font-bold text-slate-800 truncate", children: "Call Assistant" })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono text-[10px] sm:text-[11px] text-rose-700 font-extrabold bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100/70 tracking-wider shrink-0 tabular-nums", children: [
              "⏱ ",
              formatDuration(callDuration)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[9px] sm:text-[10px] font-bold border border-emerald-200 shrink-0", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" }),
              " Connected"
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: handleEndCallClick,
                className: "inline-flex items-center justify-center gap-1 px-3 h-8 sm:h-9 rounded-lg sm:rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-[11px] sm:text-xs font-bold transition shadow-sm active:scale-95 shrink-0 ml-auto",
                children: [
                  /* @__PURE__ */ jsx(PhoneOff, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsx("span", { children: "End Call" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          SopStepCTA,
          {
            embedded: true,
            steps: activeSop.steps,
            activeStepIndex,
            onStepChange: handleStepChange,
            isMobile,
            completionPercentage,
            sopTitle: activeSop.title
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex lg:items-center lg:gap-5 xl:gap-6 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 xl:gap-3 shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Play, { className: "w-4 h-4 text-rose-600" }) }),
            /* @__PURE__ */ jsx("h1", { className: "text-sm font-bold text-slate-800 whitespace-nowrap", children: "Call Assistant Workspace" })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 shrink-0", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500" }),
            " Connected"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 font-mono text-[11px] text-rose-700 font-extrabold bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100/70 tracking-wider tabular-nums shrink-0", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-rose-500" }),
            formatDuration(callDuration)
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: handleEndCallClick,
              className: "inline-flex items-center justify-center gap-1.5 px-4 h-9 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-sm hover:shadow-md active:scale-[0.98] shrink-0",
              children: [
                /* @__PURE__ */ jsx(PhoneOff, { className: "w-3.5 h-3.5" }),
                "End Call"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-px self-stretch bg-gradient-to-b from-transparent via-rose-100 to-transparent shrink-0", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx(
          SopStepCTA,
          {
            desktopBar: true,
            steps: activeSop.steps,
            activeStepIndex,
            onStepChange: handleStepChange,
            isMobile: false,
            completionPercentage,
            sopTitle: activeSop.title
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-12 gap-3 sm:gap-4 md:gap-5 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "xl:col-span-3 space-y-3 sm:space-y-4 order-2 xl:order-1 min-w-0", children: [
        /* @__PURE__ */ jsxs(GlassCard, { className: "hidden sm:block p-3 sm:p-4 space-y-2.5 sm:space-y-3", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-3.5 h-3.5 text-rose-500" }),
            " Search SOP Library"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Search scripts & guides...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-350 transition"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 pt-1", children: sopCategories.map((cat) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setCategoryFilter(cat),
              className: `px-3 py-1.5 rounded-lg text-[10px] font-bold border transition ${categoryFilter === cat ? "bg-rose-700 text-white border-rose-700 shadow-sm" : "bg-white text-slate-600 border-rose-100 hover:border-rose-200 hover:bg-rose-50"}`,
              children: cat
            },
            cat
          )) })
        ] }),
        /* @__PURE__ */ jsxs(GlassCard, { className: "hidden sm:block p-3 sm:p-4 space-y-2.5 sm:space-y-3", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: "Guides & SOPs" }),
            /* @__PURE__ */ jsxs("span", { className: "text-[10px] px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-600 font-bold border border-rose-100", children: [
              filteredSops.length,
              " of ",
              sops.length
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2 max-h-[min(280px,calc(100dvh-360px))] sm:max-h-[min(420px,calc(100dvh-320px))] overflow-y-auto pr-1 scrollbar-thin", children: filteredSops.map((sop) => {
            const isActive = sop.id === selectedSopId;
            const isFav = favorites.includes(sop.id);
            return /* @__PURE__ */ jsxs(
              "div",
              {
                onClick: () => handleSopSelect(sop.id),
                className: `w-full text-left rounded-xl border p-2.5 transition cursor-pointer flex items-center justify-between gap-2 group ${isActive ? "border-rose-500 bg-rose-50/50" : "border-slate-100 bg-white hover:border-rose-200"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-base shrink-0", children: sop.icon }),
                    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-850 truncate group-hover:text-rose-700 transition", children: sop.title }),
                      /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-slate-400 truncate mt-0.5", children: [
                        sop.category,
                        " · ",
                        sop.duration
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => toggleFavorite(sop.id, e),
                      className: "p-1 rounded-lg hover:bg-rose-100/50 text-slate-300 hover:text-amber-500 transition shrink-0",
                      children: /* @__PURE__ */ jsx(Star, { className: `w-3.5 h-3.5 ${isFav ? "fill-amber-400 text-amber-400" : ""}` })
                    }
                  )
                ]
              },
              sop.id
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs(GlassCard, { className: "hidden md:block p-3 sm:p-4 space-y-2.5 sm:space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h4", { className: "text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Star, { className: "w-3.5 h-3.5 text-amber-500 fill-amber-500" }),
              " Favorite Guides"
            ] }),
            favorites.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 italic", children: "No favorites starred." }) : /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: favorites.map((favId) => {
              const item = sops.find((s) => s.id === favId);
              if (!item) return null;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleSopSelect(favId),
                  className: "w-full text-left text-xs font-semibold text-slate-650 hover:text-rose-700 truncate block py-0.5",
                  children: [
                    "★ ",
                    item.title
                  ]
                },
                favId
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-rose-100 pt-3", children: [
            /* @__PURE__ */ jsxs("h4", { className: "text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-rose-500" }),
              " Recently Active"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: recentlyUsed.map((recentId) => {
              const item = sops.find((s) => s.id === recentId);
              if (!item) return null;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleSopSelect(recentId),
                  className: "w-full text-left text-[11px] text-slate-650 hover:text-rose-700 truncate block",
                  children: [
                    "⏳ ",
                    item.title
                  ]
                },
                recentId
              );
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(GlassCard, { className: "hidden sm:block p-4 bg-gradient-to-br from-rose-50/50 to-rose-100/20 border border-rose-100", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase text-rose-700 tracking-wider", children: "Checklist Progress" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-black text-rose-800", children: [
              completionPercentage,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-rose-100 rounded-full h-2 mb-2", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "bg-gradient-to-r from-rose-500 to-rose-600 h-2 rounded-full transition-all duration-300",
              style: { width: `${completionPercentage}%` }
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 leading-tight", children: "Complete qualification questions across all steps to increase score." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "xl:col-span-5 space-y-3 sm:space-y-4 min-w-0 order-1 xl:order-2", children: [
        /* @__PURE__ */ jsx(GlassCard, { className: "p-2.5 sm:p-5 space-y-3 sm:space-y-4 min-w-0 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 sm:gap-3 border-b border-rose-50 pb-3 sm:pb-4 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 sm:gap-3 min-w-0", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 grid place-items-center text-white text-base sm:text-lg shrink-0", children: activeSop.icon }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-sm sm:text-base font-black text-slate-900 leading-tight line-clamp-2", children: activeSop.title }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-slate-500 mt-0.5 line-clamp-2", children: activeSop.sub })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSopPickerOpen(true),
                className: "sm:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 text-[10px] font-bold shrink-0 active:scale-95 transition",
                children: [
                  /* @__PURE__ */ jsx(BookOpen, { className: "w-3.5 h-3.5" }),
                  "Change",
                  /* @__PURE__ */ jsx(ChevronDown, { className: "w-3 h-3 opacity-70" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 min-w-0", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[7px] sm:hidden font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border bg-rose-50 text-rose-700 border-rose-100", children: activeSop.category }),
            /* @__PURE__ */ jsx("span", { className: "text-[7px] sm:hidden font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-100 truncate max-w-full", children: activeSop.budgetRange }),
            /* @__PURE__ */ jsxs("span", { className: "text-[7px] sm:hidden font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border bg-sky-50 text-sky-700 border-sky-100", children: [
              activeSop.steps.length,
              " steps"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "hidden sm:flex flex-wrap gap-1.5", children: [
              /* @__PURE__ */ jsx(Badge, { tone: "primary", children: activeSop.category }),
              /* @__PURE__ */ jsxs(Badge, { tone: "success", children: [
                "Budget: ",
                activeSop.budgetRange
              ] }),
              /* @__PURE__ */ jsxs(Badge, { tone: "info", children: [
                activeSop.steps.length,
                " Steps"
              ] })
            ] })
          ] })
        ] }) }),
        activeStep && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs(GlassCard, { className: "p-2.5 sm:p-5 space-y-2 sm:space-y-3 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-[10px] sm:text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1 min-w-0", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600 shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "line-clamp-2", children: isMobile ? "Qualification" : "Dynamic Qualification Questions" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold text-slate-450 shrink-0 hidden sm:inline", children: "Active Stage Questions" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-1.5 sm:gap-2.5", children: activeStep.questions.map((q) => {
              const isChecked = !!checkedQuestions[`${selectedSopId}-${q.id}`];
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  onClick: () => handleQuestionToggle(q.id),
                  className: `p-2.5 sm:p-3 rounded-lg sm:rounded-xl border transition cursor-pointer flex items-start gap-2 sm:gap-3 hover:border-rose-200 hover:bg-rose-50/10 min-w-0 ${isChecked ? "bg-rose-50/30 border-rose-250 shadow-sm" : "bg-white border-slate-100"}`,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: `w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 grid place-items-center shrink-0 transition-colors ${isChecked ? "bg-rose-700 border-rose-700 text-white" : "border-slate-350 bg-white"}`, children: isChecked && /* @__PURE__ */ jsx(Check, { className: "w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[3]" }) }),
                    /* @__PURE__ */ jsx("span", { className: `text-[11px] sm:text-xs font-semibold leading-snug min-w-0 ${isChecked ? "text-slate-800 line-through opacity-70" : "text-slate-750"}`, children: q.text })
                  ]
                },
                q.id
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxs(GlassCard, { className: "p-2.5 sm:p-5 space-y-2 sm:space-y-3 min-w-0", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4 text-rose-600" }),
              " Discovery Information"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: activeStep.discovery.map((f) => /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase text-slate-400 tracking-wider", children: f.label }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: f.placeholder,
                  value: discoveryAnswers[`${selectedSopId}-${f.key}`] || "",
                  onChange: (e) => handleDiscoveryChange(f.key, e.target.value),
                  className: "w-full h-9 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-350 transition text-slate-800 font-semibold"
                }
              )
            ] }, f.key)) })
          ] }),
          activeStep.id === "budget" && /* @__PURE__ */ jsxs(GlassCard, { className: "p-5 space-y-3 border-l-4 border-l-rose-600", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xs font-extrabold text-slate-850 uppercase tracking-wider flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(DollarSign, { className: "w-4 h-4 text-rose-600" }),
                " Budget Qualification Section"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-bold", children: "Standard Pricing" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 leading-tight", children: "Highlight the budget scale appropriate for the lead's service." }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: ["₹1L - ₹3L", "₹3L - ₹8L", "₹8L - ₹15L", "₹15L+"].map((tier, i) => {
              const isSelected = selectedBudget === tier;
              const isBestFit = tier === activeSop.budgetRange || activeSop.id === 1 && tier === "₹3L - ₹8L";
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setSelectedBudget(tier);
                    toast.success(`Selected range: ${tier}`);
                  },
                  className: `p-3 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${isSelected ? "bg-rose-700 text-white border-rose-700 shadow-glow" : "bg-white border-slate-100 hover:border-rose-200"}`,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-black", children: tier }),
                    isBestFit && /* @__PURE__ */ jsx("span", { className: `text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md ${isSelected ? "bg-white/20 text-white" : "bg-rose-50 text-rose-700"}`, children: "Best Fit" })
                  ]
                },
                tier
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxs(GlassCard, { className: "p-2.5 sm:p-5 space-y-2 sm:space-y-3 min-w-0", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4 text-rose-600" }),
              " Eligibility & Quality Criteria"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: activeStep.checklist.map((cText, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5 text-xs text-slate-700 font-semibold bg-slate-50/50 p-2.5 rounded-xl border border-slate-100", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" }),
              /* @__PURE__ */ jsx("span", { children: cText })
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                disabled: activeStepIndex === 0,
                onClick: () => handleStepChange(activeStepIndex - 1),
                className: "flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 h-9 sm:h-10 px-3 sm:px-5 rounded-lg sm:rounded-xl border border-slate-200 bg-white text-slate-650 text-[11px] sm:text-xs font-bold hover:bg-slate-50 transition active:scale-[0.98] disabled:opacity-40 min-w-0",
                children: "Back"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: handleSaveNotes,
                className: "hidden sm:inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-xl border border-rose-100 bg-rose-50 text-rose-750 text-xs font-bold hover:bg-rose-100 transition active:scale-[0.98]",
                children: "Save Progress"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                disabled: activeStepIndex === activeSop.steps.length - 1,
                onClick: () => handleStepChange(activeStepIndex + 1),
                className: "flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 h-9 sm:h-10 px-3 sm:px-5 rounded-lg sm:rounded-xl bg-rose-700 text-white text-[11px] sm:text-xs font-bold hover:bg-rose-800 transition active:scale-[0.98] disabled:opacity-40 min-w-0",
                children: [
                  "Next ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 shrink-0" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(GlassCard, { className: "p-3 sm:p-4 space-y-2.5 sm:space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase text-slate-400 tracking-wider", children: "Real-time Call Notes" }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setGeneralNotes("");
                  toast.success("Notes cleared");
                },
                className: "text-[9px] font-bold text-slate-450 hover:text-rose-700 flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsx(RotateCcw, { className: "w-2.5 h-2.5" }),
                  " Clear Notes"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 3,
              placeholder: "Write specific custom requests, objections, or deal timelines here...",
              value: generalNotes,
              onChange: (e) => setGeneralNotes(e.target.value),
              className: "w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-350 transition text-slate-800 font-semibold resize-y"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "xl:col-span-4 space-y-3 sm:space-y-4 xl:sticky xl:top-24 max-h-none sm:max-h-[85vh] xl:overflow-y-auto xl:pr-1 xl:scrollbar-thin order-3 min-w-0", children: [
        /* @__PURE__ */ jsxs(GlassCard, { className: "p-3 sm:p-4 space-y-2.5 sm:space-y-3", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xs font-extrabold text-slate-850 uppercase tracking-wider flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(User, { className: "w-3.5 h-3.5 text-rose-500" }),
            " Live Script Variables"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[8px] font-black uppercase text-slate-400", children: "Lead Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: leadName,
                  onChange: (e) => setLeadName(e.target.value),
                  className: "w-full h-8 px-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[8px] font-black uppercase text-slate-400", children: "Rep Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: repName,
                  onChange: (e) => setRepName(e.target.value),
                  className: "w-full h-8 px-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
                }
              )
            ] })
          ] })
        ] }),
        activeStep && activeStep.scripts && /* @__PURE__ */ jsxs(GlassCard, { className: "p-4 space-y-3 bg-rose-50/20 border border-rose-100", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-black uppercase text-rose-700 tracking-wider", children: [
              activeStep.label,
              " Call Script"
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => copyToClipboard(formatScriptText(activeStep.scripts.opening)),
                className: "p-1 rounded-lg hover:bg-rose-100/50 text-rose-700 transition",
                title: "Copy Script",
                children: /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-white border border-rose-100 rounded-xl", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-700 leading-relaxed font-semibold italic", children: [
            '"',
            formatScriptText(activeStep.scripts.opening),
            '"'
          ] }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black uppercase text-slate-455 tracking-wider block mb-1", children: "Important Talking Points" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-1 pl-1", children: activeStep.scripts.talkingPoints.map((tp, idx) => /* @__PURE__ */ jsxs("li", { className: "text-[10px] text-slate-655 flex items-start gap-1 font-semibold", children: [
              /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "•" }),
              /* @__PURE__ */ jsx("span", { children: tp })
            ] }, idx)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-rose-50 border border-rose-150 p-2.5 rounded-xl flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(Info, { className: "w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-800 leading-snug font-bold", children: activeStep.scripts.tips })
          ] })
        ] }),
        activeSop.objections && activeSop.objections.length > 0 && /* @__PURE__ */ jsxs(GlassCard, { className: "p-3 sm:p-4 space-y-2.5 sm:space-y-3", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(AlertTriangle, { className: "w-3.5 h-3.5 text-rose-500" }),
            " Objection Handling"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: activeSop.objections.map((obj, idx) => {
            const isOpen = selectedObjectionIndex === idx;
            return /* @__PURE__ */ jsxs("div", { className: "border border-slate-100 rounded-xl overflow-hidden bg-white", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedObjectionIndex(isOpen ? null : idx),
                  className: "w-full flex items-center justify-between p-2.5 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 transition",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: obj.trigger }),
                    /* @__PURE__ */ jsx("span", { className: `text-[8px] text-slate-400 transition-transform ${isOpen ? "rotate-90" : ""}`, children: "▶" })
                  ]
                }
              ),
              isOpen && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-slate-50 border-t border-slate-100 space-y-2", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-slate-650 leading-relaxed italic", children: [
                  '"',
                  obj.rebuttal,
                  '"'
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => copyToClipboard(obj.rebuttal),
                    className: "inline-flex items-center gap-1 px-2 py-1 rounded bg-white border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-55 transition",
                    children: [
                      /* @__PURE__ */ jsx(Copy, { className: "w-3 h-3" }),
                      " Copy Rebuttal"
                    ]
                  }
                )
              ] })
            ] }, idx);
          }) })
        ] }),
        activeSop.crossSell && /* @__PURE__ */ jsxs(GlassCard, { className: "p-4 bg-gradient-to-br from-rose-500/10 via-rose-50/50 to-white border border-rose-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-black uppercase text-rose-700 tracking-wider flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-rose-600" }),
              " Recommended Cross-Sell"
            ] }),
            /* @__PURE__ */ jsxs(Badge, { tone: "success", children: [
              activeSop.crossSell.success,
              "% Success"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl shrink-0", children: activeSop.crossSell.icon }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xs font-black text-slate-900 leading-tight", children: activeSop.crossSell.product }),
              /* @__PURE__ */ jsxs("p", { className: "text-[9px] text-slate-500 mt-0.5", children: [
                activeSop.crossSell.deals,
                " deals closed this month"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-600 leading-relaxed font-bold bg-white/70 p-2.5 rounded-xl border border-rose-100 mb-2", children: activeSop.crossSell.pitch }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => toast.success(`Pitched cross-sell: ${activeSop.crossSell.product}`),
              className: "w-full py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-[10px] font-bold transition flex items-center justify-center gap-1 shadow-sm",
              children: "Confirm Pitch Selection"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      Drawer,
      {
        open: sopPickerOpen,
        onClose: () => setSopPickerOpen(false),
        title: "Choose SOP Guide",
        width: "w-full max-w-md",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100", children: "Switch call script and checklist without leaving the call workspace." }),
          /* @__PURE__ */ jsxs("div", { className: "relative mb-3", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Search scripts & guides...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-350 transition"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 mb-4", children: sopCategories.map((cat) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setCategoryFilter(cat),
              className: `px-3 py-1.5 rounded-lg text-[10px] font-bold border transition ${categoryFilter === cat ? "bg-rose-700 text-white border-rose-700 shadow-sm" : "bg-white text-slate-600 border-rose-100 hover:border-rose-200 hover:bg-rose-50"}`,
              children: cat
            },
            cat
          )) }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2 pb-6", children: filteredSops.map((sop) => {
            const isActive = sop.id === selectedSopId;
            const isFav = favorites.includes(sop.id);
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleSopSelect(sop.id),
                className: `w-full text-left rounded-xl border p-3 transition flex items-center justify-between gap-2 ${isActive ? "border-rose-500 bg-rose-50/50" : "border-slate-100 bg-white hover:border-rose-200"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex items-center gap-2.5", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-lg shrink-0", children: sop.icon }),
                    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-850 truncate", children: sop.title }),
                      /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-slate-400 truncate mt-0.5", children: [
                        sop.category,
                        " · ",
                        sop.duration,
                        " · ",
                        sop.steps?.length || 0,
                        " steps"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
                    isActive && /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black uppercase text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded", children: "Active" }),
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        role: "button",
                        tabIndex: 0,
                        onClick: (e) => toggleFavorite(sop.id, e),
                        onKeyDown: (e) => {
                          if (e.key === "Enter" || e.key === " ") toggleFavorite(sop.id, e);
                        },
                        className: "p-1 rounded-lg hover:bg-rose-100/50 text-slate-300 hover:text-amber-500 transition",
                        children: /* @__PURE__ */ jsx(Star, { className: `w-3.5 h-3.5 ${isFav ? "fill-amber-400 text-amber-400" : ""}` })
                      }
                    )
                  ] })
                ]
              },
              sop.id
            );
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      EmpModal,
      {
        open: isEndingCall,
        onClose: () => !isGeneratingSummary && setIsEndingCall(false),
        title: isGeneratingSummary ? "Engaging OpenAI API..." : "AI Call Minutes & Summary",
        subtitle: isGeneratingSummary ? "Transcribing dialog and extracting core outcomes" : `Outbound Session Wrap-up: ${leadName}`,
        footer: !isGeneratingSummary && /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse sm:flex-row gap-2 w-full sm:w-auto sm:justify-end", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsEndingCall(false),
              className: "w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 transition rounded-xl border border-slate-200 sm:border-transparent",
              children: "Discard & Resume"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleSaveCallToLogs,
              className: "w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition shadow-sm",
              children: "Save & Log Call"
            }
          )
        ] }),
        children: isGeneratingSummary ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-10 text-center space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full border-4 border-rose-100 border-t-rose-600 animate-spin" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-800", children: "Processing Audio Feed & Notes..." }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-1 max-w-xs leading-relaxed", children: "Analyzing checked qualification checklist, custom notes, and discovery values to generate the Minutes of Meeting (MoM)." })
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase text-slate-400 tracking-wider", children: "Call Outcome / Status" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: callOutcome,
                onChange: (e) => setCallOutcome(e.target.value),
                className: "w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-200",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "Discovery complete", children: "Discovery complete" }),
                  /* @__PURE__ */ jsx("option", { value: "BANT Qualified", children: "BANT Qualified" }),
                  /* @__PURE__ */ jsx("option", { value: "Demo Scheduled", children: "Demo Scheduled" }),
                  /* @__PURE__ */ jsx("option", { value: "Follow-up confirmed", children: "Follow-up confirmed" }),
                  /* @__PURE__ */ jsx("option", { value: "Pricing shared", children: "Pricing shared" }),
                  /* @__PURE__ */ jsx("option", { value: "Not interested", children: "Not interested" }),
                  /* @__PURE__ */ jsx("option", { value: "Not picked", children: "Not picked" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase text-slate-400 tracking-wider", children: "Lead Score / Rating" }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setCallRating(star),
                  className: "text-amber-400 hover:scale-110 transition shrink-0",
                  children: /* @__PURE__ */ jsx(Star, { className: `w-5 h-5 ${star <= callRating ? "fill-amber-400 text-amber-400" : "text-slate-200"}` })
                },
                star
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase text-slate-400 tracking-wider", children: "Lead Temperature" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  value: callLeadTemp,
                  onChange: (e) => setCallLeadTemp(e.target.value),
                  className: "w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-200",
                  children: EMP_LEAD_TEMPERATURES.map(({ id, label }) => /* @__PURE__ */ jsxs("option", { value: id, children: [
                    label,
                    " Lead"
                  ] }, id))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase text-slate-400 tracking-wider", children: "Generated AI Call Summary & MoM" }),
              /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-extrabold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Sparkles, { className: "w-2.5 h-2.5 text-rose-600 animate-pulse" }),
                " OpenAI GPT-4o"
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: isMobile ? 5 : 8,
                value: aiMoM,
                onChange: (e) => setAiMoM(e.target.value),
                className: "w-full p-3.5 text-[11px] bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-350 resize-none max-h-[28vh] sm:max-h-none"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  EmployeeCallAssistant as default
};
