import express from "express";

// import router from "./routes/index.js";

import cors from "cors";

import morgan from "morgan"

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

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/books", taskRoutes);

app.use("/api/authors", userRoutes);

app.use(errorHandler);
 
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
