// Controller for /api/lambda

let gradioClient;
let clientConnectionStatus;
let resetGradioClient;
let NODE_ENV;

function setDependencies(deps) {
  gradioClient = deps.gradioClient;
  clientConnectionStatus = deps.clientConnectionStatus;
  resetGradioClient = deps.resetGradioClient;
  NODE_ENV = deps.NODE_ENV;
}

const getLambda = async (req, res) => {
  try {
    if (clientConnectionStatus() !== 'connected') {
      return res.status(503).json({
        error: 'Gradio client not connected',
        status: clientConnectionStatus(),
        message: 'Please try again later or check server logs'
      });
    }
    console.log('🔄 Processing lambda request');
    await resetGradioClient();
    const result = await gradioClient.predict('/lambda', {});
    const [chatbotOutput, textboxOutput] = result.data;
    res.json({
      success: true,
      api_name: '/lambda',
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
      api_name: '/lambda',
      message: NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  getLambda,
  setDependencies
};
