//selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const itemTemplate = document.getElementById('item-template');
const todoFilter = document.querySelector('.filter-todo');
//event-listner
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click' , addTodo)
todoList.addEventListener('click' , deleteCheck);
todoFilter.addEventListener('click' , filterTodo);

//functions

function addTodo(event) {
    console.log('clled');
    event.preventDefault();
    const todoItem = itemTemplate.content.cloneNode(true);
    todoItem.querySelector('.todo-item').innerText = todoInput.value;
    saveLocalTodos(todoInput.value);
    todoInput.value = '';
    todoList.append(todoItem);
    
}

function deleteCheck (event){
    const item = event.target;

    if (item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalStorege(todo);
        todo.addEventListener('transitionend' , function(){
            todo.remove();
        })
    }

    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(event) {
    const todos = [...todoList.children];
    console.log(todos);
    todos.forEach(function(todo){
        switch(event.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos" , JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo){
        const todoItem = itemTemplate.content.cloneNode(true);
        todoItem.querySelector('.todo-item').innerText = todo;
        todoInput.value = '';
        todoList.append(todoItem);
    });
}


function removeLocalStorege(todo){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex) , 1);
    console.log(todos.length);
    if(todos.length === 0){
        localStorage.removeItem('todos');
    }
    else{
        localStorage.setItem('todos' , todos);
    }
}

