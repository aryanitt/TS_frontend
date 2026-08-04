/** Live sync — mirrors backend socket.io emits so web and mobile update together.
 *  socket.io-client is dynamically imported so it never enters the SSR bundle. */
import { getSocketBase } from "./api.js";
import { getStoredAuthUser, getStoredEmployee } from "./crmContext.js";

let socket = null;
let socketPromise = null;
let lastLocalChangeAt = 0;
const LOCAL_CHANGE_GUARD_MS = 2500;

/** Call right after applying a local optimistic lead change — suppresses the
 *  next server-echoed refetch so it can't race the in-flight PATCH and revert it. */
export function markLocalLeadChange() {
  lastLocalChangeAt = Date.now();
}

function resolveAuth() {
  const authUser = getStoredAuthUser();
  const emp = getStoredEmployee();
  const employeeId = authUser?.employeeId ?? emp?.id ?? null;
  return { tenantId: "default", employeeId: employeeId != null ? String(employeeId) : undefined };
}

function ensureSocket() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (socket) return Promise.resolve(socket);
  if (!socketPromise) {
    socketPromise = import("socket.io-client").then(({ io }) => {
      socket = io(getSocketBase(), {
        auth: resolveAuth(),
        withCredentials: true,
        transports: ["websocket", "polling"],
      });
      return socket;
    });
  }
  return socketPromise;
}

function subscribe(events, handler) {
  if (typeof window === "undefined") return () => {};
  let cancelled = false;
  let boundSocket = null;
  const guarded = (...args) => {
    if (Date.now() - lastLocalChangeAt < LOCAL_CHANGE_GUARD_MS) return;
    handler(...args);
  };
  ensureSocket().then((s) => {
    if (!s || cancelled) return;
    boundSocket = s;
    events.forEach((evt) => s.on(evt, guarded));
  });
  return () => {
    cancelled = true;
    if (boundSocket) events.forEach((evt) => boundSocket.off(evt, guarded));
  };
}

/** Fires on any lead create/update/assign — payload is the raw API lead row. */
export function onLeadChanged(handler) {
  return subscribe(["lead.updated", "lead.assigned", "lead.created"], handler);
}

export function onDashboardRefresh(handler) {
  return subscribe(["dashboard.refresh"], handler);
}
