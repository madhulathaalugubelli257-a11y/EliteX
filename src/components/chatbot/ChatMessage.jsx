// components/chatbot/ChatMessage.jsx
import React from 'react';

/**
 * Parses **bold** markdown syntax into <strong> elements.
 * Handles multi-line messages with newlines preserved.
 */
function parseMarkdown(text) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <React.Fragment key={i}>
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong key={j}>{part.slice(2, -2)}</strong>
          ) : (
            part
          )
        )}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export default function ChatMessage({ message }) {
  const isBot = message.sender === 'bot';

  return (
    <div className={`chat-message ${isBot ? 'bot' : 'user'}`}>
      {isBot && (
        <div className="bot-avatar" aria-label="EliteBot">
          🤖
        </div>
      )}
      <div className="message-bubble">
        <p className="message-text">{parseMarkdown(message.text)}</p>
        <span className="message-time">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}
