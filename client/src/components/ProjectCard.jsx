import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, FolderOpen, Trash2, Edit2 } from 'lucide-react';

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/project/${project._id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(project);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project? All tasks will be deleted too.')) {
      onDelete(project._id);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="glass-card cursor-pointer group animate-fade-in"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <FolderOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-white/60">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(project.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleEdit}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            title="Edit Project"
          >
            <Edit2 className="w-4 h-4 text-blue-400" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 transition-colors"
            title="Delete Project"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>

      <p className="text-white/80 text-sm line-clamp-2 mb-4">
        {project.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-xs text-white/60">Click to open board</span>
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
          <span className="text-white text-sm">→</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
