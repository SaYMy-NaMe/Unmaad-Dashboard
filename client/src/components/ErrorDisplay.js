import React from 'react';

const ErrorDisplay = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="error">
      ❌ Error: {error}
    </div>
  );
};

export default ErrorDisplay; 