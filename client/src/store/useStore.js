import { create } from 'zustand';
import { projectAPI, taskAPI, aiAPI } from '../api';

const useStore = create((set, get) => ({
  // State
  projects: [],
  currentProject: null,
  tasks: [],
  loading: false,
  error: null,
  aiResponse: null,
  aiLoading: false,

  // Project Actions
  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await projectAPI.getAll();
      set({ projects: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch projects', 
        loading: false 
      });
    }
  },

  selectProject: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const projectResponse = await projectAPI.getById(projectId);
      const tasksResponse = await taskAPI.getByProject(projectId);
      set({ 
        currentProject: projectResponse.data, 
        tasks: tasksResponse.data,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to load project', 
        loading: false 
      });
    }
  },

  createProject: async (projectData) => {
    set({ loading: true, error: null });
    try {
      const response = await projectAPI.create(projectData);
      set((state) => ({ 
        projects: [response.data, ...state.projects], 
        loading: false 
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to create project', 
        loading: false 
      });
      throw error;
    }
  },

  updateProject: async (projectId, projectData) => {
    set({ loading: true, error: null });
    try {
      const response = await projectAPI.update(projectId, projectData);
      set((state) => ({
        projects: state.projects.map(p => 
          p._id === projectId ? response.data : p
        ),
        currentProject: state.currentProject?._id === projectId 
          ? response.data 
          : state.currentProject,
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to update project', 
        loading: false 
      });
      throw error;
    }
  },

  deleteProject: async (projectId) => {
    set({ loading: true, error: null });
    try {
      await projectAPI.delete(projectId);
      set((state) => ({
        projects: state.projects.filter(p => p._id !== projectId),
        currentProject: state.currentProject?._id === projectId 
          ? null 
          : state.currentProject,
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to delete project', 
        loading: false 
      });
      throw error;
    }
  },

  // Task Actions
  fetchTasks: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const response = await taskAPI.getByProject(projectId);
      set({ tasks: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch tasks', 
        loading: false 
      });
    }
  },

  createTask: async (projectId, taskData) => {
    try {
      const response = await taskAPI.create(projectId, taskData);
      set((state) => ({ 
        tasks: [...state.tasks, response.data] 
      }));
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to create task' });
      throw error;
    }
  },

  updateTask: async (taskId, taskData) => {
    try {
      const response = await taskAPI.update(taskId, taskData);
      set((state) => ({
        tasks: state.tasks.map(t => 
          t._id === taskId ? response.data : t
        )
      }));
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update task' });
      throw error;
    }
  },

  deleteTask: async (taskId) => {
    try {
      await taskAPI.delete(taskId);
      set((state) => ({
        tasks: state.tasks.filter(t => t._id !== taskId)
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete task' });
      throw error;
    }
  },

  reorderTasks: async (reorderedTasks) => {
    // Optimistic update
    set({ tasks: reorderedTasks });
    
    try {
      const tasksToUpdate = reorderedTasks.map((task, index) => ({
        id: task._id,
        order: index,
        status: task.status
      }));
      await taskAPI.reorder(tasksToUpdate);
    } catch (error) {
      // Revert on error - fetch fresh data
      const currentProjectId = get().currentProject?._id;
      if (currentProjectId) {
        get().fetchTasks(currentProjectId);
      }
      set({ error: error.response?.data?.message || 'Failed to reorder tasks' });
    }
  },

  // AI Actions
  summarizeProject: async (projectId) => {
    set({ aiLoading: true, error: null, aiResponse: null });
    try {
      const response = await aiAPI.summarize(projectId);
      set({ aiResponse: response, aiLoading: false });
      return response;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to generate summary', 
        aiLoading: false 
      });
      throw error;
    }
  },

  askQuestion: async (projectId, question) => {
    set({ aiLoading: true, error: null });
    try {
      const response = await aiAPI.ask(projectId, question);
      set({ aiResponse: response, aiLoading: false });
      return response;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to get answer', 
        aiLoading: false 
      });
      throw error;
    }
  },

  // Utility Actions
  clearError: () => set({ error: null }),
  clearAIResponse: () => set({ aiResponse: null }),
}));

export default useStore;
