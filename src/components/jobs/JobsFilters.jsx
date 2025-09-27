import { useState, useEffect } from 'react';

/**
 * JobsFilters Component - Filter and search jobs
 */
const JobsFilters = ({ 
  onFiltersChange, 
  initialFilters = {},
  jobsData = [] // For dynamic filter options
}) => {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    department: 'all',
    location: 'all',
    type: 'all',
    experience: 'all',
    isRemote: 'all',
    isUrgent: 'all',
    salaryRange: 'all',
    sortBy: 'newest',
    ...initialFilters
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchDebounce, setSearchDebounce] = useState(null);

  // Debounced search
  useEffect(() => {
    if (searchDebounce) {
      clearTimeout(searchDebounce);
    }
    
    const timeout = setTimeout(() => {
      if (onFiltersChange) {
        onFiltersChange(filters);
      }
    }, 300);
    
    setSearchDebounce(timeout);
    
    return () => {
      if (searchDebounce) {
        clearTimeout(searchDebounce);
      }
    };
  }, [filters.search]);

  // Handle non-search filter changes immediately
  useEffect(() => {
    if (onFiltersChange) {
      const { search, ...otherFilters } = filters;
      onFiltersChange(filters);
    }
  }, [
    filters.status,
    filters.department,
    filters.location,
    filters.type,
    filters.experience,
    filters.isRemote,
    filters.isUrgent,
    filters.salaryRange,
    filters.sortBy
  ]);

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset filters
  const handleReset = () => {
    const resetFilters = {
      search: '',
      status: 'all',
      department: 'all',
      location: 'all',
      type: 'all',
      experience: 'all',
      isRemote: 'all',
      isUrgent: 'all',
      salaryRange: 'all',
      sortBy: 'newest'
    };
    setFilters(resetFilters);
  };

  // Get unique values for filter options
  const getUniqueValues = (key) => {
    const values = jobsData
      .map(job => job[key])
      .filter(value => value && value.toString().trim() !== '')
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
    return values;
  };

  // Get active filters count
  const getActiveFiltersCount = () => {
    return Object.entries(filters).filter(([key, value]) => {
      if (key === 'search') return value.trim() !== '';
      if (key === 'sortBy') return false; // Don't count sort as an active filter
      return value !== 'all' && value !== '';
    }).length;
  };

  // Filter option configurations
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' },
    { value: 'draft', label: 'Draft' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'freelance', label: 'Freelance' }
  ];

  const experienceOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'entry-level', label: 'Entry Level' },
    { value: 'mid-level', label: 'Mid Level' },
    { value: 'senior-level', label: 'Senior Level' },
    { value: 'executive', label: 'Executive' }
  ];

  const remoteOptions = [
    { value: 'all', label: 'All' },
    { value: 'true', label: 'Remote Only' },
    { value: 'false', label: 'On-site Only' }
  ];

  const urgentOptions = [
    { value: 'all', label: 'All' },
    { value: 'true', label: 'Urgent Only' },
    { value: 'false', label: 'Non-urgent' }
  ];

  const salaryRangeOptions = [
    { value: 'all', label: 'All Salaries' },
    { value: '0-50000', label: 'Under $50K' },
    { value: '50000-80000', label: '$50K - $80K' },
    { value: '80000-120000', label: '$80K - $120K' },
    { value: '120000-160000', label: '$120K - $160K' },
    { value: '160000-999999', label: '$160K+' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'applications', label: 'Most Applications' },
    { value: 'salary-high', label: 'Salary: High to Low' },
    { value: 'salary-low', label: 'Salary: Low to High' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      {/* Search and Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search jobs by title, department, or location..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-700 dark:text-gray-100"
          />
          {filters.search && (
            <button
              onClick={() => handleFilterChange('search', '')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Quick Filters */}
        <div className="flex items-center space-x-3">
          {/* Status Quick Filter */}
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-700 dark:text-gray-100"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-700 dark:text-gray-100"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 
                     border border-blue-200 dark:border-blue-700 rounded-md hover:bg-blue-50 
                     dark:hover:bg-blue-900/20 transition-colors flex items-center"
          >
            <svg className={`w-4 h-4 mr-1 transform ${isExpanded ? 'rotate-180' : ''} transition-transform`} 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Filters
            {getActiveFiltersCount() > 0 && (
              <span className="ml-1 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department
              </label>
              <select
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="all">All Departments</option>
                {getUniqueValues('department').map(dept => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="all">All Locations</option>
                {getUniqueValues('location').map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-700 dark:text-gray-100"
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Experience Level
              </label>
              <select
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-700 dark:text-gray-100"
              >
                {experienceOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Remote Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Work Style
              </label>
              <select
                value={filters.isRemote}
                onChange={(e) => handleFilterChange('isRemote', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-700 dark:text-gray-100"
              >
                {remoteOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Urgency Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Urgency
              </label>
              <select
                value={filters.isUrgent}
                onChange={(e) => handleFilterChange('isUrgent', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-700 dark:text-gray-100"
              >
                {urgentOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Salary Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Salary Range
              </label>
              <select
                value={filters.salaryRange}
                onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-700 dark:text-gray-100"
              >
                {salaryRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {getActiveFiltersCount() > 0 && (
                <span>
                  {getActiveFiltersCount()} filter{getActiveFiltersCount() > 1 ? 's' : ''} applied
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              {getActiveFiltersCount() > 0 && (
                <button
                  onClick={handleReset}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 
                           dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                           rounded-md transition-colors"
                >
                  Clear all
                </button>
              )}
              
              <button
                onClick={() => setIsExpanded(false)}
                className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 
                         hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {getActiveFiltersCount() > 0 && !isExpanded && (
        <div className="flex flex-wrap gap-2 mt-4">
          {Object.entries(filters).map(([key, value]) => {
            if (key === 'search' && value.trim() !== '') {
              return (
                <span key={key} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                                        bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                  Search: "{value}"
                  <button
                    onClick={() => handleFilterChange('search', '')}
                    className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              );
            }
            
            if (key !== 'sortBy' && key !== 'search' && value !== 'all' && value !== '') {
              const label = key.charAt(0).toUpperCase() + key.slice(1);
              const displayValue = value === 'true' ? 'Yes' : value === 'false' ? 'No' : value;
              
              return (
                <span key={key} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                                        bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {label}: {displayValue}
                  <button
                    onClick={() => handleFilterChange(key, 'all')}
                    className="ml-1 text-gray-600 dark:text-gray-400 hover:text-gray-800"
                  >
                    ×
                  </button>
                </span>
              );
            }
            
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default JobsFilters;