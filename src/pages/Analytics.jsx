import React, { useState } from 'react';

const Analytics = () => {
  // Sample analytics data
  const [stats] = useState({
    totalJobs: 45,
    activeJobs: 32,
    totalCandidates: 156,
    activeCandidates: 124,
    totalApplications: 289,
    pendingApplications: 67,
    completedAssessments: 143,
    averageAssessmentScore: 74
  });

  const [recentActivities] = useState([
    { id: 1, type: 'application', message: 'New application from John Doe for Frontend Developer', time: '2 minutes ago' },
    { id: 2, type: 'job', message: 'Backend Developer position was published', time: '1 hour ago' },
    { id: 3, type: 'assessment', message: 'JavaScript test completed by Jane Smith (Score: 85%)', time: '3 hours ago' },
    { id: 4, type: 'interview', message: 'Interview scheduled with Bob Johnson', time: '5 hours ago' },
    { id: 5, type: 'application', message: 'Application status updated for UI/UX Designer', time: '1 day ago' }
  ]);

  const [topPerformingJobs] = useState([
    { id: 1, title: 'Frontend Developer', applications: 45, avgScore: 78 },
    { id: 2, title: 'Backend Developer', applications: 32, avgScore: 72 },
    { id: 3, title: 'Full Stack Developer', applications: 28, avgScore: 80 },
    { id: 4, title: 'UI/UX Designer', applications: 25, avgScore: 75 }
  ]);

  const [monthlyData] = useState([
    { month: 'Jan', applications: 45, jobs: 12 },
    { month: 'Feb', applications: 52, jobs: 8 },
    { month: 'Mar', applications: 38, jobs: 15 },
    { month: 'Apr', applications: 61, jobs: 10 },
    { month: 'May', applications: 55, jobs: 13 },
    { month: 'Jun', applications: 67, jobs: 9 }
  ]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'application': return '📄';
      case 'job': return '💼';
      case 'assessment': return '📝';
      case 'interview': return '🤝';
      default: return '📊';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Jobs</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalJobs}</p>
              <p className="text-green-600 text-sm">{stats.activeJobs} active</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💼</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Candidates</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalCandidates}</p>
              <p className="text-green-600 text-sm">{stats.activeCandidates} active</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Applications</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalApplications}</p>
              <p className="text-yellow-600 text-sm">{stats.pendingApplications} pending</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Assessments</p>
              <p className="text-3xl font-bold text-gray-800">{stats.completedAssessments}</p>
              <p className="text-blue-600 text-sm">{stats.averageAssessmentScore}% avg score</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Trends */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Monthly Trends</h2>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium text-gray-700">{data.month}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">{data.applications} apps</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">{data.jobs} jobs</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Jobs */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Performing Jobs</h2>
          <div className="space-y-4">
            {topPerformingJobs.map((job, index) => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{job.title}</p>
                  <p className="text-sm text-gray-600">{job.applications} applications</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">{job.avgScore}%</p>
                  <p className="text-xs text-gray-500">avg score</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Recent Activities</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">{getActivityIcon(activity.type)}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">{activity.message}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;