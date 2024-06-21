let bt = document.getElementById('add');
let input = document.getElementById('input');
let todolist = document.getElementById('todolist');
let zzz = document.getElementById('count');
let c = document.getElementById('copy');
let searchInput = document.getElementById('in');

let todos = [];
window.onload=()=>
    {
        todos =JSON.parse(localStorage.getItem('todos'))||[]
        todos.forEach(todo=>addtodo(todo))
        updateCount()
    }

bt.addEventListener('click', () => {
    if (((input.value).length) < 1) {
        alert("ENTER THE TASK TO ADD...");
    } else {
        todos.push(input.value);
        localStorage.setItem('todos',JSON.stringify(todos));
        addtodo(input.value);
        input.value = "";
        zzz.innerText = `LIST HAS ${todos.length} TASK`;
    }
});

function addtodo(todo) {
    let para = document.createElement('p');
    para.innerText = todo;
    todolist.appendChild(para);
    

    para.addEventListener('click', () => {
        para.style.textDecoration = 'line-through';
    });

    para.addEventListener('dblclick', () => {
        todolist.removeChild(para);
        remove(todo);
        updateCount();
    });
}

function remove(todo) {
    let index = todos.indexOf(todo);
    if (index > -1) {
        todos.splice(index, 1);
    }
    localStorage.setItem('todos',JSON.stringify(todos))
}

function updateCount() {
    if ((todos.length) >= 1) {
        zzz.innerText = `LIST HAS ${todos.length} TASK`;
    } else {
        zzz.innerText = "LIST IS EMPTY";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    searchInput.addEventListener('input', function(event) {
        let searchTerm = event.target.value.toLowerCase();
        renderTodos(searchTerm);
    });
});

function renderTodos(filter = '') {
    todolist.innerHTML = '';

    const filteredTodos = todos.filter(todo => todo.toLowerCase().includes(filter));

    filteredTodos.forEach(todo => {
        let para = document.createElement('p');
        para.innerText = todo;
        todolist.appendChild(para);

        para.addEventListener('click', () => {
            para.style.textDecoration = 'line-through';
        });

        para.addEventListener('dblclick', () => {
            todolist.removeChild(para);
            remove(todo);
            updateCount();
        });
    });
}

renderTodos();


