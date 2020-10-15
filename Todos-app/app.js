//selectors
const todoInput = document.getElementById("todo-input");
const todosList = document.getElementById("todos-list");
const submitBtn = document.getElementById("submitBtn");

//events
window.addEventListener('DOMContentLoaded' , ()=>{
    let todos = [];

    if(localStorage.getItem('todos') !== null){
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo=>{
        addItem(todo);
    })
})

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (todoInput.value !== "") {
    addItem(todo = {text : todoInput.value , completed : false});
  }
});

//functions
function addItem(todo){
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");

    todoItem.addEventListener("click", (event) => {
      todoItem.classList.toggle("completed");
      updateLS();
    });

    todoItem.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      todoItem.remove();
      updateLS();
    });

    todoItem.innerText = todo.text;
    if(todo.completed){
        todoItem.classList.add('completed');
    }
    todosList.appendChild(todoItem);
    todoInput.value = "";
    updateLS();
}

function updateLS() {
  const items = [...document.querySelectorAll("ul li")];
  let todos = [];

  items.forEach((item) => {
      todos.push(
          {
            text: item.innerText,
            completed: item.classList.contains("completed")
          }
      )
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}
