import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const StageTimeline = ({ timeline = [], currentStage, onStageChange }) => {
  const stages = [
    { id: 'applied', title: 'Application Received', icon: '📝' },
    { id: 'screen', title: 'Initial Screening', icon: '📞' },
    { id: 'tech', title: 'Technical Assessment', icon: '💻' },
    { id: 'offer', title: 'Offer Extended', icon: '📋' },
    { id: 'hired', title: 'Hired', icon: '🎉' },
    { id: 'rejected', title: 'Rejected', icon: '❌' }
  ];

  const getStageColor = (stage) => {
    const colors = {
      applied: 'bg-gray-500',
      screen: 'bg-blue-500',
      tech: 'bg-yellow-500',
      offer: 'bg-purple-500',
      hired: 'bg-green-500',
      rejected: 'bg-red-500'
    };
    return colors[stage] || 'bg-gray-500';
  };

  const getStageIndex = (stage) => {
    return stages.findIndex(s => s.id === stage);
  };

  const currentStageIndex = getStageIndex(currentStage);

  const nextStages = stages.filter((stage, index) => 
    index > currentStageIndex && stage.id !== 'rejected'
  );

  return (
    <div className="space-y-6">
      {/* Stage Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Stage</h3>
        <div className="flex flex-wrap gap-3">
          {nextStages.map(stage => (
            <Button
              key={stage.id}
              variant="outline"
              size="sm"
              onClick={() => onStageChange(stage.id)}
            >
              Move to {stage.title}
            </Button>
          ))}
          {currentStage !== 'rejected' && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onStageChange('rejected')}
            >
              Reject Candidate
            </Button>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Timeline</h3>
        
        <div className="space-y-6">
          {timeline.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>No timeline events yet</p>
            </div>
          ) : (
            timeline.map((event, index) => {
              const stage = stages.find(s => s.id === event.stage);
              const isLast = index === timeline.length - 1;
              
              return (
                <div key={index} className="relative flex items-start space-x-4">
                  {/* Timeline line */}
                  {!isLast && (
                    <div className="absolute left-4 top-8 w-0.5 h-6 bg-gray-300"></div>
                  )}
                  
                  {/* Stage icon */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${getStageColor(event.stage)}`}>
                    {stage?.icon || '•'}
                  </div>
                  
                  {/* Event details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        {stage?.title || event.stage}
                      </h4>
                      <Badge variant="outline" size="sm">
                        {new Date(event.timestamp).toLocaleDateString()}
                      </Badge>
                    </div>
                    
                    {event.note && (
                      <p className="mt-1 text-sm text-gray-600">{event.note}</p>
                    )}
                    
                    {event.user && (
                      <p className="mt-1 text-xs text-gray-500">
                        by {event.user}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Stage Progress */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress</h3>
        <div className="space-y-4">
          {stages.filter(s => s.id !== 'rejected').map((stage, index) => {
            const isCompleted = index <= currentStageIndex;
            const isCurrent = stage.id === currentStage;
            
            return (
              <div key={stage.id} className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  isCompleted 
                    ? isCurrent 
                      ? `${getStageColor(stage.id)} text-white` 
                      : 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {isCompleted && !isCurrent ? '✓' : index + 1}
                </div>
                
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    isCurrent ? 'text-blue-600' : 
                    isCompleted ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {stage.title}
                  </p>
                </div>
                
                {isCurrent && (
                  <Badge variant="primary" size="sm">Current</Badge>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StageTimeline;