import { useState } from 'react';
import axios from 'axios';
import { getEndpointConfig, processBotResponse } from '../utils/helpers';

const useChat = () => {
  const [activeTab, setActiveTab] = useState('satirical-bot');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
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