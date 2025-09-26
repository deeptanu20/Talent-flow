import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
  light: {
    name: 'light',
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  },
  dark: {
    name: 'dark',
    colors: {
      primary: '#3b82f6',
      secondary: '#94a3b8',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [customColors, setCustomColors] = useState({});

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    const savedColors = localStorage.getItem('customColors');
    
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
    
    if (savedColors) {
      try {
        setCustomColors(JSON.parse(savedColors));
      } catch (e) {
        console.error('Failed to parse custom colors:', e);
      }
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    // Save custom colors to localStorage
    localStorage.setItem('customColors', JSON.stringify(customColors));
  }, [customColors]);

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const updateCustomColor = (colorKey, colorValue) => {
    setCustomColors(prev => ({
      ...prev,
      [colorKey]: colorValue,
    }));
  };

  const resetCustomColors = () => {
    setCustomColors({});
  };

  const getTheme = () => {
    return {
      ...themes[currentTheme],
      colors: {
        ...themes[currentTheme].colors,
        ...customColors,
      },
    };
  };

  const isDark = currentTheme === 'dark';

  const value = {
    currentTheme,
    theme: getTheme(),
    isDark,
    toggleTheme,
    setTheme,
    updateCustomColor,
    resetCustomColors,
    availableThemes: Object.keys(themes),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};