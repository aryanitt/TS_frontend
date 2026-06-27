import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || "3000";
const CLIENT_DIR = path.join(__dirname, "dist", "client");
const SERVER_ENTRY = path.join(__dirname, "dist", "server", "server.js");
const SRVX_BIN = path.join(__dirname, "node_modules", "srvx", "bin", "srvx.mjs");

process.on("uncaughtException", (error) => {
  console.error("[frontend] uncaughtException:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("[frontend] unhandledRejection:", reason);
  process.exit(1);
});

const bootInfo = {
  port: PORT,
  cwd: process.cwd(),
  node: process.version,
  clientExists: fs.existsSync(CLIENT_DIR),
  serverExists: fs.existsSync(SERVER_ENTRY),
  srvxExists: fs.existsSync(SRVX_BIN),
};

console.error("[frontend] booting", JSON.stringify(bootInfo));

if (!fs.existsSync(SERVER_ENTRY)) {
  console.error(
    "[frontend] FATAL: dist/server/server.js missing. Redeploy after `npm run build` or pull latest main (dist is committed).",
  );
  process.exit(1);
}

if (!fs.existsSync(SRVX_BIN)) {
  console.error("[frontend] FATAL: srvx not installed — run `npm install`.");
  process.exit(1);
}

const args = [
  SRVX_BIN,
  "serve",
  "--prod",
  `--port=${PORT}`,
  "--static",
  CLIENT_DIR,
  "--entry",
  SERVER_ENTRY,
];

const child = spawn(process.execPath, args, {
  cwd: __dirname,
  env: process.env,
  stdio: "inherit",
});

child.on("error", (error) => {
  console.error("[frontend] failed to start srvx:", error);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  console.error("[frontend] srvx exited", JSON.stringify({ code, signal }));
  process.exit(code ?? 1);
});
