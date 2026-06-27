import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { toNodeHandler } from "srvx/node";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isPassenger =
  typeof globalThis.PhusionPassenger !== "undefined" ||
  typeof PhusionPassenger !== "undefined" ||
  Boolean(process.env.PASSENGER_APP_ENV) ||
  Boolean(process.env.PASSENGER_BASE_URI);
const PORT = Number(process.env.PORT || 3000);
const CLIENT_DIR = path.join(__dirname, "dist", "client");
const SERVER_ENTRY = path.join(__dirname, "dist", "server", "server.js");

if (isPassenger) {
  PhusionPassenger.configure({ autoInstall: false });
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
    port: PORT,
    passenger: isPassenger,
    serverVersion: 2,
    cwd: process.cwd(),
    node: process.version,
    clientExists: fs.existsSync(CLIENT_DIR),
    serverExists: fs.existsSync(SERVER_ENTRY),
  }),
);

if (!fs.existsSync(SERVER_ENTRY)) {
  console.error(
    "[frontend] FATAL: dist/server/server.js missing. Redeploy after `npm run build` or pull latest main (dist is committed).",
  );
  process.exit(1);
}

const serverEntry = await import("./dist/server/server.js");
const fetchHandler = serverEntry.default?.fetch ?? serverEntry.default;
const nodeHandler = toNodeHandler(fetchHandler);

const app = express();

app.use(
  express.static(CLIENT_DIR, {
    index: false,
    maxAge: "1y",
    immutable: true,
  }),
);

app.use((req, res) => nodeHandler(req, res));

const server = http.createServer(app);

server.on("error", (error) => {
  console.error("[frontend] listen error:", error.code || error.message, error);
  process.exit(1);
});

function onListening() {
  console.error(
    "[frontend] listening",
    isPassenger ? "on Passenger" : `on 0.0.0.0:${PORT}`,
  );
}

console.error("[frontend] calling listen...");

if (isPassenger) {
  server.listen("passenger", onListening);
} else {
  server.listen(PORT, "0.0.0.0", onListening);
}

export default app;
