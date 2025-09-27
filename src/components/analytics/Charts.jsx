import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

// Chart colors for consistent theming
const CHART_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#F97316', // Orange
  '#06B6D4', // Cyan
  '#84CC16', // Lime
];

/**
 * Simple Chart Container Component
 */
const ChartContainer = ({ title, children, loading, error, height = 300 }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div style={{ height }} className="flex items-center justify-center">
          <LoadingSpinner text="Loading chart..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div style={{ height }} className="flex items-center justify-center">
          <div className="text-center text-red-600">
            <p>Failed to load chart</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-sm text-blue-600 hover:text-blue-700 mt-2"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <div style={{ height }}>
        {children}
      </div>
    </div>
  );
};

/**
 * Simple Tooltip Component
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-3">
      <p className="text-sm font-medium mb-2">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-sm" style={{ color: entry.color }}>
          <span className="font-medium">{entry.name}:</span> {entry.value}
        </p>
      ))}
    </div>
  );
};

/**
 * Jobs Status Chart - Bar Chart
 */
export const JobsStatusChart = ({ data = [], loading = false, error = null }) => {
  const chartData = data.map(item => ({
    status: item.status,
    count: item.count
  }));

  return (
    <ChartContainer title="Jobs by Status" loading={loading} error={error}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

/**
 * Candidates by Stage - Pie Chart
 */
export const CandidatesStageChart = ({ data = [], loading = false, error = null }) => {
  const chartData = data.map(item => ({
    stage: item.stage,
    count: item.count
  }));

  return (
    <ChartContainer title="Candidates by Stage" loading={loading} error={error}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ stage, count }) => `${stage}: ${count}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={CHART_COLORS[index % CHART_COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

/**
 * Hiring Funnel Chart - Custom Bar Chart
 */
export const HiringFunnelChart = ({ data = [], loading = false, error = null }) => {
  const funnelStages = [
    'Applied',
    'Screening',
    'Technical',
    'Interview',
    'Offer',
    'Hired'
  ];

  const chartData = funnelStages.map(stage => {
    const stageData = data.find(item => 
      item.stage.toLowerCase() === stage.toLowerCase()
    );
    return {
      stage,
      count: stageData ? stageData.count : 0
    };
  });

  return (
    <ChartContainer title="Hiring Funnel" loading={loading} error={error} height={350}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="stage" type="category" width={80} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill={CHART_COLORS[2]} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

/**
 * Applications Over Time - Line Chart
 */
export const ApplicationsTrendChart = ({ data = [], loading = false, error = null }) => {
  const chartData = data.map(item => ({
    date: item.date,
    applications: item.count
  }));

  return (
    <ChartContainer title="Applications Over Time" loading={loading} error={error}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="applications" 
            stroke={CHART_COLORS[1]} 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

/**
 * Top Performing Jobs - Bar Chart
 */
export const TopJobsChart = ({ data = [], loading = false, error = null }) => {
  const sortedData = [...data]
    .sort((a, b) => b.applications - a.applications)
    .slice(0, 5)
    .map(item => ({
      title: item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title,
      applications: item.applications
    }));

  return (
    <ChartContainer title="Top 5 Jobs by Applications" loading={loading} error={error}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="title" 
            angle={-45}
            textAnchor="end"
            height={100}
            fontSize={12}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="applications" radius={[4, 4, 0, 0]}>
            {sortedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={CHART_COLORS[index % CHART_COLORS.length]} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

/**
 * Assessment Completion Rate - Simple Progress Bars
 */
export const AssessmentCompletionChart = ({ data = [], loading = false, error = null }) => {
  if (loading) {
    return (
      <ChartContainer title="Assessment Completion Rates" loading={loading} error={error} />
    );
  }

  if (error || !data.length) {
    return (
      <ChartContainer title="Assessment Completion Rates" loading={false} error={error || "No data"} />
    );
  }

  return (
    <ChartContainer title="Assessment Completion Rates" loading={false} error={null} height={250}>
      <div className="space-y-4">
        {data.map((assessment, index) => {
          const completionRate = Math.round((assessment.completed / assessment.total) * 100);
          
          return (
            <div key={assessment.id || index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {assessment.title}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {assessment.completed}/{assessment.total} ({completionRate}%)
                </span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </ChartContainer>
  );
};

/**
 * Main Charts Export
 */
export default {
  JobsStatusChart,
  CandidatesStageChart,
  HiringFunnelChart,
  ApplicationsTrendChart,
  TopJobsChart,
  AssessmentCompletionChart
};