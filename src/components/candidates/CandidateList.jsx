import React, { useState, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import CandidateCard from './CandidateCard';
import Input from '../ui/Input';
import Select from '../ui/Select';

const CandidateList = ({ 
  candidates = [], 
  onStageChange, 
  loading = false,
  searchTerm = '',
  onSearchChange,
  selectedStage = '',
  onStageFilter
}) => {
  const [itemHeight] = useState(200);

  const stageOptions = [
    { value: '', label: 'All Stages' },
    { value: 'applied', label: 'Applied' },
    { value: 'screen', label: 'Screening' },
    { value: 'tech', label: 'Technical' },
    { value: 'offer', label: 'Offer' },
    { value: 'hired', label: 'Hired' },
    { value: 'rejected', label: 'Rejected' }
  ];

  // Filter candidates based on search and stage
  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate => {
      const matchesSearch = !searchTerm || 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStage = !selectedStage || candidate.stage === selectedStage;
      
      return matchesSearch && matchesStage;
    });
  }, [candidates, searchTerm, selectedStage]);

  // Row renderer for virtualized list
  const Row = ({ index, style }) => {
    const candidate = filteredCandidates[index];
    return (
      <div style={style} className="px-4 pb-4">
        <CandidateCard
          candidate={candidate}
          onStageChange={onStageChange}
          showJobTitle={true}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Filters */}
      <div className="bg-white p-4 border-b border-gray-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
          <Select
            options={stageOptions}
            value={selectedStage}
            onChange={(e) => onStageFilter(e.target.value)}
            placeholder="Filter by stage"
          />
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Showing {filteredCandidates.length} of {candidates.length} candidates</span>
          <span>{candidates.filter(c => c.stage !== 'rejected').length} active candidates</span>
        </div>
      </div>

      {/* Virtualized List */}
      <div className="flex-1">
        {filteredCandidates.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <svg className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <p className="text-lg font-medium">No candidates found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <List
            height={600}
            itemCount={filteredCandidates.length}
            itemSize={itemHeight}
            className="bg-gray-50"
          >
            {Row}
          </List>
        )}
      </div>
    </div>
  );
};

export default CandidateList;