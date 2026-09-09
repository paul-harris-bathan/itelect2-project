import express from "express";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import db from "../models/index.cjs";

const { Account } = db;

const router = express.Router();

const SALT_ROUNDS = 10;

router.post("/register", async (req, res) => {

  const { email, password } = req.body;

  if (!password || password.length < 8) {

    return res.status(400).json({ error: "password must be at least 8 characters" });

  }

  const taken = await Account.findOne({ where: { email } });

  if (taken) {

    return res.status(409).json({ error: "That email is already registered" });

  }
 

  const hash = await bcrypt.hash(password, SALT_ROUNDS);

  // role is NOT read from req.body. If it were, anyone could register as admin.

  const account = await Account.create({ email, password: hash });
 
  res.status(201).json(account);

});

router.post("/login", async (req, res) => {

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

});


export default router;