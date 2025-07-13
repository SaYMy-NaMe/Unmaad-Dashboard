const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Client } = require('@gradio/client');

// Helper to strip echoed input from bot response
function stripEchoedInput(userMsg, botResponse) {
  if (typeof botResponse === 'string' && botResponse.trim().toLowerCase().startsWith(userMsg.trim().toLowerCase())) {
    return botResponse.slice(userMsg.length).trim();
  }
  return botResponse;
}

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Initialize Gradio client
let gradioClient = null;
let clientConnectionStatus = 'disconnected';

// Initialize Gradio client with retry mechanism
async function initializeGradioClient() {
  try {
    console.log('🔄 Connecting to Gradio client...');
    gradioClient = await Client.connect("Rezuwan/USB_Unmad_Satirical_Bot");
    clientConnectionStatus = 'connected';
    console.log('✅ Gradio client connected successfully');
  } catch (error) {
    clientConnectionStatus = 'failed';
    console.error('❌ Failed to connect to Gradio client:', error.message);
    console.log('⚠️  APIs will return connection error until client is available');
  }
}

// Reset Gradio client connection to clear conversation context
async function resetGradioClient() {
  try {
    if (gradioClient) {
      console.log('🔄 Resetting Gradio client connection...');
      gradioClient = await Client.connect("Rezuwan/USB_Unmad_Satirical_Bot");
      clientConnectionStatus = 'connected';
      console.log('✅ Gradio client reset successfully');
    }
  } catch (error) {
    console.error('❌ Failed to reset Gradio client:', error.message);
    // Try to reinitialize
    await initializeGradioClient();
  }
}

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies with size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Unmaad Satirical Bot API',
    version: '1.0.0',
    status: 'running',
    gradioClient: clientConnectionStatus,
    endpoints: {
      '/api/satirical-bot': 'POST - Generate satirical response (requires message)',
      '/api/satirical-bot-1': 'POST - Alternative satirical response (requires message)',
      '/api/lambda': 'GET - Lambda endpoint (no parameters)',
      '/health': 'GET - Health check'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    gradioClient: clientConnectionStatus,
    uptime: process.uptime()
  });
});

// Satirical Bot API - Endpoint 1 (/custom_unmad_satirical_bot)
app.post('/api/satirical-bot', async (req, res) => {
  try {
    const { message, conversationId, timestamp } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required and must be a string',
        example: { message: "Hello!!" },
        api_name: "/custom_unmad_satirical_bot"
      });
    }

    if (clientConnectionStatus !== 'connected') {
      return res.status(503).json({
        error: 'Gradio client not connected',
        status: clientConnectionStatus,
        message: 'Please try again later or check server logs'
      });
    }

    console.log(`🤖 Processing satirical bot request: "${message}" (Conversation ID: ${conversationId || 'none'})`);
    
    // Reset client connection to clear conversation context
    await resetGradioClient();
    
    // Add a small delay to ensure context is cleared
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Create a fresh request with conversation context reset
    const result = await gradioClient.predict("/custom_unmad_satirical_bot", {
      message: message
    });

    // Based on todo.txt, this returns a list of 2 elements
    const [textboxOutput, chatbotOutput] = result.data;
    // Strip echoed input
    const cleanTextbox = stripEchoedInput(message, textboxOutput);
    const cleanChatbot = stripEchoedInput(message, chatbotOutput);

    res.json({
      success: true,
      api_name: "/custom_unmad_satirical_bot",
      input: { message, conversationId, timestamp },
      output: {
        textbox_value: cleanTextbox,
        chatbot_value: cleanChatbot
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Satirical bot error:', error);
    res.status(500).json({
      error: 'Failed to generate satirical response',
      api_name: "/custom_unmad_satirical_bot",
      message: NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Satirical Bot API - Endpoint 2 (/custom_unmad_satirical_bot_1)
app.post('/api/satirical-bot-1', async (req, res) => {
  try {
    const { message, conversationId, timestamp } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required and must be a string',
        example: { message: "Hello!!" },
        api_name: "/custom_unmad_satirical_bot_1"
      });
    }

    if (clientConnectionStatus !== 'connected') {
      return res.status(503).json({
        error: 'Gradio client not connected',
        status: clientConnectionStatus,
        message: 'Please try again later or check server logs'
      });
    }

    console.log(`🤖 Processing satirical bot-1 request: "${message}" (Conversation ID: ${conversationId || 'none'})`);
    
    // Reset client connection to clear conversation context
    await resetGradioClient();
    
    // Add a small delay to ensure context is cleared
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Create a fresh request with conversation context reset
    const result = await gradioClient.predict("/custom_unmad_satirical_bot_1", {
      message: message
    });

    // Based on todo.txt, this returns a list of 2 elements
    const [textboxOutput, chatbotOutput] = result.data;
    // Strip echoed input
    const cleanTextbox = stripEchoedInput(message, textboxOutput);
    const cleanChatbot = stripEchoedInput(message, chatbotOutput);

    res.json({
      success: true,
      api_name: "/custom_unmad_satirical_bot_1",
      input: { message, conversationId, timestamp },
      output: {
        textbox_value: cleanTextbox,
        chatbot_value: cleanChatbot
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Satirical bot-1 error:', error);
    res.status(500).json({
      error: 'Failed to generate satirical response',
      api_name: "/custom_unmad_satirical_bot_1",
      message: NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Lambda API (/lambda)
app.get('/api/lambda', async (req, res) => {
  try {
    if (clientConnectionStatus !== 'connected') {
      return res.status(503).json({
        error: 'Gradio client not connected',
        status: clientConnectionStatus,
        message: 'Please try again later or check server logs'
      });
    }

    console.log('🔄 Processing lambda request');
    
    // Reset client connection to clear conversation context
    await resetGradioClient();
    
    const result = await gradioClient.predict("/lambda", {});

    // Based on todo.txt, this returns a list of 2 elements
    const [chatbotOutput, textboxOutput] = result.data;

    res.json({
      success: true,
      api_name: "/lambda",
      input: {},
      output: {
        chatbot_value: chatbotOutput,
        textbox_value: textboxOutput
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Lambda error:', error);
    res.status(500).json({
      error: 'Failed to call lambda endpoint',
      api_name: "/lambda",
      message: NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
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
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
  console.log(`🤖 Satirical Bot APIs available:`);
  console.log(`   POST /api/satirical-bot`);
  console.log(`   POST /api/satirical-bot-1`);
  console.log(`   GET /api/lambda`);
  
  // Initialize Gradio client after server starts
  initializeGradioClient();
});

module.exports = app; 