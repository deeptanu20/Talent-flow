import React, { useState } from 'react';
import KanbanColumn from './KanbanColumn';
import { DragDropContext } from '@hello-pangea/dnd';

const KanbanBoard = ({ 
  candidates = [], 
  onStageChange, 
  loading = false 
}) => {
  const [draggedCandidate, setDraggedCandidate] = useState(null);

  const stages = [
    { id: 'applied', title: 'Applied', color: 'bg-gray-100 border-gray-300' },
    { id: 'screen', title: 'Screening', color: 'bg-blue-100 border-blue-300' },
    { id: 'tech', title: 'Technical', color: 'bg-yellow-100 border-yellow-300' },
    { id: 'offer', title: 'Offer', color: 'bg-purple-100 border-purple-300' },
    { id: 'hired', title: 'Hired', color: 'bg-green-100 border-green-300' },
    { id: 'rejected', title: 'Rejected', color: 'bg-red-100 border-red-300' }
  ];

  // Group candidates by stage
  const groupedCandidates = stages.reduce((acc, stage) => {
    acc[stage.id] = candidates.filter(candidate => candidate.stage === stage.id);
    return acc;
  }, {});

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    
    if (!destination || destination.droppableId === source.droppableId) {
      return;
    }

    const candidateId = parseInt(draggableId);
    const newStage = destination.droppableId;
    
    onStageChange(candidateId, newStage);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Candidate Pipeline</h2>
          <div className="text-sm text-gray-500">
            Total: {candidates.length} candidates
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex overflow-x-auto h-full p-4 space-x-4">
          {stages.map(stage => (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              candidates={groupedCandidates[stage.id] || []}
              onStageChange={onStageChange}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;