import { useLocalStorage } from './useLocalStorage';
import { useEffect } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);

  // Update document class when dark mode changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Check system preference on initial load
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only update if user hasn't set a preference
      if (localStorage.getItem('darkMode') === null) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    // Set initial value based on system preference if no stored value
    if (localStorage.getItem('darkMode') === null) {
      setIsDarkMode(mediaQuery.matches);
    }

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setIsDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const enableDarkMode = () => {
    setIsDarkMode(true);
  };

  const disableDarkMode = () => {
    setIsDarkMode(false);
  };

  return {
    isDarkMode,
    toggleDarkMode,
    enableDarkMode,
    disableDarkMode
  };
};
