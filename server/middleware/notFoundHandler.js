// Middleware for handling 404 errors

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    availableEndpoints: [
      'GET /',
      'GET /health',
      'POST /api/satirical-bot',
      'POST /api/satirical-bot-1',
      'GET /api/lambda'
    ]
  });
};

module.exports = notFoundHandler;
