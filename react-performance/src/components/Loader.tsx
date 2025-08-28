import React from 'react';

const Loader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={'flex items-center justify-center h-full my-10 ' + className}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-indigo-700 dark:border-indigo-400"></div>
    </div>
  );
};

export default Loader;
