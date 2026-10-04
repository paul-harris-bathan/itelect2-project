import db from "../models/index.cjs";

 

const { Author, Task } = db;

 

// GET /api/users

export async function listUsers(req, res) {

  const users = await Author.findAll({

    include: Task,

    order: [["id", "ASC"]],

  });

  res.json(users);

}