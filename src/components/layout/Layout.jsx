import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ 
  children, 
  showSidebar = true, 
  showFooter = true,
  user = null,
  onLogout,
  className = ''
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'New candidate applied for Frontend Developer position',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      message: 'Job posting "Backend Developer" expires in 2 days',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      message: 'Assessment "React Fundamentals" completed by John Doe',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      message: 'Interview scheduled for tomorrow at 2:00 PM',
      time: '1 day ago',
      read: true
    }
  ]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header
        user={user}
        onMenuToggle={toggleSidebar}
        showMenuButton={showSidebar}
        notifications={notifications}
        onLogout={onLogout}
      />

      <div className="flex flex-1">
        {/* Sidebar */}
        {showSidebar && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={closeSidebar}
          />
        )}

        {/* Main content */}
        <main className={`flex-1 flex flex-col ${showSidebar ? 'lg:ml-0' : ''}`}>
          {/* Content area */}
          <div className={`flex-1 ${className}`}>
            {children}
          </div>

          {/* Footer */}
          {showFooter && (
            <Footer className="mt-auto" />
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;

