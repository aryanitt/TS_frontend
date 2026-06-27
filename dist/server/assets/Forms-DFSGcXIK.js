import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useSearchParams, Link, useParams, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Wrench, Plus, GripVertical, ChevronDown, Pencil, Trash2, ClipboardList, Users, CheckCircle2, Star, Search, Filter, MessageCircle, Linkedin, Globe, Instagram, MousePointerClick, Eye, Pause, Play, Flame, Clock, DollarSign, Calendar, Download, ChevronLeft, ChevronRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { D as Drawer, a as StatCard, G as GlassCard, B as Badge } from "./Primitives-CmGbnOU9.js";
import { A as AddLeadDrawer } from "./AddLeadDrawer-2QdzJ1Rt.js";
import "framer-motion";
import "./_-BNdSRMjW.js";
import "@tanstack/react-query";
import "react-dom";
const FORM_SOURCES = [
  { id: "all", label: "All Sources" },
  { id: "google_ads", label: "Google Ads" },
  { id: "instagram", label: "Instagram" },
  { id: "website", label: "Website" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "whatsapp", label: "WhatsApp" }
];
const FORM_STATUSES = [
  { id: "all", label: "All Statuses" },
  { id: "ACTIVE", label: "Active" },
  { id: "PAUSED", label: "Paused" },
  { id: "DRAFT", label: "Draft" }
];
const FORM_SERVICES = [
  { id: "all", label: "All Services" },
  { id: "AI Automation", label: "AI Automation" },
  { id: "CRM Setup", label: "CRM Setup" },
  { id: "Lead Gen", label: "Lead Gen" },
  { id: "Consulting", label: "Consulting" }
];
const DEFAULT_FORM_FIELDS = [
  { id: "f1", label: "Full Name", type: "INPUT", required: true },
  { id: "f2", label: "Email Address", type: "EMAIL", required: true },
  { id: "f3", label: "Interested Service", type: "DROPDOWN", required: true, options: ["AI Automation", "CRM Setup", "Lead Gen", "Consulting"] },
  { id: "f4", label: "Phone Number", type: "PHONE", required: false },
  { id: "f5", label: "Message / Notes", type: "TEXTAREA", required: false }
];
const FORMS = [
  {
    id: "google-ads",
    name: "Google Ads Form",
    source: "Google Ads",
    sourceKey: "google_ads",
    status: "ACTIVE",
    leads: 1284,
    revenue: 425e3,
    conversion: 18,
    service: "AI Automation",
    fields: DEFAULT_FORM_FIELDS
  },
  {
    id: "instagram-leads",
    name: "Instagram Leads",
    source: "Instagram",
    sourceKey: "instagram",
    status: "ACTIVE",
    leads: 842,
    revenue: 218e3,
    conversion: 14,
    service: "Lead Gen",
    fields: DEFAULT_FORM_FIELDS
  },
  {
    id: "website-contact",
    name: "Website Contact",
    source: "Website",
    sourceKey: "website",
    status: "PAUSED",
    leads: 456,
    revenue: 98e3,
    conversion: 11,
    service: "CRM Setup",
    fields: DEFAULT_FORM_FIELDS.slice(0, 4)
  },
  {
    id: "linkedin-b2b",
    name: "LinkedIn B2B",
    source: "LinkedIn",
    sourceKey: "linkedin",
    status: "ACTIVE",
    leads: 312,
    revenue: 156e3,
    conversion: 22,
    service: "Consulting",
    fields: DEFAULT_FORM_FIELDS
  },
  {
    id: "whatsapp-inbound",
    name: "WhatsApp Inbound",
    source: "WhatsApp",
    sourceKey: "whatsapp",
    status: "DRAFT",
    leads: 0,
    revenue: 0,
    conversion: 0,
    service: "Lead Gen",
    fields: DEFAULT_FORM_FIELDS.slice(0, 3)
  },
  {
    id: "meta-retarget",
    name: "Meta Retarget Form",
    source: "Google Ads",
    sourceKey: "google_ads",
    status: "ACTIVE",
    leads: 967,
    revenue: 312e3,
    conversion: 16,
    service: "AI Automation",
    fields: DEFAULT_FORM_FIELDS
  }
];
const FORM_LEADS = {
  "google-ads": [
    { id: 1, name: "Rahul Sharma", email: "rahul@techcorp.in", service: "AI Automation", budget: 85e3, status: "NEW", agent: "Sarah Chen", revenue: 85e3, created: "2026-06-18" },
    { id: 2, name: "Priya Mehta", email: "priya.m@startup.io", service: "CRM Setup", budget: 42e3, status: "QUALIFIED", agent: "James Wilson", revenue: 42e3, created: "2026-06-17" },
    { id: 3, name: "Amit Patel", email: "amit@enterprise.com", service: "AI Automation", budget: 12e4, status: "CONTACTED", agent: "Emily Davis", revenue: 12e4, created: "2026-06-17" },
    { id: 4, name: "Neha Gupta", email: "neha@scaleup.co", service: "Lead Gen", budget: 35e3, status: "NEW", agent: "Unassigned", revenue: 35e3, created: "2026-06-16" },
    { id: 5, name: "Vikram Singh", email: "vikram@corp.in", service: "Consulting", budget: 95e3, status: "QUALIFIED", agent: "Suresh Kumar", revenue: 95e3, created: "2026-06-16" },
    { id: 6, name: "Anita Desai", email: "anita@brand.com", service: "AI Automation", budget: 68e3, status: "CONVERTED", agent: "Sarah Chen", revenue: 68e3, created: "2026-06-15" },
    { id: 7, name: "Karan Malhotra", email: "karan@saas.io", service: "CRM Setup", budget: 52e3, status: "CONTACTED", agent: "James Wilson", revenue: 52e3, created: "2026-06-15" },
    { id: 8, name: "Sneha Reddy", email: "sneha@fintech.in", service: "Lead Gen", budget: 28e3, status: "NEW", agent: "Unassigned", revenue: 28e3, created: "2026-06-14" },
    { id: 9, name: "Arjun Nair", email: "arjun@cloud.com", service: "AI Automation", budget: 11e4, status: "QUALIFIED", agent: "Emily Davis", revenue: 11e4, created: "2026-06-14" },
    { id: 10, name: "Divya Iyer", email: "divya@agency.co", service: "Consulting", budget: 74e3, status: "HOT", agent: "Suresh Kumar", revenue: 74e3, created: "2026-06-13" }
  ]
};
function formatFormRevenue(val) {
  if (val >= 1e5) return `$${(val / 1e5).toFixed(1)}L`;
  if (val >= 1e3) return `$${(val / 1e3).toFixed(1)}K`;
  return `$${val}`;
}
function getFormById(id) {
  return FORMS.find((f) => f.id === id) || null;
}
function getFormLeads(formId) {
  return FORM_LEADS[formId] || FORM_LEADS["google-ads"] || [];
}
function getFormsSummary(forms = FORMS) {
  const active = forms.filter((f) => f.status === "ACTIVE").length;
  const totalLeads = forms.reduce((s, f) => s + f.leads, 0);
  const topSource = [...forms].sort((a, b) => b.leads - a.leads)[0]?.source || "—";
  return {
    totalForms: forms.length,
    totalLeads,
    activeForms: active,
    topSource
  };
}
const FIELD_TYPES = ["INPUT", "EMAIL", "PHONE", "DROPDOWN", "TEXTAREA", "NUMBER"];
function fieldMeta(field) {
  const req = field.required ? "REQUIRED" : "OPTIONAL";
  if (field.type === "DROPDOWN") return `DROPDOWN • ${field.required ? "SELECT OPTION" : "OPTIONAL"}`;
  return `${field.type} • ${req}`;
}
function FormBuilderDrawer({ open, onClose, formId }) {
  const existing = formId ? getFormById(formId) : null;
  const isEdit = Boolean(existing);
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const [dragIdx, setDragIdx] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editField, setEditField] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newField, setNewField] = useState({ label: "", type: "INPUT", required: false });
  useEffect(() => {
    if (!open) return;
    setFormName(existing?.name || "");
    setFields(
      existing?.fields?.map((f) => ({ ...f })) || DEFAULT_FORM_FIELDS.map((f) => ({ ...f }))
    );
    setDragIdx(null);
    setEditOpen(false);
    setAddOpen(false);
    setEditField(null);
    setNewField({ label: "", type: "INPUT", required: false });
  }, [open, formId, existing?.name, existing?.fields]);
  const moveField = (from, to) => {
    if (to < 0 || to >= fields.length) return;
    setFields((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };
  const deleteField = (id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    toast.success("Field removed");
  };
  const saveFieldEdit = () => {
    if (!editField?.label?.trim()) return;
    setFields((prev) => prev.map((f) => f.id === editField.id ? { ...editField } : f));
    setEditOpen(false);
    toast.success("Field updated");
  };
  const addField = () => {
    if (!newField.label.trim()) return;
    setFields((prev) => [
      ...prev,
      {
        id: `f${Date.now()}`,
        label: newField.label,
        type: newField.type,
        required: newField.required,
        ...newField.type === "DROPDOWN" ? { options: ["Option 1", "Option 2"] } : {}
      }
    ]);
    setAddOpen(false);
    setNewField({ label: "", type: "INPUT", required: false });
    toast.success("Field added");
  };
  const handleSaveDraft = () => {
    toast.success(isEdit ? "Draft saved" : "Form saved as draft");
  };
  const handlePublish = () => {
    if (!formName.trim()) {
      toast.error("Enter a form name");
      return;
    }
    toast.success(isEdit ? "Form updated" : "Form published");
    onClose?.(true);
  };
  const drawerTitle = isEdit ? `Edit · ${existing?.name || "Form"}` : "Create Form";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Drawer, { open, onClose: () => onClose?.(), title: drawerTitle, width: "drawer-panel", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mb-4 pb-3 border-b border-rose-50", children: "Architect your form fields and publish when ready" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-5", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleSaveDraft,
            className: "flex-1 sm:flex-initial px-4 py-2 rounded-xl border border-rose-200 bg-white text-slate-700 text-xs font-bold hover:bg-rose-50 transition",
            children: "Save Draft"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handlePublish,
            className: "flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-rose-700 text-white text-xs font-bold hover:bg-rose-800 shadow-sm transition",
            children: "Publish Form"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-100 bg-[#fffbfb] p-4 mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5", children: "Form Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: formName,
            onChange: (e) => setFormName(e.target.value),
            placeholder: "e.g. Google Ads Form",
            className: "w-full px-4 py-2.5 rounded-xl border border-rose-100 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-rose-400"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-100 bg-[#fffbfb] p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4 gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsx(Wrench, { className: "w-4 h-4 text-rose-600 shrink-0" }),
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-extrabold text-slate-800 truncate", children: "Form Builder" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setAddOpen(true),
              className: "inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-800 shrink-0",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
                "Add Field"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: fields.map((field, idx) => /* @__PURE__ */ jsxs(
          "div",
          {
            draggable: true,
            onDragStart: () => setDragIdx(idx),
            onDragOver: (e) => e.preventDefault(),
            onDrop: () => {
              if (dragIdx !== null && dragIdx !== idx) moveField(dragIdx, idx);
              setDragIdx(null);
            },
            className: `flex items-center gap-3 rounded-xl border p-3.5 bg-white transition ${dragIdx === idx ? "border-rose-400 shadow-md" : "border-rose-100 hover:border-rose-200"}`,
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing shrink-0",
                  "aria-label": "Reorder",
                  children: /* @__PURE__ */ jsx(GripVertical, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900 truncate", children: field.label }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold text-slate-400 uppercase tracking-wide mt-0.5", children: fieldMeta(field) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
                field.type === "DROPDOWN" ? /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-slate-400" }) : /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setEditField({ ...field });
                      setEditOpen(true);
                    },
                    className: "w-8 h-8 rounded-lg hover:bg-rose-50 text-slate-500 grid place-items-center",
                    children: /* @__PURE__ */ jsx(Pencil, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => deleteField(field.id),
                    className: "w-8 h-8 rounded-lg hover:bg-rose-50 text-rose-500 grid place-items-center",
                    children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                )
              ] })
            ]
          },
          field.id
        )) }),
        fields.length === 0 && /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-dashed border-rose-200 p-8 text-center text-sm text-slate-500", children: "No fields yet — add your first field above." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Drawer, { nested: true, open: editOpen, onClose: () => setEditOpen(false), title: "Edit Field", width: "drawer-panel", children: editField && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-500 uppercase block mb-1", children: "Label" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            value: editField.label,
            onChange: (e) => setEditField({ ...editField, label: e.target.value }),
            className: "w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-500 uppercase block mb-1", children: "Type" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: editField.type,
            onChange: (e) => setEditField({ ...editField, type: e.target.value }),
            className: "w-full px-3 py-2 rounded-xl border border-slate-200 text-sm",
            children: FIELD_TYPES.map((t) => /* @__PURE__ */ jsx("option", { value: t, children: t }, t))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm text-slate-700", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: editField.required,
            onChange: (e) => setEditField({ ...editField, required: e.target.checked })
          }
        ),
        "Required field"
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: saveFieldEdit, className: "w-full py-2.5 rounded-xl bg-rose-700 text-white text-sm font-bold", children: "Save Field" })
    ] }) }),
    /* @__PURE__ */ jsx(Drawer, { nested: true, open: addOpen, onClose: () => setAddOpen(false), title: "Add Custom Field", width: "drawer-panel", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-500 uppercase block mb-1", children: "Label" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            value: newField.label,
            onChange: (e) => setNewField({ ...newField, label: e.target.value }),
            placeholder: "Field label",
            className: "w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-500 uppercase block mb-1", children: "Type" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: newField.type,
            onChange: (e) => setNewField({ ...newField, type: e.target.value }),
            className: "w-full px-3 py-2 rounded-xl border border-slate-200 text-sm",
            children: FIELD_TYPES.map((t) => /* @__PURE__ */ jsx("option", { value: t, children: t }, t))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm text-slate-700", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: newField.required,
            onChange: (e) => setNewField({ ...newField, required: e.target.checked })
          }
        ),
        "Required field"
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: addField, className: "w-full py-2.5 rounded-xl bg-rose-700 text-white text-sm font-bold", children: "Add Field" })
    ] }) })
  ] });
}
const SOURCE_ICONS = {
  google_ads: MousePointerClick,
  instagram: Instagram,
  website: Globe,
  linkedin: Linkedin,
  whatsapp: MessageCircle
};
function statusTone(status) {
  if (status === "ACTIVE") return "success";
  if (status === "PAUSED") return "warning";
  return "muted";
}
function FormsDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [forms, setForms] = useState(FORMS);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [builderOpen, setBuilderOpen] = useState(false);
  const [builderFormId, setBuilderFormId] = useState(null);
  useEffect(() => {
    const action = searchParams.get("action");
    const formId = searchParams.get("formId");
    if (action === "createForm") {
      setBuilderFormId(null);
      setBuilderOpen(true);
    } else if (action === "editForm" && formId) {
      setBuilderFormId(formId);
      setBuilderOpen(true);
    }
  }, [searchParams]);
  const closeBuilder = () => {
    setBuilderOpen(false);
    setBuilderFormId(null);
    if (searchParams.get("action")) {
      setSearchParams({}, { replace: true });
    }
  };
  const openCreateForm = () => {
    setBuilderFormId(null);
    setBuilderOpen(true);
  };
  const openEditForm = (formId) => {
    setBuilderFormId(formId);
    setBuilderOpen(true);
  };
  const filtered = useMemo(() => {
    return forms.filter((f) => {
      if (sourceFilter !== "all" && f.sourceKey !== sourceFilter) return false;
      if (statusFilter !== "all" && f.status !== statusFilter) return false;
      if (serviceFilter !== "all" && f.service !== serviceFilter) return false;
      if (search.trim() && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [forms, search, sourceFilter, statusFilter, serviceFilter]);
  const summary = useMemo(() => getFormsSummary(forms), [forms]);
  const togglePause = (id) => {
    setForms(
      (prev) => prev.map((f) => {
        if (f.id !== id) return f;
        const next = f.status === "ACTIVE" ? "PAUSED" : "ACTIVE";
        toast.success(`${f.name} ${next === "ACTIVE" ? "activated" : "paused"}`);
        return { ...f, status: next };
      })
    );
  };
  const deleteForm = (id) => {
    setForms((prev) => prev.filter((f) => f.id !== id));
    toast.success("Form removed");
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5 page-shell min-w-0", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Total Forms", value: String(summary.totalForms), change: "+12%", sub: "vs last month", icon: ClipboardList, iconBg: "bg-rose-50", iconColor: "text-rose-600" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Total Leads Generated", value: summary.totalLeads >= 1e3 ? `${(summary.totalLeads / 1e3).toFixed(1)}k` : String(summary.totalLeads), change: "+18%", sub: "all forms", icon: Users, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Active Forms", value: String(summary.activeForms), icon: CheckCircle2, iconBg: "bg-sky-50", iconColor: "text-sky-600", hover: false }),
      /* @__PURE__ */ jsx(StatCard, { label: "Top Performing Source", value: summary.topSource, icon: Star, iconBg: "bg-amber-50", iconColor: "text-amber-600", hover: false })
    ] }),
    /* @__PURE__ */ jsx(GlassCard, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Filter by name...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: [
        [
          { value: sourceFilter, set: setSourceFilter, opts: FORM_SOURCES },
          { value: statusFilter, set: setStatusFilter, opts: FORM_STATUSES },
          { value: serviceFilter, set: setServiceFilter, opts: FORM_SERVICES }
        ].map(({ value, set, opts }, i) => /* @__PURE__ */ jsx(
          "select",
          {
            value,
            onChange: (e) => set(e.target.value),
            className: "rounded-xl border border-slate-200 bg-white text-slate-800 text-xs font-semibold py-2.5 px-3 outline-none focus:border-rose-400",
            children: opts.map((o) => /* @__PURE__ */ jsx("option", { value: o.id, children: o.label }, o.id))
          },
          i
        )),
        /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-xs font-semibold gap-1.5", children: [
          /* @__PURE__ */ jsx(Filter, { className: "w-3.5 h-3.5" }),
          "Filters"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3", children: filtered.map((form) => {
      const Icon = SOURCE_ICONS[form.sourceKey] || ClipboardList;
      return /* @__PURE__ */ jsxs(GlassCard, { hover: true, className: "p-3.5 sm:p-4 flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-slate-900 truncate", children: form.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-[9px] text-slate-500 mt-0.5 truncate", children: [
                "Source: ",
                form.source
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Badge, { tone: statusTone(form.status), children: form.status })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-1.5 mb-3 flex-1", children: [
          ["Leads", form.leads.toLocaleString()],
          ["Revenue", formatFormRevenue(form.revenue)],
          ["Conversion", `${form.conversion}%`],
          ["Service", form.service]
        ].map(([label, val]) => /* @__PURE__ */ jsxs("div", { className: "rounded-md bg-slate-50/80 border border-slate-100 px-2 py-1.5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[8px] font-bold text-slate-400 uppercase leading-none", children: label }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-slate-800 mt-1 truncate", children: val })
        ] }, label)) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2.5 border-t border-rose-50", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: `/forms/${form.id}`,
              className: "inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 hover:text-rose-800",
              children: [
                /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3" }),
                "View Leads"
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0.5", children: [
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => openEditForm(form.id), className: "w-7 h-7 rounded-md hover:bg-rose-50 text-slate-500 hover:text-rose-700 grid place-items-center", title: "Edit", children: /* @__PURE__ */ jsx(Pencil, { className: "w-3 h-3" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => togglePause(form.id), className: "w-7 h-7 rounded-md hover:bg-rose-50 text-slate-500 hover:text-rose-700 grid place-items-center", title: form.status === "ACTIVE" ? "Pause" : "Activate", children: form.status === "ACTIVE" ? /* @__PURE__ */ jsx(Pause, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(Play, { className: "w-3 h-3" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => deleteForm(form.id), className: "w-7 h-7 rounded-md hover:bg-rose-50 text-rose-500 hover:text-rose-700 grid place-items-center", title: "Delete", children: /* @__PURE__ */ jsx(Trash2, { className: "w-3 h-3" }) })
          ] })
        ] })
      ] }, form.id);
    }) }),
    filtered.length === 0 && /* @__PURE__ */ jsxs(GlassCard, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-600", children: "No forms match your filters" }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: openCreateForm, className: "mt-3 text-xs font-bold text-rose-700 hover:underline", children: "Create your first form" })
    ] }),
    /* @__PURE__ */ jsx(FormBuilderDrawer, { open: builderOpen, onClose: closeBuilder, formId: builderFormId })
  ] });
}
const LEAD_STATUS_TONE = {
  NEW: "info",
  HOT: "danger",
  QUALIFIED: "purple",
  CONTACTED: "warning",
  CONVERTED: "success"
};
const PAGE_SIZE = 8;
function mapLeadToFormRow(newLead, fallbackService) {
  const revenue = Number(newLead.expected_revenue) || 0;
  return {
    id: newLead.id ?? newLead._id ?? Date.now(),
    name: newLead.lead_name || newLead.name || "Unknown",
    email: newLead.email || "",
    service: newLead.interested_service || newLead.service || fallbackService || "—",
    budget: revenue,
    status: "NEW",
    agent: "Unassigned",
    revenue,
    created: (newLead.created_at || newLead.created || (/* @__PURE__ */ new Date()).toISOString()).split("T")[0]
  };
}
function FormLeads() {
  const { formId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const form = getFormById(formId);
  const baseLeads = useMemo(() => getFormLeads(formId), [formId]);
  const [extraLeads, setExtraLeads] = useState([]);
  const allLeads = useMemo(() => [...extraLeads, ...baseLeads], [extraLeads, baseLeads]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  useEffect(() => {
    if (searchParams.get("action") === "addLead") setAddOpen(true);
  }, [searchParams]);
  const handleAddClose = (newLead) => {
    if (newLead) {
      setExtraLeads((prev) => [mapLeadToFormRow(newLead, form?.service), ...prev]);
      toast.success("Lead added to form");
    }
    setAddOpen(false);
    if (searchParams.get("action")) {
      setSearchParams({}, { replace: true });
    }
  };
  const filtered = useMemo(() => {
    return allLeads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (serviceFilter !== "all" && l.service !== serviceFilter) return false;
      const q = search.toLowerCase();
      if (q && !l.name.toLowerCase().includes(q) && !l.email.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [allLeads, search, statusFilter, serviceFilter]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageLeads = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const kpis = useMemo(() => {
    const hot = allLeads.filter((l) => l.status === "HOT").length;
    const assigned = allLeads.filter((l) => l.agent !== "Unassigned").length;
    const pending = allLeads.filter((l) => l.status === "NEW").length;
    const converted = allLeads.filter((l) => l.status === "CONVERTED").length;
    const revenue = allLeads.reduce((s, l) => s + l.revenue, 0);
    return {
      total: allLeads.length,
      hot,
      assigned,
      assignedPct: allLeads.length ? Math.round(assigned / allLeads.length * 100) : 0,
      pending,
      converted,
      convertedPct: allLeads.length ? Math.round(converted / allLeads.length * 100) : 0,
      revenue
    };
  }, [allLeads]);
  if (!form) {
    return /* @__PURE__ */ jsxs(GlassCard, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Form not found." }),
      /* @__PURE__ */ jsx(Link, { to: "/forms", className: "text-xs font-bold text-rose-700 mt-2 inline-block", children: "Back to Forms" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5 page-shell min-w-0", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-3", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Total Leads", value: String(kpis.total), change: "+12%", sub: "this month", icon: ClipboardList, iconBg: "bg-rose-50", iconColor: "text-rose-600", hover: false }),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          label: "Hot Leads",
          value: String(kpis.hot),
          change: "Priority",
          sub: "needs action",
          icon: Flame,
          iconBg: "bg-orange-50",
          iconColor: "text-orange-600",
          changeTone: "danger",
          className: "border-rose-200",
          hover: false
        }
      ),
      /* @__PURE__ */ jsx(StatCard, { label: "Assigned", value: String(kpis.assigned), change: `${kpis.assignedPct}%`, sub: "of total", icon: CheckCircle2, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", hover: false }),
      /* @__PURE__ */ jsx(StatCard, { label: "Pending", value: String(kpis.pending), icon: Clock, iconBg: "bg-amber-50", iconColor: "text-amber-600", hover: false }),
      /* @__PURE__ */ jsx(StatCard, { label: "Converted", value: String(kpis.converted), change: `${kpis.convertedPct}%`, sub: "rate", icon: CheckCircle2, iconBg: "bg-sky-50", iconColor: "text-sky-600", hover: false }),
      /* @__PURE__ */ jsx(StatCard, { label: "Revenue Pot.", value: formatFormRevenue(kpis.revenue), change: "Pipeline", sub: "potential", icon: DollarSign, iconBg: "bg-rose-50", iconColor: "text-rose-600", hover: false })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(GlassCard, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:flex-1 sm:min-w-[200px] sm:max-w-[320px]", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300 pointer-events-none" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Filter by name or contact...",
                value: search,
                onChange: (e) => {
                  setSearch(e.target.value);
                  setPage(1);
                },
                className: "w-full h-10 pl-9 pr-3 rounded-xl border border-rose-100 bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-rose-400"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 sm:contents", children: [
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: statusFilter,
                onChange: (e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                },
                className: "w-full sm:w-auto sm:min-w-[118px] h-10 px-3 rounded-xl border border-rose-100 text-xs font-bold text-rose-800 bg-white outline-none focus:border-rose-400",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "all", children: "All Status" }),
                  ["NEW", "HOT", "QUALIFIED", "CONTACTED", "CONVERTED"].map((s) => /* @__PURE__ */ jsx("option", { value: s, children: s }, s))
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "select",
              {
                value: serviceFilter,
                onChange: (e) => {
                  setServiceFilter(e.target.value);
                  setPage(1);
                },
                className: "w-full sm:w-auto sm:min-w-[128px] h-10 px-3 rounded-xl border border-rose-100 text-xs font-bold text-rose-800 bg-white outline-none focus:border-rose-400",
                children: FORM_SERVICES.map((s) => /* @__PURE__ */ jsx("option", { value: s.id, children: s.label }, s.id))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "w-10 h-10 rounded-xl border border-rose-100 bg-white grid place-items-center text-slate-500 hover:bg-rose-50 transition", children: /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "w-10 h-10 rounded-xl border border-rose-100 bg-white grid place-items-center text-slate-500 hover:bg-rose-50 transition", children: /* @__PURE__ */ jsx(Filter, { className: "w-4 h-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0 w-full sm:w-auto", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => toast.success("Export started"),
              className: "flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 h-10 px-3.5 rounded-xl border border-rose-200 bg-white text-rose-800 text-xs font-bold hover:bg-rose-50 transition whitespace-nowrap",
              children: [
                /* @__PURE__ */ jsx(Download, { className: "w-3.5 h-3.5 shrink-0" }),
                "Export Leads"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setAddOpen(true),
              className: "flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 h-10 px-3.5 rounded-xl bg-rose-700 text-white text-xs font-bold hover:bg-rose-800 transition whitespace-nowrap shadow-sm",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5 shrink-0" }),
                "Manual Lead"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs(GlassCard, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "responsive-table-mobile space-y-3 p-4 lg:hidden", children: pageLeads.map((lead) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-100 p-4 bg-white", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-rose-100 text-rose-700 text-xs font-bold grid place-items-center", children: lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900", children: lead.name }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500", children: lead.email })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 text-xs", children: [
            /* @__PURE__ */ jsx(Badge, { tone: LEAD_STATUS_TONE[lead.status] || "muted", children: lead.status }),
            /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: lead.service }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-800", children: formatFormRevenue(lead.revenue) })
          ] })
        ] }, lead.id)) }),
        /* @__PURE__ */ jsx("div", { className: "responsive-table-desktop overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left min-w-[720px]", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: "border-b border-rose-50 bg-[#fffbfb]", children: ["Lead Name", "Service & Budget", "Status", "Agent", "Revenue", "Created"].map((h) => /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-wider", children: h }, h)) }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-rose-50", children: pageLeads.map((lead) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-rose-50/30", children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold grid place-items-center shrink-0", children: lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-900", children: lead.name }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500", children: lead.email })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-xs", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-slate-800", children: lead.service }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: formatFormRevenue(lead.budget) })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(Badge, { tone: LEAD_STATUS_TONE[lead.status] || "muted", children: lead.status }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs font-semibold text-slate-700", children: lead.agent }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs font-bold text-slate-800", children: formatFormRevenue(lead.revenue) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs text-slate-500", children: lead.created })
          ] }, lead.id)) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-rose-50", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-slate-500", children: [
            "Showing ",
            (page - 1) * PAGE_SIZE + 1,
            "–",
            Math.min(page * PAGE_SIZE, filtered.length),
            " of ",
            filtered.length,
            " leads"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("button", { type: "button", disabled: page <= 1, onClick: () => setPage((p) => p - 1), className: "w-8 h-8 rounded-lg border border-slate-200 disabled:opacity-40 grid place-items-center", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" }) }),
            Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((n) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setPage(n),
                className: `w-8 h-8 rounded-lg text-xs font-bold ${page === n ? "bg-rose-700 text-white" : "border border-slate-200 text-slate-600"}`,
                children: n
              },
              n
            )),
            /* @__PURE__ */ jsx("button", { type: "button", disabled: page >= totalPages, onClick: () => setPage((p) => p + 1), className: "w-8 h-8 rounded-lg border border-slate-200 disabled:opacity-40 grid place-items-center", children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      AddLeadDrawer,
      {
        open: addOpen,
        onClose: handleAddClose,
        showToast: (msg, type) => type === "error" ? toast.error(msg) : toast.success(msg),
        title: "Add Manual Lead",
        subtitle: `${form.name} · Source: ${form.source}`
      }
    )
  ] });
}
function EditFormRedirect() {
  const { formId } = useParams();
  return /* @__PURE__ */ jsx(Navigate, { to: `/forms?action=editForm&formId=${formId}`, replace: true });
}
function Forms() {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(FormsDashboard, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "new", element: /* @__PURE__ */ jsx(Navigate, { to: "/forms?action=createForm", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: ":formId/edit", element: /* @__PURE__ */ jsx(EditFormRedirect, {}) }),
    /* @__PURE__ */ jsx(Route, { path: ":formId", element: /* @__PURE__ */ jsx(FormLeads, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Navigate, { to: "/forms", replace: true }) })
  ] });
}
export {
  Forms as default
};
