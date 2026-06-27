import { jsxs, jsx } from "react/jsx-runtime";
import { useLocation, Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { X as useAdmin, A as AdminDoodleAvatar } from "./_-BNdSRMjW.js";
import { G as GlassCard } from "./Primitives-CmGbnOU9.js";
function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function formatDateTime(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function DashboardScrollbarStyles() {
  return /* @__PURE__ */ jsx("style", { children: `
      * { scrollbar-width: thin; scrollbar-color: #be123c transparent; }
      *::-webkit-scrollbar { width: 6px; height: 6px; }
      *::-webkit-scrollbar-track { background: transparent; }
      *::-webkit-scrollbar-thumb { background-color: #be123c; border-radius: 999px; }
      .no-sb::-webkit-scrollbar { display: none; }
    ` });
}
function AdminProfileHeader() {
  const { admin } = useAdmin();
  const { pathname } = useLocation();
  const onSettingsPage = pathname === "/settings";
  const actionLink = !onSettingsPage ? /* @__PURE__ */ jsxs(
    Link,
    {
      to: "/settings",
      className: "flex items-center justify-center gap-1.5 w-full sm:w-auto px-3 py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold\n                 border border-rose-200 text-[#be123c] bg-white hover:bg-rose-50 transition-all shadow-sm",
      children: [
        /* @__PURE__ */ jsx(Settings, { className: "w-3.5 h-3.5" }),
        "Workspace Settings"
      ]
    }
  ) : /* @__PURE__ */ jsx(
    Link,
    {
      to: "/admin",
      className: "flex items-center justify-center gap-1.5 w-full sm:w-auto px-3 py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold\n                 border border-rose-200 text-[#be123c] bg-white hover:bg-rose-50 transition-all shadow-sm",
      children: "Admin Profile"
    }
  );
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl sm:rounded-2xl overflow-hidden border border-rose-100 shadow-sm bg-white", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "h-11 sm:h-16 w-full relative",
        style: { background: "linear-gradient(135deg, #be123c 0%, #e11d48 45%, #f43f5e 100%)" },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 opacity-10",
              style: {
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute top-1.5 right-10 sm:top-2 sm:right-16 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white/10 blur-2xl" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "px-4 pb-4 sm:px-6 sm:pb-5 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute -top-7 left-4 sm:-top-9 sm:left-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-full border-[3px] sm:border-4 border-white shadow-md", children: [
          /* @__PURE__ */ jsx(AdminDoodleAvatar, { size: 56, shape: "circle", className: "sm:hidden" }),
          /* @__PURE__ */ jsx(AdminDoodleAvatar, { size: 68, shape: "circle", className: "hidden sm:block" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-400 border-2 border-white shadow-sm" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-9 sm:pt-12 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight", children: admin.fullName }),
            /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold bg-[#be123c] text-white uppercase tracking-wider shadow-sm shrink-0", children: admin.role }),
            admin.googleConnected && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-600 text-white uppercase tracking-wider shadow-sm shrink-0", children: "Google linked" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-1.5 space-y-0.5 text-[10px] sm:text-xs text-slate-500 font-medium", children: [
            /* @__PURE__ */ jsxs("p", { className: "truncate", children: [
              admin.department,
              /* @__PURE__ */ jsx("span", { className: "text-slate-300 mx-1", children: "·" }),
              "TS Publication CRM"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Joined ",
              formatDate(admin.joinedAt)
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1.5 text-emerald-600", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { className: "truncate", children: [
                "Last sign-in ",
                formatDateTime(admin.lastLogin)
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full sm:w-auto sm:shrink-0", children: actionLink })
      ] })
    ] })
  ] });
}
function SettingsMobileTabs({ tabs, activeTab, onTabChange, tabExtra }) {
  return /* @__PURE__ */ jsx("div", { className: "lg:hidden min-w-0", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: tabs.map((t) => {
    const Icon = t.icon;
    const isActive = activeTab === t.id;
    return /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => onTabChange(t.id),
        className: `relative flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[10px] font-bold transition-all min-w-0 ${isActive ? "bg-[#be123c] text-white shadow-sm" : "bg-white border border-rose-100 text-slate-700 hover:bg-rose-50/70"}`,
        children: [
          /* @__PURE__ */ jsx(Icon, { className: `w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "text-rose-600/80"}` }),
          /* @__PURE__ */ jsx("span", { className: "text-left leading-tight line-clamp-2", children: t.label }),
          tabExtra?.(t, isActive)
        ]
      },
      t.id
    );
  }) }) });
}
function SettingsSidebar({ title, subtitle, tabs, activeTab, onTabChange, tabExtra }) {
  return /* @__PURE__ */ jsxs(GlassCard, { className: "hidden lg:block p-3.5 h-fit space-y-1", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-3 py-2.5 mb-2 border-b border-rose-100", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-black text-rose-700 uppercase tracking-widest", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-[9px] text-slate-400 mt-0.5", children: subtitle })
    ] }),
    tabs.map((t) => {
      const Icon = t.icon;
      const isActive = activeTab === t.id;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onTabChange(t.id),
          className: `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-bold transition-all relative touch-target ${isActive ? "bg-[#be123c] text-white shadow-sm" : "hover:bg-rose-50/70 text-slate-700"}`,
          children: [
            /* @__PURE__ */ jsx(Icon, { className: `w-4.5 h-4.5 ${isActive ? "text-white" : "text-rose-600/70"}` }),
            /* @__PURE__ */ jsx("span", { children: t.label }),
            tabExtra?.(t, isActive)
          ]
        },
        t.id
      );
    })
  ] });
}
function SettingsPanel({ children, footer }) {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3 sm:gap-6 min-w-0", children: /* @__PURE__ */ jsxs(GlassCard, { className: "p-3 sm:p-6 flex-1 flex flex-col justify-between min-h-0 lg:min-h-[520px]", children: [
    /* @__PURE__ */ jsx("div", { className: "space-y-3 sm:space-y-6 min-w-0", children }),
    footer
  ] }) });
}
function PanelSection({ title, subtitle, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-6 min-w-0", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs sm:text-sm font-extrabold text-slate-800 uppercase tracking-wider", children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-[11px] text-muted-foreground mt-0.5", children: subtitle })
    ] }),
    children
  ] });
}
function PanelFooter({ left, actions }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mt-4 sm:mt-8 pt-3 sm:pt-5 border-t border-rose-100/50", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: left }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto", children: actions })
  ] });
}
const inputClass = "w-full min-h-[40px] sm:min-h-[44px] px-3 py-2 border sm:py-2.5 border-slate-200 rounded-lg sm:rounded-xl bg-slate-50 text-slate-800 text-xs font-bold outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400";
const labelClass = "text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block mb-1";
export {
  AdminProfileHeader as A,
  DashboardScrollbarStyles as D,
  PanelFooter as P,
  SettingsMobileTabs as S,
  PanelSection as a,
  SettingsPanel as b,
  SettingsSidebar as c,
  inputClass as i,
  labelClass as l
};
