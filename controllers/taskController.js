import db from "../models/index.cjs";

 

const { Task, User, Sequelize } = db;

const { Op } = Sequelize;

 
const TASK_FIELDS = [

  "title", "dueDate", "completed", "userId",

];


export async function listTasks(req, res) {

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

}

 

// GET /api/tasks/:id

export async function getTask(req, res) {

    const task = await Task.findByPk(req.params.id, {  include: User  });
    if (!task) {
        return res.status(404).json({ error: `Sorry po but no task found with id: ${req.params.id}` });
    }
    res.json(task);

}

// POST /api/tasks

export async function createTask(req, res) {

  const task = await Task.create(req.body, { fields: TASK_FIELDS });
  res.status(201).json(task);

}


// PUT /api/tasks/:id

export async function updateTask(req, res) {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
        return res.status(404).json({  error: "Task not found"  });
    }
    await task.update(req.body, { fields: TASK_FIELDS });
    res.json(task);

}


// DELETE /api/tasks/:id

export async function deleteTask(req, res) {

    const task = await Task.findByPk(req.params.id);
    if (!task) {
        return res.status(404).json({  error: "Task not found"  });
    }
    await task.destroy();
    res.json({ message: "Deleted", task})
}





