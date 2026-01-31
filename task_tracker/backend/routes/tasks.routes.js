// backend/routes/tasks.routes.js
import express from "express";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleDone
} from "../controllers/tasks.controller.js";

const router = express.Router();

// Get all tasks
router.get("/", getTasks);

// Add a new task
router.post("/", addTask);

// Update task text/date/time
router.put("/:id", updateTask);

// Toggle done status
router.put("/:id/done", toggleDone);

// Delete task
router.delete("/:id", deleteTask);

export default router;
