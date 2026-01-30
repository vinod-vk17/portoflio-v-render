import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

/* -------------------- Middleware -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- API Routes -------------------- */
// Keep or add your API routes ABOVE the static handler
// Example:
// import apiRouter from "./routes";
// app.use("/api", apiRouter);

/* -------------------- Serve React Frontend -------------------- */
// Works on Render + local dev (after `client/dist` is built)
const clientDistPath = path.resolve(process.cwd(), "client", "dist");

app.use(express.static(clientDistPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

/* -------------------- Start Server -------------------- */
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
