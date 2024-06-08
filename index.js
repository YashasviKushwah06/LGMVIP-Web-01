const input = document.querySelector(".input");
const addButton = document.querySelector(".add-task-button");
const todosHTML = document.querySelector(".todo-list");
const emptyImage = document.querySelector(".empty-image");
const filters = document.querySelectorAll(".filter");
const deleteAllButton = document.querySelector(".delete-all");

let todosJSON = JSON.parse(localStorage.getItem("todos")) || [];
let filter = "";

function getTodoHTML(todo, index) {
    let checked = todo.status === "completed" ? "checked" : "";
    return `
        <li class="todo">
            <button class="circle">
                <span class="material-symbols-outlined">
                    circle
                </span>
            </button>
            <label for="${index}">
                <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
                <span class="${checked}">${todo.name}</span>
            </label>
            <button class="delete-btn" data-index="${index}" onclick="remove(this)">
                <span class="material-symbols-outlined">
                    close
                </span>
            </button>
        </li>`;
}

function showTodos() {
    let filteredTodos = todosJSON;

    if (filter === "complete") {
        filteredTodos = todosJSON.filter(todo => todo.status === "completed");
    } else if (filter === "incomplete") {
        filteredTodos = todosJSON.filter(todo => todo.status === "pending");
    }

    if (filteredTodos.length === 0) {
        todosHTML.innerHTML = "";
        emptyImage.style.display = "block";
    } else {
        todosHTML.innerHTML = filteredTodos.map(getTodoHTML).join("");
        emptyImage.style.display = "none";
    }
}

function addTodo(todo) {
    input.value = "";
    todosJSON.push({ name: todo, status: "pending" });
    localStorage.setItem("todos", JSON.stringify(todosJSON));
    showTodos();
}

input.addEventListener("keyup", e => {
    let todo = input.value.trim();
    if (!todo || e.key !== "Enter") {
        return;
    }
    addTodo(todo);
});

addButton.addEventListener("click", () => {
    let todo = input.value.trim();
    if (!todo) {
        return;
    }
    addTodo(todo);
});

function updateStatus(todo) {
    let todoName = todo.parentElement.lastElementChild;
    if (todo.checked) {
        todoName.classList.add("checked");
        todosJSON[todo.id].status = "completed";
    } else {
        todoName.classList.remove("checked");
        todosJSON[todo.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todosJSON));
    showTodos();
}

function remove(todo) {
    const index = todo.dataset.index;
    todosJSON.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todosJSON));
    showTodos();
}

filters.forEach(el => {
    el.addEventListener("click", e => {
        if (el.classList.contains('active')) {
            el.classList.remove('active');
            filter = '';
        } else {
            filters.forEach(tag => tag.classList.remove('active'));
            el.classList.add('active');
            filter = el.classList.contains("complete") ? "complete" : "incomplete";
        }
        showTodos();
    });
});

deleteAllButton.addEventListener("click", () => {
    todosJSON = [];
    localStorage.setItem("todos", JSON.stringify(todosJSON));
    showTodos();
});

showTodos();







// const inputBox = document.querySelector(".input");
// const listContainer = document.querySelector(".todo-list");

// function addTask() {
//     if (inputBox.value === "") {
//         alert("you must write something!")
//     } else {
//         let li = document.createElement("li");
//         li.innerHTML = inputBox.value;
//         listContainer.appendChild(li);
//         let span = document.createElement("span");
//         span.innerHTML = "\u00d7";
//         li.appendChild(span);
//     }
//     inputBox.value = "";
//     saveData();
// }

// listContainer.addEventListener("click", function(e) {
//     if (e.target.tagName === "LI") {
//         e.target.classList.toggle ("checked");
//         saveData();
//     } else if (e.target.tagName === "SPAN") {
//         e.target.parentElement.remove();
//         saveData();
//     }
// }, false);

// function saveData(){
//     localStorage.setItem("data", listContainer.innerHTML);
// }

// function showTask(){
//     listContainer.innerHTML = localStorage.getItem("data");
// }

// showTask();