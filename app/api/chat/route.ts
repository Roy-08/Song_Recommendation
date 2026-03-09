import { NextRequest, NextResponse } from "next/server";

interface ChatRequest {
  message: string;
  mood: string;
  userName: string;
}

// AI-powered response generation using mood analysis and conversational prompts
function generateAIResponse(params: ChatRequest): { reply: string; suggestSongs: boolean } {
  const { message, mood, userName } = params;
  const name = userName || "friend";
  const lowerMessage = message.toLowerCase();

  // Check if user is asking for song suggestions
  const wantsSongs = lowerMessage.includes("song") || lowerMessage.includes("music") ||
    lowerMessage.includes("play") || lowerMessage.includes("recommend") ||
    lowerMessage.includes("suggest") || lowerMessage.includes("listen") ||
    lowerMessage.includes("gaana") || lowerMessage.includes("gana");

  // Check if user wants to just talk / needs emotional support
  const wantsTalk = lowerMessage.includes("talk") || lowerMessage.includes("chat") ||
    lowerMessage.includes("help") || lowerMessage.includes("advice") ||
    lowerMessage.includes("what should i do") || lowerMessage.includes("tell me");

  // Check for greetings
  const isGreeting = lowerMessage.match(/^(hi|hello|hey|sup|yo|namaste|hola|howdy)/);

  // Check for gratitude
  const isThankful = lowerMessage.match(/(thank|thanks|thx|shukriya|dhanyavaad)/);

  if (isGreeting) {
    return {
      reply: `Hey ${name}! 👋 Great to see you!\n\nI'm Peakbot, your AI music companion. I can:\n\n🎵 **Recommend songs** based on your mood\n💬 **Chat** about how you're feeling\n🧘 **Help you relax** with calming suggestions\n💪 **Motivate you** when you need a boost\n\nSo, how are you feeling right now? Tell me anything!`,
      suggestSongs: false,
    };
  }

  if (isThankful) {
    return {
      reply: `You're welcome, ${name}! 😊 I'm always here for you. Feel free to tell me your mood anytime and I'll find the perfect music for you! 🎵`,
      suggestSongs: false,
    };
  }

  // Mood-specific AI responses with emotional intelligence
  const moodResponses: Record<string, { talk: string[]; songs: string[]; default: string[] }> = {
    happy: {
      talk: [
        `I love that energy, ${name}! 🌟 Happiness is contagious and you're spreading it right now!\n\nHere's a thought: **capture this moment**. Write down what made you happy today. On tough days, reading it back can be a real mood booster.\n\nWant me to find some songs to amplify these good vibes? 🎶`,
        `${name}, your happiness is radiating through the screen! 😄✨\n\n**Fun fact**: Listening to upbeat music when you're already happy can actually make you feel even better — it's called emotional amplification!\n\nShall I play some feel-good tracks for you?`,
      ],
      songs: [
        `Absolutely, ${name}! 🎉 Your happy mood deserves the perfect soundtrack!\n\nI've picked some **upbeat, feel-good tracks** that'll keep your energy high. These songs are all about celebrating life and good vibes! 🕺💃`,
        `Let's keep this party going, ${name}! 🥳\n\nHere are some **handpicked happy songs** — from Bollywood bangers to international hits. Turn up the volume! 🔊`,
      ],
      default: [
        `That's amazing, ${name}! 🎉 Your positive energy is contagious!\n\nHere are some songs to keep the vibes going! Music + happiness = pure magic ✨`,
        `Love the happy energy, ${name}! 😊 Let me find some tracks that match your awesome mood! 🎵`,
      ],
    },
    sad: {
      talk: [
        `I hear you, ${name}. 💙 It's completely okay to feel this way — your feelings are valid.\n\nHere are some things that might help:\n\n1. 🫂 **Talk it out** — I'm here to listen\n2. 🎵 **Music therapy** — sometimes the right song says what we can't\n3. 🧘 **Breathing exercise** — try our Relaxation Mode\n4. 📝 **Write it down** — journaling can be incredibly healing\n\nWhat would you like to try?`,
        `${name}, I'm sorry you're going through this. 🫂\n\n**Remember**: Sadness is not weakness — it's proof that you feel deeply, and that's a beautiful thing.\n\nWould you like me to play some comforting music, or would you prefer to talk about what's on your mind?`,
      ],
      songs: [
        `Here are some songs that understand what you're feeling, ${name}. 💜\n\nSometimes the best therapy is knowing that someone else has felt the same way and turned it into beautiful music. Let these melodies comfort you. 🎧`,
        `Music has a way of healing, ${name}. 🌙\n\nI've selected some **soulful tracks** that match your mood — they're like a warm hug in song form. Take your time with them. 💙`,
      ],
      default: [
        `I'm sorry you're feeling this way, ${name}. 💙 Music can be a great comfort. Here are some songs that understand your feelings.`,
        `I hear you, ${name}. It's okay to feel sad sometimes. 🫂 Let me play something that might help.`,
      ],
    },
    angry: {
      talk: [
        `I can feel the intensity, ${name}. 🔥 Anger is a powerful emotion, and it's important to channel it constructively.\n\nHere are some healthy ways to deal with it:\n\n1. 💪 **Physical activity** — even a quick walk helps\n2. 🎵 **Power music** — let the beats absorb your energy\n3. 🧘 **Deep breathing** — try our Relaxation Mode\n4. 📝 **Express it** — write down what's bothering you\n\nWhat sounds good to you?`,
        `${name}, your feelings are valid. 💨\n\n**Pro tip**: Sometimes the best way to handle anger is to acknowledge it, feel it fully, and then let it go. Music can be an incredible outlet for this.\n\nWant me to play some high-energy tracks to help you release this energy?`,
      ],
      songs: [
        `Let's channel that energy, ${name}! 🔥\n\nHere are some **powerful tracks** — they're intense, raw, and perfect for when you need to let it all out. Turn it up! 🎸`,
        `Sometimes you need music that matches your intensity, ${name}. 💥\n\nThese tracks are all about power and release. Let the music do the talking!`,
      ],
      default: [
        `I can feel the intensity, ${name}! 🔥 Let's channel that energy with some powerful tracks.`,
        `Take a deep breath, ${name}. 💨 Sometimes powerful music helps process these feelings.`,
      ],
    },
    calm: {
      talk: [
        `What a beautiful state of mind, ${name}. 🧘✨\n\nCalmness is a superpower in today's chaotic world. Here are some ways to deepen this peace:\n\n1. 🎵 **Ambient music** — enhance the tranquility\n2. 🌿 **Mindful moment** — focus on your breathing for 30 seconds\n3. 📖 **Gratitude** — think of 3 things you're grateful for right now\n\nWant me to play some peaceful melodies?`,
      ],
      songs: [
        `Let me enhance this peaceful vibe, ${name}. 🌊\n\nHere are some **serene melodies** — perfect for meditation, reading, or just being present in the moment. Enjoy the tranquility. 🕊️`,
      ],
      default: [
        `What a peaceful state of mind, ${name}. 🧘 Let me enhance this tranquility with some beautiful melodies.`,
        `Serenity looks good on you, ${name}! ☮️ Here are some songs to maintain this zen vibe.`,
      ],
    },
    stressed: {
      talk: [
        `I understand the pressure, ${name}. 🫂 Stress is your body's way of saying "I need a break."\n\nHere's what I suggest:\n\n1. 🧘 **Breathing exercise** — try our Relaxation Mode (it really works!)\n2. 🎵 **Calming music** — scientifically proven to reduce cortisol\n3. 🚶 **Take a walk** — even 5 minutes can reset your mind\n4. 💧 **Hydrate** — stress often worsens with dehydration\n\n**Remember**: You've handled tough situations before, and you'll handle this too. 💪\n\nWhat would help you most right now?`,
      ],
      songs: [
        `Let's melt that stress away, ${name}. 🌅\n\nHere are some **calming tracks** — they're scientifically curated to lower your heart rate and help you relax. Take a deep breath and press play. 🎧`,
      ],
      default: [
        `I understand the pressure, ${name}. 🫂 Let's take a moment to breathe. Here are some calming tracks.`,
        `Stress is temporary, ${name}. 💪 Let me help you unwind with some soothing music.`,
      ],
    },
    motivated: {
      talk: [
        `That's the spirit, ${name}! ⚡🔥\n\nYou're in beast mode and I love it! Here's how to maximize this energy:\n\n1. 🎵 **Power playlist** — fuel the fire with anthems\n2. 📝 **Set a goal** — write down ONE thing you'll accomplish today\n3. 💪 **Take action** — momentum builds momentum\n\n**Quote of the day**: "The only way to do great work is to love what you do." — Steve Jobs\n\nReady for some power tracks? 🚀`,
      ],
      songs: [
        `Let's GO, ${name}! 🚀⚡\n\nHere are some **power anthems** to fuel your hustle. These tracks are pure adrenaline — perfect for crushing goals! 💪🔥`,
      ],
      default: [
        `That's the spirit, ${name}! ⚡ Let's fuel that fire with some power anthems!`,
        `Unstoppable energy, ${name}! 🚀 Here are songs to keep you crushing it!`,
      ],
    },
    romantic: {
      talk: [
        `Aww, love is a beautiful thing, ${name}! 💕✨\n\nWhether you're thinking about someone special or just feeling the love vibes, here's what I suggest:\n\n1. 🎵 **Romantic playlist** — set the perfect mood\n2. 💌 **Express yourself** — tell that special someone how you feel\n3. 🌹 **Self-love** — romance starts with loving yourself\n\nShall I play some love songs for you? 🎶`,
      ],
      songs: [
        `Love is in the air, ${name}! 💕🌹\n\nHere are some **romantic melodies** — from soulful Bollywood ballads to international love songs. Perfect for those butterflies in your stomach! 🦋`,
      ],
      default: [
        `Aww, love is in the air, ${name}! 💕 Here are some romantic melodies for your heart.`,
        `Feeling the love vibes, ${name}! 🌹 Let me set the perfect romantic playlist for you.`,
      ],
    },
    neutral: {
      talk: [
        `Hey ${name}! 🎵 I'd love to help you find the perfect music.\n\nTell me more about:\n- **How you're feeling** right now\n- **What kind of music** you're in the mood for\n- Or just **chat** — I'm a great listener! 😊\n\nYou can also try our **Mood Camera** 📸 or **Relaxation Mode** 🧘 from the sidebar!`,
      ],
      songs: [
        `Sure thing, ${name}! 🎶\n\nSince you're in a neutral mood, here's a **mix of popular tracks** across different genres. Something here will definitely catch your ear! 🎧`,
      ],
      default: [
        `Hey ${name}! 🎵 Tell me more about how you're feeling, or I can recommend some trending songs!`,
        `Hi ${name}! What kind of music are you in the mood for today? 🎶`,
      ],
    },
  };

  const moodData = moodResponses[mood] || moodResponses.neutral;

  if (wantsTalk && !wantsSongs) {
    const responses = moodData.talk;
    return {
      reply: responses[Math.floor(Math.random() * responses.length)],
      suggestSongs: false,
    };
  }

  if (wantsSongs) {
    const responses = moodData.songs;
    return {
      reply: responses[Math.floor(Math.random() * responses.length)],
      suggestSongs: true,
    };
  }

  // Default: provide emotional response + songs
  const responses = moodData.default;
  return {
    reply: responses[Math.floor(Math.random() * responses.length)],
    suggestSongs: true,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();

    const { message, mood, userName } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Simulate AI processing delay for natural feel
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));

    const result = generateAIResponse({
      message,
      mood: mood || "neutral",
      userName: userName || "friend",
    });

    return NextResponse.json({
      success: true,
      reply: result.reply,
      suggestSongs: result.suggestSongs,
      detectedMood: mood,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}