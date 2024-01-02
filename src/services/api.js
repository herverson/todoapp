import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const addTask = async (taskData) => {
  try {
    await api.post('/tasks', taskData);
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await api.delete(`/tasks/${taskId}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const editTask = async (taskId, taskData) => {
  try {
    await api.put(`/tasks/${taskId}`, taskData);
  } catch (error) {
    console.error('Error editing task:', error);
    throw error;
  }
};

export const completeTask = async (taskId) => {
  try {
    await axios.put(`/tasks/${taskId}/complete`);
    fetchTasks();
  } catch (error) {
    console.error('Error completing task:', error);
  }
};
