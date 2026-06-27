import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, Zap, AlertTriangle, TrendingUp, Star, Snowflake, Thermometer, Flame, DollarSign, Award, Users, UserCheck, Percent, Target, BarChart2, Activity, PhoneCall, Calendar, MessageSquare, Clock, Sparkles } from "lucide-react";
import { a as StatCard } from "./Primitives-CmGbnOU9.js";
import { s as salesKpis } from "./mock-slc6FWz6.js";
import { A as AddLeadDrawer } from "./AddLeadDrawer-2QdzJ1Rt.js";
import { z as apiGet } from "./_-BNdSRMjW.js";
import { u as useIsMobile } from "./use-mobile-BsFue-bT.js";
import "@tanstack/react-query";
import "react-hot-toast";
const cardHoverStyle = {
  transition: "border-color  .2s ease, box-shadow .2s ease, transform .2s ease"
};
const cardBase = {
  background: "#fff",
  border: "1px solid #fda4af",
  borderRadius: 16,
  boxShadow: "0 2px 8px rgba(0,0,0,.04)",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#fecdd3"
};
const cardHovered = {
  borderColor: "#dc2626",
  boxShadow: "0 8px 24px rgba(220,38,38,.14)",
  transform: "translateY(-2px)"
};
function SectionCard({ title, subtitle, children, className = "", action = null, bodyClassName = "" }) {
  const [hov, setHov] = useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onMouseEnter: () => setHov(true),
      onMouseLeave: () => setHov(false),
      style: { ...cardBase, ...hov ? cardHovered : {}, ...cardHoverStyle },
      className: `overflow-hidden ${className}`,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center justify-between px-3 sm:px-5 pt-3 sm:pt-5 pb-2 sm:pb-3",
            style: { borderBottom: "1px solid #fce7f3" },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm font-bold text-rose-700", children: title }),
                subtitle && /* @__PURE__ */ jsx("div", { className: "text-[10px] sm:text-[11px] text-gray-700 mt-0.5 line-clamp-1 sm:line-clamp-none", children: subtitle })
              ] }),
              action
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: `p-3 sm:p-5 w-full min-w-0 ${bodyClassName}`, children })
      ]
    }
  );
}
const kpiIconMap = [
  { keys: ["revenue", "arr", "mrr"], icon: DollarSign },
  { keys: ["sales"], icon: TrendingUp },
  { keys: ["deal", "deals", "won", "closed"], icon: Award },
  { keys: ["lead", "leads", "prospect"], icon: Users },
  { keys: ["qualified", "qualification"], icon: UserCheck },
  { keys: ["conversion", "rate", "win rate"], icon: Percent },
  { keys: ["target", "quota", "goal"], icon: Target },
  { keys: ["pipeline"], icon: BarChart2 },
  { keys: ["activity", "activities"], icon: Activity },
  { keys: ["call", "calls"], icon: PhoneCall },
  { keys: ["meeting", "meetings"], icon: Calendar },
  { keys: ["message", "messages", "chat"], icon: MessageSquare },
  { keys: ["avg", "average", "size"], icon: BarChart2 },
  { keys: ["cycle", "time", "days", "speed"], icon: Clock },
  { keys: ["new", "inbound", "outbound"], icon: Sparkles },
  { keys: ["hot"], icon: Flame },
  { keys: ["warm"], icon: Thermometer },
  { keys: ["cold"], icon: Snowflake }
];
function getKpiIcon(label) {
  const lower = label.toLowerCase();
  for (const e of kpiIconMap) {
    if (e.keys.some((k) => lower.includes(k))) return e.icon;
  }
  return TrendingUp;
}
function PremiumKPICard({ k, index }) {
  const Icon = getKpiIcon(k.label);
  const tones = ["success", "purple", "warning", "info", "primary", "indigo"];
  const tone = tones[index % tones.length];
  return /* @__PURE__ */ jsx(
    StatCard,
    {
      label: k.label,
      value: k.value,
      change: k.change,
      sub: "vs last period",
      icon: Icon,
      tone,
      hover: true
    }
  );
}
const STAGES = ["Contacted", "Qualified", "Meeting", "Negotiation", "Conversion"];
const TEMP_CONFIG = {
  Hot: { Icon: Flame, color: "#dc2626", light: "#fff1f2", border: "#fecdd3", rgb: "220,38,38" },
  Warm: { Icon: Thermometer, color: "#ea580c", light: "#fff7ed", border: "#fed7aa", rgb: "234,88,12" },
  Cold: { Icon: Snowflake, color: "#2563eb", light: "#eff6ff", border: "#bfdbfe", rgb: "37,99,235" }
};
function PipelineTooltip({ stage, count, convPct, dropPct, prevStage, anchorRef, visible }) {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  useEffect(() => {
    if (!visible || !anchorRef?.current) return;
    const TOOLTIP_W = 192, TOOLTIP_H = 110, MARGIN = 8;
    const update = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;
      const vw = window.innerWidth;
      let left = rect.left + rect.width / 2 - TOOLTIP_W / 2 + window.scrollX;
      left = Math.max(MARGIN, Math.min(left, vw - TOOLTIP_W - MARGIN));
      const top = rect.top + window.scrollY - TOOLTIP_H - 10;
      setPos({ top, left });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [visible, anchorRef]);
  if (typeof document === "undefined") return null;
  return ReactDOM.createPortal(
    /* @__PURE__ */ jsx(AnimatePresence, { children: visible && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 6, scale: 0.94 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 6, scale: 0.94 },
        transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
        style: {
          position: "fixed",
          top: pos.top,
          left: pos.left,
          zIndex: 99999,
          pointerEvents: "none",
          width: 192
        },
        children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[oklch(0.13_0.014_25/0.98)] border border-rose-800/30 rounded-xl p-3.5 shadow-2xl shadow-black/70 backdrop-blur-xl", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-rose-500 mb-2.5", children: stage }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400", children: "Count" }),
                /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-white tabular-nums", children: count.toLocaleString() })
              ] }),
              convPct !== null && /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-gray-400", children: [
                  "From ",
                  prevStage
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-semibold text-emerald-400 tabular-nums", children: [
                  convPct,
                  "% conv"
                ] })
              ] }),
              dropPct !== null && /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400", children: "Drop-off" }),
                /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-semibold text-red-400 tabular-nums", children: [
                  "↓ ",
                  dropPct,
                  "%"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute left-1/2 -translate-x-1/2 -bottom-[7px] w-3.5 h-3.5 rotate-45 border-b border-r border-rose-800/30 bg-[oklch(0.13_0.014_25/0.98)]",
              style: { zIndex: 1 }
            }
          )
        ] })
      }
    ) }),
    document.body
  );
}
function PipelineBubble({ stage, count, convPct, dropOff, prevStage, index, rowKey, bubbleRefs, hoveredBubble, setHoveredBubble }) {
  const isHov = hoveredBubble && hoveredBubble.row === rowKey && hoveredBubble.col === index;
  const bubbleRef = useRef(null);
  useEffect(() => {
    bubbleRefs.current[`${rowKey}-${index}`] = bubbleRef.current;
  }, [rowKey, index, bubbleRefs]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: bubbleRef,
      className: "absolute w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-7 lg:h-7 rounded-full bg-white flex items-center justify-center shadow-sm sm:shadow-md border border-rose-100 transition-all duration-200 cursor-pointer z-20 hover:scale-110 hover:shadow-lg",
      style: {
        left: `${10 + index * 20}%`,
        transform: "translate(-50%, -50%)",
        top: "50%"
      },
      onMouseEnter: () => setHoveredBubble({ row: rowKey, col: index }),
      onMouseLeave: () => setHoveredBubble(null),
      children: [
        /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
          motion.span,
          {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.8, opacity: 0 },
            transition: { duration: 0.15 },
            className: "text-[8px] sm:text-[10px] md:text-xs lg:text-[10px] font-black text-gray-800 tabular-nums select-none",
            children: count
          },
          count
        ) }),
        /* @__PURE__ */ jsx(
          PipelineTooltip,
          {
            stage,
            count,
            convPct,
            dropPct: dropOff,
            prevStage,
            anchorRef: { current: bubbleRefs.current[`${rowKey}-${index}`] },
            visible: !!isHov
          }
        )
      ]
    }
  );
}
function PipelineRow({ rowKey, label, stops, data, bubbleRefs, hoveredBubble, setHoveredBubble }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-2.5 group", children: [
    /* @__PURE__ */ jsx("div", { className: "w-9 sm:w-12 md:w-14 lg:w-11 flex-shrink-0 text-right pr-0.5 sm:pr-1", children: /* @__PURE__ */ jsx("span", { className: "text-[8px] sm:text-[10px] md:text-xs lg:text-[10px] font-black text-slate-600 tracking-wider uppercase", children: label }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 relative h-9 sm:h-12 md:h-16 lg:h-10 bg-[#fdf2f4]/40 border border-rose-100/50 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-xl flex items-center shadow-sm hover:shadow-md transition-shadow duration-300", children: [
      /* @__PURE__ */ jsxs("svg", { className: "absolute inset-0 w-full h-full pointer-events-none", viewBox: "0 0 1000 100", preserveAspectRatio: "none", children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("linearGradient", { id: `ribbon-grad-${rowKey}`, x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: stops.map((s, idx) => /* @__PURE__ */ jsx("stop", { offset: s.offset, stopColor: s.color }, idx)) }) }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M 0,16 L 50,17 C 75,17, 75,18, 100,18 C 200,18, 200,26, 300,26 C 400,26, 400,34, 500,34 C 600,34, 600,40, 700,40 C 800,40, 800,46, 900,46 C 950,46, 950,47, 1000,47 L 1000,53 C 950,53, 950,54, 900,54 C 800,54, 800,60, 700,60 C 600,60, 600,66, 500,66 C 400,66, 400,74, 300,74 C 200,74, 200,82, 100,82 C 75,82, 75,83, 50,83 L 0,84 Z",
            fill: `url(#ribbon-grad-${rowKey})`,
            opacity: 0.85
          }
        )
      ] }),
      STAGES.map((stage, i) => {
        const count = data[i] ?? 0;
        const convPct = i > 0 && data[i - 1] > 0 ? Math.round(count / data[i - 1] * 100) : null;
        const dropOff = i > 0 && data[i - 1] > 0 ? Math.round((data[i - 1] - count) / data[i - 1] * 100) : null;
        return /* @__PURE__ */ jsx(
          PipelineBubble,
          {
            stage,
            count,
            convPct,
            dropOff,
            prevStage: i > 0 ? STAGES[i - 1] : null,
            index: i,
            rowKey,
            bubbleRefs,
            hoveredBubble,
            setHoveredBubble
          },
          stage
        );
      })
    ] })
  ] });
}
const MOCK_STATS = {
  Hot: { Contacted: 41, Qualified: 22, Meeting: 18, Negotiation: 8, Conversion: 7 },
  Warm: { Contacted: 32, Qualified: 12, Meeting: 8, Negotiation: 3, Conversion: 2 },
  Cold: { Contacted: 19, Qualified: 6, Meeting: 4, Negotiation: 1, Conversion: 1 }
};
function SalesPipelineStatus() {
  const [stats, setStats] = useState(MOCK_STATS);
  const [stageTotals, setStageTotals] = useState({
    Contacted: 92,
    Qualified: 40,
    Meeting: 30,
    Negotiation: 12,
    Conversion: 10
  });
  const [tempTotals, setTempTotals] = useState({
    Hot: 96,
    Warm: 57,
    Cold: 31
  });
  const [hoveredBubble, setHoveredBubble] = useState(null);
  const bubbleRefs = useRef({});
  useEffect(() => {
    apiGet("/api/sales/emp-leads/pipeline-stats").then((d) => {
      if (d.success && d.grid && Object.keys(d.grid).length > 0) {
        setStats(d.grid);
        setStageTotals(d.stageTotals || {});
        setTempTotals(d.tempTotals || {});
      }
    }).catch((e) => console.error("pipeline-stats failed", e));
  }, []);
  const hotData = useMemo(() => STAGES.map((s) => stats?.Hot?.[s] ?? 0), [stats]);
  const warmData = useMemo(() => STAGES.map((s) => stats?.Warm?.[s] ?? 0), [stats]);
  const coldData = useMemo(() => STAGES.map((s) => stats?.Cold?.[s] ?? 0), [stats]);
  const hotStops = [
    { offset: "0%", color: "#9f1239" },
    { offset: "40%", color: "#e11d48" },
    { offset: "75%", color: "#f43f5e" },
    { offset: "100%", color: "#fda4af" }
  ];
  const warmStops = [
    { offset: "0%", color: "#ea580c" },
    { offset: "50%", color: "#f97316" },
    { offset: "100%", color: "#fcd34d" }
  ];
  const coldStops = [
    { offset: "0%", color: "#2563eb" },
    { offset: "50%", color: "#3b82f6" },
    { offset: "100%", color: "#93c5fd" }
  ];
  if (!stats) return /* @__PURE__ */ jsxs(SectionCard, { title: "Sales Pipeline Status", subtitle: "Temperature segmented conversion progression and deal flow", bodyClassName: "lg:p-4 lg:pt-3", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-x-auto scrollbar-hide -mx-1 sm:-mx-2 px-1 sm:px-2 pb-1 sm:pb-2", children: /* @__PURE__ */ jsxs("div", { className: "min-w-[460px] sm:min-w-[560px] md:min-w-[640px] space-y-1.5 sm:space-y-3 md:space-y-4 lg:space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-9 sm:w-12 md:w-14 lg:w-11 flex-shrink-0" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 relative h-4 sm:h-5 md:h-6 lg:h-4 text-gray-400 text-[7px] sm:text-[9px] md:text-[10px] lg:text-[9px] font-bold tracking-wider uppercase", children: [
          /* @__PURE__ */ jsx("span", { className: "absolute left-[10%] -translate-x-1/2", children: "Contacted" }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-[30%] -translate-x-1/2", children: "Qualified" }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-[50%] -translate-x-1/2", children: "Meeting" }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-[70%] -translate-x-1/2", children: "Negotiation" }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-[90%] -translate-x-1/2", children: "Conversion" })
        ] })
      ] }),
      ["Hot", "Warm", "Cold"].map((label) => {
        const cfg = TEMP_CONFIG[label];
        return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-2.5", children: [
          /* @__PURE__ */ jsx("div", { className: "w-9 sm:w-12 md:w-14 lg:w-11 flex-shrink-0 text-right pr-0.5 sm:pr-1", children: /* @__PURE__ */ jsx(
            "span",
            {
              className: "text-[8px] sm:text-[10px] md:text-xs lg:text-[10px] font-black tracking-wider uppercase animate-pulse",
              style: { color: cfg.color },
              children: label
            }
          ) }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex-1 relative h-9 sm:h-12 md:h-16 lg:h-10 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-xl flex items-center shadow-sm overflow-hidden border",
              style: { background: cfg.light, borderColor: cfg.border },
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute inset-0 bg-gradient-to-r from-transparent to-transparent animate-[shimmer_1.4s_infinite]",
                    style: {
                      backgroundSize: "200% 100%",
                      backgroundImage: `linear-gradient(90deg, transparent, rgba(${cfg.rgb}, 0.15), transparent)`
                    }
                  }
                ),
                /* @__PURE__ */ jsx("svg", { className: "absolute inset-0 w-full h-full pointer-events-none opacity-25", viewBox: "0 0 1000 100", preserveAspectRatio: "none", children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M 0,16 L 50,17 C 75,17, 75,18, 100,18 C 200,18, 200,26, 300,26 C 400,26, 400,34, 500,34 C 600,34, 600,40, 700,40 C 800,40, 800,46, 900,46 C 950,46, 950,47, 1000,47 L 1000,53 C 950,53, 950,54, 900,54 C 800,54, 800,60, 700,60 C 600,60, 600,66, 500,66 C 400,66, 400,74, 300,74 C 200,74, 200,82, 100,82 C 75,82, 75,83, 50,83 L 0,84 Z",
                    fill: cfg.color
                  }
                ) }),
                [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-7 lg:h-7 rounded-full bg-white flex items-center justify-center shadow-md border z-20 animate-pulse",
                    style: {
                      left: `${10 + i * 20}%`,
                      transform: "translate(-50%, -50%)",
                      top: "50%",
                      borderColor: cfg.border
                    }
                  },
                  i
                ))
              ]
            }
          )
        ] }, label);
      })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 sm:mt-5 lg:mt-3 pt-3 sm:pt-4 lg:pt-2.5 border-t border-rose-100/30 grid grid-cols-3 gap-1.5 sm:gap-3 lg:gap-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1.5 animate-pulse", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-5 bg-rose-50 rounded-md" }),
      /* @__PURE__ */ jsx("div", { className: "w-16 h-3 bg-rose-50/60 rounded-md" })
    ] }, i)) }),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      ` })
  ] });
  const isMock = stats === MOCK_STATS;
  const totalLeads = isMock ? 100 : Object.values(tempTotals).reduce((a, b) => a + b, 0);
  const conversions = isMock ? 10 : stageTotals["Conversion"] ?? 0;
  const overallConv = totalLeads > 0 ? Math.round(conversions / totalLeads * 100) : 0;
  return /* @__PURE__ */ jsxs(SectionCard, { title: "Sales Pipeline Status", subtitle: "Temperature segmented conversion progression and deal flow", bodyClassName: "lg:p-4 lg:pt-3", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-x-auto scrollbar-hide -mx-1 sm:-mx-2 px-1 sm:px-2 pb-1 sm:pb-2 lg:pb-1", children: /* @__PURE__ */ jsxs("div", { className: "min-w-[460px] sm:min-w-[560px] md:min-w-[640px] space-y-1.5 sm:space-y-3 md:space-y-4 lg:space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-9 sm:w-12 md:w-14 lg:w-11 flex-shrink-0" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 relative h-4 sm:h-5 md:h-6 lg:h-4 text-gray-500 text-[7px] sm:text-[9px] md:text-[10px] lg:text-[9px] font-bold tracking-wider uppercase", children: [
          /* @__PURE__ */ jsx("span", { className: "absolute left-[10%] -translate-x-1/2", children: "Contacted" }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-[30%] -translate-x-1/2", children: "Qualified" }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-[50%] -translate-x-1/2", children: "Meeting" }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-[70%] -translate-x-1/2", children: "Negotiation" }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-[90%] -translate-x-1/2", children: "Conversion" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        PipelineRow,
        {
          rowKey: "hot",
          label: "Hot",
          stops: hotStops,
          data: hotData,
          bubbleRefs,
          hoveredBubble,
          setHoveredBubble
        }
      ),
      /* @__PURE__ */ jsx(
        PipelineRow,
        {
          rowKey: "warm",
          label: "Warm",
          stops: warmStops,
          data: warmData,
          bubbleRefs,
          hoveredBubble,
          setHoveredBubble
        }
      ),
      /* @__PURE__ */ jsx(
        PipelineRow,
        {
          rowKey: "cold",
          label: "Cold",
          stops: coldStops,
          data: coldData,
          bubbleRefs,
          hoveredBubble,
          setHoveredBubble
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 sm:mt-5 lg:mt-3 pt-3 sm:pt-4 lg:pt-2.5 border-t border-rose-100/50 grid grid-cols-3 gap-1.5 sm:gap-3 lg:gap-2", children: [
      { label: "Total Leads", value: totalLeads.toLocaleString() },
      { label: "Conversions", value: conversions.toLocaleString() },
      { label: "Overall Conv", value: `${overallConv}%` }
    ].map(({ label, value }) => /* @__PURE__ */ jsxs("div", { className: "text-center min-w-0 px-0.5", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm md:text-base lg:text-sm font-bold text-gray-800 tabular-nums", children: value }),
      /* @__PURE__ */ jsx("p", { className: "text-[8px] sm:text-[10px] lg:text-[9px] text-gray-500 mt-0.5 leading-tight", children: label })
    ] }, label)) })
  ] });
}
const IM_METRICS = [
  { label: "Pickup Rate", shortLabel: "Pickup", value: 78, rgb: "124,58,237", desc: "Calls answered vs dialed", trend: "+6% vs last week" },
  { label: "Qualification Rate", shortLabel: "Qualify", value: 42, rgb: "220,38,120", desc: "Qualified vs total contacts", trend: "+3% vs last week" },
  { label: "Conversion Rate", shortLabel: "Convert", value: 23, rgb: "16,185,129", desc: "Closed deals vs qualified", trend: "+1.2% vs last week" }
];
function CircleRing({ value, rgb, size = 88 }) {
  const stroke = size <= 56 ? 5 : 8;
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = value / 100 * circ;
  const fontSize = size <= 56 ? 11 : 18;
  return /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", style: { width: size, height: size }, children: [
    /* @__PURE__ */ jsxs("svg", { width: size, height: size, style: { transform: "rotate(-90deg)" }, className: "block", children: [
      /* @__PURE__ */ jsx("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: "#fecdd3", strokeWidth: stroke }),
      /* @__PURE__ */ jsx(
        motion.circle,
        {
          cx: size / 2,
          cy: size / 2,
          r,
          fill: "none",
          stroke: `rgb(${rgb})`,
          strokeWidth: stroke,
          strokeLinecap: "round",
          strokeDasharray: circ,
          initial: { strokeDashoffset: circ },
          animate: { strokeDashoffset: circ - dash },
          transition: { duration: 1.2, ease: "easeOut", delay: 0.3 }
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxs("span", { style: { fontSize, fontWeight: 800, letterSpacing: "-0.04em", color: `rgb(${rgb})` }, children: [
      value,
      "%"
    ] }) })
  ] });
}
function IMMetrics() {
  const isMobile = useIsMobile();
  const ringSize = isMobile ? 56 : 88;
  return /* @__PURE__ */ jsx(SectionCard, { title: "IM Metrics", subtitle: isMobile ? "Messaging funnel" : "Instant messaging funnel performance", className: "flex flex-col min-w-0 w-full", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-1.5 sm:gap-4 w-full min-w-0", children: IM_METRICS.map((m, i) => /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: i * 0.1 + 0.1 },
      whileHover: isMobile ? void 0 : { y: -2 },
      className: `relative rounded-lg sm:rounded-xl flex flex-col items-center justify-center text-center overflow-hidden cursor-default border w-full min-w-0 ${isMobile ? "p-2 gap-1" : "p-4 gap-3"}`,
      style: { background: "#fff5f5", borderColor: "#fecdd3" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none", style: { background: `radial-gradient(ellipse at 50% 0%, rgba(${m.rgb},.06) 0%, transparent 60%)` } }),
        /* @__PURE__ */ jsx(CircleRing, { value: m.value, rgb: m.rgb, size: ringSize }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 relative flex flex-col items-center w-full", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[8px] sm:text-sm font-semibold text-gray-800 leading-tight line-clamp-2 w-full", children: isMobile ? m.shortLabel : m.label }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] mt-1 text-gray-500 leading-normal hidden sm:block", children: m.desc }),
          /* @__PURE__ */ jsx("div", { className: "text-[7px] sm:text-[10px] mt-0.5 sm:mt-2 font-semibold leading-tight", style: { color: `rgb(${m.rgb})` }, children: isMobile ? m.trend.replace(" vs last week", "") : m.trend })
        ] })
      ]
    },
    m.label
  )) }) });
}
const opportunityCards = [
  { label: "Not Contacted Leads", count: 14, rgb: "245,158,11" },
  { label: "Unqualified Leads", count: 22, rgb: "56,189,248" },
  { label: "Meeting Not Scheduled", count: 9, rgb: "124,58,237" },
  { label: "Stuck at Negotiation", count: 6, rgb: "239,68,68" }
];
function RevenueOpportunitySection() {
  const isMobile = useIsMobile();
  return /* @__PURE__ */ jsx(
    SectionCard,
    {
      title: isMobile ? "Revenue Ops" : "Revenue Opportunities",
      subtitle: isMobile ? "Deal status counts" : "Smart distribution & deal status",
      children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 sm:gap-3 min-w-0", children: opportunityCards.map((c, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.08 + 0.1 },
          whileHover: isMobile ? void 0 : { y: -1 },
          className: "p-2.5 sm:p-4 rounded-lg sm:rounded-xl overflow-hidden relative cursor-default border min-w-0",
          style: {
            background: "#fff5f5",
            borderColor: "#fecdd3"
          },
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `font-semibold text-gray-600 leading-tight line-clamp-2 ${isMobile ? "text-[10px] mb-1" : "text-[13px] mb-2"}`,
                children: c.label
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `font-bold tabular-nums ${isMobile ? "text-xl" : "text-2xl"}`,
                style: { letterSpacing: "-0.03em", color: "#111827" },
                children: c.count
              }
            )
          ]
        },
        c.label
      )) })
    }
  );
}
function SalesAIInsights({ showToast }) {
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      if (showToast) {
        showToast("AI insights re-evaluated successfully!");
      }
    }, 600);
  };
  return /* @__PURE__ */ jsx(
    SectionCard,
    {
      title: "AI Insights Center",
      subtitle: "Smart actions & pipeline predictions",
      action: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleRefresh,
          className: "text-xs font-bold text-[#be123c] hover:text-[#9f1239] active:scale-95 transition-all",
          children: refreshing ? "Re-evaluating..." : "Refresh"
        }
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "space-y-3.5", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            whileHover: { y: -1.5 },
            className: "p-4 rounded-xl border border-violet-100 flex items-start gap-3 shadow-sm bg-gradient-to-r from-violet-50/20 to-indigo-50/20 text-left",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-violet-100/80 border border-violet-200 flex items-center justify-center text-violet-600 flex-shrink-0 mt-0.5 shadow-sm", children: /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 leading-snug", children: "Nimbus Labs" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black uppercase text-violet-600 bg-violet-100/60 px-1.5 py-0.2 rounded-md", children: "92% Win Prob" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-500 mt-1 leading-relaxed", children: "Proposal sent. High touchpoint activity from decision makers. Win probability is outstanding." })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => showToast && showToast("Rep notified to trigger follow-up workflow", "success"),
                    className: "px-3.5 py-1 bg-violet-600 hover:bg-violet-700 text-white text-[10px] font-black rounded-lg transition-all shadow-sm active:scale-95",
                    children: "Notify Rep"
                  }
                ) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            whileHover: { y: -1.5 },
            className: "p-4 rounded-xl border border-rose-100 flex items-start gap-3 shadow-sm bg-gradient-to-r from-rose-50/10 to-orange-50/10 text-left",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0 mt-0.5 shadow-sm", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-rose-600" }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 leading-snug", children: "Pylon Corp" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black uppercase text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded-md", children: "High Risk" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-500 mt-1 leading-relaxed", children: "Stalled in Negotiation for 5 days. High lead value (₹2.4L) makes this a priority intervention." })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => showToast && showToast("Follow-up email reminder sent to AE", "success"),
                    className: "px-3.5 py-1 border border-rose-600 text-rose-600 hover:bg-rose-50 text-[10px] font-black rounded-lg bg-white transition-all shadow-sm active:scale-95",
                    children: "Send Reminder"
                  }
                ) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            whileHover: { y: -1.5 },
            className: "p-4 rounded-xl border border-emerald-100 flex items-start gap-3 shadow-sm bg-gradient-to-r from-emerald-50/10 to-teal-50/10 text-left",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5 shadow-sm", children: /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-emerald-600" }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 leading-snug", children: "Ritu Verma" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md", children: "98% Hot" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-500 mt-1 leading-relaxed", children: '3 separate pricing page visits in last 24h. Unassigned lead in "New Lead" stage.' })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => showToast && showToast("Lead successfully assigned to Priya", "success"),
                    className: "px-3.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black rounded-lg transition-all shadow-sm active:scale-95",
                    children: "Assign AE"
                  }
                ) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            whileHover: { y: -1.5 },
            className: "p-4 rounded-xl bg-slate-900 text-white flex flex-col justify-between shadow-md relative overflow-hidden text-left",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -right-10 -top-10 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[8px] uppercase tracking-wider text-slate-400 font-extrabold", children: "Predictive Win Funnel" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1.5 mt-1", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-black tracking-tight text-white", children: "₹8.4L" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-[9px] text-emerald-400 font-bold flex items-center gap-0.5", children: [
                      /* @__PURE__ */ jsx(TrendingUp, { className: "w-2.5 h-2.5" }),
                      "+14% vs Target"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300", children: /* @__PURE__ */ jsx(Star, { className: "w-3.5 h-3.5 text-rose-400" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1 mt-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-[9px] text-slate-400 font-bold", children: [
                  /* @__PURE__ */ jsx("span", { children: "Conversion Rate Prediction" }),
                  /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "34% target match" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-1 bg-slate-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { width: 0 },
                    animate: { width: "34%" },
                    transition: { duration: 1, ease: "easeOut" },
                    className: "h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full"
                  }
                ) })
              ] })
            ]
          }
        )
      ] })
    }
  );
}
function Sales() {
  const [addOpen, setAddOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3e3);
  };
  useEffect(() => {
    if (new URLSearchParams(location.search).get("action") === "addLead") setAddOpen(true);
  }, [location.search]);
  const handleAddClose = () => {
    setAddOpen(false);
    navigate(location.pathname, { replace: true });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6 page-shell min-w-0", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-2.5", children: salesKpis.map((k, i) => /* @__PURE__ */ jsx(PremiumKPICard, { k, index: i }, k.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-6 items-start min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "xl:col-span-2 flex flex-col gap-3 sm:gap-6 min-w-0", children: [
        /* @__PURE__ */ jsx(RevenueOpportunitySection, {}),
        /* @__PURE__ */ jsx(IMMetrics, {})
      ] }),
      /* @__PURE__ */ jsx(SalesAIInsights, { showToast })
    ] }),
    /* @__PURE__ */ jsx(SalesPipelineStatus, {}),
    /* @__PURE__ */ jsx(
      AddLeadDrawer,
      {
        open: addOpen,
        onClose: handleAddClose,
        showToast
      }
    ),
    toast && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        className: "fixed bottom-6 right-6 z-[9999] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-medium",
        style: {
          background: toast.type === "success" ? "#f0fdf4" : "#fef2f2",
          border: `1px solid ${toast.type === "success" ? "#bbf7d0" : "#fecdd3"}`,
          color: toast.type === "success" ? "#15803d" : "#be123c"
        },
        children: [
          toast.type === "success" ? /* @__PURE__ */ jsx(CheckCircle2, { size: 16 }) : /* @__PURE__ */ jsx(X, { size: 16 }),
          toast.message
        ]
      }
    )
  ] });
}
export {
  Sales as default
};
