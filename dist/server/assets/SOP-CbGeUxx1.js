import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { V as readCachedJson, z as apiGet, D as apiPut, x as apiDelete, C as apiPost } from "./_-BNdSRMjW.js";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { Search, X, ChevronDown, SortAsc, LayoutGrid, List, Plus, FileText, Star, CheckCircle2, Users, Phone, PhoneCall, BookOpen, ChevronRight, Pencil, MoreVertical, Edit2, Copy, Download, Archive, Trash2, Clock, MessageSquare, Tag, Activity, GitBranch, Sparkles, Paperclip, Save, RefreshCw, AlertTriangle, Check, Zap, Eye, UserCheck, Send, GripVertical } from "lucide-react";
import { a as StatCard } from "./Primitives-CmGbnOU9.js";
import "@tanstack/react-query";
import "react-dom";
import "react-hot-toast";
const cn = (...classes) => classes.filter(Boolean).join(" ");
const priorityTone = (p) => ({ Critical: "destructive", High: "warning", Medium: "primary", Low: "muted" })[p] ?? "muted";
const statusTone = (s) => ({ Active: "success", Review: "warning", Draft: "muted", Archived: "secondary" })[s] ?? "muted";
function Badge({ tone = "muted", className = "", children }) {
  const styles = {
    primary: "bg-rose-100 text-rose-700 border-rose-300",
    success: "bg-green-100 text-green-700 border-green-300",
    warning: "bg-amber-100 text-amber-700 border-amber-300",
    destructive: "bg-red-100 text-red-700 border-red-300",
    info: "bg-sky-100 text-sky-700 border-sky-300",
    muted: "bg-rose-50 text-rose-400 border-rose-200",
    secondary: "bg-slate-100 text-slate-600 border-slate-200"
  };
  return /* @__PURE__ */ jsx("span", { className: cn(
    "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border",
    styles[tone] ?? styles.muted,
    className
  ), children });
}
function GlassCard({ className = "", children, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("rounded-[24px] border border-rose-100 bg-gradient-to-br from-white via-[#fff9fa] to-[#fff3f4] shadow-sm", className),
      ...props,
      children
    }
  );
}
function Field({ label, children }) {
  return /* @__PURE__ */ jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-wider text-rose-700 mb-1", children: label }),
    children
  ] });
}
function Toast({ toasts, removeToast }) {
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none", children: /* @__PURE__ */ jsx(AnimatePresence, { children: toasts.map((t) => /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -10, scale: 0.95 },
      className: cn(
        "pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium shadow-lg",
        t.type === "success" && "bg-green-50 border-green-200 text-green-700",
        t.type === "error" && "bg-red-50 border-red-200 text-red-700",
        t.type === "info" && "bg-rose-50 border-rose-200 text-rose-700"
      ),
      children: [
        t.type === "success" && /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 shrink-0" }),
        t.type === "error" && /* @__PURE__ */ jsx(X, { className: "w-4 h-4 shrink-0" }),
        t.type === "info" && /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 shrink-0" }),
        t.message
      ]
    },
    t.id
  )) }) });
}
function ConfirmModal({ open, onConfirm, onCancel, title, message, confirmLabel = "Delete", danger = true }) {
  return /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-[120] flex items-center justify-center p-4",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: onCancel
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "relative z-10 w-full max-w-sm rounded-2xl border border-rose-100 bg-white shadow-2xl p-6",
            initial: { scale: 0.9, y: 20, opacity: 0 },
            animate: { scale: 1, y: 0, opacity: 1 },
            exit: { scale: 0.9, y: 20, opacity: 0 },
            transition: { type: "spring", stiffness: 350, damping: 25 },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: cn(
                  "w-10 h-10 rounded-xl grid place-items-center shrink-0",
                  danger ? "bg-red-500/15 border border-red-500/30" : "bg-amber-500/15 border border-amber-500/30"
                ), children: /* @__PURE__ */ jsx(AlertTriangle, { className: cn("w-5 h-5", danger ? "text-red-400" : "text-amber-400") }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm text-gray-800", children: title }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-1", children: message })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx("button", { onClick: onCancel, className: "flex-1 py-2 rounded-xl border border-border text-sm hover:bg-secondary/40 transition-colors text-muted-foreground", children: "Cancel" }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: onConfirm,
                    className: cn(
                      "flex-1 py-2 rounded-xl text-sm font-medium transition-all",
                      danger ? "bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30" : "bg-amber-500/20 border border-amber-500/40 text-amber-400 hover:bg-amber-500/30"
                    ),
                    children: confirmLabel
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  ) });
}
function Drawer({ open, onClose, title, children, width = "max-w-2xl", zIndex = 60, headerRight }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 flex", style: { zIndex }, children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute inset-0 bg-black/30 backdrop-blur-sm",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: cn("relative ml-auto h-full w-full flex flex-col bg-white border-l border-rose-100 shadow-2xl overflow-hidden", width),
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
        transition: { type: "spring", stiffness: 300, damping: 30 },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-rose-100 shrink-0 bg-rose-50/50", children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm text-gray-800 truncate pr-2", children: title }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              headerRight,
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onClose,
                  className: "w-10 h-10 rounded-lg text-[#be123c]  bg-rose-50/60 hover:bg-rose-100 transition",
                  style: { fontWeight: 700 },
                  children: "✕"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-5 bg-white", children })
        ]
      }
    )
  ] }) });
}
const categoryConfig = {
  "All SOPs": { icon: LayoutGrid, glowColor: "225, 29, 72", trend: "+12%", trendUp: true },
  "Sales Call": { icon: PhoneCall, glowColor: "225, 29, 72", trend: "+3%", trendUp: true },
  "After Call": { icon: Phone, glowColor: "225, 29, 72", trend: "+2%", trendUp: true },
  "During Meeting": { icon: Users, glowColor: "225, 29, 72", trend: "+4%", trendUp: true },
  "After Meeting": { icon: CheckCircle2, glowColor: "225, 29, 72", trend: "+1%", trendUp: true },
  "After Closing": { icon: Star, glowColor: "225, 29, 72", trend: "+5%", trendUp: true }
};
function KPICard({ c }) {
  const cfg = categoryConfig[c.name] || { icon: FileText, trend: "+0%" };
  const Icon = cfg.icon;
  const toneMap = {
    "All SOPs": "purple",
    "Sales Call": "success",
    "After Call": "warning",
    "During Meeting": "info",
    "After Meeting": "primary",
    "After Closing": "indigo"
  };
  const tone = toneMap[c.name] || "primary";
  return /* @__PURE__ */ jsx(
    StatCard,
    {
      label: c.name,
      value: c.count,
      change: cfg.trend,
      sub: "vs last period",
      icon: Icon,
      tone,
      hover: true
    }
  );
}
function ActivityTimeline({ sop }) {
  const events = [
    { icon: GitBranch, color: "text-sky-800", bg: "bg-sky-500/15", label: `Version ${sop.version} published`, time: sop.updated },
    { icon: UserCheck, color: "text-green-800", bg: "bg-green-500/15", label: `${sop.acknowledgedCount} employees acknowledged`, time: "Last week" },
    { icon: Eye, color: "text-purple-800", bg: "bg-purple-500/15", label: `${sop.readCount} total reads`, time: "This month" },
    { icon: Edit2, color: "text-amber-800", bg: "bg-amber-500/15", label: "SOP reviewed and updated", time: sop.updated },
    { icon: CheckCircle2, color: "text-green-800", bg: "bg-green-500/15", label: "Manager approval received", time: sop.created }
  ];
  return /* @__PURE__ */ jsx("div", { className: "space-y-2", children: events.map((e, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsx("div", { className: cn("w-9 h-9 rounded-lg grid place-items-center shrink-0 border border-primary/80", e.bg), children: /* @__PURE__ */ jsx(e.icon, { className: cn("w-3.5 h-3.5", e.color) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 pt-0.5", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-700", children: e.label }),
      /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-700 mt-0.5", children: e.time })
    ] })
  ] }, i)) });
}
function CommentsSection({ sop, onAddComment, onUpdateComment, onDeleteComment }) {
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const startEdit = (c) => {
    setEditingId(c.id);
    setEditText(c.text);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };
  const submitEdit = (c) => {
    if (editText.trim()) {
      onUpdateComment(sop.id, c.id, editText.trim());
      setEditingId(null);
      setEditText("");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    sop.comments.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-xs text-rose-700 text-center py-4 border border-dashed border-rose-700 rounded-xl", children: "No comments yet. Be the first to comment." }),
    sop.comments.map((c) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5 group", children: [
      /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-rose-100 border border-rose-200 grid place-items-center shrink-0 text-[10px] font-semibold text-rose-700", children: (c.author || "?").split(" ").map((n) => n[0]).join("").slice(0, 2) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-rose-800", children: c.author }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400", children: c.time })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => startEdit(c),
                className: "p-1 rounded hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-colors",
                children: /* @__PURE__ */ jsx(Edit2, { className: "w-3 h-3" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onDeleteComment(sop.id, c.id),
                className: "p-1 rounded hover:bg-rose-50 text-gray-400 hover:text-red-500 transition-colors",
                children: /* @__PURE__ */ jsx(Trash2, { className: "w-3 h-3" })
              }
            )
          ] })
        ] }),
        editingId === c.id ? /* @__PURE__ */ jsxs("div", { className: "mt-1 space-y-1", children: [
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: editText,
              onChange: (e) => setEditText(e.target.value),
              rows: 2,
              className: "w-full text-xs p-2 border border-rose-300 rounded-lg bg-white text-rose-800 resize-none focus:outline-none focus:ring-2 focus:ring-rose-300/40"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => submitEdit(c),
                className: "px-2.5 py-1 rounded-lg text-[10px] font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors",
                children: "Save"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: cancelEdit,
                className: "px-2.5 py-1 rounded-lg text-[10px] font-medium border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors",
                children: "Cancel"
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsx("div", { className: "text-xs text-rose-800 mt-0.5 p-2.5 rounded-lg bg-rose-50/60 border border-rose-100", children: c.text })
      ] })
    ] }, c.id)),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-start pt-1", children: [
      /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-rose-100 border border-rose-200 grid place-items-center shrink-0 text-[10px] font-semibold text-rose-700", children: "ME" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: text,
            onChange: (e) => setText(e.target.value),
            placeholder: "Add a comment…",
            rows: 2,
            className: "w-full resize-none text-xs p-2.5 pr-8 border border-rose-200 rounded-lg bg-white text-rose-800 placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300/40"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              if (text.trim()) {
                onAddComment(sop.id, text);
                setText("");
              }
            },
            className: "absolute right-2 bottom-2 p-1.5 rounded-lg text-rose-400 hover:bg-rose-100 transition-colors",
            children: /* @__PURE__ */ jsx(Send, { className: "w-3 h-3" })
          }
        )
      ] })
    ] })
  ] });
}
function AnalyticsStrip({ sop }) {
  const pct = sop.readCount > 0 ? Math.round(sop.acknowledgedCount / sop.readCount * 100) : 0;
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: [
    { label: "Total Reads", value: sop.readCount, icon: Eye, color: "text-sky-400" },
    { label: "Acknowledged", value: sop.acknowledgedCount, icon: UserCheck, color: "text-green-400" },
    { label: "Ack. Rate", value: `${pct}%`, icon: Star, color: "text-amber-400" }
  ].map((s) => /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-rose-50/60 border border-rose-700 text-center", children: [
    /* @__PURE__ */ jsx(s.icon, { className: cn("w-4 h-4 mx-auto mb-1.5", s.color) }),
    /* @__PURE__ */ jsx("div", { className: "text-base font-bold tabular-nums text-rose-800", children: s.value }),
    /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-700 mt-0.5", children: s.label })
  ] }, s.label)) });
}
function SOPDetailDrawer({ sop, onClose, onEdit, onDelete, onDuplicate, onArchive, onAddComment, onUpdateComment, onDeleteComment }) {
  const [tab, setTab] = useState("overview");
  const tabs = ["overview", "activity", "comments", "versions"];
  return /* @__PURE__ */ jsx(
    Drawer,
    {
      open: !!sop,
      onClose,
      title: sop?.title || "",
      width: "max-w-2xl",
      zIndex: 60,
      headerRight: sop && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onEdit(sop),
            className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-rose-700 text-rose-700 hover:text-rose-700 hover:bg-rose-700 hover:text-white transition-all",
            children: [
              /* @__PURE__ */ jsx(Edit2, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Edit" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onDuplicate(sop),
            className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-rose-700 text-rose-700 hover:text-rose-700 hover:bg-rose-700 hover:text-white  transition-all",
            children: [
              /* @__PURE__ */ jsx(Copy, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Duplicate" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onDelete(sop),
            className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-rose-700 text-rose-700 hover:text-rose-700 hover:bg-rose-700 hover:text-white transition-all",
            children: [
              /* @__PURE__ */ jsx(Trash2, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Delete" })
            ]
          }
        )
      ] }),
      children: sop && /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { tone: statusTone(sop.status), children: sop.status }),
          /* @__PURE__ */ jsx(Badge, { tone: priorityTone(sop.priority), children: sop.priority }),
          /* @__PURE__ */ jsx(Badge, { tone: "muted", children: sop.category }),
          /* @__PURE__ */ jsx(Badge, { tone: "info", children: sop.version }),
          sop.status !== "Archived" && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => onArchive(sop),
              className: "inline-flex items-center gap-1 text-[10px] text-rose-500 hover:text-amber-400 border border-rose-600 hover:border-amber-500/30 px-2 py-0.5 rounded-md transition-all",
              children: [
                /* @__PURE__ */ jsx(Archive, { className: "w-3 h-3" }),
                " Archive"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-rose-50/60  border border-rose-500", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full gradient-primary grid place-items-center shrink-0 text-sm font-bold text-primary-foreground", children: sop.creator.split(" ").map((n) => n[0]).join("").slice(0, 2) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-rose-700", children: sop.creator }),
            /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-gray-700", children: [
              sop.department,
              " · Created ",
              sop.created
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-700", children: "Est. Time" }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs font-medium mt-0.5 flex items-center gap-1 justify-end text-rose-700", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3 text-primary" }),
              sop.estimatedTime
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(AnalyticsStrip, { sop }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1 p-1 rounded-xl bg-rose-50/60 border border-rose-500", children: tabs.map((t) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setTab(t),
            className: cn(
              "flex-1 py-1.5 rounded-lg text-[11px] font-medium capitalize transition-all",
              tab === t ? "gradient-primary text-primary-foreground shadow-sm" : "text-gray-700 hover:text-rose-700"
            ),
            children: t
          },
          t
        )) }),
        /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            transition: { duration: 0.15 },
            children: [
              tab === "overview" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-rose-700 mb-2", children: "Description" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700", children: sop.description })
                ] }),
                sop.frameworks?.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-xs uppercase tracking-wider text-rose-700 mb-2 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(BookOpen, { className: "w-3 h-3" }),
                    " Frameworks (Knowledge)"
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: sop.frameworks.map((f) => /* @__PURE__ */ jsx(Badge, { tone: "info", children: f }, f)) })
                ] }),
                sop.script && /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-xs uppercase tracking-wider text-rose-700 mb-2 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(MessageSquare, { className: "w-3 h-3" }),
                    " Script"
                  ] }),
                  /* @__PURE__ */ jsx("pre", { className: "text-xs text-gray-700 bg-rose-50 border border-rose-100 rounded-xl p-3 whitespace-pre-wrap font-mono leading-relaxed", children: sop.script })
                ] }),
                sop.questions?.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-xs uppercase tracking-wider text-rose-700 mb-2 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(MessageSquare, { className: "w-3 h-3" }),
                    " Questions"
                  ] }),
                  /* @__PURE__ */ jsx("ol", { className: "space-y-1.5", children: sop.questions.map((q, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2 text-sm text-gray-700", children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-rose-700 font-semibold shrink-0", children: [
                      i + 1,
                      "."
                    ] }),
                    q
                  ] }, i)) })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-rose-700 mb-3", children: "Steps" }),
                  /* @__PURE__ */ jsx("ol", { className: "space-y-2", children: sop.steps.map((st, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 p-3 rounded-xl bg-rose-50 border border-rose-100", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-lg bg-gradient-to-br from-rose-600 to-rose-800 grid place-items-center text-[11px] font-semibold shrink-0 text-white", children: i + 1 }),
                    /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-700", children: st })
                  ] }, i)) })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-xs uppercase tracking-wider text-rose-700 mb-2 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Tag, { className: "w-3 h-3" }),
                    " Tags"
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: sop.tags.map((t) => /* @__PURE__ */ jsx(Badge, { tone: "primary", children: t }, t)) })
                ] })
              ] }),
              tab === "activity" && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-xs uppercase tracking-wider text-rose-700 mb-3 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(Activity, { className: "w-3 h-3" }),
                  " Activity Timeline"
                ] }),
                /* @__PURE__ */ jsx(ActivityTimeline, { sop })
              ] }),
              tab === "comments" && /* @__PURE__ */ jsx(
                CommentsSection,
                {
                  sop,
                  onAddComment,
                  onUpdateComment,
                  onDeleteComment
                }
              ),
              tab === "versions" && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-xs uppercase tracking-wider text-rose-700 mb-3 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(GitBranch, { className: "w-3 h-3" }),
                  " Revision History"
                ] }),
                sop.revisions?.length > 0 ? sop.revisions.map((r, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 rounded-xl bg-rose-50/60 border border-rose-700", children: [
                  /* @__PURE__ */ jsx(Badge, { tone: i === 0 ? "info" : "muted", children: r.version }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-rose-700", children: r.note }),
                    /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-700 mt-0.5", children: [
                      r.author,
                      " · ",
                      r.date
                    ] })
                  ] }),
                  i === 0 && /* @__PURE__ */ jsx(Badge, { tone: "success", children: "Current" })
                ] }, i)) : /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 rounded-xl bg-rose-50/60 border border-rose-200", children: [
                    /* @__PURE__ */ jsx(Badge, { tone: "info", children: sop.version }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-rose-700", children: "Current version" }),
                      /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-700 mt-0.5", children: [
                        sop.creator,
                        " · Last updated ",
                        sop.updated
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(Badge, { tone: "success", children: "Current" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 rounded-xl bg-rose-50/40 border border-dashed border-rose-200", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(GitBranch, { className: "w-3 h-3 text-rose-400" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-rose-700", children: "Initial publish" }),
                      /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-700 mt-0.5", children: [
                        sop.creator,
                        " · Created ",
                        sop.created
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400 text-center pt-1", children: "Full revision history will appear here as this SOP is updated." })
                ] })
              ] })
            ]
          },
          tab
        ) })
      ] })
    }
  );
}
function StepItem({ step, index, onChange, onRemove }) {
  return /* @__PURE__ */ jsxs(Reorder.Item, { value: step, id: step.id, className: "flex gap-2 items-center group", children: [
    /* @__PURE__ */ jsx("div", { className: "cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-1 shrink-0", children: /* @__PURE__ */ jsx(GripVertical, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground w-5 shrink-0", children: [
      index + 1,
      "."
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        value: step.text,
        onChange: (e) => onChange(step.id, e.target.value),
        className: "sop-input flex-1 text-sm",
        placeholder: `Step ${index + 1}`
      }
    ),
    /* @__PURE__ */ jsx("button", { onClick: () => onRemove(step.id), className: "text-muted-foreground hover:text-red-400 p-1 transition-colors opacity-0 group-hover:opacity-100 shrink-0", children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" }) })
  ] });
}
const CATS = ["Sales Call", "After Call", "During Meeting", "After Meeting", "After Closing"];
const STATS = ["Draft", "Review", "Active"];
const PRIS = ["Low", "Medium", "High", "Critical"];
const TAG_SUGGESTIONS = ["CRM", "leads", "onboarding", "deployment", "review", "tracking", "enterprise", "automation", "analytics", "compliance"];
function makeStep(text = "") {
  return { id: crypto.randomUUID?.() || Math.random().toString(36), text };
}
function makeBlankForm() {
  return {
    title: "",
    description: "",
    category: "Sales Call",
    status: "Draft",
    priority: "Medium",
    tags: [],
    steps: Array.from({ length: 3 }, () => makeStep()),
    department: "",
    estimatedTime: "",
    attachments: [],
    script: "",
    questions: [""],
    frameworks: [""]
  };
}
function sopToForm(s) {
  return {
    title: s.title,
    description: s.description,
    category: s.category,
    status: s.status,
    priority: s.priority,
    tags: [...s.tags],
    steps: s.steps.map((t) => makeStep(t)),
    department: s.department || "",
    estimatedTime: s.estimatedTime || "",
    attachments: [...s.attachments || []],
    script: s.script || "",
    questions: s.questions?.length ? s.questions : [""],
    frameworks: s.frameworks?.length ? s.frameworks : [""]
  };
}
function formToSop(base, form, isEdit) {
  return {
    ...base,
    title: form.title.trim(),
    description: form.description.trim(),
    category: form.category,
    status: form.status,
    priority: form.priority,
    tags: form.tags,
    steps: form.steps.map((s) => s.text).filter(Boolean),
    department: form.department,
    estimatedTime: form.estimatedTime,
    attachments: form.attachments,
    script: form.script || null,
    questions: form.questions.filter(Boolean),
    frameworks: form.frameworks.filter(Boolean),
    updated: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    ...isEdit ? {} : {
      id: Date.now(),
      created: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      version: "v1.0",
      creator: "Current User",
      readCount: 0,
      acknowledgedCount: 0,
      comments: [],
      revisions: [{ version: "v1.0", date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0], author: "Current User", note: "Initial publish" }]
    }
  };
}
const SOP_STORAGE_KEY = "admin_dashboard_sops";
function normalizeApiSop(sop) {
  return {
    ...sop,
    creator: sop.creator || "Admin",
    created: sop.created_at?.split("T")[0] || sop.created || "",
    updated: sop.updated_at?.split("T")[0] || sop.updated || "",
    estimatedTime: sop.estimated_time || sop.estimatedTime || "",
    steps: (sop.instruction_steps || sop.steps || []).map((s) => typeof s === "string" ? s : s.title || ""),
    questions: sop.questions || [],
    frameworks: sop.frameworks || [],
    tags: sop.tags || [],
    comments: (sop.comments || []).map((c) => ({
      id: c.id,
      author: c.author || "Unknown",
      text: c.text || "",
      time: c.time || (c.created_at ? new Date(c.created_at).toLocaleString() : "Just now")
    })),
    attachments: sop.attachments || (sop.attachment_url ? [sop.attachment_url] : []),
    revisions: sop.revisions || [],
    version: sop.version || "v1.0",
    readCount: sop.readCount || 0,
    acknowledgedCount: sop.acknowledgedCount || 0
  };
}
function loadLocalSops() {
  try {
    const raw = localStorage.getItem(SOP_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function persistLocalSops(list) {
  try {
    localStorage.setItem(SOP_STORAGE_KEY, JSON.stringify(list));
  } catch (error) {
    console.error("Failed to persist SOPs locally:", error);
  }
}
function buildLocalSop(formData, asDraft, existing = null) {
  const form = asDraft ? { ...formData, status: "Draft" } : formData;
  return formToSop(existing || {}, form, !!existing);
}
function validate(form) {
  const errs = {};
  if (!form.title.trim()) errs.title = "Title is required";
  if (!form.description.trim()) errs.description = "Description is required";
  if (form.steps.filter((s) => s.text.trim()).length === 0) errs.steps = "At least one step is required";
  return errs;
}
function SOPForm({ initialData, onSave, onClose, isEdit = false }) {
  const [form, setForm] = useState(() => initialData ? sopToForm(initialData) : makeBlankForm());
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState("");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiStatusText, setAiStatusText] = useState("");
  const [aiRecommending, setAiRecommending] = useState(false);
  const lastAutofilledTitle = useRef("");
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  useEffect(() => {
    const titleClean = (form.title || "").trim();
    if (titleClean.length < 5 || titleClean === lastAutofilledTitle.current) {
      return;
    }
    setAiRecommending(true);
    const timer = setTimeout(() => {
      lastAutofilledTitle.current = titleClean;
      setTimeout(() => {
        const generated = generateSOPData(titleClean);
        setForm((f) => ({
          ...f,
          description: f.description.trim() ? f.description : generated.description,
          category: f.category === "Sales Call" && generated.category !== "Sales Call" ? generated.category : f.category,
          priority: f.priority === "Medium" && generated.priority !== "Medium" ? generated.priority : f.priority,
          department: f.department.trim() ? f.department : generated.department,
          estimatedTime: f.estimatedTime.trim() ? f.estimatedTime : generated.estimatedTime,
          script: f.script.trim() ? f.script : generated.script,
          questions: f.questions.length <= 1 && !f.questions[0] ? generated.questions : f.questions,
          frameworks: f.frameworks.length <= 1 && !f.frameworks[0] ? generated.frameworks : f.frameworks,
          tags: f.tags.length === 0 ? generated.tags : f.tags,
          steps: f.steps.length <= 3 && f.steps.every((s) => !s.text.trim()) ? generated.steps.map((text) => makeStep(text)) : f.steps
        }));
        setAiRecommending(false);
      }, 500);
    }, 800);
    return () => clearTimeout(timer);
  }, [form.title]);
  const addTag = (tag) => {
    const t = tag.trim().toLowerCase();
    if (t && !form.tags.includes(t)) set("tags", [...form.tags, t]);
    setTagInput("");
    setShowTagSuggestions(false);
  };
  const removeTag = (tag) => set("tags", form.tags.filter((t) => t !== tag));
  const filteredSuggestions = tagInput ? TAG_SUGGESTIONS.filter((s) => s.includes(tagInput.toLowerCase()) && !form.tags.includes(s)) : [];
  const handleSubmit = (asDraft = false) => {
    const f = asDraft ? { ...form, status: "Draft" } : form;
    const errs = validate(f);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave(f, asDraft);
  };
  const stepChange = (id, text) => set("steps", form.steps.map((s) => s.id === id ? { ...s, text } : s));
  const stepRemove = (id) => set("steps", form.steps.filter((s) => s.id !== id));
  const stepsReorder = (newSteps) => set("steps", newSteps);
  const generateSOPData = (inputText) => {
    const query = (inputText || "").toLowerCase();
    let title = inputText || "Standard Sales Interaction Protocol";
    let description = "Standard operating procedure detailing key interaction protocols, execution steps, and compliance requirements.";
    let category = "Sales Call";
    let priority = "Medium";
    let department = "Sales Operations";
    let estimatedTime = "15 min";
    let script = "Agent: Hello [Lead Name], thank you for showing interest in our solutions. I'm calling to understand your current requirements...\nClient: Yes, we are currently evaluating CRM tools.";
    let questions = [
      "What is your current system for managing customer pipelines?",
      "What are the biggest pain points with your current solution?",
      "Who are the key decision-makers involved in this evaluation?"
    ];
    let frameworks = ["BANT (Budget, Authority, Need, Timeline)", "MEDDIC"];
    let tags = ["sales", "leads", "compliance"];
    let steps = [
      "Greet the client and establish a positive tone.",
      "Perform initial discovery by asking about pain points.",
      "Log interaction outcomes and next follow-up date in the CRM."
    ];
    if (query.includes("handoff") || query.includes("onboard") || query.includes("client")) {
      title = inputText.includes(".") ? "Lead Handoff to Customer Onboarding" : inputText;
      description = "SOP outlining the exact workflow, documentation exchange, and communications required when transitioning a closed-won deal from Sales to Customer Success.";
      category = "After Closing";
      priority = "High";
      department = "Customer Success";
      estimatedTime = "25 min";
      script = "Hi Onboarding Team, we have successfully closed [Client Name] and need to transition their account details. They are ready for implementation next Monday.";
      questions = [
        "Has the contract been signed and uploaded to the client folder?",
        "What are the primary goals/expectations the client has for their first 30 days?",
        "Who will be the primary point of contact for onboarding?"
      ];
      frameworks = ["MEDDPICC", "CS Handover Checklist"];
      tags = ["onboarding", "handoff", "success", "client"];
      steps = [
        "Mark lead as Closed Won and update contract details.",
        "Schedule internal handoff meeting between Account Executive and Customer Success Manager.",
        "Send introductory email to client introducing their CS lead.",
        "Set up kickoff calendar invite and share initial onboarding questionnaire."
      ];
    } else if (query.includes("objection") || query.includes("price") || query.includes("negotiat")) {
      title = inputText.includes(".") ? "Handling Pricing & Budget Objections" : inputText;
      description = "Best practices and scripts for overcoming budget resistance, explaining product value proposition, and navigating pricing discussions.";
      category = "Sales Call";
      priority = "Critical";
      department = "Sales Enablement";
      estimatedTime = "20 min";
      script = "Client: Your pricing is too high, we don't have the budget.\nAgent: I completely understand, [Client Name]. Budget is always a key constraint. Can I ask, outside of price, does our solution address all your key requirements?\nClient: Yes, it does, but we still can't afford it.";
      questions = [
        "Is the objection related to budget constraints or perceived value?",
        "Can we offer flexible monthly/annual payment options?",
        "Are they willing to start with a smaller pilot program?"
      ];
      frameworks = ["LAER (Listen, Acknowledge, Explore, Respond)", "Value Selling Framework"];
      tags = ["sales", "negotiation", "objections", "pricing"];
      steps = [
        "Acknowledge the objection without immediately offering a discount.",
        "Explore the root cause of the budget concern.",
        "Quantify the ROI and value of our solution compared to doing nothing.",
        "Propose flexible payment structures or tier options if necessary."
      ];
    } else if (query.includes("discovery") || query.includes("qualif") || query.includes("call")) {
      title = inputText.includes(".") ? "Sales Discovery and Lead Qualification Protocol" : inputText;
      description = "SOP detailing the key discovery questions and framework required to qualify standard inbound and outbound sales leads.";
      category = "Sales Call";
      priority = "High";
      department = "Business Development";
      estimatedTime = "30 min";
      script = "Agent: Thanks for joining the call today! The goal is to learn a bit about your current operations and see if we might be a good fit to help you scale. To start, could you tell me about...";
      questions = [
        "What does your current technology stack look like?",
        "What is the timeline you are looking to implement a new solution?",
        "What budget has been allocated for this initiative?"
      ];
      frameworks = ["BANT", "MEDDPICC"];
      tags = ["discovery", "qualification", "sales", "bant"];
      steps = [
        "Establish rapport and outline the agenda for the call.",
        "Ask open-ended discovery questions focusing on active problems.",
        "Introduce our high-level value proposition matching their concerns.",
        "Confirm qualification criteria and schedule the product demo."
      ];
    } else if (query.includes("demo") || query.includes("meeting") || query.includes("present")) {
      title = inputText.includes(".") ? "Standard Product Demo and Presentation Flow" : inputText;
      description = "SOP for running structured, value-focused product demonstrations that align directly with pain points identified during discovery.";
      category = "During Meeting";
      priority = "High";
      department = "Solutions Engineering";
      estimatedTime = "40 min";
      script = "Agent: Today, I'm going to walk you through three specific features of our dashboard that directly address the reporting delays you mentioned in our last call. Let's start with...";
      questions = [
        "Does this workflow align with how your team operates daily?",
        "How would this impact your current reporting speed?",
        "Who else on your team needs to review this demo?"
      ];
      frameworks = ["Feature-Benefit Mapping", "Demo-to-Win Framework"];
      tags = ["demo", "meeting", "presentation", "product"];
      steps = [
        "Recap the discovery findings and align on demo goals.",
        "Showcase targeted solution features (not a generic walk-through).",
        "Confirm value and alignment after showing each feature.",
        "Outline post-demo action items and next steps."
      ];
    }
    return {
      title,
      description,
      category,
      priority,
      department,
      estimatedTime,
      script,
      questions,
      frameworks,
      tags,
      steps
    };
  };
  const handleAiAutofill = () => {
    if (!form.title.trim()) {
      alert("Please enter an SOP Title first!");
      return;
    }
    setAiLoading(true);
    setAiStatusText("Analyzing SOP title...");
    const statuses = [
      "Analyzing SOP title...",
      "Generating description and category alignment...",
      "Drafting call scripts and objection-handling strategies...",
      "Formulating qualification questions and frameworks...",
      "Sequencing instructions and step-by-step procedures...",
      "Populating tag elements and estimated execution time...",
      "AI Generation Completed!"
    ];
    let step = 0;
    const interval = setInterval(() => {
      if (step < statuses.length - 1) {
        step++;
        setAiStatusText(statuses[step]);
      } else {
        clearInterval(interval);
        const generated = generateSOPData(form.title);
        setForm((f) => ({
          ...f,
          description: generated.description,
          category: generated.category,
          priority: generated.priority,
          department: generated.department,
          estimatedTime: generated.estimatedTime,
          script: generated.script,
          questions: generated.questions,
          frameworks: generated.frameworks,
          tags: generated.tags,
          steps: generated.steps.map((text) => makeStep(text))
        }));
        setAiLoading(false);
        setErrors({});
      }
    }, 300);
  };
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    let fileName = file.name.replace(/\.[^/.]+$/, "");
    fileName = fileName.replace(/[_-]/g, " ").trim();
    let extractedTitle = fileName.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    extractedTitle = extractedTitle.replace(/Sop/gi, "").replace(/Doc/gi, "").replace(/Manual/gi, "").replace(/Guide/gi, "").trim();
    if (!extractedTitle) extractedTitle = "Standard Operating Procedure Document";
    setAiLoading(true);
    setAiStatusText("Reading uploaded PDF document...");
    const statuses = [
      "Uploading PDF document...",
      "Parsing document hierarchy and layout...",
      "Extracting text headers and content bodies...",
      "Analyzing compliance objectives and workflows...",
      "Mapping procedures to instruction steps...",
      "Identifying checklist questions and training scripts...",
      "Extracting keywords for tags...",
      "SOP fully generated from PDF!"
    ];
    let step = 0;
    const interval = setInterval(() => {
      if (step < statuses.length - 1) {
        step++;
        setAiStatusText(statuses[step]);
      } else {
        clearInterval(interval);
        const generated = generateSOPData(extractedTitle);
        setForm((f) => ({
          ...f,
          title: generated.title,
          description: generated.description,
          category: generated.category,
          priority: generated.priority,
          department: generated.department,
          estimatedTime: generated.estimatedTime,
          script: generated.script,
          questions: generated.questions,
          frameworks: generated.frameworks,
          tags: generated.tags,
          steps: generated.steps.map((text) => makeStep(text))
        }));
        setAiLoading(false);
        setErrors({});
      }
    }, 300);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative p-4 rounded-xl border border-dashed border-rose-300 bg-rose-50/40 space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-rose-700 animate-pulse" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-rose-800 uppercase tracking-wider", children: "AI SOP Auto-Fill" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-rose-700 text-white shadow-sm", children: "AI POWERED" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex-1 min-w-[140px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-rose-200 text-rose-800 text-xs font-bold hover:bg-rose-50/60 hover:border-rose-300 transition-all cursor-pointer shadow-sm", children: [
          /* @__PURE__ */ jsx(FileText, { className: "w-3.5 h-3.5" }),
          "Upload PDF SOP",
          /* @__PURE__ */ jsx("input", { type: "file", accept: ".pdf,image/*,.docx,.txt", className: "hidden", onChange: handlePdfUpload })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: handleAiAutofill,
            className: "flex-1 min-w-[140px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-br from-rose-600 to-rose-800 text-white text-xs font-bold hover:shadow-md transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }),
              "Generate from Title"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-950/80 leading-relaxed font-medium", children: '💡 Enter an SOP **Title** below and click "Generate from Title", or upload a **PDF procedure document** to automatically structure and fill the description, scripts, questions, steps, and frameworks.' }),
      aiLoading && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-white/95 backdrop-blur-sm z-50 rounded-xl flex flex-col items-center justify-center p-3 text-center transition-all", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full border-2 border-rose-200 border-t-rose-700 animate-spin mb-2" }),
        /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-rose-800 mb-0.5", children: "✨ AI Smart Architect" }),
        /* @__PURE__ */ jsx("div", { className: "text-[10px] text-rose-600 font-semibold tracking-wide h-4 animate-pulse", children: aiStatusText })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Field, { label: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
      /* @__PURE__ */ jsx("span", { children: "Title *" }),
      aiRecommending && /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-rose-600 font-bold animate-pulse flex items-center gap-1 normal-case tracking-normal", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "w-3 h-3 animate-spin shrink-0" }),
        " AI recommending details..."
      ] })
    ] }), children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          value: form.title,
          onChange: (e) => {
            set("title", e.target.value);
            setErrors((er) => ({ ...er, title: "" }));
          },
          className: cn("sop-input", errors.title && "border-red-500/60"),
          placeholder: "e.g. Lead handoff to onboarding"
        }
      ),
      errors.title && /* @__PURE__ */ jsx("div", { className: "text-[10px] text-red-400 mt-1", children: errors.title })
    ] }),
    /* @__PURE__ */ jsxs(Field, { label: "Description *", children: [
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: form.description,
          onChange: (e) => {
            set("description", e.target.value);
            setErrors((er) => ({ ...er, description: "" }));
          },
          rows: 3,
          className: cn("sop-input resize-none", errors.description && "border-red-500/60"),
          placeholder: "Describe the purpose and scope of this SOP…"
        }
      ),
      errors.description && /* @__PURE__ */ jsx("div", { className: "text-[10px] text-red-400 mt-1", children: errors.description })
    ] }),
    (form.category === "Sales Call" || form.category === "During Meeting") && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Field, { label: "Script", children: /* @__PURE__ */ jsx(
        "textarea",
        {
          value: form.script,
          onChange: (e) => set("script", e.target.value),
          rows: 4,
          className: "sop-input resize-none font-mono text-xs",
          placeholder: "Write the call/meeting script here…"
        }
      ) }),
      /* @__PURE__ */ jsx(Field, { label: "Questions", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        form.questions.map((q, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              value: q,
              onChange: (e) => {
                const updated = [...form.questions];
                updated[i] = e.target.value;
                set("questions", updated);
              },
              className: "sop-input flex-1",
              placeholder: `Question ${i + 1}`
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => set("questions", form.questions.filter((_, x) => x !== i)),
              className: "text-gray-400 hover:text-red-500 transition-colors",
              children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" })
            }
          )
        ] }, i)),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => set("questions", [...form.questions, ""]),
            className: "text-xs text-rose-600 inline-flex items-center gap-1 hover:underline",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" }),
              " Add question"
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Field, { label: "Frameworks (Knowledge)", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      form.frameworks.map((f, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            value: f,
            onChange: (e) => {
              const updated = [...form.frameworks];
              updated[i] = e.target.value;
              set("frameworks", updated);
            },
            className: "sop-input flex-1",
            placeholder: `Framework ${i + 1} e.g. BANT, MEDDIC`
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => set("frameworks", form.frameworks.filter((_, x) => x !== i)),
            className: "text-gray-400 hover:text-red-500 transition-colors",
            children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" })
          }
        )
      ] }, i)),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => set("frameworks", [...form.frameworks, ""]),
          className: "text-xs text-rose-600 inline-flex items-center gap-1 hover:underline",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" }),
            " Add framework"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx(Field, { label: "Category", children: /* @__PURE__ */ jsx("select", { value: form.category, onChange: (e) => set("category", e.target.value), className: "sop-input", children: CATS.map((c) => /* @__PURE__ */ jsx("option", { children: c }, c)) }) }),
      /* @__PURE__ */ jsx(Field, { label: "Status", children: /* @__PURE__ */ jsx("select", { value: form.status, onChange: (e) => set("status", e.target.value), className: "sop-input", children: STATS.map((s) => /* @__PURE__ */ jsx("option", { children: s }, s)) }) }),
      /* @__PURE__ */ jsx(Field, { label: "Priority", children: /* @__PURE__ */ jsx("select", { value: form.priority, onChange: (e) => set("priority", e.target.value), className: "sop-input", children: PRIS.map((p) => /* @__PURE__ */ jsx("option", { children: p }, p)) }) }),
      /* @__PURE__ */ jsx(Field, { label: "Department", children: /* @__PURE__ */ jsx("input", { value: form.department, onChange: (e) => set("department", e.target.value), className: "sop-input", placeholder: "e.g. Revenue Ops" }) }),
      /* @__PURE__ */ jsx(Field, { label: "Estimated Time", children: /* @__PURE__ */ jsx("input", { value: form.estimatedTime, onChange: (e) => set("estimatedTime", e.target.value), className: "sop-input", placeholder: "e.g. 45 min" }) })
    ] }),
    /* @__PURE__ */ jsx(Field, { label: "Tags", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 mb-1.5", children: form.tags.map((t) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/15 border border-primary/30 text-[11px] font-medium text-primary", children: [
        t,
        /* @__PURE__ */ jsx("button", { onClick: () => removeTag(t), className: "hover:text-red-400 transition-colors", children: /* @__PURE__ */ jsx(X, { className: "w-2.5 h-2.5" }) })
      ] }, t)) }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            value: tagInput,
            onChange: (e) => {
              setTagInput(e.target.value);
              setShowTagSuggestions(true);
            },
            onKeyDown: (e) => e.key === "Enter" && (e.preventDefault(), addTag(tagInput)),
            onBlur: () => setTimeout(() => setShowTagSuggestions(false), 150),
            className: "sop-input",
            placeholder: "Type and press Enter…"
          }
        ),
        showTagSuggestions && filteredSuggestions.length > 0 && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 right-0 mt-1 rounded-xl border border-border bg-card/95 backdrop-blur shadow-xl z-10 overflow-hidden", children: filteredSuggestions.map((s) => /* @__PURE__ */ jsx("button", { onMouseDown: () => addTag(s), className: "w-full text-left px-3 py-2 text-xs hover:bg-secondary/60 transition-colors", children: s }, s)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "text-[10px] uppercase tracking-wider text-rose-700 mb-2 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("span", { children: "Instruction Steps *" }),
        errors.steps && /* @__PURE__ */ jsx("span", { className: "text-red-400 normal-case", children: errors.steps })
      ] }),
      /* @__PURE__ */ jsx(
        Reorder.Group,
        {
          axis: "y",
          values: form.steps,
          onReorder: stepsReorder,
          className: "space-y-2 max-h-64 overflow-y-auto pr-1 text-rose-700",
          children: form.steps.map((s, i) => /* @__PURE__ */ jsx(StepItem, { step: s, index: i, onChange: stepChange, onRemove: stepRemove }, s.id))
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => set("steps", [...form.steps, makeStep()]),
          className: "mt-2 text-xs text-rose-700 inline-flex items-center gap-1 hover:underline",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" }),
            " Add step"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Field, { label: "Attachments", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      form.attachments.map((a, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-2 rounded-lg bg-rose-50/60 border border-rose-700", children: [
        /* @__PURE__ */ jsx(Paperclip, { className: "w-3 h-3 text-rose-700 shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs flex-1", children: a }),
        /* @__PURE__ */ jsx("button", { onClick: () => set("attachments", form.attachments.filter((_, x) => x !== i)), className: "hover:text-red-400 transition-colors", children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" }) })
      ] }, i)),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            const name = prompt("Enter attachment name:");
            if (name?.trim()) set("attachments", [...form.attachments, name.trim()]);
          },
          className: "w-full py-2 rounded-lg border border-dashed border-rose-700 text-xs text-rose-700 hover:rose-500 hover:border-primary/40 transition-all flex items-center justify-center gap-1.5",
          children: [
            /* @__PURE__ */ jsx(Paperclip, { className: "w-3 h-3" }),
            " Add attachment"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-3 border-t border-border", children: [
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "flex-1 py-2.5 rounded-xl  text-rose-700 border border-rose-700 text-sm hover:bg-rose-700 hover:text-white transition-colors", children: "Cancel" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => handleSubmit(true),
          className: "px-4 py-2.5 rounded-xl border border-rose-700 text-xs text-rose-700 hover:bg-rose-700 hover:text-white transition-colors inline-flex items-center gap-1.5",
          children: [
            /* @__PURE__ */ jsx(Save, { className: "w-3.5 h-3.5" }),
            " Draft"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleSubmit(false),
          className: "flex-1 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium hover-lift inline-flex items-center justify-center gap-1.5",
          children: isEdit ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
            " Update"
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5" }),
            " Publish"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        .sop-input{width:100%;padding:.55rem .75rem;border-radius:.6rem;background:#ffffff;border:1px solid #fecdd3;font-size:.875rem;color:#1f2937}
        .sop-input:focus{outline:none;box-shadow:0 0 0 2px rgba(225,29,72,0.2);border-color:#f43f5e}
        .sop-input::placeholder{color:#9ca3af}
        .sop-input option{background:#ffffff;color:#1f2937}
      ` })
  ] });
}
function QuickActions({ sop, onEdit, onDuplicate, onArchive, onDelete, onExport }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return /* @__PURE__ */ jsxs("div", { ref, className: "relative", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setOpen((o) => !o),
        className: "p-1.5 rounded-lg hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors",
        children: /* @__PURE__ */ jsx(MoreVertical, { className: "w-3.5 h-3.5" })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95, y: -4 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: -4 },
        transition: { duration: 0.12 },
        className: "absolute right-0 top-8 z-50 w-44 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden",
        children: [
          { label: "Edit", icon: Edit2, action: () => {
            onEdit(sop);
            setOpen(false);
          } },
          { label: "Duplicate", icon: Copy, action: () => {
            onDuplicate(sop);
            setOpen(false);
          } },
          { label: "Export", icon: Download, action: () => {
            onExport(sop);
            setOpen(false);
          } },
          { label: "Archive", icon: Archive, action: () => {
            onArchive(sop);
            setOpen(false);
          }, cls: "text-amber-400" },
          { label: "Delete", icon: Trash2, action: () => {
            onDelete(sop);
            setOpen(false);
          }, cls: "text-red-400" }
        ].map(({ label, icon: Icon, action, cls }) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: action,
            className: cn("w-full flex items-center gap-2.5 px-3 py-2.5 text-xs hover:bg-secondary/60 transition-colors", cls),
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5 shrink-0" }),
              label
            ]
          },
          label
        ))
      }
    ) })
  ] });
}
function AdminSopCard({
  sop,
  onOpen,
  onEdit,
  onDuplicate,
  onArchive,
  onDelete,
  onExport
}) {
  const stepCount = sop.steps?.length || 0;
  return /* @__PURE__ */ jsxs("article", { className: "rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white overflow-hidden hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all group min-w-0 relative", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10",
        onClick: (e) => e.stopPropagation(),
        children: /* @__PURE__ */ jsx(
          QuickActions,
          {
            sop,
            onEdit,
            onDuplicate,
            onArchive,
            onDelete,
            onExport
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2 p-2.5 sm:p-4", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          className: "flex flex-1 items-center gap-2 sm:gap-3 min-w-0 text-left",
          onClick: () => onOpen(sop),
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 sm:w-5 sm:h-5 text-slate-600" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 pr-6 sm:pr-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-slate-700", children: sop.title }),
                /* @__PURE__ */ jsx("span", { className: "shrink-0 sm:hidden text-[7px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border bg-sky-50 text-sky-700 border-sky-100", children: sop.category })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-2 hidden sm:block", children: sop.description }),
              /* @__PURE__ */ jsxs("p", { className: "text-[9px] sm:text-[10px] text-slate-400 mt-0.5", children: [
                stepCount,
                " steps · ",
                sop.estimatedTime || "—"
              ] })
            ] }),
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0 group-hover:text-slate-600 transition" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => onEdit(sop),
          className: "p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 shrink-0 border border-transparent hover:border-rose-100 transition",
          "aria-label": "Quick edit",
          children: /* @__PURE__ */ jsx(Pencil, { className: "w-3.5 h-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex px-2.5 sm:px-4 pb-2.5 sm:pb-3 justify-between items-center border-t border-slate-50 pt-2 gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1 min-w-0", children: [
        /* @__PURE__ */ jsx(Badge, { tone: statusTone(sop.status), children: sop.status }),
        /* @__PURE__ */ jsx(Badge, { tone: "muted", className: "hidden sm:inline-flex", children: sop.category }),
        /* @__PURE__ */ jsx(Badge, { tone: priorityTone(sop.priority), className: "hidden md:inline-flex", children: sop.priority }),
        /* @__PURE__ */ jsx(Badge, { tone: "info", className: "hidden lg:inline-flex", children: sop.version })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-[9px] sm:text-[10px] font-semibold text-slate-500 shrink-0 tabular-nums", children: sop.updated || sop.created })
    ] })
  ] });
}
function EmptyState({ query }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      className: "col-span-full xl:col-span-2 flex flex-col items-center justify-center py-20 text-center",
      children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-rose-100 border border-rose-300 grid place-items-center mb-4", children: /* @__PURE__ */ jsx(BookOpen, { className: "w-7 h-7 text-rose-600" }) }),
        /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-gray-900 mb-1", children: query ? "No SOPs match your search" : "No SOPs yet" }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-700", children: query ? "Try different keywords or filters" : "Create your first SOP to get started" })
      ]
    }
  );
}
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Priority", value: "priority" },
  { label: "Category", value: "category" },
  { label: "Title A–Z", value: "title" }
];
const PRIORITY_ORDER = { Critical: 0, High: 1, Medium: 2, Low: 3 };
function SOP() {
  const [sops, setSops] = useState([]);
  const [view, setView] = useState("grid");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("All");
  const [detailSop, setDetailSop] = useState(null);
  const [editSop, setEditSop] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [archiveTarget, setArchiveTarget] = useState(null);
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3e3);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (new URLSearchParams(location.search).get("action") === "addSOP") setAddOpen(true);
  }, [location.search]);
  useEffect(() => {
    const fetchSops = async () => {
      const local = loadLocalSops();
      if (local.length > 0) setSops(local);
      const cached = readCachedJson("/api/sop/all");
      if (cached?.success) {
        const normalized = cached.sops.map(normalizeApiSop);
        setSops(normalized);
        persistLocalSops(normalized);
      }
      try {
        const data = await apiGet("/api/sop/all");
        if (data.success) {
          const normalized = data.sops.map(normalizeApiSop);
          setSops(normalized);
          persistLocalSops(normalized);
          return;
        }
      } catch (error) {
        console.error("Failed to fetch SOPs:", error);
      }
      if (local.length > 0) {
        setSops(local);
      }
    };
    fetchSops();
  }, []);
  const handleUpdateComment = async (sopId, commentId, newText) => {
    try {
      const data = await apiPut(`/api/sop/${sopId}/comment/${commentId}`, { text: newText });
      if (data.success && data.comment) {
        setSops((prev) => prev.map(
          (s) => s.id === sopId ? { ...s, comments: s.comments.map((c) => c.id === commentId ? data.comment : c) } : s
        ));
        setDetailSop(
          (d) => d?.id === sopId ? { ...d, comments: d.comments.map((c) => c.id === commentId ? data.comment : c) } : d
        );
        addToast("Comment updated");
      } else {
        addToast(data.message || "Failed to update comment", "error");
      }
    } catch (error) {
      console.error("Update comment error:", error);
      addToast("Network error, please try again", "error");
    }
  };
  const handleDeleteComment = async (sopId, commentId) => {
    try {
      const data = await apiDelete(`/api/sop/${sopId}/comment/${commentId}`);
      if (data.success) {
        setSops((prev) => prev.map(
          (s) => s.id === sopId ? { ...s, comments: s.comments.filter((c) => c.id !== commentId) } : s
        ));
        setDetailSop(
          (d) => d?.id === sopId ? { ...d, comments: d.comments.filter((c) => c.id !== commentId) } : d
        );
        addToast("Comment deleted", "error");
      } else {
        addToast(data.message || "Failed to delete comment", "error");
      }
    } catch (error) {
      console.error("Delete comment error:", error);
      addToast("Network error, please try again", "error");
    }
  };
  const sopCategories = useMemo(() => {
    const active = sops.filter((s) => s.status !== "Archived");
    return [
      { name: "All SOPs", count: active.length },
      { name: "Sales Call", count: active.filter((s) => s.category === "Sales Call").length },
      { name: "After Call", count: active.filter((s) => s.category === "After Call").length },
      { name: "During Meeting", count: active.filter((s) => s.category === "During Meeting").length },
      { name: "After Meeting", count: active.filter((s) => s.category === "After Meeting").length },
      { name: "After Closing", count: active.filter((s) => s.category === "After Closing").length }
    ];
  }, [sops]);
  const filtered = useMemo(() => {
    let list = sops.filter((s) => {
      if (filter !== "All" && s.category !== filter) return false;
      if (statusFilter !== "All" && s.status !== statusFilter) return false;
      const qLow = q.toLowerCase();
      return !qLow || s.title.toLowerCase().includes(qLow) || s.tags.join(" ").toLowerCase().includes(qLow) || s.description.toLowerCase().includes(qLow);
    });
    if (sortBy === "newest") list = [...list].sort((a, b) => b.updated?.localeCompare(a.updated));
    if (sortBy === "priority") list = [...list].sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 9) - (PRIORITY_ORDER[b.priority] ?? 9));
    if (sortBy === "category") list = [...list].sort((a, b) => a.category.localeCompare(b.category));
    if (sortBy === "title") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [sops, q, filter, statusFilter, sortBy]);
  const saveSopLocally = (formData, asDraft, existing = null) => {
    const saved = buildLocalSop(formData, asDraft, existing);
    if (existing) {
      setSops((prev) => {
        const next = prev.map((s) => s.id === existing.id ? saved : s);
        persistLocalSops(next);
        return next;
      });
      setDetailSop((d) => d?.id === existing.id ? saved : d);
      setEditSop(null);
      addToast("SOP saved locally (database unavailable)", "info");
    } else {
      setSops((prev) => {
        const next = [saved, ...prev];
        persistLocalSops(next);
        return next;
      });
      setAddOpen(false);
      addToast(asDraft ? "Draft saved locally" : "SOP published locally (database unavailable)", "info");
    }
    navigate(location.pathname, { replace: true });
  };
  const handleSave = async (formData, asDraft) => {
    const finalStatus = asDraft ? "Draft" : formData.status;
    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      status: finalStatus,
      priority: formData.priority,
      department: formData.department,
      estimated_time: formData.estimatedTime,
      script: formData.script || null,
      questions: formData.questions?.filter(Boolean) || [],
      frameworks: formData.frameworks?.filter(Boolean) || [],
      tags: formData.tags || [],
      instruction_steps: formData.steps.map((s, i) => ({ step: i + 1, title: s.text })).filter((s) => s.title),
      attachment_url: null
    };
    if (editSop) {
      try {
        const data = await apiPut(`/api/sop/update/${editSop.id}`, payload);
        console.log("Update SOP response:", data);
        if (data.success && data.sop) {
          const normalized = normalizeApiSop({ ...data.sop, comments: editSop.comments || [], revisions: editSop.revisions || [], readCount: editSop.readCount || 0, acknowledgedCount: editSop.acknowledgedCount || 0 });
          setSops((prev) => {
            const next = prev.map((s) => s.id === editSop.id ? normalized : s);
            persistLocalSops(next);
            return next;
          });
          setDetailSop((d) => d?.id === editSop.id ? normalized : d);
          setEditSop(null);
          addToast("SOP updated successfully");
        } else {
          console.error("Backend error:", data);
          saveSopLocally({ ...formData, status: finalStatus }, asDraft, editSop);
        }
      } catch (error) {
        console.error("Update SOP error:", error);
        saveSopLocally({ ...formData, status: finalStatus }, asDraft, editSop);
      }
    } else {
      try {
        const data = await apiPost("/api/sop/create", payload);
        console.log("Create SOP response:", data);
        if (data.success && data.sop) {
          const normalized = normalizeApiSop(data.sop);
          setSops((prev) => {
            const next = [normalized, ...prev];
            persistLocalSops(next);
            return next;
          });
          setAddOpen(false);
          addToast("SOP published successfully");
        } else {
          console.error("Backend error:", data);
          saveSopLocally({ ...formData, status: finalStatus }, asDraft);
        }
      } catch (error) {
        console.error("Create SOP error:", error);
        saveSopLocally({ ...formData, status: finalStatus }, asDraft);
      }
    }
    navigate(location.pathname, { replace: true });
  };
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const data = await apiDelete(`/api/sop/delete/${deleteTarget.id}`);
      if (data.success) {
        setSops((prev) => {
          const next = prev.filter((s) => s.id !== deleteTarget.id);
          persistLocalSops(next);
          return next;
        });
        if (detailSop?.id === deleteTarget.id) setDetailSop(null);
        addToast(`"${deleteTarget.title}" deleted`, "error");
      } else {
        setSops((prev) => {
          const next = prev.filter((s) => s.id !== deleteTarget.id);
          persistLocalSops(next);
          return next;
        });
        if (detailSop?.id === deleteTarget.id) setDetailSop(null);
        addToast(`"${deleteTarget.title}" deleted locally`, "info");
      }
    } catch (error) {
      console.error("Delete SOP error:", error);
      setSops((prev) => {
        const next = prev.filter((s) => s.id !== deleteTarget.id);
        persistLocalSops(next);
        return next;
      });
      if (detailSop?.id === deleteTarget.id) setDetailSop(null);
      addToast(`"${deleteTarget.title}" deleted locally`, "info");
    } finally {
      setDeleteTarget(null);
    }
  };
  const handleArchive = () => {
    if (!archiveTarget) return;
    setSops((prev) => {
      const next = prev.map((s) => s.id === archiveTarget.id ? { ...s, status: "Archived" } : s);
      persistLocalSops(next);
      return next;
    });
    setDetailSop((d) => d?.id === archiveTarget.id ? { ...d, status: "Archived" } : d);
    setArchiveTarget(null);
    addToast(`"${archiveTarget.title}" archived`, "info");
  };
  const handleDuplicate = async (sop) => {
    try {
      const data = await apiPost(`/api/sop/duplicate/${sop.id}`);
      console.log("Duplicate SOP response:", data);
      if (data.success && data.sop) {
        const s = data.sop;
        const normalized = {
          ...s,
          creator: s.creator || "Unknown",
          created: s.created_at?.split("T")[0] || "",
          updated: s.updated_at?.split("T")[0] || "",
          estimatedTime: s.estimated_time || "",
          steps: (s.instruction_steps || []).map((st) => st.title || ""),
          questions: s.questions || [],
          frameworks: s.frameworks || [],
          tags: s.tags || [],
          comments: [],
          attachments: s.attachment_url ? [s.attachment_url] : [],
          revisions: [],
          version: s.version || "v1.0",
          readCount: 0,
          acknowledgedCount: 0
        };
        setSops((prev) => [normalized, ...prev]);
        addToast(`"${sop.title}" duplicated`);
      } else {
        addToast(data.message || "Failed to duplicate SOP", "error");
      }
    } catch (error) {
      console.error("Duplicate SOP error:", error);
      addToast("Network error, please try again", "error");
    }
  };
  const handleExport = (sop) => {
    const data = JSON.stringify(sop, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sop.title.replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast("SOP exported");
  };
  const handleAddComment = async (sopId, text) => {
    try {
      const data = await apiPost(`/api/sop/${sopId}/comment`, { text, author: "Current User" });
      if (data.success && data.comment) {
        setSops((prev) => prev.map(
          (s) => s.id === sopId ? { ...s, comments: [...s.comments || [], data.comment] } : s
        ));
        setDetailSop(
          (d) => d?.id === sopId ? { ...d, comments: [...d.comments || [], data.comment] } : d
        );
        addToast("Comment added");
      } else {
        addToast(data.message || "Failed to add comment", "error");
      }
    } catch (error) {
      console.error("Add comment error:", error);
      addToast("Network error, please try again", "error");
    }
  };
  const handleOpenDetail = (sop) => {
    const updated = { ...sop, readCount: (sop.readCount || 0) + 1 };
    setSops((prev) => prev.map((s) => s.id === sop.id ? updated : s));
    setDetailSop(updated);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 page-shell min-w-0", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3", children: sopCategories.map((c) => /* @__PURE__ */ jsx(KPICard, { c }, c.name)) }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "p-2 md:p-3 border border-rose-500", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1 max-w-xs", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: q,
              onChange: (e) => setQ(e.target.value),
              placeholder: "Search SOPs…",
              className: "w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-rose-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300/40 placeholder:text-gray-400"
            }
          ),
          q && /* @__PURE__ */ jsx("button", { onClick: () => setQ(""), className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 overflow-x-auto scrollbar-none", children: ["All", "Sales Call", "After Call", "During Meeting", "After Meeting", "After Closing"].map((c) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setFilter(c),
            className: cn(
              "shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-all",
              filter === c ? "bg-gradient-to-br from-rose-600 to-rose-800 text-white  border border-rose-700 shadow-sm" : "border-rose-300 text-gray-700 hover:text-rose-600 hover:border-rose-300 bg-white"
            ),
            children: c
          },
          c
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "select",
            {
              value: statusFilter,
              onChange: (e) => setStatusFilter(e.target.value),
              className: "appearance-none pl-2.5 pr-7 py-1.5 rounded-lg border border-rose-500 text-[11px] bg-white text-gray-800 focus:outline-none cursor-pointer",
              children: ["All", "Active", "Review", "Draft", "Archived"].map((s) => /* @__PURE__ */ jsx("option", { children: s }, s))
            }
          ),
          /* @__PURE__ */ jsx(ChevronDown, { className: "absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-rose-800 pointer-events-none" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "select",
            {
              value: sortBy,
              onChange: (e) => setSortBy(e.target.value),
              className: "appearance-none pl-2.5 pr-7 py-1.5 rounded-lg border border-rose-500 text-[11px] bg-white text-gray-800 focus:outline-none cursor-pointer",
              children: SORT_OPTIONS.map((o) => /* @__PURE__ */ jsx("option", { value: o.value, children: o.label }, o.value))
            }
          ),
          /* @__PURE__ */ jsx(SortAsc, { className: "absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-rose-800 pointer-events-none" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 bg-rose-50 border border-rose-100 rounded-xl p-1 ml-auto", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setView("grid"), className: cn("p-1.5 rounded-lg transition-all", view === "grid" ? "bg-rose-100 text-rose-600 shadow-sm" : "text-gray-400 hover:text-rose-500"), children: /* @__PURE__ */ jsx(LayoutGrid, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsx("button", { onClick: () => setView("list"), className: cn("p-1.5 rounded-lg transition-all", view === "list" ? "bg-rose-100 text-rose-600 shadow-sm" : "text-gray-400 hover:text-rose-500"), children: /* @__PURE__ */ jsx(List, { className: "w-3.5 h-3.5" }) })
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: () => setAddOpen(true), className: "shrink-0 px-3 py-2 rounded-xl gradient-primary text-primary-foreground text-xs font-medium inline-flex items-center gap-1.5 hover-lift whitespace-nowrap", children: [
          /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
          " Add SOP"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:hidden flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                value: q,
                onChange: (e) => setQ(e.target.value),
                placeholder: "Search SOPs…",
                className: "w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-rose-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300/40 placeholder:text-gray-400"
              }
            ),
            q && /* @__PURE__ */ jsx("button", { onClick: () => setQ(""), className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 bg-rose-50 border border-rose-100 rounded-xl p-1", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setView("grid"), className: cn("p-1.5 rounded-lg transition-all", view === "grid" ? "bg-rose-100 text-rose-600 shadow-sm" : "text-gray-400 hover:text-rose-500"), children: /* @__PURE__ */ jsx(LayoutGrid, { className: "w-3.5 h-3.5" }) }),
            /* @__PURE__ */ jsx("button", { onClick: () => setView("list"), className: cn("p-1.5 rounded-lg transition-all", view === "list" ? "bg-rose-100 text-rose-600 shadow-sm" : "text-gray-400 hover:text-rose-500"), children: /* @__PURE__ */ jsx(List, { className: "w-3.5 h-3.5" }) })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => setAddOpen(true), className: "shrink-0 px-3 py-2 rounded-xl gradient-primary text-primary-foreground text-xs font-medium inline-flex items-center gap-1.5 hover-lift whitespace-nowrap", children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Add SOP" }),
            /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Add" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5", children: ["All", "Sales Call", "After Call", "During Meeting", "After Meeting", "After Closing"].map((c) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setFilter(c),
            className: cn(
              "shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all",
              filter === c ? "bg-rose-600 text-white border-transparent shadow-sm" : "border-rose-200 text-gray-500 hover:text-rose-600 bg-white"
            ),
            children: c
          },
          c
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "select",
            {
              value: statusFilter,
              onChange: (e) => setStatusFilter(e.target.value),
              className: "flex-1 px-2.5 py-1.5 rounded-lg border border-rose-200 text-[11px] bg-white text-gray-500 focus:outline-none",
              children: ["All", "Active", "Review", "Draft", "Archived"].map((s) => /* @__PURE__ */ jsx("option", { children: s }, s))
            }
          ),
          /* @__PURE__ */ jsx(
            "select",
            {
              value: sortBy,
              onChange: (e) => setSortBy(e.target.value),
              className: "flex-1 px-2.5 py-1.5 rounded-lg border border-rose-200 text-[11px] bg-white text-gray-500 focus:outline-none",
              children: SORT_OPTIONS.map((o) => /* @__PURE__ */ jsx("option", { value: o.value, children: o.label }, o.value))
            }
          )
        ] })
      ] })
    ] }),
    view === "grid" ? /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1.5 sm:grid sm:grid-cols-1 xl:grid-cols-2 sm:gap-3", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filtered.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { query: q }) : filtered.map((s) => /* @__PURE__ */ jsx(
      motion.div,
      {
        layout: true,
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.15 },
        children: /* @__PURE__ */ jsx(
          AdminSopCard,
          {
            sop: s,
            onOpen: handleOpenDetail,
            onEdit: setEditSop,
            onDuplicate: handleDuplicate,
            onArchive: setArchiveTarget,
            onDelete: setDeleteTarget,
            onExport: handleExport
          }
        )
      },
      s.id
    )) }) }) : /* @__PURE__ */ jsxs(GlassCard, { className: "p-2 divide-y divide-rose-100", children: [
      filtered.length === 0 && /* @__PURE__ */ jsx(EmptyState, { query: q }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: filtered.map((s) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          layout: true,
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => handleOpenDetail(s),
          className: "flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-rose-50 cursor-pointer transition-colors group",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg gradient-primary grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(FileText, { className: "w-3.5 h-3.5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-800 truncate", children: s.title }),
              /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-500 mt-0.5 truncate", children: [
                s.category,
                " · ",
                s.creator,
                " · ",
                s.updated || s.created
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
              /* @__PURE__ */ jsx(Badge, { tone: statusTone(s.status), children: s.status }),
              /* @__PURE__ */ jsx(Badge, { tone: priorityTone(s.priority), className: "hidden sm:inline-flex", children: s.priority }),
              /* @__PURE__ */ jsx(Badge, { tone: "info", className: "hidden md:inline-flex", children: s.version }),
              /* @__PURE__ */ jsx("div", { className: "opacity-0 group-hover:opacity-100 transition-opacity", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(QuickActions, { sop: s, onEdit: setEditSop, onDuplicate: handleDuplicate, onArchive: setArchiveTarget, onDelete: setDeleteTarget, onExport: handleExport }) })
            ] })
          ]
        },
        s.id
      )) })
    ] }),
    /* @__PURE__ */ jsx(
      SOPDetailDrawer,
      {
        sop: detailSop,
        onClose: () => setDetailSop(null),
        onEdit: (sop) => setEditSop(sop),
        onDelete: setDeleteTarget,
        onDuplicate: handleDuplicate,
        onArchive: setArchiveTarget,
        onAddComment: handleAddComment,
        onUpdateComment: handleUpdateComment,
        onDeleteComment: handleDeleteComment
      }
    ),
    /* @__PURE__ */ jsx(
      Drawer,
      {
        open: !!editSop,
        onClose: () => setEditSop(null),
        title: `Edit: ${editSop?.title || ""}`,
        width: "max-w-2xl",
        zIndex: 80,
        children: editSop && /* @__PURE__ */ jsx(
          SOPForm,
          {
            initialData: editSop,
            onSave: handleSave,
            onClose: () => setEditSop(null),
            isEdit: true
          },
          editSop.id
        )
      }
    ),
    /* @__PURE__ */ jsx(
      Drawer,
      {
        open: addOpen,
        onClose: () => {
          setAddOpen(false);
          navigate(location.pathname, { replace: true });
        },
        title: "New SOP",
        width: "max-w-2xl",
        zIndex: 80,
        children: /* @__PURE__ */ jsx(
          SOPForm,
          {
            onSave: handleSave,
            onClose: () => {
              setAddOpen(false);
              navigate(location.pathname, { replace: true });
            }
          },
          "add"
        )
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmModal,
      {
        open: !!deleteTarget,
        title: "Delete SOP",
        message: `Are you sure you want to permanently delete "${deleteTarget?.title}"? This action cannot be undone.`,
        confirmLabel: "Delete permanently",
        onConfirm: handleDelete,
        onCancel: () => setDeleteTarget(null),
        danger: true
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmModal,
      {
        open: !!archiveTarget,
        title: "Archive SOP",
        message: `Archive "${archiveTarget?.title}"? It will be hidden from active lists but can be restored.`,
        confirmLabel: "Archive",
        onConfirm: handleArchive,
        onCancel: () => setArchiveTarget(null),
        danger: false
      }
    ),
    /* @__PURE__ */ jsx(Toast, { toasts, removeToast: (id) => setToasts((t) => t.filter((x) => x.id !== id)) })
  ] });
}
export {
  SOP as default
};
