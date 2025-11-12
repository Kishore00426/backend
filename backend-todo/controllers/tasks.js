// let tasks = []; // temporary in-memory storage

// // CREATE (POST)
// function createTask(req, res) {
//   const newTask = {
//     id: tasks.length + 1,
//     title: req.body.title,
//     completed: false
//   };
//   tasks.push(newTask);
//   res.status(201).json(newTask);
// }

// // READ (GET all tasks)
// function getTasks(req, res) {
//   res.json(tasks);
// }

// // READ (GET by ID)
// function getTaskById(req, res) {
//   const task = tasks.find(t => t.id === parseInt(req.params.id));
//   if (!task) return res.status(404).send("Task not found");
//   res.json(task);
// }

// // UPDATE (PUT)
// function updateTask(req, res) {
//   const task = tasks.find(t => t.id === parseInt(req.params.id));
//   if (!task) return res.status(404).send("Task not found");

//   task.title = req.body.title || task.title;
//   task.completed = req.body.completed ?? task.completed;

//   res.json(task);
// }

// // DELETE
// function deleteTask(req, res) {
//   const id = parseInt(req.params.id);
//   tasks = tasks.filter(t => t.id !== id);
//   res.send("Task deleted");
// }

// module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };

import { db } from "../db/index.js";
import { tasks } from "../db/schema.js";
import { eq } from "drizzle-orm";

export async function createTask(req, res) {
  try {
    const [newTask] = await db.insert(tasks).values({
      title: req.body.title,
      completed: req.body.completed || false,
    }).returning();
    res.status(201).json(newTask);
  } catch {
    res.status(500).json({ error: "Failed to create task" });
  }
}

export async function getTasks(req, res) {
  const allTasks = await db.select().from(tasks);
  res.json(allTasks);
}

export async function getTaskById(req, res) {
  const [task] = await db.select().from(tasks).where(eq(tasks.id, parseInt(req.params.id)));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
}

export async function updateTask(req, res) {
  try {
    const [updated] = await db
      .update(tasks)
      .set({ title: req.body.title, completed: req.body.completed })
      .where(eq(tasks.id, parseInt(req.params.id)))
      .returning();
    res.json(updated);
  } catch {
    res.status(404).json({ error: "Task not found" });
  }
}

export async function deleteTask(req, res) {
  try {
    await db.delete(tasks).where(eq(tasks.id, parseInt(req.params.id)));
    res.send("Task deleted");
  } catch {
    res.status(404).json({ error: "Task not found" });
  }
}
