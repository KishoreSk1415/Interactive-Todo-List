const  todoList = document.getElementById("todo-list");
const newTodoInput = document.getElementById("new-todo");
const addButton = document.getElementById(add-button);

let todoItems = [];

//It will Load task from local storage
const getTodosFromStorage = () => {
    todoItems = JSON.parse(localStorage.getItem("todos")) || [];
    renderTodoList();
};

//Now here it will Save tasks to local Storage
const saveTodosToStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todoItems));
};

// Rendering the todo list
const renderTodoList = () => {
    todoList.innerHTML = "";
    todoItems.forEach((todo) => {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", (e) => {
            todo.completed = e.target.checked;
            saveTodosToStorage();
            renderTodoList();
        });
        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(todo.text));
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            const index = todoItems.indexOf(todo);
            todoItems.splice(index, 1);
            saveTodosToStorage();
            renderTodoList();
        });
        listItem.appendChild(deleteButton);
        listItem.classList.add(todo.completed ? "completed" : "");
        todoList.appendChild(listItem);
    });
};

//Add new todo
const addNewTodo = () => {
    const newTodoText = newTodoInput.value.trim();
    if (!newTodoText) return;
    todoItems.push({ text: newTodoInput, completed: false });
    saveTodosToStorage();
    renderTodoList();
    newTodoInput.value = "";
};