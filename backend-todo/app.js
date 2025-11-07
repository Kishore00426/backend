const express = require("express");
const app = express();
const taskRoutes = require("./routes/tasks");

// Middleware to parse JSON
app.use(express.json());

// Global middleware (example)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Use the tasks route
app.use("/api/tasks", taskRoutes);

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
