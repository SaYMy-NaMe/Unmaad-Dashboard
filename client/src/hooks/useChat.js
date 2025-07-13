import { useState } from 'react';
import axios from 'axios';
import { getEndpointConfig, processBotResponse } from '../utils/helpers';

const useChat = () => {
  const [activeTab, setActiveTab] = useState('satirical-bot');
  const [message, setMessage] = useState('');
  const [chatHistories, setChatHistories] = useState({
    'satirical-bot': [],
    'satirical-bot-1': [],
    'lambda': []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get current tab's chat history
  const chatHistory = chatHistories[activeTab] || [];

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    // Only require message for non-lambda tabs
    if (activeTab !== 'lambda' && !message.trim()) return;

    // For Lambda, we don't need a user message since it's a simple API call
    if (activeTab !== 'lambda') {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: message,
        timestamp: new Date().toLocaleTimeString()
      };

      // Update chat history for the current tab
      setChatHistories(prev => ({
        ...prev,
        [activeTab]: [...(prev[activeTab] || []), userMessage]
      }));
    }
    
    setLoading(true);
    setError(null);

    try {
      const config = getEndpointConfig(activeTab, message);
      const result = await axios(config);
      const botResponse = processBotResponse(result, message);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date().toLocaleTimeString(),
        endpoint: activeTab
      };
      
      // Update chat history for the current tab
      setChatHistories(prev => ({
        ...prev,
        [activeTab]: [...(prev[activeTab] || []), botMessage]
      }));
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'error',
        content: err.response?.data?.error || err.message || 'Something went wrong',
        timestamp: new Date().toLocaleTimeString()
      };
      
      // Update chat history for the current tab
      setChatHistories(prev => ({
        ...prev,
        [activeTab]: [...(prev[activeTab] || []), errorMessage]
      }));
    } finally {
      setLoading(false);
      setMessage('');
    }
  };

  const clearChat = () => {
    // Clear chat history for the current tab only
    setChatHistories(prev => ({
      ...prev,
      [activeTab]: []
    }));
    setError(null);
  };

  return {
    activeTab,
    setActiveTab,
    message,
    setMessage,
    chatHistory,
    loading,
    error,
    handleSubmit,
    clearChat
  };
};

export default useChat; 