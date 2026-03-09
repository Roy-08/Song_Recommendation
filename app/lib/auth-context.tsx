/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: "email";
}

interface MoodEntry {
  mood: string;
  timestamp: number;
}

interface SongPlay {
  songId: string;
  genre: string;
  timestamp: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  moodHistory: MoodEntry[];
  addMoodEntry: (mood: string) => void;
  songHistory: SongPlay[];
  addSongPlay: (songId: string, genre: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [songHistory, setSongHistory] = useState<SongPlay[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("peakbot_user");
    const savedMoods = localStorage.getItem("peakbot_moods");
    const savedSongs = localStorage.getItem("peakbot_songs");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedMoods) setMoodHistory(JSON.parse(savedMoods));
    if (savedSongs) setSongHistory(JSON.parse(savedSongs));
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("peakbot_users") || "[]");
    const found = users.find(
      (u: { email: string; password: string }) => u.email === email && u.password === password
    );
    if (found) {
      const userData: User = { id: found.id, name: found.name, email: found.email, provider: "email" };
      setUser(userData);
      localStorage.setItem("peakbot_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("peakbot_users") || "[]");
    if (users.find((u: { email: string }) => u.email === email)) return false;
    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    localStorage.setItem("peakbot_users", JSON.stringify(users));
    const userData: User = { id: newUser.id, name, email, provider: "email" };
    setUser(userData);
    localStorage.setItem("peakbot_user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("peakbot_user");
  };

  const addMoodEntry = (mood: string) => {
    const entry = { mood, timestamp: Date.now() };
    const updated = [...moodHistory, entry];
    setMoodHistory(updated);
    localStorage.setItem("peakbot_moods", JSON.stringify(updated));
  };

  const addSongPlay = (songId: string, genre: string) => {
    const entry = { songId, genre, timestamp: Date.now() };
    const updated = [...songHistory, entry];
    setSongHistory(updated);
    localStorage.setItem("peakbot_songs", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        moodHistory,
        addMoodEntry,
        songHistory,
        addSongPlay,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}