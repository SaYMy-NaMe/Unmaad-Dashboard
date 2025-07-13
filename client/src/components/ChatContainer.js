import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

const ChatContainer = ({ chatHistory, loading }) => {
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, loading]);

  return (
    <div className="chat-container" ref={chatContainerRef}>
      {chatHistory.length === 0 ? (
        <div className="empty-chat">
          <p>Start a conversation by sending a message below!</p>
        </div>
      ) : (
        <div className="chat-messages">
          {chatHistory.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
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
  );
};

export default ChatContainer; 