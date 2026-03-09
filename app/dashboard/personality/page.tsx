"use client";

import React, { useMemo } from "react";
import { useAuth } from "@/app/lib/auth-context";
import { getPersonalityType } from "@/app/lib/songs";

export default function PersonalityPage() {
  const { moodHistory, songHistory, user } = useAuth();

  const personality = useMemo(() => {
    const moods = moodHistory.map((m) => m.mood);
    const genres = songHistory.map((s) => s.genre);
    return getPersonalityType(moods, genres);
  }, [moodHistory, songHistory]);

  const moodStats = useMemo(() => {
    const counts: Record<string, number> = {};
    moodHistory.forEach((m) => {
      counts[m.mood] = (counts[m.mood] || 0) + 1;
    });
    const total = moodHistory.length || 1;
    return Object.entries(counts)
      .map(([mood, count]) => ({ mood, count, percentage: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count);
  }, [moodHistory]);

  const genreStats = useMemo(() => {
    const counts: Record<string, number> = {};
    songHistory.forEach((s) => {
      counts[s.genre] = (counts[s.genre] || 0) + 1;
    });
    const total = songHistory.length || 1;
    return Object.entries(counts)
      .map(([genre, count]) => ({ genre, count, percentage: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count);
  }, [songHistory]);

  const moodColors: Record<string, string> = {
    happy: "#10b981",
    sad: "#6366f1",
    angry: "#ef4444",
    calm: "#06b6d4",
    stressed: "#f59e0b",
    motivated: "#f97316",
    romantic: "#ec4899",
    neutral: "#94a3b8",
    excited: "#8b5cf6",
  };

  const hasData = moodHistory.length > 0;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm mb-5 bg-gradient-to-r from-purple-500/[0.08] to-fuchsia-500/[0.08] border border-purple-500/15 text-purple-400 shadow-lg shadow-purple-500/[0.03]">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-lg shadow-purple-400/50" />
            Music Personality Analyzer
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">Your Music Personality</span>
          </h1>
          <p className="max-w-lg mx-auto text-gray-500 leading-relaxed">
            Based on your mood patterns, song choices, and listening behavior, here&apos;s your unique music personality profile.
          </p>
        </div>

        {!hasData ? (
          <div className="rounded-3xl p-14 text-center bg-[#0c0c18]/80 border border-white/[0.04] backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] to-fuchsia-500/[0.02] pointer-events-none" />
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/10 flex items-center justify-center">
                <span className="text-5xl">🎧</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">No Data Yet</h3>
              <p className="mb-8 text-gray-500 max-w-sm mx-auto leading-relaxed">
                Start chatting with Peakbot and playing songs to build your music personality profile!
              </p>
              <a
                href="/dashboard"
                className="inline-flex px-8 py-3.5 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-violet-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Start Chatting 💬
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Personality Card */}
            <div className="rounded-3xl p-10 text-center relative overflow-hidden bg-[#0c0c18]/80 border border-white/[0.04] backdrop-blur-2xl shadow-2xl shadow-black/20">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] via-transparent to-fuchsia-500/[0.04]" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-b from-violet-500/[0.05] to-transparent rounded-full blur-[80px]" />
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/10 flex items-center justify-center shadow-xl shadow-violet-500/[0.05]">
                  <span className="text-5xl">{personality.emoji}</span>
                </div>
                <h2 className="text-2xl font-bold mb-1 text-white tracking-tight">
                  {user?.name || "Your"}&apos;s Music Personality
                </h2>
                <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-500/15 to-fuchsia-500/15 border border-violet-500/15 mt-3 mb-5 shadow-lg shadow-violet-500/[0.05]">
                  <span className="text-lg font-bold bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">{personality.type}</span>
                </div>
                <p className="max-w-md mx-auto mb-7 text-gray-400 leading-relaxed">{personality.description}</p>

                {/* Traits */}
                <div className="flex flex-wrap justify-center gap-2.5 mb-7">
                  {personality.traits.map((trait, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 text-xs rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:border-violet-500/20 hover:text-violet-300 transition-all duration-300"
                    >
                      ✦ {trait}
                    </span>
                  ))}
                </div>

                {/* Recommended Genres */}
                <div>
                  <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-3">Recommended Genres</p>
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {personality.recommendedGenres.map((genre, i) => (
                      <span
                        key={i}
                        className="px-5 py-2 text-sm rounded-xl font-medium bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 text-violet-300 border border-violet-500/15 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/[0.05]"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Mood Distribution */}
              <div className="rounded-3xl p-7 bg-[#0c0c18]/80 border border-white/[0.04] backdrop-blur-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/10 flex items-center justify-center">
                      <span className="text-lg">🎭</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">Mood Distribution</h3>
                  </div>
                  <div className="space-y-4">
                    {moodStats.slice(0, 6).map((stat) => (
                      <div key={stat.mood} className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize text-gray-400 font-medium">{stat.mood}</span>
                          <span className="text-gray-600 text-xs font-mono">{stat.percentage}%</span>
                        </div>
                        <div className="h-2.5 rounded-full overflow-hidden bg-white/[0.03]">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${stat.percentage}%`,
                              backgroundColor: moodColors[stat.mood] || "#94a3b8",
                              boxShadow: `0 0 12px ${moodColors[stat.mood] || "#94a3b8"}30`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] mt-5 text-gray-600 font-medium">
                    Based on {moodHistory.length} mood entries
                  </p>
                </div>
              </div>

              {/* Genre Preferences */}
              <div className="rounded-3xl p-7 bg-[#0c0c18]/80 border border-white/[0.04] backdrop-blur-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.02] to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/10 flex items-center justify-center">
                      <span className="text-lg">🎵</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">Genre Preferences</h3>
                  </div>
                  {genreStats.length > 0 ? (
                    <div className="space-y-4">
                      {genreStats.slice(0, 6).map((stat, i) => {
                        const colors = ["#f59e0b", "#8b5cf6", "#ec4899", "#10b981", "#06b6d4", "#f97316"];
                        return (
                          <div key={stat.genre} className="space-y-1.5">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400 font-medium">{stat.genre}</span>
                              <span className="text-gray-600 text-xs font-mono">{stat.count} plays</span>
                            </div>
                            <div className="h-2.5 rounded-full overflow-hidden bg-white/[0.03]">
                              <div
                                className="h-full rounded-full transition-all duration-1000"
                                style={{
                                  width: `${stat.percentage}%`,
                                  backgroundColor: colors[i % colors.length],
                                  boxShadow: `0 0 12px ${colors[i % colors.length]}30`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/10 flex items-center justify-center">
                        <span className="text-3xl">🎶</span>
                      </div>
                      <p className="text-sm text-gray-500">Play some songs to see your genre preferences!</p>
                    </div>
                  )}
                  <p className="text-[10px] mt-5 text-gray-600 font-medium">
                    Based on {songHistory.length} songs played
                  </p>
                </div>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="rounded-3xl p-7 bg-[#0c0c18]/80 border border-white/[0.04] backdrop-blur-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/[0.02] via-transparent to-fuchsia-500/[0.02] pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/10 flex items-center justify-center">
                    <span className="text-lg">📊</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white tracking-tight">Activity Summary</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Mood Entries", value: moodHistory.length, icon: "🎭", gradient: "from-emerald-500/10 to-cyan-500/10", border: "border-emerald-500/10" },
                    { label: "Songs Played", value: songHistory.length, icon: "🎵", gradient: "from-amber-500/10 to-orange-500/10", border: "border-amber-500/10" },
                    { label: "Unique Genres", value: new Set(songHistory.map((s) => s.genre)).size, icon: "📀", gradient: "from-violet-500/10 to-purple-500/10", border: "border-violet-500/10" },
                    { label: "Personality Type", value: personality.type.split(" ")[0], icon: personality.emoji, gradient: "from-fuchsia-500/10 to-pink-500/10", border: "border-fuchsia-500/10" },
                  ].map((stat, i) => (
                    <div key={i} className={`rounded-2xl p-5 text-center bg-gradient-to-br ${stat.gradient} border ${stat.border} hover:scale-[1.02] transition-all duration-300 group`}>
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/[0.03] border border-white/[0.04] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl">{stat.icon}</span>
                      </div>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}