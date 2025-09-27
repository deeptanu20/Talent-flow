import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  
  // Sample job data - replace with actual data fetching
  const [job] = useState({
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Corp',
    location: 'New York, NY',
    type: 'Full-time',
    experience: 'Mid-level',
    salary: '$70,000 - $90,000',
    posted: '2024-01-15',
    status: 'active',
    description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user-facing features using modern JavaScript frameworks.',
    requirements: [
      '3+ years of experience with React.js',
      'Strong knowledge of HTML, CSS, and JavaScript',
      'Experience with state management (Redux, Context API)',
      'Familiarity with RESTful APIs',
      'Knowledge of Git version control'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Flexible working hours',
      '401(k) matching',
      'Professional development budget'
    ]
  });

  const [applications] = useState([
    { id: 1, candidateName: 'John Doe', appliedDate: '2024-01-16', status: 'pending' },
    { id: 2, candidateName: 'Jane Smith', appliedDate: '2024-01-17', status: 'reviewed' },
    { id: 3, candidateName: 'Bob Johnson', appliedDate: '2024-01-18', status: 'interviewed' },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/jobs" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Jobs
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
            <p className="text-xl text-gray-600 mt-2">{job.company}</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Edit Job
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Delete Job
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Job Information</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Location:</span>
                <p className="text-gray-600">{job.location}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Type:</span>
                <p className="text-gray-600">{job.type}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Experience:</span>
                <p className="text-gray-600">{job.experience}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Salary:</span>
                <p className="text-gray-600">{job.salary}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Benefits</h2>
            <ul className="space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Applications */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Applications ({applications.length})</h2>
            <div className="space-y-3">
              {applications.map(app => (
                <div key={app.id} className="border border-gray-200 p-3 rounded-md">
                  <Link to={`/candidates/${app.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                    {app.candidateName}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">Applied: {app.appliedDate}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;