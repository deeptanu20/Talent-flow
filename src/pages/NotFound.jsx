import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
        </div>
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 text-lg mb-6">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/jobs"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              ← Go back to previous page
            </button>
          </div>
        </div>

        {/* Helpful suggestions */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">What you can do:</h3>
          <ul className="text-left text-gray-600 space-y-2">
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">•</span>
              Check the URL for typos
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">•</span>
              Go back to the homepage
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">•</span>
              Browse our job listings
            </li>
            <li className="flex items-center">
              <span className="text-blue-600 mr-2">•</span>
              Contact support if you need help
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

