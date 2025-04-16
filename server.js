const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'tasks.json');

function readTasks() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const tasks = readTasks();
  tasks.push(req.body.task);
  writeTasks(tasks);
  res.status(201).json({ message: 'Tâche ajoutée' });
});

app.delete('/tasks/:index', (req, res) => {
  const tasks = readTasks();
  tasks.splice(req.params.index, 1);
  writeTasks(tasks);
  res.json({ message: 'Tâche supprimée' });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
