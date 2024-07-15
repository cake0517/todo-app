async function fetchTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.appendChild(createDeleteButton(task.id));
        taskList.appendChild(li);
    });
}

function createDeleteButton(taskId) {
    const button = document.createElement('button');
    button.textContent = '削除';
    button.onclick = () => deleteTask(taskId);
    return button;
}

async function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value;
    if (taskText) {
        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: taskText })
        });
        input.value = '';
        fetchTasks();
    }
}

async function deleteTask(taskId) {
    await fetch(`/tasks/${taskId}`, { method: 'DELETE' });
    fetchTasks();
}

// ページ読み込み時にタスクを取得
fetchTasks();
