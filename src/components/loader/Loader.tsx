import React from 'react';

class Loader extends React.Component {
  render(): React.ReactNode {
    return (
      <div
        data-testid="loader"
        className="flex items-center justify-center h-full"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-700"></div>
      </div>
    );
  }
}

export default Loader;
