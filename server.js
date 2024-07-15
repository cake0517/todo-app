const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let tasks = [];

// POST: タスクの追加
app.post('/tasks', (req, res) => {
    const task = { id: tasks.length + 1, text: req.body.text };
    tasks.push(task);
    res.status(201).json(task);
});

// GET: タスクの一覧取得
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// DELETE: タスクの削除
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
