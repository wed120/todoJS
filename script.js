const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksLit = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');


//Добавление задачи
form.addEventListener('submit', addTask);

//Удаление задачи
tasksLit.addEventListener('click', deleteTask);

//Отмечаем задачу завершенной
tasksLit.addEventListener('click', doneTask);

//Функции
function addTask(event) {
    //Отменяем отправку формы
    event.preventDefault();

    //Достаем текст из поля ввода
    const taskText = taskInput.value;

    //Формируем разметку для новой задачи
    const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
            <span class="task-title">${taskText}</span>
            <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li>`

    //Добавляем задачу на страницу
    tasksLit.insertAdjacentHTML('beforeend', taskHTML);

    //Очищаем поле ввода и возвращаем на него фокус
    taskInput.value = '';
    taskInput.focus()

    //Проверка, если больше одной задачи, блок скрыт
    if (tasksLit.children.length > 1) {
        emptyList.classList.add('none')
    }

    //
}

function deleteTask(event) {

    //Проверяем клик по кнопке
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest('.list-group-item');
        parentNode.remove();
    }

    //Проверяем, если нет задач показывать пустой список
    if (tasksLit.children.length === 1) {
        emptyList.classList.remove('none')
    }
}

function doneTask(event) {

    //Проверка, что клик по кнопке "задача выполнена"
    if (event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('.list-group-item');
        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done')
    }
}