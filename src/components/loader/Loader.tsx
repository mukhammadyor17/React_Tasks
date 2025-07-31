import React from 'react';

const Loader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      data-testid="loader"
      className={'flex items-center justify-center h-full ' + className}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-700 dark:border-indigo-400"></div>
    </div>
  );
};

export default Loader;
