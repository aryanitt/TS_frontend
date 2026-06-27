import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Download, DollarSign, Activity, TrendingUp, FileText, Sparkles, Users } from "lucide-react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { G as GlassCard, S as SectionHeader } from "./Primitives-CmGbnOU9.js";
import { r as revenueSeries, c as conversionSeries } from "./mock-slc6FWz6.js";
import { motion } from "framer-motion";
import { V as readCachedJson, z as apiGet } from "./_-BNdSRMjW.js";
import "react-router-dom";
import "@tanstack/react-query";
import "react-dom";
import "react-hot-toast";
const globalStyles = `
  /* rose scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: #f43f5e transparent;
  }
  *::-webkit-scrollbar { width: 6px; height: 6px; }
  *::-webkit-scrollbar-track { background: transparent; }
  *::-webkit-scrollbar-thumb {
    background-color: #f43f5e;
    border-radius: 999px;
  }
  *::-webkit-scrollbar-thumb:hover { background-color: #e11d48; }

  /* KPI card hover — bottom bar + border + shadow */
  .kpi-card {
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    background: white;
    border: 1.5px solid #fecdd3;
    box-shadow: 0 1px 6px rgba(0,0,0,0.04);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .kpi-card:hover {
    border-color: #f43f5e;
    box-shadow: 0 8px 28px rgba(244,63,94,0.18);
  }
  .kpi-card .bottom-bar {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    border-radius: 0 0 1rem 1rem;
    background: linear-gradient(90deg, #f43f5e, #fb7185);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .kpi-card:hover .bottom-bar { opacity: 1; }

  /* GlassCard section hover */
  .section-card {
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .section-card:hover {
    border-color: #f43f5e !important;
    box-shadow: 0 0 0 1px #f43f5e22, 0 8px 32px rgba(244,63,94,0.13) !important;
  }

  /* Goal item hover — rose tint instead of gray */
  .goal-item {
    border-radius: 0.75rem;
    padding: 0.75rem;
    cursor: pointer;
    transition: background 0.15s;
  }
  .goal-item:hover {
    background: rgba(244, 63, 94, 0.07);
  }
`;
const goals = [
  { label: "Revenue target", current: 1240, target: 1500, unit: "k" },
  { label: "Closed deals", current: 84, target: 120, unit: "" },
  { label: "Qualified leads", current: 146, target: 180, unit: "" },
  { label: "Customer NPS", current: 64, target: 70, unit: "" }
];
const kpiCards = [
  { label: "Total Revenue", value: "$1.24M", Icon: DollarSign },
  { label: "Conversion Rate", value: "24.6%", Icon: Activity },
  { label: "MoM Growth", value: "12.8%", Icon: TrendingUp },
  { label: "Forecast Q3", value: "$1.62M", Icon: FileText }
];
function Reports() {
  const [exportFormat, setExportFormat] = useState("PDF");
  const [teamMembers, setTeamMembers] = useState(() => {
    const cached = readCachedJson("/api/team/employees");
    return cached?.success ? cached.employees.map((e) => ({
      ...e,
      productivity: e.productivity || Math.floor(Math.random() * 25) + 70,
      convertedLeads: e.convertedLeads || Math.floor(Math.random() * 10) + 2,
      callsDone: e.callsDone || Math.floor(Math.random() * 80) + 20
    })) : [];
  });
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await apiGet("/api/team/employees");
        if (data.success) {
          setTeamMembers(
            data.employees.map((e) => ({
              ...e,
              productivity: e.productivity || Math.floor(Math.random() * 25) + 70,
              convertedLeads: e.convertedLeads || Math.floor(Math.random() * 10) + 2,
              callsDone: e.callsDone || Math.floor(Math.random() * 80) + 20
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    };
    fetchEmployees();
  }, []);
  const downloadReport = (format) => {
    setExportFormat(format);
    if (format === "CSV") {
      const header = ["Month", "Revenue", "Forecast"];
      const rows = revenueSeries.map((row) => [row.month, row.revenue, row.forecast]);
      const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "revenue-report.csv";
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === "PDF") {
      alert("PDF export placeholder: Generate a styled PDF using a reporting library or server-side PDF service.");
    } else {
      alert(`Exporting to ${format} is not yet enabled in this preview.`);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 page-shell min-w-0", children: [
    /* @__PURE__ */ jsx("style", { children: globalStyles }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm", style: { color: "oklch(0.52 0.02 280)" }, children: "Export the current report in PDF, CSV, or XLSX format." }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-2", children: ["PDF", "CSV", "XLSX"].map((fmt) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => downloadReport(fmt),
          className: `px-3 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 ${exportFormat === fmt ? "gradient-primary text-primary-foreground" : "border border-border hover:text-foreground"}`,
          style: exportFormat !== fmt ? { color: "oklch(0.52 0.02 280)" } : {},
          children: [
            /* @__PURE__ */ jsx(Download, { className: "w-3.5 h-3.5" }),
            fmt
          ]
        },
        fmt
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4", children: kpiCards.map(({ label, value, Icon }, i) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        whileHover: { y: -3 },
        transition: { duration: 0.2 },
        className: "kpi-card",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: { background: "linear-gradient(135deg, #fff5f6 0%, #ffffff 60%)" }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "bottom-bar" }),
          /* @__PURE__ */ jsxs("div", { className: "relative p-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest", style: { color: "#f43f5e" }, children: label }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                  style: { border: "1.5px solid #fda4af", background: "#fff1f2", color: "#f43f5e" },
                  children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold tracking-tight", style: { color: "#1a1a1a" }, children: value })
          ] })
        ]
      },
      i
    )) }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "section-card p-6 relative overflow-hidden border border-rose-500", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-primary font-semibold", children: "AI Summary" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "font-display text-sm font-semibold mb-2 text-gray-700", children: "You're tracking 12% above plan with a strong Q3 forecast" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm max-w-3xl text-gray-500", children: "Revenue is accelerating across Enterprise. Conversion improved 3.1pp from last quarter, driven by faster qualification. The biggest risk is concentration: 38% of pipeline sits with two AEs. Consider redistributing to reduce single-point-of-failure exposure." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs(GlassCard, { className: "section-card p-6 xl:col-span-2", children: [
        /* @__PURE__ */ jsx(SectionHeader, { title: "Revenue analytics", subtitle: "Monthly performance vs forecast" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 px-2 xl:px-4", children: [
          /* @__PURE__ */ jsx("style", { children: `
    .rev-analytics-scroll::-webkit-scrollbar { height: 4px; }
    .rev-analytics-scroll::-webkit-scrollbar-track { background: #fff1f2; border-radius: 9999px; }
    .rev-analytics-scroll::-webkit-scrollbar-thumb { background: #f43f5e; border-radius: 9999px; }
    .rev-analytics-scroll::-webkit-scrollbar-thumb:hover { background: #be123c; }
  ` }),
          /* @__PURE__ */ jsx("div", { className: "rev-analytics-scroll", style: { overflowX: "auto", WebkitOverflowScrolling: "touch" }, children: /* @__PURE__ */ jsx("div", { style: { minWidth: 600, height: 336 }, children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: revenueSeries, margin: { top: 10, right: 25, left: 5, bottom: 0 }, children: [
            /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "r1", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.58 0.22 18)", stopOpacity: 0.65 }),
              /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.58 0.22 18)", stopOpacity: 0 })
            ] }) }),
            /* @__PURE__ */ jsx(CartesianGrid, { stroke: "oklch(0.28 0.014 25 / 0.35)", vertical: false }),
            /* @__PURE__ */ jsx(XAxis, { dataKey: "month", stroke: "oklch(0.55 0.02 280)", fontSize: 11, tickLine: false, axisLine: false, padding: { left: 12, right: 12 } }),
            /* @__PURE__ */ jsx(YAxis, { stroke: "oklch(0.55 0.02 280)", fontSize: 11, tickLine: false, axisLine: false, width: 35 }),
            /* @__PURE__ */ jsx(Tooltip, { contentStyle: { background: "oklch(0.18 0.014 25)", border: "1px solid oklch(0.28 0.014 25)", borderRadius: 14, color: "#fff" } }),
            /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "revenue", stroke: "oklch(0.65 0.26 20)", strokeWidth: 3, fill: "url(#r1)" }),
            /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "forecast", stroke: "oklch(0.72 0.16 240)", strokeWidth: 2, strokeDasharray: "5 5", fill: "transparent" })
          ] }) }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-4 border-t border-border/60 flex flex-wrap items-center gap-5 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-red-500" }),
            /* @__PURE__ */ jsx("span", { style: { color: "oklch(0.52 0.02 280)" }, children: "Revenue growth accelerated after Q2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full", style: { background: "oklch(0.72 0.16 240)" } }),
            /* @__PURE__ */ jsx("span", { style: { color: "oklch(0.52 0.02 280)" }, children: "Forecast trend remains stable" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(GlassCard, { className: "section-card p-6 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsx(SectionHeader, { title: "Lead Sources", subtitle: "Where your leads are coming from" }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-[320px] h-[260px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
          /* @__PURE__ */ jsx(
            Pie,
            {
              data: [
                { name: "Facebook Ads", value: 38 },
                { name: "Google Ads", value: 24 },
                { name: "Website", value: 18 },
                { name: "LinkedIn", value: 12 },
                { name: "Referrals", value: 8 }
              ],
              dataKey: "value",
              cx: "50%",
              cy: "45%",
              innerRadius: 52,
              outerRadius: 78,
              paddingAngle: 3,
              children: ["oklch(0.68 0.22 18)", "oklch(0.72 0.18 240)", "oklch(0.72 0.18 140)", "oklch(0.74 0.18 70)", "oklch(0.7 0.18 320)"].map((color, i) => /* @__PURE__ */ jsx(Cell, { fill: color }, i))
            }
          ),
          /* @__PURE__ */ jsx("text", { x: "50%", y: "40%", textAnchor: "middle", dominantBaseline: "middle", fill: "#FF4D8D", fontSize: 22, fontWeight: "700", children: "428" }),
          /* @__PURE__ */ jsx("text", { x: "50%", y: "52%", textAnchor: "middle", dominantBaseline: "middle", fill: "#FF4D8D", fontSize: 11, children: "Leads" }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: { background: "oklch(0.18 0.014 25)", border: "1px solid oklch(0.28 0.014 25)", borderRadius: 12, color: "#fff" } })
        ] }) }) }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 grid grid-cols-2 gap-y-3 gap-x-4", children: [
          { label: "Facebook Ads", color: "oklch(0.68 0.22 18)" },
          { label: "Google Ads", color: "oklch(0.72 0.18 240)" },
          { label: "Website", color: "oklch(0.72 0.18 140)" },
          { label: "LinkedIn", color: "oklch(0.74 0.18 70)" },
          { label: "Referrals", color: "oklch(0.7 0.18 320)" }
        ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", style: { color: "oklch(0.52 0.02 280)" }, children: [
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full", style: { background: item.color } }),
          /* @__PURE__ */ jsx("span", { children: item.label })
        ] }, i)) }),
        /* @__PURE__ */ jsx("div", { className: "mt-5 pt-4 border-t border-border/60", children: /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed", style: { color: "oklch(0.52 0.02 280)" }, children: "Facebook Ads generated the highest volume of leads this month, while Website and LinkedIn traffic showed better conversion quality." }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(GlassCard, { className: "section-card p-6", children: [
        /* @__PURE__ */ jsx(SectionHeader, { title: "Conversion by stage" }),
        /* @__PURE__ */ jsx("div", { className: "h-64 overflow-x-auto", children: /* @__PURE__ */ jsx("div", { className: "h-64", style: { minWidth: 560 }, children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: conversionSeries, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { stroke: "oklch(0.28 0.014 25 / 0.4)", vertical: false }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "name", stroke: "oklch(0.55 0.02 280)", fontSize: 11 }),
          /* @__PURE__ */ jsx(YAxis, { stroke: "oklch(0.55 0.02 280)", fontSize: 11 }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: { background: "oklch(0.18 0.014 25)", border: "1px solid oklch(0.28 0.014 25)", borderRadius: 12, color: "#fff" } }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "value", fill: "oklch(0.58 0.22 18)", radius: [8, 8, 0, 0] })
        ] }) }) }) })
      ] }),
      /* @__PURE__ */ jsxs(GlassCard, { className: "section-card p-6", children: [
        /* @__PURE__ */ jsx(SectionHeader, { title: "Goal completion", subtitle: "Against quarterly targets" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: goals.map((g) => {
          const pct = Math.min(100, Math.round(g.current / g.target * 100));
          return /* @__PURE__ */ jsxs("div", { className: "goal-item", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs mb-2", style: { color: "oklch(0.52 0.02 280)" }, children: [
              /* @__PURE__ */ jsx("span", { children: g.label }),
              /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                g.current,
                g.unit,
                " / ",
                g.target,
                g.unit,
                " · ",
                pct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full overflow-hidden", style: { background: "oklch(0.28 0.014 25 / 0.4)" }, children: /* @__PURE__ */ jsx("div", { className: "h-full gradient-primary", style: { width: `${pct}%` } }) })
          ] }, g.label);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "section-card p-6", children: [
      /* @__PURE__ */ jsx(
        SectionHeader,
        {
          title: "Team Comparison",
          subtitle: "Productivity and activity across all team members"
        }
      ),
      /* @__PURE__ */ jsx("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: 10,
        margin: "16px 0 20px"
      }, children: [
        { label: "Team members", value: teamMembers.length || "—" },
        {
          label: "Avg productivity",
          value: teamMembers.length ? Math.round(teamMembers.reduce((s, e) => s + (e.productivity || 75), 0) / teamMembers.length) + "%" : "—"
        },
        { label: "Total converted", value: teamMembers.reduce((s, e) => s + (e.convertedLeads || 0), 0) || "—" },
        { label: "Total calls", value: teamMembers.reduce((s, e) => s + (e.callsDone || 0), 0) || "—" }
      ].map(({ label, value }) => /* @__PURE__ */ jsxs("div", { style: {
        background: "#fff5f7",
        border: "1px solid #fecdd3",
        borderRadius: 10,
        padding: "12px 14px"
      }, children: [
        /* @__PURE__ */ jsx("p", { style: { fontSize: 11, color: "#be123c", marginBottom: 4 }, children: label }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: 22, fontWeight: 700, color: "#7f1d1d" }, children: value })
      ] }, label)) }),
      /* @__PURE__ */ jsx("div", { style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 18,
        fontSize: 12,
        color: "#be123c",
        marginBottom: 14
      }, children: [
        { label: "Productivity %", color: "#f43f5e", dash: false },
        { label: "Calls Done", color: "#3b82f6", dash: true },
        { label: "Converted", color: "#22c55e", dash: false }
      ].map(({ label, color, dash }) => /* @__PURE__ */ jsxs("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ jsx("span", { style: {
          width: 18,
          height: 2,
          borderRadius: 2,
          background: dash ? "transparent" : color,
          backgroundImage: dash ? `repeating-linear-gradient(90deg,${color} 0 5px,transparent 5px 9px)` : void 0,
          flexShrink: 0
        } }),
        label
      ] }, label)) }),
      teamMembers.length === 0 ? /* @__PURE__ */ jsxs("div", { style: {
        height: 280,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsx(Users, { style: { width: 32, height: 32, color: "#fca5a5" } }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: 13, color: "#be123c" }, children: "No team members found" }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: 11, color: "#fca5a5" }, children: "Add members in Team Management" })
      ] }) : /* @__PURE__ */ jsxs("div", { style: { overflowX: "auto", WebkitOverflowScrolling: "touch" }, children: [
        /* @__PURE__ */ jsx("style", { children: `
        .team-chart-scroll::-webkit-scrollbar { height: 4px; }
        .team-chart-scroll::-webkit-scrollbar-track { background: #fff1f2; border-radius: 999px; }
        .team-chart-scroll::-webkit-scrollbar-thumb { background: #f43f5e; border-radius: 999px; }
      ` }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "team-chart-scroll",
            style: {
              overflowX: "auto",
              WebkitOverflowScrolling: "touch"
            },
            children: /* @__PURE__ */ jsx("div", { style: { minWidth: Math.max(480, teamMembers.length * 120), height: 300 }, children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
              BarChart,
              {
                data: teamMembers.map((e) => ({
                  name: e.name.split(" ")[0],
                  fullName: e.name,
                  productivity: e.productivity,
                  callsDone: e.callsDone,
                  convertedLeads: e.convertedLeads,
                  revenue: Math.round((e.revenue || 0) / 1e3)
                })),
                margin: { top: 10, right: 16, left: -4, bottom: 0 },
                barCategoryGap: "30%",
                children: [
                  /* @__PURE__ */ jsx(CartesianGrid, { stroke: "#fecdd3", vertical: false, strokeDasharray: "3 4" }),
                  /* @__PURE__ */ jsx(
                    XAxis,
                    {
                      dataKey: "name",
                      tick: { fill: "#be123c", fontSize: 12 },
                      tickLine: false,
                      axisLine: false
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    YAxis,
                    {
                      tick: { fill: "#be123c", fontSize: 11 },
                      tickLine: false,
                      axisLine: false,
                      width: 36
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Tooltip,
                    {
                      content: ({ active, payload, label }) => {
                        if (!active || !payload?.length) return null;
                        const d = payload[0]?.payload;
                        return /* @__PURE__ */ jsxs("div", { style: {
                          background: "#fff",
                          border: "1px solid #fecdd3",
                          borderRadius: 12,
                          padding: "12px 16px",
                          minWidth: 180,
                          boxShadow: "0 8px 24px rgba(244,63,94,0.15)"
                        }, children: [
                          /* @__PURE__ */ jsx("p", { style: {
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#7f1d1d",
                            marginBottom: 10,
                            paddingBottom: 8,
                            borderBottom: "1px solid #fecdd3"
                          }, children: d.fullName }),
                          [
                            { label: "Productivity", value: d.productivity + "%", dot: "#f43f5e" },
                            { label: "Calls done", value: d.callsDone, dot: "#3b82f6" },
                            { label: "Converted leads", value: d.convertedLeads, dot: "#22c55e" },
                            { label: "Revenue", value: "₹" + d.revenue + "k", dot: "#a855f7" }
                          ].map(({ label: label2, value, dot }) => /* @__PURE__ */ jsxs("div", { style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 5,
                            fontSize: 12
                          }, children: [
                            /* @__PURE__ */ jsxs("span", { style: {
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              color: "#9f1239"
                            }, children: [
                              /* @__PURE__ */ jsx("span", { style: {
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background: dot,
                                flexShrink: 0
                              } }),
                              label2
                            ] }),
                            /* @__PURE__ */ jsx("span", { style: { fontWeight: 700, color: "#7f1d1d" }, children: value })
                          ] }, label2))
                        ] });
                      }
                    }
                  ),
                  /* @__PURE__ */ jsx(Bar, { dataKey: "productivity", fill: "#f43f5e", radius: [6, 6, 0, 0], maxBarSize: 40 }),
                  /* @__PURE__ */ jsx(Bar, { dataKey: "callsDone", fill: "#3b82f6", radius: [6, 6, 0, 0], maxBarSize: 40 }),
                  /* @__PURE__ */ jsx(Bar, { dataKey: "convertedLeads", fill: "#22c55e", radius: [6, 6, 0, 0], maxBarSize: 40 })
                ]
              }
            ) }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { style: { fontSize: 10, color: "#fca5a5", textAlign: "center", marginTop: 8 }, children: "← scroll to see all members →" })
    ] })
  ] });
}
export {
  Reports as default
};
