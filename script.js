'use strict'

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const todo = document.querySelector('#todo');

form.addEventListener('submit',function (event) {
    event.preventDefault();

    const taskText =taskInput.value;

    const taskHtml = `<div class="todo">
        <div class="galochka">
            <img src="image/galochka.svg" alt="">
        </div>
        <div class="todoshka">
            <h2>${taskText}</h2>
        </div>
        <div class="krestik">
            <img src="image/krestik.svg" alt="">
        </div>
    </div>`;

    todo.insertAdjacentHTML('beforeend', taskHtml)

    taskInput.value = ''
    taskInput.focus()
})