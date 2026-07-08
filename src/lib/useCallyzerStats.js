import { useEffect, useState } from "react";
import { apiGet } from "./api.js";

export const CALLYZER_PERIOD_MAP = {
  Today: "today",
  "This Week": "week",
  "This Month": "month",
  today: "today",
  week: "week",
  month: "month",
};

export function useCallyzerStats(employeeId, period, enabled = true) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!enabled || !employeeId) return undefined;

    const mapped = CALLYZER_PERIOD_MAP[period] || "today";
    let cancelled = false;
    setLoading(true);

    apiGet(`/api/v1/employee/${employeeId}/callyzer/stats?period=${mapped}`, {
      cacheTtl: 120000,
    })
      .then((res) => {
        if (cancelled) return;
        const data = res?.data ?? res;
        setConfigured(Boolean(data?.configured));
        setStats(data?.stats || null);
        setMessage(data?.message || null);
      })
      .catch((err) => {
        if (!cancelled) {
          setStats(null);
          setMessage(err.message || "Could not load Callyzer stats");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [employeeId, period, enabled]);

  return { stats, loading, configured, message };
}

export function useCallyzerTeamStats(period, enabled = true) {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;

    const mapped = CALLYZER_PERIOD_MAP[period] || period || "today";
    let cancelled = false;
    setLoading(true);

    apiGet(`/api/v1/callyzer/team-stats?period=${mapped}`, { cacheTtl: 120000 })
      .then((res) => {
        if (cancelled) return;
        const data = res?.data ?? res;
        setConfigured(Boolean(data?.configured));
        setStats(Array.isArray(data?.stats) ? data.stats : []);
      })
      .catch(() => {
        if (!cancelled) setStats([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [period, enabled]);

  return { stats, loading, configured };
}
