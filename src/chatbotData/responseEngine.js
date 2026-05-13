// chatbotData/responseEngine.js
// ─────────────────────────────────────────────────────────────
// Public API used by ChatWindow.
// To swap in a real AI API later, replace getBotResponse() body
// with: const result = await fetch('/api/chat', { body: input })
// ─────────────────────────────────────────────────────────────
import { intents, defaultFollowUps } from './intents.js';
import { findBestIntent } from './keywordMatcher.js';

/** Returns a random item from an array */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Detects the best-matching intent for the given user input.
 * Returns the full intent object, or null for fallback.
 */
export function detectIntent(input) {
  const match = findBestIntent(input, intents, 1);
  if (!match) return null;
  return intents.find((i) => i.id === match.id) || null;
}

/**
 * Returns a random response string from an intent's responses array.
 */
export function getRandomResponse(intent) {
  return pickRandom(intent.responses);
}

/**
 * Main entry point — returns { text, followUps }.
 * ChatWindow calls this and uses followUps to render suggestion chips.
 */
export function getBotResponse(userInput, t) {
  const intent = detectIntent(userInput);

  if (intent) {
    if (intent.id === 'greeting' && t) {
      return { text: t('chatbot.greeting'), followUps: intent.followUps || defaultFollowUps };
    }
    return {
      text: getRandomResponse(intent),
      followUps: intent.followUps || defaultFollowUps,
    };
  }

  // Smart fallback
  return {
    text: t ? t('chatbot.fallback') : pickRandom([
      `🤔 I didn't quite catch that! I can help with:\n\n• 🍔 Food ordering\n• 🚗 Ride booking\n• 🛒 Grocery shopping\n• 📦 Order tracking\n\nTry rephrasing or pick a quick action below!`,
    ]),
    followUps: defaultFollowUps,
  };
}

// ─────────────────────────────────────────────────────────────
// Suggested quick-action prompts shown on first open
// ─────────────────────────────────────────────────────────────
export const suggestedPrompts = [
  { label: '🍔 Order Food',     text: 'How do I order food?' },
  { label: '🚗 Book Ride',      text: 'How do I book a ride?' },
  { label: '🛒 Grocery Help',   text: 'How does EliteMart work?' },
  { label: '📦 My Orders',      text: 'Where can I see my orders?' },
  { label: '💰 Delivery Fee',   text: 'How much is delivery fee?' },
  { label: '🧑‍✈️ Become Driver', text: 'How do I become a driver?' },
];

// Map chip labels to natural question text (for post-reply chips)
export const chipToQuestion = {
  '🍔 Order Food':      'How do I order food?',
  '🚗 Book Ride':       'How do I book a ride?',
  '🛒 Grocery Help':    'How does EliteMart work?',
  '🛒 EliteMart':      'How does EliteMart work?',
  '📦 My Orders':       'Where can I see my orders?',
  '📦 Track Order':     'How do I track my order?',
  '💰 Delivery Fee':    'How much is the delivery fee?',
  '💰 Delivery Charge': 'How much is the delivery fee?',
  '⏱️ Delivery Time':   'How long does delivery take?',
  '🤝 Shared Ride':     'How do shared rides work?',
  '🚙 Private Ride':    'How does a private ride work?',
  '🧑‍✈️ Become Driver':  'How do I become a driver?',
  '👥 Group Orders':    'How does group ordering work?',
  '❌ Cancel Order':    'How do I cancel an order?',
  '📞 Contact Support': 'How do I contact support?',
  '👤 My Profile':      'How do I manage my profile?',
  '💰 Ride Cost':       'How much does a ride cost?',
};
