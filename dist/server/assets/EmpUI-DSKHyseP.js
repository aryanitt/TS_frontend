import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { B as Badge } from "./Primitives-CmGbnOU9.js";
import { Search } from "lucide-react";
const LEAD_TONE = {
  hot: "danger",
  warm: "warning",
  cold: "info",
  converted: "success",
  notpick: "muted",
  ni: "purple"
};
function LeadStatusBadge({ status, label }) {
  return /* @__PURE__ */ jsx(Badge, { tone: LEAD_TONE[status] || "muted", children: label });
}
function EmpEmptyState({ icon = "📋", title, subtitle }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-8 sm:py-12 px-4 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-rose-50 border border-rose-200 grid place-items-center text-xl sm:text-2xl mb-2.5 sm:mb-3", children: icon }),
    /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm font-bold text-slate-700", children: title }),
    subtitle && /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-slate-400 mt-1 max-w-xs", children: subtitle })
  ] });
}
function EmpModal({ open, onClose, title, subtitle, children, footer }) {
  if (!open) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in",
      onClick: onClose,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "w-full sm:max-w-lg max-h-[92dvh] sm:max-h-[90vh] flex flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-rose-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,.15)] animate-fade-in",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "shrink-0 px-3 sm:px-5 pt-4 sm:pt-5 pb-2.5 sm:pb-3 border-b border-rose-50", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-display font-bold text-slate-900", children: title }),
              subtitle && /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-slate-500 mt-1", children: subtitle })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-5", children }),
            footer && /* @__PURE__ */ jsx(
              "div",
              {
                className: "shrink-0 px-3 sm:px-5 pt-3 pb-4 sm:pb-5 border-t border-rose-50 bg-white flex flex-col-reverse sm:flex-row justify-end gap-2",
                style: { paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))" },
                children: footer
              }
            )
          ]
        }
      )
    }
  );
}
const BTN_BASE = "inline-flex items-center justify-center gap-1.5 min-h-[40px] sm:min-h-0 px-3 sm:px-4 py-2 rounded-full sm:rounded-xl text-xs sm:text-sm font-bold transition active:scale-[0.98]";
function BtnPrimary({ children, className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      className: `${BTN_BASE} bg-rose-700 hover:bg-rose-800 text-white shadow-md ${className}`,
      ...props,
      children
    }
  );
}
function BtnSecondary({ children, className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      className: `${BTN_BASE} bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100 ${className}`,
      ...props,
      children
    }
  );
}
function BtnGhost({ children, className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      className: `${BTN_BASE} text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 ${className}`,
      ...props,
      children
    }
  );
}
function FormLabel({ children }) {
  return /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-700 mb-1.5", children });
}
function FormInput({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      className: `w-full min-h-[40px] sm:min-h-[42px] px-3 py-2 rounded-xl bg-[#F5F7FA] border border-[#E5E7EB] text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition ${className}`,
      ...props
    }
  );
}
function FormSelect({ className = "", children, ...props }) {
  return /* @__PURE__ */ jsx(
    "select",
    {
      className: `w-full min-h-[40px] sm:min-h-[42px] px-3 py-2 rounded-xl bg-[#F5F7FA] border border-[#E5E7EB] text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition ${className}`,
      ...props,
      children
    }
  );
}
function FormTextarea({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: `w-full px-3 py-2 rounded-xl bg-[#F5F7FA] border border-[#E5E7EB] text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition resize-y ${className}`,
      ...props
    }
  );
}
function FormRow({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4", children });
}
function FormGroup({ children, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `mb-3 sm:mb-4 ${className}`, children });
}
function AvatarCircle({ initials, color, size = 32 }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: { width: size, height: size, background: color },
      className: "rounded-full grid place-items-center text-[10px] font-black text-white shrink-0",
      children: initials
    }
  );
}
function ChooseLeadPanel({ leads, onSelect, className = "" }) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter(
      (l) => l.name.toLowerCase().includes(q) || (l.company || "").toLowerCase().includes(q) || (l.stage || "").toLowerCase().includes(q)
    );
  }, [leads, search]);
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsxs("div", { className: "relative mb-3", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search by name, company, or stage…",
          className: "w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition",
          autoFocus: true
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-2 max-h-[min(52vh,420px)] overflow-y-auto overscroll-contain scrollbar-thin pr-0.5", children: filtered.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 text-center py-8", children: "No leads match your search" }) : filtered.map((lead) => /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => onSelect(lead),
        className: "w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 bg-white hover:border-rose-200 hover:bg-rose-50/40 text-left transition",
        children: [
          /* @__PURE__ */ jsx(AvatarCircle, { initials: lead.av || lead.name.slice(0, 2).toUpperCase(), color: lead.color || "#be123c", size: 36 }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900 truncate", children: lead.name }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-500 truncate", children: lead.company })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "shrink-0 text-right", children: /* @__PURE__ */ jsx(LeadStatusBadge, { status: lead.status, label: lead.stage || lead.status }) })
        ]
      },
      lead.id
    )) })
  ] });
}
function ChooseLeadModal({ open, onClose, leads, onSelect, title = "Choose a lead", subtitle = "Select who you want to call" }) {
  return /* @__PURE__ */ jsx(
    EmpModal,
    {
      open,
      onClose,
      title,
      subtitle,
      footer: /* @__PURE__ */ jsx(BtnSecondary, { onClick: onClose, children: "Cancel" }),
      children: /* @__PURE__ */ jsx(
        ChooseLeadPanel,
        {
          leads,
          onSelect: (lead) => {
            onSelect(lead);
            onClose();
          }
        }
      )
    }
  );
}
const MOBILE_ACTION = "opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all";
export {
  AvatarCircle as A,
  BtnGhost as B,
  ChooseLeadModal as C,
  EmpEmptyState as E,
  FormGroup as F,
  LeadStatusBadge as L,
  MOBILE_ACTION as M,
  BtnPrimary as a,
  BtnSecondary as b,
  ChooseLeadPanel as c,
  EmpModal as d,
  FormInput as e,
  FormLabel as f,
  FormRow as g,
  FormSelect as h,
  FormTextarea as i
};
