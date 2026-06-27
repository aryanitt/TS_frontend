import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { FolderOpen, FileText, Layers, Presentation, Briefcase, FileSpreadsheet, GraduationCap, BookOpen, Search, Plus, Copy, Share2, Mail, Download, Upload, AlignLeft, CheckCircle2, X } from "lucide-react";
import { a as StatCard, G as GlassCard, B as Badge, D as Drawer } from "./Primitives-CmGbnOU9.js";
import { c as EMP_ASSETS, w as SEGMENT_WRAP, S as SEGMENT_BTN, u as SEGMENT_BTN_ACTIVE, v as SEGMENT_BTN_INACTIVE } from "./_-BNdSRMjW.js";
import { a as BtnPrimary, E as EmpEmptyState, d as EmpModal, b as BtnSecondary } from "./EmpUI-DSKHyseP.js";
import "framer-motion";
import "react-router-dom";
import "@tanstack/react-query";
import "react-dom";
const CATEGORIES = [
  { id: "all", label: "All", icon: FolderOpen },
  { id: "brochure", label: "Brochures", icon: FileText },
  { id: "proposal", label: "Proposals", icon: Briefcase },
  { id: "price", label: "Price Lists", icon: FileSpreadsheet },
  { id: "template", label: "Templates", icon: Layers },
  { id: "training", label: "Training", icon: GraduationCap },
  { id: "case", label: "Case Studies", icon: BookOpen }
];
const ASSET_CATS = CATEGORIES.filter((c) => c.id !== "all");
const CAT_ICON = {
  brochure: FileText,
  proposal: Briefcase,
  price: FileSpreadsheet,
  template: Layers,
  training: GraduationCap,
  case: BookOpen
};
const TAG_TONE = {
  PDF: "muted",
  Excel: "success",
  DOCX: "info",
  PPT: "warning",
  TEXT: "primary"
};
const INPUT = "w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition";
const LABEL = "block text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1.5";
const CARD_BTN = "inline-flex items-center justify-center gap-1.5 flex-1 py-1.5 px-3 rounded-xl text-[11px] font-semibold border transition";
const EMPTY_FORM = {
  mode: "upload",
  name: "",
  cat: "brochure",
  file: null,
  text: ""
};
function Field({ label, children, className = "" }) {
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx("label", { className: LABEL, children: label }),
    children
  ] });
}
function formatFileSize(bytes) {
  if (!bytes) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function tagFromFile(file) {
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  if (ext === "pdf") return "PDF";
  if (["xlsx", "xls", "csv"].includes(ext)) return "Excel";
  if (["docx", "doc"].includes(ext)) return "DOCX";
  if (["pptx", "ppt"].includes(ext)) return "PPT";
  return ext ? ext.toUpperCase() : "FILE";
}
function assetShareUrl(asset) {
  const slug = asset.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `https://portal.example.com/assets/${asset.id}/${slug}`;
}
function AddAssetDrawer({ open, form, setForm, onClose, onSubmit }) {
  const fileRef = useRef(null);
  useEffect(() => {
    if (open) setForm({ ...EMPTY_FORM });
  }, [open]);
  const handleFilePick = (file) => {
    if (!file) return;
    setForm((f) => ({
      ...f,
      file,
      name: f.name.trim() || file.name.replace(/\.[^.]+$/, "")
    }));
  };
  return /* @__PURE__ */ jsxs(Drawer, { open, onClose, title: "Add Asset", width: "drawer-panel", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100", children: "Upload a file or create a text note for your team" }),
    /* @__PURE__ */ jsx("div", { className: `${SEGMENT_WRAP} mb-5 w-full`, children: [
      { id: "upload", label: "Upload File", icon: Upload },
      { id: "text", label: "Text Note", icon: AlignLeft }
    ].map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setForm((f) => ({ ...f, mode: id })),
        className: `flex-1 inline-flex items-center justify-center gap-1 ${SEGMENT_BTN} ${form.mode === id ? "bg-white text-slate-800 shadow-sm ring-1 ring-slate-200" : SEGMENT_BTN_INACTIVE}`,
        children: [
          /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5" }),
          label
        ]
      },
      id
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(Field, { label: "Asset Name", children: /* @__PURE__ */ jsx(
        "input",
        {
          className: INPUT,
          placeholder: "Enterprise CRM Brochure",
          value: form.name,
          onChange: (e) => setForm((f) => ({ ...f, name: e.target.value }))
        }
      ) }),
      /* @__PURE__ */ jsx(Field, { label: "Category", children: /* @__PURE__ */ jsx(
        "select",
        {
          className: INPUT,
          value: form.cat,
          onChange: (e) => setForm((f) => ({ ...f, cat: e.target.value })),
          children: ASSET_CATS.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.label }, c.id))
        }
      ) }),
      form.mode === "upload" ? /* @__PURE__ */ jsxs(Field, { label: "File", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: fileRef,
            type: "file",
            className: "hidden",
            accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt",
            onChange: (e) => handleFilePick(e.target.files?.[0] || null)
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => fileRef.current?.click(),
            onDragOver: (e) => e.preventDefault(),
            onDrop: (e) => {
              e.preventDefault();
              handleFilePick(e.dataTransfer.files?.[0] || null);
            },
            className: "w-full rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 py-8 text-center hover:border-slate-300 hover:bg-slate-50 transition",
            children: form.file ? /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-8 h-8 text-slate-500 mx-auto mb-2" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-800 truncate", children: form.file.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-1", children: formatFileSize(form.file.size) }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-2", children: "Click to replace file" })
            ] }) : /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Upload, { className: "w-8 h-8 text-slate-400 mx-auto mb-2" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-700", children: "Drop file here or click to browse" }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-1", children: "PDF, DOCX, Excel, PPT supported" })
            ] })
          }
        )
      ] }) : /* @__PURE__ */ jsx(Field, { label: "Content", children: /* @__PURE__ */ jsx(
        "textarea",
        {
          rows: 8,
          className: `${INPUT} !h-auto py-2.5 resize-none`,
          placeholder: "Paste notes, scripts, message templates, or any text content…",
          value: form.text,
          onChange: (e) => setForm((f) => ({ ...f, text: e.target.value }))
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sticky bottom-0 -mx-4 sm:-mx-5 px-4 sm:px-5 py-4 mt-6 bg-white border-t border-slate-100 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxs(BtnPrimary, { onClick: onSubmit, className: "flex-1 sm:flex-initial", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4" }),
        " Save Asset"
      ] }),
      /* @__PURE__ */ jsxs(BtnSecondary, { onClick: onClose, className: "sm:ml-auto", children: [
        /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }),
        " Cancel"
      ] })
    ] })
  ] });
}
function AssetCard({ asset, onDownload, onShare }) {
  const Icon = CAT_ICON[asset.cat] || FileText;
  return /* @__PURE__ */ jsxs("article", { className: "group rounded-2xl border border-slate-200/80 bg-white p-4 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all flex flex-col h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3 flex-1", children: [
      /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-slate-600" }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900 leading-snug", children: asset.name }),
        /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-slate-500 mt-1", children: [
          asset.size,
          " · ",
          asset.date
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(Badge, { tone: TAG_TONE[asset.tag] || "muted", children: asset.tag }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-4 pt-3 border-t border-slate-100", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onDownload(asset),
          className: `${CARD_BTN} bg-rose-700 text-white border-rose-700 hover:bg-rose-800`,
          children: [
            /* @__PURE__ */ jsx(Download, { className: "w-3.5 h-3.5" }),
            " Download"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onShare(asset),
          className: `${CARD_BTN} bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800`,
          children: [
            /* @__PURE__ */ jsx(Share2, { className: "w-3.5 h-3.5" }),
            " Share"
          ]
        }
      )
    ] })
  ] });
}
function EmployeeAssets() {
  const [assets, setAssets] = useState(EMP_ASSETS);
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const [shareAsset, setShareAsset] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const items = useMemo(() => {
    let list = cat === "all" ? assets : assets.filter((a) => a.cat === cat);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (a) => a.name.toLowerCase().includes(q) || a.tag.toLowerCase().includes(q) || a.cat.toLowerCase().includes(q)
      );
    }
    return list;
  }, [cat, search, assets]);
  const stats = useMemo(() => ({
    total: assets.length,
    pdfs: assets.filter((a) => a.tag === "PDF").length,
    templates: assets.filter((a) => a.cat === "template" || a.cat === "proposal").length,
    recent: assets.filter((a) => a.date === "Today" || a.date === "Yesterday").length
  }), [assets]);
  const shareUrl = shareAsset ? assetShareUrl(shareAsset) : "";
  const handleDownload = (asset) => {
    if (asset.content) {
      const blob = new Blob([asset.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${asset.name}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${asset.name}`);
      return;
    }
    toast.success(`Downloading ${asset.name}`);
  };
  const handleShare = (asset) => {
    setShareAsset(asset);
  };
  const handleCreateAsset = () => {
    if (!form.name.trim()) {
      toast.error("Asset name is required");
      return;
    }
    if (form.mode === "upload") {
      if (!form.file) {
        toast.error("Please select a file to upload");
        return;
      }
      const newAsset = {
        id: Date.now(),
        name: form.name.trim(),
        cat: form.cat,
        icon: "📄",
        size: formatFileSize(form.file.size),
        date: "Today",
        tag: tagFromFile(form.file)
      };
      setAssets((prev) => [newAsset, ...prev]);
    } else {
      if (!form.text.trim()) {
        toast.error("Please add some text content");
        return;
      }
      const newAsset = {
        id: Date.now(),
        name: form.name.trim(),
        cat: form.cat,
        icon: "📝",
        size: formatFileSize(new Blob([form.text]).size),
        date: "Today",
        tag: "TEXT",
        content: form.text.trim()
      };
      setAssets((prev) => [newAsset, ...prev]);
    }
    setDrawerOpen(false);
    toast.success("Asset added successfully");
  };
  const copyShareLink = () => {
    if (!shareAsset) return;
    navigator.clipboard?.writeText(shareUrl);
    toast.success("Share link copied");
  };
  const shareViaWhatsApp = () => {
    if (!shareAsset) return;
    const text = encodeURIComponent(`${shareAsset.name}
${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };
  const shareViaEmail = () => {
    if (!shareAsset) return;
    const subject = encodeURIComponent(`Asset: ${shareAsset.name}`);
    const body = encodeURIComponent(`Hi,

Please find the asset here:
${shareAsset.name}
${shareUrl}

Thanks`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };
  const tryNativeShare = async () => {
    if (!shareAsset || !navigator.share) {
      copyShareLink();
      return;
    }
    try {
      await navigator.share({ title: shareAsset.name, text: shareAsset.name, url: shareUrl });
    } catch {
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-5 page-shell min-w-0 animate-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4", children: [
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "Total Assets", value: String(stats.total), icon: FolderOpen, tone: "primary", change: "available", sub: "" }),
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "PDF Files", value: String(stats.pdfs), icon: FileText, tone: "success", change: "documents", sub: "" }),
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "Templates", value: String(stats.templates), icon: Layers, tone: "info", change: "proposals & more", sub: "" }),
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "Recently Added", value: String(stats.recent), icon: Presentation, tone: "success", change: "this week", sub: "" })
    ] }),
    /* @__PURE__ */ jsx(GlassCard, { className: "p-3 sm:p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 min-w-0", children: [
      /* @__PURE__ */ jsx("div", { className: `${SEGMENT_WRAP} min-w-0 flex-1 overflow-x-auto scrollbar-none`, children: CATEGORIES.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setCat(id),
          className: `flex items-center gap-1 ${SEGMENT_BTN} ${cat === id ? SEGMENT_BTN_ACTIVE : SEGMENT_BTN_INACTIVE}`,
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" }),
            label
          ]
        },
        id
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "relative shrink-0 w-28 sm:w-44 md:w-52 lg:w-60 min-w-0", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 pointer-events-none" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search assets…",
            className: "w-full h-9 sm:h-10 pl-8 sm:pl-9 pr-2 sm:pr-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(BtnPrimary, { onClick: () => setDrawerOpen(true), className: "shrink-0 whitespace-nowrap !px-2.5 sm:!px-4", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Add Asset" }),
        /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Add" })
      ] })
    ] }) }),
    items.length === 0 ? /* @__PURE__ */ jsx(GlassCard, { children: /* @__PURE__ */ jsx(
      EmpEmptyState,
      {
        icon: "📁",
        title: "No assets found",
        subtitle: search ? "Try a different search or category" : "No assets in this category"
      }
    ) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3", children: items.map((a) => /* @__PURE__ */ jsx(AssetCard, { asset: a, onDownload: handleDownload, onShare: handleShare }, a.id)) }),
    /* @__PURE__ */ jsx(
      AddAssetDrawer,
      {
        open: drawerOpen,
        form,
        setForm,
        onClose: () => setDrawerOpen(false),
        onSubmit: handleCreateAsset
      }
    ),
    /* @__PURE__ */ jsx(
      EmpModal,
      {
        open: !!shareAsset,
        onClose: () => setShareAsset(null),
        title: "Share Asset",
        subtitle: shareAsset?.name,
        footer: /* @__PURE__ */ jsx(BtnSecondary, { onClick: () => setShareAsset(null), children: "Close" }),
        children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1", children: "Share link" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-mono text-slate-700 break-all", children: shareUrl })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: copyShareLink,
                className: `${CARD_BTN} w-full bg-rose-700 text-white border-rose-700 hover:bg-rose-800 !flex-none sm:col-span-2`,
                children: [
                  /* @__PURE__ */ jsx(Copy, { className: "w-4 h-4" }),
                  " Copy link"
                ]
              }
            ),
            typeof navigator !== "undefined" && navigator.share && /* @__PURE__ */ jsxs(BtnSecondary, { onClick: tryNativeShare, className: "w-full !rounded-xl", children: [
              /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4" }),
              " System share"
            ] }),
            /* @__PURE__ */ jsx(BtnSecondary, { onClick: shareViaWhatsApp, className: "w-full !rounded-xl", children: "WhatsApp" }),
            /* @__PURE__ */ jsxs(BtnSecondary, { onClick: shareViaEmail, className: "w-full !rounded-xl", children: [
              /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }),
              " Email"
            ] })
          ] })
        ] })
      }
    )
  ] });
}
export {
  EmployeeAssets as default
};
