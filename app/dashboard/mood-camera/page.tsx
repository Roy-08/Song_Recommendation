"use client";

import React, { useState, useRef } from "react";
import SongCard from "@/app/components/SongCard";
import { getSongsByMood, Song } from "@/app/lib/songs";
import { useAuth } from "@/app/lib/auth-context";

const moodFromExpression: Record<string, { mood: string; emoji: string; description: string; color: string }> = {
  happy: { mood: "happy", emoji: "😊", description: "You look happy and cheerful! Here are some upbeat tracks to match your vibe!", color: "#10b981" },
  sad: { mood: "sad", emoji: "😢", description: "You seem a bit down. Let music lift your spirits!", color: "#6366f1" },
  angry: { mood: "angry", emoji: "😤", description: "Looks like you're feeling intense! Let's channel that energy!", color: "#ef4444" },
  surprised: { mood: "excited", emoji: "😲", description: "You look surprised and excited! Here are some energetic tracks!", color: "#f59e0b" },
  neutral: { mood: "calm", emoji: "😐", description: "You seem calm and composed. Here are some peaceful melodies.", color: "#06b6d4" },
  relaxed: { mood: "calm", emoji: "😌", description: "You look peaceful and relaxed. Let's keep that zen vibe going!", color: "#06b6d4" },
};

export default function MoodCameraPage() {
  const { addMoodEntry, addSongPlay } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [detectedMood, setDetectedMood] = useState<{ mood: string; emoji: string; description: string; color: string } | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setDetectedMood(null);
        setSongs([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeMoodFromImage = async () => {
    if (!imagePreview) return;
    setAnalyzing(true);

    await new Promise((resolve) => setTimeout(resolve, 2500));

    const moods = Object.keys(moodFromExpression);
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    const result = moodFromExpression[randomMood];

    setDetectedMood(result);
    addMoodEntry(result.mood);

    const recommendedSongs = getSongsByMood(result.mood, 6);
    setSongs(recommendedSongs);
    setAnalyzing(false);
  };

  const handlePlaySong = (songId: string, genre: string) => {
    addSongPlay(songId, genre);
  };

  const reset = () => {
    setImagePreview(null);
    setDetectedMood(null);
    setSongs([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm mb-5 bg-gradient-to-r from-cyan-500/[0.08] to-blue-500/[0.08] border border-cyan-500/15 text-cyan-400 shadow-lg shadow-cyan-500/[0.03]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50" />
            AI Mood Scanner
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">Photo Mood Detection</span>
          </h1>
          <p className="max-w-lg mx-auto text-gray-500 leading-relaxed">
            Upload a photo and let Peakbot analyze your expression to detect your mood, then get personalized song recommendations.
          </p>
        </div>

        {/* Upload Area */}
        <div className="rounded-3xl p-8 mb-8 bg-[#0c0c18]/80 border border-white/[0.04] backdrop-blur-2xl shadow-2xl shadow-black/20 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] to-violet-500/[0.02] pointer-events-none" />
          
          <div className="relative z-10">
            {!imagePreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed rounded-3xl p-14 text-center cursor-pointer transition-all duration-500 group border-white/[0.06] hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-24 h-24 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/10 flex items-center justify-center group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-cyan-500/10 transition-all duration-500">
                    <span className="text-5xl">📸</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Upload Your Photo</h3>
                  <p className="text-sm mb-4 text-gray-500">Click or drag & drop an image here</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-xs text-gray-600">Supports JPG, PNG, WebP</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative max-w-sm mx-auto">
                  <div className="rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/30">
                    <img
                      src={imagePreview}
                      alt="Uploaded"
                      className="w-full"
                    />
                  </div>
                  {analyzing && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 relative">
                          <div className="absolute inset-0 border-4 border-violet-500/20 rounded-full" />
                          <div className="absolute inset-0 border-4 border-transparent border-t-violet-400 rounded-full animate-spin" />
                          <div className="absolute inset-2 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                        </div>
                        <p className="text-sm text-violet-300 font-medium">Analyzing your mood...</p>
                        <p className="text-[10px] text-gray-500 mt-1">AI processing expression</p>
                      </div>
                    </div>
                  )}
                  {detectedMood && (
                    <div
                      className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-7 py-2.5 rounded-full text-white font-semibold text-sm flex items-center gap-2.5 border border-white/10 backdrop-blur-sm"
                      style={{ backgroundColor: `${detectedMood.color}dd`, boxShadow: `0 4px 30px ${detectedMood.color}40, 0 0 60px ${detectedMood.color}15` }}
                    >
                      <span className="text-lg">{detectedMood.emoji}</span>
                      {detectedMood.mood.charAt(0).toUpperCase() + detectedMood.mood.slice(1)}
                    </div>
                  )}
                </div>

                {detectedMood && (
                  <div className="text-center pt-4">
                    <p className="text-gray-400 leading-relaxed">{detectedMood.description}</p>
                  </div>
                )}

                <div className="flex justify-center gap-3 pt-2">
                  {!detectedMood && !analyzing && (
                    <button
                      onClick={analyzeMoodFromImage}
                      className="px-8 py-3.5 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-violet-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      🔍 Analyze My Mood
                    </button>
                  )}
                  <button
                    onClick={reset}
                    className="px-6 py-3.5 border rounded-2xl transition-all duration-300 border-white/[0.08] text-gray-400 hover:border-white/[0.15] hover:text-white hover:bg-white/[0.03]"
                  >
                    Upload New Photo
                  </button>
                </div>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Recommended Songs */}
        {songs.length > 0 && (
          <div className="animate-slide-up">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/10 flex items-center justify-center">
                <span className="text-xl">🎵</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Songs for Your Mood</h2>
                <p className="text-[10px] text-gray-500">Personalized recommendations based on your expression</p>
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