const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");


// ===============================
// ADD TASK
// ===============================

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTask(taskText, false);

    taskInput.value = "";

    saveTasks();
    updateCount();
}


// ===============================
// CREATE TASK
// ===============================

function createTask(taskText, isCompleted) {

    const li = document.createElement("li");

    li.className = "task";


    // Task text
    const span = document.createElement("span");

    span.textContent = taskText;

    if (isCompleted) {
        span.classList.add("completed");
    }


    // ===============================
    // COMPLETE BUTTON
    // ===============================

    const completeButton = document.createElement("button");

    completeButton.textContent =
        isCompleted ? "Completed ✓" : "Complete";

    completeButton.className = "complete-btn";


    completeButton.addEventListener("click", function() {

        span.classList.toggle("completed");

        if (span.classList.contains("completed")) {

            completeButton.textContent = "Completed ✓";

        } else {

            completeButton.textContent = "Complete";

        }

        saveTasks();
        updateCount();

    });


    // ===============================
    // EDIT BUTTON
    // ===============================

    const editButton = document.createElement("button");

    editButton.textContent = "Edit";

    editButton.className = "edit-btn";


    editButton.addEventListener("click", function() {

        const newTask = prompt(
            "Edit your task:",
            span.textContent
        );

        if (newTask !== null && newTask.trim() !== "") {

            span.textContent = newTask.trim();

            saveTasks();

        }

    });


    // ===============================
    // DELETE BUTTON
    // ===============================

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.className = "delete-btn";


    deleteButton.addEventListener("click", function() {

        li.remove();

        saveTasks();
        updateCount();

    });


    // Add everything
    li.appendChild(span);

    li.appendChild(completeButton);

    li.appendChild(editButton);

    li.appendChild(deleteButton);

    taskList.appendChild(li);

}


// ===============================
// SAVE TASKS
// ===============================

function saveTasks() {

    const tasks = [];

    document.querySelectorAll(".task").forEach(function(task) {

        const span = task.querySelector("span");

        tasks.push({

            text: span.textContent,

            completed:
                span.classList.contains("completed")

        });

    });


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// ===============================
// LOAD TASKS
// ===============================

function loadTasks() {

    const savedTasks =
        JSON.parse(localStorage.getItem("tasks")) || [];


    savedTasks.forEach(function(task) {

        createTask(
            task.text,
            task.completed
        );

    });


    updateCount();

}


// ===============================
// UPDATE COUNT
// ===============================

function updateCount() {

    const tasks =
        document.querySelectorAll(".task");

    const completed =
        document.querySelectorAll(".completed");


    totalTasks.textContent =
        tasks.length;

    completedTasks.textContent =
        completed.length;

}


// Load saved tasks
loadTasks();
// ===============================
// DARK MODE
// ===============================

const darkModeBtn =
    document.getElementById("darkModeBtn");


darkModeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");


    if (document.body.classList.contains("dark-mode")) {

        darkModeBtn.textContent = "☀️ Light Mode";

    } else {

        darkModeBtn.textContent = "🌙 Dark Mode";

    }

});