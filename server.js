import express from "express";

import router from "./routes/index.js";

import authRouter from "./routes/auth.js"; 

import cors from "cors";

import morgan from "morgan"

import { fetchSampleUsers } from "./src/api.js";
 
const app = express();
const PORT = process.env.PORT || 3000;
 
const cachedUsers = await fetchSampleUsers();
app.locals.users = cachedUsers;

if (!process.env.JWT_SECRET) {

  console.error("JWT_SECRET is missing from .env -- the API cannot sign tokens.");

  process.exit(1);

}

const secret = process.env.JWT_SECRET;

if (!secret || secret.length < 32) {

  console.error("JWT_SECRET in .env must be at least 32 characters.");

  process.exit(1);

}

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", router);
app.use("/api/auth", authRouter);    

app.use((err, req, res, next) => {
  if (err.name === "SequelizeValidationError") {

    return res.status(400).json({ error: err.errors.map((e) => e.message) });
    
  }
  if (err.name === "SequelizeUniqueConstraintError") {

    return res.status(409).json({ error: "That email is already registered" });

  }

  if (err.status && err.status < 500) {

    return res.status(err.status).json({ error: err.message });

  }

  console.error(err.message);
  res.status(500).json({ error: "Something went wrong on the server" });

});
 
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
