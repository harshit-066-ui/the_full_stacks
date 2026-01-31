import { state } from "./global.js";

export function updateDashboard() {
  document.getElementById("total-tasks").textContent = state.tasks.length;
  document.getElementById("completed-tasks").textContent = state.tasks.filter(t => t.done).length;

  let seconds = state.focusSeconds;
  let display = "";

  if (seconds >= 3600) {
    const h = Math.floor(seconds / 3600);
    seconds %= 3600;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    display = `${h}h ${m}m ${s}s`;
  } else if (seconds >= 60) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    display = `${m}m ${s}s`;
  } else {
    display = `${seconds}s`;
  }

  document.getElementById("focus-stats").textContent = display;
}
