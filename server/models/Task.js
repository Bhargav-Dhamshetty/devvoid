import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [200, 'Task title cannot exceed 200 characters']
    },
    description: {
      type: String,
      required: [true, 'Task description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Done'],
      default: 'To Do',
      required: true
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project ID is required'],
      index: true // Index for faster queries by project
    },
    order: {
      type: Number,
      default: 0 // Used for maintaining task order within columns
    }
  },
  {
    timestamps: true
  }
);

// Compound index for efficient queries
taskSchema.index({ projectId: 1, status: 1, order: 1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;
