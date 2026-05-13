// components/chatbot/SuggestedPrompts.jsx
export default function SuggestedPrompts({ prompts = [], onSelect }) {
  if (!prompts.length) return null;
  return (
    <div className="suggested-prompts" aria-label="Suggested questions">
      {prompts.map((prompt, idx) => (
        <button
          key={idx}
          className="prompt-chip"
          onClick={() => onSelect(prompt.text)}
          type="button"
          aria-label={`Quick action: ${prompt.label}`}
        >
          {prompt.label}
        </button>
      ))}
    </div>
  );
}
