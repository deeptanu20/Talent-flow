// ui/Tabs.jsx
import React, { useState, createContext, useContext } from 'react';

const TabsContext = createContext();

const Tabs = ({ children, defaultValue, value, onValueChange, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue || '');
  
  const currentValue = value !== undefined ? value : activeTab;
  const handleValueChange = value !== undefined ? onValueChange : setActiveTab;

  return (
    <TabsContext.Provider value={{ activeTab: currentValue, setActiveTab: handleValueChange }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children, className = '' }) => {
  const baseClasses = 'flex space-x-1 border-b border-gray-200';
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
};

const TabsTrigger = ({ children, value, disabled = false, className = '' }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;
  
  const baseClasses = 'px-4 py-2 text-sm font-medium rounded-t-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';
  const activeClasses = isActive 
    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50';
  
  const classes = `${baseClasses} ${activeClasses} ${className}`.trim();

  return (
    <button
      className={classes}
      onClick={() => !disabled && setActiveTab(value)}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ children, value, className = '' }) => {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== value) {
    return null;
  }

  return (
    <div className={`pt-4 ${className}`} role="tabpanel">
      {children}
    </div>
  );
};

// Attach sub-components to Tabs
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export default Tabs;
