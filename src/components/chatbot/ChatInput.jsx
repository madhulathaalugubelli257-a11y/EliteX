// components/chatbot/ChatInput.jsx
import { useState } from 'react';

export default function ChatInput({ onSend, disabled, t }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  }

  return (
    <form className="chat-input-form" onSubmit={handleSubmit} aria-label="Send a message">
      <input
        id="chatbot-input"
        className="chat-input-field"
        type="text"
        placeholder={t ? t('chatbot.placeholder') : "Ask me anything…"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoComplete="off"
        aria-label="Chat message input"
        maxLength={300}
      />
      <button
        id="chatbot-send-btn"
        className="chat-send-btn"
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="18"
          height="18"
          aria-hidden="true"
        >
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </form>
  );
}
