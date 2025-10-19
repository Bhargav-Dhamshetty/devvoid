import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Edit2, Trash2, GripVertical } from 'lucide-react';

const TaskCard = ({ task, index, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do':
        return 'from-gray-500 to-gray-600';
      case 'In Progress':
        return 'from-yellow-500 to-orange-600';
      case 'Done':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(task);
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`task-card mb-3 ${
            snapshot.isDragging ? 'ring-2 ring-blue-500 shadow-2xl scale-105' : ''
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-2 flex-1">
              <div
                {...provided.dragHandleProps}
                className="mt-1 cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="w-5 h-5 text-white/40" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-2 line-clamp-2">
                  {task.title}
                </h4>
                <p className="text-white/70 text-sm line-clamp-3">
                  {task.description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-1 ml-2">
              <button
                onClick={handleEdit}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Edit Task"
              >
                <Edit2 className="w-3.5 h-3.5 text-blue-400" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 transition-colors"
                title="Delete Task"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
              </button>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getStatusColor(
                task.status
              )}`}
            >
              {task.status}
            </span>
            <span className="text-xs text-white/40">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
