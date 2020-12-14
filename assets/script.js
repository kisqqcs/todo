'use strict'

    //Parts of date
    const bodyDay = document.querySelector('.body__day');
    const bodyDate = document.querySelector('.body__date');

    //Names of the days
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'];

       //Show date
    function showDate() {
      const currentDate = new Date();
      const day = [
          currentDate.getMonth() + 1,
          currentDate.getDate(),
          currentDate.getFullYear(),
      ].map(num => num < 10 ? `0${num}` : num);

      bodyDay.textContent = dayNames[currentDate.getDay()];
      bodyDate.textContent = day.join('-');

  };
  showDate();

    

//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
let todos = [];
let TodoItemsNumber = document.querySelector(".todo__number")

//Event Listeners
document.addEventListener('DOMContentLoaded', getToDos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

//Functions
function addTodo(event){
    event.preventDefault();
    //ToDo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')
    //Create Li
    const newTodo = document.createElement('li');
    // newTodo.innerText = todoInput.value;
    newTodo.innerHTML = `<input type="checkbox"> ${todoInput.value}`;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add ToDo to LocalStorage
    saveLocalToDos(todoInput.value);
    //Delete button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash" ></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Clear TodoInput value
    todoInput.value = "";
    };

function deleteCheck(e) {
    const item = e.target;
    //Delete Todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalToDos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
    //Check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    };
}; 

  function saveLocalToDos(todo){
      //Check Local Storage
      let todos;
      if(localStorage.getItem('todos') === null) {
          todos = [];
      }else{
          todos = JSON.parse(localStorage.getItem('todos'));
      }
      todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos));
  };

  function getToDos () {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
    //ToDo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerHTML = `<input type="checkbox"> ${todo}`;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash" ></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    });
};

function removeLocalToDos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
      }else{
        calculatePendingItemsNr();
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
};
    //Pending items number (még nincsen benne a done!!!)
    const calculatePendingItemsNr = () => {
     TodoItemsNumber.textContent= Object.keys(todos).length;
  };