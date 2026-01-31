import { state, timerDisplay, API_BASE } from "./global.js";

export async function loadFocusTime() {
  const res = await fetch(`${API_BASE}/focus`);
  const data = await res.json();
  state.focusSeconds = data.total_seconds;
}

export function updateTimerDisplay() {
  const t = state.totalSeconds;
  const h = String(Math.floor(t / 3600)).padStart(2, "0");
  const m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
  const s = String(t % 60).padStart(2, "0");
  timerDisplay.textContent = `${h}:${m}:${s}`;
}

export function setTimer() {
  const h = Number(prompt("Hours?"));
  const m = Number(prompt("Minutes?"));
  const s = Number(prompt("Seconds?"));
  if (isNaN(h) || isNaN(m) || isNaN(s)) return;

  state.totalSeconds = h * 3600 + m * 60 + s;
  state.initialSeconds = state.totalSeconds;
  updateTimerDisplay();
}

export function startClock(updateDashboard) {
  if (state.clockInterval) return;

  state.clockInterval = setInterval(async () => {
    if (state.totalSeconds <= 0) {
      clearInterval(state.clockInterval);
      state.clockInterval = null;
      return;
    }

    state.totalSeconds--;
    state.focusSeconds++;

    await fetch(`${API_BASE}/focus`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total_seconds: state.focusSeconds })
    });

    updateTimerDisplay();
    updateDashboard();
  }, 1000);
}

export function stopClock() {
  clearInterval(state.clockInterval);
  state.clockInterval = null;
}

export function resetClock() {
  stopClock();
  state.totalSeconds = state.initialSeconds;
  updateTimerDisplay();
}
