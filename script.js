const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const text = document.createElement('span');
    text.textContent = task.name;
    text.onclick = () => toggleComplete(index);

    const buttons = document.createElement('div');
    buttons.className = 'task-buttons';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(index);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteTask(index);

    buttons.append(editBtn, delBtn);
    li.append(text, buttons);
    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const newTask = {
    name: taskInput.value.trim(),
    completed: false
  };
  if (newTask.name) {
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskForm.reset();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newName = prompt('Edit task:', tasks[index].name);
  if (newName !== null && newName.trim() !== '') {
    tasks[index].name = newName.trim();
    saveTasks();
    renderTasks();
  }
}

taskForm.addEventListener('submit', addTask);
renderTasks();
