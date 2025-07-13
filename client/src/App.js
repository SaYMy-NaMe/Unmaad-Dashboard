import React from 'react';
import './App.css';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import ApiInfo from './components/ApiInfo';
import ErrorDisplay from './components/ErrorDisplay';
import useChat from './hooks/useChat';

function App() {
  const {
    activeTab,
    setActiveTab,
    message,
    setMessage,
    chatHistory,
    loading,
    error,
    handleSubmit,
    clearChat
  } = useChat();

  return (
    <div className="App">
      <div className="container">
        <Header />
        <div className="card">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <ChatContainer chatHistory={chatHistory} loading={loading} />
          <ChatInput
            message={message}
            setMessage={setMessage}
            handleSubmit={handleSubmit}
            loading={loading}
            activeTab={activeTab}
            chatHistory={chatHistory}
            clearChat={clearChat}
          />
          <ErrorDisplay error={error} />
        </div>
        <ApiInfo activeTab={activeTab} />
      </div>
    </div>
  );
}

export default App;
