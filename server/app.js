const express = require('express');
const { PORT, NODE_ENV } = require('./config/serverConfig');
const setupMiddleware = require('./middleware/setup');
const setupGracefulShutdown = require('./utils/gracefulShutdown');
const indexRoutes = require('./routes/indexRoutes');
const satiricalBotRoutes = require('./routes/satiricalBotRoutes');
const lambdaRoutes = require('./routes/lambdaRoutes');
const indexController = require('./controllers/indexController');
const satiricalBotController = require('./controllers/satiricalBotController');
const lambdaController = require('./controllers/lambdaController');
const notFoundHandler = require('./middleware/notFoundHandler');
const { errorHandler, setNodeEnv } = require('./middleware/errorHandler');
const gradioService = require('./services/gradioService');

const app = express();

// Middleware
setupMiddleware(app);

// Dependency injection for controllers
setNodeEnv(NODE_ENV);
gradioService.injectDependencies({
  indexController,
  satiricalBotController,
  lambdaController
}, NODE_ENV);

// Routes
app.use('/', indexRoutes);
app.use('/api', satiricalBotRoutes);
app.use('/api', lambdaRoutes);

// 404 handler
app.use('*', notFoundHandler);

// Error handler
app.use(errorHandler);

// Graceful shutdown
setupGracefulShutdown();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
  console.log(`🤖 Satirical Bot APIs available:`);
  console.log(`   POST /api/satirical-bot`);
  console.log(`   POST /api/satirical-bot-1`);
  console.log(`   GET /api/lambda`);
  gradioService.initializeGradioClient();
});

module.exports = app; 