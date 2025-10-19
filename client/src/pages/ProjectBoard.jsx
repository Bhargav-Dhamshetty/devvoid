import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext } from '@hello-pangea/dnd';
import useStore from '../store/useStore';
import Column from '../components/Column';
import Modal from '../components/Modal';
import { ArrowLeft, Loader2, AlertCircle, Sparkles } from 'lucide-react';

const ProjectBoard = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const {
    currentProject,
    tasks,
    loading,
    error,
    selectProject,
    createTask,
    updateTask,
    deleteTask,
    reorderTasks,
    clearError,
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('To Do');
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (projectId) {
      selectProject(projectId);
    }
  }, [projectId, selectProject]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const statuses = ['To Do', 'In Progress', 'Done'];

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status).sort((a, b) => a.order - b.order);
  };

  const handleOpenModal = (status, task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData({ title: task.title, description: task.description });
      setSelectedStatus(task.status);
    } else {
      setEditingTask(null);
      setFormData({ title: '', description: '' });
      setSelectedStatus(status);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setFormData({ title: '', description: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    setSubmitting(true);
    try {
      if (editingTask) {
        await updateTask(editingTask._id, { ...formData, status: selectedStatus });
      } else {
        await createTask(projectId, { ...formData, status: selectedStatus });
      }
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save task:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // No change
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const newTasks = Array.from(tasks);
    const draggedTask = newTasks.find((t) => t._id === draggableId);

    if (!draggedTask) return;

    // Remove from source
    const sourceTasks = newTasks.filter((t) => t.status === source.droppableId);
    const destTasks = newTasks.filter((t) => t.status === destination.droppableId);

    sourceTasks.splice(source.index, 1);

    // Update status if moved to different column
    if (source.droppableId !== destination.droppableId) {
      draggedTask.status = destination.droppableId;
    }

    // Insert at destination
    destTasks.splice(destination.index, 0, draggedTask);

    // Recalculate orders and merge all tasks
    const reorderedTasks = [
      ...sourceTasks.map((t, i) => ({ ...t, order: i })),
      ...destTasks.map((t, i) => ({ ...t, order: i })),
      ...newTasks.filter(
        (t) => t.status !== source.droppableId && t.status !== destination.droppableId
      ),
    ];

    reorderTasks(reorderedTasks);
  };

  if (loading && !currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!currentProject && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card text-center py-12 px-8">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Project Not Found</h2>
          <p className="text-white/60 mb-6">The project you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-white/70 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{currentProject?.name}</h1>
              <p className="text-white/60">{currentProject?.description}</p>
            </div>
            <button
              onClick={() => navigate(`/project/${projectId}/ai`)}
              className="btn-primary flex items-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>AI Assistant</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="glass-card bg-red-500/20 border-red-500/50 mb-6 flex items-center space-x-3 animate-slide-down">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-200">{error}</span>
          </div>
        )}

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
            {statuses.map((status) => (
              <Column
                key={status}
                status={status}
                tasks={getTasksByStatus(status)}
                onAddTask={(status) => handleOpenModal(status)}
                onEditTask={(task) => handleOpenModal(task.status, task)}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Create/Edit Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Task Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input"
              placeholder="e.g., Design homepage mockup"
              required
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="textarea"
              placeholder="Describe the task in detail..."
              required
              maxLength={1000}
              rows={4}
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input"
            >
              {statuses.map((status) => (
                <option key={status} value={status} className="bg-slate-900">
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="btn-secondary flex-1"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {editingTask ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                editingTask ? 'Update Task' : 'Create Task'
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectBoard;
