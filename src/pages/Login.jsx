import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import { apiGet } from "../lib/api.js";
import TSPublicationDoodleLogo from "../components/TSPublicationDoodleLogo.jsx";

function resolvePostLoginPath(authUser, redirect = "") {
  if (authUser.mustChangePassword) return "/change-password";
  if (authUser.role === "employee") return "/employee";
  if (redirect && redirect.startsWith("/") && !redirect.startsWith("/employee") && redirect !== "/login") {
    return redirect;
  }
  return "/";
}

export default function Login() {
  const { login, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "";

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [backendReady, setBackendReady] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const status = await apiGet("/api/auth/seed-status", {
          skipCache: true,
          cacheTtl: 0,
          timeoutMs: 12000,
        });
        if (!cancelled) setBackendReady(Boolean(status?.success));
      } catch {
        if (!cancelled) setBackendReady(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (authLoading || !user) return;
    if (user.mustChangePassword) {
      navigate("/change-password", { replace: true });
      return;
    }
    const target = user.role === "employee" ? "/employee" : (redirect || "/");
    navigate(target, { replace: true });
  }, [authLoading, user, navigate, redirect]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!loginId.trim() || !password) {
      toast.error("Enter your login ID and password");
      return;
    }

    setBusy(true);
    try {
      const authUser = await login(loginId.trim(), password);
      toast.success(`Welcome back, ${authUser.name || authUser.loginId}!`);
      window.location.assign(resolvePostLoginPath(authUser, redirect));
      return;
    } catch (err) {
      const msg = err?.message || "Invalid login ID or password";
      if (backendReady === false || msg.includes("404") || msg.includes("not found")) {
        toast.error("Backend auth is not deployed yet. Pull latest code on Hostinger, run npm install && npm run seed:admin, then restart.");
      } else {
        toast.error(msg);
      }
    } finally {
      setBusy(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <p className="text-sm text-slate-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-10">
      <Toaster position="top-center" />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <TSPublicationDoodleLogo size={56} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">TS Publication CRM</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in with your login ID or email</p>
          {backendReady === false && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3 text-left">
              Backend auth is not live on Hostinger yet. In hPanel: pull latest code, run{" "}
              <span className="font-mono">npm install</span> and{" "}
              <span className="font-mono">npm run seed:admin</span>, then restart the app.
              You can still try Sign in after that.
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-rose-100 rounded-2xl shadow-xl shadow-rose-100/50 p-6 sm:p-8 space-y-5"
        >
          <div>
            <label htmlFor="loginId" className="block text-xs font-semibold uppercase tracking-wide text-rose-700 mb-2">
              Login ID or Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="loginId"
                type="text"
                autoComplete="username"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="ADMIN or name@company.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-rose-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold transition-colors cursor-pointer"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-xs text-center text-slate-400">
            Admin default: <span className="font-mono text-slate-500">ADMIN</span> /{" "}
            <span className="font-mono text-slate-500">Admin@12345</span>
            <br />
            <span className="text-slate-500">First login redirects to set a new password, then the dashboard.</span>
          </p>
        </form>
      </div>
    </div>
  );
}
