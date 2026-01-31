import { state, taskList } from "./global.js";
import * as taskFn from "./task.js";

let draggedIndex = null;

export function handleDragStart(e, index) {
  draggedIndex = index;
  e.currentTarget.classList.add("dragging");
}

export function handleDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add("drag-over");
}

export function handleDrop(e, dropIndex) {
  e.preventDefault();
  if (draggedIndex === null || draggedIndex === dropIndex) return;

  const movedTask = state.tasks.splice(draggedIndex, 1)[0];
  state.tasks.splice(dropIndex, 0, movedTask);

  draggedIndex = null;
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
  taskFn.renderTasks(() => {});
}

export function handleDragEnd(e) {
  e.currentTarget.classList.remove("dragging");
  Array.from(taskList.children).forEach(li => li.classList.remove("drag-over"));
}

