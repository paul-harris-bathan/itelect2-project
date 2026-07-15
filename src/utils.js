export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`

export const validateTask = ( { title = "", dueDate = ""} = {}) => {
  if (title && dueDate) {
    return true;
  } else {
    return false;
  }
};

export const mergeTaskUpdate = (original, ...updates) => updates.reduce((tasks, update) => ({ ...tasks, ...update }), { ...original });
