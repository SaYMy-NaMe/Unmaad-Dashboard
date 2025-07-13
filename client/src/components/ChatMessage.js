import React from 'react';

const ChatMessage = ({ message }) => {
  const isUser = message.type === 'user';
  const isError = message.type === 'error';
  
  return (
    <div className={`message ${isUser ? 'user-message' : 'bot-message'} ${isError ? 'error-message' : ''}`}>
      <div className="message-header">
        <span className="message-sender">
          {isUser ? '👤 You' : isError ? '❌ Error' : '🤖 Bot'}
        </span>
        <span className="message-time">{message.timestamp}</span>
        {message.endpoint && <span className="message-endpoint">({message.endpoint})</span>}
      </div>
      <div className="message-content">
        {isUser ? message.content : (
          <div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage; 