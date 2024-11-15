import express from "express";
import { getTasks, addTask, deleteTask, updateTask } from "./controllers.js";

const router = express.Router();

router.get("/get", getTasks);
router.post("/add", addTask);
router.delete("/delete", deleteTask);
router.put("/update", updateTask);

export default router;