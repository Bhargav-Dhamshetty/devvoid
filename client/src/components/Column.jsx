import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

const Column = ({ status, tasks, onAddTask, onEditTask, onDeleteTask }) => {
  const getColumnColor = (status) => {
    switch (status) {
      case 'To Do':
        return 'from-gray-500/20 to-gray-600/20';
      case 'In Progress':
        return 'from-yellow-500/20 to-orange-600/20';
      case 'Done':
        return 'from-green-500/20 to-emerald-600/20';
      default:
        return 'from-gray-500/20 to-gray-600/20';
    }
  };

  const getHeaderIcon = (status) => {
    switch (status) {
      case 'To Do':
        return '📋';
      case 'In Progress':
        return '⚡';
      case 'Done':
        return '✅';
      default:
        return '📌';
    }
  };

  return (
    <div className="kanban-column flex-1 min-w-[320px]">
      {/* Column Header */}
      <div className={`bg-gradient-to-r ${getColumnColor(status)} rounded-xl p-4 mb-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getHeaderIcon(status)}</span>
            <h3 className="text-lg font-bold text-white">{status}</h3>
            <span className="px-2 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
              {tasks.length}
            </span>
          </div>
          <button
            onClick={() => onAddTask(status)}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors group"
            title="Add Task"
          >
            <Plus className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 min-h-[400px] p-2 rounded-xl transition-colors ${
              snapshot.isDraggingOver ? 'bg-white/5' : ''
            }`}
          >
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="text-center py-12 text-white/40">
                <p className="text-sm">No tasks yet</p>
                <p className="text-xs mt-1">Drag a task here or add a new one</p>
              </div>
            )}
            
            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
