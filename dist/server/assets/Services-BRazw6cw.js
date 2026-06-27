import { jsxs, jsx } from "react/jsx-runtime";
import { useSearchParams, Link, useParams, useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Search, Download, Plus, Code, Briefcase, Target, Database, Bot, ChevronRight, ArrowLeft, Share2, Pencil, Users, CheckCircle2, DollarSign, TrendingUp, Save, Trash2 } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, AreaChart, CartesianGrid, XAxis, YAxis, Area } from "recharts";
import toast, { Toaster } from "react-hot-toast";
import { D as Drawer, G as GlassCard, B as Badge, a as StatCard } from "./Primitives-CmGbnOU9.js";
import "framer-motion";
const SERVICE_CATEGORIES = [
  { id: "all", label: "Category: All" },
  { id: "ai", label: "AI Solutions" },
  { id: "crm", label: "CRM & Ops" },
  { id: "leadgen", label: "Lead Gen" },
  { id: "consulting", label: "Consulting" },
  { id: "dev", label: "Custom Dev" }
];
const SERVICE_STATUSES = [
  { id: "all", label: "Status: All" },
  { id: "ACTIVE", label: "Active" },
  { id: "PAUSED", label: "Paused" },
  { id: "DRAFT", label: "Draft" }
];
const SERVICE_PRICING_SORT = [
  { id: "high", label: "Pricing: High to Low" },
  { id: "low", label: "Pricing: Low to High" }
];
const SALES_DISTRIBUTION = [
  { name: "Lead Gen Engine", sales: 920, color: "#be123c" },
  { name: "AI Automation Suite", sales: 842, color: "#881337" },
  { name: "CRM Setup & Onboarding", sales: 612, color: "#e11d48" },
  { name: "Custom Software Dev", sales: 248, color: "#fda4af" },
  { name: "Strategic Consulting", sales: 186, color: "#fecdd3" }
];
const SALES_TOTAL = SALES_DISTRIBUTION.reduce((sum, item) => sum + item.sales, 0);
const REVENUE_TRAJECTORY = [
  { period: "W1", label: "Jun 1–7", revenue: 5.2 },
  { period: "W2", label: "Jun 8–14", revenue: 4 },
  { period: "W3", label: "Jun 15–21", revenue: 7.5 },
  { period: "W4", label: "Jun 22–28", revenue: 5.8 },
  { period: "W5", label: "Jun 29–Jul 5", revenue: 11 },
  { period: "W6", label: "Jul 6–12", revenue: 3.6 },
  { period: "W7", label: "Jul 13–19", revenue: 18.4 }
];
const SERVICES = [
  {
    id: "ai-automation",
    name: "AI Automation Suite",
    category: "ai",
    categoryLabel: "AI Solutions",
    status: "ACTIVE",
    badge: "POPULAR",
    description: "End-to-end workflow automation powered by custom LLM agents and CRM integrations.",
    tags: ["AI SOLUTIONS", "6-8 WEEKS"],
    revenue: 45e4,
    clients: 128,
    leads: 12482,
    converted: 842,
    convRate: 6.8,
    price: "$15,000/mo",
    priceNum: 15e3,
    icon: "bot",
    features: [
      { title: "Hyper-Personalization", desc: "AI-driven outreach tailored to each lead profile." },
      { title: "Predictive Scoring", desc: "Rank leads by close probability in real time." },
      { title: "Auto Follow-ups", desc: "Smart sequences across email, SMS, and WhatsApp." },
      { title: "CRM Sync", desc: "Bi-directional sync with HubSpot, Zoho, and Salesforce." }
    ],
    tiers: [
      { name: "Basic", price: "$499/mo", features: ["2 workflows", "Email automation", "Basic reporting"], popular: false },
      { name: "Professional", price: "$1,249/mo", features: ["10 workflows", "Multi-channel", "AI scoring", "Priority support"], popular: true },
      { name: "Enterprise", price: "Custom", features: ["Unlimited workflows", "Custom LLM", "Dedicated CSM", "SLA guarantee"], popular: false }
    ],
    insights: [
      "Conversion rate is 12% above catalog average for enterprise inbound leads.",
      "Recommend promoting Professional tier — 68% of closed deals land here."
    ],
    delivery: [
      { step: "Discovery & Audit", status: "done" },
      { step: "Workflow Design", status: "done" },
      { step: "Agent Training", status: "active" },
      { step: "Go-Live & Handoff", status: "pending" }
    ],
    team: [
      { name: "Sarah Chen", load: 94, avatar: "SC" },
      { name: "James Wilson", load: 60, avatar: "JW" },
      { name: "Emily Davis", load: 72, avatar: "ED" }
    ]
  },
  {
    id: "crm-setup",
    name: "CRM Setup & Onboarding",
    category: "crm",
    categoryLabel: "CRM & Ops",
    status: "ACTIVE",
    badge: "ACTIVE",
    description: "Full CRM implementation, data migration, pipeline design, and team training.",
    tags: ["CRM", "4-6 WEEKS"],
    revenue: 28e4,
    clients: 96,
    leads: 8420,
    converted: 612,
    convRate: 7.3,
    price: "$8,500/mo",
    priceNum: 8500,
    icon: "database",
    features: [
      { title: "Pipeline Design", desc: "Custom stages aligned to your sales motion." },
      { title: "Data Migration", desc: "Clean import from spreadsheets or legacy CRM." },
      { title: "Team Training", desc: "Role-based onboarding for reps and managers." },
      { title: "Automation Rules", desc: "Assignment, alerts, and SLA triggers." }
    ],
    tiers: [
      { name: "Starter", price: "$2,500", features: ["1 pipeline", "Up to 5 users", "Email support"], popular: false },
      { name: "Growth", price: "$5,500", features: ["3 pipelines", "Up to 20 users", "Migration included"], popular: true },
      { name: "Scale", price: "Custom", features: ["Unlimited pipelines", "Dedicated admin", "Custom fields"], popular: false }
    ],
    insights: ["Strong fit for mid-market teams migrating from spreadsheets."],
    delivery: [
      { step: "Requirements", status: "done" },
      { step: "Configuration", status: "active" },
      { step: "Training", status: "pending" },
      { step: "Launch", status: "pending" }
    ],
    team: [
      { name: "Suresh Kumar", load: 88, avatar: "SK" },
      { name: "Priya Mehta", load: 55, avatar: "PM" }
    ]
  },
  {
    id: "lead-gen",
    name: "Lead Generation Engine",
    category: "leadgen",
    categoryLabel: "Lead Gen",
    status: "ACTIVE",
    badge: "ACTIVE",
    description: "Multi-channel outbound and inbound lead capture with qualification workflows.",
    tags: ["OUTBOUND", "3-5 WEEKS"],
    revenue: 195e3,
    clients: 74,
    leads: 15600,
    converted: 920,
    convRate: 5.9,
    price: "$6,200/mo",
    priceNum: 6200,
    icon: "target",
    features: [
      { title: "ICP Targeting", desc: "Build lists from firmographic and intent signals." },
      { title: "Multi-Channel", desc: "Email, LinkedIn, and cold-call playbooks." },
      { title: "Qualification", desc: "BANT-style scoring before handoff to sales." },
      { title: "Reporting", desc: "Weekly pipeline and ROI dashboards." }
    ],
    tiers: [
      { name: "Launch", price: "$3,200/mo", features: ["500 leads/mo", "Email only"], popular: false },
      { name: "Scale", price: "$6,200/mo", features: ["2,000 leads/mo", "Multi-channel"], popular: true },
      { name: "Enterprise", price: "Custom", features: ["Unlimited volume", "Dedicated SDR pod"], popular: false }
    ],
    insights: ["Highest lead volume in catalog — optimize qualification to protect rep time."],
    delivery: [
      { step: "ICP Workshop", status: "done" },
      { step: "List Build", status: "done" },
      { step: "Campaign Launch", status: "active" },
      { step: "Optimization", status: "pending" }
    ],
    team: [{ name: "Emily Davis", load: 81, avatar: "ED" }]
  },
  {
    id: "consulting",
    name: "Strategic Consulting",
    category: "consulting",
    categoryLabel: "Consulting",
    status: "ACTIVE",
    badge: "ENTERPRISE",
    description: "Revenue operations advisory, GTM strategy, and executive workshops for scaling teams.",
    tags: ["ADVISORY", "RETAINER"],
    revenue: 165e3,
    clients: 42,
    leads: 3200,
    converted: 186,
    convRate: 5.8,
    price: "$12,000/mo",
    priceNum: 12e3,
    icon: "briefcase",
    features: [
      { title: "GTM Audit", desc: "Full funnel diagnosis and benchmark report." },
      { title: "RevOps Design", desc: "Process, tooling, and KPI framework." },
      { title: "Executive Workshops", desc: "Quarterly strategy sessions with leadership." },
      { title: "Playbook Library", desc: "Documented SOPs and sales enablement assets." }
    ],
    tiers: [
      { name: "Advisory", price: "$5,000/mo", features: ["2 sessions/mo", "Async support"], popular: false },
      { name: "Partner", price: "$12,000/mo", features: ["Weekly sessions", "RevOps support"], popular: true },
      { name: "Embedded", price: "Custom", features: ["Fractional CRO", "Full team embed"], popular: false }
    ],
    insights: ["Longest sales cycle — nurture enterprise accounts with case studies."],
    delivery: [
      { step: "Discovery", status: "done" },
      { step: "Strategy Deck", status: "active" },
      { step: "Implementation", status: "pending" }
    ],
    team: [{ name: "James Wilson", load: 45, avatar: "JW" }]
  },
  {
    id: "custom-dev",
    name: "Custom Software Dev",
    category: "dev",
    categoryLabel: "Custom Dev",
    status: "ACTIVE",
    badge: "ACTIVE",
    description: "Bespoke dashboards, integrations, and internal tools built for your stack.",
    tags: ["ENGINEERING", "8-12 WEEKS"],
    revenue: 11e4,
    clients: 38,
    leads: 4100,
    converted: 248,
    convRate: 6,
    price: "$18,000/mo",
    priceNum: 18e3,
    icon: "code",
    features: [
      { title: "Custom Dashboards", desc: "Admin panels and client portals on your brand." },
      { title: "API Integrations", desc: "Connect CRM, billing, and support tools." },
      { title: "Automation Scripts", desc: "Scheduled jobs and webhook handlers." },
      { title: "Maintenance", desc: "Ongoing fixes, updates, and monitoring." }
    ],
    tiers: [
      { name: "Sprint", price: "$8,000", features: ["2-week sprint", "1 developer"], popular: false },
      { name: "Team", price: "$18,000/mo", features: ["Dedicated pod", "Bi-weekly demos"], popular: true },
      { name: "Retainer", price: "Custom", features: ["SLA", "24/7 support"], popular: false }
    ],
    insights: ["Bundle with AI Automation for 22% higher average contract value."],
    delivery: [
      { step: "Scoping", status: "done" },
      { step: "Development", status: "active" },
      { step: "QA & Deploy", status: "pending" }
    ],
    team: [{ name: "Priya Mehta", load: 67, avatar: "PM" }]
  }
];
function getServiceById(id) {
  const base = [...extraServices, ...SERVICES].find((s) => s.id === id);
  if (!base) return null;
  const patch = catalogOverrides[id];
  return cloneService(patch ? { ...base, ...patch } : base);
}
let extraServices = [];
function registerService(service) {
  extraServices = [service, ...extraServices.filter((s) => s.id !== service.id)];
}
const catalogOverrides = {};
function cloneService(service) {
  if (!service) return null;
  return {
    ...service,
    tags: [...service.tags || []],
    tiers: (service.tiers || []).map((t) => ({ ...t, features: [...t.features || []] })),
    features: (service.features || []).map((f) => ({ ...f })),
    team: (service.team || []).map((m) => ({ ...m })),
    insights: [...service.insights || []],
    delivery: (service.delivery || []).map((d) => ({ ...d })),
    documents: service.documents || ["Standard Proposal v4", "SOW Template v2", "Onboarding Checklist"],
    routingRule: service.routingRule || "Round Robin (Sales Team)",
    insightThreshold: service.insightThreshold ?? 85,
    publicVisible: service.publicVisible ?? true,
    clientPortal: service.clientPortal ?? false
  };
}
function updateService(service) {
  const next = cloneService(service);
  catalogOverrides[service.id] = next;
  const idx = extraServices.findIndex((s) => s.id === service.id);
  if (idx >= 0) extraServices[idx] = next;
  return next;
}
function getAllServices() {
  return [...extraServices, ...SERVICES].map((s) => {
    const patch = catalogOverrides[s.id];
    return patch ? cloneService({ ...s, ...patch }) : cloneService(s);
  });
}
function formatServiceMoney(val) {
  if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
  if (val >= 1e3) return `$${Math.round(val / 1e3)}K`;
  return `$${val}`;
}
function serviceBadgeTone(badge) {
  if (badge === "POPULAR") return "danger";
  if (badge === "ENTERPRISE") return "purple";
  return "success";
}
const CATEGORY_OPTIONS$1 = SERVICE_CATEGORIES.filter((c) => c.id !== "all");
const BADGE_OPTIONS$1 = ["ACTIVE", "POPULAR", "ENTERPRISE"];
const EMPTY_FORM = {
  name: "",
  category: "ai",
  description: "",
  price: "",
  status: "ACTIVE",
  badge: "ACTIVE",
  tag1: "",
  tag2: ""
};
function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `service-${Date.now()}`;
}
function parsePriceNum$1(price) {
  const n = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}
function buildServiceFromForm(form) {
  const categoryMeta = CATEGORY_OPTIONS$1.find((c) => c.id === form.category);
  const iconMap = { ai: "bot", crm: "database", leadgen: "target", consulting: "briefcase", dev: "code" };
  const tags = [form.tag1, form.tag2].filter(Boolean);
  return {
    id: slugify(form.name),
    name: form.name.trim(),
    category: form.category,
    categoryLabel: categoryMeta?.label?.replace(/^Category: /, "") || categoryMeta?.label || "General",
    status: form.status,
    badge: form.badge,
    description: form.description.trim(),
    tags: tags.length ? tags : ["NEW SERVICE"],
    revenue: 0,
    clients: 0,
    leads: 0,
    converted: 0,
    convRate: 0,
    price: form.price.trim(),
    priceNum: parsePriceNum$1(form.price),
    icon: iconMap[form.category] || "bot",
    features: [{ title: "Core Offering", desc: form.description.trim() }],
    tiers: [
      { name: "Starter", price: form.price.trim() || "Custom", features: ["Standard scope"], popular: true }
    ],
    insights: ["New service — track performance after launch."],
    delivery: [{ step: "Setup", status: "pending" }],
    team: []
  };
}
function AddServiceDrawer({ open, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);
  useEffect(() => {
    if (open) setForm(EMPTY_FORM);
  }, [open]);
  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const handleSaveDraft = () => {
    if (!form.name.trim()) {
      toast.error("Enter a service name");
      return;
    }
    toast.success("Service saved as draft");
  };
  const handlePublish = () => {
    if (!form.name.trim()) {
      toast.error("Enter a service name");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Add a short description");
      return;
    }
    if (!form.price.trim()) {
      toast.error("Enter a price");
      return;
    }
    onClose?.(buildServiceFromForm(form));
  };
  const inputClass2 = "w-full h-10 px-3 rounded-xl border border-rose-100 bg-white text-sm font-medium text-slate-800 outline-none focus:border-rose-400";
  const labelClass2 = "text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5";
  return /* @__PURE__ */ jsxs(Drawer, { open, onClose: () => onClose?.(), title: "Add Service", width: "drawer-panel", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mb-4 pb-3 border-b border-rose-50", children: "Create a new productized offering for your catalog" }),
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
          children: "Publish Service"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-100 bg-[#fffbfb] p-4 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass2, children: "Service Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: form.name,
              onChange: (e) => update("name", e.target.value),
              placeholder: "e.g. AI Automation Suite",
              className: inputClass2
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelClass2, children: "Category" }),
            /* @__PURE__ */ jsx(
              "select",
              {
                value: form.category,
                onChange: (e) => update("category", e.target.value),
                className: inputClass2,
                children: CATEGORY_OPTIONS$1.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.label.replace(/^Category: /, "") }, c.id))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelClass2, children: "Price" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                value: form.price,
                onChange: (e) => update("price", e.target.value),
                placeholder: "$5,000/mo",
                className: inputClass2
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass2, children: "Description" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: form.description,
              onChange: (e) => update("description", e.target.value),
              rows: 3,
              placeholder: "What does this service include?",
              className: "w-full px-3 py-2.5 rounded-xl border border-rose-100 bg-white text-sm outline-none focus:border-rose-400 resize-none"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-100 bg-[#fffbfb] p-4 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass2, children: "Status" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["ACTIVE", "PAUSED", "DRAFT"].map((s) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => update("status", s),
              className: `px-3 py-1.5 rounded-xl text-[11px] font-bold border transition ${form.status === s ? "bg-rose-50 border-rose-400 text-rose-800" : "bg-white border-rose-100 text-slate-600 hover:border-rose-200"}`,
              children: s.charAt(0) + s.slice(1).toLowerCase()
            },
            s
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass2, children: "Catalog Badge" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: BADGE_OPTIONS$1.map((b) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => update("badge", b),
              className: `px-3 py-1.5 rounded-xl text-[11px] font-bold border transition ${form.badge === b ? "bg-rose-50 border-rose-400 text-rose-800" : "bg-white border-rose-100 text-slate-600 hover:border-rose-200"}`,
              children: b
            },
            b
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelClass2, children: "Tag 1" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                value: form.tag1,
                onChange: (e) => update("tag1", e.target.value),
                placeholder: "AI SOLUTIONS",
                className: inputClass2
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: labelClass2, children: "Tag 2" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                value: form.tag2,
                onChange: (e) => update("tag2", e.target.value),
                placeholder: "6-8 WEEKS",
                className: inputClass2
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
const ICON_MAP$2 = {
  bot: Bot,
  database: Database,
  target: Target,
  briefcase: Briefcase,
  code: Code
};
function ChartCardHeader({ title, subtitle }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-2.5 pb-2 border-b border-rose-50", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-extrabold text-slate-800 tracking-tight", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-0.5 leading-snug", children: subtitle })
  ] });
}
function ServicesDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [catalog, setCatalog] = useState(getAllServices);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [priceSort, setPriceSort] = useState("high");
  const [addOpen, setAddOpen] = useState(false);
  const topSalesLine = useMemo(
    () => [...SALES_DISTRIBUTION].sort((a, b) => b.sales - a.sales)[0],
    []
  );
  const salesWithPct = useMemo(
    () => SALES_DISTRIBUTION.map((item) => ({
      ...item,
      pct: Math.round(item.sales / SALES_TOTAL * 100)
    })),
    []
  );
  const revenueStats = useMemo(() => {
    const values = REVENUE_TRAJECTORY.map((d) => d.revenue);
    const start = values[0];
    const peak = Math.max(...values);
    const latest = values[values.length - 1];
    const growth = start ? Math.round((latest - start) / start * 100) : 0;
    return { start, peak, latest, growth };
  }, []);
  const openAddService = () => setAddOpen(true);
  const handleAddClose = (newService) => {
    if (newService) {
      registerService(newService);
      setCatalog(getAllServices());
      toast.success(`${newService.name} added to catalog`);
    }
    setAddOpen(false);
    if (searchParams.get("action")) {
      setSearchParams({}, { replace: true });
    }
  };
  useEffect(() => {
    if (searchParams.get("action") === "addService") setAddOpen(true);
  }, [searchParams]);
  const filtered = useMemo(() => {
    let list = catalog.filter((s) => {
      if (category !== "all" && s.category !== category) return false;
      if (status !== "all" && s.status !== status) return false;
      if (search.trim() && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    list = [...list].sort(
      (a, b) => priceSort === "high" ? b.priceNum - a.priceNum : a.priceNum - b.priceNum
    );
    return list;
  }, [catalog, search, category, status, priceSort]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5 page-shell min-w-0", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxs(GlassCard, { className: "p-3.5 sm:p-4 flex flex-col min-h-[260px]", children: [
        /* @__PURE__ */ jsx(
          ChartCardHeader,
          {
            title: "Sales Distribution",
            subtitle: "Closed deals by service line"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center gap-3 sm:gap-4 min-h-[168px]", children: [
          /* @__PURE__ */ jsx("div", { className: "relative w-[132px] h-[132px] shrink-0", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
            /* @__PURE__ */ jsx(
              Pie,
              {
                data: salesWithPct,
                dataKey: "sales",
                cx: "50%",
                cy: "50%",
                innerRadius: 40,
                outerRadius: 58,
                paddingAngle: 2,
                stroke: "none",
                children: salesWithPct.map((entry) => /* @__PURE__ */ jsx(Cell, { fill: entry.color }, entry.name))
              }
            ),
            /* @__PURE__ */ jsx("text", { x: "50%", y: "46%", textAnchor: "middle", dominantBaseline: "middle", fill: "#881337", fontSize: 16, fontWeight: "800", children: SALES_TOTAL.toLocaleString() }),
            /* @__PURE__ */ jsx("text", { x: "50%", y: "58%", textAnchor: "middle", dominantBaseline: "middle", fill: "#94a3b8", fontSize: 8, fontWeight: "600", children: "Total Sales" }),
            /* @__PURE__ */ jsx(
              Tooltip,
              {
                formatter: (val, _name, props) => [
                  `${val.toLocaleString()} sales · ${props.payload.pct}%`,
                  props.payload.name
                ],
                contentStyle: { borderRadius: 10, border: "1px solid #fecdd3", fontSize: 10, padding: "6px 10px" }
              }
            )
          ] }) }) }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0 space-y-1.5", children: salesWithPct.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full shrink-0", style: { background: item.color } }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold text-slate-700 truncate", children: item.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-slate-500 tabular-nums", children: item.sales.toLocaleString() }),
              /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-black text-rose-800 tabular-nums w-8 text-right", children: [
                item.pct,
                "%"
              ] })
            ] })
          ] }, item.name)) })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-[9px] text-slate-500 pt-2.5 mt-2 border-t border-rose-50 leading-snug", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-700", children: topSalesLine.name }),
          " ",
          "leads with",
          " ",
          /* @__PURE__ */ jsxs("span", { className: "font-black text-rose-800 tabular-nums", children: [
            topSalesLine.sales.toLocaleString(),
            " sales"
          ] }),
          " ",
          "(",
          Math.round(topSalesLine.sales / SALES_TOTAL * 100),
          "% of catalog)."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(GlassCard, { className: "p-3.5 sm:p-4 flex flex-col min-h-[260px]", children: [
        /* @__PURE__ */ jsx(
          ChartCardHeader,
          {
            title: "Revenue Trajectory",
            subtitle: "Catalog revenue trend (₹ lakh)"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-1.5 mb-2.5", children: [
          { label: "Cycle Start", value: `₹${revenueStats.start}L`, tone: "text-slate-700" },
          { label: "Peak", value: `₹${revenueStats.peak}L`, tone: "text-rose-800" },
          { label: "Growth", value: `+${revenueStats.growth}%`, tone: "text-emerald-700" }
        ].map((stat) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-rose-50/60 border border-rose-100 px-2 py-1.5 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[8px] font-bold text-slate-400 uppercase tracking-wide", children: stat.label }),
          /* @__PURE__ */ jsx("p", { className: `text-[11px] font-black tabular-nums mt-0.5 ${stat.tone}`, children: stat.value })
        ] }, stat.label)) }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-[148px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
          AreaChart,
          {
            data: REVENUE_TRAJECTORY,
            margin: { top: 6, right: 8, left: 0, bottom: 0 },
            children: [
              /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "revenueTrajGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#be123c", stopOpacity: 0.22 }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#be123c", stopOpacity: 0.02 })
              ] }) }),
              /* @__PURE__ */ jsx(CartesianGrid, { stroke: "#fff1f2", vertical: false, strokeDasharray: "4 4" }),
              /* @__PURE__ */ jsx(
                XAxis,
                {
                  dataKey: "period",
                  axisLine: { stroke: "#fecdd3" },
                  tickLine: false,
                  tick: { fill: "#94a3b8", fontSize: 8, fontWeight: 600 },
                  interval: 0
                }
              ),
              /* @__PURE__ */ jsx(
                YAxis,
                {
                  domain: [0, 20],
                  ticks: [1, 5, 20],
                  width: 48,
                  axisLine: false,
                  tickLine: false,
                  tick: { fill: "#64748b", fontSize: 8, fontWeight: 600 },
                  tickFormatter: (v) => v === 1 ? "1 Lakh" : `${v} lakh`
                }
              ),
              /* @__PURE__ */ jsx(
                Tooltip,
                {
                  cursor: { stroke: "#fda4af", strokeWidth: 1, strokeDasharray: "4 4" },
                  contentStyle: { borderRadius: 10, border: "1px solid #fecdd3", fontSize: 10, padding: "6px 10px" },
                  labelFormatter: (_, items) => {
                    const row = items?.[0]?.payload;
                    return row ? `${row.period} · ${row.label}` : "";
                  },
                  formatter: (val) => [`₹${val}L`, "Revenue"]
                }
              ),
              /* @__PURE__ */ jsx(
                Area,
                {
                  type: "monotone",
                  dataKey: "revenue",
                  stroke: "#be123c",
                  strokeWidth: 2.5,
                  fill: "url(#revenueTrajGrad)",
                  dot: { r: 3, fill: "#be123c", stroke: "#fff", strokeWidth: 1.5 },
                  activeDot: { r: 5, fill: "#be123c", stroke: "#fff", strokeWidth: 2 }
                }
              )
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsxs("p", { className: "text-[9px] text-slate-500 pt-2 border-t border-rose-50 leading-snug", children: [
          "Revenue peaked at",
          " ",
          /* @__PURE__ */ jsxs("span", { className: "font-black text-rose-800 tabular-nums", children: [
            "₹",
            revenueStats.peak,
            "L"
          ] }),
          " ",
          "in the latest period — up from",
          " ",
          /* @__PURE__ */ jsxs("span", { className: "font-black text-rose-800 tabular-nums", children: [
            "₹",
            revenueStats.start,
            "L"
          ] }),
          " ",
          "at cycle start."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(GlassCard, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-0 max-w-md", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300 pointer-events-none" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Filter by keyword...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "w-full h-10 pl-9 pr-3 rounded-xl border border-rose-100 bg-white text-sm outline-none focus:border-rose-400"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 sm:items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:contents gap-2", children: [
          /* @__PURE__ */ jsx(
            "select",
            {
              value: category,
              onChange: (e) => setCategory(e.target.value),
              className: "h-10 px-3 rounded-xl border border-rose-100 bg-white text-xs font-bold text-rose-800 outline-none focus:border-rose-400",
              children: SERVICE_CATEGORIES.map((o) => /* @__PURE__ */ jsx("option", { value: o.id, children: o.label }, o.id))
            }
          ),
          /* @__PURE__ */ jsx(
            "select",
            {
              value: status,
              onChange: (e) => setStatus(e.target.value),
              className: "h-10 px-3 rounded-xl border border-rose-100 bg-white text-xs font-bold text-rose-800 outline-none focus:border-rose-400",
              children: SERVICE_STATUSES.map((o) => /* @__PURE__ */ jsx("option", { value: o.id, children: o.label }, o.id))
            }
          ),
          /* @__PURE__ */ jsx(
            "select",
            {
              value: priceSort,
              onChange: (e) => setPriceSort(e.target.value),
              className: "h-10 px-3 rounded-xl border border-rose-100 bg-white text-xs font-bold text-rose-800 outline-none focus:border-rose-400 col-span-2 sm:col-span-1",
              children: SERVICE_PRICING_SORT.map((o) => /* @__PURE__ */ jsx("option", { value: o.id, children: o.label }, o.id))
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => toast.success("Export started"),
              className: "flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 h-10 px-3.5 rounded-xl border border-rose-200 text-rose-800 text-xs font-bold hover:bg-rose-50 whitespace-nowrap",
              children: [
                /* @__PURE__ */ jsx(Download, { className: "w-3.5 h-3.5" }),
                "Export Reports"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: openAddService,
              className: "flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 h-10 px-3.5 rounded-xl bg-rose-700 text-white text-xs font-bold hover:bg-rose-800 whitespace-nowrap",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
                "Add Service"
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3", children: [
      filtered.map((service) => {
        const Icon = ICON_MAP$2[service.icon] || Bot;
        return /* @__PURE__ */ jsx(Link, { to: `/services/${service.id}`, className: "group block", children: /* @__PURE__ */ jsxs(GlassCard, { hover: true, className: "p-3.5 h-full flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2 mb-2.5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-rose-50 text-rose-600 grid place-items-center shrink-0 group-hover:bg-rose-100 transition", children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsx(Badge, { tone: serviceBadgeTone(service.badge), children: service.badge })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-black text-slate-900 group-hover:text-rose-800 transition leading-snug", children: service.name }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 mt-1 line-clamp-2 flex-1 leading-relaxed", children: service.description }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: service.tags.map((tag) => /* @__PURE__ */ jsx("span", { className: "text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200", children: tag }, tag)) }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-1.5 mt-3 pt-2.5 border-t border-rose-50", children: [
            ["Revenue", formatServiceMoney(service.revenue)],
            ["Clients", String(service.clients)],
            ["Leads", service.leads >= 1e3 ? `${(service.leads / 1e3).toFixed(1)}k` : String(service.leads)]
          ].map(([label, val]) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[7px] font-bold text-slate-400 uppercase leading-none", children: label }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] font-black text-slate-800 mt-0.5 tabular-nums", children: val })
          ] }, label)) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-2.5 pt-2.5 border-t border-rose-50", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-rose-700", children: service.price }),
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition" })
          ] })
        ] }) }, service.id);
      }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: openAddService,
          className: "rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/30 p-4 flex flex-col items-center justify-center gap-2 min-h-[240px] hover:border-rose-400 hover:bg-rose-50/60 transition text-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white border border-rose-200 grid place-items-center text-rose-600", children: /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-700", children: "Create New Service" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 max-w-[180px] leading-snug", children: "Expand your catalog with a new productized offering" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(AddServiceDrawer, { open: addOpen, onClose: handleAddClose })
  ] });
}
const ICON_MAP$1 = {
  bot: Bot,
  database: Database,
  target: Target,
  briefcase: Briefcase,
  code: Code
};
function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = getServiceById(serviceId);
  if (!service) {
    return /* @__PURE__ */ jsxs(GlassCard, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Service not found." }),
      /* @__PURE__ */ jsx(Link, { to: "/services", className: "text-xs font-bold text-rose-700 mt-2 inline-block", children: "Back to Services" })
    ] });
  }
  const Icon = ICON_MAP$1[service.icon] || Bot;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 page-shell min-w-0 max-w-5xl", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
    /* @__PURE__ */ jsx(GlassCard, { className: "p-3.5 sm:p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/services",
            className: "w-9 h-9 rounded-xl border border-rose-100 bg-white text-rose-700 grid place-items-center shrink-0 hover:bg-rose-50 transition",
            "aria-label": "Back to catalog",
            children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-rose-50 text-rose-600 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-base sm:text-lg font-black text-slate-900 truncate", children: service.name }),
            /* @__PURE__ */ jsx(Badge, { tone: serviceBadgeTone(service.badge), children: service.badge }),
            /* @__PURE__ */ jsx(Badge, { tone: service.status === "ACTIVE" ? "success" : "muted", children: service.status })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-slate-500 mt-0.5 truncate", children: [
            service.categoryLabel,
            " · ",
            service.price
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0 pl-12 sm:pl-0", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => toast.success("Link copied"),
            className: "h-9 px-3 rounded-xl border border-rose-200 bg-white text-xs font-bold text-rose-800 hover:bg-rose-50 inline-flex items-center gap-1.5 transition",
            children: [
              /* @__PURE__ */ jsx(Share2, { className: "w-3.5 h-3.5 shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Share" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => toast.success("Export started"),
            className: "h-9 px-3 rounded-xl border border-rose-200 bg-white text-xs font-bold text-rose-800 hover:bg-rose-50 inline-flex items-center gap-1.5 transition",
            children: [
              /* @__PURE__ */ jsx(Download, { className: "w-3.5 h-3.5 shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Export" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate(`/services/${service.id}/edit`),
            className: "h-9 px-3 rounded-xl bg-rose-700 text-white text-xs font-bold hover:bg-rose-800 inline-flex items-center gap-1.5 shadow-sm transition",
            children: [
              /* @__PURE__ */ jsx(Pencil, { className: "w-3.5 h-3.5 shrink-0" }),
              "Edit"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Total Leads", value: service.leads >= 1e3 ? `${(service.leads / 1e3).toFixed(1)}k` : String(service.leads), icon: Users, iconBg: "bg-rose-50", iconColor: "text-rose-600", hover: false }),
      /* @__PURE__ */ jsx(StatCard, { label: "Converted", value: String(service.converted), change: "+8%", sub: "this month", icon: CheckCircle2, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", hover: false }),
      /* @__PURE__ */ jsx(StatCard, { label: "Revenue", value: formatServiceMoney(service.revenue), icon: DollarSign, iconBg: "bg-sky-50", iconColor: "text-sky-600", hover: false }),
      /* @__PURE__ */ jsx(StatCard, { label: "Conv. Rate", value: `${service.convRate}%`, icon: TrendingUp, iconBg: "bg-amber-50", iconColor: "text-amber-600", hover: false })
    ] }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "p-4 sm:p-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-extrabold text-rose-700 uppercase tracking-wider mb-2", children: "Service Architecture & Features" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 leading-relaxed mb-4", children: service.description }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: service.features.map((f) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-100 bg-white p-3.5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-900", children: f.title }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-500 mt-1 leading-relaxed", children: f.desc })
      ] }, f.title)) })
    ] }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "p-4 sm:p-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-extrabold text-rose-700 uppercase tracking-wider mb-3", children: "Service Tiers" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-2.5", children: service.tiers.map((tier) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `rounded-xl border p-3.5 flex flex-col ${tier.popular ? "border-rose-400 bg-rose-50/40 ring-1 ring-rose-200" : "border-rose-100 bg-white"}`,
          children: [
            tier.popular && /* @__PURE__ */ jsx("span", { className: "self-start text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-700 text-white mb-2", children: "Most Popular" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-slate-900", children: tier.name }),
            /* @__PURE__ */ jsx("p", { className: "text-base font-black text-rose-700 mt-0.5", children: tier.price }),
            /* @__PURE__ */ jsx("ul", { className: "mt-2.5 space-y-1.5 flex-1", children: tier.features.map((feat) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-[11px] text-slate-600", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" }),
              feat
            ] }, feat)) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: `mt-3 w-full py-2 rounded-xl text-xs font-bold transition ${tier.popular ? "bg-rose-700 text-white hover:bg-rose-800" : "border border-rose-200 text-rose-800 hover:bg-rose-50"}`,
                children: "Select Plan"
              }
            )
          ]
        },
        tier.name
      )) })
    ] })
  ] });
}
const ICON_MAP = {
  bot: Bot,
  database: Database,
  target: Target,
  briefcase: Briefcase,
  code: Code
};
const TABS = [
  "General Information",
  "Pricing & Plans",
  "Features & Workflow"
];
const CATEGORY_OPTIONS = SERVICE_CATEGORIES.filter((c) => c.id !== "all");
const BADGE_OPTIONS = ["ACTIVE", "POPULAR", "ENTERPRISE"];
const STATUS_OPTIONS = ["ACTIVE", "PAUSED", "DRAFT"];
const inputClass = "w-full h-10 px-3 rounded-xl border border-rose-100 bg-white text-sm font-medium text-slate-800 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition";
const labelClass = "text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5";
const textareaClass = "w-full px-3 py-2.5 rounded-xl border border-rose-100 bg-white text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 resize-none transition";
function parsePriceNum(price) {
  const n = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}
function initDraft(service) {
  if (!service) return null;
  return {
    ...service,
    tags: [...service.tags || []],
    tiers: (service.tiers || []).map((t) => ({ ...t, features: [...t.features || []] })),
    features: (service.features || []).map((f) => ({ ...f }))
  };
}
function FormSection({ title, subtitle, children, className = "" }) {
  return /* @__PURE__ */ jsxs("div", { className: `rounded-xl border border-rose-100 bg-[#fffbfb] p-4 sm:p-5 space-y-4 ${className}`, children: [
    (title || subtitle) && /* @__PURE__ */ jsxs("div", { className: "pb-3 border-b border-rose-50", children: [
      title && /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-extrabold text-rose-700 uppercase tracking-wider", children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-0.5 leading-snug", children: subtitle })
    ] }),
    children
  ] });
}
function SegmentedControl({ options, value, onChange, formatLabel = (v) => v }) {
  return /* @__PURE__ */ jsx("div", { className: "inline-flex flex-wrap gap-1 p-1 rounded-xl bg-white border border-rose-100", children: options.map((opt) => /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: () => onChange(opt),
      className: `px-3 py-1.5 rounded-lg text-[11px] font-bold transition whitespace-nowrap ${value === opt ? "bg-rose-700 text-white shadow-sm" : "text-slate-600 hover:bg-rose-50 hover:text-rose-800"}`,
      children: formatLabel(opt)
    },
    opt
  )) });
}
function ServiceEdit() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = getServiceById(serviceId);
  const [activeTab, setActiveTab] = useState("General Information");
  const [draft, setDraft] = useState(() => initDraft(service));
  useEffect(() => {
    setDraft(initDraft(getServiceById(serviceId)));
    setActiveTab("General Information");
  }, [serviceId]);
  if (!service || !draft) {
    return /* @__PURE__ */ jsxs(GlassCard, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Service not found." }),
      /* @__PURE__ */ jsx(Link, { to: "/services", className: "text-xs font-bold text-rose-700 mt-2 inline-block", children: "Back to Services" })
    ] });
  }
  const Icon = ICON_MAP[draft.icon] || Bot;
  const patch = (updates) => setDraft((prev) => ({ ...prev, ...updates }));
  const updateTier = (index, field, value) => {
    setDraft((prev) => ({
      ...prev,
      tiers: prev.tiers.map((t, i) => i === index ? { ...t, [field]: value } : t)
    }));
  };
  const setPopularTier = (index) => {
    setDraft((prev) => ({
      ...prev,
      tiers: prev.tiers.map((t, i) => ({ ...t, popular: i === index }))
    }));
  };
  const updateTierFeatures = (index, text) => {
    const features = text.split("\n").map((s) => s.trim()).filter(Boolean);
    updateTier(index, "features", features);
  };
  const addTier = () => {
    setDraft((prev) => ({
      ...prev,
      tiers: [...prev.tiers, { name: "New Tier", price: "$0/mo", features: ["Feature 1"], popular: false }]
    }));
  };
  const removeTier = (index) => {
    setDraft((prev) => ({
      ...prev,
      tiers: prev.tiers.filter((_, i) => i !== index)
    }));
  };
  const updateFeature = (index, field, value) => {
    setDraft((prev) => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? { ...f, [field]: value } : f)
    }));
  };
  const addFeature = () => {
    setDraft((prev) => ({
      ...prev,
      features: [...prev.features, { title: "New Feature", desc: "Describe this capability" }]
    }));
  };
  const removeFeature = (index) => {
    setDraft((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };
  const handleSave = () => {
    if (!draft.name.trim()) {
      toast.error("Service name is required");
      return;
    }
    const saved = updateService({
      ...draft,
      name: draft.name.trim(),
      description: draft.description.trim(),
      priceNum: parsePriceNum(draft.price)
    });
    toast.success(`${saved.name} saved`);
    navigate(`/services/${service.id}`);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 page-shell min-w-0 max-w-5xl", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
    /* @__PURE__ */ jsx(GlassCard, { className: "p-3.5 sm:p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: `/services/${service.id}`,
            className: "w-9 h-9 rounded-xl border border-rose-100 bg-white text-rose-700 grid place-items-center shrink-0 hover:bg-rose-50 transition",
            "aria-label": "Back to service",
            children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-rose-50 text-rose-600 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-base font-black text-slate-900 truncate", children: [
            "Edit · ",
            draft.name
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-500", children: "Update catalog details, pricing, and features" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: handleSave,
          className: "inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl bg-rose-700 text-white text-[11px] font-bold hover:bg-rose-800 shadow-sm shrink-0 self-start sm:self-auto ml-12 sm:ml-0 transition",
          children: [
            /* @__PURE__ */ jsx(Save, { className: "w-3.5 h-3.5" }),
            "Save Changes"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-0 border-b border-rose-100 px-2 sm:px-4 overflow-x-auto", children: TABS.map((tab) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab(tab),
          className: `relative px-3 sm:px-4 py-3 text-[11px] font-bold transition whitespace-nowrap ${activeTab === tab ? "text-rose-800" : "text-slate-500 hover:text-rose-700"}`,
          children: [
            tab,
            activeTab === tab && /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 left-2 right-2 sm:left-3 sm:right-3 h-0.5 rounded-full bg-rose-600" })
          ]
        },
        tab
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-5 bg-white/40", children: [
        activeTab === "General Information" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs(FormSection, { title: "Basics", subtitle: "Core service identity shown in the catalog", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelClass, children: "Service Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  value: draft.name,
                  onChange: (e) => patch({ name: e.target.value }),
                  placeholder: "e.g. Strategic Consulting",
                  className: inputClass
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: labelClass, children: "Category" }),
                /* @__PURE__ */ jsx(
                  "select",
                  {
                    value: draft.category,
                    onChange: (e) => {
                      const opt = CATEGORY_OPTIONS.find((c) => c.id === e.target.value);
                      patch({ category: e.target.value, categoryLabel: opt?.label?.replace(/^Category: /, "") || e.target.value });
                    },
                    className: inputClass,
                    children: CATEGORY_OPTIONS.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.label.replace(/^Category: /, "") }, c.id))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: labelClass, children: "List Price" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    value: draft.price,
                    onChange: (e) => patch({ price: e.target.value }),
                    placeholder: "$12,000/mo",
                    className: inputClass
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelClass, children: "Description" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: draft.description,
                  onChange: (e) => patch({ description: e.target.value }),
                  rows: 4,
                  placeholder: "What does this service include?",
                  className: textareaClass
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(FormSection, { title: "Catalog Settings", subtitle: "How this service appears and behaves in the catalog", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: labelClass, children: "Catalog Badge" }),
                /* @__PURE__ */ jsx(
                  SegmentedControl,
                  {
                    options: BADGE_OPTIONS,
                    value: draft.badge,
                    onChange: (badge) => patch({ badge })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: labelClass, children: "Status" }),
                /* @__PURE__ */ jsx(
                  SegmentedControl,
                  {
                    options: STATUS_OPTIONS,
                    value: draft.status,
                    onChange: (status) => patch({ status }),
                    formatLabel: (s) => s.charAt(0) + s.slice(1).toLowerCase()
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelClass, children: "Tags (comma separated)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  value: draft.tags.join(", "),
                  onChange: (e) => patch({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) }),
                  placeholder: "ADVISORY, RETAINER",
                  className: inputClass
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-1.5", children: "Used for filtering and card labels on the services catalog." })
            ] })
          ] })
        ] }),
        activeTab === "Pricing & Plans" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-extrabold text-rose-700 uppercase tracking-wider", children: "Pricing Tiers" }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "Define plans customers can choose from on the detail page." })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: addTier,
                className: "inline-flex items-center gap-1 h-8 px-3 rounded-xl border border-rose-200 bg-white text-[10px] font-bold text-rose-800 hover:bg-rose-50 transition shrink-0",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
                  " Add tier"
                ]
              }
            )
          ] }),
          draft.tiers.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-dashed border-rose-200 bg-[#fffbfb] p-8 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-700", children: "No pricing tiers yet" }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-400 mt-1", children: "Add at least one tier for customers to select a plan." }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: addTier,
                className: "mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 hover:underline",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
                  " Add your first tier"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3", children: draft.tiers.map((tier, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: `rounded-xl border p-4 space-y-3 ${tier.popular ? "border-rose-300 bg-rose-50/50 ring-1 ring-rose-200" : "border-rose-100 bg-[#fffbfb]"}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 min-h-[24px]", children: [
                  tier.popular ? /* @__PURE__ */ jsx(Badge, { tone: "danger", children: "Most Popular" }) : /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold text-slate-400 uppercase", children: [
                    "Tier ",
                    index + 1
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeTier(index),
                      className: "w-7 h-7 rounded-lg hover:bg-rose-100 text-slate-400 hover:text-rose-600 grid place-items-center transition",
                      "aria-label": "Remove tier",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: labelClass, children: "Tier Name" }),
                  /* @__PURE__ */ jsx("input", { value: tier.name, onChange: (e) => updateTier(index, "name", e.target.value), className: inputClass })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: labelClass, children: "Price" }),
                  /* @__PURE__ */ jsx("input", { value: tier.price, onChange: (e) => updateTier(index, "price", e.target.value), className: inputClass })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-700 cursor-pointer select-none", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      name: "popular-tier",
                      checked: tier.popular,
                      onChange: () => setPopularTier(index),
                      className: "accent-rose-600"
                    }
                  ),
                  "Mark as most popular"
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: labelClass, children: "Features (one per line)" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      value: tier.features.join("\n"),
                      onChange: (e) => updateTierFeatures(index, e.target.value),
                      rows: 4,
                      placeholder: "Feature one\nFeature two",
                      className: textareaClass
                    }
                  )
                ] })
              ]
            },
            `${tier.name}-${index}`
          )) })
        ] }),
        activeTab === "Features & Workflow" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-extrabold text-rose-700 uppercase tracking-wider", children: "Features & Workflow" }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "Highlight key capabilities on the service detail page." })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: addFeature,
                className: "inline-flex items-center gap-1 h-8 px-3 rounded-xl border border-rose-200 bg-white text-[10px] font-bold text-rose-800 hover:bg-rose-50 transition shrink-0",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
                  " Add feature"
                ]
              }
            )
          ] }),
          draft.features.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-dashed border-rose-200 bg-[#fffbfb] p-8 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-700", children: "No features added" }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-400 mt-1", children: "Add feature blocks to explain what this service delivers." }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: addFeature,
                className: "mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 hover:underline",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
                  " Add your first feature"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: draft.features.map((feature, index) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-rose-100 bg-[#fffbfb] p-4 space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 pb-2 border-b border-rose-50", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold text-slate-400 uppercase", children: [
                "Feature ",
                index + 1
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeFeature(index),
                  className: "w-7 h-7 rounded-lg hover:bg-rose-100 text-slate-400 hover:text-rose-600 grid place-items-center transition",
                  "aria-label": "Remove feature",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelClass, children: "Title" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  value: feature.title,
                  onChange: (e) => updateFeature(index, "title", e.target.value),
                  placeholder: "e.g. GTM Strategy Workshop",
                  className: inputClass
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelClass, children: "Description" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: feature.desc,
                  onChange: (e) => updateFeature(index, "desc", e.target.value),
                  rows: 2,
                  placeholder: "Brief explanation of this capability",
                  className: textareaClass
                }
              )
            ] })
          ] }, index)) })
        ] })
      ] })
    ] })
  ] });
}
function Services() {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(ServicesDashboard, {}) }),
    /* @__PURE__ */ jsx(Route, { path: ":serviceId/edit", element: /* @__PURE__ */ jsx(ServiceEdit, {}) }),
    /* @__PURE__ */ jsx(Route, { path: ":serviceId", element: /* @__PURE__ */ jsx(ServiceDetail, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Navigate, { to: "/services", replace: true }) })
  ] });
}
export {
  Services as default
};
