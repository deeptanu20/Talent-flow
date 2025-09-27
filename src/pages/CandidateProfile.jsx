import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CandidateProfile = () => {
  const { id } = useParams();
  
  // Sample candidate data
  const [candidate] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 555-0123',
    location: 'New York, NY',
    experience: '3 years',
    skills: ['React', 'JavaScript', 'Node.js', 'TypeScript', 'HTML/CSS', 'MongoDB'],
    status: 'active',
    bio: 'Passionate frontend developer with 3 years of experience building modern web applications. Love creating intuitive user interfaces and working with cutting-edge technologies.',
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Technology',
        year: '2020'
      }
    ],
    workExperience: [
      {
        title: 'Frontend Developer',
        company: 'Tech Startup Inc.',
        duration: '2021 - Present',
        description: 'Develop and maintain React applications, collaborate with design team, implement responsive designs.'
      },
      {
        title: 'Junior Web Developer',
        company: 'Digital Agency',
        duration: '2020 - 2021',
        description: 'Built websites using HTML, CSS, and JavaScript. Worked on multiple client projects.'
      }
    ]
  });

  const [applications] = useState([
    {
      id: 1,
      jobTitle: 'Frontend Developer',
      company: 'Tech Corp',
      appliedDate: '2024-01-16',
      status: 'pending'
    },
    {
      id: 2,
      jobTitle: 'React Developer',
      company: 'StartupXYZ',
      appliedDate: '2024-01-10',
      status: 'interviewed'
    }
  ]);

  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/candidates" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Candidates
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mr-6">
              <span className="text-blue-600 font-bold text-2xl">
                {candidate.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{candidate.name}</h1>
              <p className="text-gray-600 mt-1">{candidate.email}</p>
              <p className="text-gray-600">{candidate.phone}</p>
              <p className="text-gray-600">{candidate.location}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Contact
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Schedule Interview
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'applications'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Applications ({applications.length})
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{candidate.bio}</p>
            </div>

            {/* Work Experience */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
              <div className="space-y-4">
                {candidate.workExperience.map((job, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-800">{job.title}</h3>
                    <p className="text-blue-600">{job.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{job.duration}</p>
                    <p className="text-gray-700">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Education</h2>
              <div className="space-y-4">
                {candidate.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-blue-600">{edu.school}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills & Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Quick Info</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Experience:</span>
                  <p className="text-gray-600">{candidate.experience}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ml-2 ${
                    candidate.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {candidate.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Job Applications</h2>
            <div className="space-y-4">
              {applications.map(app => (
                <div key={app.id} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/jobs/${app.id}`} className="text-lg font-medium text-blue-600 hover:text-blue-800">
                        {app.jobTitle}
                      </Link>
                      <p className="text-gray-600">{app.company}</p>
                      <p className="text-sm text-gray-500 mt-1">Applied: {app.appliedDate}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'interviewed' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateProfile;