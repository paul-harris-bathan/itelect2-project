import express from "express";
import { mergeTaskUpdate, mockTasks, validateTask } from "../src/utils.js";
const router = express.Router();

//GET returns a default message without anything following the /
router.get("/", (req, res) => {
res.json({ message: "Hello from the router!" });
});

//GET returns the list of /tasks 
router.get("/tasks", (req, res) => {
  res.json(mockTasks);
});

//GET returns a /tasks with an a specific id
router.get("/tasks/:id", (req, res) => {
  const task = mockTasks.find((t) => t.id === Number(req.params.id)); //Number parses the the req.params.id into a number
  if (!task) {
    return res.status(404).json({ error: `Sorry po but no task found with id: ${req.params.id}` });
  }
  res.json(task);
});

 //GET returns users which has id, name, and email
router.get("/users", (req, res) => {
  res.json(req.app.locals.users);
});

//POST create a new task
router.post("/tasks", (req, res, next) => {
  if (!validateTask(req.body)) {
    const err = new Error("title and duedate required");
    err.status = 400;
    return next(err); // the error middleware answers
  }

  const task = {id: mockTasks.length ? Math.max(...mockTasks.map((t) => t.id)) + 1 : 1, ...req.body, completed: false};
  mockTasks.push(task);
  res.status(201).json(task);
});

//PUT adds to the existing body
router.put("/tasks/:id", (req, res, next) => {
  const task = mockTasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err); // the error middleware answers
  }

  mockTasks[task.id - 1] = mergeTaskUpdate(mockTasks[task.id - 1], req.body);
  res.status(200).json(mockTasks[task.id - 1]);
});

//DELETE deletes an existing task
router.delete("/tasks/:id", (req, res, next) => {
  const task = mockTasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err); // the error middleware answers
  }
  const [removed] = mockTasks.splice(task.id - 1, 1);
  res.status(200).json({ message: "Deleted", task: removed });
});



export default router;

