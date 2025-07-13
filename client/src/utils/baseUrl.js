// Base URL for API endpoints
export const baseUrl = 'http://localhost:8000';

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  return `${baseUrl}${endpoint}`;
}; 