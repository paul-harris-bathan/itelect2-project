import express from "express";
import { mockTasks } from "../src/utils.js";
const router = express.Router();
router.get("/", (req, res) => {
res.json({ message: "Hello from the router!" });
});

router.get("/tasks", (req, res) => {
  res.json(mockTasks);
});
 
router.get("/tasks/:id", (req, res) => {
  const task = mockTasks.find((t) => t.id === Number(req.params.id));
 
  if (!task) {
    return res.status(404).json({ error: `No task found with id ${req.params.id}` });
  }
 
  res.json(task);
});
 
router.get("/users", (req, res) => {
  res.json(req.app.locals.users);
});

export default router;