import express from "express";

// import router from "./routes/index.js";

import cors from "cors";

import morgan from "morgan"

import db from "./models/index.cjs";

import authRoutes from "./routes/auth.js"; 

import taskRoutes from "./routes/tasks.js";

import userRoutes from "./routes/users.js";

import errorHandler from "./middleware/errorHandler.js";



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


try {

  await db.sequelize.authenticate();

} catch (err) {

  console.error("Cannot reach the database:", err.message);

  process.exit(1);

}



const allowedOrigins = (process.env.CORS_ORIGIN || "")

  .split(",")

  .filter(Boolean);

 

app.use(cors({ origin: allowedOrigins }));

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/users", userRoutes);

app.use(errorHandler);
 
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
