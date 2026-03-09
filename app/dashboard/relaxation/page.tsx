"use client";

import React, { useState, useEffect, useRef } from "react";
import SongCard from "@/app/components/SongCard";
import { getSongsByMood, Song } from "@/app/lib/songs";
import { useAuth } from "@/app/lib/auth-context";
import { useTheme } from "@/app/lib/theme-context";

type Phase = "idle" | "breathe-in" | "hold" | "breathe-out" | "complete";

export default function RelaxationPage() {
  const { addMoodEntry, addSongPlay } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [phase, setPhase] = useState<Phase>("idle");
  const [timer, setTimer] = useState(0);
  const [totalTime, setTotalTime] = useState(30);
  const [songs, setSongs] = useState<Song[]>([]);
  const [circleScale, setCircleScale] = useState(1);
  const [phaseText, setPhaseText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSession = () => {
    setPhase("breathe-in");
    setTimer(0);
    setSongs([]);
    setPhaseText("Breathe In...");
    setCircleScale(1);
  };

  useEffect(() => {
    if (phase === "idle" || phase === "complete") return;

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        const next = prev + 1;

        if (next >= totalTime) {
          setPhase("complete");
          addMoodEntry("calm");
          const calmSongs = getSongsByMood("calm", 6);
          setSongs(calmSongs);
          return totalTime;
        }

        const cyclePos = next % 12;
        if (cyclePos < 4) {
          setPhase("breathe-in");
          setPhaseText("Breathe In...");
          setCircleScale(1 + (cyclePos / 4) * 0.5);
        } else if (cyclePos < 8) {
          setPhase("hold");
          setPhaseText("Hold...");
          setCircleScale(1.5);
        } else {
          setPhase("breathe-out");
          setPhaseText("Breathe Out...");
          setCircleScale(1.5 - ((cyclePos - 8) / 4) * 0.5);
        }

        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [phase, totalTime, addMoodEntry]);

  const handlePlaySong = (songId: string, genre: string) => {
    addSongPlay(songId, genre);
  };

  const resetSession = () => {
    setPhase("idle");
    setTimer(0);
    setSongs([]);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const progress = (timer / totalTime) * 100;

  const phaseColors: Record<string, string> = {
    idle: "#8b5cf6",
    "breathe-in": "#06b6d4",
    hold: "#8b5cf6",
    "breathe-out": "#10b981",
    complete: "#10b981",
  };

  const currentColor = phaseColors[phase] || "#8b5cf6";

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm mb-5 shadow-lg ${isDark ? "bg-gradient-to-r from-emerald-500/[0.08] to-teal-500/[0.08] border border-emerald-500/15 text-emerald-400 shadow-emerald-500/[0.03]" : "bg-emerald-50 border border-emerald-200 text-emerald-600"}`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
            Mini Relaxation Mode
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            <span className={isDark ? "bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent" : "gradient-text"}>Breathe & Relax</span>
          </h1>
          <p className={`max-w-lg mx-auto leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Take a quick break with a guided breathing exercise. Peakbot will recommend calming music afterwards.
          </p>
        </div>

        {/* Relaxation Session */}
        <div className={`rounded-3xl p-10 mb-8 relative overflow-hidden ${isDark ? "bg-[#0c0c18]/80 border border-white/[0.04] backdrop-blur-2xl shadow-2xl shadow-black/20" : "bg-white border border-gray-200 shadow-lg"}`}>
          {/* Ambient glow based on phase */}
          {phase !== "idle" && isDark && (
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-1000"
              style={{
                background: `radial-gradient(ellipse at center, ${currentColor}08 0%, transparent 70%)`,
              }}
            />
          )}
          
          <div className="relative z-10">
            {phase === "idle" ? (
              <div className="text-center space-y-7">
                <div className={`w-36 h-36 mx-auto rounded-full flex items-center justify-center relative ${isDark ? "bg-gradient-to-br from-purple-600/10 to-cyan-600/10 border-2 border-purple-500/15" : "bg-gradient-to-br from-purple-100 to-cyan-100 border-2 border-purple-200"}`}>
                  <div className="absolute inset-0 rounded-full animate-pulse" style={{ boxShadow: '0 0 60px rgba(139, 92, 246, 0.08)', animationDuration: '3s' }} />
                  <span className="text-6xl">🧘</span>
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Ready to Relax?</h3>
                  <p className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Close your eyes and follow the breathing guide for a quick {totalTime}-second session.
                  </p>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? "bg-white/[0.03] border border-white/[0.06]" : "bg-gray-50 border border-gray-200"}`}>
                    <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      Pattern: 4s breathe in → 4s hold → 4s breathe out
                    </p>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  {[30, 60, 90].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setTotalTime(duration)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                        totalTime === duration
                          ? isDark
                            ? "bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-300 shadow-lg shadow-violet-500/[0.05]"
                            : "bg-purple-100 border border-purple-300 text-purple-600"
                          : isDark
                          ? "bg-white/[0.02] border border-white/[0.06] text-gray-500 hover:border-white/[0.1] hover:text-gray-300"
                          : "bg-gray-100 border border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {duration}s
                    </button>
                  ))}
                </div>

                <button
                  onClick={startSession}
                  className="px-10 py-4 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-violet-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  🧘 Start Session
                </button>
              </div>
            ) : phase === "complete" ? (
              <div className="text-center space-y-7 animate-slide-up">
                <div className={`w-36 h-36 mx-auto rounded-full flex items-center justify-center relative ${isDark ? "bg-gradient-to-br from-emerald-600/10 to-cyan-600/10 border-2 border-emerald-500/15" : "bg-gradient-to-br from-emerald-100 to-cyan-100 border-2 border-emerald-200"}`}>
                  <div className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 60px rgba(16, 185, 129, 0.15)' }} />
                  <span className="text-6xl">✨</span>
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Session Complete!</h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Great job! You completed a {totalTime}-second relaxation session. Here&apos;s some calming music for you.
                  </p>
                </div>
                <button
                  onClick={resetSession}
                  className={`px-7 py-3.5 border rounded-2xl transition-all duration-300 ${isDark ? "border-white/[0.08] text-gray-300 hover:border-violet-500/30 hover:text-violet-300 hover:bg-violet-500/[0.04]" : "border-gray-300 text-gray-600 hover:border-purple-300"}`}
                >
                  Start Another Session
                </button>
              </div>
            ) : (
              <div className="text-center space-y-8">
                {/* Breathing circle */}
                <div className="relative w-56 h-56 mx-auto">
                  {/* Outer glow ring */}
                  <div
                    className="absolute inset-[-12px] rounded-full transition-all duration-1000 opacity-30"
                    style={{
                      boxShadow: `0 0 40px ${currentColor}40, 0 0 80px ${currentColor}20`,
                    }}
                  />
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke={isDark ? "#1a1a2e" : "#e5e7eb"} strokeWidth="2.5" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={currentColor}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                      className="transition-all duration-1000"
                      style={{ filter: `drop-shadow(0 0 8px ${currentColor})` }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="rounded-full transition-all duration-1000 ease-in-out flex items-center justify-center backdrop-blur-sm"
                      style={{
                        width: `${circleScale * 80}px`,
                        height: `${circleScale * 80}px`,
                        backgroundColor: `${currentColor}12`,
                        border: `2px solid ${currentColor}30`,
                        boxShadow: `0 0 40px ${currentColor}20, inset 0 0 40px ${currentColor}08`,
                      }}
                    >
                      <span className="text-3xl">
                        {phase === "breathe-in" ? "🌬️" : phase === "hold" ? "⏸️" : "💨"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Phase text */}
                <div>
                  <p
                    className="text-2xl font-bold transition-all duration-500 tracking-tight"
                    style={{ color: currentColor, textShadow: `0 0 30px ${currentColor}40` }}
                  >
                    {phaseText}
                  </p>
                  <p className={`text-sm mt-2 font-mono ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                    {timer}s / {totalTime}s
                  </p>
                </div>

                {/* Progress bar */}
                <div className="max-w-xs mx-auto">
                  <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? "bg-white/[0.03]" : "bg-gray-200"}`}>
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: currentColor,
                        boxShadow: `0 0 12px ${currentColor}40`,
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={resetSession}
                  className={`px-5 py-2.5 text-sm border rounded-xl transition-all duration-300 ${isDark ? "text-gray-500 hover:text-white border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03]" : "text-gray-500 hover:text-gray-700 border-gray-300 hover:border-gray-400"}`}
                >
                  Cancel Session
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Songs after session */}
        {songs.length > 0 && (
          <div className="animate-slide-up">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/10 flex items-center justify-center">
                <span className="text-xl">🎵</span>
              </div>
              <div>
                <h2 className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>Calming Music for You</h2>
                <p className="text-[10px] text-gray-500">Curated for your post-session relaxation</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {songs.map((song) => (
                <SongCard key={song.id} song={song} onPlay={handlePlaySong} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}