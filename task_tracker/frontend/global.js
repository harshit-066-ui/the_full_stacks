export const state = {
  tasks: [],
  focusSeconds: 0,
  totalSeconds: 0,
  initialSeconds: 0,
  selectedTask: null,
  clockInterval: null
};

export const taskInput = document.getElementById("task-input");
export const dateInput = document.getElementById("task-date");
export const timeInput = document.getElementById("task-time");
export const addButton = document.getElementById("add-task");
export const taskList = document.getElementById("task-list");

export const timerDisplay = document.getElementById("timer-display");
export const startButton = document.getElementById("start-timer");
export const stopButton = document.getElementById("stop-timer");
export const resetButton = document.getElementById("reset-timer");
export const updateButton = document.getElementById("update-timer");
export const darkButton = document.getElementById("mode-toggle");

export const API_BASE = "http://localhost:5000/api";
