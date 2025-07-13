import React from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ 
  message, 
  setMessage, 
  handleSubmit, 
  loading, 
  activeTab, 
  chatHistory, 
  clearChat 
}) => {
  return (
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
  );
};

export default ChatInput; 