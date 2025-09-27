import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';

const CandidateCard = ({ 
  candidate, 
  onStageChange, 
  draggable = false,
  onDragStart,
  onDragEnd,
  isDragging = false,
  showJobTitle = true 
}) => {
  const getStageColor = (stage) => {
    const colors = {
      applied: 'default',
      screen: 'primary',
      tech: 'warning',
      offer: 'info',
      hired: 'success',
      rejected: 'danger'
    };
    return colors[stage] || 'default';
  };

  const getExperienceColor = (experience) => {
    const exp = parseInt(experience);
    if (exp < 2) return 'bg-green-100 text-green-800';
    if (exp < 5) return 'bg-blue-100 text-blue-800';
    return 'bg-purple-100 text-purple-800';
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 ${
        isDragging ? 'opacity-50 rotate-3 shadow-lg' : ''
      } ${draggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <Link 
              to={`/candidates/${candidate.id}`}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {candidate.name}
            </Link>
            <p className="text-sm text-gray-500">{candidate.email}</p>
          </div>
        </div>
        <Badge variant={getStageColor(candidate.stage)} size="sm">
          {candidate.stage}
        </Badge>
      </div>

      {/* Job Title */}
      {showJobTitle && candidate.jobTitle && (
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700">Applied for:</p>
          <p className="text-sm text-blue-600">{candidate.jobTitle}</p>
        </div>
      )}

      {/* Details */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Experience:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(candidate.experience)}`}>
            {candidate.experience} years
          </span>
        </div>
        
        {candidate.location && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Location:</span>
            <span className="text-gray-700">{candidate.location}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Applied:</span>
          <span className="text-gray-700">{new Date(candidate.appliedAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Skills */}
      {candidate.skills && candidate.skills.length > 0 && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                {skill}
              </span>
            ))}
            {candidate.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{candidate.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      {onStageChange && (
        <div className="mt-4 pt-3 border-t border-gray-100 flex space-x-2">
          <button
            onClick={() => onStageChange(candidate.id, 'screen')}
            disabled={candidate.stage !== 'applied'}
            className="flex-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Screen
          </button>
          <button
            onClick={() => onStageChange(candidate.id, 'rejected')}
            disabled={candidate.stage === 'rejected' || candidate.stage === 'hired'}
            className="flex-1 px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidateCard;
