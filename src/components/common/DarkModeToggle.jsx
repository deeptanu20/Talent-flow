import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers.js';
import { THEME, STORAGE_KEYS } from '../../utils/constants.js';

/**
 * DarkModeToggle Component
 * Toggle between light, dark, and system theme modes
 */
const DarkModeToggle = ({ 
  className = '',
  showLabel = false,
  variant = 'button' // 'button' | 'dropdown'
}) => {
  const [theme, setTheme] = useState(THEME.SYSTEM);
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || THEME.SYSTEM;
    setTheme(savedTheme);
    applyTheme(savedTheme);
    setMounted(true);
  }, []);

  // Apply theme to document
  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    
    if (newTheme === THEME.DARK) {
      root.classList.add('dark');
    } else if (newTheme === THEME.LIGHT) {
      root.classList.remove('dark');
    } else {
      // System theme
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  // Handle theme change
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    applyTheme(newTheme);
  };

  // Get next theme for simple toggle
  const getNextTheme = () => {
    switch (theme) {
      case THEME.LIGHT:
        return THEME.DARK;
      case THEME.DARK:
        return THEME.SYSTEM;
      case THEME.SYSTEM:
        return THEME.LIGHT;
      default:
        return THEME.LIGHT;
    }
  };

  // Get current theme icon
  const getThemeIcon = () => {
    switch (theme) {
      case THEME.LIGHT:
        return Sun;
      case THEME.DARK:
        return Moon;
      case THEME.SYSTEM:
        return Monitor;
      default:
        return Sun;
    }
  };

  // Get theme label
  const getThemeLabel = () => {
    switch (theme) {
      case THEME.LIGHT:
        return 'Light';
      case THEME.DARK:
        return 'Dark';
      case THEME.SYSTEM:
        return 'System';
      default:
        return 'Light';
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={cn('w-9 h-9', className)} />
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        <select
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value)}
          className={cn(
            'appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600',
            'rounded-lg px-3 py-2 pr-8 text-sm',
            'text-gray-900 dark:text-gray-100',
            'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            'transition-colors duration-200'
          )}
        >
          <option value={THEME.LIGHT}>Light</option>
          <option value={THEME.DARK}>Dark</option>
          <option value={THEME.SYSTEM}>System</option>
        </select>
      </div>
    );
  }

  const Icon = getThemeIcon();

  return (
    <button
      onClick={() => handleThemeChange(getNextTheme())}
      className={cn(
        'relative flex items-center justify-center',
        'w-9 h-9 rounded-lg',
        'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600',
        'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'dark:focus:ring-offset-gray-900',
        className
      )}
      title={`Current theme: ${getThemeLabel()}. Click to change.`}
    >
      <motion.div
        key={theme}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        className="flex items-center justify-center"
      >
        <Icon className="w-4 h-4" />
      </motion.div>
      
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {getThemeLabel()}
        </span>
      )}
    </button>
  );
};

/**
 * Hook to use theme state
 */
export const useTheme = () => {
  const [theme, setThemeState] = useState(THEME.SYSTEM);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || THEME.SYSTEM;
    setThemeState(savedTheme);
    setMounted(true);
  }, []);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    
    const root = document.documentElement;
    if (newTheme === THEME.DARK) {
      root.classList.add('dark');
    } else if (newTheme === THEME.LIGHT) {
      root.classList.remove('dark');
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  const isDark = mounted && (
    theme === THEME.DARK || 
    (theme === THEME.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  return {
    theme,
    setTheme,
    isDark,
    mounted,
  };
};

export default DarkModeToggle;