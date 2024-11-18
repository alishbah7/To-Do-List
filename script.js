let a = document.getElementById('inputtask');
let b = document.getElementById('inputdate');
let c = document.getElementById('inputdisc');
let tasks = document.getElementById('tasks');
let create = document.getElementById('create');

window.onload = () => {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach((task, index) => {
        addTaskToUI(task, index);
    });
};

function createTask(event) {
    event.preventDefault();

    if (a.value !== "" && b.value !== "" && c.value !== "") {
        let task = {
            "Name": a.value,
            "date": b.value,
            "disc": c.value
        };

        let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
        tasksArray.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasksArray));

        addTaskToUI(task, tasksArray.length - 1);
        removeInputFields();
        closeModal();
    } else {
        alert("Please Fill Out All The Fields");
    }
}


function addTaskToUI(task, index) {
    let taskDiv = document.createElement('div');
    taskDiv.innerHTML = `
        <h5>${task["Name"]}</h5>
        <p>${task["date"]}</p>
        <p>${task["disc"]}</p>
        <i onclick="deleteTask(${index})" class='bx bxs-trash'></i>
    `;
    tasks.appendChild(taskDiv);
}


function deleteTask(index) {
    let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
    tasksArray.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));

    refreshTaskList();
}


function refreshTaskList() {
    tasks.innerHTML = ""; 
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach((task, index) => {
        addTaskToUI(task, index);
    });
}


function removeInputFields() {
    a.value = "";
    b.value = "";
    c.value = "";
}


function closeModal() {
    create.setAttribute("data-dismiss", "modal");
    create.click();

    setTimeout(() => {
        create.setAttribute("data-dismiss", "");
    }, 0);
}