import express from "express";
import { getFocus, updateFocus } from "../controllers/focus.controller.js";

const router = express.Router();

router.get("/", getFocus);
router.put("/", updateFocus);

export default router;
