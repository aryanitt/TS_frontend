/**
 * Production entry for Hostinger (Phusion Passenger) and local preview.
 *
 * Hostinger / Passenger:
 * - https://www.phusionpassenger.com/docs/advanced_guides/in_depth/node/reverse_port_binding.html
 * - Must call exactly ONE listen(); on Passenger use app.listen("passenger").
 * - Do NOT spawn srvx CLI here — it creates a second server and causes EADDRINUSE.
 *
 * TanStack Start (Vite build output):
 * - https://tanstack.com/start/latest/docs/framework/react/guide/hosting
 * - vite build -> dist/client (static) + dist/server/server.js (SSR fetch handler)
 * - Serve static assets, forward other requests via srvx toNodeHandler(fetch).
 *
 * Hostinger deploy:
 * - Build locally: npm run build && git add dist && git commit && git push
 * - hPanel: Framework Express, Entry server.js, Output directory EMPTY, Build npm install
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { toNodeHandler } from "srvx/node";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const passenger = globalThis.PhusionPassenger;
const isPassenger = passenger !== undefined;
const PORT = Number(process.env.PORT || 3000);
const CLIENT_DIR = path.join(__dirname, "dist", "client");
const SERVER_ENTRY = path.join(__dirname, "dist", "server", "server.js");

if (isPassenger) {
  passenger.configure({ autoInstall: false });
}

process.on("uncaughtException", (error) => {
  console.error("[frontend] uncaughtException:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("[frontend] unhandledRejection:", reason);
});

console.error(
  "[frontend] booting",
  JSON.stringify({
    serverVersion: 3,
    passenger: isPassenger,
    port: PORT,
    cwd: process.cwd(),
    node: process.version,
    clientExists: fs.existsSync(CLIENT_DIR),
    serverExists: fs.existsSync(SERVER_ENTRY),
  }),
);

if (!fs.existsSync(SERVER_ENTRY)) {
  console.error(
    "[frontend] FATAL: dist/server/server.js missing. Run `npm run build` locally, commit dist/, push, redeploy.",
  );
  process.exit(1);
}

const serverEntry = await import("./dist/server/server.js");
const fetchHandler = serverEntry.default?.fetch ?? serverEntry.default;
const nodeHandler = toNodeHandler(fetchHandler);

const app = express();

app.get("/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "ts-publications-crm-frontend",
    passenger: isPassenger,
    timestamp: new Date().toISOString(),
  });
});

app.use(
  express.static(CLIENT_DIR, {
    index: false,
    maxAge: "1y",
    immutable: true,
  }),
);

app.use((req, res) => nodeHandler(req, res));

function onListening() {
  console.error(
    "[frontend] listening",
    isPassenger ? "on Passenger" : `on 0.0.0.0:${PORT}`,
  );
}

console.error("[frontend] calling listen...");

if (isPassenger) {
  app.listen("passenger", onListening);
} else {
  app.listen(PORT, "0.0.0.0", onListening);
}

export default app;
