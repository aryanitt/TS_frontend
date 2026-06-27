import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ListTodo, CheckCircle2, AlertCircle, CalendarDays, Clock, CheckCircle, Search, Plus, Sun, Moon, Check, Minus, MessageSquare, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import { a as StatCard, G as GlassCard, B as Badge, D as Drawer } from "./Primitives-CmGbnOU9.js";
import { Z as useEmployee, b as EMP_APP_TODAY, R as isTaskAssignedToEmployee, S as SEGMENT_BTN, u as SEGMENT_BTN_ACTIVE, v as SEGMENT_BTN_INACTIVE, w as SEGMENT_WRAP, l as EMP_SOP_CHECKLIST, F as findEmpTeamMember, H as formatTaskDeadlineTime, p as EMP_TEAM } from "./_-BNdSRMjW.js";
import { a as BtnPrimary, E as EmpEmptyState, M as MOBILE_ACTION, A as AvatarCircle, b as BtnSecondary } from "./EmpUI-DSKHyseP.js";
import "framer-motion";
import "@tanstack/react-query";
import "react-dom";
const INPUT = "w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition";
const LABEL = "block text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1.5";
const PRIORITY = {
  high: { label: "High", tone: "danger", icon: AlertCircle },
  med: { label: "Medium", tone: "warning", icon: Minus },
  low: { label: "Low", tone: "success", icon: CheckCircle2 }
};
const TASK_TABS = [
  { id: "upcoming", label: "Upcoming", short: "Upcoming", icon: Clock },
  { id: "previous", label: "Previous", short: "Past", icon: CheckCircle },
  { id: "checklist", label: "Daily Checklist", short: "Checklist", icon: CheckCircle2 }
];
function Field({ label, children, className = "" }) {
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx("label", { className: LABEL, children: label }),
    children
  ] });
}
function TaskCard({ task, onToggle, onDelete }) {
  const p = PRIORITY[task.priority] || PRIORITY.med;
  const PIcon = p.icon;
  const priorityPill = {
    high: "bg-red-50 text-red-700 border-red-200",
    med: "bg-amber-50 text-amber-800 border-amber-200",
    low: "bg-emerald-50 text-emerald-700 border-emerald-200"
  }[task.priority] || "bg-slate-50 text-slate-600 border-slate-200";
  return /* @__PURE__ */ jsx("article", { className: `group rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-2.5 sm:p-4 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all min-w-0 ${task.done ? "opacity-70" : ""}`, children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 sm:gap-3 items-start", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onToggle,
        "aria-label": task.done ? "Mark incomplete" : "Mark complete",
        className: `mt-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${task.done ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 hover:border-slate-500 hover:bg-slate-50"}`,
        children: task.done && /* @__PURE__ */ jsx(Check, { className: "w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "hidden sm:grid w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 place-items-center shrink-0", children: task.source === "followup" ? /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4 text-rose-600" }) : /* @__PURE__ */ jsx(ListTodo, { className: "w-4 h-4 text-slate-600" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-1 sm:gap-2", children: [
        /* @__PURE__ */ jsx("p", { className: `text-xs sm:text-sm font-bold leading-snug flex-1 min-w-0 line-clamp-2 ${task.done ? "line-through text-slate-400" : "text-slate-900"}`, children: task.name }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onDelete,
            className: `${MOBILE_ACTION} p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 shrink-0`,
            "aria-label": "Delete task",
            children: /* @__PURE__ */ jsx(Trash2, { className: "w-3 h-3 sm:w-3.5 sm:h-3.5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2 min-w-0 flex-wrap", children: [
        task.source === "followup" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "sm:hidden text-[7px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border bg-rose-50 text-rose-700 border-rose-100 shrink-0", children: "Follow-up" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-flex", children: /* @__PURE__ */ jsx(Badge, { tone: "primary", children: "Follow-up" }) })
        ] }),
        /* @__PURE__ */ jsx("span", { className: `sm:hidden text-[7px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border shrink-0 ${priorityPill}`, children: p.label }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-flex", children: /* @__PURE__ */ jsxs(Badge, { tone: p.tone, children: [
          /* @__PURE__ */ jsx(PIcon, { className: "w-3 h-3" }),
          p.label
        ] }) }),
        task.assignee && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-slate-500 min-w-0 truncate ml-auto sm:ml-0", children: [
          /* @__PURE__ */ jsx(
            AvatarCircle,
            {
              initials: task.assigneeAv || "?",
              color: task.assigneeColor || "#475569",
              size: 18
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline truncate", children: task.assignee })
        ] }),
        task.deadline && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-slate-400 shrink-0", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
          formatTaskDeadlineTime(task.deadline)
        ] })
      ] })
    ] })
  ] }) });
}
function ChecklistItem({ label, checked, onToggle }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick: onToggle,
      className: `w-full text-left p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl border transition flex items-start gap-2 sm:gap-3 hover:border-slate-300 ${checked ? "bg-slate-50 border-slate-200" : "bg-white border-slate-100"}`,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 grid place-items-center shrink-0 transition-colors ${checked ? "bg-slate-800 border-slate-800 text-white" : "border-slate-300 bg-white"}`,
            children: checked && /* @__PURE__ */ jsx(Check, { className: "w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[3]" })
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `text-[11px] sm:text-xs font-semibold leading-snug ${checked ? "text-slate-500 line-through" : "text-slate-700"}`, children: label })
      ]
    }
  );
}
function AddTaskDrawer({ open, newTask, setNewTask, dateFilter, setDateFilter, onClose, onSubmit, currentEmployee }) {
  return /* @__PURE__ */ jsxs(Drawer, { open, onClose, title: "New Task", width: "drawer-panel", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100", children: "Add a task to your daily workflow" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(Field, { label: "What needs to be done?", children: /* @__PURE__ */ jsx(
        "input",
        {
          className: INPUT,
          value: newTask.name,
          onChange: (e) => setNewTask((p) => ({ ...p, name: e.target.value })),
          placeholder: "e.g. Call Rajesh before 11 AM",
          autoFocus: true,
          onKeyDown: (e) => e.key === "Enter" && onSubmit()
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(Field, { label: "Due Date", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "date",
            className: INPUT,
            value: dateFilter,
            onChange: (e) => setDateFilter(e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsx(Field, { label: "Deadline", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "time",
            className: INPUT,
            value: newTask.deadline,
            onChange: (e) => setNewTask((p) => ({ ...p, deadline: e.target.value }))
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(Field, { label: "Priority", children: /* @__PURE__ */ jsxs(
          "select",
          {
            className: INPUT,
            value: newTask.priority,
            onChange: (e) => setNewTask((p) => ({ ...p, priority: e.target.value })),
            children: [
              /* @__PURE__ */ jsx("option", { value: "high", children: "High" }),
              /* @__PURE__ */ jsx("option", { value: "med", children: "Medium" }),
              /* @__PURE__ */ jsx("option", { value: "low", children: "Low" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(Field, { label: "Assign To", children: /* @__PURE__ */ jsx(
          "select",
          {
            className: INPUT,
            value: newTask.assignee,
            onChange: (e) => setNewTask((p) => ({ ...p, assignee: e.target.value })),
            children: EMP_TEAM.map((member) => /* @__PURE__ */ jsxs("option", { value: member.name, children: [
              member.name,
              member.name === currentEmployee?.name ? " (You)" : ""
            ] }, member.name))
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sticky bottom-0 -mx-4 sm:-mx-5 px-4 sm:px-5 py-4 mt-6 bg-white border-t border-slate-100 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxs(BtnPrimary, { onClick: onSubmit, className: "flex-1 sm:flex-initial", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4" }),
        " Create Task"
      ] }),
      /* @__PURE__ */ jsxs(BtnSecondary, { onClick: onClose, className: "sm:ml-auto", children: [
        /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }),
        " Cancel"
      ] })
    ] })
  ] });
}
function EmployeeTasks() {
  const { tasks, setTasks, syncTaskWithFollowUp, employee } = useEmployee();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState("upcoming");
  const [dateFilter, setDateFilter] = useState(EMP_APP_TODAY);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(searchParams.get("action") === "add");
  const [newTask, setNewTask] = useState({
    name: "",
    priority: "med",
    assignee: employee.name,
    deadline: "17:00"
  });
  const [checklistChecks, setChecklistChecks] = useState(() => {
    const saved = localStorage.getItem("emp_daily_checklist_checks");
    return saved ? JSON.parse(saved) : {};
  });
  useEffect(() => {
    localStorage.setItem("emp_daily_checklist_checks", JSON.stringify(checklistChecks));
  }, [checklistChecks]);
  const toggleChecklist = (key) => {
    setChecklistChecks((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Checklist updated");
  };
  const today = /* @__PURE__ */ new Date(`${EMP_APP_TODAY}T00:00:00`);
  useEffect(() => {
    if (searchParams.get("action") === "add") setDrawerOpen(true);
  }, [searchParams]);
  const allTasks = useMemo(
    () => Object.entries(tasks || {}).flatMap(
      ([date, items]) => (Array.isArray(items) ? items : []).filter((t) => isTaskAssignedToEmployee(t, employee?.name)).map((t) => ({ ...t, date }))
    ),
    [tasks, employee?.name]
  );
  const stats = useMemo(() => {
    const pending = allTasks.filter((t) => !t.done).length;
    const doneToday = allTasks.filter((t) => t.done && t.date === EMP_APP_TODAY).length;
    const highPriority = allTasks.filter((t) => !t.done && t.priority === "high").length;
    const upcomingDays = new Set(allTasks.filter((t) => !t.done && /* @__PURE__ */ new Date(`${t.date}T00:00:00`) >= today).map((t) => t.date)).size;
    return { pending, doneToday, highPriority, upcomingDays };
  }, [allTasks, today]);
  const grouped = useMemo(() => {
    let entries = Object.entries(tasks || {}).map(([date, items]) => [
      date,
      (Array.isArray(items) ? items : []).filter((t) => isTaskAssignedToEmployee(t, employee?.name))
    ]).filter(([, items]) => items.length > 0).sort(([a], [b]) => new Date(a) - new Date(b));
    entries = tab === "upcoming" ? entries.filter(([d]) => /* @__PURE__ */ new Date(`${d}T00:00:00`) >= today) : entries.filter(([d]) => /* @__PURE__ */ new Date(`${d}T00:00:00`) < today);
    if (search.trim()) {
      const q = search.toLowerCase();
      entries = entries.map(([date, items]) => [date, items.filter((t) => t.name.toLowerCase().includes(q))]).filter(([, items]) => items.length > 0);
    }
    return entries;
  }, [tasks, tab, today, search, employee?.name]);
  const closeDrawer = () => {
    setDrawerOpen(false);
    setNewTask({
      name: "",
      priority: "med",
      assignee: employee.name,
      deadline: "17:00"
    });
    if (searchParams.get("action") === "add") {
      setSearchParams({}, { replace: true });
    }
  };
  const toggleTask = (date, id) => {
    const task = tasks[date]?.find((t) => t.id === id);
    const nextDone = !task?.done;
    if (task?.followUpId) {
      syncTaskWithFollowUp(date, id, nextDone);
    } else {
      setTasks((prev) => ({
        ...prev,
        [date]: (prev[date] || []).map((t) => t.id === id ? { ...t, done: nextDone } : t)
      }));
    }
    toast.success("Task updated");
  };
  const deleteTask = (date, id) => {
    setTasks((prev) => ({ ...prev, [date]: (prev[date] || []).filter((t) => t.id !== id) }));
    toast.success("Task removed");
  };
  const resetNewTask = () => ({
    name: "",
    priority: "med",
    assignee: employee.name,
    deadline: "17:00"
  });
  const addTask = () => {
    if (!newTask.name.trim()) {
      toast.error("Enter a task name");
      return;
    }
    if (!newTask.deadline) {
      toast.error("Set a deadline time");
      return;
    }
    const member = findEmpTeamMember(newTask.assignee) || findEmpTeamMember(employee.name);
    const assigneeName = member?.name || employee.name;
    setTasks((prev) => ({
      ...prev,
      [dateFilter]: [...prev[dateFilter] || [], {
        id: Date.now(),
        name: newTask.name.trim(),
        done: false,
        priority: newTask.priority,
        assignee: assigneeName,
        assigneeAv: member?.av || employee.initials,
        assigneeColor: member?.color || employee.avatarColor,
        deadline: newTask.deadline,
        createdBy: employee.name
      }]
    }));
    closeDrawer();
    setNewTask(resetNewTask());
    toast.success(
      assigneeName === employee.name ? "Task added to your list" : `Task assigned to ${assigneeName}`
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-5 page-shell min-w-0 animate-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4", children: [
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "Pending", value: String(stats.pending), icon: ListTodo, tone: "primary", change: `${stats.highPriority} high priority`, sub: "" }),
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "Done Today", value: String(stats.doneToday), icon: CheckCircle2, tone: "success", change: "on track", sub: "" }),
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "High Priority", value: String(stats.highPriority), icon: AlertCircle, tone: "warning", change: "needs attention", sub: "" }),
      /* @__PURE__ */ jsx(StatCard, { compact: true, label: "Active Days", value: String(stats.upcomingDays), icon: CalendarDays, tone: "info", change: "upcoming", sub: "" })
    ] }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "p-2.5 sm:p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 sm:gap-3 lg:hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-0.5 p-0.5 rounded-lg bg-slate-100/80 border border-slate-200/80 sm:hidden", children: TASK_TABS.map(({ id, short, icon: Icon }) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setTab(id),
            className: `flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-md text-[9px] font-bold transition ${SEGMENT_BTN} ${tab === id ? SEGMENT_BTN_ACTIVE : SEGMENT_BTN_INACTIVE}`,
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "w-3 h-3" }),
              short
            ]
          },
          id
        )) }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsx("div", { className: SEGMENT_WRAP, children: TASK_TABS.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setTab(id),
            className: `flex items-center gap-1 ${SEGMENT_BTN} ${tab === id ? SEGMENT_BTN_ACTIVE : SEGMENT_BTN_INACTIVE}`,
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5" }),
              label
            ]
          },
          id
        )) }) }),
        tab !== "checklist" && /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 pointer-events-none" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Search tasks…",
                className: "w-full h-9 sm:h-10 pl-8 sm:pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(BtnPrimary, { onClick: () => setDrawerOpen(true), className: "hidden sm:inline-flex shrink-0", children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            " Add Task"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("p", { className: "text-[9px] sm:text-[11px] font-semibold text-slate-400", children: [
          tab === "checklist" ? "Morning & evening checklists" : `${stats.pending} open · ${stats.doneToday} done today`,
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: tab !== "checklist" && ` · ${tab === "upcoming" ? "Showing upcoming" : "Showing past tasks"}` })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:block space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: `${SEGMENT_WRAP} shrink-0`, children: TASK_TABS.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setTab(id),
              className: `flex items-center gap-1 ${SEGMENT_BTN} ${tab === id ? SEGMENT_BTN_ACTIVE : SEGMENT_BTN_INACTIVE}`,
              children: [
                /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5" }),
                label
              ]
            },
            id
          )) }),
          tab !== "checklist" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-0 max-w-md", children: [
              /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  placeholder: "Search tasks…",
                  className: "w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(BtnPrimary, { onClick: () => setDrawerOpen(true), className: "shrink-0 !rounded-xl whitespace-nowrap", children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              " Add Task"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold text-slate-400", children: tab === "checklist" ? "Morning & evening checklists" : `${stats.pending} open · ${stats.doneToday} done today · ${tab === "upcoming" ? "Showing upcoming" : "Showing past tasks"}` })
      ] })
    ] }),
    tab === "checklist" ? /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start", children: [
      /* @__PURE__ */ jsxs(GlassCard, { className: "p-2.5 sm:p-5 space-y-2 sm:space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-slate-100 pb-2 sm:pb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-2.5 min-w-0", children: [
            /* @__PURE__ */ jsx("div", { className: "w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-100 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(Sun, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" }) }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xs sm:text-sm font-black text-slate-900", children: "Morning Tasks" }),
              /* @__PURE__ */ jsx("p", { className: "text-[9px] sm:text-[10px] text-slate-400 hidden sm:block", children: "Complete before 11:00 AM" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-flex", children: /* @__PURE__ */ jsx(Badge, { tone: "muted", children: "Task Sheet" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1.5 sm:space-y-2", children: EMP_SOP_CHECKLIST.morning.map((task, idx) => {
          const key = `morning-${idx}`;
          return /* @__PURE__ */ jsx(
            ChecklistItem,
            {
              label: task,
              checked: !!checklistChecks[key],
              onToggle: () => toggleChecklist(key)
            },
            key
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs(GlassCard, { className: "p-2.5 sm:p-5 space-y-2 sm:space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-slate-100 pb-2 sm:pb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-2.5 min-w-0", children: [
            /* @__PURE__ */ jsx("div", { className: "w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-indigo-50 border border-indigo-100 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(Moon, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" }) }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xs sm:text-sm font-black text-slate-900", children: "Evening Wrap-up" }),
              /* @__PURE__ */ jsx("p", { className: "text-[9px] sm:text-[10px] text-slate-400 hidden sm:block", children: "Complete before 6:00 PM" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-flex", children: /* @__PURE__ */ jsx(Badge, { tone: "success", children: "Submission" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1.5 sm:space-y-2", children: EMP_SOP_CHECKLIST.evening.map((task, idx) => {
          const key = `evening-${idx}`;
          return /* @__PURE__ */ jsx(
            ChecklistItem,
            {
              label: task,
              checked: !!checklistChecks[key],
              onToggle: () => toggleChecklist(key)
            },
            key
          );
        }) })
      ] })
    ] }) : grouped.length === 0 ? /* @__PURE__ */ jsxs(GlassCard, { className: "py-4", children: [
      /* @__PURE__ */ jsx(
        EmpEmptyState,
        {
          icon: "✅",
          title: search ? "No tasks match your search" : `No ${tab} tasks`,
          subtitle: search ? "Try a different keyword" : "Create your first task to stay on track"
        }
      ),
      !search && /* @__PURE__ */ jsx("div", { className: "flex justify-center pb-6", children: /* @__PURE__ */ jsxs(BtnPrimary, { onClick: () => setDrawerOpen(true), children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
        " Add Task"
      ] }) })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3 sm:space-y-6", children: grouped.map(([date, items]) => {
      const d = /* @__PURE__ */ new Date(`${date}T00:00:00`);
      const done = items.filter((t) => t.done).length;
      const pct = items.length ? Math.round(done / items.length * 100) : 0;
      const isToday = date === EMP_APP_TODAY;
      return /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mb-2 sm:mb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsx("div", { className: `w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl grid place-items-center shrink-0 ${isToday ? "bg-slate-800 text-white shadow-sm" : "bg-slate-50 border border-slate-200 text-slate-600"}`, children: /* @__PURE__ */ jsx(CalendarDays, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" }) }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-xs sm:text-base font-display font-bold text-slate-900 truncate", children: [
                  /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }) }),
                  /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }) })
                ] }),
                isToday && /* @__PURE__ */ jsx("span", { className: "text-[8px] sm:text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100", children: "Today" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[9px] sm:text-[11px] text-slate-500 font-medium mt-0.5", children: [
                items.length,
                " tasks · ",
                done,
                " done",
                /* @__PURE__ */ jsxs("span", { className: "sm:hidden", children: [
                  " · ",
                  pct,
                  "%"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsx("div", { className: "w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-slate-700 transition-all duration-500", style: { width: `${pct}%` } }) }),
            /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-black text-slate-600 tabular-nums w-8", children: [
              pct,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1.5 sm:grid sm:grid-cols-1 xl:grid-cols-2 sm:gap-3", children: items.map((t) => /* @__PURE__ */ jsx(
          TaskCard,
          {
            task: t,
            onToggle: () => toggleTask(date, t.id),
            onDelete: () => deleteTask(date, t.id)
          },
          t.id
        )) })
      ] }, date);
    }) }),
    /* @__PURE__ */ jsx(
      AddTaskDrawer,
      {
        open: drawerOpen,
        newTask,
        setNewTask,
        dateFilter,
        setDateFilter,
        onClose: closeDrawer,
        onSubmit: addTask,
        currentEmployee: employee
      }
    )
  ] });
}
export {
  EmployeeTasks as default
};
