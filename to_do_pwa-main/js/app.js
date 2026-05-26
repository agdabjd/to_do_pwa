const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const todoList = document.getElementById("todoList");

let tasks = [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
}

function renderTasks() {
    todoList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("article");
        taskItem.classList.add("task-item");

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        const textSpan = document.createElement("span");
        textSpan.classList.add("task-text");
        textSpan.textContent = task.text;

        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("task-actions");

        const completeButton = document.createElement("button");
        completeButton.classList.add("complete-button");
        completeButton.innerHTML = "✔";

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = "✖";

        completeButton.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        actionsDiv.appendChild(completeButton);
        actionsDiv.appendChild(deleteButton);
        taskItem.appendChild(textSpan);
        taskItem.appendChild(actionsDiv);
        todoList.appendChild(taskItem);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
    taskInput.focus();
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

loadTasks();

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./service-worker.js")
            .then(() => {
                console.log("Service Worker registrado");
            })
            .catch((error) => {
                console.log("Erro:", error);
            });
    });
}