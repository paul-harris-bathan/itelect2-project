
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import db from "../models/index.cjs";

 

const { Account } = db;

 
const SALT_ROUNDS = 10;

 
// POST /api/auth/register

export async function register(req, res) {

  const { email, password } = req.body;

 

  if (!password || password.length < 8) {

    return res.status(400).json({ error: "password must be at least 8 characters" });

  }

  const taken = await Account.findOne({ where: { email } });

  if (taken) {

    return res.status(409).json({ error: "That email is already registered" });

  }


  const hash = await bcrypt.hash(password, SALT_ROUNDS);

 
  const account = await Account.create({ email, password: hash });


  res.status(201).json(account);

}


export async function login(req, res) {

  const { email, password } = req.body;


  const account = await Account.findOne({ where: { email } });

  if (!account) {

    return res.status(401).json({ error: "Invalid email or password" });

  }

 

  const match = await bcrypt.compare(password, account.password);

  if (!match) {

    return res.status(401).json({ error: "Invalid email or password" });

  }

 

  const token = jwt.sign(

    { id: account.id, email: account.email, role: account.role },

    process.env.JWT_SECRET,

    { expiresIn: "1h" }

  );

 

  res.json({ token });

}

 
export function me(req, res) {

  res.json({ account: req.account });

}