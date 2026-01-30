import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the built React app
app.use(express.static(path.join(__dirname, "../public")));

// API routes (add your API endpoints here)
app.get("/api/portfolio/profile", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio API is running",
  });
});

// Catch-all handler: serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"), (err) => {
    if (err) {
      res.status(500).send("Error loading page");
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving static files from dist/public`);
});

export default app;
