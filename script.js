let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateTimeInput = document.getElementById('dateTimeInput');
    
    if (taskInput.value.trim() === '') return;

    const task = {
        id: Date.now(),
        name: taskInput.value.trim(),
        dateTime: dateTimeInput.value,
        completed: false
    };

    tasks.push(task);
    taskInput.value = '';
    dateTimeInput.value = '';

    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.innerHTML = `
            <div>
                <strong>${task.name}</strong><br>
                <small>${task.dateTime ? new Date(task.dateTime).toLocaleString() : ''}</small>
            </div>
            <div class="task-buttons">
                <button onclick="toggleComplete(${task.id})">${task.completed ? 'Unmark' : 'Complete'}</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function toggleComplete(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newName = prompt('Edit task name:', task.name);
    const newDateTime = prompt('Edit task date and time (YYYY-MM-DDTHH:MM):', task.dateTime);

    if (newName !== null) task.name = newName;
    if (newDateTime !== null) task.dateTime = newDateTime;

    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}
