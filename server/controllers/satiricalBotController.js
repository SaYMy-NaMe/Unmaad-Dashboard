// Controller for /api/satirical-bot and /api/satirical-bot-1

let getGradioClient;
let clientConnectionStatus;
let resetGradioClient;
let NODE_ENV;

function setDependencies(deps) {
  getGradioClient = deps.getGradioClient;
  clientConnectionStatus = deps.clientConnectionStatus;
  resetGradioClient = deps.resetGradioClient;
  NODE_ENV = deps.NODE_ENV;
}

function stripEchoedInput(userMsg, botResponse) {
  if (typeof botResponse === 'string' && botResponse.trim().toLowerCase().startsWith(userMsg.trim().toLowerCase())) {
    return botResponse.slice(userMsg.length).trim();
  }
  return botResponse;
}

const postSatiricalBot = async (req, res) => {
  try {
    const { message, conversationId, timestamp } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required and must be a string',
        example: { message: 'Hello!!' },
        api_name: '/custom_unmad_satirical_bot'
      });
    }
    if (clientConnectionStatus() !== 'connected') {
      return res.status(503).json({
        error: 'Gradio client not connected',
        status: clientConnectionStatus(),
        message: 'Please try again later or check server logs'
      });
    }
    const gradioClient = getGradioClient();
    if (!gradioClient) {
      return res.status(503).json({
        error: 'Gradio client not initialized',
        status: clientConnectionStatus(),
        message: 'Please try again later or check server logs'
      });
    }
    console.log(`🤖 Processing satirical bot request: "${message}" (Conversation ID: ${conversationId || 'none'})`);
    await resetGradioClient();
    await new Promise(resolve => setTimeout(resolve, 100));
    const result = await gradioClient.predict('/custom_unmad_satirical_bot', { message });
    const [textboxOutput, chatbotOutput] = result.data;
    const cleanTextbox = stripEchoedInput(message, textboxOutput);
    const cleanChatbot = stripEchoedInput(message, chatbotOutput);
    res.json({
      success: true,
      api_name: '/custom_unmad_satirical_bot',
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
      api_name: '/custom_unmad_satirical_bot',
      message: NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const postSatiricalBot1 = async (req, res) => {
  try {
    const { message, conversationId, timestamp } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required and must be a string',
        example: { message: 'Hello!!' },
        api_name: '/custom_unmad_satirical_bot_1'
      });
    }
    if (clientConnectionStatus() !== 'connected') {
      return res.status(503).json({
        error: 'Gradio client not connected',
        status: clientConnectionStatus(),
        message: 'Please try again later or check server logs'
      });
    }
    const gradioClient = getGradioClient();
    if (!gradioClient) {
      return res.status(503).json({
        error: 'Gradio client not initialized',
        status: clientConnectionStatus(),
        message: 'Please try again later or check server logs'
      });
    }
    console.log(`🤖 Processing satirical bot-1 request: "${message}" (Conversation ID: ${conversationId || 'none'})`);
    await resetGradioClient();
    await new Promise(resolve => setTimeout(resolve, 100));
    const result = await gradioClient.predict('/custom_unmad_satirical_bot_1', { message });
    const [textboxOutput, chatbotOutput] = result.data;
    const cleanTextbox = stripEchoedInput(message, textboxOutput);
    const cleanChatbot = stripEchoedInput(message, chatbotOutput);
    res.json({
      success: true,
      api_name: '/custom_unmad_satirical_bot_1',
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
      api_name: '/custom_unmad_satirical_bot_1',
      message: NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  postSatiricalBot,
  postSatiricalBot1,
  setDependencies
};
