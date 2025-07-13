// Controller for '/' and '/health' routes

const NODE_ENV = process.env.NODE_ENV || 'development';
let clientConnectionStatus = 'disconnected';

// These will be set by app.js
function setClientConnectionStatusGetter(getter) {
  clientConnectionStatus = getter;
}

const getRoot = (req, res) => {
  res.json({
    message: 'Welcome to Unmaad Satirical Bot API',
    version: '1.0.0',
    status: 'running',
    gradioClient: clientConnectionStatus(),
    endpoints: {
      '/api/satirical-bot': 'POST - Generate satirical response (requires message)',
      '/api/satirical-bot-1': 'POST - Alternative satirical response (requires message)',
      '/api/lambda': 'GET - Lambda endpoint (no parameters)',
      '/health': 'GET - Health check'
    }
  });
};

const getHealth = (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    gradioClient: clientConnectionStatus(),
    uptime: process.uptime()
  });
};

module.exports = {
  getRoot,
  getHealth,
  setClientConnectionStatusGetter
};
