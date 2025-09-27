import { useState, useEffect, useRef } from 'react';
import { Search, Briefcase, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, debounce } from '../../utils/helpers.js';
import { searchAPI } from '../../services/api.js';
import LoadingSpinner from './LoadingSpinner.jsx';

/**
 * GlobalSearch Component
 * Advanced search with dropdown results for jobs and candidates
 */
const GlobalSearch = ({ 
  className = '',
  onJobSelect,
  onCandidateSelect,
  onClose 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ jobs: [], candidates: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Debounced search function
  const debouncedSearch = debounce(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults({ jobs: [], candidates: [] });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await searchAPI.global(searchQuery);
      setResults(response.data || { jobs: [], candidates: [] });
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search. Please try again.');
      setResults({ jobs: [], candidates: [] });
    } finally {
      setLoading(false);
    }
  }, 300);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      setIsOpen(true);
      setLoading(true);
      debouncedSearch(value);
    } else {
      setIsOpen(false);
      setResults({ jobs: [], candidates: [] });
    }
  };

  // Handle input focus
  const handleFocus = () => {
    if (query.trim()) {
      setIsOpen(true);
    }
  };

  // Handle clear
  const handleClear = () => {
    setQuery('');
    setResults({ jobs: [], candidates: [] });
    setIsOpen(false);
    setError(null);
  };

  // Handle job selection
  const handleJobSelect = (job) => {
    setIsOpen(false);
    setQuery('');
    if (onJobSelect) {
      onJobSelect(job);
    }
  };

  // Handle candidate selection
  const handleCandidateSelect = (candidate) => {
    setIsOpen(false);
    setQuery('');
    if (onCandidateSelect) {
      onCandidateSelect(candidate);
    }
  };

  // Handle escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      if (onClose) {
        onClose();
      }
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasResults = results.jobs.length > 0 || results.candidates.length > 0;
  const showDropdown = isOpen && (loading || hasResults || error);

  return (
    <div className={cn('relative', className)}>
      {/* Search Input */}
      <div 
        ref={searchRef}
        className="relative"
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search jobs, candidates..."
          className={cn(
            'block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg',
            'bg-white dark:bg-gray-700 dark:border-gray-600',
            'text-gray-900 dark:text-gray-100',
            'placeholder-gray-500 dark:placeholder-gray-400',
            'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            'transition-colors duration-200'
          )}
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute top-full left-0 right-0 mt-1 z-50',
              'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
              'rounded-lg shadow-lg max-h-96 overflow-y-auto'
            )}
          >
            {loading && (
              <div className="p-4 flex items-center justify-center">
                <LoadingSpinner size="sm" />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Searching...
                </span>
              </div>
            )}

            {error && (
              <div className="p-4 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {!loading && !error && (
              <>
                {/* Jobs Results */}
                {results.jobs.length > 0 && (
                  <div className="p-2">
                    <div className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Jobs
                    </div>
                    {results.jobs.map((job) => (
                      <button
                        key={job.id}
                        onClick={() => handleJobSelect(job)}
                        className={cn(
                          'w-full flex items-center px-3 py-2 rounded-md',
                          'hover:bg-gray-100 dark:hover:bg-gray-700',
                          'transition-colors duration-150',
                          'text-left'
                        )}
                      >
                        <Briefcase className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {job.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {job.department} • {job.location}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Candidates Results */}
                {results.candidates.length > 0 && (
                  <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Candidates
                    </div>
                    {results.candidates.map((candidate) => (
                      <button
                        key={candidate.id}
                        onClick={() => handleCandidateSelect(candidate)}
                        className={cn(
                          'w-full flex items-center px-3 py-2 rounded-md',
                          'hover:bg-gray-100 dark:hover:bg-gray-700',
                          'transition-colors duration-150',
                          'text-left'
                        )}
                      >
                        <User className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {candidate.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {candidate.email} • {candidate.stage}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* No Results */}
                {!loading && !hasResults && query.trim() && (
                  <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No results found for "{query}"
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalSearch;