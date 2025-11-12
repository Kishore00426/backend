import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import taskRoutes from "./routes/tasks.js";

const app = express();

// For resolving paths (needed in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON
app.use(express.json());

// Log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve frontend files (index.html, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Use task routes
app.use("/api/tasks", taskRoutes);

// Default route → serve index.html (frontend)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
