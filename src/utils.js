export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`

export const validateTask = ( { title = "", dueDate = ""} = {}) => {
  if (title && dueDate) {
    return true;
  } else {
    return false;
  }
};

export const mergeTaskUpdate = (original, ...updates) => updates.reduce((tasks, update) => ({ ...tasks, ...update }), { ...original });

class TaskValidationError extends Error {
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