import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, Shield, Users, Activity, Smartphone, Laptop, Globe, ExternalLink } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { B as Badge } from "./Primitives-CmGbnOU9.js";
import { D as DashboardScrollbarStyles, A as AdminProfileHeader, S as SettingsMobileTabs, c as SettingsSidebar, b as SettingsPanel, a as PanelSection, l as labelClass, i as inputClass, P as PanelFooter } from "./SettingsLayout-B-65zgtQ.js";
import { X as useAdmin } from "./_-BNdSRMjW.js";
import "framer-motion";
import "@tanstack/react-query";
import "react-dom";
const tabs = [
  { id: "profile", label: "Profile", icon: BadgeCheck },
  { id: "security", label: "Sign-in & Security", icon: Shield },
  { id: "access", label: "Access & Permissions", icon: Users },
  { id: "activity", label: "Recent Activity", icon: Activity }
];
function GoogleIcon() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", className: "w-5 h-5", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" }),
    /* @__PURE__ */ jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
    /* @__PURE__ */ jsx("path", { fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }),
    /* @__PURE__ */ jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })
  ] });
}
function Admin() {
  const { admin, updateAdmin, connectGoogle, disconnectGoogle } = useAdmin();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileDirty, setProfileDirty] = useState(false);
  const [draft, setDraft] = useState({
    fullName: admin.fullName,
    email: admin.email,
    phone: admin.phone,
    city: admin.city,
    department: admin.department,
    timezone: admin.timezone
  });
  const updateDraft = (key, value) => {
    setDraft((p) => ({ ...p, [key]: value }));
    setProfileDirty(true);
  };
  const resetDraft = () => {
    setDraft({
      fullName: admin.fullName,
      email: admin.email,
      phone: admin.phone,
      city: admin.city,
      department: admin.department,
      timezone: admin.timezone
    });
    setProfileDirty(false);
  };
  const handleSaveProfile = () => {
    updateAdmin({
      ...draft,
      initials: draft.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    });
    setProfileDirty(false);
    toast.success("Admin profile updated");
  };
  const handleGoogleConnect = () => {
    connectGoogle();
    toast.success("Google account connected (demo — wire OAuth next)");
  };
  const handleGoogleDisconnect = () => {
    disconnectGoogle();
    toast("Google account disconnected", { icon: "ℹ️" });
  };
  const auditEntries = [
    { id: 1, action: "Published incentive rule config v2.3", time: "Today, 10:14 AM" },
    { id: 2, action: "Added team member — Siddharth Mehta", time: "Yesterday, 4:32 PM" },
    { id: 3, action: "Updated KPI weightages for Sales team", time: "Jun 17, 2026" },
    { id: 4, action: "Exported monthly performance report", time: "Jun 15, 2026" }
  ];
  const profileFields = [
    { key: "fullName", label: "Full Name" },
    { key: "email", label: "Work Email" },
    { key: "phone", label: "Phone Number" },
    { key: "city", label: "City" },
    { key: "department", label: "Department" },
    { key: "timezone", label: "Timezone" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6 page-shell min-w-0", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
    /* @__PURE__ */ jsx(DashboardScrollbarStyles, {}),
    /* @__PURE__ */ jsx(AdminProfileHeader, {}),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 sm:gap-6 min-w-0", children: [
      /* @__PURE__ */ jsx(
        SettingsMobileTabs,
        {
          tabs,
          activeTab,
          onTabChange: setActiveTab
        }
      ),
      /* @__PURE__ */ jsx(
        SettingsSidebar,
        {
          title: "Admin Control",
          subtitle: "Manage account, access & security",
          tabs,
          activeTab,
          onTabChange: setActiveTab
        }
      ),
      /* @__PURE__ */ jsxs(
        SettingsPanel,
        {
          footer: activeTab === "profile" ? /* @__PURE__ */ jsx(
            PanelFooter,
            {
              left: /* @__PURE__ */ jsx(Badge, { tone: profileDirty ? "warning" : "muted", children: profileDirty ? "Unsaved profile changes" : "Profile synchronized" }),
              actions: /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: resetDraft,
                    className: "flex-1 sm:flex-initial px-4 py-2 border border-rose-200 hover:border-rose-400 text-[#be123c] rounded-xl text-xs font-bold transition-all shadow-sm bg-white",
                    children: "Reset"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleSaveProfile,
                    className: "flex-1 sm:flex-initial px-4 py-2 bg-[#be123c] hover:bg-[#a20f32] text-white rounded-xl text-xs font-bold transition-all shadow-md active:translate-y-px",
                    children: "Save Profile"
                  }
                )
              ] })
            }
          ) : null,
          children: [
            activeTab === "profile" && /* @__PURE__ */ jsx(
              PanelSection,
              {
                title: "Admin Profile",
                subtitle: "Your identity across the TS Publication workspace",
                children: /* @__PURE__ */ jsxs("div", { className: "p-4 border border-rose-100/50 rounded-2xl bg-white space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pb-2 border-b border-slate-100", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-[#be123c] uppercase", children: "Personal details" }),
                    /* @__PURE__ */ jsx(Badge, { tone: "primary", children: admin.role })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: profileFields.map(({ key, label }) => /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: labelClass, children: label }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        value: draft[key],
                        onChange: (e) => updateDraft(key, e.target.value),
                        className: inputClass
                      }
                    )
                  ] }, key)) })
                ] })
              }
            ),
            activeTab === "security" && /* @__PURE__ */ jsxs(
              PanelSection,
              {
                title: "Sign-in & Security",
                subtitle: "Authentication is handled via Google OAuth — no passwords stored in this app",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "p-4 border border-rose-100/50 rounded-2xl bg-slate-50/50", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-white border border-slate-200 grid place-items-center shrink-0 shadow-sm", children: /* @__PURE__ */ jsx(GoogleIcon, {}) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-slate-800 uppercase", children: "Google Account" }),
                      /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-500 mt-1", children: admin.googleConnected ? `Signed in as ${admin.googleEmail}` : "Connect your Google account to sign in securely" })
                    ] }),
                    admin.googleConnected ? /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleGoogleDisconnect,
                        className: "px-4 py-2 border border-rose-200 text-[#be123c] rounded-xl text-xs font-bold bg-white hover:bg-rose-50 shrink-0",
                        children: "Disconnect"
                      }
                    ) : /* @__PURE__ */ jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: handleGoogleConnect,
                        className: "inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 shrink-0",
                        children: [
                          /* @__PURE__ */ jsx(GoogleIcon, {}),
                          "Connect with Google"
                        ]
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsxs("div", { className: "p-4 border border-amber-100 rounded-2xl bg-amber-50/60", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-amber-800 uppercase", children: "Password login removed" }),
                    /* @__PURE__ */ jsx("p", { className: "text-[11px] text-amber-700/90 mt-1 leading-relaxed", children: "This workspace no longer uses email/password credentials. All admin access will flow through Google OAuth once you wire the backend callback." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase", children: "Active sessions" }),
                    admin.sessions.map((session) => /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "flex items-center justify-between gap-3 p-3 rounded-xl border border-rose-100/50 bg-white",
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                            /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-rose-50 text-rose-600 grid place-items-center shrink-0", children: session.device.includes("iPhone") ? /* @__PURE__ */ jsx(Smartphone, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Laptop, { className: "w-4 h-4" }) }),
                            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-800 truncate", children: session.device }),
                              /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-slate-400 flex items-center gap-1", children: [
                                /* @__PURE__ */ jsx(Globe, { className: "w-3 h-3" }),
                                session.location,
                                " · ",
                                session.lastActive
                              ] })
                            ] })
                          ] }),
                          session.current && /* @__PURE__ */ jsx(Badge, { tone: "success", children: "Current" })
                        ]
                      },
                      session.id
                    ))
                  ] })
                ]
              }
            ),
            activeTab === "access" && /* @__PURE__ */ jsxs(
              PanelSection,
              {
                title: "Access & Permissions",
                subtitle: "What this admin account can do in the CRM",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "p-4 border border-rose-100/50 rounded-2xl bg-slate-50/50", children: [
                      /* @__PURE__ */ jsx("p", { className: labelClass, children: "Role" }),
                      /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-slate-900", children: admin.role }),
                      /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-500 mt-1", children: "Highest workspace privilege tier" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "p-4 border border-rose-100/50 rounded-2xl bg-white", children: [
                      /* @__PURE__ */ jsx("p", { className: labelClass, children: "Workspace" }),
                      /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-slate-900", children: "TS Publication" }),
                      /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-500 mt-1", children: "Enterprise CRM dashboard" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: labelClass, children: "Granted permissions" }),
                    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: admin.permissions.map((perm) => /* @__PURE__ */ jsxs(
                      "span",
                      {
                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold\n                                 bg-rose-50 text-rose-800 border border-rose-100",
                        children: [
                          /* @__PURE__ */ jsx(BadgeCheck, { className: "w-3 h-3 text-rose-600" }),
                          perm
                        ]
                      },
                      perm
                    )) })
                  ] })
                ]
              }
            ),
            activeTab === "activity" && /* @__PURE__ */ jsxs(
              PanelSection,
              {
                title: "Recent Admin Activity",
                subtitle: "Latest changes made under this account",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "space-y-2", children: auditEntries.map((entry) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "flex items-start justify-between gap-4 p-3 rounded-xl border border-rose-100/50 bg-white hover:bg-rose-50/30 transition",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
                          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-rose-50 text-rose-600 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(Activity, { className: "w-4 h-4" }) }),
                          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-800", children: entry.action })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400 whitespace-nowrap shrink-0", children: entry.time })
                      ]
                    },
                    entry.id
                  )) }),
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      to: "/settings",
                      className: "inline-flex items-center gap-1.5 text-xs font-bold text-[#be123c] hover:text-[#a20f32] mt-2",
                      children: [
                        "View full audit trail in Settings",
                        /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3" })
                      ]
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  Admin as default
};
