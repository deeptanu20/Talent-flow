import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn, debounce } from '../../utils/helpers.js';

/**
 * SearchBar Component
 * Simple search input with debounced onChange and clear functionality
 */
const SearchBar = ({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
  debounceMs = 300,
  disabled = false,
  autoFocus = false,
}) => {
  const [searchTerm, setSearchTerm] = useState(value);

  // Debounced search function
  const debouncedOnChange = debounce((term) => {
    if (onChange) {
      onChange(term);
    }
  }, debounceMs);

  // Update search term when value prop changes
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    debouncedOnChange(newValue);
  };

  // Handle clear button click
  const handleClear = () => {
    setSearchTerm('');
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange('');
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onChange) {
        onChange(searchTerm);
      }
    }
  };

  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className={cn(
          'block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg',
          'bg-white dark:bg-gray-700 dark:border-gray-600',
          'text-gray-900 dark:text-gray-100',
          'placeholder-gray-500 dark:placeholder-gray-400',
          'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          'dark:disabled:bg-gray-800 dark:disabled:text-gray-400',
          'transition-colors duration-200'
        )}
      />
      
      {searchTerm && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className={cn(
            'absolute inset-y-0 right-0 pr-3 flex items-center',
            'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200',
            'transition-colors duration-200'
          )}
          title="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;