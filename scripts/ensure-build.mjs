import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SERVER_ENTRY = path.join(ROOT, "dist", "server", "server.js");
const VITE_BIN = path.join(ROOT, "node_modules", "vite", "bin", "vite.js");

function runNode(args) {
  console.error(`[frontend] running: node ${args.join(" ")}`);
  const result = spawnSync(process.execPath, args, {
    cwd: ROOT,
    env: process.env,
    stdio: "inherit",
  });

  if (result.error) {
    console.error("[frontend] command error:", result.error);
    return 1;
  }

  return result.status ?? 1;
}

function runNpm(args) {
  console.error(`[frontend] running: npm ${args.join(" ")}`);
  const result = spawnSync("npm", args, {
    cwd: ROOT,
    env: process.env,
    stdio: "inherit",
    shell: true,
  });

  if (result.error) {
    console.error("[frontend] command error:", result.error);
    return 1;
  }

  return result.status ?? 1;
}

export function ensureBuild() {
  if (fs.existsSync(SERVER_ENTRY)) {
    return;
  }

  console.error("[frontend] dist/ missing — running production build in", ROOT);

  if (!fs.existsSync(VITE_BIN)) {
    const installStatus = runNpm(["install", "--include=dev"]);
    if (installStatus !== 0) {
      throw new Error("npm install failed");
    }
  }

  let buildStatus = runNode([VITE_BIN, "build"]);

  if (buildStatus !== 0 || !fs.existsSync(SERVER_ENTRY)) {
    console.error("[frontend] build failed, reinstalling dev dependencies and retrying");
    const reinstallStatus = runNpm(["install", "--include=dev"]);
    if (reinstallStatus !== 0) {
      throw new Error("npm install --include=dev failed");
    }
    buildStatus = runNode([VITE_BIN, "build"]);
  }

  if (buildStatus !== 0 || !fs.existsSync(SERVER_ENTRY)) {
    throw new Error("vite build failed — dist/server/server.js still missing");
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
