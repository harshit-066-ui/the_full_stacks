// backend/controllers/tasks.controller.js
import { db } from "../db.js";

/* GET ALL TASKS */
export const getTasks = (req, res) => {
  db.query("SELECT * FROM tasks", (err, data) => {
    if (err) {
      console.error("DB ERROR (getTasks):", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(data);
  });
};

/* ADD TASK - done defaults to 0 */
export const addTask = (req, res) => {
  const { text, task_date, task_time } = req.body;

  if (!text || !task_date || !task_time) {
    return res.status(400).json({ error: "Text, date, and time are required." });
  }

  const q = `
    INSERT INTO tasks (text, task_date, task_time, done)
    VALUES (?, ?, ?, 0)
  `;

  db.query(q, [text, task_date, task_time], err => {
    if (err) {
      console.error("DB ERROR (addTask):", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Task added" });
  });
};

/* UPDATE TASK - user can edit text/date/time */
export const updateTask = (req, res) => {
  const { text, task_date, task_time } = req.body;

  if (!text || !task_date || !task_time) {
    return res.status(400).json({ error: "Text, date, and time are required." });
  }

  const q = `
    UPDATE tasks
    SET text=?, task_date=?, task_time=?
    WHERE id=?
  `;

  db.query(q, [text, task_date, task_time, req.params.id], err => {
    if (err) {
      console.error("DB ERROR (updateTask):", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Task updated" });
  });
};

/* TOGGLE DONE - only updates the done column */
export const toggleDone = (req, res) => {
  const { done } = req.body;

  if (done === undefined) {
    return res.status(400).json({ error: "Done value is required." });
  }

  const q = `
    UPDATE tasks
    SET done = ?
    WHERE id = ?
  `;

  db.query(q, [done ? 1 : 0, req.params.id], err => {
    if (err) {
      console.error("DB ERROR (toggleDone):", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Task done status updated" });
  });
};

/* DELETE TASK */
export const deleteTask = (req, res) => {
  db.query("DELETE FROM tasks WHERE id=?", [req.params.id], err => {
    if (err) {
      console.error("DB ERROR (deleteTask):", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Task deleted" });
  });
};
