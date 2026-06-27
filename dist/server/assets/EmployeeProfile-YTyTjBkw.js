import { jsxs, jsx } from "react/jsx-runtime";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ArrowLeftRight } from "lucide-react";
import { u as useIsMobile } from "./useIsMobile-DGoojBXP.js";
import { G as GlassCard } from "./Primitives-CmGbnOU9.js";
import { Z as useEmployee, r as EmployeeDoodleAvatar } from "./_-BNdSRMjW.js";
import { F as FormGroup, f as FormLabel, e as FormInput, h as FormSelect, a as BtnPrimary, b as BtnSecondary } from "./EmpUI-DSKHyseP.js";
import "react";
import "framer-motion";
import "@tanstack/react-query";
import "react-dom";
function EmployeeProfile() {
  const { employee } = useEmployee();
  const isMobile = useIsMobile();
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 page-shell min-w-0 animate-fade-in", children: [
    /* @__PURE__ */ jsxs(GlassCard, { className: "p-3 sm:p-4 md:p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
        /* @__PURE__ */ jsx(EmployeeDoodleAvatar, { size: isMobile ? 48 : 64 }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-base sm:text-xl font-bold text-slate-900 truncate", children: employee.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-slate-500", children: employee.role }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs font-bold text-rose-600 mt-1", children: employee.department })
        ] })
      ] }),
      [
        { l: "Email", v: employee.email },
        { l: "Phone", v: employee.phone },
        { l: "Joining Date", v: new Date(employee.joiningDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) }
      ].map((row) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2 py-2.5 sm:py-3 border-b border-rose-50 text-xs sm:text-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "text-slate-500 font-semibold", children: row.l }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-900 break-all sm:text-right", children: row.v })
      ] }, row.l))
    ] }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "p-3 sm:p-4 md:p-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-display font-bold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base", children: "Preferences" }),
      /* @__PURE__ */ jsxs(FormGroup, { children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "Display Name" }),
        /* @__PURE__ */ jsx(FormInput, { defaultValue: employee.name })
      ] }),
      /* @__PURE__ */ jsxs(FormGroup, { children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "Notification Reminder (hrs)" }),
        /* @__PURE__ */ jsx(FormInput, { type: "number", defaultValue: 24 })
      ] }),
      /* @__PURE__ */ jsxs(FormGroup, { children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "Default Meeting Platform" }),
        /* @__PURE__ */ jsxs(FormSelect, { children: [
          /* @__PURE__ */ jsx("option", { children: "Zoom" }),
          /* @__PURE__ */ jsx("option", { children: "Google Meet" }),
          /* @__PURE__ */ jsx("option", { children: "Teams" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(BtnPrimary, { className: "w-full justify-center mb-3", onClick: () => toast.success("Profile saved"), children: "Save Profile" }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "block", children: /* @__PURE__ */ jsxs(BtnSecondary, { className: "w-full justify-center", children: [
        /* @__PURE__ */ jsx(ArrowLeftRight, { className: "w-4 h-4" }),
        " Switch to Admin Panel"
      ] }) })
    ] })
  ] });
}
export {
  EmployeeProfile as default
};
