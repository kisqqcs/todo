(function() {
    // Mock data
    let todos = [];
    //Parts of date
    const bodyDay = document.querySelector('.body__day');
    const bodyDate = document.querySelector('.body__date');

    //Parts of todo input
    const todoAddBtn = document.querySelector('.todo__btn');
    const todoInput = document.querySelector(".todo__input");
    const todoListPending = document.querySelector('.todo__list--pending');
  
    //Names of the days
    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'];
   
        //Localstorage handler object.
    const localDB = {
        // localStorage.setItem('todos', todos);
        setItem(key, value) {
            value = JSON.stringify(value);
            localStorage.setItem(key, value);
        },
        // localDB.getItem('todos');
        getItem(key) {
            const value = localStorage.getItem(key);
            if(!value) {
                return null;
            }
            return JSON.parse(value);
        },
        // localDB.removeItem('todos');
        removeItem(key) {
            localStorage.removeItem(key);
        }
    };

    //Initialize application.
    const init = () => {
        showDate();
        setListeners();
        loadExistingTodos();
        pendingItemsNumber();
    };
    
    //Load existing todos.
    const loadExistingTodos = () => {
        const savedTodos = localDB.getItem('todos');
        if (savedTodos) {
            todos = savedTodos;
        }
        if (todos && Array.isArray(todos)) {
            todos.forEach( todo => showTodo(todo));
        }
    };

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

    }
    // Set Event Listeners
    const setListeners = () => {
        todoAddBtn.addEventListener('click', addNewTodo);

    };

    //Save and add Todo in the Database
    const addNewTodo =  () => {
        const value = todoInput.value;
        if (value === '') {
            alert('Please type a todo');
            return;
        }
        const todo = {
            text: value,
            done: false
        };
        todos.push(todo);
        localDB.setItem('todos', todos);
        showTodo(todo);
        todoInput.value = '';
    };

    // Show todo in the list
    const showTodo = todo => {
        const todoItem = document.createElement('div');
        todoListPending.appendChild(todoItem);
        
        todoItem.innerHTML = `
            <input type="checkbox">
            <span>${todo.text}</span>   
            <button>
                <i class="fa fa-trash"></i>
            </button>
        `;
    };
//A teendő lista feletti mondatban (You have X pending items) látható, hogy szerepel
//a teendők száma, ez dinamikusan frissüljön mindig
    //Pending items number
    const pendingItemsNumber = () => {
        Object.keys(todos).length;
       
    } 
    
    
    init();
})();

