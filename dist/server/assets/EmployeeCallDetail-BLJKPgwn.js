import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, History, ChevronDown, ChevronRight, Clock, Volume2, CalendarClock, Phone, AlertCircle, RotateCcw, Pause, Play, Sparkles, HelpCircle, Star, ShieldCheck, CheckCircle, Circle } from "lucide-react";
import { G as GlassCard } from "./Primitives-CmGbnOU9.js";
import { Z as useEmployee, s as LOCAL_SOPS } from "./_-BNdSRMjW.js";
import { B as BtnGhost, A as AvatarCircle, L as LeadStatusBadge, b as BtnSecondary, a as BtnPrimary, d as EmpModal, g as FormRow, F as FormGroup, f as FormLabel, e as FormInput, h as FormSelect, i as FormTextarea } from "./EmpUI-DSKHyseP.js";
import "framer-motion";
import "@tanstack/react-query";
import "react-dom";
const parseDurationToSeconds = (durationStr) => {
  if (!durationStr || durationStr === "—") return 0;
  const parts = durationStr.split(":");
  if (parts.length === 2) {
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }
  return 0;
};
const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};
const MOOD_META = {
  hot: { label: "Hot Lead 🔥", bg: "bg-rose-50 border-rose-200 text-rose-700 font-bold" },
  warm: { label: "Warm Lead", bg: "bg-amber-50 border-amber-200 text-amber-700 font-bold" },
  cold: { label: "Cold Lead ❄", bg: "bg-sky-50 border-sky-200 text-sky-700 font-bold" },
  positive: { label: "Excited 😊", bg: "bg-emerald-50 border-emerald-250 text-emerald-700 font-bold" },
  neutral: { label: "Neutral 😐", bg: "bg-slate-50 border-slate-200 text-slate-600 font-bold" },
  negative: { label: "Hesitant 😟", bg: "bg-amber-50 border-amber-200 text-amber-700 font-bold" }
};
const getSopForCall = (call) => {
  if (call.sopId) return call.sopId;
  const company = (call.company || "").toLowerCase();
  const outcome = (call.outcome || "").toLowerCase();
  const name = (call.name || "").toLowerCase();
  if (company.includes("media") || company.includes("zee") || outcome.includes("zee") || outcome.includes("podcast")) {
    return 3;
  }
  if (outcome.includes("bant") || outcome.includes("qualified") || name.includes("arun") || name.includes("priya")) {
    return 2;
  }
  return 1;
};
const getCheckedQuestionsForCall = (call, sops) => {
  if (call.checkedQuestions && Object.keys(call.checkedQuestions).length > 0) {
    return call.checkedQuestions;
  }
  const activeSopId = getSopForCall(call);
  const activeSop = sops.find((s) => s.id === activeSopId) || sops[0];
  const checked = {};
  const outcome = (call.outcome || "").toLowerCase();
  if (outcome.includes("closed") || outcome.includes("negotiation") || outcome.includes("walkthrough") || outcome.includes("pricing shared") || outcome.includes("proposal discussed") || outcome.includes("proposal review")) {
    activeSop.steps.forEach((step) => {
      step.questions.forEach((q) => {
        checked[`${activeSopId}-${q.id}`] = true;
      });
    });
  } else if (outcome.includes("discovery") || outcome.includes("demo scheduled") || outcome.includes("qualified") || outcome.includes("requirements") || outcome.includes("budget confirmed")) {
    activeSop.steps.forEach((step) => {
      if (step.id === "opening" || step.id === "discovery" || step.id === "authority" || step.id === "need") {
        step.questions.forEach((q) => {
          checked[`${activeSopId}-${q.id}`] = true;
        });
      }
    });
  } else if (outcome.includes("intro") || outcome.includes("engaged") || outcome.includes("check-in") || outcome.includes("attempted") || outcome.includes("confirmed")) {
    activeSop.steps.forEach((step) => {
      if (step.id === "opening") {
        step.questions.forEach((q) => {
          checked[`${activeSopId}-${q.id}`] = true;
        });
      }
    });
  }
  return checked;
};
function EmployeeCallDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { calls = [], leads = [], addActivityRecord, scheduleFollowUp } = useEmployee();
  const callId = Number(searchParams.get("id"));
  const call = useMemo(() => {
    return calls.find((c) => String(c.id) === String(callId));
  }, [calls, callId]);
  const lead = useMemo(() => {
    if (!call) return null;
    return leads.find((l) => String(l.id) === String(call.leadId));
  }, [leads, call]);
  const leadCalls = useMemo(() => {
    if (!call) return [];
    return calls.filter((c) => String(c.leadId) === String(call.leadId));
  }, [calls, call]);
  const activeSopId = useMemo(() => {
    if (!call) return 1;
    return getSopForCall(call);
  }, [call]);
  const activeSop = useMemo(() => {
    return LOCAL_SOPS.find((s) => s.id === activeSopId) || LOCAL_SOPS[0];
  }, [activeSopId]);
  const checkedQuestions = useMemo(() => {
    if (!call) return {};
    return getCheckedQuestionsForCall(call, LOCAL_SOPS);
  }, [call]);
  const complianceStats = useMemo(() => {
    if (!activeSop || !activeSop.steps) return { asked: 0, total: 0, pct: 0 };
    const allQs = activeSop.steps.reduce((acc, step) => [...acc, ...step.questions], []);
    if (allQs.length === 0) return { asked: 0, total: 0, pct: 0 };
    const asked = allQs.filter((q) => !!checkedQuestions[`${activeSopId}-${q.id}`]).length;
    return {
      asked,
      total: allQs.length,
      pct: Math.round(asked / allQs.length * 100)
    };
  }, [activeSop, checkedQuestions, activeSopId]);
  const durationSec = useMemo(() => {
    if (!call) return 0;
    return parseDurationToSeconds(call.duration);
  }, [call]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= durationSec) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1e3);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, durationSec]);
  const [allLogsOpen, setAllLogsOpen] = useState(false);
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpTime, setFollowUpTime] = useState("");
  const [followUpType, setFollowUpType] = useState("Call");
  const [followUpNotes, setFollowUpNotes] = useState("");
  if (!call) {
    return /* @__PURE__ */ jsxs("div", { className: "page-shell space-y-4", children: [
      /* @__PURE__ */ jsxs(BtnGhost, { onClick: () => navigate("/employee/calls"), children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
        " Back to Call Logs"
      ] }),
      /* @__PURE__ */ jsxs(GlassCard, { className: "p-8 text-center space-y-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-rose-50 border border-rose-100 text-rose-600 rounded-full grid place-items-center text-3xl mx-auto", children: "⚠️" }),
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-slate-800", children: "Call Log Not Found" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 max-w-sm mx-auto", children: "The call log you are trying to view does not exist or has been deleted from local CRM storage." })
      ] })
    ] });
  }
  const moodInfo = MOOD_META[call.mood] || MOOD_META.neutral;
  const handleSeekChange = (e) => {
    setCurrentTime(Number(e.target.value));
  };
  const handleScheduleConfirm = (e) => {
    e.preventDefault();
    if (!followUpDate || !followUpTime) {
      toast.error("Please specify both date and time");
      return;
    }
    addActivityRecord(call.leadId, {
      type: followUpType === "Call" ? "call" : followUpType === "Meeting" ? "meeting" : "whatsapp",
      text: `${followUpType} Follow-up scheduled for ${followUpDate} at ${followUpTime}. Note: ${followUpNotes || "No specific instructions"}`,
      time: "Scheduled just now"
    });
    scheduleFollowUp({
      leadName: call.name,
      company: call.company,
      type: followUpType,
      date: followUpDate,
      time: followUpTime,
      note: followUpNotes,
      leadId: call.leadId
    });
    toast.success(`Follow-up scheduled — added to My Tasks for ${followUpDate}`);
    setIsFollowUpOpen(false);
    setFollowUpDate("");
    setFollowUpTime("");
    setFollowUpNotes("");
  };
  const handleCallAgain = () => {
    navigate(`/employee/call-assistant?lead=${encodeURIComponent(call.name)}`);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 sm:space-y-4 page-shell min-w-0 animate-fade-in pb-12", children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-xl sm:rounded-2xl border border-rose-100/60 bg-white p-2 sm:p-2.5 shadow-sm min-w-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate("/employee/calls"),
            className: "inline-flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-rose-100/60 bg-white hover:bg-rose-50/40 text-slate-650 hover:text-rose-700 text-[11px] sm:text-xs font-bold transition shadow-sm shrink-0",
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Back" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Back to Call Logs" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative min-w-0", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setAllLogsOpen(!allLogsOpen),
              className: "inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-rose-100/60 bg-white hover:bg-rose-50/40 text-slate-650 hover:text-rose-700 text-[11px] sm:text-xs font-bold transition shadow-sm cursor-pointer max-w-[140px] sm:max-w-none truncate",
              children: [
                /* @__PURE__ */ jsx(History, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "truncate", children: "All Call Logs" }),
                /* @__PURE__ */ jsx(ChevronDown, { className: "w-3 h-3 text-slate-400 shrink-0" })
              ]
            }
          ),
          allLogsOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-20", onClick: () => setAllLogsOpen(false) }),
            /* @__PURE__ */ jsxs("div", { className: "absolute left-0 mt-1.5 w-[min(85vw,288px)] rounded-xl bg-white border border-rose-100 shadow-elegant p-2 z-30 max-h-72 sm:max-h-80 overflow-y-auto scrollbar-thin space-y-1 animate-fade-in", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 font-bold uppercase px-2 py-1 tracking-wider border-b border-rose-50 mb-1", children: "All Call Logs" }),
              calls.map((c) => {
                const isActive = String(c.id) === String(call.id);
                return /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setAllLogsOpen(false);
                      if (!isActive) navigate(`/employee/call-detail?id=${c.id}`);
                    },
                    className: `w-full text-left px-2.5 py-2 rounded-lg text-[11px] font-medium leading-snug flex items-center justify-between gap-1.5 transition-colors ${isActive ? "bg-rose-50 text-rose-700 font-bold" : "text-slate-650 hover:bg-rose-50/50 hover:text-rose-850 cursor-pointer"}`,
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900 truncate", children: c.name }),
                        /* @__PURE__ */ jsxs("p", { className: "text-[9.5px] text-slate-450 truncate mt-0.5", children: [
                          c.date,
                          " · ",
                          c.outcome
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5 text-slate-400 shrink-0" })
                    ]
                  },
                  c.id
                );
              })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "text-[9px] sm:text-[11px] font-extrabold uppercase text-slate-400 tracking-wider shrink-0 whitespace-nowrap tabular-nums", children: [
        "Call Ref: #",
        call.id
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-rose-100/60 shadow-sm p-3 sm:p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-5 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx(
          AvatarCircle,
          {
            initials: lead?.av || call.name.slice(0, 2).toUpperCase(),
            color: lead?.color || "#e11d48",
            size: 52
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-display font-bold text-slate-900 leading-none", children: call.name }),
            lead && /* @__PURE__ */ jsx(LeadStatusBadge, { status: lead.status, label: lead.status.toUpperCase() }),
            /* @__PURE__ */ jsx("span", { className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10.5px] ${moodInfo.bg}`, children: moodInfo.label })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500 font-medium leading-none", children: [
            call.company,
            " · ",
            call.phone || "+91 99999 99999"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[11px] text-slate-400 pt-0.5 flex-wrap", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 font-semibold", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-rose-500" }),
              " ",
              call.date
            ] }),
            /* @__PURE__ */ jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 font-semibold", children: [
              /* @__PURE__ */ jsx(Volume2, { className: "w-3.5 h-3.5 text-rose-500" }),
              " ",
              call.type === "out" ? "Outbound Call" : "Inbound Call"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex sm:items-center gap-2.5 flex-wrap md:flex-nowrap shrink-0", children: [
        /* @__PURE__ */ jsxs(BtnSecondary, { className: "!py-2 !rounded-xl !text-xs", onClick: () => setIsFollowUpOpen(true), children: [
          /* @__PURE__ */ jsx(CalendarClock, { className: "w-4 h-4" }),
          " Schedule Follow-up"
        ] }),
        /* @__PURE__ */ jsxs(BtnPrimary, { className: "!py-2 !rounded-xl !text-xs", onClick: handleCallAgain, children: [
          /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
          " Call Lead Again"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch", children: [
      /* @__PURE__ */ jsxs("div", { className: "xl:col-span-7 flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxs(GlassCard, { className: "p-3 sm:p-4 space-y-3", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Volume2, { className: "w-3.5 h-3.5 text-rose-600 animate-pulse" }),
            " Voice Recording Playback"
          ] }),
          durationSec === 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-100 bg-rose-50/20 p-5 text-center space-y-1.5", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-7 h-7 text-amber-500 mx-auto" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-650", children: "No Recording Available" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 max-w-xs mx-auto", children: "Audio recordings are not registered for calls with no outcome or calls that were missed/rejected." })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col gap-2.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "h-6 flex items-center justify-between gap-[3px] px-2 relative overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-rose-50 via-transparent to-rose-50 pointer-events-none z-10" }),
              Array.from({ length: 48 }).map((_, idx) => {
                const isPassed = idx / 48 * durationSec <= currentTime;
                const heights = [
                  8,
                  16,
                  10,
                  20,
                  14,
                  6,
                  12,
                  22,
                  9,
                  18,
                  14,
                  6,
                  16,
                  24,
                  11,
                  14,
                  20,
                  8,
                  16,
                  24,
                  10,
                  20,
                  12,
                  6,
                  18,
                  14,
                  9,
                  24,
                  16,
                  8,
                  11,
                  22,
                  14,
                  6,
                  18,
                  20
                ];
                const height = heights[idx % heights.length];
                return /* @__PURE__ */ jsx(
                  "span",
                  {
                    style: { height: `${height}px` },
                    className: `w-[3px] rounded-full transition-all duration-300 ${isPassed ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" : "bg-slate-200"}`
                  },
                  idx
                );
              })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: durationSec,
                  value: currentTime,
                  onChange: handleSeekChange,
                  className: "w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-rose-600 bg-rose-100 hover:bg-rose-250 focus:outline-none transition-colors"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[10.5px] font-mono text-slate-500 font-medium", children: [
                /* @__PURE__ */ jsx("span", { children: formatTime(currentTime) }),
                /* @__PURE__ */ jsx("span", { children: call.duration })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setCurrentTime(Math.max(0, currentTime - 10)),
                  className: "w-7 h-7 rounded-full border border-slate-200 bg-white text-slate-650 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-100 grid place-items-center transition active:scale-95",
                  title: "Rewind 10s",
                  children: /* @__PURE__ */ jsx(RotateCcw, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setIsPlaying(!isPlaying),
                  className: "w-10 h-10 rounded-full gradient-primary text-white hover:opacity-95 shadow-[0_4px_12px_rgba(244,63,94,0.3)] grid place-items-center transition active:scale-95",
                  children: isPlaying ? /* @__PURE__ */ jsx(Pause, { className: "w-4.5 h-4.5 fill-white" }) : /* @__PURE__ */ jsx(Play, { className: "w-4.5 h-4.5 fill-white ml-0.5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setCurrentTime(Math.min(durationSec, currentTime + 10)),
                  className: "w-7 h-7 rounded-full border border-slate-200 bg-white text-slate-650 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-100 grid place-items-center transition active:scale-95",
                  title: "Forward 10s",
                  children: /* @__PURE__ */ jsx(Play, { className: "w-3 h-3" })
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-gradient-to-br from-rose-50/40 via-white to-rose-100/10 border border-rose-150/70 shadow-sm rounded-2xl p-4 sm:p-5 flex flex-col gap-3 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute right-3 top-3 pointer-events-none opacity-20", children: /* @__PURE__ */ jsx(Sparkles, { className: "w-12 h-12 text-rose-600 animate-pulse" }) }),
          /* @__PURE__ */ jsxs("h3", { className: "text-xs font-extrabold text-rose-900 uppercase tracking-wider flex items-center gap-1.5 shrink-0", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-rose-600 animate-pulse" }),
            " AI Call Summary & MoM"
          ] }),
          call.note ? /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto pr-1.5 scrollbar-thin", children: /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-700 leading-relaxed font-medium bg-white/70 border border-rose-100/60 p-4 rounded-xl space-y-3 whitespace-pre-line shadow-[0_1px_3px_rgba(244,63,94,0.02)]", children: call.note }) }) : /* @__PURE__ */ jsxs("div", { className: "flex-1 border border-dashed border-rose-200 rounded-xl grid place-items-center p-6 text-center text-slate-400 text-xs shrink-0", children: [
            /* @__PURE__ */ jsx(HelpCircle, { className: "w-7 h-7 text-rose-300" }),
            /* @__PURE__ */ jsx("span", { children: "No AI summary notes recorded for this call log." })
          ] }),
          call.rating > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-rose-100/60 pt-3 mt-1 shrink-0", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider", children: "Quality Audit Rating" }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0.5", children: Array.from({ length: 5 }).map((_, idx) => /* @__PURE__ */ jsx(
              Star,
              {
                className: `w-3.5 h-3.5 ${idx < call.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`
              },
              idx
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "xl:col-span-5 flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxs(GlassCard, { className: "p-3 sm:p-4 md:p-5 flex flex-col h-[280px] sm:h-[400px] overflow-hidden shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "shrink-0 space-y-3.5 border-b border-rose-100/60 pb-4 mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-display font-bold text-slate-900 text-sm", children: "SOP Compliance Audit" }),
                /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-slate-400 mt-0.5", children: [
                  "Guidance: ",
                  activeSop.title,
                  " · ",
                  activeSop.category
                ] })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-[10.5px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100 tracking-wide shrink-0", children: [
                complianceStats.asked,
                "/",
                complianceStats.total,
                " Asked"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[11px] font-semibold text-slate-500", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-rose-600" }),
                  " Script Adherence"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "font-black text-rose-700 font-mono", children: [
                  complianceStats.pct,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-2 w-full bg-slate-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
                "div",
                {
                  style: { width: `${complianceStats.pct}%` },
                  className: "h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-1000 ease-out"
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto pr-1.5 scrollbar-thin space-y-5", children: activeSop.steps.map((step, stepIdx) => {
            const stepQuestions = step.questions || [];
            const askedInStep = stepQuestions.filter((q) => !!checkedQuestions[`${activeSopId}-${q.id}`]);
            const allAsked = askedInStep.length === stepQuestions.length;
            return /* @__PURE__ */ jsxs("div", { className: "space-y-2.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 border-b border-rose-50/70 pb-1 shrink-0", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-extrabold text-slate-700 uppercase tracking-wide flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-4 h-4 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold grid place-items-center shrink-0", children: stepIdx + 1 }),
                  step.label
                ] }),
                /* @__PURE__ */ jsxs("span", { className: `text-[10px] font-bold ${allAsked ? "text-emerald-600" : askedInStep.length > 0 ? "text-amber-600" : "text-slate-400"}`, children: [
                  askedInStep.length,
                  "/",
                  stepQuestions.length
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: stepQuestions.map((q) => {
                const isAsked = !!checkedQuestions[`${activeSopId}-${q.id}`];
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `flex items-start gap-2.5 p-2 rounded-xl border text-[11.5px] leading-snug transition-colors ${isAsked ? "bg-emerald-50/30 border-emerald-100 text-slate-800" : "bg-slate-50/40 border-slate-100 text-slate-450"}`,
                    children: [
                      isAsked ? /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 fill-emerald-50 shrink-0 mt-0.5" }) : /* @__PURE__ */ jsx(Circle, { className: "w-4 h-4 text-slate-300 shrink-0 mt-0.5" }),
                      /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsx("span", { className: isAsked ? "font-semibold" : "font-medium", children: q.text }) })
                    ]
                  },
                  q.id
                );
              }) })
            ] }, step.id);
          }) })
        ] }),
        /* @__PURE__ */ jsxs(GlassCard, { className: "p-3 sm:p-4 md:p-5 flex flex-col h-[260px] sm:h-[380px] shrink-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 shrink-0", children: [
            /* @__PURE__ */ jsx(History, { className: "w-3.5 h-3.5 text-rose-600 animate-pulse" }),
            " Lead Call History"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-0.5 mb-3 shrink-0", children: "Recorded calls for this lead. Select one to review its compliance checklist, summary, and audio." }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto pr-1.5 scrollbar-thin space-y-2 min-h-0", children: leadCalls.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 italic text-center py-4", children: "No other calls recorded for this lead." }) : leadCalls.map((c) => {
            const isActive = String(c.id) === String(call.id);
            const isIncoming = c.type === "in";
            const isMissed = c.type === "miss";
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  if (!isActive) {
                    navigate(`/employee/call-detail?id=${c.id}`);
                  }
                },
                className: `w-full text-left flex items-start justify-between gap-2 p-2.5 rounded-xl border transition-all ${isActive ? "border-rose-350 bg-rose-50/50 shadow-[0_2px_8px_rgba(244,63,94,0.05)] ring-1 ring-rose-100" : "border-rose-100/70 bg-rose-50/10 hover:bg-rose-50 hover:border-rose-350 cursor-pointer"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                      /* @__PURE__ */ jsx("span", { className: `text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${isIncoming ? "bg-emerald-50 text-emerald-700" : isMissed ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}`, children: isIncoming ? "Inbound" : isMissed ? "Missed" : "Outbound" }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400 font-semibold", children: c.date }),
                      isActive && /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-rose-700 uppercase tracking-wide", children: "Viewing" })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-800 truncate mt-1.5", children: c.outcome || "No outcome recorded" }),
                    c.note && /* @__PURE__ */ jsxs("p", { className: "text-[9.5px] text-rose-800 font-bold mt-1 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(Sparkles, { className: "w-3 h-3 text-rose-600 animate-pulse" }),
                      " View AI MoM & SOP Checklist"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10.5px] font-black text-slate-750 shrink-0 bg-white border border-rose-100 px-1.5 py-0.5 rounded tabular-nums", children: c.duration })
                ]
              },
              c.id
            );
          }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      EmpModal,
      {
        open: isFollowUpOpen,
        onClose: () => setIsFollowUpOpen(false),
        title: "Schedule Next Follow-Up Call",
        subtitle: `Set dates and targets for nurturing ${call.name}`,
        footer: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(BtnGhost, { className: "!py-1.5 !px-3", onClick: () => setIsFollowUpOpen(false), children: "Cancel" }),
          /* @__PURE__ */ jsx(BtnPrimary, { className: "!py-1.5 !px-4", onClick: handleScheduleConfirm, children: "Schedule Call" })
        ] }),
        children: /* @__PURE__ */ jsxs("form", { onSubmit: handleScheduleConfirm, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs(FormRow, { children: [
            /* @__PURE__ */ jsxs(FormGroup, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Date *" }),
              /* @__PURE__ */ jsx(
                FormInput,
                {
                  type: "date",
                  required: true,
                  value: followUpDate,
                  onChange: (e) => setFollowUpDate(e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(FormGroup, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Time *" }),
              /* @__PURE__ */ jsx(
                FormInput,
                {
                  type: "time",
                  required: true,
                  value: followUpTime,
                  onChange: (e) => setFollowUpTime(e.target.value)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(FormRow, { children: [
            /* @__PURE__ */ jsxs(FormGroup, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Follow-up Mode" }),
              /* @__PURE__ */ jsxs(FormSelect, { value: followUpType, onChange: (e) => setFollowUpType(e.target.value), children: [
                /* @__PURE__ */ jsx("option", { value: "Call", children: "Phone Call" }),
                /* @__PURE__ */ jsx("option", { value: "WhatsApp", children: "WhatsApp Chat" }),
                /* @__PURE__ */ jsx("option", { value: "Meeting", children: "Zoom / Google Meet" }),
                /* @__PURE__ */ jsx("option", { value: "Email", children: "Email Pitch" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(FormGroup, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Lead Importance" }),
              /* @__PURE__ */ jsxs(FormSelect, { defaultValue: "high", children: [
                /* @__PURE__ */ jsx("option", { value: "high", children: "High Urgency 🔥" }),
                /* @__PURE__ */ jsx("option", { value: "medium", children: "Medium" }),
                /* @__PURE__ */ jsx("option", { value: "low", children: "Low" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(FormGroup, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Follow-Up Instructions" }),
            /* @__PURE__ */ jsx(
              FormTextarea,
              {
                placeholder: "e.g. Bring revised proposal, resolve ROI calculations, Pitch cross-sell bundle...",
                rows: 3,
                value: followUpNotes,
                onChange: (e) => setFollowUpNotes(e.target.value)
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  EmployeeCallDetail as default
};
