import React from 'react';
import Layout from './Layout';

const PublicLayout = ({ children }) => {
  return (
    <Layout
      showSidebar={false}
      showFooter={true}
      className="min-h-screen"
    >
      {children}
    </Layout>
  );
};

export default PublicLayout;