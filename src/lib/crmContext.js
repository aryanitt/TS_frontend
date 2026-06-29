/** Shared CRM tenant/user headers for admin + employee panels. */

const EMPLOYEE_STORAGE_KEY = "crm_current_employee_v1";

export function getStoredEmployee() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(EMPLOYEE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function storeEmployee(employee) {
  if (typeof window === "undefined" || !employee) return;
  try {
    window.localStorage.setItem(EMPLOYEE_STORAGE_KEY, JSON.stringify(employee));
  } catch {
    // ignore
  }
}

export function getCrmHeaders(role = "employee", employeeOverride = null) {
  const emp = employeeOverride || getStoredEmployee();
  if (role === "admin") {
    return {
      "x-tenant-id": "default",
      "x-user-id": "admin",
      "x-user-name": "Admin",
      "x-user-role": "admin",
    };
  }
  return {
    "x-tenant-id": "default",
    "x-user-id": String(emp?.id ?? ""),
    "x-user-name": emp?.name || "Employee",
    "x-user-role": "employee",
  };
}

export function getAdminCrmHeaders() {
  return getCrmHeaders("admin");
}

export function mapApiEmployee(row) {
  if (!row) return null;
  const name = row.name || "Employee";
  const initials = row.initials
    || name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return {
    id: row.id,
    name,
    role: row.role || "Sales Executive",
    initials,
    email: row.email || "",
    phone: row.phone || "",
    department: row.department || "Sales",
    avatarColor: "#2563eb",
  };
}

export function isMockEmployeeId(id, mockId = 101) {
  return id == null || Number(id) === mockId;
}

function normalizePersonKey(value) {
  return String(value || "").trim().toLowerCase();
}

/** Resolve a DB employee row from list using id, email, or fuzzy name match. */
export function matchEmployeeFromList(employees, profile = {}, mockId = 101) {
  if (!Array.isArray(employees) || !employees.length) return null;

  const id = profile.id;
  if (!isMockEmployeeId(id, mockId)) {
    const byId = employees.find((row) => Number(row.id) === Number(id));
    if (byId) return byId;
  }

  const email = normalizePersonKey(profile.email);
  if (email) {
    const byEmail = employees.find((row) => normalizePersonKey(row.email) === email);
    if (byEmail) return byEmail;
  }

  const name = normalizePersonKey(profile.name);
  if (name) {
    const exact = employees.find((row) => normalizePersonKey(row.name) === name);
    if (exact) return exact;

    const first = name.split(/\s+/)[0];
    if (first) {
      const byFirst = employees.find((row) => normalizePersonKey(row.name).split(/\s+/)[0] === first);
      if (byFirst) return byFirst;

      const partial = employees.find((row) => normalizePersonKey(row.name).includes(first));
      if (partial) return partial;
    }
  }

  return employees[0] || null;
}
