import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { motion } from "framer-motion";
function GlassCard({ children, className = "", hover = false, ...rest }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `
        rounded-2xl sm:rounded-[24px]
        shadow-[0_2px_8px_rgba(244,63,94,0.02)]
        border border-rose-100
        bg-gradient-to-br from-white via-[#fffbfb] to-[#fff0f2]
        ${hover ? "hover:-translate-y-1 hover:border-rose-200 hover:shadow-md" : ""}
        transition-[transform,box-shadow,border-color] duration-200
        ${className}
      `,
      ...rest,
      children
    }
  );
}
function StatCard({
  label,
  value,
  change,
  icon: Icon,
  tone = "primary",
  changeTone,
  sub = "vs last period",
  iconBg,
  iconColor,
  hover = true,
  compact = false,
  className = ""
}) {
  const toneMap = {
    primary: "bg-rose-50 text-rose-600 border border-rose-100",
    success: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    warning: "bg-amber-50 text-amber-600 border border-amber-100",
    danger: "bg-rose-50/70 text-rose-600 border border-rose-100/50",
    info: "bg-rose-50 text-rose-600 border border-rose-100",
    purple: "bg-rose-50 text-rose-600 border border-rose-100",
    indigo: "bg-rose-50 text-rose-600 border border-rose-100"
  };
  const changeToneMap = {
    success: "text-emerald-600",
    warning: "text-amber-600",
    danger: "text-rose-600",
    muted: "text-slate-500",
    primary: "text-rose-600"
  };
  const iconColorClass = iconBg && iconColor ? `${iconBg} ${iconColor}` : toneMap[tone] || toneMap.primary;
  const isNegative = change && (change.startsWith("-") || change.toLowerCase().includes("down"));
  const trendColorClass = changeTone ? changeToneMap[changeTone] || changeToneMap.primary : isNegative ? "text-rose-600" : "text-emerald-600";
  return /* @__PURE__ */ jsxs(
    GlassCard,
    {
      hover,
      className: `${compact ? "p-2.5 sm:p-4 min-h-[88px] sm:min-h-[108px]" : "p-4 sm:p-5 min-h-[108px] sm:min-h-[118px]"} flex flex-col justify-between !bg-white !border-slate-200/80 !from-white !via-white !to-white !shadow-[0_2px_8px_rgba(15,23,42,0.04)] ${className}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start gap-1.5 sm:gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: `${compact ? "text-[8px] sm:text-[10px]" : "text-[9px] sm:text-[10px]"} font-bold text-slate-500 uppercase tracking-wider leading-tight`, children: label }),
            /* @__PURE__ */ jsx("h4", { className: `${compact ? "text-lg sm:text-2xl" : "text-xl sm:text-2xl"} font-black text-slate-900 mt-0.5 sm:mt-1 tracking-tight leading-none tabular-nums`, children: value })
          ] }),
          Icon && /* @__PURE__ */ jsx("div", { className: `${compact ? "w-7 h-7 sm:w-9 sm:h-9" : "w-9 h-9 sm:w-10 sm:h-10"} rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 shadow-sm ${iconColorClass}`, children: /* @__PURE__ */ jsx(Icon, { className: compact ? "w-3.5 h-3.5 sm:w-4 sm:h-4" : "w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `flex items-center gap-1.5 ${compact ? "mt-2 sm:mt-3 pt-2" : "mt-3 pt-2.5"} border-t border-slate-100 min-h-[22px] sm:min-h-[26px]`, children: change ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: `text-[9px] sm:text-[10px] font-extrabold ${trendColorClass}`, children: change }),
          sub ? /* @__PURE__ */ jsx("span", { className: `text-[9px] sm:text-[10px] font-medium text-slate-400 truncate ${compact ? "hidden sm:inline" : ""}`, children: sub }) : null
        ] }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium text-slate-400", children: " " }) })
      ]
    }
  );
}
function Badge({ children, tone = "muted" }) {
  const map = {
    primary: "bg-rose-50 text-rose-700 border-rose-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    danger: "bg-red-50 text-red-700 border-red-200",
    info: "bg-sky-50 text-sky-700 border-sky-200",
    purple: "bg-violet-50 text-violet-700 border-violet-200",
    muted: "bg-slate-100 text-slate-600 border-slate-200"
  };
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border uppercase tracking-wide ${map[tone] || map.muted}`,
      children
    }
  );
}
function Avatar({ initials, size = 32, tone = "primary" }) {
  return /* @__PURE__ */ jsx("div", { style: { width: size, height: size }, className: `rounded-lg gradient-primary grid place-items-center text-xs font-semibold shrink-0 shadow-glow text-primary-foreground`, children: initials });
}
function Drawer({
  open,
  onClose,
  title,
  children,
  width = "",
  nested = false
}) {
  if (!open) return null;
  const panelWidth = width || "drawer-panel";
  return /* @__PURE__ */ jsxs("div", { className: `fixed inset-0 ${nested ? "z-[70]" : "z-[60]"} flex justify-end`, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-black/20 backdrop-blur-sm",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
        transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] },
        className: `relative ${panelWidth} h-full max-h-[100dvh] bg-white border-l overflow-y-auto overscroll-contain`,
        style: {
          borderColor: "#fecdd3",
          boxShadow: "-10px 0 40px rgba(0,0,0,.08)"
        },
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "sticky top-0 z-20 bg-white px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between gap-3",
              style: {
                borderBottom: "1px solid #fecdd3"
              },
              children: [
                /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold text-gray-800 truncate min-w-0", children: title }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: onClose,
                    className: "touch-target w-10 h-10 rounded-lg text-[#be123c] bg-rose-50/60 hover:bg-rose-100 transition shrink-0 grid place-items-center",
                    style: { fontWeight: 700 },
                    "aria-label": "Close",
                    children: "✕"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-5", children })
        ]
      }
    )
  ] });
}
function SectionHeader({ title, subtitle, action }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-5 gap-3 pb-3 sm:pb-4 border-b border-rose-100", children: [
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-base sm:text-lg font-bold tracking-tight text-slate-900", children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-slate-500 mt-1", children: subtitle })
    ] }),
    action && /* @__PURE__ */ jsx("div", { className: "shrink-0 w-full sm:w-auto", children: action })
  ] });
}
function priorityTone(p) {
  return { Critical: "danger", High: "warning", Medium: "info", Low: "muted" }[p] || "muted";
}
function stageTone(s) {
  return { New: "info", Contacted: "primary", Qualified: "success", "Proposal Sent": "warning", Negotiation: "warning", "Closed Won": "success", "Closed Lost": "danger" }[s] || "muted";
}
export {
  Avatar as A,
  Badge as B,
  Drawer as D,
  GlassCard as G,
  SectionHeader as S,
  StatCard as a,
  priorityTone as p,
  stageTone as s
};
