import { buildApiUrl } from './baseUrl';

// Helper function to strip echoed input from bot response
export const stripEchoedInput = (userMessage, botResponse) => {
  if (!botResponse || typeof botResponse !== 'string') return botResponse;
  
  const userMsg = userMessage.trim().toLowerCase();
  const botResp = botResponse.trim();
  
  if (botResp.toLowerCase().startsWith(userMsg)) {
    return botResp.slice(userMsg.length).trim();
  }
  return botResponse;
};

// Helper function to process bot response
export const processBotResponse = (result, message) => {
  let botResponse = '';
  
  if (result.data.output) {
    if (result.data.output.textbox_value) {
      // For Lambda, don't strip echoed input since there's no user message
      botResponse = message ? stripEchoedInput(message, result.data.output.textbox_value) : result.data.output.textbox_value;
    } else if (result.data.output.chatbot_value) {
      // Handle chatbot_value which might be an array
      let chatbotValue = result.data.output.chatbot_value;
      if (Array.isArray(chatbotValue) && chatbotValue.length > 0) {
        // If it's an array of arrays, get the last message
        if (Array.isArray(chatbotValue[0])) {
          chatbotValue = chatbotValue[0][chatbotValue[0].length - 1] || '';
        } else {
          chatbotValue = chatbotValue[chatbotValue.length - 1] || '';
        }
      }
      // For Lambda, don't strip echoed input since there's no user message
      botResponse = message ? stripEchoedInput(message, chatbotValue) : chatbotValue;
    }
  } else if (result.data.response) {
    botResponse = JSON.stringify(result.data.response, null, 2);
  } else {
    botResponse = 'No response received';
  }
  
  return botResponse;
};

// Helper function to get endpoint configuration
export const getEndpointConfig = (activeTab, message) => {
  let endpoint = '';
  switch (activeTab) {
    case 'satirical-bot':
      endpoint = '/api/satirical-bot';
      break;
    case 'satirical-bot-1':
      endpoint = '/api/satirical-bot-1';
      break;
    case 'lambda':
      endpoint = '/api/lambda';
      break;
    default:
      endpoint = '/api/satirical-bot';
  }

  const config = {
    method: activeTab === 'lambda' ? 'get' : 'post',
    url: buildApiUrl(endpoint),
    ...(activeTab !== 'lambda' && { 
      data: { 
        message,
        conversationId: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString()
      } 
    })
  };

  return config;
}; 