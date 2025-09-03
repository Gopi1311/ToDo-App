const STORAGE_KEY = "tasks";
export const getTasks = () => {
  try {
    const save = localStorage.getItem(STORAGE_KEY);
    return save ? JSON.parse(save) : [];
  } catch (error) {
    console.error("Error parsing tasks from localStorage:", error);
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
};
