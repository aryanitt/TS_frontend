import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Users, Sparkles, BarChart2, Calendar, CheckCircle2, Mail } from "lucide-react";
import { D as Drawer } from "./Primitives-CmGbnOU9.js";
import { C as apiPost, Q as invalidateCache } from "./_-BNdSRMjW.js";
const daysAgo = (n) => {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};
const dummyEmployees = [
  { id: 101, name: "Priya Sharma", email: "priya@company.in", role: "Senior AE", department: "Sales", status: "active" },
  { id: 102, name: "Rahul Mehta", email: "rahul@company.in", role: "Account Executive", department: "Sales", status: "active" },
  { id: 103, name: "Ananya Reddy", email: "ananya@company.in", role: "SDR", department: "Sales", status: "active" },
  { id: 104, name: "Vikram Singh", email: "vikram@company.in", role: "Sales Rep", department: "Marketing", status: "active" },
  { id: 105, name: "Kavya Nair", email: "kavya@company.in", role: "Inside Sales", department: "Support", status: "active" },
  { id: 106, name: "Arjun Patel", email: "arjun@company.in", role: "AE", department: "Sales", status: "on_leave" }
];
const dummyLeads = [
  {
    id: 1001,
    lead_name: "Amit Desai",
    company_name: "Desai Logistics",
    phone: "+919876543210",
    email: "amit@desailogistics.in",
    city: "Mumbai",
    source: "Facebook Ads",
    form_name: "Meta Lead Form",
    temperature: "Hot Lead",
    pipeline_stage: "Negotiation",
    status: "Hot Lead",
    win_probability: 72,
    expected_revenue: 45e4,
    interactions: 8,
    next_followup_date: "2026-06-22",
    created_at: daysAgo(1)
  },
  {
    id: 1002,
    lead_name: "Sneha Iyer",
    company_name: "Iyer Tech Solutions",
    phone: "+919988776655",
    email: "sneha@iyertech.com",
    city: "Bangalore",
    source: "Google Ads",
    temperature: "Warm Lead",
    pipeline_stage: "Qualified",
    status: "Warm Lead",
    win_probability: 55,
    expected_revenue: 28e4,
    interactions: 4,
    next_followup_date: "2026-06-20",
    created_at: daysAgo(2)
  },
  {
    id: 1003,
    lead_name: "Rajesh Kumar",
    company_name: "Kumar Enterprises",
    phone: "+919811223344",
    email: "rajesh@kumar.in",
    city: "Delhi",
    source: "Website",
    temperature: "Cold Lead",
    pipeline_stage: "New Lead",
    status: "New Lead",
    win_probability: 25,
    expected_revenue: 95e3,
    interactions: 1,
    next_followup_date: "2026-06-25",
    created_at: daysAgo(0)
  },
  {
    id: 1004,
    lead_name: "Meera Joshi",
    company_name: "Joshi Retail",
    phone: "+919900112233",
    email: "meera@joshiretail.in",
    city: "Pune",
    source: "WhatsApp",
    temperature: "Hot Lead",
    pipeline_stage: "Contacted",
    status: "Contacted",
    win_probability: 48,
    expected_revenue: 175e3,
    interactions: 6,
    next_followup_date: "2026-06-19",
    created_at: daysAgo(3)
  },
  {
    id: 1005,
    lead_name: "Deepak Malhotra",
    company_name: "Malhotra Finance",
    phone: "+919877665544",
    email: "deepak@malhotra.co",
    city: "Gurgaon",
    source: "Manual",
    temperature: "Warm Lead",
    pipeline_stage: "Proposal Sent",
    status: "Proposal Sent",
    win_probability: 61,
    expected_revenue: 52e4,
    interactions: 5,
    next_followup_date: "2026-06-21",
    created_at: daysAgo(5)
  },
  {
    id: 1006,
    lead_name: "Lakshmi Venkat",
    company_name: "Venkat Exports",
    phone: "+919944556677",
    email: "lakshmi@venkatexports.in",
    city: "Chennai",
    source: "N8N Webhook",
    form_name: "n8n_inbound",
    temperature: "Cold Lead",
    pipeline_stage: "New Lead",
    status: "New Lead",
    win_probability: 18,
    expected_revenue: 12e4,
    interactions: 0,
    created_at: daysAgo(0)
  },
  {
    id: 1007,
    lead_name: "Harish Bhatt",
    company_name: "Bhatt Manufacturing",
    phone: "+919966778899",
    email: "harish@bhattmfg.com",
    city: "Ahmedabad",
    source: "API",
    form_name: "crm_api_sync",
    temperature: "Warm Lead",
    pipeline_stage: "Contacted",
    status: "Contacted",
    win_probability: 42,
    expected_revenue: 31e4,
    interactions: 3,
    next_followup_date: "2026-06-23",
    created_at: daysAgo(1)
  },
  {
    id: 1008,
    lead_name: "Pooja Agarwal",
    company_name: "Agarwal Healthcare",
    phone: "+919933445566",
    email: "pooja@agarwalhealth.in",
    city: "Jaipur",
    source: "Instagram Ads",
    temperature: "Hot Lead",
    pipeline_stage: "Closed Won",
    status: "Closed Won",
    win_probability: 100,
    expected_revenue: 68e4,
    interactions: 12,
    created_at: daysAgo(14)
  },
  {
    id: 1009,
    lead_name: "Sanjay Rao",
    company_name: "Rao Constructions",
    phone: "+919922334455",
    email: "san@raobuild.in",
    city: "Hyderabad",
    source: "Google Ads",
    temperature: "Cold Lead",
    pipeline_stage: "New Lead",
    status: "New Lead",
    win_probability: 15,
    expected_revenue: 85e3,
    interactions: 0,
    created_at: daysAgo(0)
  },
  {
    id: 1010,
    lead_name: "Neha Kapoor",
    company_name: "Kapoor Studios",
    phone: "+919911223344",
    email: "neha@kapoorstudios.in",
    city: "Mumbai",
    source: "Website",
    temperature: "Warm Lead",
    pipeline_stage: "In Progress",
    status: "In Progress",
    win_probability: 50,
    expected_revenue: 21e4,
    interactions: 7,
    next_followup_date: "2026-06-18",
    created_at: daysAgo(4)
  },
  {
    id: 1011,
    lead_name: "Rohit Saxena",
    company_name: "Saxena Auto",
    phone: "+919900998877",
    email: "rohit@saxenaauto.com",
    city: "Lucknow",
    source: "Facebook Ads",
    temperature: "Hot Lead",
    pipeline_stage: "Negotiation",
    status: "Negotiation",
    win_probability: 78,
    expected_revenue: 89e4,
    interactions: 9,
    next_followup_date: "2026-06-19",
    created_at: daysAgo(6)
  },
  {
    id: 1012,
    lead_name: "Divya Menon",
    company_name: "Menon Foods",
    phone: "+919877112233",
    email: "divya@menonfoods.in",
    city: "Kochi",
    source: "WhatsApp",
    temperature: "Warm Lead",
    pipeline_stage: "Contacted",
    status: "Contacted",
    win_probability: 38,
    expected_revenue: 145e3,
    interactions: 2,
    next_followup_date: "2026-06-24",
    created_at: daysAgo(2)
  },
  {
    id: 1013,
    lead_name: "Karan Gill",
    company_name: "Gill Sports",
    phone: "+919866554433",
    email: "karan@gillsports.in",
    city: "Chandigarh",
    source: "Referral",
    temperature: "Cold Lead",
    pipeline_stage: "New Lead",
    status: "New Lead",
    win_probability: 22,
    expected_revenue: 65e3,
    interactions: 1,
    created_at: daysAgo(1)
  },
  {
    id: 1014,
    lead_name: "Isha Banerjee",
    company_name: "Banerjee Media",
    phone: "+919855443322",
    email: "isha@banerjeemedia.in",
    city: "Kolkata",
    source: "N8N Webhook",
    form_name: "n8n_meta_sync",
    temperature: "Hot Lead",
    pipeline_stage: "Qualified",
    status: "Qualified",
    win_probability: 58,
    expected_revenue: 34e4,
    interactions: 4,
    next_followup_date: "2026-06-20",
    created_at: daysAgo(0)
  },
  {
    id: 1015,
    lead_name: "Manish Tiwari",
    company_name: "Tiwari Infra",
    phone: "+919844332211",
    email: "manish@tiwariinfra.com",
    city: "Bhopal",
    source: "Google Ads",
    temperature: "Warm Lead",
    pipeline_stage: "Closed Won",
    status: "Closed Won",
    win_probability: 100,
    expected_revenue: 42e4,
    interactions: 11,
    created_at: daysAgo(20)
  },
  {
    id: 1016,
    lead_name: "Shreya Dutta",
    company_name: "Dutta EdTech",
    phone: "+919833221100",
    email: "shreya@duttaedtech.in",
    city: "Bangalore",
    source: "Website",
    temperature: "Cold Lead",
    pipeline_stage: "New Lead",
    status: "New Lead",
    win_probability: 12,
    expected_revenue: 55e3,
    interactions: 0,
    created_at: daysAgo(0)
  },
  {
    id: 1017,
    lead_name: "Vivek Choudhary",
    company_name: "Choudhary Pharma",
    phone: "+919822110099",
    email: "vivek@choudharypharma.in",
    city: "Indore",
    source: "Manual",
    temperature: "Hot Lead",
    pipeline_stage: "Proposal Sent",
    status: "Proposal Sent",
    win_probability: 65,
    expected_revenue: 75e4,
    interactions: 6,
    next_followup_date: "2026-06-22",
    created_at: daysAgo(7)
  },
  {
    id: 1018,
    lead_name: "Tanvi Shah",
    company_name: "Shah Jewellers",
    phone: "+919811009988",
    email: "tanvi@shahjewellers.in",
    city: "Surat",
    source: "API",
    form_name: "partner_api",
    temperature: "Warm Lead",
    pipeline_stage: "Contacted",
    status: "Contacted",
    win_probability: 44,
    expected_revenue: 195e3,
    interactions: 3,
    next_followup_date: "2026-06-21",
    created_at: daysAgo(1)
  }
];
function createDemoAssignmentState(baseState, employees, leads) {
  const empByIndex = (i) => employees[i % employees.length];
  const assignments = {};
  const auditLog = [];
  const todayStats = { total: 0, byEmployee: {} };
  const employeeSettings = {
    [106]: { receivingPaused: true, maxCapacity: 15, skills: [] }
  };
  const assignTo = (lead, empIdx, method, hoursAgo = 2) => {
    const emp = empByIndex(empIdx);
    if (!emp) return;
    const leadId = String(lead.id);
    const at = new Date(Date.now() - hoursAgo * 36e5).toISOString();
    assignments[leadId] = {
      employeeId: String(emp.id),
      employeeName: emp.name,
      assignedAt: at,
      method
    };
    auditLog.push({
      id: Date.now() + Number(leadId),
      at,
      action: "assigned",
      leadId,
      leadName: lead.lead_name,
      employeeId: String(emp.id),
      employeeName: emp.name,
      method
    });
    if (hoursAgo < 24) {
      todayStats.total += 1;
      const k = String(emp.id);
      todayStats.byEmployee[k] = (todayStats.byEmployee[k] || 0) + 1;
    }
  };
  const unassignedIds = /* @__PURE__ */ new Set([1003, 1006, 1009, 1013, 1016]);
  leads.forEach((lead, i) => {
    if (unassignedIds.has(lead.id)) return;
    assignTo(lead, i, i % 3 === 0 ? "auto-round-robin" : "manual", i % 5 + 1);
  });
  return {
    ...baseState,
    assignments,
    employeeSettings,
    distribution: {
      mode: "round-robin",
      roundRobinOrder: employees.filter((e) => e.status !== "on_leave").map((e) => e.id),
      rrIndex: 2,
      autoAssign: true
    },
    auditLog: auditLog.sort((a, b) => new Date(b.at) - new Date(a.at)),
    todayKey: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    todayStats
  };
}
function resolveDemoLeads(apiLeads) {
  if (Array.isArray(apiLeads) && apiLeads.length > 0) return apiLeads;
  return dummyLeads;
}
function resolveDemoEmployees(apiEmployees) {
  if (Array.isArray(apiEmployees) && apiEmployees.length > 0) return apiEmployees;
  return dummyEmployees;
}
function createLocalLead(payload) {
  const id = Date.now();
  return {
    success: true,
    lead: {
      id,
      ...payload,
      source: payload.source || "Manual",
      temperature: payload.temperature || "Cold Lead",
      pipeline_stage: payload.pipeline_stage || "New Lead",
      status: payload.status || "New Lead",
      win_probability: payload.win_probability ?? 50,
      expected_revenue: payload.expected_revenue ?? 0,
      interactions: payload.interactions ?? 0,
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    }
  };
}
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry"
];
function AddLead({ onClose, showToast }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [warmth, setWarmth] = useState("Hot Lead");
  const [stage, setStage] = useState("New Lead");
  const [prob, setProb] = useState(50);
  const [dealVal, setDealVal] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    lead_name: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    company_name: "",
    source: "",
    keyword: "",
    ad_content: "",
    campaign_notes: "",
    win_probability: 50,
    purchased: "",
    expected_close_date: "",
    interactions: 0,
    next_followup_date: "",
    mom: "",
    call_summary: "",
    notes: "",
    expected_revenue: ""
  });
  const tabs = [
    { id: "basic", label: "Basic Info", icon: Users },
    { id: "marketing", label: "Marketing", icon: Sparkles },
    { id: "pipeline", label: "Pipeline", icon: BarChart2 },
    { id: "followup", label: "Follow Up", icon: Calendar }
  ];
  const tabIds = tabs.map((t) => t.id);
  const currentIndex = tabIds.indexOf(activeTab);
  const isLastTab = currentIndex === tabIds.length - 1;
  const isFirstTab = currentIndex === 0;
  const setField = (key, val) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };
  const countryCodes = [
    { code: "+91", flag: "🇮🇳" },
    { code: "+1", flag: "🇺🇸" },
    { code: "+44", flag: "🇬🇧" },
    { code: "+61", flag: "🇦🇺" },
    { code: "+971", flag: "🇦🇪" },
    { code: "+65", flag: "🇸🇬" }
  ];
  const formatIndianCurrency = (numStr) => {
    const cleanNum = numStr.replace(/\D/g, "");
    if (!cleanNum) return "";
    let lastThree = cleanNum.substring(cleanNum.length - 3);
    let otherNumbers = cleanNum.substring(0, cleanNum.length - 3);
    if (otherNumbers !== "") {
      lastThree = "," + lastThree;
    }
    const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return formatted;
  };
  const validateTab = (tabId) => {
    const errs = {};
    if (tabId === "basic") {
      if (!formData.lead_name.trim()) errs.lead_name = "Full name is required";
      if (!formData.phone.trim()) errs.phone = "Phone number is required";
      else if (!/^\d{10}$/.test(formData.phone.trim())) errs.phone = "Phone must be exactly 10 digits";
      if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.(com|in|org|net|co|io|edu|gov|uk|au|us)$/i.test(formData.email.trim()))
        errs.email = "Enter a valid email (e.g. name@domain.com)";
      if (!formData.city.trim()) errs.city = "City is required";
      if (!formData.state.trim()) errs.state = "State is required";
      if (!formData.company_name.trim()) errs.company_name = "Business name is required";
    }
    if (tabId === "marketing") {
      if (!formData.source) errs.source = "Lead source is required";
    }
    if (tabId === "pipeline") {
      if (!dealVal.trim()) errs.expected_revenue = "Proposal value is required";
    }
    if (tabId === "followup") {
      if (!formData.next_followup_date) errs.next_followup_date = "Next follow-up date is required";
    }
    return errs;
  };
  const validateAll = () => {
    let allErrors = {};
    let firstTabWithErrors = null;
    for (const tab of tabs) {
      const errs = validateTab(tab.id);
      if (Object.keys(errs).length > 0) {
        allErrors = { ...allErrors, ...errs };
        if (!firstTabWithErrors) firstTabWithErrors = tab.id;
      }
    }
    return { errors: allErrors, firstTab: firstTabWithErrors };
  };
  const handleTabClick = (targetTabId) => {
    const targetIndex = tabIds.indexOf(targetTabId);
    if (targetIndex === currentIndex) return;
    if (targetIndex < currentIndex) {
      setErrors({});
      setActiveTab(targetTabId);
    } else {
      const errs = validateTab(activeTab);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      setErrors({});
      setActiveTab(targetTabId);
    }
  };
  const handleNext = () => {
    const errs = validateTab(activeTab);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setActiveTab(tabIds[currentIndex + 1]);
  };
  const handleBack = () => {
    setErrors({});
    if (!isFirstTab) setActiveTab(tabIds[currentIndex - 1]);
  };
  const handleCreate = async () => {
    const { errors: allErrors, firstTab } = validateAll();
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      if (firstTab) {
        setActiveTab(firstTab);
        const tabLabel = tabs.find((t) => t.id === firstTab)?.label || firstTab;
        showToast(`Please correct the fields in the ${tabLabel} tab`, "error");
      }
      return;
    }
    setLoading(true);
    const payload = {
      ...formData,
      phone: `${countryCode}${formData.phone}`,
      temperature: warmth,
      pipeline_stage: stage,
      status: stage,
      win_probability: prob,
      expected_revenue: formData.expected_revenue ? parseInt(formData.expected_revenue) : 0,
      next_followup_date: formData.next_followup_date || null
    };
    try {
      const data = await apiPost("/api/sales/leads/create", payload);
      if (data.success) {
        invalidateCache("/api/sales/leads");
        showToast("Lead created successfully!");
        onClose(data.lead);
      } else {
        showToast(data.message || "Failed to create lead", "error");
      }
    } catch (error) {
      console.error("Create lead error:", error);
      const useLocal = !error.status || error.status >= 500 || error.message === "Failed to fetch" || /network/i.test(String(error.message || ""));
      if (useLocal) {
        const local = createLocalLead({
          ...payload,
          source: payload.source || "Manual"
        });
        invalidateCache("/api/sales/leads");
        showToast("Lead saved locally (backend unavailable)");
        onClose(local.lead);
      } else {
        showToast(error.message || "Failed to create lead", "error");
      }
    } finally {
      setLoading(false);
    }
  };
  const iconFieldWrap = { position: "relative" };
  const iconStyle = { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#f43f5e", pointerEvents: "none" };
  const pipelineStagesList = ["New Lead", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Converted"];
  const warmthOptions = [
    { label: "🔥 Hot", value: "Hot Lead", style: { background: warmth === "Hot Lead" ? "#be123c" : "#fff1f2", color: warmth === "Hot Lead" ? "#fff" : "#be123c", borderColor: warmth === "Hot Lead" ? "#be123c" : "#fda4af" } },
    { label: "🌡 Warm", value: "Warm Lead", style: { background: warmth === "Warm Lead" ? "#ea580c" : "#fff7ed", color: warmth === "Warm Lead" ? "#fff" : "#c2410c", borderColor: warmth === "Warm Lead" ? "#ea580c" : "#fdba74" } },
    { label: "❄️ Cold", value: "Cold Lead", style: { background: warmth === "Cold Lead" ? "#2563eb" : "#eff6ff", color: warmth === "Cold Lead" ? "#fff" : "#1d4ed8", borderColor: warmth === "Cold Lead" ? "#2563eb" : "#93c5fd" } }
  ];
  const ErrMsg = ({ field }) => errors[field] ? /* @__PURE__ */ jsxs("div", { style: { color: "#f43f5e", fontSize: 11, marginTop: 4 }, children: [
    "⚠ ",
    errors[field]
  ] }) : null;
  return /* @__PURE__ */ jsxs("div", { style: { fontFamily: "inherit" }, children: [
    /* @__PURE__ */ jsx("style", { children: `
          .al-input {
            background: #fff5f5;
            border: 1.5px solid #fecdd3;
            border-radius: 10px;
            padding: 10px 13px;
            font-size: 13px;
            color: #111827;
            outline: none;
            width: 100%;
            box-sizing: border-box;
            font-family: inherit;
            transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
          }
          .al-input:hover {
            background: #fff8f8;
            border-color: #fda4af;
          }
          .al-input:focus {
            background: #ffffff;
            border-color: #be123c;
            box-shadow: 0 0 0 3px rgba(190, 18, 60, 0.12);
          }
          .al-input.error {
            border-color: #f43f5e !important;
            background: #fff5f5;
          }
          .al-input.error:focus {
            box-shadow: 0 0 0 3px rgba(244, 63, 94, 0.12) !important;
          }
          
          /* Custom scrollbar for textareas */
          .al-textarea::-webkit-scrollbar {
            width: 6px;
          }
          .al-textarea::-webkit-scrollbar-track {
            background: #fff5f5;
            border-radius: 10px;
          }
          .al-textarea::-webkit-scrollbar-thumb {
            background: #fda4af;
            border-radius: 10px;
          }
          .al-textarea::-webkit-scrollbar-thumb:hover {
            background: #f43f5e;
          }
        ` }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }, children: [
      /* @__PURE__ */ jsx("div", { style: { width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#be123c,#f43f5e)", display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx(Users, { size: 18, color: "#fff" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: 16, fontWeight: 700, color: "#111827" }, children: "New Lead" }),
        /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: "#f43f5e", marginTop: 1 }, children: "Fill in the details below" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }, children: tabs.map((tab, i) => {
      const Icon = tab.icon;
      const active = activeTab === tab.id;
      const done = i < currentIndex;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => handleTabClick(tab.id),
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: "pointer",
            transition: "all 0.2s ease",
            background: active ? "#be123c" : done ? "#fef2f2" : "#fff5f5",
            color: active ? "#fff" : done ? "#be123c" : "#9ca3af",
            border: `1.5px solid ${active ? "#be123c" : done ? "#fda4af" : "#fecdd3"}`,
            outline: "none"
          },
          onMouseEnter: (e) => {
            if (!active) {
              e.currentTarget.style.background = done ? "#fce7f3" : "#ffe4e6";
              e.currentTarget.style.borderColor = "#fda4af";
            }
          },
          onMouseLeave: (e) => {
            if (!active) {
              e.currentTarget.style.background = done ? "#fef2f2" : "#fff5f5";
              e.currentTarget.style.borderColor = done ? "#fda4af" : "#fecdd3";
            }
          },
          children: [
            done ? /* @__PURE__ */ jsx(CheckCircle2, { size: 13 }) : /* @__PURE__ */ jsx(Icon, { size: 13 }),
            tab.label
          ]
        },
        tab.id
      );
    }) }),
    /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
      activeTab === "basic" && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -30 }, transition: { duration: 0.2 }, children: [
        /* @__PURE__ */ jsx(SectionDivider, { label: "Contact details" }),
        /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }, children: [
          /* @__PURE__ */ jsxs(FormField, { label: "Full Name", required: true, children: [
            /* @__PURE__ */ jsxs("div", { style: iconFieldWrap, children: [
              /* @__PURE__ */ jsx(Users, { size: 14, style: iconStyle }),
              /* @__PURE__ */ jsx("input", { className: `al-input ${errors.lead_name ? "error" : ""}`, style: { paddingLeft: 36 }, placeholder: "e.g. Ananya Sharma", value: formData.lead_name, onChange: (e) => setField("lead_name", e.target.value) })
            ] }),
            /* @__PURE__ */ jsx(ErrMsg, { field: "lead_name" })
          ] }),
          /* @__PURE__ */ jsxs(FormField, { label: "Phone Number", required: true, children: [
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6 }, children: [
              /* @__PURE__ */ jsx("select", { value: countryCode, onChange: (e) => setCountryCode(e.target.value), style: { background: "#fff5f5", border: "1.5px solid #fecdd3", borderRadius: 10, padding: "10px 8px", fontSize: 13, color: "#111827", outline: "none", width: "auto", flexShrink: 0, fontFamily: "inherit" }, children: countryCodes.map((c) => /* @__PURE__ */ jsxs("option", { value: c.code, children: [
                c.flag,
                " ",
                c.code
              ] }, c.code)) }),
              /* @__PURE__ */ jsx("input", { className: `al-input ${errors.phone ? "error" : ""}`, placeholder: "98765 43210", value: formData.phone, maxLength: 10, onChange: (e) => setField("phone", e.target.value.replace(/\D/g, "")) })
            ] }),
            /* @__PURE__ */ jsx(ErrMsg, { field: "phone" })
          ] }),
          /* @__PURE__ */ jsxs(FormField, { label: "Email Address", children: [
            /* @__PURE__ */ jsxs("div", { style: iconFieldWrap, children: [
              /* @__PURE__ */ jsx(Mail, { size: 14, style: iconStyle }),
              /* @__PURE__ */ jsx("input", { className: `al-input ${errors.email ? "error" : ""}`, style: { paddingLeft: 36 }, placeholder: "name@company.com", value: formData.email, onChange: (e) => setField("email", e.target.value) })
            ] }),
            /* @__PURE__ */ jsx(ErrMsg, { field: "email" })
          ] }),
          /* @__PURE__ */ jsxs(FormField, { label: "Business Name", required: true, fullWidth: true, children: [
            /* @__PURE__ */ jsx("input", { className: `al-input ${errors.company_name ? "error" : ""}`, placeholder: "e.g. Penguin India Pvt. Ltd.", value: formData.company_name, onChange: (e) => setField("company_name", e.target.value) }),
            /* @__PURE__ */ jsx(ErrMsg, { field: "company_name" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(SectionDivider, { label: "Location" }),
        /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }, children: [
          /* @__PURE__ */ jsxs(FormField, { label: "City", required: true, children: [
            /* @__PURE__ */ jsx("input", { className: `al-input ${errors.city ? "error" : ""}`, placeholder: "e.g. Mumbai", value: formData.city, onChange: (e) => setField("city", e.target.value) }),
            /* @__PURE__ */ jsx(ErrMsg, { field: "city" })
          ] }),
          /* @__PURE__ */ jsxs(FormField, { label: "State", required: true, children: [
            /* @__PURE__ */ jsx(ALSelect, { options: INDIAN_STATES, value: formData.state, onChange: (val) => setField("state", val), error: !!errors.state, placeholder: "Select state" }),
            /* @__PURE__ */ jsx(ErrMsg, { field: "state" })
          ] })
        ] })
      ] }, "basic"),
      activeTab === "marketing" && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -30 }, transition: { duration: 0.2 }, children: [
        /* @__PURE__ */ jsx(SectionDivider, { label: "Campaign attribution" }),
        /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }, children: [
          /* @__PURE__ */ jsxs(FormField, { label: "Lead Source", required: true, children: [
            /* @__PURE__ */ jsx(ALSelect, { options: ["Website", "Instagram", "Facebook Ads", "Google Ads", "Referral", "Cold Call", "LinkedIn", "WhatsApp", "Walk-in"], value: formData.source, onChange: (val) => setField("source", val), error: !!errors.source }),
            /* @__PURE__ */ jsx(ErrMsg, { field: "source" })
          ] }),
          /* @__PURE__ */ jsx(FormField, { label: "Keyword / Adset", children: /* @__PURE__ */ jsx("input", { className: "al-input", placeholder: "e.g. crm software india", value: formData.keyword, onChange: (e) => setField("keyword", e.target.value) }) }),
          /* @__PURE__ */ jsx(FormField, { label: "Ad / Content", children: /* @__PURE__ */ jsx("input", { className: "al-input", placeholder: "e.g. summer-campaign-v2", value: formData.ad_content, onChange: (e) => setField("ad_content", e.target.value) }) }),
          /* @__PURE__ */ jsx(FormField, { label: "Campaign Notes", fullWidth: true, children: /* @__PURE__ */ jsx("textarea", { rows: 3, className: "al-input al-textarea", style: { resize: "vertical", lineHeight: 1.5 }, placeholder: "Any additional campaign context...", value: formData.campaign_notes, onChange: (e) => setField("campaign_notes", e.target.value) }) })
        ] })
      ] }, "marketing"),
      activeTab === "pipeline" && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -30 }, transition: { duration: 0.2 }, children: [
        /* @__PURE__ */ jsx(SectionDivider, { label: "Deal details" }),
        /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }, children: [
          /* @__PURE__ */ jsx(FormField, { label: "Pipeline Stage", fullWidth: true, children: /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }, children: pipelineStagesList.map((s) => {
            const active = stage === s;
            return /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setStage(s),
                style: {
                  padding: "8px 14px",
                  borderRadius: 10,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all .2s ease",
                  background: active ? "#be123c" : "#fff5f5",
                  color: active ? "#fff" : "#be123c",
                  border: `1.5px solid ${active ? "#be123c" : "#fda4af"}`,
                  boxShadow: active ? "0 4px 12px rgba(190, 18, 60, 0.25)" : "none",
                  outline: "none"
                },
                onMouseEnter: (e) => {
                  if (!active) {
                    e.currentTarget.style.background = "#ffe4e6";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                },
                onMouseLeave: (e) => {
                  if (!active) {
                    e.currentTarget.style.background = "#fff5f5";
                    e.currentTarget.style.transform = "none";
                  }
                },
                children: s
              },
              s
            );
          }) }) }),
          /* @__PURE__ */ jsx(FormField, { label: "Lead Warmth", fullWidth: true, children: /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }, children: warmthOptions.map((w) => {
            const active = warmth === w.value;
            return /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setWarmth(w.value),
                style: {
                  padding: "8px 18px",
                  borderRadius: 99,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  border: "1.5px solid",
                  transition: "all .2s ease",
                  boxShadow: active ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
                  transform: active ? "scale(1.03)" : "none",
                  outline: "none",
                  ...w.style
                },
                onMouseEnter: (e) => {
                  if (!active) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                },
                onMouseLeave: (e) => {
                  if (!active) {
                    e.currentTarget.style.transform = "none";
                  }
                },
                children: w.label
              },
              w.value
            );
          }) }) }),
          /* @__PURE__ */ jsxs(
            FormField,
            {
              label: /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }, children: [
                /* @__PURE__ */ jsx("span", { children: "Proposal Value (₹)" }),
                dealVal && /* @__PURE__ */ jsxs("span", { style: { fontSize: 10, background: "#fecdd3", color: "#be123c", padding: "1px 6px", borderRadius: 4, textTransform: "none", fontWeight: 700 }, children: [
                  "₹",
                  dealVal
                ] })
              ] }),
              required: true,
              children: [
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                  /* @__PURE__ */ jsx("span", { style: { fontSize: 16, fontWeight: 700, color: "#be123c" }, children: "₹" }),
                  /* @__PURE__ */ jsx("input", { className: `al-input ${errors.expected_revenue ? "error" : ""}`, style: { flex: 1 }, placeholder: "2,50,000", value: dealVal, onChange: (e) => {
                    const rawVal = e.target.value.replace(/\D/g, "");
                    const formatted = formatIndianCurrency(rawVal);
                    setDealVal(formatted);
                    setField("expected_revenue", rawVal);
                  } })
                ] }),
                /* @__PURE__ */ jsx("div", { style: { background: "#fce7f3", borderRadius: 99, height: 5, marginTop: 8, overflow: "hidden" }, children: /* @__PURE__ */ jsx("div", { style: { height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#be123c,#f43f5e)", width: `${Math.min(parseInt(dealVal.replace(/\D/g, "")) / 1e6 * 100 || 0, 100)}%`, transition: "width .3s ease" } }) }),
                /* @__PURE__ */ jsx(ErrMsg, { field: "expected_revenue" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }, children: [
                /* @__PURE__ */ jsx("span", { children: "Win Probability" }),
                /* @__PURE__ */ jsxs("span", { style: {
                  fontSize: 10,
                  padding: "2px 8px",
                  borderRadius: 6,
                  textTransform: "none",
                  fontWeight: 700,
                  background: prob >= 70 ? "#dcfce7" : prob >= 40 ? "#fef3c7" : "#ffe4e6",
                  color: prob >= 70 ? "#15803d" : prob >= 40 ? "#b45309" : "#be123c",
                  transition: "all 0.15s ease"
                }, children: [
                  prob,
                  "% — ",
                  prob >= 70 ? "High Chance" : prob >= 40 ? "Medium Chance" : "Low Chance"
                ] })
              ] }),
              children: /* @__PURE__ */ jsx("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 4 }, children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 100,
                  step: 1,
                  value: prob,
                  onChange: (e) => {
                    setProb(Number(e.target.value));
                    setField("win_probability", Number(e.target.value));
                  },
                  style: {
                    width: "100%",
                    accentColor: prob >= 70 ? "#22c55e" : prob >= 40 ? "#f59e0b" : "#be123c",
                    cursor: "pointer"
                  }
                }
              ) })
            }
          ),
          /* @__PURE__ */ jsx(FormField, { label: "Purchased", children: /* @__PURE__ */ jsx("input", { className: "al-input", placeholder: "Product / plan purchased", value: formData.purchased, onChange: (e) => setField("purchased", e.target.value) }) }),
          /* @__PURE__ */ jsx(FormField, { label: "Expected Close Date", children: /* @__PURE__ */ jsx("input", { type: "date", className: "al-input", value: formData.expected_close_date, onChange: (e) => setField("expected_close_date", e.target.value) }) })
        ] })
      ] }, "pipeline"),
      activeTab === "followup" && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -30 }, transition: { duration: 0.2 }, children: [
        /* @__PURE__ */ jsx(SectionDivider, { label: "Follow-up log" }),
        /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }, children: [
          /* @__PURE__ */ jsx(FormField, { label: "Interactions (count)", children: /* @__PURE__ */ jsx("input", { type: "number", className: "al-input", placeholder: "e.g. 3", min: 0, value: formData.interactions, onChange: (e) => setField("interactions", e.target.value) }) }),
          /* @__PURE__ */ jsxs(FormField, { label: "Next Follow-up Date", required: true, children: [
            /* @__PURE__ */ jsx("input", { type: "date", className: `al-input ${errors.next_followup_date ? "error" : ""}`, value: formData.next_followup_date, onChange: (e) => setField("next_followup_date", e.target.value) }),
            /* @__PURE__ */ jsx(ErrMsg, { field: "next_followup_date" })
          ] }),
          /* @__PURE__ */ jsx(FormField, { label: "MOM (Minutes of Meeting)", fullWidth: true, children: /* @__PURE__ */ jsx("textarea", { rows: 4, className: "al-input al-textarea", style: { resize: "vertical", lineHeight: 1.5 }, placeholder: "Key points discussed...", value: formData.mom, onChange: (e) => setField("mom", e.target.value) }) }),
          /* @__PURE__ */ jsx(FormField, { label: "Call Summary", fullWidth: true, children: /* @__PURE__ */ jsx("textarea", { rows: 4, className: "al-input al-textarea", style: { resize: "vertical", lineHeight: 1.5 }, placeholder: "Summary of the last call...", value: formData.call_summary, onChange: (e) => setField("call_summary", e.target.value) }) }),
          /* @__PURE__ */ jsx(FormField, { label: "Meeting Notes", fullWidth: true, children: /* @__PURE__ */ jsx("textarea", { rows: 4, className: "al-input al-textarea", style: { resize: "vertical", lineHeight: 1.5 }, placeholder: "Observations, objections, next steps...", value: formData.notes, onChange: (e) => setField("notes", e.target.value) }) })
        ] })
      ] }, "followup")
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 12, marginTop: 28, paddingTop: 20, borderTop: "1px solid #fce7f3", flexWrap: "wrap" }, children: [
      isFirstTab ? /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, style: { flex: 1, minWidth: 100, padding: 12, borderRadius: 12, border: "1.5px solid #fecdd3", background: "#fff", color: "#6b7280", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }, children: "Cancel" }) : /* @__PURE__ */ jsx("button", { type: "button", onClick: handleBack, style: { flex: 1, minWidth: 100, padding: 12, borderRadius: 12, border: "1.5px solid #fecdd3", background: "#fff", color: "#6b7280", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }, children: "← Back" }),
      !isLastTab ? /* @__PURE__ */ jsx("button", { type: "button", onClick: handleNext, style: { flex: 1, minWidth: 100, padding: 12, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#be123c,#f43f5e)", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }, children: "Next →" }) : /* @__PURE__ */ jsx("button", { type: "button", onClick: handleCreate, disabled: loading, style: { flex: 1, minWidth: 100, padding: 12, borderRadius: 12, border: "none", background: loading ? "#fda4af" : "linear-gradient(135deg,#be123c,#f43f5e)", color: "#fff", fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }, children: loading ? "Creating..." : "Create Lead" })
    ] })
  ] });
}
function SectionDivider({ label }) {
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }, children: [
    /* @__PURE__ */ jsx("span", { style: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#f43f5e", whiteSpace: "nowrap" }, children: label }),
    /* @__PURE__ */ jsx("div", { style: { flex: 1, height: 1, background: "#fce7f3" } })
  ] });
}
function FormField({ label, children, fullWidth = false, required = false }) {
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 5, ...fullWidth ? { gridColumn: "1 / -1" } : {} }, children: [
    /* @__PURE__ */ jsxs("label", { style: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: "#be123c" }, children: [
      label,
      required && /* @__PURE__ */ jsx("span", { style: { color: "#f43f5e", marginLeft: 2 }, children: "*" })
    ] }),
    children
  ] });
}
function ALSelect({ options, value = "", onChange, error = false, placeholder = "Select" }) {
  return /* @__PURE__ */ jsxs(
    "select",
    {
      value,
      onChange: (e) => onChange && onChange(e.target.value),
      style: {
        background: "#fff5f5",
        border: `1.5px solid ${error ? "#f43f5e" : "#fecdd3"}`,
        borderRadius: 10,
        padding: "10px 36px 10px 13px",
        fontSize: 13,
        color: value ? "#111827" : "#9ca3af",
        outline: "none",
        width: "100%",
        fontFamily: "inherit",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23f43f5e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center"
      },
      children: [
        /* @__PURE__ */ jsx("option", { value: "", children: placeholder }),
        options.map((o) => /* @__PURE__ */ jsx("option", { value: o, children: o }, o))
      ]
    }
  );
}
function AddLeadDrawer({
  open,
  onClose,
  showToast,
  title = "New Lead",
  subtitle,
  width = "drawer-panel"
}) {
  const handleClose = (result) => onClose?.(result);
  return /* @__PURE__ */ jsxs(Drawer, { open, onClose: () => handleClose(), title, width, children: [
    subtitle && /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mb-4 pb-3 border-b border-rose-50", children: subtitle }),
    /* @__PURE__ */ jsx(AddLead, { onClose: handleClose, showToast })
  ] });
}
export {
  AddLeadDrawer as A,
  dummyLeads as a,
  resolveDemoLeads as b,
  createDemoAssignmentState as c,
  dummyEmployees as d,
  resolveDemoEmployees as r
};
