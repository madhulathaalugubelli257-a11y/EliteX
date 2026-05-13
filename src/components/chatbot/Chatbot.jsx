// components/chatbot/Chatbot.jsx
// Root wrapper — manages open/close state only
import { useState } from 'react';
import ChatbotButton from './ChatbotButton';
import ChatWindow from './ChatWindow';
import '../../styles/Chatbot.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chatbot-container" aria-label="EliteBot widget">
      {/* Animated chat window */}
      <div className={`chat-window-wrapper ${isOpen ? 'visible' : ''}`}>
        {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      </div>

      {/* Floating action button */}
      <ChatbotButton isOpen={isOpen} onClick={() => setIsOpen((o) => !o)} />
    </div>
  );
}
