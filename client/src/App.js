import React, { useState } from 'react';
import axios from 'axios';
import { Send, Bot, Zap, MessageCircle } from 'lucide-react';
import './App.css';

// Helper function to strip echoed input from bot response
const stripEchoedInput = (userMessage, botResponse) => {
  if (!botResponse || typeof botResponse !== 'string') return botResponse;
  
  const userMsg = userMessage.trim().toLowerCase();
  const botResp = botResponse.trim();
  
  if (botResp.toLowerCase().startsWith(userMsg)) {
    return botResp.slice(userMsg.length).trim();
  }
  return botResponse;
};

function App() {
  const [activeTab, setActiveTab] = useState('satirical-bot');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
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
        url: endpoint,
        ...(activeTab !== 'lambda' && { 
          data: { 
            message,
            conversationId: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString()
          } 
        })
      };

      const result = await axios(config);
      
      let botResponse = '';
      if (result.data.output) {
        if (result.data.output.textbox_value) {
          botResponse = stripEchoedInput(message, result.data.output.textbox_value);
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
          botResponse = stripEchoedInput(message, chatbotValue);
        }
      } else if (result.data.response) {
        botResponse = JSON.stringify(result.data.response, null, 2);
      } else {
        botResponse = 'No response received';
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date().toLocaleTimeString(),
        endpoint: activeTab
      };

      setChatHistory(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'error',
        content: err.response?.data?.error || err.message || 'Something went wrong',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setMessage('');
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    setError(null);
  };

  const renderMessage = (msg) => {
    const isUser = msg.type === 'user';
    const isError = msg.type === 'error';
    
    return (
      <div key={msg.id} className={`message ${isUser ? 'user-message' : 'bot-message'} ${isError ? 'error-message' : ''}`}>
        <div className="message-header">
          <span className="message-sender">
            {isUser ? '👤 You' : isError ? '❌ Error' : '🤖 Bot'}
          </span>
          <span className="message-time">{msg.timestamp}</span>
          {msg.endpoint && <span className="message-endpoint">({msg.endpoint})</span>}
        </div>
        <div className="message-content">
          {isUser ? msg.content : (
            <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <h1>🤖 Unmaad Satirical Bot</h1>
        </div>

        <div className="card">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'satirical-bot' ? 'active' : ''}`}
              onClick={() => setActiveTab('satirical-bot')}
            >
              <Bot size={16} />
              Satirical Bot
            </button>
            <button
              className={`tab ${activeTab === 'satirical-bot-1' ? 'active' : ''}`}
              onClick={() => setActiveTab('satirical-bot-1')}
            >
              <MessageCircle size={16} />
              Satirical Bot 1
            </button>
            <button
              className={`tab ${activeTab === 'lambda' ? 'active' : ''}`}
              onClick={() => setActiveTab('lambda')}
            >
              <Zap size={16} />
              Lambda
            </button>
          </div>

          {/* Chat History */}
          <div className="chat-container">
            {chatHistory.length === 0 ? (
              <div className="empty-chat">
                <p>Start a conversation by sending a message below!</p>
              </div>
            ) : (
              <div className="chat-messages">
                {chatHistory.map(renderMessage)}
                {loading && (
                  <div className="message bot-message">
                    <div className="message-header">
                      <span className="message-sender">🤖 Bot</span>
                      <span className="message-time">{new Date().toLocaleTimeString()}</span>
                    </div>
                    <div className="message-content">
                      <div className="loading-spinner"></div>
                      Processing...
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="chat-input-form">
            {activeTab !== 'lambda' && (
              <textarea
                className="input"
                placeholder="Enter your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                disabled={loading}
              />
            )}
            
            <div className="input-actions">
              <button
                type="submit"
                className="btn"
                disabled={loading || (activeTab !== 'lambda' && !message.trim())}
              >
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {activeTab === 'lambda' ? 'Call Lambda' : 'Send Message'}
                  </>
                )}
              </button>
              
              {chatHistory.length > 0 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={clearChat}
                >
                  Clear Chat
                </button>
              )}
            </div>
          </form>

          {error && (
            <div className="error">
              ❌ Error: {error}
            </div>
          )}
        </div>

        <div className="card">
          <h3>📋 API Information</h3>
          <div className="api-info">
            <p><strong>Current Endpoint:</strong> {activeTab}</p>
            <p><strong>Method:</strong> {activeTab === 'lambda' ? 'GET' : 'POST'}</p>
            <p><strong>Parameters:</strong> {activeTab === 'lambda' ? 'None' : 'message (string)'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
