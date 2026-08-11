import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import morgan from "morgan"
import { fetchSampleUsers } from "./src/api.js";
 
const app = express();
const PORT = process.env.PORT || 3000;
 
const cachedUsers = await fetchSampleUsers();
app.locals.users = cachedUsers;
 

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", router);

app.use((err, req, res, next) => {
console.error(err.message);
const status = err.status || 500;
res.status(status).json({ error: err.message });
});


 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
