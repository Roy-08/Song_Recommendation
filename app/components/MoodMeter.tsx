"use client";

import React from "react";
import { MoodScore } from "@/app/lib/mood";

interface MoodMeterProps {
  scores: MoodScore[];
  compact?: boolean;
}

export default function MoodMeter({ scores, compact = false }: MoodMeterProps) {
  if (scores.length === 0) return null;

  const moodEmojis: Record<string, string> = {
    happy: "😊",
    sad: "😢",
    angry: "😤",
    calm: "😌",
    stressed: "😰",
    motivated: "💪",
    romantic: "❤️",
    neutral: "😐",
  };

  return (
    <div className={`${compact ? "space-y-1" : "space-y-2"}`}>
      {!compact && (
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Live Mood Detection
          </span>
        </div>
      )}
      {scores.slice(0, compact ? 3 : 5).map((score) => (
        <div key={score.mood} className="flex items-center gap-2">
          <span className="text-sm w-6">{moodEmojis[score.mood] || "🎵"}</span>
          <span
            className={`${compact ? "text-[10px] w-14" : "text-xs w-20"} text-gray-500 capitalize`}
          >
            {score.mood}
          </span>
          <div
            className={`flex-1 ${compact ? "h-1.5" : "h-2.5"} bg-white/[0.04] rounded-full overflow-hidden`}
          >
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${score.score * 10}%`,
                backgroundColor: score.color,
                boxShadow: `0 0 8px ${score.color}30`,
              }}
            />
          </div>
          <span className={`${compact ? "text-[10px]" : "text-xs"} text-gray-600 w-6 text-right`}>
            {score.score}
          </span>
        </div>
      ))}
    </div>
  );
}