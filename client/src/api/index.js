import api from './axios';

// Project API calls
export const projectAPI = {
  // Get all projects
  getAll: async () => {
    const response = await api.get('/projects');
    return response.data;
  },

  // Get single project by ID
  getById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Create new project
  create: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  // Update project
  update: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  // Delete project
  delete: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};

// Task API calls
export const taskAPI = {
  // Get all tasks for a project
  getByProject: async (projectId) => {
    const response = await api.get(`/tasks/${projectId}`);
    return response.data;
  },

  // Create new task
  create: async (projectId, taskData) => {
    const response = await api.post(`/tasks/${projectId}`, taskData);
    return response.data;
  },

  // Update task
  update: async (taskId, taskData) => {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  // Delete task
  delete: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },

  // Reorder tasks (for drag and drop)
  reorder: async (tasks) => {
    const response = await api.put('/tasks/reorder', { tasks });
    return response.data;
  },
};

// AI API calls
export const aiAPI = {
  // Summarize project tasks
  summarize: async (projectId) => {
    const response = await api.post('/ai/summarize', { projectId });
    return response.data;
  },

  // Ask question about project
  ask: async (projectId, question) => {
    const response = await api.post('/ai/ask', { projectId, question });
    return response.data;
  },
};
