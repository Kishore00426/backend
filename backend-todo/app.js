import express from "express";
import "dotenv/config";
import taskRoutes from "./routes/tasks.js";

const app = express();

app.use(express.json());

// Middleware for logs
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send(" Welcome to the To-Do API! Use /api/tasks");
});

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
