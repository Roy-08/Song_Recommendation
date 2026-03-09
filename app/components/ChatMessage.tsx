"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import SongCard from "./SongCard";
import { Song } from "@/app/lib/songs";

interface ChatMessageProps {
  role: "user" | "bot";
  content: string;
  songs?: Song[];
  onPlaySong?: (songId: string, genre: string) => void;
  mood?: string;
  isStreaming?: boolean;
}

export default function ChatMessage({ role, content, songs, onPlaySong, mood, isStreaming }: ChatMessageProps) {
  const [displayedContent, setDisplayedContent] = useState(isStreaming ? "" : content);
  const [streamComplete, setStreamComplete] = useState(!isStreaming);

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedContent(content);
      setStreamComplete(true);
      return;
    }

    let i = 0;
    setDisplayedContent("");
    setStreamComplete(false);
    const interval = setInterval(() => {
      if (i < content.length) {
        setDisplayedContent(content.slice(0, i + 1));
        i++;
      } else {
        setStreamComplete(true);
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [content, isStreaming]);

  // Render markdown-like content
  const renderContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // Bold text
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Italic text
      processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');

      if (line.trim() === "") return <br key={i} />;
      return (
        <span
          key={i}
          className="block bot-message"
          dangerouslySetInnerHTML={{ __html: processed }}
        />
      );
    });
  };

  const moodEmojis: Record<string, string> = {
    happy: "😊", sad: "😢", angry: "😤", calm: "😌",
    stressed: "😰", motivated: "💪", romantic: "❤️", neutral: "😐",
  };

  if (role === "user") {
    return (
      <div className="flex justify-end mb-4 animate-slide-up">
        <div className="max-w-[75%]">
          <div className="rounded-2xl rounded-br-sm px-4 py-3 bg-gradient-to-br from-amber-500/25 to-orange-500/25 border border-amber-500/20">
            <p className="text-sm whitespace-pre-wrap text-amber-50">{content}</p>
          </div>
          {mood && mood !== "neutral" && (
            <div className="flex justify-end mt-1 gap-1">
              <span className="text-[10px] text-gray-600 flex items-center gap-1">
                {moodEmojis[mood]} {mood}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-5 animate-slide-up">
      <div className="flex gap-3 max-w-[85%]">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/20">
          <Image src="/chat_logo.png" alt="Peakbot" width={32} height={32} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="rounded-2xl rounded-bl-sm px-4 py-3 bg-[#12121a] border border-white/[0.06]">
            <div className="text-sm leading-relaxed text-gray-300">
              {renderContent(displayedContent)}
              {!streamComplete && (
                <span className="inline-block w-2 h-4 bg-amber-500 animate-pulse ml-0.5 rounded-sm" />
              )}
            </div>
          </div>
          {songs && songs.length > 0 && streamComplete && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-slide-up">
              {songs.map((song) => (
                <SongCard key={song.id} song={song} onPlay={onPlaySong} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}