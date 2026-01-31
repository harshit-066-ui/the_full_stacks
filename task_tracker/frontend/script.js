import * as taskFn from "./task.js";
import * as timeFn from "./time.js";
import * as util from "../util.js";
import {
  state,
  taskInput,
  dateInput,
  timeInput,
  addButton,
  startButton,
  stopButton,
  resetButton,
  updateButton,
  darkButton
} from "./global.js";
import { updateDashboard } from "./dashboard.js";

await taskFn.renderTasks(updateDashboard);
await timeFn.loadFocusTime();
timeFn.updateTimerDisplay();
updateDashboard();

addButton.onclick = util.debounce(() => {
  if (!taskInput.value || !dateInput.value || !timeInput.value) return;

  taskFn.addTask(
    {
      text: taskInput.value.trim(),
      task_date: dateInput.value,
      task_time: timeInput.value,
      done: false
    },
    updateDashboard
  );

  taskInput.value = dateInput.value = timeInput.value = "";
}, 300);

startButton.onclick = () => timeFn.startClock(updateDashboard);
stopButton.onclick = () => timeFn.stopClock();
resetButton.onclick = () => timeFn.resetClock();
updateButton.onclick = () => timeFn.setTimer();

darkButton.onclick = () => {
  document.body.classList.toggle("dark");
  darkButton.textContent =
    document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
};
