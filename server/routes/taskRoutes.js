import express from 'express';
import {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
  reorderTasks
} from '../controllers/taskController.js';

const router = express.Router();

// Task routes
router.get('/:projectId', getTasksByProject);
router.post('/:projectId', createTask);
router.put('/reorder', reorderTasks); // Must be before /:taskId to avoid conflict
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

export default router;
