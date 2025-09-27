import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Assessments = () => {
  const [assessments, setAssessments] = useState([
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      description: 'Test basic JavaScript knowledge and concepts',
      questions: 10,
      timeLimit: 30,
      difficulty: 'Beginner',
      status: 'active',
      totalAttempts: 25,
      averageScore: 78,
      created: '2024-01-10'
    },
    {
      id: 2,
      title: 'React Development',
      description: 'Advanced React concepts and best practices',
      questions: 15,
      timeLimit: 45,
      difficulty: 'Intermediate',
      status: 'active',
      totalAttempts: 18,
      averageScore: 72,
      created: '2024-01-08'
    },
    {
      id: 3,
      title: 'Node.js Backend',
      description: 'Server-side JavaScript and API development',
      questions: 12,
      timeLimit: 40,
      difficulty: 'Advanced',
      status: 'draft',
      totalAttempts: 0,
      averageScore: 0,
      created: '2024-01-15'
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssessments = assessments.filter(assessment => {
    const matchesTab = activeTab === 'all' || assessment.status === activeTab;
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Assessments</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Create Assessment
        </button>
      </div>

      {/* Search and Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search assessments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <nav className="flex space-x-8 px-4">
          {['all', 'active', 'draft'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab} ({assessments.filter(a => tab === 'all' || a.status === tab).length})
            </button>
          ))}
        </nav>
      </div>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No assessments found.</p>
          </div>
        ) : (
          filteredAssessments.map(assessment => (
            <div key={assessment.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{assessment.title}</h3>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(assessment.difficulty)}`}>
                      {assessment.difficulty}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      assessment.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {assessment.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{assessment.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                  <div>
                    <span className="block font-medium">Questions</span>
                    <span>{assessment.questions}</span>
                  </div>
                  <div>
                    <span className="block font-medium">Time Limit</span>
                    <span>{assessment.timeLimit} min</span>
                  </div>
                  <div>
                    <span className="block font-medium">Attempts</span>
                    <span>{assessment.totalAttempts}</span>
                  </div>
                  <div>
                    <span className="block font-medium">Avg Score</span>
                    <span>{assessment.averageScore}%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Created: {assessment.created}</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                      View Results
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Assessments;
