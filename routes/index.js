import express from "express";

import db from "../models/index.cjs";

import verifyToken from "../middleware/verifyToken.js";

import requireRole from "../middleware/requireRole.js";

const { Task, User, Sequelize } = db;
const { Op } = Sequelize;


const router = express.Router();

const TASK_FIELDS = [

  "title", "dueDate", "completed", "userId",

];


//GET returns a default message without anything following the /
router.get("/", (req, res) => {
res.json({ message: "Hello from the router!" });
});

//GET returns the list of /tasks 
router.get("/tasks", async (req, res) => {
  const { search } = req.query;

  const where = {};

  if (search) {

    where.title = { [Op.iLike]: `%${search}%` };

  }

  const tasks = await Task.findAll({  

    where,
    
    include: User,

    order: [["id", "ASC"]]  
  
  });

  res.json(tasks);

});
 
//GET returns a /tasks with an a specific id
router.get("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id, {  include: User  });
  if (!task) {
    return res.status(404).json({ error: `Sorry po but no task found with id: ${req.params.id}` });
  }
  res.json(task);
});

 //GET returns users which has id, name, and email
router.get("/users", async (req, res) => {
  const users = await User.findAll({  include: Task, order: [["id", "ASC"]]  });
  res.json(users);
});

//POST create a new task
router.post("/tasks", verifyToken, async (req, res) => {
  const task = await Task.create(req.body, { fields: TASK_FIELDS });
  res.status(201).json(task);
});

//PUT adds to the existing body
router.put("/tasks/:id", verifyToken, async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({  error: "Task not found"  });
  }
  await task.update(req.body, { fields: TASK_FIELDS });
  res.json(task);
});

//DELETE deletes an existing task
router.delete("/tasks/:id", verifyToken, requireRole("admin"), async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({  error: "Task not found"  });
  }
  await task.destroy();
  res.json({ message: "Deleted", task})
});

export default router;


//sample comment for midterms demo