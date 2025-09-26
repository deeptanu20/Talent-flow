import { useState, useEffect } from 'react';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      status: 'active',
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
      status: 'active',
      description: 'Seeking an experienced backend developer...'
    },
  ];

  useEffect(() => {
    setJobs(sampleJobs);
  }, []);

  const addJob = async (jobData) => {
    setLoading(true);
    try {
      const newJob = {
        ...jobData,
        id: Date.now(),
        posted: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      setJobs(prev => [newJob, ...prev]);
      setError(null);
      return newJob;
    } catch (err) {
      setError('Failed to add job');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (id, updates) => {
    setLoading(true);
    try {
      setJobs(prev => prev.map(job => 
        job.id === id ? { ...job, ...updates } : job
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update job');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    setLoading(true);
    try {
      setJobs(prev => prev.filter(job => job.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete job');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getJobById = (id) => {
    return jobs.find(job => job.id === id);
  };

  const searchJobs = (query) => {
    if (!query) return jobs;
    return jobs.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    jobs,
    loading,
    error,
    addJob,
    updateJob,
    deleteJob,
    getJobById,
    searchJobs
  };
};