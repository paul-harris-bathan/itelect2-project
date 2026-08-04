export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`

export const validateTask = ( { title = "", dueDate = ""} = {}) => {
  if (title && dueDate) {
    return true;
  } else {
    return false;
  }
};

export const mergeTaskUpdate = (original, ...updates) => updates.reduce((tasks, update) => ({ ...tasks, ...update }), { ...original });

export class TaskValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "TaskValidationError";
  }
}

export function createTask(task) {
  if (!validateTask(task)) {
    throw new TaskValidationError("Invalid task data");
  }
  return {
    id: Date.now(),
    completed: false,
    ...task,
  };
}

export const mockTasks = [
  { id: 1, title: "Finished ITELECT2", completed: true, dueDate: "2026-08-04" },
  { id: 2, title: "Find RRLS na mahirap hirap gawin", completed: false, dueDate: "2026-08-05" },
];