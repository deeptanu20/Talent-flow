import React, { createContext, useContext, useState } from 'react';

const CandidatesContext = createContext();

export const CandidatesProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample candidates data
  const sampleCandidates = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 555-0123',
      experience: '3 years',
      skills: ['React', 'JavaScript', 'Node.js'],
      status: 'active',
      appliedJobs: [1, 2],
      resume: null,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 555-0124',
      experience: '5 years',
      skills: ['Python', 'Django', 'PostgreSQL'],
      status: 'active',
      appliedJobs: [1],
      resume: null,
    },
  ];

  useState(() => {
    setCandidates(sampleCandidates);
  }, []);

  const addCandidate = (candidate) => {
    const newCandidate = {
      ...candidate,
      id: Date.now(),
      status: 'active',
      appliedJobs: [],
    };
    setCandidates(prev => [newCandidate, ...prev]);
  };

  const updateCandidate = (id, updates) => {
    setCandidates(prev => prev.map(candidate => 
      candidate.id === id ? { ...candidate, ...updates } : candidate
    ));
  };

  const deleteCandidate = (id) => {
    setCandidates(prev => prev.filter(candidate => candidate.id !== id));
  };

  const applyToJob = (candidateId, jobId) => {
    setCandidates(prev => prev.map(candidate => 
      candidate.id === candidateId 
        ? { 
            ...candidate, 
            appliedJobs: [...candidate.appliedJobs, jobId] 
          }
        : candidate
    ));
  };

  const getCandidatesByJob = (jobId) => {
    return candidates.filter(candidate => 
      candidate.appliedJobs.includes(jobId)
    );
  };

  const searchCandidates = (query) => {
    if (!query) return candidates;
    
    return candidates.filter(candidate => 
      candidate.name.toLowerCase().includes(query.toLowerCase()) ||
      candidate.email.toLowerCase().includes(query.toLowerCase()) ||
      candidate.skills.some(skill => 
        skill.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const value = {
    candidates,
    loading,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    applyToJob,
    getCandidatesByJob,
    searchCandidates,
    setLoading,
  };

  return (
    <CandidatesContext.Provider value={value}>
      {children}
    </CandidatesContext.Provider>
  );
};

export const useCandidates = () => {
  const context = useContext(CandidatesContext);
  if (!context) {
    throw new Error('useCandidates must be used within CandidatesProvider');
  }
  return context;
};