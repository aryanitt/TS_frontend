import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { toNodeHandler } from "srvx/node";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);
const CLIENT_DIR = path.join(__dirname, "dist", "client");
const SERVER_ENTRY = path.join(__dirname, "dist", "server", "server.js");

process.on("uncaughtException", (error) => {
  console.error("[frontend] uncaughtException:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("[frontend] unhandledRejection:", reason);
});

console.error("[frontend] booting", JSON.stringify({
  port: PORT,
  cwd: process.cwd(),
  clientDir: CLIENT_DIR,
  serverEntry: SERVER_ENTRY,
  clientExists: fs.existsSync(CLIENT_DIR),
  serverExists: fs.existsSync(SERVER_ENTRY),
}));

if (!fs.existsSync(SERVER_ENTRY)) {
  console.error("[frontend] FATAL: dist/server/server.js missing. Run npm run build first.");
  process.exit(1);
}

const app = express();

try {
  const serverEntry = await import("./dist/server/server.js");
  const nodeHandler = toNodeHandler(serverEntry.default.fetch);

  app.use(
    express.static(CLIENT_DIR, {
      index: false,
      maxAge: "1y",
      immutable: true,
    }),
  );

  app.use((req, res) => nodeHandler(req, res));

  const server = app.listen(PORT, () => {
    console.error(`[frontend] listening on port ${PORT}`);
  });

  server.on("error", (error) => {
    console.error("[frontend] listen error:", error.code || error.message, error);
    process.exit(1);
  });
} catch (error) {
  console.error("[frontend] startup failed:", error);
  process.exit(1);
}
