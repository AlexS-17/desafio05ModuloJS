const tbody = document.querySelector("tbody");
const btn = document.querySelector("button");
const input = document.querySelector("input");

const tasks = [
    { id: Date.now(), nameTask: "Hacer ejercicio", completed: false },
    { id: Date.now(), nameTask: "Bañarme", completed: false },
    { id: Date.now(), nameTask: "Desayunar", completed: false }
];

// Clonar el array de objetos para trabajar con él usando spread operator
const clonTasks = [...tasks];

function renderTasks(clonTasks) {
    tbody.innerHTML = "";
    clonTasks.forEach((task) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.id}</td>
            <td class="${task.completed ? 'completed' : ''}">${task.nameTask}</td>
            <td><input type="checkbox" ${task.completed ? 'checked' : ''}></td>
            <td><button class="delete-btn"><i class="fa-solid fa-trash"></i></button></td>
        `;

        const checkbox = row.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            renderTasks(clonTasks);
            updateTaskCounters();
        });

        const deleteBtn = row.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            clonTasks.splice(clonTasks.indexOf(task), 1);
            renderTasks(clonTasks);
            updateTaskCounters();
        });

        tbody.appendChild(row);
    });
}

function updateTaskCounters() {
    const completedTasks = clonTasks.filter(task => task.completed).length;
    const totalTasks = clonTasks.length;
    document.getElementById("total-tasks").innerHTML = `Total de tareas: <strong>${totalTasks}</strong>`;
    document.getElementById('comple-tasks').innerHTML = `Tareas realizadas: <strong>${completedTasks}</strong>`;
}

function addTask() {
    const newTask = input.value;
    if (newTask) {
        const newTaskObj = {
            id: Date.now(),
            nameTask: newTask,
            completed: false
        };
        clonTasks.push(newTaskObj);
        input.value = "";
        renderTasks(clonTasks);
        updateTaskCounters();
    }
}

renderTasks(clonTasks);
updateTaskCounters();

btn.addEventListener("click", addTask);

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
