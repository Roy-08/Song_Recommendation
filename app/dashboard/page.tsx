/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ChatMessage from "@/app/components/ChatMessage";
import MoodMeter from "@/app/components/MoodMeter";
import { analyzeMood, getDominantMood, MoodScore } from "@/app/lib/mood";
import { getSongsByMood, Song } from "@/app/lib/songs";
import { useAuth } from "@/app/lib/auth-context";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  songs?: Song[];
  mood?: string;
}

export default function ChatPage() {
  const { user, addMoodEntry, addSongPlay } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: `Hey ${user?.name || "there"}! 🎵 I'm Peakbot, your AI music companion.\n\nTell me how you're feeling, and I'll recommend the perfect songs for your mood!\n\nYou can also try:\n• "I feel happy today"\n• "I'm stressed about work"\n• "Play something romantic"\n• "I need motivation"`,
    },
  ]);
  const [input, setInput] = useState("");
  const [liveMoodScores, setLiveMoodScores] = useState<MoodScore[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Live mood detection while typing
  useEffect(() => {
    if (input.trim().length > 2) {
      const scores = analyzeMood(input);
      setLiveMoodScores(scores);
    } else {
      setLiveMoodScores([]);
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setLiveMoodScores([]);

    const mood = getDominantMood(userMessage);
    addMoodEntry(mood);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      mood,
    };
    setMessages((prev) => [...prev, userMsg]);

    // Bot typing indicator
    setIsTyping(true);

    try {
      // Call AI chat API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          mood,
          userName: user?.name || "friend",
        }),
      });

      const data = await response.json();
      const botContent = data.reply || generateFallbackResponse(mood, user?.name);
      const songs = getSongsByMood(mood, 4);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: botContent,
        songs: data.suggestSongs !== false ? songs : undefined,
        mood,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // Fallback to local response if API fails
      const songs = getSongsByMood(mood, 4);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: generateFallbackResponse(mood, user?.name),
        songs,
        mood,
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }
  };

  const generateFallbackResponse = (mood: string, userName?: string): string => {
    const name = userName || "friend";
    const responses: Record<string, string[]> = {
      happy: [
        `That's amazing, ${name}! 🎉 Your positive energy is contagious! Here are some songs to keep the vibes going!`,
        `Love the happy energy, ${name}! 😊 Let me find some tracks that match your awesome mood!`,
      ],
      sad: [
        `I'm sorry you're feeling this way, ${name}. 💙 Music can be a great comfort. Here are some songs that understand your feelings.`,
        `I hear you, ${name}. It's okay to feel sad sometimes. 🫂 Let me play something that might help.`,
      ],
      angry: [
        `I can feel the intensity, ${name}! 🔥 Let's channel that energy with some powerful tracks.`,
        `Take a deep breath, ${name}. 💨 Sometimes powerful music helps process these feelings.`,
      ],
      calm: [
        `What a peaceful state of mind, ${name}. 🧘 Let me enhance this tranquility with some beautiful melodies.`,
        `Serenity looks good on you, ${name}! ☮️ Here are some songs to maintain this zen vibe.`,
      ],
      stressed: [
        `I understand the pressure, ${name}. 🫂 Let's take a moment to breathe. Here are some calming tracks.`,
        `Stress is temporary, ${name}. 💪 Let me help you unwind with some soothing music.`,
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
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  const handlePlaySong = (songId: string, genre: string) => {
    addSongPlay(songId, genre);
  };

  const quickActions = [
    { label: "😊 Happy vibes", text: "I'm feeling happy and energetic today!" },
    { label: "😢 Feeling low", text: "I feel sad and lonely today" },
    { label: "💪 Need energy", text: "I need some motivation and energy!" },
    { label: "😌 Want calm", text: "I want to relax and feel peaceful" },
    { label: "❤️ Romantic mood", text: "I'm in a romantic mood tonight" },
    { label: "😤 Stressed out", text: "I'm very stressed and frustrated" },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-0px)] lg:h-screen">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04] bg-[#08080f]/80 backdrop-blur-2xl">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-lg shadow-violet-500/15 ring-2 ring-violet-500/20">
              <Image src="/chat_logo.png" alt="Peakbot" width={44} height={44} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#08080f] shadow-lg shadow-emerald-400/50" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-white tracking-tight">Peakbot Chat</h1>
            <p className="text-[10px] text-emerald-400/80 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
              AI is listening to your mood
            </p>
          </div>
        </div>

        {/* Live Mood Meter (compact) */}
        {liveMoodScores.length > 0 && liveMoodScores[0].mood !== "neutral" && (
          <div className="hidden md:block w-48">
            <MoodMeter scores={liveMoodScores} compact />
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-2 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div key={msg.id} className="animate-slide-up">
            <ChatMessage
              role={msg.role}
              content={msg.content}
              songs={msg.songs}
              onPlaySong={handlePlaySong}
              mood={msg.mood}
            />
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-violet-500/20">
              <span className="text-xl">🤖</span>
            </div>
            <div className="bg-[#10101c] border border-white/[0.06] rounded-2xl rounded-bl-md px-5 py-3.5 shadow-xl shadow-black/20">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-violet-400 typing-dot" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-fuchsia-400 typing-dot" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-cyan-400 typing-dot" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Live Mood Meter (mobile) */}
      {liveMoodScores.length > 0 && liveMoodScores[0].mood !== "neutral" && (
        <div className="md:hidden px-4 py-2 border-t border-white/[0.04] bg-[#08080f]/80 backdrop-blur-2xl">
          <MoodMeter scores={liveMoodScores} compact />
        </div>
      )}

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="px-4 md:px-6 pb-3">
          <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-2.5 px-1">Quick Start</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => handleQuickAction(action.text)}
                className="group px-4 py-2 text-xs bg-white/[0.02] border border-white/[0.06] rounded-xl text-gray-400 hover:border-violet-500/25 hover:text-violet-300 hover:bg-violet-500/[0.04] transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/[0.03]"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 md:px-6 py-4 border-t border-white/[0.04] bg-[#08080f]/80 backdrop-blur-2xl">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <div className="flex-1 relative group">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tell me how you're feeling..."
              className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/30 focus:ring-2 focus:ring-violet-500/10 transition-all duration-300 text-sm pr-12 hover:border-white/[0.1] hover:bg-white/[0.04]"
            />
            {liveMoodScores.length > 0 && liveMoodScores[0].mood !== "neutral" && (
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-pulse ring-4"
                style={{
                  backgroundColor: liveMoodScores[0].color,
                  boxShadow: `0 0 12px ${liveMoodScores[0].color}60`,
                  color: `${liveMoodScores[0].color}15`,
                }}
                title={`Detected: ${liveMoodScores[0].mood}`}
              />
            )}
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-4 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white rounded-2xl hover:shadow-xl hover:shadow-violet-500/25 transition-all duration-300 disabled:opacity-20 disabled:hover:shadow-none flex-shrink-0 hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}