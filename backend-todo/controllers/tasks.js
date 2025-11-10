let tasks = []; // temporary in-memory storage

// CREATE (POST)
function createTask(req, res) {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: true
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
}

// READ (GET all tasks)
function getTasks(req, res) {
  res.json(tasks);
}

// READ (GET by ID)
function getTaskById(req, res) {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Task not found");
  res.json(task);
}

// UPDATE (PUT)
function updateTask(req, res) {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Task not found");

  task.title = req.body.title || task.title;
  task.completed = req.body.completed ?? task.completed;

  res.json(task);
}

// DELETE
function deleteTask(req, res) {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.send("Task deleted");
}

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
