// components/chatbot/ChatWindow.jsx
import { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestedPrompts from './SuggestedPrompts';
import { getBotResponse, suggestedPrompts, chipToQuestion } from '../../chatbotData/responseEngine';
import { useLanguage } from '../../context/LanguageContext';

function getWelcomeMessage(t) {
  return {
    id: 'welcome',
    sender: 'bot',
    text: t ? t('chatbot.greeting') : `👋 Hi! I'm **EliteBot** — your smart campus assistant!\n\nI can help with food ordering, rides, groceries, delivery times, and more.\n\nTry a quick action below or just type your question! 😊`,
    timestamp: Date.now(),
    followUps: [],
  };
}

function TypingIndicator() {
  return (
    <div className="chat-message bot typing-row">
      <div className="bot-avatar">🤖</div>
      <div className="message-bubble typing-bubble">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}

/** Inline follow-up chips shown beneath a bot reply */
function FollowUpChips({ chips, onSelect }) {
  if (!chips || chips.length === 0) return null;
  return (
    <div className="followup-chips">
      {chips.map((chip) => (
        <button
          key={chip}
          className="prompt-chip followup-chip"
          type="button"
          onClick={() => onSelect(chip)}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

export default function ChatWindow({ onClose }) {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState([getWelcomeMessage(t)]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function addBotMessage(text, followUps = []) {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, sender: 'bot', text, timestamp: Date.now(), followUps },
    ]);
  }

  function handleUserMessage(text) {
    const userMsg = { id: Date.now(), sender: 'user', text, timestamp: Date.now(), followUps: [] };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setShowSuggestions(false);

    // Variable typing delay feels more natural
    const delay = 600 + Math.random() * 700;
    setTimeout(() => {
      const { text: reply, followUps } = getBotResponse(text, t);
      setIsTyping(false);
      addBotMessage(reply, followUps);
    }, delay);
  }

  function handleChipClick(chip) {
    // Map chip label → natural question text
    const question = chipToQuestion[chip] || chip;
    handleUserMessage(question);
  }

  function handleClear() {
    setMessages([getWelcomeMessage(t)]);
    setShowSuggestions(true);
  }

  return (
    <div className="chat-window" role="dialog" aria-label="EliteBot chat window">
      {/* ── Header ── */}
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="chat-avatar-large">🤖</div>
          <div>
            <h4 className="chat-title">EliteBot</h4>
            <span className="chat-status">
              <span className="status-dot" />
              Online — always here to help
            </span>
          </div>
        </div>
        <div className="chat-header-actions">
          <button className="chat-header-btn" onClick={handleClear} title="Clear chat" aria-label="Clear chat" type="button">🗑️</button>
          <button className="chat-header-btn close-btn" onClick={onClose} title="Close" aria-label="Close chatbot" type="button">✕</button>
        </div>
      </div>

      {/* ── Messages ── */}
      <div className="chat-messages" role="log" aria-live="polite">
        {messages.map((msg) => (
          <div key={msg.id}>
            <ChatMessage message={msg} />
            {msg.sender === 'bot' && (
              <FollowUpChips chips={msg.followUps} onSelect={handleChipClick} />
            )}
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* ── Opening suggestions ── */}
      {showSuggestions && (
        <SuggestedPrompts prompts={suggestedPrompts} onSelect={(text) => handleUserMessage(text)} />
      )}

      {/* ── Input ── */}
      <ChatInput onSend={handleUserMessage} disabled={isTyping} t={t} />
    </div>
  );
}
