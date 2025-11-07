const express = require("express");
const router = express.Router(); //router for 

let tasks = []; // temporary in-memory storage

// CREATE (POST)
router.post("/", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// READ (GET all tasks)
router.get("/", (req, res) => {
  res.json(tasks);
});

// READ (GET by ID)
router.get("/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Task not found");
  res.json(task);
});

// UPDATE (PUT)
router.put("/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Task not found");

  task.title = req.body.title || task.title;
  task.completed = req.body.completed ?? task.completed;

  res.json(task);
});

//  DELETE
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.send("Task deleted");
});

module.exports = router;
