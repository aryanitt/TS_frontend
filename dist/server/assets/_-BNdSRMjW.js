import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { createContext, useState, useEffect, useMemo, useContext, useRef, useCallback, Suspense, lazy } from "react";
import { Link, useNavigate, NavLink, useLocation, Outlet, useSearchParams, BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { X, PanelLeftOpen, PanelLeftClose, ChevronRight, LayoutDashboard, FileText, GitBranch, Kanban, Users, ClipboardList, Package, BookUser, Coins, Settings as Settings$1, Briefcase, CalendarDays, Menu, Search, Plus, ChevronDown, Calculator, History, CheckCheck, Bell, User, CheckSquare, MessageSquare, Phone, Download, Calendar, ArrowLeftRight } from "lucide-react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
const SidebarContext = createContext({ collapsed: false });
const STORAGE_KEY$1 = "ts_admin_profile";
const DEFAULT_ADMIN = {
  id: "admin-1",
  initials: "AC",
  fullName: "Alex Chen",
  role: "Super Admin",
  department: "Operations",
  email: "alex.chen@tspublication.in",
  phone: "+91 98765 43210",
  city: "Mumbai",
  timezone: "Asia/Kolkata (IST)",
  joinedAt: "2024-03-12",
  lastLogin: "2026-06-19T09:42:00",
  authProvider: "google",
  googleConnected: false,
  googleEmail: "",
  permissions: [
    "Full dashboard access",
    "Team & employee management",
    "Incentive rule configuration",
    "SOP publish & archive",
    "Reports export",
    "Workspace settings"
  ],
  notifications: {
    emailNotifications: true,
    leadAssigned: true,
    meetingReminder: true,
    targetAchieved: false,
    weeklyDigest: true
  },
  sessions: [
    { id: 1, device: "Windows · Chrome", location: "Mumbai, IN", current: true, lastActive: "Active now" },
    { id: 2, device: "iPhone · Safari", location: "Mumbai, IN", current: false, lastActive: "2 days ago" }
  ],
  stats: {
    teamMembers: 24,
    rulesPublished: 12,
    actionsThisWeek: 47
  }
};
function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY$1);
    if (!raw) return DEFAULT_ADMIN;
    return { ...DEFAULT_ADMIN, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_ADMIN;
  }
}
const AdminContext = createContext(null);
function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(loadProfile);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY$1, JSON.stringify(admin));
  }, [admin]);
  const updateAdmin = (patch) => setAdmin((prev) => ({ ...prev, ...patch }));
  const updateNotifications = (patch) => setAdmin((prev) => ({
    ...prev,
    notifications: { ...prev.notifications, ...patch }
  }));
  const connectGoogle = (email = "alex.chen@gmail.com") => setAdmin((prev) => ({
    ...prev,
    googleConnected: true,
    googleEmail: email,
    authProvider: "google",
    lastLogin: (/* @__PURE__ */ new Date()).toISOString()
  }));
  const disconnectGoogle = () => setAdmin((prev) => ({
    ...prev,
    googleConnected: false,
    googleEmail: ""
  }));
  const value = useMemo(
    () => ({
      admin,
      updateAdmin,
      updateNotifications,
      connectGoogle,
      disconnectGoogle
    }),
    [admin]
  );
  return /* @__PURE__ */ jsx(AdminContext.Provider, { value, children });
}
function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
const SIDEBAR_SHELL = `
  fixed lg:sticky top-0 left-0 z-50 h-screen shrink-0
  bg-[#0f172a] border-r border-slate-800
  flex flex-col overflow-hidden
  transition-[width,transform] duration-200 ease-out
`;
function SidebarLogo({ initials, title, subtitle, to, onNavigate, isExpanded, logo }) {
  return /* @__PURE__ */ jsxs(Link, { to, className: "flex items-center gap-2.5 min-w-0 group", onClick: onNavigate, children: [
    logo ?? /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 shadow-sm grid place-items-center shrink-0 group-hover:bg-slate-700 transition-colors", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-white tracking-tight", children: initials }) }),
    isExpanded && /* @__PURE__ */ jsxs("div", { className: "overflow-hidden min-w-0", children: [
      /* @__PURE__ */ jsx("div", { className: "font-display text-[15px] font-bold tracking-tight whitespace-nowrap text-slate-100 truncate leading-tight", children: title }),
      /* @__PURE__ */ jsx("div", { className: "text-[10px] font-medium text-slate-500 whitespace-nowrap truncate mt-0.5", children: subtitle })
    ] })
  ] });
}
function SidebarHeader({ children, isExpanded, onClose, onToggleCollapse, collapsed }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 h-14 shrink-0 border-b border-slate-800 bg-[#0f172a]", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onClose,
        className: "lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 shrink-0 border border-transparent hover:border-slate-700 transition",
        children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
      }
    ),
    isExpanded && onToggleCollapse && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onToggleCollapse,
        className: "hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition shrink-0",
        title: collapsed ? "Pin sidebar open" : "Collapse sidebar",
        children: collapsed ? /* @__PURE__ */ jsx(PanelLeftOpen, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(PanelLeftClose, { className: "w-3.5 h-3.5" })
      }
    )
  ] });
}
function SidebarSectionLabel({ children, isExpanded }) {
  if (!isExpanded) return null;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-2 mb-1.5", children: [
    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 shrink-0", children }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-slate-800" })
  ] });
}
function SidebarNavItem({ isActive, isExpanded, icon: Icon, label }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `relative flex items-center gap-2.5 rounded-md transition-colors duration-150 ${!isExpanded ? "justify-center p-2 mx-auto w-9 h-9" : "pl-2.5 pr-2.5 py-2 min-h-[36px]"} ${isActive ? "bg-slate-800 text-slate-100 ring-1 ring-slate-700 font-semibold" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 font-medium"}`,
      title: !isExpanded ? label : void 0,
      children: [
        isActive && isExpanded && /* @__PURE__ */ jsx("span", { className: "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-rose-500" }),
        /* @__PURE__ */ jsx(
          Icon,
          {
            className: `shrink-0 w-4 h-4 ${isActive ? "text-rose-400" : "text-slate-500 group-hover:text-slate-300"}`,
            strokeWidth: isActive ? 2.25 : 2
          }
        ),
        isExpanded && /* @__PURE__ */ jsx("span", { className: "truncate text-[12px] leading-tight", children: label })
      ]
    }
  );
}
function SidebarSwitchLink({ to, onClick, icon: Icon, label, isExpanded }) {
  if (!isExpanded) return null;
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to,
      onClick,
      className: "group flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[11px] font-semibold text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition mb-2",
      children: [
        /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5 shrink-0 text-slate-500 group-hover:text-slate-300" }),
        /* @__PURE__ */ jsx("span", { className: "truncate", children: label }),
        /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5 ml-auto text-slate-600 group-hover:text-slate-400 shrink-0" })
      ]
    }
  );
}
function SidebarProfileCard({ isExpanded, onClick, avatar, name, role, title }) {
  if (!isExpanded) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center py-1", children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick,
        title: title || name,
        className: "rounded-full ring-2 ring-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:ring-offset-2 focus:ring-offset-[#0f172a]",
        children: avatar
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "group w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg bg-slate-800/70 border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition text-left",
      children: [
        /* @__PURE__ */ jsx("div", { className: "shrink-0 scale-90 origin-left", children: avatar }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[12px] font-bold text-slate-100 truncate leading-tight", children: name }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-slate-500 font-medium truncate", children: role })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center gap-1 shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20", title: "Online" }) })
      ]
    }
  );
}
function SidebarCollapseHint({ show }) {
  if (!show) return null;
  return /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-slate-800 border border-slate-700 grid place-items-center shadow-sm", children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-3 h-3 text-slate-500" }) }) });
}
function SidebarNav({ children }) {
  return /* @__PURE__ */ jsx("nav", { className: "flex-1 px-2 py-2.5 space-y-0.5 overflow-y-auto overflow-x-hidden scrollbar-none", children });
}
function SidebarFooter({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "p-2.5 border-t border-slate-800 shrink-0 bg-[#0f172a]", children });
}
const S$2 = {
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function TSPublicationDoodleLogo({ size = 36, className = "" }) {
  const radius = size >= 40 ? "rounded-xl" : "rounded-lg";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `relative shrink-0 overflow-hidden border-2 border-slate-200/90 bg-gradient-to-br from-rose-50 via-white to-amber-50 shadow-[0_2px_8px_rgba(15,23,42,0.06)] ${radius} ${className}`,
      style: { width: size, height: size },
      "aria-hidden": true,
      children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 80 80", className: "w-full h-full", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ jsx("circle", { cx: "14", cy: "16", r: "9", fill: "#fecdd3", fillOpacity: "0.45" }),
        /* @__PURE__ */ jsx("circle", { cx: "66", cy: "58", r: "10", fill: "#fde68a", fillOpacity: "0.4" }),
        /* @__PURE__ */ jsx("circle", { cx: "58", cy: "14", r: "5", fill: "#bfdbfe", fillOpacity: "0.55" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M18 58 C18 38 22 28 40 26 C58 28 62 38 62 58 L62 64 C62 66 60 68 58 68 L22 68 C20 68 18 66 18 64 Z",
            fill: "#fff1f2",
            stroke: "#334155",
            strokeWidth: "2.2",
            ...S$2
          }
        ),
        /* @__PURE__ */ jsx("path", { d: "M40 26 L40 68", stroke: "#94a3b8", strokeWidth: "1.8", strokeDasharray: "2 3", ...S$2 }),
        /* @__PURE__ */ jsx("path", { d: "M24 38 L36 37", stroke: "#cbd5e1", strokeWidth: "1.5", ...S$2 }),
        /* @__PURE__ */ jsx("path", { d: "M23 44 L35 43", stroke: "#cbd5e1", strokeWidth: "1.5", ...S$2 }),
        /* @__PURE__ */ jsx("path", { d: "M22 50 L34 49", stroke: "#cbd5e1", strokeWidth: "1.5", ...S$2 }),
        /* @__PURE__ */ jsx(
          "text",
          {
            x: "46",
            y: "48",
            fontSize: "14",
            fontWeight: "800",
            fill: "#be123c",
            fontFamily: "system-ui, sans-serif",
            transform: "rotate(-4 46 48)",
            children: "TS"
          }
        ),
        /* @__PURE__ */ jsx("path", { d: "M44 52 L56 51", stroke: "#fda4af", strokeWidth: "1.5", ...S$2 }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M52 24 L56 24 L54 36 L52 34 L50 36 Z",
            fill: "#e11d48",
            stroke: "#9f1239",
            strokeWidth: "1.2",
            ...S$2
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M58 18 L66 10 L68 12 L60 20 Z",
            fill: "#6366f1",
            stroke: "#4338ca",
            strokeWidth: "1.5",
            ...S$2
          }
        ),
        /* @__PURE__ */ jsx("path", { d: "M58 18 L54 22", stroke: "#4338ca", strokeWidth: "2", ...S$2 }),
        /* @__PURE__ */ jsx("circle", { cx: "66", cy: "10", r: "1.8", fill: "#c7d2fe", stroke: "#4338ca", strokeWidth: "1" }),
        /* @__PURE__ */ jsx("path", { d: "M12 52 l1.2 2.4 -2.4 1.2 2.4 1.2 -1.2 2.4 1.2 -2.4 2.4 -1.2 -2.4 -1.2z", fill: "#fbbf24", fillOpacity: "0.75" }),
        /* @__PURE__ */ jsx("path", { d: "M68 42 l1 2 -2 1 2 1 -1 2 -1 -2 -2 -1 2 -1z", fill: "#f472b6", fillOpacity: "0.7" })
      ] })
    }
  );
}
const S$1 = {
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function AdminDoodleAvatar({ size = 32, className = "", shape = "circle" }) {
  const radius = shape === "circle" ? "rounded-full" : size >= 44 ? "rounded-2xl" : "rounded-xl";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `relative shrink-0 overflow-hidden border-2 border-slate-200/90 bg-gradient-to-br from-rose-50 via-white to-slate-50 shadow-[0_2px_8px_rgba(15,23,42,0.06)] ${radius} ${className}`,
      style: { width: size, height: size },
      "aria-hidden": true,
      children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 80 80", className: "w-full h-full", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ jsx("circle", { cx: "62", cy: "20", r: "9", fill: "#fecdd3", fillOpacity: "0.4" }),
        /* @__PURE__ */ jsx("circle", { cx: "18", cy: "56", r: "8", fill: "#e2e8f0", fillOpacity: "0.55" }),
        /* @__PURE__ */ jsx("path", { d: "M66 58 l2.5 1.5 -2.5 1.5 -1.5 -2.5z", fill: "#fbbf24", fillOpacity: "0.65" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M24 34 C26 18 34 14 40 14 C46 14 54 18 56 34 C54 26 48 21 40 21 C32 21 26 26 24 34Z",
            fill: "#334155",
            fillOpacity: "0.15",
            stroke: "#334155",
            strokeWidth: "2.2",
            ...S$1
          }
        ),
        /* @__PURE__ */ jsx("path", { d: "M28 28 Q34 17 40 16 Q46 17 52 28", stroke: "#334155", strokeWidth: "2", ...S$1 }),
        /* @__PURE__ */ jsx("ellipse", { cx: "40", cy: "40", rx: "16", ry: "17", fill: "#fde68a", stroke: "#334155", strokeWidth: "2.2", ...S$1 }),
        /* @__PURE__ */ jsx("ellipse", { cx: "31", cy: "44", rx: "3", ry: "1.8", fill: "#fda4af", fillOpacity: "0.4" }),
        /* @__PURE__ */ jsx("ellipse", { cx: "49", cy: "44", rx: "3", ry: "1.8", fill: "#fda4af", fillOpacity: "0.4" }),
        /* @__PURE__ */ jsx("circle", { cx: "34", cy: "38", r: "2", fill: "#1e293b" }),
        /* @__PURE__ */ jsx("circle", { cx: "46", cy: "38", r: "2", fill: "#1e293b" }),
        /* @__PURE__ */ jsx("circle", { cx: "34.6", cy: "37.4", r: "0.6", fill: "white" }),
        /* @__PURE__ */ jsx("circle", { cx: "46.6", cy: "37.4", r: "0.6", fill: "white" }),
        /* @__PURE__ */ jsx("circle", { cx: "34", cy: "38", r: "6.5", fill: "none", stroke: "#475569", strokeWidth: "2", ...S$1 }),
        /* @__PURE__ */ jsx("circle", { cx: "46", cy: "38", r: "6.5", fill: "none", stroke: "#475569", strokeWidth: "2", ...S$1 }),
        /* @__PURE__ */ jsx("path", { d: "M40.5 38 L39.5 38", stroke: "#475569", strokeWidth: "2", ...S$1 }),
        /* @__PURE__ */ jsx("path", { d: "M27.5 37 L24 36", stroke: "#475569", strokeWidth: "2", ...S$1 }),
        /* @__PURE__ */ jsx("path", { d: "M52.5 37 L56 36", stroke: "#475569", strokeWidth: "2", ...S$1 }),
        /* @__PURE__ */ jsx("path", { d: "M34 47 Q40 51 46 47", stroke: "#334155", strokeWidth: "2", ...S$1 }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M28 58 L40 66 L52 58 L52 72 L28 72 Z",
            fill: "#f8fafc",
            stroke: "#64748b",
            strokeWidth: "2",
            ...S$1
          }
        ),
        /* @__PURE__ */ jsx("path", { d: "M40 58 L40 72", stroke: "#94a3b8", strokeWidth: "1.5", ...S$1 }),
        /* @__PURE__ */ jsx("path", { d: "M40 58 L36 66 L40 72 L44 66 Z", fill: "#be123c", stroke: "#9f1239", strokeWidth: "1.5", ...S$1 }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M58 22 L62 24 L62 30 C62 34 60 36 58 37 C56 36 54 34 54 30 L54 24 Z",
            fill: "#fff1f2",
            stroke: "#e11d48",
            strokeWidth: "1.8",
            ...S$1
          }
        ),
        /* @__PURE__ */ jsx("path", { d: "M58 26 L58 33 M55.5 29.5 L60.5 29.5", stroke: "#e11d48", strokeWidth: "1.5", ...S$1 }),
        /* @__PURE__ */ jsx("path", { d: "M12 24 l1.2 2.4 -2.4 1.2 2.4 1.2 -1.2 2.4 1.2 -2.4 2.4 -1.2 -2.4 -1.2z", fill: "#f472b6", fillOpacity: "0.65" })
      ] })
    }
  );
}
const items$2 = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/sop", label: "SOP Management", icon: FileText },
  { to: "/sales", label: "Sales Funnel", icon: GitBranch },
  { to: "/pipeline", label: "Pipeline", icon: Kanban },
  { to: "/leads", label: "Leads Assign", icon: Users },
  { to: "/forms", label: "Forms", icon: ClipboardList },
  { to: "/services", label: "Services", icon: Package },
  { to: "/team", label: "Team Management", icon: BookUser },
  { to: "/incentives", label: "Incentives", icon: Coins },
  { to: "/settings", label: "Settings", icon: Settings$1 }
];
function Sidebar({ open, onClose, collapsed, onToggleCollapse }) {
  const [hovered, setHovered] = useState(false);
  const { admin } = useAdmin();
  const navigate = useNavigate();
  const isExpanded = !collapsed || hovered;
  return /* @__PURE__ */ jsxs(SidebarContext.Provider, { value: { collapsed: !isExpanded }, children: [
    open && /* @__PURE__ */ jsx("div", { onClick: onClose, className: "fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden" }),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        onMouseEnter: () => collapsed && setHovered(true),
        onMouseLeave: () => setHovered(false),
        className: `${SIDEBAR_SHELL} ${isExpanded ? "w-[260px]" : "w-[68px]"} ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`,
        children: [
          /* @__PURE__ */ jsx(
            SidebarHeader,
            {
              isExpanded,
              onClose,
              onToggleCollapse,
              collapsed,
              children: /* @__PURE__ */ jsx(
                SidebarLogo,
                {
                  to: "/",
                  onNavigate: onClose,
                  isExpanded,
                  logo: /* @__PURE__ */ jsx(TSPublicationDoodleLogo, { size: 36 }),
                  title: "TS Publication",
                  subtitle: "Admin dashboard"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs(SidebarNav, { children: [
            /* @__PURE__ */ jsx(SidebarSectionLabel, { isExpanded, children: "Menu" }),
            items$2.map((item) => {
              const Icon = item.icon;
              return /* @__PURE__ */ jsx(
                NavLink,
                {
                  to: item.to,
                  end: item.end,
                  onClick: onClose,
                  className: "block group",
                  children: ({ isActive }) => /* @__PURE__ */ jsx(SidebarNavItem, { isActive, isExpanded, icon: Icon, label: item.label })
                },
                item.to
              );
            })
          ] }),
          /* @__PURE__ */ jsxs(SidebarFooter, { children: [
            /* @__PURE__ */ jsx(
              SidebarSwitchLink,
              {
                to: "/employee",
                onClick: onClose,
                icon: Briefcase,
                label: "Employee Panel",
                isExpanded
              }
            ),
            /* @__PURE__ */ jsx(
              SidebarProfileCard,
              {
                isExpanded,
                onClick: () => {
                  navigate("/admin");
                  onClose();
                },
                name: admin.fullName,
                role: admin.role,
                title: `${admin.fullName} — ${admin.role}`,
                avatar: /* @__PURE__ */ jsx(AdminDoodleAvatar, { size: 32, shape: "circle" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(SidebarCollapseHint, { show: collapsed && !hovered })
        ]
      }
    )
  ] });
}
const CACHE_PREFIX = "crm_cache:";
const DEFAULT_GET_TTL = 5 * 60 * 1e3;
const memoryCache = /* @__PURE__ */ new Map();
function getApiBase() {
  const envUrl = "https://mediumturquoise-capybara-737767.hostingersite.com";
  if (String(envUrl).trim() !== "") {
    return String(envUrl).replace(/\/$/, "");
  }
  return "";
}
function apiUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const base = getApiBase();
  return base ? `${base}${normalized}` : normalized;
}
function cacheKey(url) {
  return `${CACHE_PREFIX}${url}`;
}
function readSession(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() > parsed.expires) {
      sessionStorage.removeItem(key);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}
function writeSession(key, data, ttl) {
  try {
    sessionStorage.setItem(
      key,
      JSON.stringify({ data, expires: Date.now() + ttl, savedAt: Date.now() })
    );
  } catch {
  }
}
function invalidateCache(match = "") {
  const needle = match.toLowerCase();
  for (const key of memoryCache.keys()) {
    if (!needle || key.toLowerCase().includes(needle)) {
      memoryCache.delete(key);
    }
  }
  try {
    for (let i = sessionStorage.length - 1; i >= 0; i -= 1) {
      const key = sessionStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX) && (!needle || key.toLowerCase().includes(needle))) {
        sessionStorage.removeItem(key);
      }
    }
  } catch {
  }
}
async function performFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      ...options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {},
      ...options.headers
    }
  });
  return response;
}
function storeGetCache(key, data, ttl) {
  memoryCache.set(key, { data, expires: Date.now() + ttl });
  writeSession(key, data, ttl);
}
async function revalidateInBackground(url, options, key, ttl) {
  try {
    const response = await performFetch(url, options);
    if (!response.ok) return;
    const data = await response.json();
    storeGetCache(key, data, ttl);
  } catch {
  }
}
async function apiJson(path, options = {}) {
  const {
    cacheTtl = DEFAULT_GET_TTL,
    skipCache = false,
    method = "GET",
    ...fetchOptions
  } = options;
  const url = apiUrl(path);
  const httpMethod = method.toUpperCase();
  const isGet = httpMethod === "GET";
  const key = cacheKey(url);
  if (isGet && !skipCache && cacheTtl > 0) {
    const mem = memoryCache.get(key);
    if (mem && Date.now() < mem.expires) {
      revalidateInBackground(url, { ...fetchOptions, method: httpMethod }, key, cacheTtl);
      return mem.data;
    }
    const stored = readSession(key);
    if (stored != null) {
      storeGetCache(key, stored, cacheTtl);
      revalidateInBackground(url, { ...fetchOptions, method: httpMethod }, key, cacheTtl);
      return stored;
    }
  }
  const response = await performFetch(url, { ...fetchOptions, method: httpMethod });
  let data;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  if (!response.ok) {
    const message = data?.message || data?.error || response.statusText || "Request failed";
    const err = new Error(message);
    err.status = response.status;
    err.data = data;
    throw err;
  }
  if (isGet && cacheTtl > 0) {
    storeGetCache(key, data, cacheTtl);
  } else if (!isGet) {
    invalidateCache(path.split("?")[0].replace(/\/[^/]+$/, "") || "/api");
    invalidateCache(path.split("?")[0]);
  }
  return data;
}
async function apiGet(path, options = {}) {
  return apiJson(path, { ...options, method: "GET" });
}
async function apiPost(path, body, options = {}) {
  return apiJson(path, {
    ...options,
    method: "POST",
    body: JSON.stringify(body),
    cacheTtl: 0
  });
}
async function apiPut(path, body, options = {}) {
  return apiJson(path, {
    ...options,
    method: "PUT",
    body: JSON.stringify(body),
    cacheTtl: 0
  });
}
async function apiPatch(path, body, options = {}) {
  return apiJson(path, {
    ...options,
    method: "PATCH",
    body: JSON.stringify(body),
    cacheTtl: 0
  });
}
async function apiDelete(path, options = {}) {
  return apiJson(path, { ...options, method: "DELETE", cacheTtl: 0 });
}
function readCachedJson(path) {
  const url = apiUrl(path);
  const key = cacheKey(url);
  const mem = memoryCache.get(key);
  if (mem && Date.now() < mem.expires) return mem.data;
  return readSession(key);
}
const queryKeys = {
  employees: ["employees"],
  employeeLeads: (name) => ["employee-leads", name],
  teamChart: (range) => ["team-chart", range],
  teamKpis: (range) => ["team-kpis", range],
  sops: ["sops"],
  salesLeads: ["sales-leads"],
  salesEmpLeads: ["sales-emp-leads"],
  pipelineStats: ["pipeline-stats"],
  leads: ["leads"],
  activities: ["activities"],
  notifications: ["notifications"],
  activitySearch: (q) => ["activity-search", q]
};
const RANGE_TABS = [
  { id: "today", label: "Today", shortLabel: "Today" },
  { id: "week", label: "This Week", shortLabel: "Week" },
  { id: "month", label: "This Month", shortLabel: "Month" },
  { id: "custom", label: "Custom", shortLabel: "Custom" }
];
const PERIOD_PILL_BTN = "px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold transition-all border whitespace-nowrap shrink-0";
const PERIOD_PILL_ACTIVE = "border-rose-600 bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 text-white shadow-sm";
const PERIOD_PILL_INACTIVE = "border-rose-200 bg-white text-gray-600 hover:border-rose-400 hover:text-rose-600 hover:bg-rose-50";
const LABEL_BY_ID = Object.fromEntries(RANGE_TABS.map((t) => [t.id, t.label]));
function presetToApiLabel(preset) {
  return LABEL_BY_ID[preset] || "This Month";
}
function defaultPresetForRoute(pathname) {
  if (pathname === "/") return "week";
  if (pathname === "/team") return "month";
  return "month";
}
function emptyRangeState(pathname) {
  return { preset: defaultPresetForRoute(pathname), fromDate: "", toDate: "" };
}
function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function endOfDay(d) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}
function getDateBounds(preset, fromDate = "", toDate = "") {
  const now = /* @__PURE__ */ new Date();
  if (preset === "custom" && fromDate && toDate) {
    return { start: fromDate, end: toDate };
  }
  if (preset === "today") {
    const s2 = startOfDay(now);
    return { start: s2.toISOString().slice(0, 10), end: endOfDay(now).toISOString().slice(0, 10) };
  }
  if (preset === "week") {
    const s2 = startOfDay(now);
    s2.setDate(s2.getDate() - s2.getDay());
    return { start: s2.toISOString().slice(0, 10), end: endOfDay(now).toISOString().slice(0, 10) };
  }
  const s = startOfDay(new Date(now.getFullYear(), now.getMonth(), 1));
  return { start: s.toISOString().slice(0, 10), end: endOfDay(now).toISOString().slice(0, 10) };
}
const STORAGE_KEY = "crm_date_range_by_route";
const DateRangeContext = createContext(null);
function loadStored() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function DateRangeProvider({ children }) {
  const { pathname } = useLocation();
  const [byRoute, setByRoute] = useState(loadStored);
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(byRoute));
      } catch {
      }
    }, 300);
    return () => window.clearTimeout(id);
  }, [byRoute]);
  const current = byRoute[pathname] ?? emptyRangeState(pathname);
  const setPreset = (preset) => {
    setByRoute((prev) => ({
      ...prev,
      [pathname]: {
        ...prev[pathname] ?? emptyRangeState(pathname),
        preset,
        ...preset !== "custom" ? { fromDate: "", toDate: "" } : {}
      }
    }));
  };
  const setCustomDates = (fromDate, toDate) => {
    setByRoute((prev) => ({
      ...prev,
      [pathname]: { preset: "custom", fromDate, toDate }
    }));
  };
  const value = useMemo(
    () => ({
      pathname,
      preset: current.preset,
      fromDate: current.fromDate,
      toDate: current.toDate,
      apiLabel: presetToApiLabel(current.preset),
      bounds: getDateBounds(current.preset, current.fromDate, current.toDate),
      setPreset,
      setCustomDates
    }),
    [pathname, current.preset, current.fromDate, current.toDate]
  );
  return /* @__PURE__ */ jsx(DateRangeContext.Provider, { value, children });
}
function useDateRange() {
  const ctx = useContext(DateRangeContext);
  if (!ctx) {
    throw new Error("useDateRange must be used within DateRangeProvider");
  }
  return ctx;
}
function CustomDatePopover({ fromDate, setFromDate, toDate, setToDate, onApply, onClose, anchorRef }) {
  const popoverRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  useEffect(() => {
    const update = () => {
      if (!anchorRef?.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      const w = 288;
      let left = rect.right - w;
      left = Math.max(8, Math.min(left, window.innerWidth - w - 8));
      setPos({ top: rect.bottom + 8, left });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [anchorRef]);
  useEffect(() => {
    const onDown = (e) => {
      if (popoverRef.current?.contains(e.target) || anchorRef.current?.contains(e.target)) {
        return;
      }
      onClose();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [onClose, anchorRef]);
  if (typeof document === "undefined") return null;
  return ReactDOM.createPortal(
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        ref: popoverRef,
        initial: { opacity: 0, y: -6, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -6, scale: 0.98 },
        style: { position: "fixed", top: pos.top, left: pos.left, zIndex: 99999 },
        className: "p-4 rounded-xl border border-rose-200 bg-white shadow-xl w-72 max-w-[calc(100vw-2rem)]",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-800", children: "Custom Date Range" }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "w-6 h-6 rounded-md hover:bg-rose-50 grid place-items-center", children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5 text-slate-500" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block", children: "From" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  value: fromDate,
                  onChange: (e) => setFromDate(e.target.value),
                  className: "w-full border border-rose-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-rose-400"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block", children: "To" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  value: toDate,
                  onChange: (e) => setToDate(e.target.value),
                  className: "w-full border border-rose-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-rose-400"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onApply,
                className: "w-full py-2 rounded-lg gradient-primary text-white text-xs font-bold",
                children: "Apply Range"
              }
            )
          ] })
        ]
      }
    ),
    document.body
  );
}
function DateRangeFilter({ className = "", compact = false }) {
  const { preset, fromDate, toDate, setPreset, setCustomDates } = useDateRange();
  const [showCalendar, setShowCalendar] = useState(false);
  const [draftFrom, setDraftFrom] = useState(fromDate);
  const [draftTo, setDraftTo] = useState(toDate);
  const customBtnRef = useRef(null);
  useEffect(() => {
    setDraftFrom(fromDate);
    setDraftTo(toDate);
  }, [fromDate, toDate, preset]);
  return /* @__PURE__ */ jsxs("div", { className: `${compact ? "grid grid-cols-4 gap-1 w-full min-w-0" : "flex items-center gap-0.5 sm:gap-1 flex-shrink-0 min-w-0"} ${className}`, children: [
    RANGE_TABS.map((t) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        ref: t.id === "custom" ? customBtnRef : void 0,
        onClick: () => {
          setPreset(t.id);
          if (t.id === "custom") {
            setShowCalendar(true);
          } else {
            setShowCalendar(false);
          }
        },
        className: `${PERIOD_PILL_BTN} ${compact ? "w-full inline-flex items-center justify-center px-1 text-[9px] sm:text-[10px]" : ""} ${preset === t.id ? PERIOD_PILL_ACTIVE : PERIOD_PILL_INACTIVE}`,
        children: t.id === "custom" && preset === "custom" && fromDate && toDate ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-0.5", children: [
          /* @__PURE__ */ jsx(CalendarDays, { className: "w-2.5 h-2.5 sm:w-3 sm:h-3" }),
          fromDate.slice(5),
          " → ",
          toDate.slice(5)
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: t.shortLabel ?? t.label }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: t.label })
        ] })
      },
      t.id
    )),
    /* @__PURE__ */ jsx(AnimatePresence, { children: showCalendar && preset === "custom" && /* @__PURE__ */ jsx(
      CustomDatePopover,
      {
        fromDate: draftFrom,
        setFromDate: setDraftFrom,
        toDate: draftTo,
        setToDate: setDraftTo,
        onApply: () => {
          if (draftFrom && draftTo) {
            setCustomDates(draftFrom, draftTo);
          }
          setShowCalendar(false);
        },
        onClose: () => setShowCalendar(false),
        anchorRef: customBtnRef
      }
    ) })
  ] });
}
const titles = {
  "/": { title: "Dashboard", sub: "Overview of your CRM activity", cta: "Quick Action" },
  "/sop": { title: "SOP Management", sub: "Standardize operations across teams", cta: "Upload SOP" },
  "/sales": { title: "Sales Funnel", sub: "Track every deal across your pipeline", cta: "Add Deal" },
  "/team": { title: "Team Management", sub: "Visibility into your people and performance", cta: "Add Member" },
  "/incentives": { title: "Incentive Calculations", sub: "Payouts, slabs and team performance", cta: "Calculate" },
  "/settings": { title: "Settings", sub: "Workspace preferences", cta: "Save" },
  "/admin": { title: "Admin Profile", sub: "Your account, access & sign-in", cta: "Save" },
  "/leads": { title: "Leads", sub: "Manage and track incoming leads", cta: "Add Lead" },
  "/pipeline": { title: "Pipeline", sub: "Real-time overview of your sales pipeline", cta: "Add Lead" },
  "/forms": { title: "Forms Dashboard", sub: "Lead capture forms across all channels", cta: "Create Form" },
  "/services": { title: "Services Catalog", sub: "Productized offerings & revenue lines", cta: "Add Service" },
  "/reports": { title: "Reports", sub: "Analytics and performance exports", cta: "Export" }
};
function resolvePageMeta(pathname) {
  if (/^\/services\/[^/]+\/edit$/.test(pathname)) {
    return { title: "Edit Service", sub: "Update catalog details, pricing, and features" };
  }
  const serviceDetailMatch = pathname.match(/^\/services\/([^/]+)$/);
  if (serviceDetailMatch) {
    return {
      title: "Service Detail",
      sub: "Performance, tiers, and delivery"
    };
  }
  if (pathname.startsWith("/forms/")) {
    return { title: "Form Leads", sub: "Leads captured from this form", cta: "Export" };
  }
  const base = titles[pathname] ?? titles["/"];
  if (pathname === "/forms") {
    return { ...base, ctaTo: "/forms?action=createForm" };
  }
  if (pathname === "/services") {
    return { ...base, ctaTo: "/services?action=addService" };
  }
  if (pathname === "/pipeline") {
    return { ...base, ctaTo: "/pipeline?action=addLead" };
  }
  return base;
}
const HIDE_DATE_RANGE_ROUTES = ["/incentives", "/settings", "/admin"];
function hideDateRange(pathname) {
  return HIDE_DATE_RANGE_ROUTES.includes(pathname) || pathname.startsWith("/forms") || pathname.startsWith("/services") || pathname === "/pipeline";
}
const quickActions = [
  { label: "Add Lead", icon: Plus, to: "/sales", search: "?action=addLead" },
  { label: "Add SOP", icon: FileText, to: "/sop", search: "?action=addSOP" },
  { label: "Add New Team Member", icon: Users, to: "/team", search: "?action=addMember" },
  { label: "Create Form", icon: FileText, to: "/forms", search: "?action=createForm" },
  { label: "Calculate Incentive", icon: Calculator, to: "/incentives" }
];
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 6e4);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
const TYPE_ICON = {
  employee: { Icon: Users, bg: "#fff0f6", color: "#e11d48" },
  lead: { Icon: Briefcase, bg: "#eff6ff", color: "#2563eb" }
};
function Topbar({ onMenu }) {
  const { pathname } = useLocation();
  const showDateRange = !hideDateRange(pathname);
  const navigate = useNavigate();
  const { admin } = useAdmin();
  const meta = resolvePageMeta(pathname);
  const [openMenu, setOpenMenu] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const debounceRef = useRef(null);
  const queryClient = useQueryClient();
  const { data: activityData } = useQuery({
    queryKey: queryKeys.activities,
    queryFn: () => apiGet("/api/activity"),
    staleTime: 2 * 60 * 1e3
  });
  const { data: notifData, refetch: refetchNotifications } = useQuery({
    queryKey: queryKeys.notifications,
    queryFn: () => apiGet("/api/activity/notifications"),
    staleTime: 2 * 60 * 1e3
  });
  const activities = activityData?.success ? activityData.activities : [];
  const notifications = notifData?.success ? notifData.notifications : [];
  const unreadCount = notifData?.success ? notifData.unreadCount : 0;
  useEffect(() => {
    if (!searchQ.trim()) {
      setSearchResults([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const data = await apiGet(
          `/api/activity/search?q=${encodeURIComponent(searchQ)}`,
          { cacheTtl: 30 * 1e3 }
        );
        if (data.success) setSearchResults(data.results);
      } catch (_) {
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [searchQ]);
  const markAllRead = async () => {
    try {
      await apiPost("/api/activity/notifications/read", {});
      queryClient.setQueryData(
        queryKeys.notifications,
        (old) => old ? { ...old, unreadCount: 0, notifications: (old.notifications || []).map((x) => ({ ...x, is_read: true })) } : old
      );
    } catch (_) {
    }
  };
  const refreshActivity = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.activities });
  };
  const refreshNotifications = () => {
    refetchNotifications();
  };
  const handleAction = (action) => {
    setOpenMenu(null);
    navigate(`${action.to}${action.search ?? ""}`);
  };
  const handleUserMenu = (item) => {
    setOpenMenu(null);
    if (item === "Admin Profile") navigate("/admin");
    else if (item === "Workspace Settings") navigate("/settings");
  };
  const userMenuItems = ["Admin Profile", "Workspace Settings"];
  useEffect(() => {
    const handler = (e) => {
      const inDesktop = searchRef.current?.contains(e.target);
      const inMobile = mobileSearchRef.current?.contains(e.target);
      if (inDesktop || inMobile) return;
      setSearchQ("");
      setSearchResults([]);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-sm overflow-x-clip", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 sm:px-4 lg:px-8 py-2 min-h-[52px] md:min-h-20 min-w-0", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onMenu,
          className: "w-9 h-9 -ml-1 rounded-xl hover:bg-[#FFF5F8] text-[#DC143C] lg:hidden transition-all duration-200 shrink-0 grid place-items-center",
          "aria-label": "Open menu",
          children: /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-0 md:hidden", ref: mobileSearchRef, children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#DC143C] pointer-events-none" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            value: searchQ,
            onChange: (e) => {
              setSearchQ(e.target.value);
              setOpenMenu(null);
            },
            placeholder: "Search deals, people, SOPs…",
            "aria-label": "Search",
            className: "w-full h-10 pl-9 pr-9 py-2 rounded-xl bg-[#F5F7FA] border border-[#E5E7EB]\n              text-[#111827] text-sm placeholder:text-[#9CA3AF]\n              focus:outline-none focus:ring-2 focus:ring-[#DC143C]/20 focus:border-[#DC143C]/30 transition"
          }
        ),
        searchQ && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setSearchQ("");
              setSearchResults([]);
            },
            className: "absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#9CA3AF] hover:text-[#DC143C] hover:bg-[#FFF5F8]",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" })
          }
        ),
        searchQ.length >= 2 && /* @__PURE__ */ jsx(
          SearchDropdown,
          {
            searching,
            searchQ,
            searchResults,
            navigate,
            setSearchQ,
            setSearchResults
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-2 shrink-0 min-w-0", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg font-display font-semibold tracking-tight leading-tight text-[#111827]", children: meta.title }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-[#6B7280] leading-tight", children: meta.sub })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative hidden md:block flex-1 min-w-0 max-w-md mx-2 lg:mx-4", ref: searchRef, children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#DC143C]" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            value: searchQ,
            onChange: (e) => {
              setSearchQ(e.target.value);
              setOpenMenu(null);
            },
            placeholder: "Search deals, people, SOPs…",
            className: "w-full min-h-[44px] pl-11 pr-16 py-2.5 rounded-xl bg-[#F5F7FA] border border-[#E5E7EB]\n              text-[#111827] text-sm placeholder:text-muted-foreground\n              focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary/40 transition"
          }
        ),
        /* @__PURE__ */ jsx("kbd", { className: "hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#DC143C] px-2 py-0.5 rounded-md", children: "⌘K" }),
        searchQ.length >= 2 && /* @__PURE__ */ jsx(
          SearchDropdown,
          {
            searching,
            searchQ,
            searchResults,
            navigate,
            setSearchQ,
            setSearchResults
          }
        )
      ] }),
      showDateRange && /* @__PURE__ */ jsx(DateRangeFilter, { className: "hidden lg:flex shrink-0" }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:block flex-grow min-w-0" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 sm:gap-1.5 justify-end shrink-0", children: [
        meta.ctaTo && /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate(meta.ctaTo),
            className: "inline-flex items-center gap-1.5 bg-rose-700 hover:bg-rose-800 text-white\n                px-4 py-2 rounded-full text-xs md:text-sm font-bold shadow-md transition mr-1",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: meta.cta }),
              /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "New" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative hidden md:inline-flex w-auto", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setOpenMenu(openMenu === "quick" ? null : "quick"),
              className: "inline-flex items-center gap-1.5 bg-primary text-primary-foreground\n                px-3 py-2 rounded-xl text-xs md:text-sm font-medium hover:bg-primary/90 transition",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "Quick Actions" }),
                /* @__PURE__ */ jsx(ChevronDown, { className: "w-3 h-3" })
              ]
            }
          ),
          openMenu === "quick" && /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-full mt-2 popover-responsive bg-white rounded-2xl\n                border border-[#FFD6E5] shadow-[0_12px_40px_rgba(220,20,60,0.12)] z-50", children: /* @__PURE__ */ jsx("div", { className: "p-1 space-y-0.5", children: quickActions.map((action) => {
            const Icon = action.icon;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleAction(action),
                className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl\n                          text-xs md:text-sm text-[#111827] hover:bg-[#FFF0F5] transition",
                children: [
                  /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 text-[#DC143C] shrink-0" }),
                  /* @__PURE__ */ jsx("span", { className: "text-left font-semibold text-[#111827]", children: action.label })
                ]
              },
              action.label
            );
          }) }) })
        ] }),
        /* @__PURE__ */ jsx(
          Popover,
          {
            open: openMenu === "activity",
            onToggle: () => {
              setOpenMenu(openMenu === "activity" ? null : "activity");
              if (openMenu !== "activity") refreshActivity();
            },
            icon: /* @__PURE__ */ jsx(History, { className: "w-[18px] h-[18px] text-[#DC143C]" }),
            children: /* @__PURE__ */ jsxs("div", { className: "w-full sm:w-80 p-4 max-w-[calc(100vw-1.5rem)]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-[#DC143C]", children: "Recent Activity" }),
                /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-[#9f1239] bg-[#fff0f6] px-2 py-0.5 rounded-full border border-[#fecdd3]", children: [
                  activities.length,
                  " events"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-1 max-h-72 overflow-y-auto", children: activities.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-[#be123c] py-4", children: "No activity yet" }) : activities.map((a) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-start gap-3 text-xs p-2 rounded-xl hover:bg-[#FFF5F8] transition",
                  children: [
                    /* @__PURE__ */ jsx("div", { style: {
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: a.entity === "lead" ? "#2563eb" : "#e11d48",
                      marginTop: 5,
                      flexShrink: 0
                    } }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[#111827] font-medium leading-tight truncate", children: a.action }),
                      /* @__PURE__ */ jsxs("p", { className: "text-[#9CA3AF] mt-0.5 text-[10px]", children: [
                        a.user_name,
                        " · ",
                        timeAgo(a.created_at)
                      ] })
                    ] })
                  ]
                },
                a.id
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          Popover,
          {
            open: openMenu === "notif",
            onToggle: () => {
              setOpenMenu(openMenu === "notif" ? null : "notif");
              if (openMenu !== "notif") refreshNotifications();
            },
            icon: /* @__PURE__ */ jsx(Bell, { className: "w-[18px] h-[18px] text-[#DC143C]" }),
            badge: unreadCount > 0,
            badgeCount: unreadCount,
            children: /* @__PURE__ */ jsxs("div", { className: "w-full sm:w-80 max-w-[calc(100vw-1.5rem)]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 pt-4 pb-2", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-[#DC143C]", children: "Notifications" }),
                unreadCount > 0 && /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: markAllRead,
                    className: "flex items-center gap-1 text-[10px] text-[#be123c] hover:text-[#e11d48] transition",
                    children: [
                      /* @__PURE__ */ jsx(CheckCheck, { style: { width: 12, height: 12 } }),
                      "Mark all read"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "max-h-80 overflow-y-auto px-2 pb-2", children: notifications.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-[#be123c] py-6", children: "No notifications" }) : notifications.map((n) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "p-3 rounded-xl hover:bg-[#FFF5F8] transition cursor-pointer",
                  style: { opacity: n.is_read ? 0.6 : 1 },
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-[#111827]", children: n.title }),
                      !n.is_read && /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary mt-1 shrink-0 animate-pulse" })
                    ] }),
                    n.body && /* @__PURE__ */ jsx("p", { className: "text-[11px] text-[#6B7280] mt-1 leading-snug", children: n.body }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-[#9CA3AF] mt-1", children: timeAgo(n.created_at) })
                  ]
                },
                n.id
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setOpenMenu(openMenu === "user" ? null : "user"),
            className: "relative flex items-center justify-center gap-1.5 sm:gap-2 w-9 h-9 sm:w-auto sm:h-auto p-0 sm:pl-1 sm:pr-3 sm:py-1 rounded-full sm:rounded-xl shrink-0\n              border border-[#E5E7EB] bg-white hover:bg-[#FFE4EC] transition",
            children: [
              /* @__PURE__ */ jsx(AdminDoodleAvatar, { size: 28, shape: "circle", className: "shrink-0" }),
              /* @__PURE__ */ jsxs("div", { className: "hidden lg:block text-left leading-tight", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold text-[#DC143C]", children: admin.fullName }),
                /* @__PURE__ */ jsx("div", { className: "text-[10px] text-[#6B7280]", children: admin.role })
              ] }),
              /* @__PURE__ */ jsx(ChevronDown, { className: "hidden sm:block w-3.5 h-3.5 text-muted-foreground shrink-0" }),
              openMenu === "user" && /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-full mt-2 popover-responsive bg-white rounded-2xl\n                border border-[#FFD6E5] shadow-[0_12px_40px_rgba(220,20,60,0.12)] p-2 z-50", children: userMenuItems.map((i) => /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleUserMenu(i),
                  className: "w-full text-left px-3 py-2 text-sm rounded-xl transition cursor-pointer flex items-center gap-2 text-[#111827] hover:bg-[#FFF5F8] hover:text-[#DC143C]",
                  children: [
                    i === "Admin Profile" && /* @__PURE__ */ jsx(User, { className: "w-4 h-4 shrink-0" }),
                    i === "Workspace Settings" && /* @__PURE__ */ jsx(Settings$1, { className: "w-4 h-4 shrink-0" }),
                    i
                  ]
                },
                i
              )) })
            ]
          }
        )
      ] })
    ] }),
    showDateRange && /* @__PURE__ */ jsx("div", { className: "lg:hidden px-2.5 pb-1 pt-0.5 border-t border-[#F3F4F6] bg-[#FAFAFA]/80", children: /* @__PURE__ */ jsx(DateRangeFilter, { compact: true, className: "w-full" }) })
  ] });
}
function SearchDropdown({ searching, searchQ, searchResults, navigate, setSearchQ, setSearchResults }) {
  return /* @__PURE__ */ jsx("div", { className: "absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#FFD6E5]\n      shadow-[0_12px_40px_rgba(220,20,60,0.12)] z-50 overflow-hidden max-h-[60vh] overflow-y-auto", children: searching ? /* @__PURE__ */ jsx("div", { className: "p-4 text-center text-xs text-[#be123c]", children: "Searching…" }) : searchResults.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-4 text-center text-xs text-[#9f1239]", children: [
    'No results for "',
    searchQ,
    '"'
  ] }) : /* @__PURE__ */ jsx("div", { className: "p-1", children: searchResults.map((r) => {
    const cfg = TYPE_ICON[r.type] || TYPE_ICON.employee;
    const Icon = cfg.Icon;
    return /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          navigate(r.type === "employee" ? "/team" : "/sales");
          setSearchQ("");
          setSearchResults([]);
        },
        className: "w-full flex items-center gap-3 px-3 py-3 rounded-xl\n                  hover:bg-[#FFF0F5] transition text-left touch-target",
        children: [
          /* @__PURE__ */ jsx("div", { style: {
            width: 30,
            height: 30,
            borderRadius: 8,
            flexShrink: 0,
            background: cfg.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }, children: /* @__PURE__ */ jsx(Icon, { style: { width: 14, height: 14, color: cfg.color } }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-[#111827] truncate", children: r.name }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-[#6B7280] truncate", children: r.sub || r.email || r.role })
          ] }),
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 9,
            fontWeight: 700,
            padding: "2px 7px",
            borderRadius: 20,
            background: cfg.bg,
            color: cfg.color,
            textTransform: "capitalize",
            flexShrink: 0
          }, children: r.type })
        ]
      },
      `${r.type}-${r.id}`
    );
  }) }) });
}
function Popover({ open, onToggle, icon, badge, badgeCount, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: onToggle,
        "aria-expanded": open,
        className: "relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F8F9FC] transition grid place-items-center shrink-0",
        children: [
          icon,
          badge && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full\n            bg-primary text-white text-[9px] font-bold flex items-center justify-center px-1", children: badgeCount > 9 ? "9+" : badgeCount })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-full mt-2 popover-responsive bg-white rounded-2xl\n          border border-[#FFD6E5] shadow-[0_12px_40px_rgba(220,20,60,0.12)] z-50 max-w-[calc(100vw-1rem)]", children })
  ] });
}
const items$1 = [
  { to: "/", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/sales", label: "Sales", icon: GitBranch },
  { to: "/team", label: "Team", icon: BookUser },
  { to: "/sop", label: "SOP", icon: FileText },
  { to: "/incentives", label: "Pay", icon: Coins }
];
function MobileNav() {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: "lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur-md safe-area-pb",
      style: { paddingBottom: "env(safe-area-inset-bottom, 0px)" },
      "aria-label": "Admin navigation",
      children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-6 h-14 max-w-[100vw]", children: items$1.map((i) => {
        const Icon = i.icon;
        return /* @__PURE__ */ jsxs(
          NavLink,
          {
            to: i.to,
            end: i.end,
            className: ({ isActive }) => `flex flex-col items-center justify-center gap-0.5 min-w-0 px-0.5 py-1 text-[8px] font-semibold leading-none touch-target transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`,
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 shrink-0", strokeWidth: 2 }),
              /* @__PURE__ */ jsx("span", { className: "truncate max-w-full", children: i.label })
            ]
          },
          i.to
        );
      }) })
    }
  );
}
function AppLayout() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.employees,
      queryFn: () => apiGet("/api/team/employees")
    });
    queryClient.prefetchQuery({
      queryKey: queryKeys.activities,
      queryFn: () => apiGet("/api/activity")
    });
    queryClient.prefetchQuery({
      queryKey: queryKeys.notifications,
      queryFn: () => apiGet("/api/activity/notifications")
    });
  }, [queryClient]);
  const quickActions2 = [
    { label: "Add Lead", icon: Plus, to: "/sales", search: "?action=addLead" },
    { label: "Add SOP", icon: FileText, to: "/sop", search: "?action=addSOP" },
    { label: "Add New Team Member", icon: Users, to: "/team", search: "?action=addMember" },
    { label: "Calculate Incentive", icon: Calculator, to: "/incentives" }
  ];
  const handleFabAction = (action) => {
    setFabOpen(false);
    navigate(`${action.to}${action.search ?? ""}`);
  };
  return /* @__PURE__ */ jsx(AdminProvider, { children: /* @__PURE__ */ jsx(DateRangeProvider, { children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen w-full max-w-[100vw] overflow-x-clip", children: [
    /* @__PURE__ */ jsx(
      Sidebar,
      {
        open,
        onClose: () => setOpen(false),
        collapsed,
        onToggleCollapse: () => setCollapsed((c) => !c)
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 flex flex-col w-full max-w-full overflow-x-clip", children: [
      /* @__PURE__ */ jsx(Topbar, { onMenu: () => setOpen(true) }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 bg-white text-slate-900 p-3 sm:p-4 md:p-6 lg:p-8 xl:px-10 pb-28 lg:pb-8 page-shell overflow-x-clip relative", children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsx(MobileNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setFabOpen(!fabOpen),
            className: "lg:hidden fixed bottom-[4.25rem] right-3 sm:right-4 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full\n                       gradient-primary text-primary-foreground shadow-glow\n                       grid place-items-center hover:opacity-90 transition",
            children: /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6" })
          }
        ),
        fabOpen && /* @__PURE__ */ jsx(
          "div",
          {
            className: "lg:hidden fixed bottom-[7.5rem] sm:bottom-32 right-3 sm:right-4 z-40 w-52 sm:w-56\n                         glass-strong rounded-xl border border-border\n                         shadow-elegant p-1 space-y-0.5 animate-fade-in",
            children: quickActions2.map((action) => {
              const Icon = action.icon;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => handleFabAction(action),
                  className: "w-full flex items-center gap-2 px-2.5 py-2 rounded-lg\n                               text-xs text-foreground hover:bg-secondary/60 transition",
                  children: [
                    /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 text-primary shrink-0" }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: action.label })
                  ]
                },
                action.label
              );
            })
          }
        )
      ] })
    ] })
  ] }) }) });
}
const CURRENT_EMPLOYEE = {
  id: 101,
  name: "Amit Kumar",
  role: "Sales Manager",
  initials: "AK",
  email: "amit.kumar@techsales.in",
  phone: "+91 98765 43210",
  department: "Sales",
  joiningDate: "2024-03-15",
  avatarColor: "#2563eb",
  callsTarget: 60,
  callsDone: 34,
  responseTimeMin: 1.6,
  pickupRate: 69,
  qualificationRate: 76,
  objectionHandling: 85,
  conversionRate: 24,
  followUpQuality: 79,
  baseSalary: 45e3,
  incRate: 6,
  incentivePeriod: "June 2026",
  incentiveStats: {
    leadsConverted: 18,
    conversionsTarget: 25,
    callTargetPct: 88,
    revenueL: 24,
    revenueTargetL: 30,
    qualifiedLeads: 14,
    meetingsBooked: 6
  },
  incentiveTrends: {
    pickupRate: 4,
    conversionRate: 2,
    followUpQuality: 1,
    responseTimeMin: -0.2
  },
  payoutHistory: [
    { month: "May 2026", incentive: 38500, totalPay: 83500, status: "Paid" },
    { month: "April 2026", incentive: 35200, totalPay: 80200, status: "Paid" },
    { month: "March 2026", incentive: 31800, totalPay: 76800, status: "Paid" }
  ]
};
const EMP_LEADS = [
  { id: 1, name: "Rajesh Mehta", company: "Tech Corp India", status: "hot", stage: "Proposal Sent", source: "LinkedIn", budget: "₹8L", service: "AI Automation Suite", last: "2h ago", av: "RM", color: "#2563eb" },
  { id: 2, name: "Priya Sharma", company: "InfoSystems Ltd", status: "converted", stage: "Converted", source: "Referral", budget: "₹12L", service: "CRM Setup & Onboarding", last: "1d ago", av: "PS", color: "#10b981" },
  { id: 3, name: "Suresh Jain", company: "BuildNext Pvt", status: "warm", stage: "Attempted", source: "Facebook", budget: "₹3L", service: "Lead Gen Engine", last: "30m ago", av: "SJ", color: "#f59e0b" },
  { id: 4, name: "Kavitha Nair", company: "EduTech Hub", status: "warm", stage: "Call Booked", source: "Website", budget: "₹6L", service: "Strategic Consulting", last: "3h ago", av: "KN", color: "#7c3aed" },
  { id: 5, name: "Deepak Singh", company: "RetailMax", status: "cold", stage: "Attempted", source: "Cold Call", budget: "₹4L", service: "Custom Software Dev", last: "1d ago", av: "DS", color: "#64748b" },
  { id: 6, name: "Anjali Gupta", company: "MediCare Plus", status: "hot", stage: "Negotiation", source: "Exhibition", budget: "₹15L", service: "AI Automation Suite", last: "4h ago", av: "AG", color: "#dc2626" },
  { id: 7, name: "Meena Pillai", company: "FinServe India", status: "hot", stage: "Proposal Sent", source: "Referral", budget: "₹20L", service: "CRM Setup & Onboarding", last: "2d ago", av: "MP", color: "#dc2626" },
  { id: 8, name: "Arun Kumar", company: "LogiTrans", status: "warm", stage: "Call Booked", source: "Website", budget: "₹5L", service: "Lead Gen Engine", last: "6h ago", av: "AK2", color: "#0ea5e9" },
  { id: 9, name: "Sneha Verma", company: "FoodChain", status: "cold", stage: "Attempted", source: "Facebook", budget: "₹1L", service: "Strategic Consulting", last: "3d ago", av: "SV", color: "#94a3b8" },
  { id: 10, name: "Vikram Rao", company: "SmartHome Co", status: "notpick", stage: "Not Pick", source: "LinkedIn", budget: "₹2L", service: "Custom Software Dev", last: "5h ago", av: "VR", color: "#64748b" },
  { id: 11, name: "Ritu Arora", company: "MediaPlus", status: "ni", stage: "Closed", source: "Instagram", budget: "₹3L", service: "AI Automation Suite", last: "2d ago", av: "RA", color: "#7c3aed" },
  { id: 12, name: "Siddharth Roy", company: "DataPro Pvt", status: "ni", stage: "Closed", source: "Cold Call", budget: "₹2L", service: "CRM Setup & Onboarding", last: "4d ago", av: "SR", color: "#ec4899" }
];
const EMP_PIPELINE = [
  { label: "Not Pick", count: 28, pct: 100, color: "#94a3b8" },
  { label: "Attempted", count: 72, pct: 95, color: "#3b82f6" },
  { label: "Contacted", count: 58, pct: 78, color: "#7c3aed" },
  { label: "Booked", count: 44, pct: 59, color: "#0ea5e9" },
  { label: "Proposal", count: 32, pct: 43, color: "#f59e0b" },
  { label: "Negotiation", count: 18, pct: 24, color: "#f97316" },
  { label: "Converted", count: 24, pct: 32, color: "#10b981" }
];
const EMP_AGENDA = [
  { time: "9:30", title: "Call: Rajesh Mehta", sub: "Tech Corp — Budget follow-up", hot: true, done: false },
  { time: "11:00", title: "Meeting: Anjali Gupta", sub: "MediCare Plus — Demo", hot: true, done: false },
  { time: "14:00", title: "Follow Up: Deepak Singh", sub: "RetailMax — Budget check", hot: false, done: false },
  { time: "16:00", title: "Send Proposal to X", sub: "Meena Pillai — FinServe", hot: false, done: false },
  { time: "17:30", title: "Team Review", sub: "Pipeline check-in", hot: false, done: true }
];
const EMP_SOURCE_CHART = [
  { label: "Facebook Ads", pct: 35, color: "#3b82f6" },
  { label: "LinkedIn", pct: 22, color: "#7c3aed" },
  { label: "Cold Call", pct: 18, color: "#0ea5e9" },
  { label: "Referral", pct: 15, color: "#10b981" },
  { label: "Website", pct: 10, color: "#f59e0b" }
];
const EMP_ACTIVITY = [
  { bg: "#fef2f2", text: "Hot lead: Priya Sharma (InfoSystems) assigned", time: "2 mins ago", emoji: "🔥" },
  { bg: "#ecfdf5", text: "Lead converted: InfoSystems — ₹12L closed", time: "1 hour ago", emoji: "✅" },
  { bg: "#eff6ff", text: "Call connected: Anjali Gupta, 12m 34s", time: "3 hours ago", emoji: "📞" },
  { bg: "#fffbeb", text: "Lead circulated: Suresh Jain (5 attempts)", time: "4 hours ago", emoji: "🔄" },
  { bg: "#f5f3ff", text: "Proposal sent: Meena Pillai — FinServe", time: "Yesterday", emoji: "📄" }
];
const EMP_FOLLOWUPS = [
  { id: 1, name: "Meena Pillai", company: "FinServe India", type: "Call", urgency: "overdue", time: "Yesterday 5PM", av: "MP", color: "#dc2626", note: "Proposal follow-up — urgent" },
  { id: 2, name: "Suresh Jain", company: "BuildNext", type: "WhatsApp", urgency: "overdue", time: "Yesterday 3PM", av: "SJ", color: "#f59e0b", note: "Cold lead — not picking" },
  { id: 3, name: "Vikram Rao", company: "SmartHome", type: "Email", urgency: "overdue", time: "2d ago", av: "VR", color: "#94a3b8", note: "Proposal pending response" },
  { id: 4, name: "Rajesh Mehta", company: "Tech Corp", type: "Call", urgency: "today", time: "Today 2:00 PM", av: "RM", color: "#2563eb", note: "Budget discussion follow-up" },
  { id: 5, name: "Anjali Gupta", company: "MediCare Plus", type: "Call", urgency: "today", time: "Today 4:00 PM", av: "AG", color: "#dc2626", note: "Demo feedback discussion" },
  { id: 6, name: "Kavitha Nair", company: "EduTech Hub", type: "Meeting", urgency: "today", time: "Today 4:30 PM", av: "KN", color: "#7c3aed", note: "Confirm discovery booking" },
  { id: 7, name: "Deepak Singh", company: "RetailMax", type: "WhatsApp", urgency: "today", time: "Today 5:00 PM", av: "DS", color: "#64748b", note: "Budget approval check" },
  { id: 8, name: "Priya Sharma", company: "InfoSystems", type: "Call", urgency: "today", time: "Today 6:00 PM", av: "PS", color: "#10b981", note: "Contract sign-off" },
  { id: 9, name: "Arun Kumar", company: "LogiTrans", type: "WhatsApp", urgency: "upcoming", time: "Tomorrow 10AM", av: "AK2", color: "#0ea5e9", note: "Warm nurturing" },
  { id: 10, name: "Siddharth Roy", company: "DataPro", type: "Call", urgency: "upcoming", time: "Tomorrow 11AM", av: "SR", color: "#8b5cf6", note: "First contact" }
];
const EMP_CALLS = [
  { id: 101, leadId: "p6", name: "Meera Joshi", company: "Joshi Retail", duration: "22:15", type: "out", date: "Yesterday 4:20 PM", period: "week", outcome: "Discovery call completed", hasRec: true, rating: 5, mood: "positive", phone: "+91 98765 43210", note: "Client is extremely interested in the retail automation suite. Discussed integration with their existing ERP. Budget of ₹1.75L is approved. Next step: Schedule technical demo." },
  { id: 102, leadId: "p1", name: "Ananya Sharma", company: "Penguin India", duration: "10:45", type: "in", date: "2 days ago", period: "week", outcome: "Inbound inquiry check", hasRec: true, rating: 4, mood: "positive", phone: "+91 99112 23344", note: "Ananya requested custom catalog pricing for Q3 media rollout. She represents Penguin India. Pitch urgency is high. Sent initial pricing deck, waiting on selection." },
  { id: 103, leadId: "p11", name: "Sneha Iyer", company: "Iyer Tech Solutions", duration: "15:30", type: "out", date: "Yesterday 10:15 AM", period: "week", outcome: "Technical qualification", hasRec: true, rating: 4, mood: "neutral", phone: "+91 98112 34567", note: "Completed technical qualification with IT head Sneha. Confirmed their server compatibility. Budget of ₹2.8L confirmed for Q3. Next step: Prepare custom scope document." },
  { id: 104, leadId: "p19", name: "Amit Desai", company: "Desai Logistics", duration: "24:10", type: "out", date: "Today 3:30 PM", period: "today", outcome: "Negotiation meeting", hasRec: true, rating: 5, mood: "positive", phone: "+91 97765 43211", note: "Negotiated 8% discount on year-1 licensing fee. Amit agreed in principle. MSA contract drafted and sent to their legal team for review. Expected closure by next week." },
  { id: 1, leadId: 6, name: "Anjali Gupta", company: "MediCare Plus", duration: "12:34", type: "out", date: "Today 11:20 AM", period: "today", outcome: "Proposal discussed", hasRec: true, rating: 5, mood: "positive", phone: "+91 98102 33441", note: "Interested in enterprise tier. Send revised pricing today." },
  { id: 2, leadId: 1, name: "Rajesh Mehta", company: "Tech Corp India", duration: "8:15", type: "in", date: "Today 9:05 AM", period: "today", outcome: "Budget confirmed", hasRec: true, rating: 4, mood: "positive", phone: "+91 98200 11223", note: "Budget approved at ₹8L. Proposal review scheduled." },
  { id: 3, leadId: 3, name: "Suresh Jain", company: "BuildNext Pvt", duration: "—", type: "miss", date: "Today 8:30 AM", period: "today", outcome: "Not picked", hasRec: false, rating: 0, mood: "neutral", phone: "+91 98765 99887", note: "3rd attempt — try WhatsApp before next call." },
  { id: 4, leadId: 4, name: "Kavitha Nair", company: "EduTech Hub", duration: "18:42", type: "out", date: "Yesterday 3:45 PM", period: "week", outcome: "Demo scheduled", hasRec: true, rating: 5, mood: "positive", phone: "+91 99001 22334", note: "Demo booked for Friday. Sent calendar invite." },
  { id: 5, leadId: 5, name: "Deepak Singh", company: "RetailMax", duration: "4:10", type: "in", date: "Yesterday 2:15 PM", period: "week", outcome: "Pending approval", hasRec: false, rating: 3, mood: "neutral", phone: "+91 97654 32109", note: "Waiting on finance approval. Follow up Monday." },
  { id: 6, leadId: 7, name: "Meena Pillai", company: "FinServe India", duration: "15:08", type: "out", date: "Apr 28, 4:20 PM", period: "week", outcome: "Negotiation ongoing", hasRec: true, rating: 4, mood: "positive", phone: "+91 98450 66778", note: "CFO joined call. Needs ROI deck." },
  { id: 7, leadId: 10, name: "Vikram Rao", company: "SmartHome Co", duration: "—", type: "miss", date: "Apr 27, 10:15 AM", period: "week", outcome: "Not picked", hasRec: false, rating: 0, mood: "neutral", phone: "+91 98111 44556", note: "Voicemail left. Retry after 2 hours." },
  { id: 8, leadId: 2, name: "Priya Sharma", company: "InfoSystems Ltd", duration: "22:30", type: "out", date: "Apr 25, 3:00 PM", period: "month", outcome: "Deal closed", hasRec: true, rating: 5, mood: "positive", phone: "+91 98334 55667", note: "Contract signed — ₹12L. Onboarding kickoff next week." },
  { id: 9, leadId: 8, name: "Arun Kumar", company: "LogiTrans", duration: "6:45", type: "out", date: "Apr 22, 11:30 AM", period: "month", outcome: "Qualified lead", hasRec: true, rating: 4, mood: "positive", phone: "+91 98987 11223", note: "BANT qualified. Moving to proposal stage." },
  { id: 10, leadId: 9, name: "Sneha Verma", company: "FoodChain", duration: "2:18", type: "out", date: "Apr 18, 5:45 PM", period: "month", outcome: "Not interested", hasRec: false, rating: 2, mood: "negative", phone: "+91 98760 55443", note: "Budget too low for our package. Mark as NI." },
  { id: 11, leadId: 1, name: "Rajesh Mehta", company: "Tech Corp India", duration: "11:02", type: "out", date: "Apr 15, 2:10 PM", period: "month", outcome: "Discovery complete", hasRec: true, rating: 4, mood: "positive", phone: "+91 98200 11223", note: "Pain points documented. Demo requested." },
  { id: 12, leadId: 6, name: "Anjali Gupta", company: "MediCare Plus", duration: "9:33", type: "in", date: "Apr 12, 10:00 AM", period: "month", outcome: "Requirements gathered", hasRec: true, rating: 5, mood: "positive", phone: "+91 98102 33441", note: "Healthcare compliance requirements noted." },
  { id: 13, leadId: 4, name: "Kavitha Nair", company: "EduTech Hub", duration: "5:22", type: "out", date: "Today 1:10 PM", period: "today", outcome: "Follow-up confirmed", hasRec: true, rating: 4, mood: "positive", phone: "+91 99001 22334", note: "Confirmed demo slot. Will share case studies before call." },
  { id: 14, leadId: 5, name: "Deepak Singh", company: "RetailMax", duration: "—", type: "miss", date: "Today 12:45 PM", period: "today", outcome: "Not picked", hasRec: false, rating: 0, mood: "neutral", phone: "+91 97654 32109", note: "Line busy. Retry at 4 PM." },
  { id: 15, leadId: 8, name: "Arun Kumar", company: "LogiTrans", duration: "7:48", type: "out", date: "Today 10:30 AM", period: "today", outcome: "Pricing shared", hasRec: true, rating: 4, mood: "positive", phone: "+91 98987 11223", note: "Sent tier-2 pricing on WhatsApp during call." },
  { id: 16, leadId: 7, name: "Meena Pillai", company: "FinServe India", duration: "3:55", type: "in", date: "Today 8:15 AM", period: "today", outcome: "Quick check-in", hasRec: false, rating: 4, mood: "positive", phone: "+91 98450 66778", note: "CFO reviewing ROI deck. Callback tomorrow." },
  { id: 17, leadId: 10, name: "Vikram Rao", company: "SmartHome Co", duration: "14:20", type: "out", date: "Today 7:50 AM", period: "today", outcome: "Connected — warm", hasRec: true, rating: 3, mood: "positive", phone: "+91 98111 44556", note: "Interested in smart home bundle. Send brochure." },
  { id: 18, leadId: 12, name: "Siddharth Roy", company: "DataPro Pvt", duration: "6:12", type: "out", date: "Today 6:30 AM", period: "today", outcome: "First contact", hasRec: true, rating: 3, mood: "neutral", phone: "+91 98190 77889", note: "Cold intro done. Asked to call back Thursday." },
  { id: 19, leadId: 11, name: "Ritu Arora", company: "MediaPlus", duration: "—", type: "miss", date: "Today 5:45 PM", period: "today", outcome: "Not picked", hasRec: false, rating: 0, mood: "neutral", phone: "+91 98234 66771", note: "Gatekeeper blocked. Try direct mobile." },
  { id: 20, leadId: 2, name: "Priya Sharma", company: "InfoSystems Ltd", duration: "4:05", type: "in", date: "Today 3:20 PM", period: "today", outcome: "Onboarding check", hasRec: true, rating: 5, mood: "positive", phone: "+91 98334 55667", note: "Post-sale check-in. Client happy with rollout." },
  { id: 21, leadId: 9, name: "Sneha Verma", company: "FoodChain", duration: "—", type: "miss", date: "Today 2:00 PM", period: "today", outcome: "Not picked", hasRec: false, rating: 0, mood: "neutral", phone: "+91 98760 55443", note: "Second attempt today. No answer." },
  { id: 22, leadId: 1, name: "Rajesh Mehta", company: "Tech Corp India", duration: "16:44", type: "out", date: "Today 4:50 PM", period: "today", outcome: "Proposal walkthrough", hasRec: true, rating: 5, mood: "positive", phone: "+91 98200 11223", note: "Walked through line items. Legal review next." },
  { id: 23, leadId: 3, name: "Suresh Jain", company: "BuildNext Pvt", duration: "1:48", type: "out", date: "Yesterday 6:10 PM", period: "week", outcome: "Brief connect", hasRec: false, rating: 2, mood: "neutral", phone: "+91 98765 99887", note: "Picked up briefly. Asked to call morning." },
  { id: 24, leadId: 6, name: "Anjali Gupta", company: "MediCare Plus", duration: "21:05", type: "out", date: "Yesterday 11:00 AM", period: "week", outcome: "Demo prep call", hasRec: true, rating: 5, mood: "positive", phone: "+91 98102 33441", note: "Aligned on demo agenda and attendees." },
  { id: 25, leadId: 8, name: "Arun Kumar", company: "LogiTrans", duration: "—", type: "miss", date: "Yesterday 9:30 AM", period: "week", outcome: "Not picked", hasRec: false, rating: 0, mood: "neutral", phone: "+91 98987 11223", note: "Traveling — requested callback Friday." },
  { id: 26, leadId: 12, name: "Siddharth Roy", company: "DataPro Pvt", duration: "—", type: "miss", date: "Apr 29, 2:20 PM", period: "week", outcome: "Not picked", hasRec: false, rating: 0, mood: "neutral", phone: "+91 98190 77889", note: "No answer. Left WhatsApp voice note." },
  { id: 27, leadId: 11, name: "Ritu Arora", company: "MediaPlus", duration: "9:18", type: "in", date: "Apr 29, 11:45 AM", period: "week", outcome: "Re-engaged", hasRec: true, rating: 3, mood: "positive", phone: "+91 98234 66771", note: "Previously closed — open to Q3 budget discussion." },
  { id: 28, leadId: 5, name: "Deepak Singh", company: "RetailMax", duration: "12:02", type: "out", date: "Apr 28, 10:30 AM", period: "week", outcome: "Finance follow-up", hasRec: true, rating: 4, mood: "positive", phone: "+91 97654 32109", note: "Finance team needs one more week for sign-off." },
  { id: 29, leadId: 4, name: "Kavitha Nair", company: "EduTech Hub", duration: "3:30", type: "in", date: "Apr 28, 9:00 AM", period: "week", outcome: "Logistics query", hasRec: false, rating: 4, mood: "positive", phone: "+91 99001 22334", note: "Asked about LMS integration timeline." },
  { id: 30, leadId: 7, name: "Meena Pillai", company: "FinServe India", duration: "—", type: "miss", date: "Apr 27, 5:00 PM", period: "week", outcome: "Not picked", hasRec: false, rating: 0, mood: "neutral", phone: "+91 98450 66778", note: "In meeting. Assistant took message." },
  { id: 31, leadId: 10, name: "Vikram Rao", company: "SmartHome Co", duration: "8:55", type: "out", date: "Apr 27, 1:30 PM", period: "week", outcome: "Needs comparison", hasRec: true, rating: 3, mood: "neutral", phone: "+91 98111 44556", note: "Comparing with two competitors. Send feature matrix." },
  { id: 32, leadId: 3, name: "Suresh Jain", company: "BuildNext Pvt", duration: "5:40", type: "out", date: "Apr 26, 4:15 PM", period: "week", outcome: "Objection raised", hasRec: true, rating: 2, mood: "negative", phone: "+91 98765 99887", note: "Price objection. Offered starter plan." },
  { id: 33, leadId: 1, name: "Rajesh Mehta", company: "Tech Corp India", duration: "7:22", type: "in", date: "Apr 26, 11:20 AM", period: "week", outcome: "Technical questions", hasRec: true, rating: 4, mood: "positive", phone: "+91 98200 11223", note: "IT head joined. API docs requested." },
  { id: 34, leadId: 9, name: "Sneha Verma", company: "FoodChain", duration: "3:08", type: "out", date: "Apr 20, 3:40 PM", period: "month", outcome: "Final attempt", hasRec: false, rating: 1, mood: "negative", phone: "+91 98760 55443", note: "Confirmed not moving forward this quarter." },
  { id: 35, leadId: 11, name: "Ritu Arora", company: "MediaPlus", duration: "2:45", type: "out", date: "Apr 19, 12:10 PM", period: "month", outcome: "Not interested", hasRec: false, rating: 1, mood: "negative", phone: "+91 98234 66771", note: "Budget frozen. Revisit in Q3." },
  { id: 36, leadId: 12, name: "Siddharth Roy", company: "DataPro Pvt", duration: "10:15", type: "out", date: "Apr 17, 9:50 AM", period: "month", outcome: "Discovery started", hasRec: true, rating: 4, mood: "positive", phone: "+91 98190 77889", note: "Pain points around reporting. Good fit." },
  { id: 37, leadId: 8, name: "Arun Kumar", company: "LogiTrans", duration: "13:28", type: "out", date: "Apr 16, 4:30 PM", period: "month", outcome: "Proposal review", hasRec: true, rating: 4, mood: "positive", phone: "+91 98987 11223", note: "Reviewed proposal scope. Minor edits needed." },
  { id: 38, leadId: 5, name: "Deepak Singh", company: "RetailMax", duration: "6:50", type: "out", date: "Apr 14, 2:00 PM", period: "month", outcome: "Stakeholder intro", hasRec: true, rating: 4, mood: "positive", phone: "+91 97654 32109", note: "Introduced to procurement head." },
  { id: 39, leadId: 4, name: "Kavitha Nair", company: "EduTech Hub", duration: "—", type: "miss", date: "Apr 13, 10:45 AM", period: "month", outcome: "Not picked", hasRec: false, rating: 0, mood: "neutral", phone: "+91 99001 22334", note: "First outreach attempt. No answer." },
  { id: 40, leadId: 10, name: "Vikram Rao", company: "SmartHome Co", duration: "—", type: "miss", date: "Apr 10, 3:15 PM", period: "month", outcome: "Not picked", hasRec: false, rating: 0, mood: "neutral", phone: "+91 98111 44556", note: "Wrong number on first record. Updated CRM." },
  { id: 41, leadId: 7, name: "Meena Pillai", company: "FinServe India", duration: "19:40", type: "out", date: "Apr 9, 11:00 AM", period: "month", outcome: "Initial pitch", hasRec: true, rating: 5, mood: "positive", phone: "+91 98450 66778", note: "Strong interest in analytics module." },
  { id: 42, leadId: 3, name: "Suresh Jain", company: "BuildNext Pvt", duration: "—", type: "miss", date: "Apr 8, 5:30 PM", period: "month", outcome: "Not picked", hasRec: false, rating: 0, mood: "neutral", phone: "+91 98765 99887", note: "First cold call attempt." },
  { id: 43, leadId: 6, name: "Anjali Gupta", company: "MediCare Plus", duration: "5:15", type: "out", date: "Apr 7, 2:45 PM", period: "month", outcome: "Intro call", hasRec: true, rating: 4, mood: "positive", phone: "+91 98102 33441", note: "Met at exhibition. Warm lead follow-up." },
  { id: 44, leadId: 2, name: "Priya Sharma", company: "InfoSystems Ltd", duration: "17:55", type: "out", date: "Apr 5, 3:30 PM", period: "month", outcome: "Negotiation", hasRec: true, rating: 5, mood: "positive", phone: "+91 98334 55667", note: "Final pricing agreed. Legal next step." },
  { id: 45, leadId: 1, name: "Rajesh Mehta", company: "Tech Corp India", duration: "—", type: "miss", date: "Apr 3, 9:00 AM", period: "month", outcome: "Not picked", hasRec: false, rating: 0, mood: "neutral", phone: "+91 98200 11223", note: "Initial outreach — no answer." }
];
const EMP_CALL_STATS = {
  today: { dials: 42, connected: 28, missed: 14, callbacks: 6, pickupRate: 67, quality: 80, missRate: 33, avgDuration: "7.8m", hotLeads: 5, totalTalk: "5h 48m" },
  week: { dials: 196, connected: 134, missed: 62, callbacks: 22, pickupRate: 68, quality: 75, missRate: 32, avgDuration: "8.0m", hotLeads: 14, totalTalk: "21h 10m" },
  month: { dials: 358, connected: 248, missed: 110, callbacks: 44, pickupRate: 69, quality: 76, missRate: 31, avgDuration: "8.3m", hotLeads: 20, totalTalk: "48h 30m" }
};
const EMP_LEAD_CALL_ACTIVITY = {
  1: [
    { type: "call", text: "Inbound call — budget confirmed (8m 15s)", time: "Today 9:05 AM" },
    { type: "call", text: "Outbound discovery call (11m 02s)", time: "Apr 15, 2:10 PM" },
    { type: "email", text: "Proposal v2 sent", time: "Apr 14, 6:00 PM" },
    { type: "note", text: "Stage moved to Proposal Sent", time: "Apr 14, 5:45 PM" }
  ],
  2: [
    { type: "call", text: "Closing call — deal signed (22m 30s)", time: "Apr 25, 3:00 PM" },
    { type: "email", text: "Contract & invoice sent", time: "Apr 24, 11:00 AM" },
    { type: "meeting", text: "Final review with legal", time: "Apr 23, 4:00 PM" }
  ],
  3: [
    { type: "call", text: "Missed call — not picked", time: "Today 8:30 AM" },
    { type: "call", text: "Missed call — attempt 2", time: "Yesterday 4:15 PM" },
    { type: "whatsapp", text: "Intro message sent", time: "Yesterday 4:20 PM" }
  ],
  4: [
    { type: "call", text: "Outbound call — demo scheduled (18m 42s)", time: "Yesterday 3:45 PM" },
    { type: "email", text: "Calendar invite sent", time: "Yesterday 4:00 PM" }
  ],
  5: [
    { type: "call", text: "Inbound — pending approval (4m 10s)", time: "Yesterday 2:15 PM" },
    { type: "note", text: "Follow-up set for Monday", time: "Yesterday 2:20 PM" }
  ],
  6: [
    { type: "call", text: "Outbound — proposal discussed (12m 34s)", time: "Today 11:20 AM" },
    { type: "call", text: "Requirements call (9m 33s)", time: "Apr 12, 10:00 AM" },
    { type: "email", text: "Demo recording shared", time: "Apr 11, 3:30 PM" }
  ],
  7: [
    { type: "call", text: "Negotiation call with CFO (15m 08s)", time: "Apr 28, 4:20 PM" },
    { type: "email", text: "ROI deck sent", time: "Apr 28, 5:00 PM" },
    { type: "proposal", text: "Proposal v3 updated", time: "Apr 27, 2:00 PM" }
  ],
  8: [
    { type: "call", text: "Qualified — BANT complete (6m 45s)", time: "Apr 22, 11:30 AM" },
    { type: "note", text: "Moved to Proposal stage", time: "Apr 22, 11:45 AM" }
  ],
  9: [
    { type: "call", text: "Outbound — not interested (2m 18s)", time: "Apr 18, 5:45 PM" },
    { type: "note", text: "Marked as Not Interested", time: "Apr 18, 5:50 PM" }
  ],
  10: [
    { type: "call", text: "Missed call — voicemail left", time: "Apr 27, 10:15 AM" },
    { type: "call", text: "Missed call — attempt 1", time: "Apr 26, 3:00 PM" },
    { type: "call", text: "Outbound — warm connect (14m 20s)", time: "Today 7:50 AM" },
    { type: "call", text: "Competitor comparison call (8m 55s)", time: "Apr 27, 1:30 PM" },
    { type: "email", text: "Feature matrix sent", time: "Apr 27, 2:15 PM" }
  ],
  11: [
    { type: "call", text: "Missed call — gatekeeper", time: "Today 5:45 PM" },
    { type: "call", text: "Inbound — re-engaged (9m 18s)", time: "Apr 29, 11:45 AM" },
    { type: "call", text: "Outbound — not interested (2m 45s)", time: "Apr 19, 12:10 PM" },
    { type: "note", text: "Marked for Q3 re-engagement", time: "Apr 19, 12:15 PM" }
  ],
  12: [
    { type: "call", text: "First contact — cold call (6m 12s)", time: "Today 6:30 AM" },
    { type: "call", text: "Missed call — no answer", time: "Apr 29, 2:20 PM" },
    { type: "call", text: "Discovery call (10m 15s)", time: "Apr 17, 9:50 AM" },
    { type: "whatsapp", text: "Voice note sent after miss", time: "Apr 29, 2:25 PM" }
  ]
};
const EMP_ASSETS = [
  { id: 1, name: "Enterprise CRM Brochure", cat: "brochure", icon: "📄", size: "2.4 MB", date: "Today", tag: "PDF" },
  { id: 2, name: "Zee News Podcast Brochure", cat: "brochure", icon: "📄", size: "1.9 MB", date: "Apr 8", tag: "PDF" },
  { id: 3, name: "Healthcare Case Study", cat: "case", icon: "📊", size: "4.1 MB", date: "Apr 20", tag: "PDF" },
  { id: 4, name: "SaaS Case Study", cat: "case", icon: "📊", size: "2.8 MB", date: "Apr 15", tag: "PDF" },
  { id: 5, name: "Price List 2026", cat: "price", icon: "💰", size: "180 KB", date: "Yesterday", tag: "Excel" },
  { id: 6, name: "Proposal Template — Enterprise", cat: "proposal", icon: "📋", size: "320 KB", date: "Today", tag: "DOCX" },
  { id: 7, name: "WhatsApp Message Templates", cat: "template", icon: "📝", size: "560 KB", date: "Today", tag: "PDF" },
  { id: 8, name: "Sales Training — BANT Module", cat: "training", icon: "🎓", size: "8.2 MB", date: "Apr 15", tag: "PPT" }
];
const EMP_MEETINGS_UPCOMING = [
  { id: 1, title: "Discovery Call — Rajesh Mehta", time: "Today, 2:00 PM", date: "2026-04-30", platform: "Zoom", lead: "Rajesh Mehta", company: "Tech Corp India", color: "#2563eb", meetLink: "https://zoom.us/j/1234567890" },
  { id: 2, title: "Product Demo — Anjali Gupta", time: "Today, 4:00 PM", date: "2026-04-30", platform: "Google Meet", lead: "Anjali Gupta", company: "MediCare Plus", color: "#dc2626", meetLink: "https://meet.google.com/abc-defg-hij" },
  { id: 3, title: "Follow-up — Kavitha Nair", time: "Tomorrow, 10:30 AM", date: "2026-05-01", platform: "Teams", lead: "Kavitha Nair", company: "EduTech Hub", color: "#7c3aed", meetLink: "https://teams.microsoft.com/l/meetup-join/example" },
  { id: 6, title: "Budget Review — Meena Pillai", time: "Tomorrow, 2:00 PM", date: "2026-05-01", platform: "Google Meet", lead: "Meena Pillai", company: "FinServe India", color: "#dc2626", meetLink: "https://meet.google.com/xyz-abcd-efg" }
];
const EMP_MEETINGS_HISTORY = [
  { id: 4, title: "Proposal Review — Meena Pillai", time: "Apr 28, 3:00 PM", outcome: "Proposal sent", platform: "Google Meet", color: "#10b981" },
  { id: 5, title: "Intro Call — Deepak Singh", time: "Apr 27, 11:00 AM", outcome: "Qualified", platform: "Zoom", color: "#3b82f6" }
];
const MEETING_PLATFORMS = [
  { id: "google_meet", label: "Google Meet", icon: "meet", placeholder: "https://meet.google.com/xxx-xxxx-xxx", canGenerate: true },
  { id: "zoom", label: "Zoom Meeting", icon: "zoom", placeholder: "https://zoom.us/j/...", canGenerate: false },
  { id: "teams", label: "Microsoft Teams", icon: "teams", placeholder: "https://teams.microsoft.com/l/meetup-join/...", canGenerate: false }
];
function generateGoogleMeetLink() {
  const part = () => Math.random().toString(36).slice(2, 6);
  return `https://meet.google.com/${part()}-${part()}-${part()}`;
}
const EMP_TEAM_CALL = [
  { name: "Priya Singh", av: "PS", color: "#dc2626", calls: 142, score: 94 },
  { name: "Amit Kumar", av: "AK", color: "#2563eb", calls: 98, score: 88 },
  { name: "Rohan Verma", av: "RV", color: "#7c3aed", calls: 115, score: 79 },
  { name: "Neha Patel", av: "NP", color: "#10b981", calls: 89, score: 72 }
];
const EMP_KANBAN_STAGES = [
  { id: "not_pick", label: "Not Pick", color: "#94a3b8", badgeTone: "muted" },
  { id: "attempted", label: "Attempted", color: "#3b82f6", badgeTone: "info" },
  { id: "contacted", label: "Contacted", color: "#7c3aed", badgeTone: "primary" },
  { id: "booked", label: "Booked", color: "#0ea5e9", badgeTone: "info" },
  { id: "proposal", label: "Proposal", color: "#f59e0b", badgeTone: "warning" },
  { id: "negotiation", label: "Negotiation", color: "#f97316", badgeTone: "warning" },
  { id: "converted", label: "Converted", color: "#10b981", badgeTone: "success" }
];
function parseEmpBudget(budget) {
  if (!budget || budget === "—") return 0;
  const s = String(budget).replace(/[₹,\s]/g, "");
  const m = s.match(/^([\d.]+)(L|Cr|K)?$/i);
  if (!m) return 0;
  const n = parseFloat(m[1]);
  const u = (m[2] || "").toUpperCase();
  if (u === "CR") return n * 1e7;
  if (u === "L") return n * 1e5;
  if (u === "K") return n * 1e3;
  return n;
}
function formatEmpPipelineValue(n) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(1)}Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(0)}L`;
  if (n >= 1e3) return `₹${(n / 1e3).toFixed(0)}K`;
  return `₹${n}`;
}
function getEmpPipelineSummary(leads) {
  const total = leads.length;
  const hot = leads.filter((l) => l.status === "hot").length;
  const active = leads.filter((l) => !["converted", "ni"].includes(l.status)).length;
  const value = leads.reduce((sum, l) => sum + parseEmpBudget(l.budget), 0);
  const converted = leads.filter((l) => l.status === "converted").length;
  const winRate = total ? Math.round(converted / total * 100) : 0;
  return { total, hot, active, value, winRate };
}
function getEmpStageMeta(stageId) {
  return EMP_KANBAN_STAGES.find((s) => s.id === stageId) || EMP_KANBAN_STAGES[1];
}
const DRAWER_WARMTH_TO_STATUS = { "Hot Lead": "hot", "Warm Lead": "warm", "Cold Lead": "cold" };
const DRAWER_STAGE_TO_EMP = {
  "New Lead": "Attempted",
  Contacted: "Contacted",
  Qualified: "Contacted",
  "Proposal Sent": "Proposal Sent",
  Negotiation: "Negotiation",
  Converted: "Converted"
};
function empLeadFromDrawerPayload(raw, avatarColors) {
  const colors = avatarColors || ["#2563eb", "#10b981", "#f59e0b", "#7c3aed", "#dc2626", "#0ea5e9", "#64748b"];
  const id = Date.now();
  const name = (raw.lead_name || raw.name || "").trim() || "New Lead";
  const av = name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const revenue = Number(raw.expected_revenue ?? 0);
  return {
    id,
    name,
    company: raw.company_name || raw.company || "—",
    status: DRAWER_WARMTH_TO_STATUS[raw.temperature] || "warm",
    stage: DRAWER_STAGE_TO_EMP[raw.pipeline_stage] || raw.pipeline_stage || "Attempted",
    source: raw.source || "Website",
    budget: revenue > 0 ? formatEmpPipelineValue(revenue) : "—",
    service: raw.service || raw.interested_service || "—",
    last: "Just now",
    av,
    color: colors[id % colors.length],
    phone: raw.phone || "",
    email: raw.email || "",
    city: raw.city || "",
    state: raw.state || ""
  };
}
function mapEmpLeadKanbanStage(stage, status) {
  const s = (stage || "").toLowerCase();
  if (status === "notpick" || s.includes("not pick")) return "not_pick";
  if (status === "converted" || s.includes("converted")) return "converted";
  if (s.includes("negotiation")) return "negotiation";
  if (s.includes("proposal")) return "proposal";
  if (s.includes("booked") || s.includes("call booked")) return "booked";
  if (s.includes("contacted") || s.includes("qualified")) return "contacted";
  if (s.includes("attempted")) return "attempted";
  return "attempted";
}
function groupEmpLeadsKanban(leads) {
  const map = Object.fromEntries(EMP_KANBAN_STAGES.map((s) => [s.id, []]));
  leads.forEach((l) => {
    const id = mapEmpLeadKanbanStage(l.stage, l.status);
    if (map[id]) map[id].push(l);
  });
  return map;
}
const EMP_SOP_SCRIPTS = [
  { title: "Opening Call Script", body: "Hi [Name], I'm [Your Name] from TechSales. I'm calling about [Product] which helps companies like yours achieve [benefit]. Do you have 2 minutes?", use: "First contact with any new lead" },
  { title: "Handling Hesitation", body: "I totally understand. What if I shared one quick success story from a business like yours? It'll take 90 seconds and you can decide from there.", use: "When lead is hesitant to continue" },
  { title: "Closing / Payment", body: "I'll send the secure payment link on WhatsApp right now. It's a 2-minute process and I'll stay on the call to guide you.", use: "Ready-to-buy leads, end of call" }
];
const EMP_SOP_CROSS = [
  { product: "Enterprise CRM", icon: "🖥", categories: "SaaS · IT · Finance", crossTo: "Sales Training Bundle", success: 58, deals: 14 },
  { product: "Zee News Podcast", icon: "🎙", categories: "Media · Branding", crossTo: "Branding Package", success: 42, deals: 8 },
  { product: "Sales Training", icon: "🎓", categories: "Startup · Agency", crossTo: "CRM + Branding Bundle", success: 35, deals: 6 }
];
const EMP_SOP_CHECKLIST = {
  morning: ["Review Today's Agenda (Meetings, Follow-ups, Hot Leads)", "Message all cold leads from yesterday", "Call all Hot Leads before 11:00 AM", "Review CRM for overnight lead assignments"],
  evening: ["Log all call outcomes in CRM", "Update lead stages after each interaction", "Send proposals to qualified leads", "Submit daily performance report by 6 PM"]
};
const EMP_SOP_DOCS = [
  { id: 1, title: "How to Start Talking to Leads", sub: "Intro script · First 30 sec", sections: [
    { title: "Opening Script", items: ["Greet warmly using first name", "Introduce yourself and company", "State reason for calling in 1 sentence", 'Ask permission: "Do you have 2 minutes?"'] },
    { title: "Key Tips", items: ["Keep tone confident and friendly", "Avoid reading script — sound natural", "Listen more in first 30 seconds"] }
  ] },
  { id: 2, title: "BANT Qualification Framework", sub: "Budget · Authority · Need · Timeline", sections: [
    { title: "Budget", items: ['Ask: "Do you have a rough budget in mind?"', "Note the budget range in CRM"] },
    { title: "Authority & Timeline", items: ["Confirm decision-maker on call", 'Ask: "When are you looking to implement?"'] }
  ] },
  { id: 3, title: "How to Send Proposal Email", sub: "Template · Product-wise format", sections: [
    { title: "Template Steps", items: ["Open proposal_template.docx from Assets", "Fill: client name, company, product, budget", "Attach as PDF"] }
  ] },
  { id: 4, title: "Lead Not Interested → Escalate", sub: "Talk to Senior · Rebuttal SOP", sections: [
    { title: "Before Escalating", items: ["Try rebuttal script #2", 'Ask: "What would make this a better fit?"', "Note specific objection in CRM"] }
  ] },
  { id: 5, title: "Lead Converted → Handoff", sub: "Talk to Founder · Onboarding", sections: [
    { title: "Handoff Checklist", items: ["Notify founder via WhatsApp group", "Share summary: name, company, deal size", "Create onboarding task in CRM"] }
  ] }
];
const EMP_TEAM = [
  { name: "Priya Singh", av: "PS", color: "#dc2626" },
  { name: "Amit Kumar", av: "AK", color: "#2563eb" },
  { name: "Rohan Verma", av: "RV", color: "#7c3aed" },
  { name: "Neha Patel", av: "NP", color: "#10b981" }
];
const LEAD_STATUS_LABELS = {
  hot: "Hot",
  warm: "Warm",
  cold: "Cold",
  converted: "Converted",
  notpick: "Not Pick",
  ni: "Not Interested"
};
const EMP_LEAD_TEMPERATURES = [
  { id: "hot", label: "Hot" },
  { id: "warm", label: "Warm" },
  { id: "cold", label: "Cold" }
];
const EMP_APP_TODAY = "2026-04-30";
function getFollowUpUrgency(dateStr) {
  const d = /* @__PURE__ */ new Date(`${dateStr}T00:00:00`);
  const today = /* @__PURE__ */ new Date(`${EMP_APP_TODAY}T00:00:00`);
  if (d < today) return "overdue";
  if (d.getTime() === today.getTime()) return "today";
  return "upcoming";
}
function formatFollowUpSchedule(dateStr, timeStr) {
  const d = /* @__PURE__ */ new Date(`${dateStr}T00:00:00`);
  const today = /* @__PURE__ */ new Date(`${EMP_APP_TODAY}T00:00:00`);
  const urgency = getFollowUpUrgency(dateStr);
  const [h, m] = (timeStr || "09:00").split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 || 12;
  const timeLabel = `${hr}:${String(m).padStart(2, "0")} ${ampm}`;
  if (urgency === "overdue") {
    const diffDays2 = Math.round((today - d) / 864e5);
    if (diffDays2 === 1) return `Yesterday ${timeLabel}`;
    return `${diffDays2}d ago`;
  }
  if (urgency === "today") return `Today ${timeLabel}`;
  const diffDays = Math.round((d - today) / 864e5);
  if (diffDays === 1) return `Tomorrow ${timeLabel}`;
  return `${d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} ${timeLabel}`;
}
function buildFollowUpTaskName({ type, name, note }) {
  const base = `${type} follow-up: ${name}`;
  return note?.trim() ? `${base} — ${note.trim()}` : base;
}
function followUpPriority(urgency) {
  return urgency === "overdue" || urgency === "today" ? "high" : "med";
}
function isTaskAssignedToEmployee(task, employeeName) {
  if (!task?.assignee || !employeeName) return true;
  const assignee = String(task.assignee).trim().toLowerCase();
  const employee = String(employeeName).trim().toLowerCase();
  if (assignee === employee) return true;
  const empFirst = employee.split(/\s+/)[0];
  const asnFirst = assignee.split(/\s+/)[0];
  return empFirst.length > 0 && empFirst === asnFirst;
}
function formatTaskDeadlineTime(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  if (Number.isNaN(h)) return timeStr;
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 || 12;
  return `${hr}:${String(m || 0).padStart(2, "0")} ${ampm}`;
}
function findEmpTeamMember(name) {
  if (!name) return null;
  return EMP_TEAM.find((m) => m.name === name) || EMP_TEAM.find((m) => m.name.split(" ")[0] === String(name).split(" ")[0]);
}
function normalizeTasksMap(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return createInitialTasks();
  }
  const normalized = {};
  Object.entries(value).forEach(([date, items2]) => {
    if (Array.isArray(items2)) {
      normalized[date] = items2.filter((item) => item && typeof item === "object");
    }
  });
  return Object.keys(normalized).length ? normalized : createInitialTasks();
}
function createInitialTasks() {
  return {
    "2026-04-30": [
      { id: 1, name: "Call Rajesh Mehta — discuss budget approval", done: false, priority: "high", assignee: "Amit K.", assigneeAv: "AK", assigneeColor: "#2563eb" },
      { id: 2, name: "Send proposal to Anjali Gupta (MediCare)", done: true, priority: "high", assignee: "Priya S.", assigneeAv: "PS", assigneeColor: "#dc2626" },
      { id: 3, name: "Follow up Kavitha Nair — demo feedback", done: false, priority: "med", assignee: "Neha P.", assigneeAv: "NP", assigneeColor: "#10b981" },
      { id: 4, name: "Update CRM for all leads contacted today", done: false, priority: "low", assignee: "Amit K.", assigneeAv: "AK", assigneeColor: "#2563eb" },
      { id: 5, name: "Weekly performance report for team review", done: false, priority: "med", assignee: "Amit K.", assigneeAv: "AK", assigneeColor: "#2563eb" }
    ],
    "2026-04-29": [
      { id: 6, name: "Meeting with Meena Pillai — contract", done: true, priority: "high", assignee: "Amit K.", assigneeAv: "AK", assigneeColor: "#2563eb" },
      { id: 7, name: "WhatsApp to cold leads batch", done: true, priority: "low", assignee: "Rohan V.", assigneeAv: "RV", assigneeColor: "#7c3aed" }
    ],
    "2026-05-01": [
      { id: 9, name: "Team standup at 9:30 AM", done: false, priority: "high", assignee: "Amit K.", assigneeAv: "AK", assigneeColor: "#2563eb" },
      { id: 10, name: "Demo for Suresh Jain", done: false, priority: "high", assignee: "Priya S.", assigneeAv: "PS", assigneeColor: "#dc2626" }
    ]
  };
}
const LOCAL_SOPS = [
  {
    id: 1,
    title: "Intro & Cold Outreach",
    sub: "First contact & permission script",
    category: "SaaS",
    budgetRange: "₹2L - ₹8L",
    duration: "2-3 mins",
    icon: "📞",
    steps: [
      {
        id: "opening",
        label: "Opening",
        questions: [
          { id: "q1", text: "Greet lead warmly using their first name?", type: "check" },
          { id: "q2", text: "Introduce yourself and TechSales?", type: "check" },
          { id: "q3", text: "State reason for calling clearly in 1 sentence?", type: "check" },
          { id: "q4", text: "Ask permission: 'Do you have 2 minutes'?", type: "check" }
        ],
        discovery: [
          { key: "current_system", label: "Lead's Current System", placeholder: "e.g., Excel, competitor CRM..." },
          { key: "pain_point", label: "Primary Pain Point", placeholder: "e.g., Lead leakage, manual follow-ups..." }
        ],
        checklist: [
          "Acknowledge lead's response positively",
          "Ensure no background noise",
          "Speak at a calm, natural pace"
        ],
        scripts: {
          opening: "Hi {leadName}, I'm {repName} from TechSales. I noticed you requested information on our sales automation tools, and I wanted to share a 2-minute overview on how we help similar businesses increase conversions. Do you have 2 minutes?",
          talkingPoints: [
            "Keep the intro under 30 seconds",
            "Be energetic but professional",
            "Pause and let the lead speak"
          ],
          tips: "If they say they are busy, ask: 'No problem, would today at 4:00 PM or tomorrow at 11:00 AM work better for a quick chat?'"
        }
      },
      {
        id: "discovery",
        label: "Discovery",
        questions: [
          { id: "q5", text: "Ask about their current sales process?", type: "check" },
          { id: "q6", text: "Identify their sales team size?", type: "check" },
          { id: "q7", text: "Find out where their leads are coming from?", type: "check" }
        ],
        discovery: [
          { key: "team_size", label: "Team Size", placeholder: "e.g., 5 reps, 50 reps..." },
          { key: "lead_sources", label: "Lead Sources", placeholder: "e.g., FB Ads, Website, Referrals..." }
        ],
        checklist: [
          "Take notes on active CRM tool",
          "Validate their pain points: 'That makes total sense...'",
          "Confirm they are the primary decision maker"
        ],
        scripts: {
          opening: "Got it, {leadName}. To give you the best recommendation, could you tell me a bit about how your team currently tracks leads, and what the biggest bottleneck is right now?",
          talkingPoints: [
            "Ask open-ended questions (How, What, Why)",
            "Do not talk about product features yet",
            "Note down exact vocabulary they use for their problems"
          ],
          tips: "Listen 70% of the time. If they mention a problem, double-down on it: 'How long has that been an issue for you?'"
        }
      },
      {
        id: "qualification",
        label: "Qualification",
        questions: [
          { id: "q8", text: "Confirm if they have authority to purchase?", type: "check" },
          { id: "q9", text: "Determine target timeline for implementation?", type: "check" },
          { id: "q10", text: "Understand if they have budget allocated?", type: "check" }
        ],
        discovery: [
          { key: "go_live", label: "Target Go-Live Date", placeholder: "e.g., This month, next quarter..." },
          { key: "authority_level", label: "Authority Level", placeholder: "e.g., Founder, Manager, Head of Sales..." }
        ],
        checklist: [
          "Ask Timeline: 'When are you hoping to have a solution in place?'",
          "Identify secondary stakeholders: 'Who else would be involved in this decision?'"
        ],
        scripts: {
          opening: "Typically, teams implementing TechSales go live within 7 days. {leadName}, what timeline are you looking at to solve this lead leakage issue?",
          talkingPoints: [
            "Understand timeline urgency",
            "Determine if budget is flexible",
            "Confirm the procurement process"
          ],
          tips: "If they are not the decision maker, ask: 'Who else besides yourself would be evaluating the technical and financial aspects of this?'"
        }
      },
      {
        id: "budget",
        label: "Budget",
        questions: [
          { id: "q11", text: "Establish budget range?", type: "check" },
          { id: "q12", text: "Present pricing tiers clearly?", type: "check" }
        ],
        discovery: [
          { key: "budget_amount", label: "Allocated Budget Amount", placeholder: "e.g., ₹50k - ₹2L, ₹5L+..." }
        ],
        checklist: [
          "Introduce cost as an investment",
          "Compare with cost of lost leads",
          "Check budget flexibility"
        ],
        scripts: {
          opening: "Based on your team of 10, our Enterprise tier is ₹15,000/month, which is usually offset if your team saves just one lead from slipping through. Does that align with what you had planned?",
          talkingPoints: [
            "Present pricing confidently without hesitating",
            "Frame price in terms of ROI",
            "Offer a monthly vs annual discount"
          ],
          tips: "Always anchor high. If they object, highlight that our starter plan is ₹5,000/month, but it lacks advanced automation."
        }
      },
      {
        id: "closing",
        label: "Closing",
        questions: [
          { id: "q13", text: "Schedule a product demo session?", type: "check" },
          { id: "q14", text: "Confirm calendar invite sent during call?", type: "check" },
          { id: "q15", text: "Send introductory WhatsApp message?", type: "check" }
        ],
        discovery: [
          { key: "demo_time", label: "Demo Date/Time", placeholder: "e.g., Fri 3 PM..." }
        ],
        checklist: [
          "Send Calendar Invite before hanging up",
          "Send WhatsApp welcome note with your contact card",
          "Mark lead as 'Demo Scheduled' in CRM"
        ],
        scripts: {
          opening: "Great! I've sent a calendar invitation for the demo on Friday at 3:00 PM. {leadName}, I'll also drop you a quick hi on WhatsApp so you have my direct line. Looking forward to showing you the system!",
          talkingPoints: [
            "Secure a firm calendar time",
            "Verify email address is correct",
            "Set clear expectations for the next call"
          ],
          tips: "Ensure they check their email and accept the invite while still on the line."
        }
      }
    ],
    objections: [
      { trigger: "Price is too high", rebuttal: "I understand price is a factor. But if we can save your team 5 hours a week per rep, the system pays for itself in the first 2 weeks. Shall we look at the ROI breakdown?" },
      { trigger: "Already using competitor", rebuttal: "Competitors are great, but many teams switch to us because of our direct WhatsApp integration. What CRM are you currently using?" },
      { trigger: "No time right now", rebuttal: "I respect your time. I can email you a 2-minute video overview, and we can connect next week. Would Monday or Tuesday work better?" }
    ],
    crossSell: {
      product: "Sales Training Bundle",
      icon: "🎓",
      success: 58,
      deals: 14,
      pitch: "Since you are scaling your sales team, adding our Sales Training Bundle helps reps adopt the CRM 3x faster and improves cold call pitch success by 35%."
    }
  },
  {
    id: 2,
    title: "BANT Qualification",
    sub: "Detailed BANT qualification questions",
    category: "SaaS",
    budgetRange: "₹5L - ₹15L",
    duration: "4-5 mins",
    icon: "📋",
    steps: [
      {
        id: "opening",
        label: "Intro & Budget",
        questions: [
          { id: "b1", text: "Confirm current monthly software spend?", type: "check" },
          { id: "b2", text: "Identify financial year budget cycle?", type: "check" }
        ],
        discovery: [
          { key: "annual_crm", label: "Annual CRM Budget", placeholder: "e.g., ₹5L..." }
        ],
        checklist: [
          "Verify if budget is approved or projected",
          "Check payment term preference (Annual vs Monthly)"
        ],
        scripts: {
          opening: "Hi {leadName}, when budgeting for your operations this year, have you allocated a specific bracket for CRM and database automation, or are you exploring options to define it?",
          talkingPoints: [
            "Identify the budget owner",
            "Learn if they have flex-funds"
          ],
          tips: "If budget is undefined, ask what their cost of acquiring a lead is currently."
        }
      },
      {
        id: "authority",
        label: "Authority",
        questions: [
          { id: "b3", text: "Clarify decision making hierarchy?", type: "check" },
          { id: "b4", text: "Get contact of technical reviewer?", type: "check" }
        ],
        discovery: [
          { key: "dm_name", label: "Decision Maker Name", placeholder: "e.g., Priya Sen, CTO..." }
        ],
        checklist: [
          "Map all buying committee members",
          "Identify potential internal champion"
        ],
        scripts: {
          opening: "Who else on the finance or IT side will be reviewing the integration capabilities before we sign off, {leadName}?",
          talkingPoints: [
            "Avoid bypassing the current contact",
            "Position yourself as helping them look good to the boss"
          ],
          tips: "Ask: 'How have software purchases of this scale been approved in the past?'"
        }
      },
      {
        id: "need",
        label: "Need",
        questions: [
          { id: "b5", text: "List top 3 must-have integrations?", type: "check" },
          { id: "b6", text: "Identify key reporting metrics required?", type: "check" }
        ],
        discovery: [
          { key: "must_integration", label: "Must-Have Integration", placeholder: "e.g. WhatsApp, HubSpot..." }
        ],
        checklist: [
          "Validate pain urgency",
          "Confirm current system limitations"
        ],
        scripts: {
          opening: "What is the single most critical feature that your sales team is missing today, without which this project wouldn't be successful?",
          talkingPoints: [
            "Quantify the pain (e.g. 20% lead loss)",
            "Get agreement on the cost of doing nothing"
          ],
          tips: "If they say 'everything is fine', ask how they handle backup when a rep leaves."
        }
      },
      {
        id: "timeline",
        label: "Timeline",
        questions: [
          { id: "b7", text: "Determine critical launch date?", type: "check" },
          { id: "b8", text: "Define implementation milestones?", type: "check" }
        ],
        discovery: [
          { key: "go_live_bant", label: "Target Go-Live Date", placeholder: "e.g. June 1st..." }
        ],
        checklist: [
          "Check for external timeline constraints (e.g. contract expiry)",
          "Plan onboarding schedule"
        ],
        scripts: {
          opening: "If we decide to move forward, {leadName}, when is the absolute latest you would want the team fully trained and using the new dashboard active?",
          talkingPoints: [
            "Work backward from their target date",
            "Highlight typical 7-day onboarding period"
          ],
          tips: "Ask: 'What happens if this isn't implemented by then?' to gauge urgency."
        }
      },
      {
        id: "closing",
        label: "Summary & Close",
        questions: [
          { id: "b9", text: "Summarize BANT answers to lead?", type: "check" },
          { id: "b10", text: "Get verbal confirmation of next steps?", type: "check" }
        ],
        discovery: [
          { key: "bant_next", label: "Agreed Next Step", placeholder: "e.g. Send customized proposal..." }
        ],
        checklist: [
          "Log BANT criteria in CRM",
          "Set reminder for next action item"
        ],
        scripts: {
          opening: "Excellent. Based on our discussion, you need a solution by next month for a team of 15, with a budget of ₹8L. I'll prepare a customized proposal reflecting this and send it over by 4 PM today.",
          talkingPoints: [
            "Confirm all four BANT points",
            "Show clear commitment to the deadline"
          ],
          tips: "Thank them for their detailed insights. It builds trust."
        }
      }
    ],
    objections: [
      { trigger: "Timeline is too tight", rebuttal: "We have an express onboarding package that can get your team live in 48 hours instead of the standard 7 days. Shall we look at that?" },
      { trigger: "Need to consult procurement", rebuttal: "Understood. I can provide our standard vendor onboarding documentation and security certificates to speed up their evaluation." }
    ],
    crossSell: {
      product: "Branding & Leads Bundle",
      icon: "🎙",
      success: 48,
      deals: 19,
      pitch: "Since you have defined budget and need leads quickly, combining the CRM with our Branding & Leads Package gets you 100 pre-qualified leads in the first month."
    }
  },
  {
    id: 3,
    title: "Zee News Podcast Pitch",
    sub: "For media & branding clients",
    category: "Branding",
    budgetRange: "₹10L - ₹25L",
    duration: "5-6 mins",
    icon: "🎙",
    steps: [
      {
        id: "opening",
        label: "Introduction",
        questions: [
          { id: "p1", text: "Ask if they have watched Zee News podcasts?", type: "check" },
          { id: "p2", text: "Introduce the premium placement opportunity?", type: "check" }
        ],
        discovery: [
          { key: "brand_obj", label: "Brand Objective", placeholder: "e.g., Authority, Lead Gen, Brand Recall..." }
        ],
        checklist: [
          "Establish high credibility immediately",
          "Hook with the size of Zee News audience"
        ],
        scripts: {
          opening: "Hi {leadName}, this is {repName} from TechSales Media. We are selecting 5 leading brand founders for our upcoming special feature on Zee News digital podcast. I wanted to see if your brand is currently active in digital video PR?",
          talkingPoints: [
            "Zee News reaches 50M+ viewers",
            "This is an exclusive invite-only segment"
          ],
          tips: "Name-drop a few similar founders who have been featured recently to create FOMO."
        }
      },
      {
        id: "discovery",
        label: "Brand Discovery",
        questions: [
          { id: "p3", text: "Identify key brand message to convey?", type: "check" },
          { id: "p4", text: "Learn their target demographic?", type: "check" }
        ],
        discovery: [
          { key: "brand_target", label: "Target Audience", placeholder: "e.g., Tier-1 youth, tech founders..." }
        ],
        checklist: [
          "Identify founder's personal story angle",
          "Determine if they want studio or remote recording"
        ],
        scripts: {
          opening: "For this podcast, {leadName}, we focus on the founder's journey. What is the key milestone or story that you think sets your brand apart in the market right now?",
          talkingPoints: [
            "Focus on the human interest angle",
            "Demographics alignment"
          ],
          tips: "Ask them about their passion. People love talking about their brand's origin story."
        }
      },
      {
        id: "closing",
        label: "Pitch & Pricing",
        questions: [
          { id: "p5", text: "Present the package pricing details?", type: "check" },
          { id: "p6", text: "Ask for slot booking deposit?", type: "check" }
        ],
        discovery: [
          { key: "shoot_date", label: "Preferred Shoot Date", placeholder: "e.g., Mid-July..." }
        ],
        checklist: [
          "Explain production, airing, and syndication pricing",
          "Confirm slot availability"
        ],
        scripts: {
          opening: "The complete production and broadcasting package on Zee digital is ₹12 Lakhs. This includes pre-shoot consulting, studio recording, and digital marketing promotion. We have only 2 slots remaining for next month. Can we book your shoot date?",
          talkingPoints: [
            "Create urgency around limited slots",
            "Detail the deliverables: video files, raw cuts, and syndication"
          ],
          tips: "Offer a token booking amount (₹50k) to lock the date."
        }
      }
    ],
    objections: [
      { trigger: "We don't do video marketing", rebuttal: "Video generates 1200% more shares than text and image combined. Plus, featuring on Zee News gives you a permanent badge of authority you can use on your website forever." },
      { trigger: "Budget is out of scope", rebuttal: "We have a smaller syndication tier starting at ₹4L, which features you in a panel discussion format instead of a dedicated solo episode. Would that fit better?" }
    ],
    crossSell: {
      product: "Branding Package",
      icon: "🖼",
      success: 42,
      deals: 8,
      pitch: "Add our digital PR package to distribute the podcast snippets to 50+ media sites (NDTV, MoneyControl) to maximize the SEO value."
    }
  }
];
function empDocToSop(doc) {
  return {
    id: doc.id + 100,
    title: doc.title,
    sub: doc.sub,
    category: "Process",
    budgetRange: "—",
    duration: "3–5 mins",
    icon: "📋",
    steps: doc.sections.map((sec, idx) => ({
      id: `s${idx}`,
      label: sec.title,
      questions: sec.items.map((it, qi) => ({ id: `q${idx}-${qi}`, text: it, type: "check" })),
      discovery: [],
      checklist: [...sec.items],
      scripts: {
        opening: sec.items.map((it) => `• ${it}`).join("\n"),
        talkingPoints: [],
        tips: ""
      }
    })),
    objections: [],
    crossSell: null
  };
}
function buildAllEmployeeSops() {
  return [...LOCAL_SOPS, ...EMP_SOP_DOCS.map(empDocToSop)];
}
const ALL_EMP_SOPS = buildAllEmployeeSops();
const EMPLOYEE_STORAGE_KEY = "crm_current_employee_v1";
function getStoredEmployee() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(EMPLOYEE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function storeEmployee(employee) {
  if (typeof window === "undefined" || !employee) return;
  try {
    window.localStorage.setItem(EMPLOYEE_STORAGE_KEY, JSON.stringify(employee));
  } catch {
  }
}
function getCrmHeaders(role = "employee") {
  const emp = getStoredEmployee();
  if (role === "admin") {
    return {
      "x-tenant-id": "default",
      "x-user-id": "admin",
      "x-user-name": "Admin",
      "x-user-role": "admin"
    };
  }
  return {
    "x-tenant-id": "default",
    "x-user-id": String(emp?.id ?? ""),
    "x-user-name": emp?.name || "Employee",
    "x-user-role": "employee"
  };
}
function getAdminCrmHeaders() {
  return getCrmHeaders("admin");
}
function mapApiEmployee(row) {
  if (!row) return null;
  const name = row.name || "Employee";
  const initials = row.initials || name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return {
    id: row.id,
    name,
    role: row.role || "Sales Executive",
    initials,
    email: row.email || "",
    phone: row.phone || "",
    department: row.department || "Sales",
    avatarColor: "#2563eb"
  };
}
const AVATAR_COLORS$1 = ["#2563eb", "#10b981", "#f59e0b", "#7c3aed", "#dc2626", "#0ea5e9", "#64748b"];
function normalizeTemperature(raw) {
  const s = String(raw || "").toLowerCase();
  if (s.includes("hot")) return "hot";
  if (s.includes("cold")) return "cold";
  if (s === "notpick" || s.includes("not pick")) return "notpick";
  if (s === "converted") return "converted";
  if (s === "ni" || s.includes("not interested")) return "ni";
  return "warm";
}
function temperatureToApi(status) {
  const map = {
    hot: "Hot Lead",
    warm: "Warm Lead",
    cold: "Cold Lead",
    notpick: "Cold Lead",
    converted: "Hot Lead",
    ni: "Cold Lead"
  };
  return map[status] || "Warm Lead";
}
function formatRelativeTime(iso) {
  if (!iso) return "—";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const diffMs = Date.now() - then;
  const mins = Math.floor(diffMs / 6e4);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
function unwrapApiData(res) {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.items)) return res.items;
  if (Array.isArray(res?.leads)) return res.leads;
  if (Array.isArray(res?.employees)) return res.employees;
  return res?.data ?? [];
}
function apiLeadToEmployee(lead, avatarColors = AVATAR_COLORS$1) {
  const name = lead.leadName || lead.lead_name || "Lead";
  const id = lead.id;
  const av = name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const status = normalizeTemperature(lead.temperature || lead.status);
  const stage = lead.pipelineStage || lead.pipeline_stage || lead.status || "Attempted";
  const revenue = Number(lead.expectedRevenue ?? lead.expected_revenue ?? 0);
  return {
    id,
    name,
    company: lead.companyName || lead.company_name || "—",
    status,
    stage,
    source: lead.source || "Website",
    budget: revenue > 0 ? formatEmpPipelineValue(revenue) : "—",
    service: lead.requirements || lead.insights || lead.sourceMeta?.service || "—",
    last: formatRelativeTime(lead.lastActivityAt || lead.updatedAt || lead.createdAt),
    av,
    color: avatarColors[Number(id) % avatarColors.length],
    phone: lead.phone || "",
    email: lead.email || "",
    city: lead.city || "",
    country: lead.country || "India",
    assignee: typeof lead.assignedTo === "object" ? lead.assignedTo.name : "",
    assigneeId: typeof lead.assignedTo === "object" ? lead.assignedTo.id : lead.assignedTo,
    pipelineStage: stage,
    temperature: lead.temperature,
    expectedRevenue: revenue,
    winProbability: lead.winProbability ?? lead.win_probability,
    nextFollowUpAt: lead.nextFollowUpAt || lead.next_follow_up_at,
    createdAt: lead.createdAt || lead.created_at,
    updatedAt: lead.updatedAt || lead.updated_at,
    assignmentStatus: lead.assignmentStatus || lead.assignment_status,
    _api: true
  };
}
function apiLeadToAdmin(lead) {
  const assignedTo = lead.assignedTo;
  return {
    id: lead.id,
    lead_name: lead.leadName || lead.lead_name,
    company_name: lead.companyName || lead.company_name,
    phone: lead.phone,
    email: lead.email,
    city: lead.city,
    country: lead.country,
    source: lead.source,
    form_name: lead.formName || lead.form_name,
    pipeline_stage: lead.pipelineStage || lead.pipeline_stage,
    temperature: lead.temperature,
    status: lead.status,
    expected_revenue: lead.expectedRevenue ?? lead.expected_revenue,
    win_probability: lead.winProbability ?? lead.win_probability,
    created_at: lead.createdAt || lead.created_at,
    next_followup_date: lead.nextFollowUpAt || lead.next_follow_up_at,
    requirements: lead.requirements,
    assignedTo,
    assignment_status: lead.assignmentStatus || lead.assignment_status
  };
}
function employeeStagePatch(stageLabel, currentStatus) {
  const status = stageLabel === "Converted" ? "converted" : stageLabel === "Not Pick" ? "notpick" : stageLabel === "Closed" ? "ni" : currentStatus;
  return {
    stage: stageLabel,
    pipelineStage: stageLabel,
    status: stageLabel,
    employeeStatus: status
  };
}
function apiEmployeeToAdmin(emp) {
  return {
    id: emp.id,
    name: emp.name,
    email: emp.email,
    role: emp.role,
    department: emp.department,
    status: emp.status
  };
}
const EmployeeContext = createContext(null);
const AVATAR_COLORS = ["#2563eb", "#10b981", "#f59e0b", "#7c3aed", "#dc2626", "#0ea5e9", "#64748b"];
function initialsFromName(name) {
  return name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}
function readJsonStorage(key, fallback) {
  if (typeof window === "undefined") return fallback();
  try {
    const saved = window.localStorage.getItem(key);
    if (!saved) return fallback();
    return JSON.parse(saved);
  } catch {
    return fallback();
  }
}
function EmployeeProvider({ children }) {
  const [employee, setEmployee] = useState(CURRENT_EMPLOYEE);
  const [leads, setLeads] = useState(EMP_LEADS);
  const [loading, setLoading] = useState(true);
  const [usingApi, setUsingApi] = useState(false);
  const refreshLeads = useCallback(async (empId = employee.id) => {
    try {
      const res = await apiGet(`/api/v1/employee/${empId}/leads`, {
        headers: getCrmHeaders(),
        skipCache: true,
        cacheTtl: 0
      });
      const items2 = unwrapApiData(res);
      setLeads(items2.map((l) => apiLeadToEmployee(l, AVATAR_COLORS)));
      setUsingApi(true);
      return true;
    } catch {
      return false;
    }
  }, [employee.id]);
  useEffect(() => {
    let cancelled = false;
    async function bootstrap() {
      setLoading(true);
      try {
        const empRes = await apiGet("/api/v1/employees", {
          headers: getCrmHeaders(),
          skipCache: true,
          cacheTtl: 0
        });
        const employees = unwrapApiData(empRes);
        const matched = employees.find((e) => e.name === CURRENT_EMPLOYEE.name) || employees[0];
        if (matched && !cancelled) {
          const mapped = { ...CURRENT_EMPLOYEE, ...mapApiEmployee(matched) };
          setEmployee(mapped);
          storeEmployee(mapped);
          const ok = await refreshLeads(mapped.id);
          if (ok && !cancelled) {
            setLoading(false);
            return;
          }
        }
      } catch {
      }
      if (!cancelled) {
        setUsingApi(false);
        setLeads(EMP_LEADS);
        setLoading(false);
      }
    }
    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [refreshLeads]);
  const [tasks, setTasksState] = useState(
    () => normalizeTasksMap(readJsonStorage("emp_tasks_map", createInitialTasks))
  );
  const [followUps, setFollowUpsState] = useState(() => {
    const saved = readJsonStorage("emp_followups_list", () => null);
    if (Array.isArray(saved)) return saved;
    return EMP_FOLLOWUPS.map((f) => ({ ...f, done: false }));
  });
  const setTasks = useCallback((updater) => {
    setTasksState((prev) => {
      const next = normalizeTasksMap(
        typeof updater === "function" ? updater(prev) : updater
      );
      if (typeof window !== "undefined") {
        window.localStorage.setItem("emp_tasks_map", JSON.stringify(next));
      }
      return next;
    });
  }, []);
  const setFollowUps = useCallback((updater) => {
    setFollowUpsState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      localStorage.setItem("emp_followups_list", JSON.stringify(next));
      return next;
    });
  }, []);
  const [calls, setCalls] = useState(() => {
    const saved = localStorage.getItem("emp_calls_list");
    return saved ? JSON.parse(saved) : EMP_CALLS;
  });
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem("emp_activities_map");
    return saved ? JSON.parse(saved) : EMP_LEAD_CALL_ACTIVITY;
  });
  const [sops, setSopsState] = useState(() => {
    const saved = localStorage.getItem("emp_sops_list");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const ids = new Set(parsed.map((s) => s.id));
          const merged = [...parsed, ...ALL_EMP_SOPS.filter((s) => !ids.has(s.id))];
          return merged.length > parsed.length ? merged : parsed;
        }
      } catch {
      }
    }
    return ALL_EMP_SOPS;
  });
  const setSops = useCallback((updater) => {
    setSopsState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      localStorage.setItem("emp_sops_list", JSON.stringify(next));
      return next;
    });
  }, []);
  const addCallRecord = useCallback((newCall) => {
    setCalls((prev) => {
      const updated = [newCall, ...prev];
      localStorage.setItem("emp_calls_list", JSON.stringify(updated));
      return updated;
    });
  }, []);
  const addActivityRecord = useCallback((leadId, newEvent) => {
    setActivities((prev) => {
      const existing = prev[leadId] || [];
      const updated = [newEvent, ...existing];
      const newMap = { ...prev, [leadId]: updated };
      localStorage.setItem("emp_activities_map", JSON.stringify(newMap));
      return newMap;
    });
  }, []);
  const scheduleFollowUp = useCallback(({ leadName, company, type, date, time, note, leadId }) => {
    const lead = leads.find((l) => l.name === leadName || l.id === leadId);
    const id = Date.now();
    const taskId = id + 1;
    const urgency = getFollowUpUrgency(date);
    const resolvedCompany = company || lead?.company || "—";
    const av = lead?.av || initialsFromName(leadName);
    const color = lead?.color || "#64748b";
    const followUp = {
      id,
      name: leadName,
      company: resolvedCompany,
      type,
      urgency,
      time: formatFollowUpSchedule(date, time),
      av,
      color,
      note: note?.trim() || `${type} follow-up scheduled`,
      scheduledDate: date,
      scheduledTime: time,
      done: false,
      taskId,
      leadId: lead?.id ?? leadId
    };
    const task = {
      id: taskId,
      name: buildFollowUpTaskName({ type, name: leadName, note }),
      done: false,
      priority: followUpPriority(urgency),
      assignee: employee.name,
      assigneeAv: employee.initials,
      assigneeColor: employee.avatarColor,
      deadline: time,
      source: "followup",
      followUpId: id
    };
    setFollowUps((prev) => [...prev, followUp]);
    setTasks((prev) => ({
      ...prev,
      [date]: [...prev[date] || [], task]
    }));
    return followUp;
  }, [employee, leads, setFollowUps, setTasks]);
  const completeFollowUp = useCallback((followUpId) => {
    setFollowUps((prev) => prev.map((f) => f.id === followUpId ? { ...f, done: true } : f));
    setTasks((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((date) => {
        next[date] = (next[date] || []).map((t) => t.followUpId === followUpId ? { ...t, done: true } : t);
      });
      return next;
    });
  }, [setFollowUps, setTasks]);
  const syncTaskWithFollowUp = useCallback((date, taskId, done) => {
    setTasks((prev) => {
      const task = prev[date]?.find((t) => t.id === taskId);
      const dayTasks = prev[date] || [];
      const next = {
        ...prev,
        [date]: dayTasks.map((t) => t.id === taskId ? { ...t, done } : t)
      };
      if (task?.followUpId && done) {
        setFollowUps((fuPrev) => fuPrev.map((f) => f.id === task.followUpId ? { ...f, done: true } : f));
      }
      return next;
    });
  }, [setTasks, setFollowUps]);
  const addLead = useCallback(async (form) => {
    const localLead = form.lead_name || form.company_name ? empLeadFromDrawerPayload(form, AVATAR_COLORS) : (() => {
      const name = [form.firstName, form.lastName].filter(Boolean).join(" ").trim() || "New Lead";
      const id = Date.now();
      const av = initialsFromName(name);
      return {
        id,
        name,
        company: form.company || "—",
        status: form.status || "warm",
        stage: form.stage || "Attempted",
        source: form.source || "Website",
        budget: form.budget || "—",
        last: "Just now",
        av,
        color: AVATAR_COLORS[id % AVATAR_COLORS.length],
        city: form.city || "",
        state: form.state || ""
      };
    })();
    if (usingApi) {
      try {
        const res = await apiPost("/api/v1/leads", {
          leadName: localLead.name,
          companyName: localLead.company,
          phone: form.phone || localLead.phone,
          email: form.email || localLead.email,
          city: localLead.city,
          source: localLead.source,
          temperature: temperatureToApi(localLead.status),
          pipelineStage: localLead.stage,
          expectedRevenue: Number(form.expected_revenue || 0),
          requirements: form.service || form.interested_service
        }, { headers: getCrmHeaders() });
        await apiPost("/api/v1/assignment/assign", {
          leadId: res.data?.id ?? res.id,
          employeeId: employee.id,
          method: "manual"
        }, { headers: getCrmHeaders() });
        invalidateCache("/api/v1");
        await refreshLeads(employee.id);
        toast.success(`${localLead.name} added to your pipeline`);
        return apiLeadToEmployee(res.data || res, AVATAR_COLORS);
      } catch (err) {
        toast.error(err.message || "Could not save lead to server");
      }
    }
    localLead.assignee = employee.name;
    localLead.assigneeId = employee.id;
    setLeads((prev) => [localLead, ...prev]);
    return localLead;
  }, [employee, refreshLeads, usingApi]);
  const updateLeadStage = useCallback(async (leadId, stageLabel) => {
    const current = leads.find((l) => l.id === leadId);
    const patch = employeeStagePatch(stageLabel, current?.status);
    setLeads((prev) => prev.map((l) => {
      if (l.id !== leadId) return l;
      return { ...l, stage: stageLabel, status: patch.employeeStatus };
    }));
    if (usingApi) {
      try {
        await apiPatch(`/api/v1/leads/${leadId}/stage`, {
          stage: stageLabel,
          status: stageLabel
        }, { headers: getCrmHeaders() });
        invalidateCache("/api/v1");
      } catch (err) {
        toast.error(err.message || "Stage update failed");
      }
    }
  }, [leads, usingApi]);
  const updateLeadTemperature = useCallback(async (leadId, nextStatus) => {
    setLeads((prev) => prev.map((l) => l.id === leadId ? { ...l, status: nextStatus } : l));
    if (usingApi) {
      try {
        await apiPut(`/api/v1/leads/${leadId}`, {
          temperature: temperatureToApi(nextStatus)
        }, { headers: getCrmHeaders() });
        invalidateCache("/api/v1");
      } catch (err) {
        toast.error(err.message || "Temperature update failed");
      }
    }
  }, [usingApi]);
  const value = useMemo(() => ({
    employee,
    tasks,
    setTasks,
    followUps,
    setFollowUps,
    scheduleFollowUp,
    completeFollowUp,
    syncTaskWithFollowUp,
    leads,
    setLeads,
    addLead,
    updateLeadStage,
    updateLeadTemperature,
    refreshLeads,
    usingApi,
    calls,
    setCalls,
    addCallRecord,
    activities,
    addActivityRecord,
    sops,
    setSops,
    loading
  }), [
    employee,
    tasks,
    setTasks,
    followUps,
    setFollowUps,
    scheduleFollowUp,
    completeFollowUp,
    syncTaskWithFollowUp,
    leads,
    addLead,
    updateLeadStage,
    updateLeadTemperature,
    refreshLeads,
    usingApi,
    calls,
    addCallRecord,
    activities,
    addActivityRecord,
    sops,
    setSops,
    loading
  ]);
  return /* @__PURE__ */ jsx(EmployeeContext.Provider, { value, children });
}
function useEmployee() {
  const ctx = useContext(EmployeeContext);
  if (!ctx) throw new Error("useEmployee must be used within EmployeeProvider");
  return ctx;
}
const DOODLE_STROKE = {
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function EmployeeDoodleAvatar({ size = 48, className = "", shape = "rounded" }) {
  const radius = shape === "circle" ? "rounded-full" : size >= 44 ? "rounded-2xl" : "rounded-xl";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `relative shrink-0 overflow-hidden border-2 border-slate-200/90 bg-gradient-to-br from-sky-50 via-white to-amber-50 shadow-[0_2px_8px_rgba(15,23,42,0.06)] ${radius} ${className}`,
      style: { width: size, height: size },
      "aria-hidden": true,
      children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 80 80", className: "w-full h-full", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ jsx("circle", { cx: "62", cy: "18", r: "10", fill: "#fde68a", fillOpacity: "0.45" }),
        /* @__PURE__ */ jsx("circle", { cx: "16", cy: "58", r: "8", fill: "#bfdbfe", fillOpacity: "0.5" }),
        /* @__PURE__ */ jsx("path", { d: "M68 52 l3 2 -3 2 -2 -3z", fill: "#fca5a5", fillOpacity: "0.6" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M22 36 C24 20 36 14 40 14 C44 14 56 20 58 36 C56 28 48 22 40 22 C32 22 24 28 22 36Z",
            fill: "#475569",
            fillOpacity: "0.12",
            stroke: "#334155",
            strokeWidth: "2.2",
            ...DOODLE_STROKE
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M26 30 Q32 18 40 17 Q48 18 54 30",
            stroke: "#334155",
            strokeWidth: "2",
            ...DOODLE_STROKE
          }
        ),
        /* @__PURE__ */ jsx("ellipse", { cx: "40", cy: "40", rx: "17", ry: "18", fill: "#fde68a", stroke: "#334155", strokeWidth: "2.2", ...DOODLE_STROKE }),
        /* @__PURE__ */ jsx("ellipse", { cx: "30", cy: "44", rx: "3.5", ry: "2", fill: "#fda4af", fillOpacity: "0.45" }),
        /* @__PURE__ */ jsx("ellipse", { cx: "50", cy: "44", rx: "3.5", ry: "2", fill: "#fda4af", fillOpacity: "0.45" }),
        /* @__PURE__ */ jsx("circle", { cx: "34", cy: "38", r: "2.2", fill: "#1e293b" }),
        /* @__PURE__ */ jsx("circle", { cx: "46", cy: "38", r: "2.2", fill: "#1e293b" }),
        /* @__PURE__ */ jsx("circle", { cx: "34.8", cy: "37.2", r: "0.7", fill: "white" }),
        /* @__PURE__ */ jsx("circle", { cx: "46.8", cy: "37.2", r: "0.7", fill: "white" }),
        /* @__PURE__ */ jsx("path", { d: "M33 46 Q40 51 47 46", stroke: "#334155", strokeWidth: "2", ...DOODLE_STROKE }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M24 40 C24 28 31 22 40 22 C49 22 56 28 56 40",
            stroke: "#6366f1",
            strokeWidth: "2.2",
            ...DOODLE_STROKE
          }
        ),
        /* @__PURE__ */ jsx("rect", { x: "19", y: "37", width: "7", height: "11", rx: "3.5", fill: "#e0e7ff", stroke: "#6366f1", strokeWidth: "2" }),
        /* @__PURE__ */ jsx("rect", { x: "54", y: "37", width: "7", height: "11", rx: "3.5", fill: "#e0e7ff", stroke: "#6366f1", strokeWidth: "2" }),
        /* @__PURE__ */ jsx("path", { d: "M40 48 L40 54", stroke: "#6366f1", strokeWidth: "2", ...DOODLE_STROKE }),
        /* @__PURE__ */ jsx("rect", { x: "37", y: "54", width: "6", height: "4", rx: "2", fill: "#6366f1" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M28 58 L40 66 L52 58 L52 72 L28 72 Z",
            fill: "#f8fafc",
            stroke: "#64748b",
            strokeWidth: "2",
            ...DOODLE_STROKE
          }
        ),
        /* @__PURE__ */ jsx("path", { d: "M40 58 L40 66", stroke: "#94a3b8", strokeWidth: "1.5", ...DOODLE_STROKE }),
        /* @__PURE__ */ jsx("path", { d: "M14 22 l1.5 3 -3 1.5 3 1.5 -1.5 3 1.5 -3 3 -1.5 -3 -1.5z", fill: "#fbbf24", fillOpacity: "0.7" }),
        /* @__PURE__ */ jsx("path", { d: "M66 62 l1 2 -2 1 2 1 -1 2 -1 -2 -2 -1 2 -1z", fill: "#60a5fa", fillOpacity: "0.65" })
      ] })
    }
  );
}
const S = {
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function EmployeePanelDoodleLogo({ size = 36, className = "" }) {
  const radius = size >= 40 ? "rounded-xl" : "rounded-lg";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `relative shrink-0 overflow-hidden border-2 border-slate-600/80 bg-gradient-to-br from-sky-950/40 via-slate-900 to-indigo-950/30 shadow-[0_2px_8px_rgba(0,0,0,0.25)] ${radius} ${className}`,
      style: { width: size, height: size },
      "aria-hidden": true,
      children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 80 80", className: "w-full h-full", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ jsx("circle", { cx: "16", cy: "18", r: "9", fill: "#38bdf8", fillOpacity: "0.2" }),
        /* @__PURE__ */ jsx("circle", { cx: "64", cy: "56", r: "10", fill: "#818cf8", fillOpacity: "0.18" }),
        /* @__PURE__ */ jsx("circle", { cx: "58", cy: "16", r: "5", fill: "#fbbf24", fillOpacity: "0.25" }),
        /* @__PURE__ */ jsx("rect", { x: "22", y: "32", width: "36", height: "26", rx: "4", fill: "#1e293b", stroke: "#64748b", strokeWidth: "2.2", ...S }),
        /* @__PURE__ */ jsx("path", { d: "M30 32 V28 C30 24 34 22 40 22 C46 22 50 24 50 28 V32", stroke: "#94a3b8", strokeWidth: "2.2", fill: "none", ...S }),
        /* @__PURE__ */ jsx("path", { d: "M22 42 H58", stroke: "#475569", strokeWidth: "1.5", ...S }),
        /* @__PURE__ */ jsx(
          "text",
          {
            x: "40",
            y: "50",
            textAnchor: "middle",
            fontSize: "13",
            fontWeight: "800",
            fill: "#38bdf8",
            fontFamily: "system-ui, sans-serif",
            children: "EP"
          }
        ),
        /* @__PURE__ */ jsx("rect", { x: "52", y: "24", width: "14", height: "16", rx: "2.5", fill: "#0f172a", stroke: "#64748b", strokeWidth: "1.8", ...S }),
        /* @__PURE__ */ jsx("path", { d: "M55 30 L57 32 L61 28", stroke: "#34d399", strokeWidth: "1.8", ...S }),
        /* @__PURE__ */ jsx("path", { d: "M55 36 H62", stroke: "#475569", strokeWidth: "1.2", ...S }),
        /* @__PURE__ */ jsx("path", { d: "M14 48 C14 42 18 38 22 38", stroke: "#6366f1", strokeWidth: "2", ...S }),
        /* @__PURE__ */ jsx("rect", { x: "10", y: "46", width: "6", height: "9", rx: "3", fill: "#312e81", stroke: "#6366f1", strokeWidth: "1.5" }),
        /* @__PURE__ */ jsx("path", { d: "M68 22 l1.2 2.4 -2.4 1.2 2.4 1.2 -1.2 2.4 1.2 -2.4 2.4 -1.2 -2.4 -1.2z", fill: "#fbbf24", fillOpacity: "0.8" }),
        /* @__PURE__ */ jsx("path", { d: "M10 62 l1 2 -2 1 2 1 -1 2 -1 -2 -2 -1 2 -1z", fill: "#38bdf8", fillOpacity: "0.7" })
      ] })
    }
  );
}
const NAV = [
  { to: "/employee", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/employee/tasks", label: "My Tasks", icon: CheckSquare },
  { to: "/employee/follow-ups", label: "Follow-Up", icon: MessageSquare },
  { to: "/employee/calls", label: "Call Reporting", icon: Phone },
  { to: "/employee/leads", label: "Leads", icon: Users },
  { to: "/employee/sales-process", label: "Sales Process", icon: FileText },
  { to: "/employee/assets", label: "Assets", icon: Download },
  { to: "/employee/meetings", label: "Meetings", icon: Calendar }
];
function EmployeeSidebar({ open, onClose, collapsed, onToggleCollapse }) {
  const [hovered, setHovered] = useState(false);
  const { employee } = useEmployee();
  const navigate = useNavigate();
  const isExpanded = !collapsed || hovered;
  return /* @__PURE__ */ jsxs(SidebarContext.Provider, { value: { collapsed: !isExpanded }, children: [
    open && /* @__PURE__ */ jsx("div", { onClick: onClose, className: "fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden" }),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        onMouseEnter: () => collapsed && setHovered(true),
        onMouseLeave: () => setHovered(false),
        className: `${SIDEBAR_SHELL} ${isExpanded ? "w-[260px]" : "w-[68px]"} ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`,
        children: [
          /* @__PURE__ */ jsx(
            SidebarHeader,
            {
              isExpanded,
              onClose,
              onToggleCollapse,
              collapsed,
              children: /* @__PURE__ */ jsx(
                SidebarLogo,
                {
                  to: "/employee",
                  onNavigate: onClose,
                  isExpanded,
                  logo: /* @__PURE__ */ jsx(EmployeePanelDoodleLogo, { size: 36 }),
                  title: "Employee Panel",
                  subtitle: "LRMS · Sales workspace"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs(SidebarNav, { children: [
            /* @__PURE__ */ jsx(SidebarSectionLabel, { isExpanded, children: "Menu" }),
            NAV.map((item) => {
              const Icon = item.icon;
              return /* @__PURE__ */ jsx(NavLink, { to: item.to, end: item.end, onClick: onClose, className: "block group", children: ({ isActive }) => /* @__PURE__ */ jsx(SidebarNavItem, { isActive, isExpanded, icon: Icon, label: item.label }) }, item.to);
            })
          ] }),
          /* @__PURE__ */ jsxs(SidebarFooter, { children: [
            /* @__PURE__ */ jsx(
              SidebarSwitchLink,
              {
                to: "/",
                onClick: onClose,
                icon: ArrowLeftRight,
                label: "Switch to Admin Panel",
                isExpanded
              }
            ),
            /* @__PURE__ */ jsx(
              SidebarProfileCard,
              {
                isExpanded,
                onClick: () => {
                  navigate("/employee/profile");
                  onClose();
                },
                name: employee.name,
                role: employee.role,
                title: employee.name,
                avatar: /* @__PURE__ */ jsx(EmployeeDoodleAvatar, { size: 32, shape: "circle" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(SidebarCollapseHint, { show: collapsed && !hovered })
        ]
      }
    )
  ] });
}
const SEGMENT_WRAP = "inline-flex gap-0.5 p-0.5 rounded-lg bg-slate-100/80 border border-slate-200/80 shrink-0 overflow-x-auto scrollbar-none max-w-full";
const SEGMENT_BTN = "px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-bold whitespace-nowrap transition-all shrink-0";
const SEGMENT_BTN_ACTIVE = "bg-white text-rose-700 shadow-sm ring-1 ring-rose-100";
const SEGMENT_BTN_INACTIVE = "text-slate-500 hover:text-slate-700";
const QUICK_ACTIONS = [
  { label: "Add Lead", icon: Plus, to: "/employee/leads", search: "?action=add" },
  { label: "Add Task", icon: CheckSquare, to: "/employee/tasks", search: "?action=add" },
  { label: "Schedule Follow-up", icon: MessageSquare, to: "/employee/follow-ups", search: "?action=add" },
  { label: "Log Call", icon: Phone, to: "/employee/calls" },
  { label: "Book Meeting", icon: Calendar, to: "/employee/meetings", search: "?action=add" }
];
const PAGE_META = {
  "/employee": { title: "Dashboard", sub: "Overview · Pipeline · Agenda" },
  "/employee/tasks": { title: "My Tasks", sub: "Today · Upcoming · Previous" },
  "/employee/follow-ups": { title: "Follow-Up", sub: "Overdue · Due Today · Upcoming" },
  "/employee/calls": { title: "Call Reporting", sub: "Analytics · Team Performance · Lead Activity" },
  "/employee/leads": { title: "Pipeline", sub: "Real-time overview of your sales pipeline" },
  "/employee/pipeline": { title: "Pipeline", sub: "Real-time overview of your sales pipeline" },
  "/employee/sales-process": { title: "Sales Process", sub: "SOP · Cross-Selling · Scripts · Checklist" },
  "/employee/assets": { title: "Assets", sub: "Brochures · Templates · Training" },
  "/employee/meetings": { title: "Meetings", sub: "Book and track meetings" },
  "/employee/profile": { title: "Profile", sub: "Your account and preferences" }
};
const CALL_PERIODS = [
  { id: "today", label: "Today" },
  { id: "week", label: "Week" },
  { id: "month", label: "Month" }
];
const MOCK_NOTIFS = [
  { text: "Hot lead: Priya Sharma assigned", time: "2 mins ago" },
  { text: "Not picked — Suresh Jain (retry 1hr)", time: "18 mins ago" },
  { text: "Converted: InfoSystems — ₹12L", time: "1 hour ago" }
];
function EmployeeTopbar({ onMenu }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { employee } = useEmployee();
  const meta = pathname.startsWith("/employee/sales-process/") && pathname !== "/employee/sales-process" ? { title: "SOP Detail", sub: "Full playbook · Scripts · Checklist" } : PAGE_META[pathname] || { title: "Employee Panel", sub: "" };
  const [notifOpen, setNotifOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const quickRef = useRef(null);
  const isCallsPage = pathname === "/employee/calls";
  const callPeriod = searchParams.get("period") || "today";
  const setCallPeriod = (period) => {
    setSearchParams({ period }, { replace: true });
  };
  const handleQuickAction = (action) => {
    setQuickOpen(false);
    navigate(`${action.to}${action.search ?? ""}`);
  };
  useEffect(() => {
    const onClick = (e) => {
      if (quickRef.current && !quickRef.current.contains(e.target)) {
        setQuickOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-sm overflow-x-clip", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 sm:px-4 lg:px-8 py-2 min-h-[52px] md:min-h-20 min-w-0", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onMenu,
            className: "w-9 h-9 -ml-1 rounded-xl hover:bg-[#FFF5F8] text-[#DC143C] lg:hidden transition-all duration-200 shrink-0 grid place-items-center",
            "aria-label": "Open menu",
            children: /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-0 md:hidden", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#DC143C] pointer-events-none" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: searchQ,
              onChange: (e) => setSearchQ(e.target.value),
              placeholder: "Search leads, tasks…",
              "aria-label": "Search",
              className: "w-full h-9 pl-9 pr-8 py-1.5 rounded-xl bg-[#F5F7FA] border border-[#E5E7EB]\n                text-[#111827] text-sm placeholder:text-[#9CA3AF]\n                focus:outline-none focus:ring-2 focus:ring-[#DC143C]/20 focus:border-[#DC143C]/30 transition"
            }
          ),
          searchQ && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearchQ(""),
              className: "absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-[#9CA3AF] hover:text-[#DC143C] hover:bg-[#FFF5F8]",
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden md:block shrink-0 min-w-0", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-lg font-display font-semibold tracking-tight leading-tight text-[#111827]", children: meta.title }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-[#6B7280] leading-tight", children: meta.sub })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative hidden md:block flex-1 min-w-0 max-w-md mx-2 lg:mx-4", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#DC143C]" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: searchQ,
              onChange: (e) => setSearchQ(e.target.value),
              placeholder: "Search leads, tasks, meetings…",
              className: "w-full min-h-[44px] pl-11 pr-4 py-2.5 rounded-xl bg-[#F5F7FA] border border-[#E5E7EB] text-[#111827] text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary/40 transition"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block flex-grow min-w-0" }),
        isCallsPage && /* @__PURE__ */ jsx("div", { className: `${SEGMENT_WRAP} hidden sm:inline-flex mr-1 shrink-0`, children: CALL_PERIODS.map(({ id, label }) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setCallPeriod(id),
            className: `${SEGMENT_BTN} ${callPeriod === id ? SEGMENT_BTN_ACTIVE : SEGMENT_BTN_INACTIVE}`,
            children: label
          },
          id
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 sm:gap-1.5 justify-end shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { ref: quickRef, className: "relative hidden md:inline-flex w-auto mr-1", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setQuickOpen((v) => !v),
                className: "inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-2 rounded-xl text-xs md:text-sm font-medium hover:bg-primary/90 transition",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "Quick Actions" }),
                  /* @__PURE__ */ jsx(ChevronDown, { className: "w-3 h-3" })
                ]
              }
            ),
            quickOpen && /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-[#FFD6E5] shadow-[0_12px_40px_rgba(220,20,60,0.12)] z-50", children: /* @__PURE__ */ jsx("div", { className: "p-1 space-y-0.5", children: QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleQuickAction(action),
                  className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs md:text-sm text-[#111827] hover:bg-[#FFF0F5] transition",
                  children: [
                    /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 text-[#DC143C] shrink-0" }),
                    /* @__PURE__ */ jsx("span", { className: "text-left font-semibold", children: action.label })
                  ]
                },
                action.label
              );
            }) }) })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setNotifOpen((v) => !v),
              className: "relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#E5E7EB] bg-white grid place-items-center text-slate-500 hover:border-rose-200 hover:text-rose-600 transition shrink-0",
              "aria-label": "Notifications",
              children: [
                /* @__PURE__ */ jsx(Bell, { className: "w-4 h-4 text-[#DC143C]" }),
                /* @__PURE__ */ jsx("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-600 border-2 border-white" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/employee/profile",
              className: "hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#FFF5F8] transition border border-[#E5E7EB] bg-white shrink-0",
              children: [
                /* @__PURE__ */ jsx(EmployeeDoodleAvatar, { size: 32, shape: "circle" }),
                /* @__PURE__ */ jsxs("div", { className: "hidden lg:block text-left min-w-0", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-rose-800 truncate max-w-[100px]", children: employee.name.split(" ")[0] }),
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] text-slate-400 truncate", children: employee.role })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/employee/profile",
              className: "sm:hidden w-9 h-9 rounded-full border border-[#E5E7EB] bg-white grid place-items-center shrink-0 hover:bg-[#FFE4EC] transition",
              "aria-label": "Profile",
              children: /* @__PURE__ */ jsx(EmployeeDoodleAvatar, { size: 28, shape: "circle" })
            }
          )
        ] })
      ] }),
      isCallsPage && /* @__PURE__ */ jsx("div", { className: "sm:hidden px-2.5 pb-1 pt-0.5 border-t border-[#F3F4F6] bg-[#FAFAFA]/80", children: /* @__PURE__ */ jsx("div", { className: `${SEGMENT_WRAP} w-full`, children: CALL_PERIODS.map(({ id, label }) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setCallPeriod(id),
          className: `flex-1 ${SEGMENT_BTN} ${callPeriod === id ? SEGMENT_BTN_ACTIVE : SEGMENT_BTN_INACTIVE}`,
          children: label
        },
        id
      )) }) })
    ] }),
    notifOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-40", onClick: () => setNotifOpen(false) }),
      /* @__PURE__ */ jsxs("div", { className: "fixed top-[3.25rem] right-3 sm:right-6 z-50 w-[min(100vw-1.5rem,320px)] rounded-2xl border border-[#FFD6E5] bg-white shadow-[0_12px_40px_rgba(220,20,60,0.12)] p-4 animate-fade-in", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-display font-bold text-slate-900", children: "Notifications" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-wide text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100", children: "5 New" })
        ] }),
        MOCK_NOTIFS.map((n) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5 py-2.5 border-b border-rose-50 last:border-0", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-slate-800", children: n.text }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: n.time })
          ] })
        ] }, n.text))
      ] })
    ] })
  ] });
}
const items = [
  { to: "/employee", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/employee/leads", label: "Leads", icon: Users },
  { to: "/employee/calls", label: "Calls", icon: Phone },
  { to: "/employee/follow-ups", label: "Follow", icon: MessageSquare },
  { to: "/employee/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/employee/sales-process", label: "SOP", icon: FileText }
];
function EmployeeMobileNav() {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: "lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur-md safe-area-pb",
      style: { paddingBottom: "env(safe-area-inset-bottom, 0px)" },
      "aria-label": "Employee navigation",
      children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-6 h-14 max-w-[100vw]", children: items.map((i) => {
        const Icon = i.icon;
        return /* @__PURE__ */ jsxs(
          NavLink,
          {
            to: i.to,
            end: i.end,
            className: ({ isActive }) => `flex flex-col items-center justify-center gap-0.5 min-w-0 px-0.5 py-1 text-[8px] font-semibold leading-none touch-target transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`,
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 shrink-0", strokeWidth: 2 }),
              /* @__PURE__ */ jsx("span", { className: "truncate max-w-full", children: i.label })
            ]
          },
          i.to
        );
      }) })
    }
  );
}
const CALL_TOAST_ID = "emp-call-active";
function ToastShell({ t, icon: Icon, iconClass, title, subtitle }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex items-center gap-3 px-4 py-3 rounded-2xl border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.12)] transition-all ${t.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`,
      style: { maxWidth: 360, minWidth: 280 },
      children: [
        /* @__PURE__ */ jsx("div", { className: `w-9 h-9 rounded-xl grid place-items-center shrink-0 ${iconClass}`, children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900", children: title }),
          subtitle && /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 truncate", children: subtitle })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => toast.dismiss(t.id),
            className: "text-slate-400 hover:text-slate-600 text-lg leading-none px-1 shrink-0",
            "aria-label": "Dismiss",
            children: "×"
          }
        )
      ]
    }
  );
}
function notifyCallStarted(leadName) {
  if (!leadName?.trim()) return;
  toast.custom(
    (t) => /* @__PURE__ */ jsx(
      ToastShell,
      {
        t,
        icon: Phone,
        iconClass: "bg-emerald-50 border border-emerald-100 text-emerald-600",
        title: "Call Assistant ready",
        subtitle: leadName.trim()
      }
    ),
    { id: CALL_TOAST_ID, duration: 3500 }
  );
}
const EMP_TOAST_OPTIONS = {
  duration: 3500,
  style: {
    padding: "12px 16px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    background: "#fff",
    color: "#0f172a",
    boxShadow: "0 12px 32px rgba(15, 23, 42, 0.12)",
    fontSize: "13px",
    fontWeight: 600,
    maxWidth: "360px"
  },
  success: {
    iconTheme: { primary: "#059669", secondary: "#fff" }
  },
  error: {
    iconTheme: { primary: "#dc2626", secondary: "#fff" }
  }
};
function EmployeeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const navigate = useNavigate();
  const quickActions2 = [
    { label: "Add Lead", to: "/employee/leads?action=add", icon: Plus },
    { label: "Add Task", to: "/employee/tasks?action=add", icon: CheckSquare },
    { label: "Schedule Follow-up", to: "/employee/follow-ups?action=add", icon: MessageSquare },
    { label: "Log Call", to: "/employee/calls", icon: Phone },
    { label: "Book Meeting", to: "/employee/meetings?action=add", icon: Calendar }
  ];
  return /* @__PURE__ */ jsx(EmployeeProvider, { children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen w-full max-w-[100vw] overflow-x-clip", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right", gutter: 12, containerStyle: { top: 16, right: 16 }, toastOptions: EMP_TOAST_OPTIONS }),
    /* @__PURE__ */ jsx(
      EmployeeSidebar,
      {
        open: sidebarOpen,
        onClose: () => setSidebarOpen(false),
        collapsed,
        onToggleCollapse: () => setCollapsed((c) => !c)
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 flex flex-col w-full max-w-full overflow-x-clip", children: [
      /* @__PURE__ */ jsx(EmployeeTopbar, { onMenu: () => setSidebarOpen(true) }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 bg-white text-slate-900 p-3 sm:p-4 md:p-6 lg:p-8 xl:px-10 pb-28 lg:pb-8 page-shell overflow-x-clip relative", children: /* @__PURE__ */ jsx(Outlet, { context: { toast: (msg, type = "success") => type === "error" ? toast.error(msg) : toast.success(msg) } }) }),
      /* @__PURE__ */ jsx(EmployeeMobileNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setFabOpen(!fabOpen),
            className: "lg:hidden fixed bottom-[4.25rem] right-3 sm:right-4 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full gradient-primary text-primary-foreground shadow-glow grid place-items-center hover:opacity-90 transition",
            "aria-label": "Quick actions",
            children: /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5 sm:w-6 sm:h-6" })
          }
        ),
        fabOpen && /* @__PURE__ */ jsx("div", { className: "lg:hidden fixed bottom-[7.5rem] sm:bottom-32 right-3 sm:right-4 z-40 w-52 sm:w-56 glass-strong rounded-xl border border-border shadow-elegant p-1 space-y-0.5 animate-fade-in", children: quickActions2.map((action) => {
          const Icon = action.icon;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setFabOpen(false);
                navigate(action.to);
              },
              className: "w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-foreground hover:bg-secondary/60 transition",
              children: [
                /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 text-primary shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: action.label })
              ]
            },
            action.label
          );
        }) })
      ] })
    ] })
  ] }) });
}
function PageLoader() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-[40vh] items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full border-2 border-rose-200 border-t-[#be123c] animate-spin" }),
    /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider", children: "Loading" })
  ] }) });
}
const Dashboard = lazy(() => import("./Dashboard-Bo23qT78.js"));
const SOP = lazy(() => import("./SOP-CbGeUxx1.js"));
const Sales = lazy(() => import("./Sales-CwIBws5e.js"));
const Team = lazy(() => import("./Team-Bfw9FwmF.js"));
const Reports = lazy(() => import("./Reports-CQg3RyI_.js"));
const Incentives = lazy(() => import("./Incentives-DenGeP_x.js"));
const Settings = lazy(() => import("./Settings-BtXtzcU4.js"));
const Admin = lazy(() => import("./Admin-1j2JHbyk.js"));
const Leads = lazy(() => import("./Leads-CGbZhMvA.js"));
const Forms = lazy(() => import("./Forms-DFSGcXIK.js"));
const Services = lazy(() => import("./Services-BRazw6cw.js"));
const Pipeline = lazy(() => import("./Pipeline-BcTuSGsd.js"));
const EmployeeDashboard = lazy(() => import("./EmployeeDashboard-DAWCO-sw.js"));
const EmployeeTasks = lazy(() => import("./EmployeeTasks-DEtka08q.js"));
const EmployeeFollowUps = lazy(() => import("./EmployeeFollowUps-DjoZ1a8G.js"));
const EmployeeCalls = lazy(() => import("./EmployeeCalls-C9ioz-NG.js"));
const EmployeeCallDetail = lazy(() => import("./EmployeeCallDetail-BLJKPgwn.js"));
const EmployeeLeads = lazy(() => import("./EmployeeLeads-1DNtLHbS.js"));
const EmployeeSalesProcess = lazy(() => import("./EmployeeSalesProcess-BvUCe4bq.js"));
const EmployeeSopDetail = lazy(() => import("./EmployeeSopDetail-Y4tjAttw.js"));
const EmployeeCallAssistant = lazy(() => import("./EmployeeCallAssistant-D0kzb6GO.js"));
const EmployeeAssets = lazy(() => import("./EmployeeAssets-CmhMg0jb.js"));
const EmployeeMeetings = lazy(() => import("./EmployeeMeetings-7FmnuDIV.js"));
const EmployeeProfile = lazy(() => import("./EmployeeProfile-YTyTjBkw.js"));
const EmployeePipeline = lazy(() => import("./EmployeePipeline-CxqpAFbE.js"));
function App() {
  return /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(PageLoader, {}), children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsxs(Route, { element: /* @__PURE__ */ jsx(AppLayout, {}), children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Dashboard, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/sop", element: /* @__PURE__ */ jsx(SOP, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/sales", element: /* @__PURE__ */ jsx(Sales, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/team", element: /* @__PURE__ */ jsx(Team, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/reports", element: /* @__PURE__ */ jsx(Reports, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/incentives", element: /* @__PURE__ */ jsx(Incentives, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/settings", element: /* @__PURE__ */ jsx(Settings, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/admin", element: /* @__PURE__ */ jsx(Admin, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/leads", element: /* @__PURE__ */ jsx(Leads, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/pipeline", element: /* @__PURE__ */ jsx(Pipeline, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/forms/*", element: /* @__PURE__ */ jsx(Forms, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/services/*", element: /* @__PURE__ */ jsx(Services, {}) })
    ] }),
    /* @__PURE__ */ jsxs(Route, { path: "/employee", element: /* @__PURE__ */ jsx(EmployeeLayout, {}), children: [
      /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(EmployeeDashboard, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "tasks", element: /* @__PURE__ */ jsx(EmployeeTasks, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "follow-ups", element: /* @__PURE__ */ jsx(EmployeeFollowUps, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "calls", element: /* @__PURE__ */ jsx(EmployeeCalls, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "call-detail", element: /* @__PURE__ */ jsx(EmployeeCallDetail, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "leads", element: /* @__PURE__ */ jsx(EmployeeLeads, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "pipeline", element: /* @__PURE__ */ jsx(EmployeePipeline, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "sales-process", element: /* @__PURE__ */ jsx(EmployeeSalesProcess, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "sales-process/:sopId", element: /* @__PURE__ */ jsx(EmployeeSopDetail, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "call-assistant", element: /* @__PURE__ */ jsx(EmployeeCallAssistant, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "assets", element: /* @__PURE__ */ jsx(EmployeeAssets, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "meetings", element: /* @__PURE__ */ jsx(EmployeeMeetings, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "profile", element: /* @__PURE__ */ jsx(EmployeeProfile, {}) })
    ] }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true }) })
  ] }) }) });
}
function ClientApp() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  return /* @__PURE__ */ jsx(App, {});
}
const $ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  component: ClientApp
}, Symbol.toStringTag, { value: "Module" }));
export {
  $,
  AdminDoodleAvatar as A,
  apiLeadToAdmin as B,
  apiPost as C,
  apiPut as D,
  EMP_ACTIVITY as E,
  findEmpTeamMember as F,
  formatEmpPipelineValue as G,
  formatTaskDeadlineTime as H,
  generateGoogleMeetLink as I,
  getAdminCrmHeaders as J,
  getEmpPipelineSummary as K,
  LEAD_STATUS_LABELS as L,
  MEETING_PLATFORMS as M,
  getEmpStageMeta as N,
  groupEmpLeadsKanban as O,
  PERIOD_PILL_BTN as P,
  invalidateCache as Q,
  isTaskAssignedToEmployee as R,
  SEGMENT_BTN as S,
  mapEmpLeadKanbanStage as T,
  notifyCallStarted as U,
  readCachedJson as V,
  unwrapApiData as W,
  useAdmin as X,
  useDateRange as Y,
  useEmployee as Z,
  EMP_AGENDA as a,
  EMP_APP_TODAY as b,
  EMP_ASSETS as c,
  EMP_CALLS as d,
  EMP_CALL_STATS as e,
  EMP_KANBAN_STAGES as f,
  EMP_LEADS as g,
  EMP_LEAD_TEMPERATURES as h,
  EMP_MEETINGS_HISTORY as i,
  EMP_MEETINGS_UPCOMING as j,
  EMP_PIPELINE as k,
  EMP_SOP_CHECKLIST as l,
  EMP_SOP_CROSS as m,
  EMP_SOP_SCRIPTS as n,
  EMP_SOURCE_CHART as o,
  EMP_TEAM as p,
  EMP_TEAM_CALL as q,
  EmployeeDoodleAvatar as r,
  LOCAL_SOPS as s,
  PERIOD_PILL_INACTIVE as t,
  SEGMENT_BTN_ACTIVE as u,
  SEGMENT_BTN_INACTIVE as v,
  SEGMENT_WRAP as w,
  apiDelete as x,
  apiEmployeeToAdmin as y,
  apiGet as z
};
