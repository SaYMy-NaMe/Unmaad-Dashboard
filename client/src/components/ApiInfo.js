import React from 'react';

const ApiInfo = ({ activeTab }) => {
  return (
    <div className="card">
      <h3>📋 API Information</h3>
      <div className="api-info">
        <p><strong>Current Endpoint:</strong> {activeTab}</p>
        <p><strong>Method:</strong> {activeTab === 'lambda' ? 'GET' : 'POST'}</p>
        <p><strong>Parameters:</strong> {activeTab === 'lambda' ? 'None' : 'message (string)'}</p>
      </div>
    </div>
  );
};

export default ApiInfo; 