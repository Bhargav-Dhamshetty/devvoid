import Task from '../models/Task.js';
import Project from '../models/Project.js';

// @desc    Get all tasks for a project
// @route   GET /api/tasks/:projectId
// @access  Public
export const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Verify project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const tasks = await Task.find({ projectId }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: error.message
    });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks/:projectId
// @access  Public
export const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, status } = req.body;

    // Verify project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both title and description'
      });
    }

    // Get the count of existing tasks to set order
    const taskCount = await Task.countDocuments({ projectId });

    const task = await Task.create({
      title,
      description,
      status: status || 'To Do',
      projectId,
      order: taskCount
    });

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: error.message
    });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:taskId
// @access  Public
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, order } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (order !== undefined) task.order = order;

    await task.save();

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: error.message
    });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:taskId
// @access  Public
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting task',
      error: error.message
    });
  }
};

// @desc    Update task order (for drag and drop)
// @route   PUT /api/tasks/reorder
// @access  Public
export const reorderTasks = async (req, res) => {
  try {
    const { tasks } = req.body; // Array of { id, order, status }

    if (!tasks || !Array.isArray(tasks)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of tasks'
      });
    }

    // Update all tasks in parallel
    const updatePromises = tasks.map(({ id, order, status }) =>
      Task.findByIdAndUpdate(
        id,
        { order, status },
        { new: true, runValidators: true }
      )
    );

    await Promise.all(updatePromises);

    res.status(200).json({
      success: true,
      message: 'Tasks reordered successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reordering tasks',
      error: error.message
    });
  }
};
