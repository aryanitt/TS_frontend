import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SERVER_ENTRY = path.join(ROOT, "dist", "server", "server.js");
const VITE_BIN = path.join(ROOT, "node_modules", "vite", "bin", "vite.js");

function runNode(args) {
  return spawnSync(process.execPath, args, {
    cwd: ROOT,
    env: process.env,
    stdio: "inherit",
  });
}

function runNpm(args) {
  return spawnSync("npm", args, {
    cwd: ROOT,
    env: process.env,
    stdio: "inherit",
    shell: true,
  });
}

export function ensureBuild() {
  if (fs.existsSync(SERVER_ENTRY)) {
    return;
  }

  // Hostinger runtime cannot execute esbuild (EACCES). Build locally or during deploy only.
  if (process.env.HOSTINGER || process.env.PASSENGER_APP_ENV) {
    throw new Error(
      "dist/ missing on Hostinger — build during deploy (npm run build), not at runtime",
    );
  }

  console.error("[frontend] dist/ missing — running local production build");

  if (!fs.existsSync(VITE_BIN)) {
    const installStatus = runNpm(["install", "--include=dev"]).status ?? 1;
    if (installStatus !== 0) {
      throw new Error("npm install failed");
    }
  }

  runNode([path.join(ROOT, "scripts", "fix-esbuild-perms.mjs")]);

  const buildStatus = runNode([VITE_BIN, "build"]).status ?? 1;
  if (buildStatus !== 0 || !fs.existsSync(SERVER_ENTRY)) {
    throw new Error("vite build failed");
  }

  console.error("[frontend] production build ready");
}

const isCli =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    ensureBuild();
  } catch (error) {
    console.error("[frontend] FATAL:", error.message || error);
    process.exit(1);
  }
}
