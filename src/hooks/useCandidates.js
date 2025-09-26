import { useState, useEffect } from 'react';

export const useCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      appliedJobs: [],
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
      appliedJobs: [],
      resume: null,
    },
  ];

  useEffect(() => {
    setCandidates(sampleCandidates);
  }, []);

  const addCandidate = async (candidateData) => {
    setLoading(true);
    try {
      const newCandidate = {
        ...candidateData,
        id: Date.now(),
        status: 'active',
        appliedJobs: []
      };
      setCandidates(prev => [newCandidate, ...prev]);
      setError(null);
      return newCandidate;
    } catch (err) {
      setError('Failed to add candidate');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCandidate = async (id, updates) => {
    setLoading(true);
    try {
      setCandidates(prev => prev.map(candidate => 
        candidate.id === id ? { ...candidate, ...updates } : candidate
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update candidate');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCandidate = async (id) => {
    setLoading(true);
    try {
      setCandidates(prev => prev.filter(candidate => candidate.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete candidate');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCandidateById = (id) => {
    return candidates.find(candidate => candidate.id === id);
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

  return {
    candidates,
    loading,
    error,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    getCandidateById,
    searchCandidates,
    applyToJob
  };
};