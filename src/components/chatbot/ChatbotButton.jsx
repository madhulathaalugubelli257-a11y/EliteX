// components/chatbot/ChatbotButton.jsx
export default function ChatbotButton({ isOpen, onClick }) {
  return (
    <button
      id="chatbot-fab"
      className={`chatbot-fab ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close EliteBot' : 'Open EliteBot'}
      title="EliteBot — Your Campus Assistant"
      type="button"
    >
      <span className="fab-icon fab-chat-icon" aria-hidden="true">
        💬
      </span>
      <span className="fab-icon fab-close-icon" aria-hidden="true">
        ✕
      </span>
      {/* Pulse ring shown when closed */}
      {!isOpen && <span className="fab-pulse" aria-hidden="true" />}
    </button>
  );
}
