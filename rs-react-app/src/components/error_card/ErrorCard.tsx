import React from 'react';

class ErrorCard extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="bg-red-100 p-4 rounded-lg shadow-xs m-auto">
        <h2 className="text-red-800 font-semibold">Error</h2>
        <p className="text-red-700">An error occurred while fetching data.</p>
      </div>
    );
  }
}

export default ErrorCard;
