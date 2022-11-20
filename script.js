const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksLit = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function (task) {
	//Формируем css class
	const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

	//Формируем разметку для новой задачи
	const taskHTML = `<li id='${task.id}' class='list-group-item d-flex justify-content-between task-item'>
            <span class='${cssClass}'>${task.text}</span>
            <button type='button' data-action='done' class='btn-action'>
            <img src='./img/tick.svg' alt='Done' width='18' height='18'>
            </button>
            <button type='button' data-action='delete' class='btn-action'>
            <img src='./img/cross.svg' alt='Done' width='18' height='18'>
            </button>
        </div>
    </li>`;

	//Добавляем задачу на страницу
	tasksLit.insertAdjacentHTML('beforeend', taskHTML);
});

checkEmptyList();

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);

function addTask(event) {
	//Отменяем отправку формы
	event.preventDefault();

	//Достаем текст из поля ввода
	const taskText = taskInput.value;

	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false
	};

	tasks.push(newTask);
	saveToLocalStorage();

	//Формируем css class
	const cssClass = newTask.done
		? 'task-title task-title--done'
		: 'task-title';

	//Формируем разметку для новой задачи
	const taskHTML = `<li id='${newTask.id}' class='list-group-item d-flex justify-content-between task-item'>
            <span class='${cssClass}'>${taskText}</span>
            <button type='button' data-action='done' class='btn-action'>
            <img src='./img/tick.svg' alt='Done' width='18' height='18'>
            </button>
            <button type='button' data-action='delete' class='btn-action'>
            <img src='./img/cross.svg' alt='Done' width='18' height='18'>
            </button>
        </div>
    </li>`;

	//Добавляем задачу на страницу
	tasksLit.insertAdjacentHTML('beforeend', taskHTML);

	//Очищаем поле ввода и возвращаем на него фокус
	taskInput.value = '';
	taskInput.focus();

	checkEmptyList();
	saveToLocalStorage();
}

function deleteTask(event) {
	if (event.target.dataset.action !== 'delete') return;

	event.target.dataset.action !== 'delete';
	const parentNode = event.target.closest('.list-group-item');

	const id = Number(parentNode.id);

	// const index = tasks.findIndex((task) => task.id === id);
	//
	// tasks.splice(index, 1);

	tasks = tasks.filter((task) => task.id !== id);
	saveToLocalStorage();
	parentNode.remove();

	checkEmptyList();
}

function doneTask(event) {
	if (event.target.dataset.action !== 'done') return;

	const parentNode = event.target.closest('.list-group-item');

	const id = Number(parentNode.id);
	const task = tasks.find((task) => task.id === id);

	task.done = !task.done;

	saveToLocalStorage();

	const taskTitle = parentNode.querySelector('.task-title');
	taskTitle.classList.toggle('task-title--done');
}

function checkEmptyList() {
	if (tasks.length === 0) {
		const emptyListHTML = `<li id='emptyList' class='list-group-item empty-list'>
			<img src='./img/leaf.svg' alt='Empty' width='48' class='mt-3'/>
			<div class='empty-list__title'>Список дел пуст</div>	</li>`;
		tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
	}
	if (tasks.length > 0) {
		const emptyListEl = document.querySelector('#emptyList');
		emptyListEl ? emptyListEl.remove() : null;
	}
}

function saveToLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}
