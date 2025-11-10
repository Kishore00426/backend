const express = require("express");
const router = express.Router(); //router for
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require("../controllers/tasks");

// CREATE (POST)
router.post("/", createTask);

// READ (GET all tasks)
router.get("/", getTasks);

// READ (GET by ID)
router.get("/:id", getTaskById);

// UPDATE (PUT)
router.put("/:id", updateTask);

// DELETE
router.delete("/:id", deleteTask);

module.exports = router;
