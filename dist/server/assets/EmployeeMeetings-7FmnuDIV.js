import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar, CalendarClock, CheckCircle2, Link2, History, Search, Plus, Video, Trash2, Copy, Sparkles, ExternalLink, X } from "lucide-react";
import toast from "react-hot-toast";
import { a as StatCard, G as GlassCard, B as Badge, D as Drawer } from "./Primitives-CmGbnOU9.js";
import { Z as useEmployee, j as EMP_MEETINGS_UPCOMING, M as MEETING_PLATFORMS, i as EMP_MEETINGS_HISTORY, w as SEGMENT_WRAP, S as SEGMENT_BTN, u as SEGMENT_BTN_ACTIVE, v as SEGMENT_BTN_INACTIVE, I as generateGoogleMeetLink } from "./_-BNdSRMjW.js";
import { a as BtnPrimary, E as EmpEmptyState, b as BtnSecondary, A as AvatarCircle } from "./EmpUI-DSKHyseP.js";
import "framer-motion";
import "@tanstack/react-query";
import "react-dom";
const PLATFORM_LABELS = { google_meet: "Google Meet", zoom: "Zoom", teams: "Teams" };
const PLATFORM_TONE = {
  "Google Meet": "success",
  Zoom: "info",
  Teams: "purple"
};
const PANEL_HEIGHT = "min-h-[240px] max-h-[min(420px,calc(100dvh-280px))] sm:max-h-[calc(100dvh-240px)] sm:min-h-[280px]";
const EMPTY_FORM = {
  title: "",
  date: "2026-04-30",
  time: "14:00",
  leadId: "",
  platform: "google_meet",
  meetLink: "",
  agenda: ""
};
const INPUT = "w-full h-10 px-3 rounded-xl bg-white border border-rose-100 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition";
const LABEL = "block text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1.5";
function Field({ label, children, className = "" }) {
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx("label", { className: LABEL, children: label }),
    children
  ] });
}
function BookMeetingDrawer({
  open,
  form,
  setForm,
  leads,
  employee,
  selectedPlatform,
  onClose,
  onCreate,
  onGenerateLink,
  onCopyLink
}) {
  return /* @__PURE__ */ jsxs(Drawer, { open, onClose, title: "Book a Meeting", width: "drawer-panel", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mb-4 pb-3 border-b border-rose-50", children: "Schedule with Zoom, Google Meet, or Microsoft Teams" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-xl bg-rose-50/70 border border-rose-100 px-3 py-2 mb-5", children: [
      /* @__PURE__ */ jsx(AvatarCircle, { initials: employee.initials, color: "#be123c", size: 28 }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-800 truncate", children: employee.name }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500", children: "Meeting host" })
      ] }),
      /* @__PURE__ */ jsx(Badge, { tone: "primary", children: "Host" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(Field, { label: "Meeting Title", children: /* @__PURE__ */ jsx(
        "input",
        {
          className: INPUT,
          placeholder: "Discovery Call — Rajesh Mehta",
          value: form.title,
          onChange: (e) => setForm((f) => ({ ...f, title: e.target.value }))
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(Field, { label: "Date", children: /* @__PURE__ */ jsx("input", { type: "date", className: INPUT, value: form.date, onChange: (e) => setForm((f) => ({ ...f, date: e.target.value })) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Time", children: /* @__PURE__ */ jsx("input", { type: "time", className: INPUT, value: form.time, onChange: (e) => setForm((f) => ({ ...f, time: e.target.value })) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(Field, { label: "Lead", children: /* @__PURE__ */ jsxs("select", { className: INPUT, value: form.leadId, onChange: (e) => setForm((f) => ({ ...f, leadId: e.target.value })), children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Select lead…" }),
          leads.map((l) => /* @__PURE__ */ jsx("option", { value: l.id, children: l.name }, l.id))
        ] }) }),
        /* @__PURE__ */ jsx(Field, { label: "Platform", children: /* @__PURE__ */ jsx(
          "select",
          {
            className: INPUT,
            value: form.platform,
            onChange: (e) => setForm((f) => ({ ...f, platform: e.target.value })),
            children: MEETING_PLATFORMS.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.label.replace(" Meeting", "").replace("Microsoft ", "") }, p.id))
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Field, { label: form.platform === "google_meet" ? "Google Meet Link" : "Meeting Link", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx(Link2, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-rose-400 pointer-events-none" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: `${INPUT} !pl-9 font-mono text-xs`,
              placeholder: selectedPlatform.placeholder,
              value: form.meetLink,
              onChange: (e) => setForm((f) => ({ ...f, meetLink: e.target.value }))
            }
          )
        ] }),
        selectedPlatform.canGenerate && /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onGenerateLink,
            className: "h-10 px-3 rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition shrink-0 inline-flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }),
              "Generate"
            ]
          }
        ),
        form.meetLink && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => onCopyLink(form.meetLink),
            className: "h-10 w-10 rounded-xl border border-rose-100 bg-rose-50 text-rose-700 hover:bg-rose-100 transition shrink-0 grid place-items-center",
            "aria-label": "Copy link",
            children: /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(Field, { label: "Agenda", children: /* @__PURE__ */ jsx(
        "textarea",
        {
          rows: 3,
          className: `${INPUT} !h-auto py-2.5 resize-none`,
          placeholder: "Objectives, talking points…",
          value: form.agenda,
          onChange: (e) => setForm((f) => ({ ...f, agenda: e.target.value }))
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sticky bottom-0 -mx-4 sm:-mx-5 px-4 sm:px-5 py-4 mt-6 bg-white border-t border-rose-100 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxs(BtnPrimary, { onClick: onCreate, className: "flex-1 sm:flex-initial", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4" }),
        " Create & Send"
      ] }),
      form.meetLink && form.platform === "google_meet" && /* @__PURE__ */ jsxs(BtnSecondary, { onClick: () => window.open(form.meetLink, "_blank", "noopener,noreferrer"), children: [
        /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" }),
        " Preview"
      ] }),
      /* @__PURE__ */ jsxs(BtnSecondary, { onClick: onClose, className: "sm:ml-auto", children: [
        /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }),
        " Cancel"
      ] })
    ] })
  ] });
}
function leadInitials(name) {
  if (!name || name === "—") return "?";
  return name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}
function PlatformBadge({ platform }) {
  return /* @__PURE__ */ jsx(Badge, { tone: PLATFORM_TONE[platform] || "muted", children: platform });
}
function ScheduleItem({ meeting, onJoin, onCopyLink, onDelete }) {
  return /* @__PURE__ */ jsx("div", { className: "px-3 py-3 hover:bg-rose-50/50 transition group", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5", children: [
    /* @__PURE__ */ jsx(AvatarCircle, { initials: leadInitials(meeting.lead), color: "#be123c", size: 32 }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-slate-900 truncate", children: meeting.title }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
          /* @__PURE__ */ jsx(PlatformBadge, { platform: meeting.platform }),
          onDelete && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => onDelete(meeting.id),
              className: "p-1 rounded-lg text-slate-400 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:text-rose-600 hover:bg-rose-50 transition-all",
              "aria-label": "Delete meeting",
              children: /* @__PURE__ */ jsx(Trash2, { className: "w-3 h-3" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 mt-0.5", children: meeting.time }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold text-slate-700 mt-0.5 truncate", children: meeting.lead }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5 mt-2", children: [
        /* @__PURE__ */ jsxs(BtnPrimary, { className: "!py-1 !px-2.5 !text-[10px] !rounded-lg", onClick: () => onJoin(meeting), children: [
          /* @__PURE__ */ jsx(Video, { className: "w-3 h-3" }),
          " Join"
        ] }),
        meeting.meetLink && /* @__PURE__ */ jsx(BtnSecondary, { className: "!py-1 !px-2 !text-[10px] !rounded-lg", onClick: () => onCopyLink(meeting.meetLink), "aria-label": "Copy link", children: /* @__PURE__ */ jsx(Copy, { className: "w-3 h-3" }) })
      ] })
    ] })
  ] }) });
}
function TodaySchedulePanel({ upcoming, history, onJoin, onCopyLink, onDelete }) {
  return /* @__PURE__ */ jsxs(GlassCard, { className: `p-0 overflow-hidden flex flex-col ${PANEL_HEIGHT}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 border-b border-rose-50 bg-rose-50/40 shrink-0", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-slate-900", children: "Today's Schedule" }),
      /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-slate-500", children: [
        upcoming.length,
        " upcoming · quick join"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-h-0 overflow-y-auto overscroll-contain scrollbar-thin divide-y divide-rose-50", children: [
      upcoming.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-6 text-center", children: [
        /* @__PURE__ */ jsx(Calendar, { className: "w-8 h-8 text-rose-200 mx-auto mb-2" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-slate-500", children: "No meetings today" }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-1", children: "Book one to get started" })
      ] }) : upcoming.map((m) => /* @__PURE__ */ jsx(ScheduleItem, { meeting: m, onJoin, onCopyLink, onDelete }, m.id)),
      history.length > 0 && /* @__PURE__ */ jsxs("div", { className: "border-t border-rose-100 bg-slate-50/50", children: [
        /* @__PURE__ */ jsx("p", { className: "px-3 pt-3 pb-1 text-[10px] font-black uppercase tracking-wide text-slate-400", children: "Recent" }),
        /* @__PURE__ */ jsx("div", { className: "divide-y divide-rose-50 pb-2", children: history.slice(0, 3).map((m) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 px-3 py-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-slate-800 truncate", children: m.title }),
            /* @__PURE__ */ jsx("p", { className: "text-[9px] text-slate-400", children: m.time })
          ] }),
          /* @__PURE__ */ jsx(Badge, { tone: "success", children: m.outcome })
        ] }, m.id)) })
      ] })
    ] })
  ] });
}
function UpcomingCard({ meeting, onJoin, onCopyLink, onDelete }) {
  return /* @__PURE__ */ jsxs("article", { className: "group rounded-2xl border border-rose-100/80 bg-white p-4 hover:border-rose-200 hover:shadow-[0_8px_24px_rgba(244,63,94,0.06)] transition-all", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-rose-50 border border-rose-100 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(Video, { className: "w-4 h-4 text-rose-600" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900 truncate group-hover:text-rose-900 transition", children: meeting.title }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-500 mt-0.5", children: meeting.time })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
            /* @__PURE__ */ jsx(PlatformBadge, { platform: meeting.platform }),
            onDelete && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => onDelete(meeting.id),
                className: "p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors",
                "aria-label": "Delete meeting",
                children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-[11px] mt-2 truncate", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-800", children: meeting.lead }),
          /* @__PURE__ */ jsxs("span", { className: "text-slate-400", children: [
            " · ",
            meeting.company
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mt-4 pt-3 border-t border-rose-50", children: [
      /* @__PURE__ */ jsxs(BtnPrimary, { className: "!py-1.5 !px-3 !text-[11px] !rounded-xl", onClick: () => onJoin(meeting), children: [
        /* @__PURE__ */ jsx(Video, { className: "w-3.5 h-3.5" }),
        " Join"
      ] }),
      meeting.meetLink && /* @__PURE__ */ jsxs(BtnSecondary, { className: "!py-1.5 !px-3 !text-[11px] !rounded-xl", onClick: () => onCopyLink(meeting.meetLink), children: [
        /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" }),
        " Copy"
      ] })
    ] })
  ] });
}
function EmployeeMeetings() {
  const { employee, leads } = useEmployee();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState("upcoming");
  const [search, setSearch] = useState("");
  const [upcoming, setUpcoming] = useState(EMP_MEETINGS_UPCOMING);
  const [form, setForm] = useState(EMPTY_FORM);
  const [drawerOpen, setDrawerOpen] = useState(searchParams.get("action") === "add");
  useEffect(() => {
    if (searchParams.get("action") === "add") setDrawerOpen(true);
  }, [searchParams]);
  const selectedPlatform = MEETING_PLATFORMS.find((p) => p.id === form.platform) || MEETING_PLATFORMS[0];
  const stats = useMemo(() => ({
    today: upcoming.filter((m) => m.time.toLowerCase().includes("today")).length,
    week: upcoming.length,
    completed: EMP_MEETINGS_HISTORY.length,
    googleMeet: upcoming.filter((m) => m.platform === "Google Meet").length
  }), [upcoming]);
  const filteredUpcoming = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return upcoming;
    return upcoming.filter(
      (m) => m.title.toLowerCase().includes(q) || m.lead.toLowerCase().includes(q) || m.platform.toLowerCase().includes(q)
    );
  }, [upcoming, search]);
  const filteredHistory = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return EMP_MEETINGS_HISTORY;
    return EMP_MEETINGS_HISTORY.filter(
      (m) => m.title.toLowerCase().includes(q) || m.outcome.toLowerCase().includes(q)
    );
  }, [search]);
  const closeDrawer = () => {
    setDrawerOpen(false);
    if (searchParams.get("action") === "add") setSearchParams({}, { replace: true });
  };
  const handleGenerateMeetLink = () => {
    const link = generateGoogleMeetLink();
    setForm((f) => ({ ...f, meetLink: link, platform: "google_meet" }));
    toast.success("Google Meet link generated");
  };
  const handleCopyLink = (link) => {
    navigator.clipboard?.writeText(link);
    toast.success("Meeting link copied");
  };
  const handleJoin = (meeting) => {
    if (meeting.meetLink) {
      window.open(meeting.meetLink, "_blank", "noopener,noreferrer");
      toast.success(`Opening ${meeting.platform}…`);
    } else {
      toast.success("Joining meeting…");
    }
  };
  const handleDelete = (meetingId) => {
    setUpcoming((prev) => prev.filter((m) => m.id !== meetingId));
    toast.success("Meeting deleted");
  };
  const handleCreate = () => {
    if (!form.title.trim()) {
      toast.error("Meeting title is required");
      return;
    }
    const lead = leads.find((l) => String(l.id) === form.leadId);
    const newMeeting = {
      id: Date.now(),
      title: form.title.trim(),
      time: `Scheduled, ${form.time}`,
      date: form.date,
      platform: PLATFORM_LABELS[form.platform] || "Google Meet",
      lead: lead?.name || "—",
      company: lead?.company || "—",
      color: lead?.color || "#e11d48",
      meetLink: form.meetLink || (form.platform === "google_meet" ? generateGoogleMeetLink() : "")
    };
    setUpcoming((prev) => [newMeeting, ...prev]);
    setForm(EMPTY_FORM);
    closeDrawer();
    toast.success("Meeting created & invites sent");
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-5 page-shell min-w-0 animate-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4", children: [
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "Today", value: String(stats.today), icon: Calendar, tone: "primary", change: "scheduled", sub: "" }),
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "This Week", value: String(stats.week), icon: CalendarClock, tone: "warning", change: "upcoming", sub: "" }),
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "Completed", value: String(stats.completed), icon: CheckCircle2, tone: "success", change: "last 30 days", sub: "" }),
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "Google Meet", value: String(stats.googleMeet), icon: Link2, tone: "success", change: "with live links", sub: "" })
    ] }),
    /* @__PURE__ */ jsx(GlassCard, { className: "p-3 sm:p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsx("div", { className: `${SEGMENT_WRAP} w-full sm:w-auto`, children: [
        { id: "upcoming", label: "Upcoming", icon: CalendarClock },
        { id: "history", label: "History", icon: History }
      ].map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setTab(id),
          className: `flex items-center gap-1 ${SEGMENT_BTN} ${tab === id ? SEGMENT_BTN_ACTIVE : SEGMENT_BTN_INACTIVE}`,
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5" }),
            label
          ]
        },
        id
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500 pointer-events-none" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search meetings, leads, platforms…",
            className: "w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-rose-100 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(BtnPrimary, { onClick: () => setDrawerOpen(true), className: "w-full sm:w-auto shrink-0", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
        " Book Meeting"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-3 sm:gap-4 items-stretch", children: [
      /* @__PURE__ */ jsx("div", { className: "min-w-0 flex flex-col", children: tab === "upcoming" ? filteredUpcoming.length === 0 ? /* @__PURE__ */ jsx(GlassCard, { className: `py-10 flex items-center justify-center ${PANEL_HEIGHT}`, children: /* @__PURE__ */ jsx(EmpEmptyState, { icon: "📅", title: "No upcoming meetings", subtitle: "Book a meeting or clear your search" }) }) : /* @__PURE__ */ jsx(GlassCard, { className: `p-0 overflow-hidden flex flex-col ${PANEL_HEIGHT}`, children: /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0 overflow-y-auto overscroll-contain scrollbar-thin p-3 sm:p-4", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: filteredUpcoming.map((m) => /* @__PURE__ */ jsx(
        UpcomingCard,
        {
          meeting: m,
          onJoin: handleJoin,
          onCopyLink: handleCopyLink,
          onDelete: handleDelete
        },
        m.id
      )) }) }) }) : /* @__PURE__ */ jsxs(GlassCard, { className: `p-0 overflow-hidden flex flex-col ${PANEL_HEIGHT}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 border-b border-rose-50 bg-rose-50/40 shrink-0", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-slate-900", children: "Meeting History" }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-500", children: "Past sessions & outcomes" })
        ] }),
        filteredHistory.length === 0 ? /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsx(EmpEmptyState, { icon: "📋", title: "No history found", subtitle: "Try a different search" }) }) : /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0 overflow-y-auto overscroll-contain scrollbar-thin divide-y divide-rose-50", children: filteredHistory.map((m) => /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 px-4 py-3.5 hover:bg-rose-50/30 transition", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900", children: m.title }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-500 mt-0.5", children: m.time }),
            m.platform && /* @__PURE__ */ jsx("span", { className: "inline-block mt-1.5", children: /* @__PURE__ */ jsx(PlatformBadge, { platform: m.platform }) })
          ] }),
          /* @__PURE__ */ jsx(Badge, { tone: "success", children: m.outcome })
        ] }, m.id)) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden xl:flex min-w-0 flex-col", children: /* @__PURE__ */ jsx(
        TodaySchedulePanel,
        {
          upcoming: filteredUpcoming,
          history: filteredHistory,
          onJoin: handleJoin,
          onCopyLink: handleCopyLink,
          onDelete: handleDelete
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      BookMeetingDrawer,
      {
        open: drawerOpen,
        form,
        setForm,
        leads,
        employee,
        selectedPlatform,
        onClose: closeDrawer,
        onCreate: handleCreate,
        onGenerateLink: handleGenerateMeetLink,
        onCopyLink: handleCopyLink
      }
    )
  ] });
}
export {
  EmployeeMeetings as default
};
