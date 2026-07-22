// app.js - Main application entry point
import { formatDate, validateTask, mergeTaskUpdate, createTask } from "./utils.js";
import { fetchSampleUsers, fetchSampleUsersPromise } from "./api.js";

console.log(formatDate(new Date("2026-07-22")))
console.log(formatDate(new Date("2026-07-15")))

console.log(validateTask())
console.log(validateTask({title: "Hello,"}))
console.log(validateTask({dueDate: "2026-07-15"}))
console.log(validateTask({title: "Hello,", dueDate: "2026-07-15"}))

const currentTask1 = mergeTaskUpdate({title: "Old"}, {title: "New"});
console.log(currentTask1);

const currentTask2 = mergeTaskUpdate(currentTask1, {title: "Newer"});
console.log(currentTask2);

try {
    const users = await fetchSampleUsers();
    const userNames = users.map((user) => user.name);
    console.log("Sample users:", userNames); // to show sample lang po instead of name
 
    const task = createTask({ title: "Make Assignment" , dueDate: "12/10/2026"});
    console.log("Created task:", task);
} catch (err) {
    console.error("Error:", err.message);
}
