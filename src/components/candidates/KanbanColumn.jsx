import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import CandidateCard from './CandidateCard';

const KanbanColumn = ({ stage, candidates = [], onStageChange }) => {
  const getStageStats = () => {
    return {
      total: candidates.length,
      percentage: candidates.length > 0 ? Math.round((candidates.length / 100) * 100) : 0
    };
  };

  const stats = getStageStats();

  return (
    <div className="flex-shrink-0 w-80">
      {/* Column Header */}
      <div className={`rounded-t-lg border-2 ${stage.color} p-4`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{stage.title}</h3>
          <div className="flex items-center space-x-2">
            <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
              {stats.total}
            </span>
          </div>
        </div>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={stage.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-96 bg-white border-l-2 border-r-2 border-b-2 rounded-b-lg p-2 space-y-3 ${
              stage.color.replace('bg-', 'border-')
            } ${
              snapshot.isDraggingOver ? 'bg-blue-50' : ''
            }`}
          >
            {candidates.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <p className="text-sm">No candidates</p>
              </div>
            ) : (
              candidates.map((candidate, index) => (
                <Draggable
                  key={candidate.id}
                  draggableId={candidate.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={snapshot.isDragging ? 'rotate-3 shadow-lg' : ''}
                    >
                      <CandidateCard
                        candidate={candidate}
                        onStageChange={onStageChange}
                        draggable={true}
                        isDragging={snapshot.isDragging}
                        showJobTitle={false}
                      />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;