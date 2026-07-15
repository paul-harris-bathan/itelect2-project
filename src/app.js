// app.js - Main application entry point
import { formatDate, validateTask, mergeTaskUpdate } from "./utils.js";

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
