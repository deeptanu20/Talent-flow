import React, { createContext, useContext, useState, useEffect } from 'react';

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    experience: '',
  });

  // Sample jobs data
  const sampleJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Corp',
      location: 'New York, NY',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '$70,000 - $90,000',
      posted: '2024-01-15',
      description: 'Looking for a skilled frontend developer...'
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$100,000 - $130,000',
      posted: '2024-01-14',
      description: 'Seeking an experienced backend developer...'
    },
  ];

  useEffect(() => {
    // Load initial jobs
    setJobs(sampleJobs);
  }, []);

  const addJob = (job) => {
    const newJob = {
      ...job,
      id: Date.now(),
      posted: new Date().toISOString().split('T')[0],
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const updateJob = (id, updates) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, ...updates } : job
    ));
  };

  const deleteJob = (id) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const getFilteredJobs = () => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           job.company.toLowerCase().includes(filters.search.toLowerCase());
      const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesType = !filters.type || job.type === filters.type;
      const matchesExperience = !filters.experience || job.experience === filters.experience;

      return matchesSearch && matchesLocation && matchesType && matchesExperience;
    });
  };

  const value = {
    jobs,
    loading,
    filters,
    setFilters,
    addJob,
    updateJob,
    deleteJob,
    getFilteredJobs,
    setLoading,
  };

  return (
    <JobsContext.Provider value={value}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within JobsProvider');
  }
  return context;
};