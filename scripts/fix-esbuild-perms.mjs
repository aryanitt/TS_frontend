import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function findEsbuildBinaries(dir, depth = 0, results = []) {
  if (depth > 8) return results;

  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "@esbuild") {
        for (const platform of fs.readdirSync(full)) {
          const bin = path.join(full, platform, "bin", "esbuild");
          if (fs.existsSync(bin)) {
            results.push(bin);
          }
        }
        continue;
      }

      if (entry.name === "node_modules" || entry.name.startsWith(".")) {
        findEsbuildBinaries(full, depth + 1, results);
      } else if (depth > 0) {
        findEsbuildBinaries(full, depth + 1, results);
      }
    }
  }

  return results;
}

const bins = findEsbuildBinaries(path.join(ROOT, "node_modules"));

for (const bin of bins) {
  try {
    fs.chmodSync(bin, 0o755);
    console.log("[postinstall] esbuild executable:", bin);
  } catch (error) {
    console.warn("[postinstall] chmod failed:", bin, error.message);
  }
}
