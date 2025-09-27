import React from 'react';
import Layout from './Layout';

const DashboardLayout = ({ children, user, onLogout }) => {
  return (
    <Layout
      showSidebar={true}
      showFooter={false}
      user={user}
      onLogout={onLogout}
      className="p-6"
    >
      {children}
    </Layout>
  );
};

export default DashboardLayout;