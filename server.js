import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { toNodeHandler } from "srvx/node";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);
const CLIENT_DIR = path.join(__dirname, "dist", "client");

console.error("[frontend] booting", JSON.stringify({ port: PORT, clientDir: CLIENT_DIR }));

const app = express();
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

app.listen(PORT, () => {
  console.error(`[frontend] listening on port ${PORT}`);
});
