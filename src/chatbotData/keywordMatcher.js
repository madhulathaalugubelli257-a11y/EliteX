// chatbotData/keywordMatcher.js
// ─────────────────────────────────────────────────────────────
// Scoring logic — no ML, no external libraries.
// Each matched keyword = 1 point. Exact phrase match = 3 points.
// Intent with highest score wins.
// ─────────────────────────────────────────────────────────────

/**
 * Tokenizes a string: lowercases, removes punctuation, splits on spaces.
 */
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Calculates a relevance score for a single intent given user input.
 *
 * @param {string} input - raw user message
 * @param {string[]} keywords - intent keyword list
 * @param {string[]} phrases - intent phrase list (bonus weight)
 * @returns {number} score
 */
export function calculateScore(input, keywords = [], phrases = []) {
  const lower = input.toLowerCase();
  const tokens = tokenize(lower);
  let score = 0;

  // Keyword matching — single token hits
  for (const kw of keywords) {
    const kwTokens = tokenize(kw);
    if (kwTokens.length === 1) {
      // Single-word keyword: check token set
      if (tokens.includes(kw)) score += 1;
    } else {
      // Multi-word keyword: check substring in original
      if (lower.includes(kw)) score += 2;
    }
  }

  // Phrase matching — higher weight (3 pts each)
  for (const phrase of phrases) {
    if (lower.includes(phrase.toLowerCase())) score += 3;
  }

  return score;
}

/**
 * Given the full intents array, returns the best-matching intent id
 * and its score. Returns null if nothing scores above threshold.
 *
 * @param {string} input
 * @param {Array} intents
 * @param {number} threshold - minimum score to be considered a match
 * @returns {{ id: string, score: number } | null}
 */
export function findBestIntent(input, intents, threshold = 1) {
  let best = null;
  let bestScore = 0;

  for (const intent of intents) {
    const score = calculateScore(input, intent.keywords, intent.phrases);
    if (score > bestScore) {
      bestScore = score;
      best = { id: intent.id, score };
    }
  }

  return bestScore >= threshold ? best : null;
}
