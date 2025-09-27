import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Candidates = () => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 555-0123',
      experience: '3 years',
      skills: ['React', 'JavaScript', 'Node.js'],
      status: 'active',
      appliedJobs: 2,
      lastActive: '2024-01-18'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 555-0124',
      experience: '5 years',
      skills: ['Python', 'Django', 'PostgreSQL'],
      status: 'active',
      appliedJobs: 1,
      lastActive: '2024-01-17'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '+1 555-0125',
      experience: '2 years',
      skills: ['Java', 'Spring Boot', 'MySQL'],
      status: 'inactive',
      appliedJobs: 0,
      lastActive: '2024-01-10'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterExperience, setFilterExperience] = useState('');

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = !filterStatus || candidate.status === filterStatus;
    const matchesExperience = !filterExperience || candidate.experience.includes(filterExperience);
    
    return matchesSearch && matchesStatus && matchesExperience;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Candidates</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Candidate
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name, email, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <select
              value={filterExperience}
              onChange={(e) => setFilterExperience(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Experience</option>
              <option value="1">1-2 years</option>
              <option value="3">3-5 years</option>
              <option value="5">5+ years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No candidates found matching your criteria.</p>
          </div>
        ) : (
          filteredCandidates.map(candidate => (
            <div key={candidate.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {candidate.name.charAt(0)}
                  </span>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  candidate.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {candidate.status}
                </span>
              </div>
              
              <Link to={`/candidates/${candidate.id}`} className="text-lg font-semibold text-blue-600 hover:text-blue-800">
                {candidate.name}
              </Link>
              <p className="text-gray-600 text-sm mt-1">{candidate.email}</p>
              <p className="text-gray-600 text-sm">{candidate.phone}</p>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Experience: {candidate.experience}</p>
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
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
              
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm text-gray-500">
                <span>Applied to {candidate.appliedJobs} jobs</span>
                <span>Last active: {candidate.lastActive}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Candidates;