import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Layers, Clock, Target, MessageSquare, Copy, Sparkles, Shield, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import { G as GlassCard, B as Badge } from "./Primitives-CmGbnOU9.js";
import { Z as useEmployee } from "./_-BNdSRMjW.js";
import { a as BtnPrimary, b as BtnSecondary, C as ChooseLeadModal } from "./EmpUI-DSKHyseP.js";
import "framer-motion";
import "@tanstack/react-query";
import "react-dom";
function SectionLabel({ children }) {
  return /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-2", children });
}
function copyText(text, label = "Copied") {
  navigator.clipboard?.writeText(text);
  toast.success(label);
}
function EmployeeSopDetail() {
  const { sopId } = useParams();
  const navigate = useNavigate();
  const { sops, leads } = useEmployee();
  const [leadPickerOpen, setLeadPickerOpen] = useState(false);
  const sop = useMemo(() => {
    const id = Number(sopId);
    return sops.find((s) => s.id === id || String(s.id) === sopId);
  }, [sops, sopId]);
  if (!sop) {
    return /* @__PURE__ */ jsxs(GlassCard, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-700", children: "SOP not found" }),
      /* @__PURE__ */ jsxs(BtnPrimary, { onClick: () => navigate("/employee/sales-process"), className: "mt-4", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
        " Back to SOPs"
      ] })
    ] });
  }
  const stepCount = sop.steps?.length || 0;
  const startCallWithLead = (lead) => {
    navigate(
      `/employee/call-assistant?sop=${sop.id}&lead=${encodeURIComponent(lead.name)}`
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-5 page-shell min-w-0 animate-fade-in pb-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate("/employee/sales-process"),
          className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition w-fit",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
            " All SOPs"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        BtnPrimary,
        {
          onClick: () => setLeadPickerOpen(true),
          className: "!rounded-xl w-full sm:w-auto",
          children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
            " Use in Call Assistant"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(GlassCard, { className: "p-3 sm:p-4 md:p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 grid place-items-center text-2xl shrink-0", children: sop.icon || "📋" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start gap-2 mb-1", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-lg sm:text-xl font-display font-bold text-slate-900", children: sop.title }),
          /* @__PURE__ */ jsx(Badge, { tone: "muted", children: sop.category })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: sop.sub }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 mt-3 text-[11px] font-semibold text-slate-500", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Layers, { className: "w-3.5 h-3.5" }),
            " ",
            stepCount,
            " steps"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }),
            " ",
            sop.duration || "—"
          ] }),
          sop.budgetRange && sop.budgetRange !== "—" && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Target, { className: "w-3.5 h-3.5" }),
            " ",
            sop.budgetRange
          ] })
        ] })
      ] })
    ] }) }),
    sop.steps?.map((step, index) => /* @__PURE__ */ jsxs(GlassCard, { className: "p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pb-3 border-b border-slate-100", children: [
        /* @__PURE__ */ jsx("span", { className: "w-7 h-7 rounded-lg bg-slate-800 text-white text-xs font-black grid place-items-center shrink-0", children: index + 1 }),
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-slate-900", children: step.label })
      ] }),
      step.scripts?.opening && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: "Opening Script" }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-slate-200 bg-slate-50/80 p-3 flex flex-col sm:flex-row gap-2", children: [
          /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4 text-slate-400 shrink-0 mt-0.5 hidden sm:block" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap flex-1", children: step.scripts.opening }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => copyText(step.scripts.opening, "Script copied"),
              className: "p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 shrink-0 h-fit self-end sm:self-auto min-h-[40px] min-w-[40px] grid place-items-center",
              "aria-label": "Copy script",
              children: /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5 text-slate-500" })
            }
          )
        ] })
      ] }),
      step.scripts?.talkingPoints?.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: "Talking Points" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-1.5", children: step.scripts.talkingPoints.map((pt) => /* @__PURE__ */ jsxs("li", { className: "text-sm text-slate-700 flex gap-2", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" }),
          pt
        ] }, pt)) })
      ] }),
      step.scripts?.tips && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: "Tips" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 leading-relaxed", children: step.scripts.tips })
      ] }),
      step.questions?.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: "Qualification Checklist" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-1.5", children: step.questions.map((q) => /* @__PURE__ */ jsxs("li", { className: "text-sm text-slate-700 flex gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "☐" }),
          q.text
        ] }, q.id)) })
      ] }),
      step.checklist?.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: "Step Checklist" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-1.5", children: step.checklist.map((item) => /* @__PURE__ */ jsxs("li", { className: "text-sm text-slate-700 flex gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "•" }),
          item
        ] }, item)) })
      ] }),
      step.discovery?.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: "Discovery Fields" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: step.discovery.map((f) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-slate-100 bg-white px-3 py-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase", children: f.label }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: f.placeholder })
        ] }, f.key)) })
      ] })
    ] }, step.id)),
    sop.objections?.length > 0 && /* @__PURE__ */ jsxs(GlassCard, { className: "p-4 sm:p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4 text-slate-600" }),
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-slate-900", children: "Objection Handling" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: sop.objections.map((o) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-slate-100 bg-slate-50/50 p-3", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-800", children: o.trigger }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 mt-1.5 leading-relaxed", children: o.rebuttal }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => copyText(o.rebuttal, "Rebuttal copied"),
            className: "mt-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsx(Copy, { className: "w-3 h-3" }),
              " Copy rebuttal"
            ]
          }
        )
      ] }, o.trigger)) })
    ] }),
    sop.crossSell && /* @__PURE__ */ jsxs(GlassCard, { className: "p-4 sm:p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4 text-slate-600" }),
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-slate-900", children: "Cross-Sell Guide" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl", children: sop.crossSell.icon }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900", children: sop.crossSell.product }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 mt-2 leading-relaxed", children: sop.crossSell.pitch }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-emerald-600 mt-2", children: [
            sop.crossSell.success,
            "% success · ",
            sop.crossSell.deals,
            " deals"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 pt-2", children: [
      /* @__PURE__ */ jsxs(BtnSecondary, { onClick: () => navigate("/employee/sales-process"), className: "!rounded-xl", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
        " Back"
      ] }),
      /* @__PURE__ */ jsxs(BtnPrimary, { onClick: () => setLeadPickerOpen(true), className: "!rounded-xl", children: [
        /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
        " Start Call with this SOP"
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      ChooseLeadModal,
      {
        open: leadPickerOpen,
        onClose: () => setLeadPickerOpen(false),
        leads,
        title: "Choose a lead to call",
        subtitle: `Using playbook: ${sop.title}`,
        onSelect: startCallWithLead
      }
    )
  ] });
}
export {
  EmployeeSopDetail as default
};
