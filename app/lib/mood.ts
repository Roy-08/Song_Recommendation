// Sentiment analysis keywords for real-time mood detection
const moodKeywords: Record<string, string[]> = {
  happy: [
    "happy", "joy", "excited", "amazing", "wonderful", "great", "love", "awesome",
    "fantastic", "celebrate", "party", "fun", "laugh", "smile", "blessed", "grateful",
    "khush", "mast", "badhiya", "zabardast", "maza", "dhamaal",
  ],
  sad: [
    "sad", "depressed", "lonely", "heartbroken", "cry", "tears", "miss", "pain",
    "hurt", "broken", "lost", "grief", "sorrow", "alone", "empty", "hopeless",
    "dukhi", "udaas", "rona", "tanha", "dard", "toota",
  ],
  angry: [
    "angry", "furious", "mad", "hate", "frustrated", "annoyed", "irritated",
    "rage", "pissed", "disgusted", "fed up", "sick of",
    "gussa", "naraz", "chidha",
  ],
  calm: [
    "calm", "peaceful", "relaxed", "serene", "quiet", "gentle", "soft",
    "meditate", "breathe", "zen", "chill", "easy", "soothing",
    "sukoon", "chain", "shanti", "aram",
  ],
  stressed: [
    "stressed", "anxious", "worried", "nervous", "tense", "overwhelmed",
    "pressure", "deadline", "panic", "restless", "uneasy",
    "tension", "pareshaan", "chinta",
  ],
  motivated: [
    "motivated", "pumped", "energetic", "strong", "powerful", "determined",
    "workout", "gym", "run", "hustle", "grind", "beast", "fire",
    "josh", "himmat", "hausla",
  ],
  romantic: [
    "love", "romantic", "crush", "date", "valentine", "heart", "darling",
    "sweetheart", "babe", "miss you", "together",
    "pyaar", "ishq", "mohabbat", "dil",
  ],
};

export interface MoodScore {
  mood: string;
  score: number;
  color: string;
}

const moodColors: Record<string, string> = {
  happy: "#10b981",
  sad: "#6366f1",
  angry: "#ef4444",
  calm: "#06b6d4",
  stressed: "#f59e0b",
  motivated: "#f97316",
  romantic: "#ec4899",
  neutral: "#94a3b8",
};

export function analyzeMood(text: string): MoodScore[] {
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  const scores: Record<string, number> = {};

  Object.entries(moodKeywords).forEach(([mood, keywords]) => {
    let score = 0;
    keywords.forEach((keyword) => {
      if (keyword.includes(" ")) {
        if (lower.includes(keyword)) score += 2;
      } else {
        words.forEach((word) => {
          if (word.includes(keyword)) score += 1;
        });
      }
    });
    if (score > 0) {
      scores[mood] = score;
    }
  });

  if (Object.keys(scores).length === 0) {
    return [{ mood: "neutral", score: 1, color: moodColors.neutral }];
  }

  const maxScore = Math.max(...Object.values(scores));

  return Object.entries(scores)
    .map(([mood, score]) => ({
      mood,
      score: Math.round((score / maxScore) * 10),
      color: moodColors[mood] || moodColors.neutral,
    }))
    .sort((a, b) => b.score - a.score);
}

export function getDominantMood(text: string): string {
  const scores = analyzeMood(text);
  return scores[0]?.mood || "neutral";
}

export function getMoodEmoji(mood: string): string {
  const emojis: Record<string, string> = {
    happy: "😊",
    sad: "😢",
    angry: "😤",
    calm: "😌",
    stressed: "😰",
    motivated: "💪",
    romantic: "❤️",
    neutral: "😐",
    excited: "🤩",
    melancholy: "🥀",
  };
  return emojis[mood] || "🎵";
}

export function getMoodColor(mood: string): string {
  return moodColors[mood] || moodColors.neutral;
}

export function generateBotResponse(mood: string, userName?: string): string {
  const name = userName || "friend";
  const responses: Record<string, string[]> = {
    happy: [
      `That's amazing, ${name}! 🎉 Your positive energy is contagious! Here are some songs to keep the vibes going!`,
      `Love the happy energy, ${name}! 😊 Let me find some tracks that match your awesome mood!`,
      `You're glowing, ${name}! ✨ Here are some feel-good songs just for you!`,
    ],
    sad: [
      `I'm sorry you're feeling this way, ${name}. 💙 Music can be a great comfort. Would you like:\n\n1️⃣ Calm music to soothe\n2️⃣ Breathing exercise\n3️⃣ Motivational songs to lift you up`,
      `I hear you, ${name}. It's okay to feel sad sometimes. 🫂 Let me play something that understands your feelings.`,
      `Sending you a warm hug, ${name}. 💜 Here are some songs that might help you feel better.`,
    ],
    angry: [
      `I can feel the intensity, ${name}! 🔥 Let's channel that energy. Would you like:\n\n1️⃣ High-energy songs to release\n2️⃣ Calming music to cool down\n3️⃣ A quick breathing exercise`,
      `Take a deep breath, ${name}. 💨 Sometimes powerful music helps process these feelings. Here are some tracks for you.`,
    ],
    calm: [
      `What a peaceful state of mind, ${name}. 🧘 Let me enhance this tranquility with some beautiful melodies.`,
      `Serenity looks good on you, ${name}! ☮️ Here are some songs to maintain this zen vibe.`,
    ],
    stressed: [
      `I understand the pressure, ${name}. 🫂 Let's take a moment to breathe. Would you like:\n\n1️⃣ Calming music\n2️⃣ 30-second relaxation session\n3️⃣ Motivational boost`,
      `Stress is temporary, ${name}. 💪 Let me help you unwind with some soothing tracks.`,
    ],
    motivated: [
      `That's the spirit, ${name}! ⚡ Let's fuel that fire with some power anthems!`,
      `Unstoppable energy, ${name}! 🚀 Here are songs to keep you crushing it!`,
    ],
    romantic: [
      `Aww, love is in the air, ${name}! 💕 Here are some romantic melodies for your heart.`,
      `Feeling the love vibes, ${name}! 🌹 Let me set the perfect romantic playlist for you.`,
    ],
    neutral: [
      `Hey ${name}! 🎵 Tell me more about how you're feeling, or I can recommend some trending songs!`,
      `Hi ${name}! What kind of music are you in the mood for today? 🎶`,
    ],
  };

  const moodResponses = responses[mood] || responses.neutral;
  return moodResponses[Math.floor(Math.random() * moodResponses.length)];
}