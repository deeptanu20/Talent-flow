import { useState, useEffect } from 'react';
import { 
  JobsStatusChart, 
  CandidatesStageChart, 
  HiringFunnelChart, 
  ApplicationsTrendChart, 
  TopJobsChart,
  AssessmentCompletionChart 
} from './Charts.jsx';
import MetricsCard from './MetricsCard.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

/**
 * Dashboard Component - Main Analytics Dashboard
 */
const Dashboard = () => {
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState({
    metrics: null,
    jobsStatus: [],
    candidatesStage: [],
    hiringFunnel: [],
    applicationsTrend: [],
    topJobs: [],
    assessmentCompletion: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');

  // Time range options
  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ];

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Simulate API calls (replace with real API calls)
      const [
        metricsResponse,
        jobsStatusResponse,
        candidatesStageResponse,
        hiringFunnelResponse,
        applicationsTrendResponse,
        topJobsResponse,
        assessmentCompletionResponse
      ] = await Promise.all([
        fetchMetrics(selectedTimeRange),
        fetchJobsStatus(),
        fetchCandidatesStage(),
        fetchHiringFunnel(),
        fetchApplicationsTrend(selectedTimeRange),
        fetchTopJobs(),
        fetchAssessmentCompletion()
      ]);

      setDashboardData({
        metrics: metricsResponse,
        jobsStatus: jobsStatusResponse,
        candidatesStage: candidatesStageResponse,
        hiringFunnel: hiringFunnelResponse,
        applicationsTrend: applicationsTrendResponse,
        topJobs: topJobsResponse,
        assessmentCompletion: assessmentCompletionResponse
      });
      
      setError(null);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data on mount and time range change
  useEffect(() => {
    fetchDashboardData();
  }, [selectedTimeRange]);

  // Mock API functions (replace with real API calls)
  const fetchMetrics = async (timeRange) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      totalJobs: 25,
      activeJobs: 18,
      totalCandidates: 1247,
      newApplications: 89,
      averageTimeToHire: 21,
      offerAcceptanceRate: 85
    };
  };

  const fetchJobsStatus = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      { status: 'Active', count: 18 },
      { status: 'Archived', count: 7 },
      { status: 'Draft', count: 3 }
    ];
  };

  const fetchCandidatesStage = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      { stage: 'Applied', count: 425 },
      { stage: 'Screening', count: 189 },
      { stage: 'Technical', count: 87 },
      { stage: 'Interview', count: 45 },
      { stage: 'Offer', count: 23 },
      { stage: 'Hired', count: 12 }
    ];
  };

  const fetchHiringFunnel = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      { stage: 'Applied', count: 425 },
      { stage: 'Screening', count: 189 },
      { stage: 'Technical', count: 87 },
      { stage: 'Interview', count: 45 },
      { stage: 'Offer', count: 23 },
      { stage: 'Hired', count: 12 }
    ];
  };

  const fetchApplicationsTrend = async (timeRange) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Generate sample trend data based on time range
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count: Math.floor(Math.random() * 20) + 5
      });
    }
    
    return data;
  };

  const fetchTopJobs = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      { title: 'Senior React Developer', applications: 156 },
      { title: 'Product Manager', applications: 134 },
      { title: 'UX Designer', applications: 98 },
      { title: 'Backend Engineer', applications: 87 },
      { title: 'Data Scientist', applications: 76 }
    ];
  };

  const fetchAssessmentCompletion = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      { 
        id: 1, 
        title: 'Technical Assessment - React', 
        completed: 45, 
        total: 67 
      },
      { 
        id: 2, 
        title: 'Coding Challenge - Algorithm', 
        completed: 32, 
        total: 45 
      },
      { 
        id: 3, 
        title: 'System Design Assessment', 
        completed: 18, 
        total: 28 
      }
    ];
  };

  // Refresh dashboard data
  const handleRefresh = () => {
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Dashboard Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Analytics Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Overview of your hiring process and key metrics
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            {/* Time Range Selector */}
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {timeRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800 dark:text-red-200">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <MetricsCard
          title="Total Jobs"
          value={dashboardData.metrics?.totalJobs || 0}
          icon="briefcase"
          color="blue"
        />
        <MetricsCard
          title="Active Jobs"
          value={dashboardData.metrics?.activeJobs || 0}
          icon="check"
          color="green"
        />
        <MetricsCard
          title="Total Candidates"
          value={dashboardData.metrics?.totalCandidates || 0}
          icon="users"
          color="purple"
        />
        <MetricsCard
          title="New Applications"
          value={dashboardData.metrics?.newApplications || 0}
          icon="plus"
          color="orange"
          timeRange={selectedTimeRange}
        />
        <MetricsCard
          title="Avg. Time to Hire"
          value={`${dashboardData.metrics?.averageTimeToHire || 0} days`}
          icon="clock"
          color="yellow"
        />
        <MetricsCard
          title="Offer Accept Rate"
          value={`${dashboardData.metrics?.offerAcceptanceRate || 0}%`}
          icon="trending-up"
          color="green"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Jobs Status Chart */}
        <JobsStatusChart 
          data={dashboardData.jobsStatus}
          loading={loading}
          error={error}
        />
        
        {/* Candidates by Stage Chart */}
        <CandidatesStageChart 
          data={dashboardData.candidatesStage}
          loading={loading}
          error={error}
        />
        
        {/* Applications Trend Chart */}
        <ApplicationsTrendChart 
          data={dashboardData.applicationsTrend}
          loading={loading}
          error={error}
        />
        
        {/* Top Jobs Chart */}
        <TopJobsChart 
          data={dashboardData.topJobs}
          loading={loading}
          error={error}
        />
      </div>

      {/* Bottom Row - Full Width Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Hiring Funnel Chart */}
        <HiringFunnelChart 
          data={dashboardData.hiringFunnel}
          loading={loading}
          error={error}
        />
        
        {/* Assessment Completion Chart */}
        <AssessmentCompletionChart 
          data={dashboardData.assessmentCompletion}
          loading={loading}
          error={error}
        />
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Last updated: {new Date().toLocaleString()}
      </div>
    </div>
  );
};

export default Dashboard;