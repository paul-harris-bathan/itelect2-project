import express from "express";
import router from "./routes/index.js";
import { fetchSampleUsers } from "./src/api.js";
 
const app = express();
const PORT = process.env.PORT || 3000;
 
const cachedUsers = await fetchSampleUsers();
app.locals.users = cachedUsers;
 
app.use("/api", router);
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});