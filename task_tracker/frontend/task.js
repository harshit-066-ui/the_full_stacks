import { state, taskList, API_BASE } from "./global.js";
import * as interact from "./interact.js";


export async function renderTasks(updateDashboard) {
  try {
    const res = await fetch(`${API_BASE}/tasks`);
    state.tasks = await res.json();
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
    taskList.innerHTML = "<li>Error loading tasks</li>";
    return;
  }

  taskList.innerHTML = "";

  state.tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";
    li.draggable = true;

    li.innerHTML = `
      <strong>${task.text}</strong><br>
      📅 ${formatDate(task.task_date)} ⏰ ${formatTime(task.task_time)}<br>
      <button class="done-btn">${task.done ? "Undo" : "Done"}</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    
    li.querySelector(".done-btn").onclick = e => {
      e.stopPropagation();
      fetch(`${API_BASE}/tasks/${task.id}/done`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !task.done })
      })
      .then(() => renderTasks(updateDashboard))
      .catch(err => console.error("Error toggling done:", err));
    };

    
    li.querySelector(".edit-btn").onclick = e => {
      e.stopPropagation();
      editTask(task, updateDashboard);
    };

    
    li.querySelector(".delete-btn").onclick = e => {
      e.stopPropagation();
      removeTask(task.id, updateDashboard);
    };

    
    li.addEventListener("dragstart", e => interact.handleDragStart(e, i));
    li.addEventListener("dragover", interact.handleDragOver);
    li.addEventListener("drop", e => interact.handleDrop(e, i));
    li.addEventListener("dragend", interact.handleDragEnd);

    taskList.appendChild(li);
  });

  updateDashboard();
}


export async function addTask(task, updateDashboard) {
  try {
    await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    });
    renderTasks(updateDashboard);
  } catch (err) {
    console.error("Failed to add task:", err);
  }
}


export async function removeTask(id, updateDashboard) {
  try {
    await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
    renderTasks(updateDashboard);
  } catch (err) {
    console.error("Failed to delete task:", err);
  }
}


export async function editTask(task, updateDashboard) {
  const text = prompt("Task?", task.text);
  const date = prompt("Date?", task.task_date);
  const time = prompt("Time?", task.task_time);

  if (!text || !date || !time) return;

  try {
    await fetch(`${API_BASE}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        task_date: date,
        task_time: time
      })
    });

    renderTasks(updateDashboard);
  } catch (err) {
    console.error("Failed to update task:", err);
  }
}
function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr; 

  
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }); 
 
}

function formatTime(timeStr) {
  if (!timeStr) return "";
 
  const [hour, minute] = timeStr.split(":");
  if (hour === undefined || minute === undefined) return timeStr;

  const date = new Date();
  date.setHours(parseInt(hour, 10), parseInt(minute, 10));

  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true 
  });
  
}
