import React from 'react';

const NotFoundPage: React.FC = () => (
  <div className="text-center mt-10vh min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
    <h1 className="text-4xl mb-10 text-gray-900 dark:text-white">404</h1>
    <p className="text-gray-700 dark:text-gray-300">
      Sorry, the page you are looking for does not exist.
    </p>
  </div>
);

export default NotFoundPage;
