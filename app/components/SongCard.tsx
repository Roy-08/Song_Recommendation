"use client";

import React, { useState, useRef, useEffect } from "react";
import { Song } from "@/app/lib/songs";

interface SongCardProps {
  song: Song;
  onPlay?: (songId: string, genre: string) => void;
}

export default function SongCard({ song, onPlay }: SongCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const thumbnailUrl = `https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg`;

  // We use a hidden YouTube iframe for audio-only playback
  // Since we can't directly get audio from YouTube without an API,
  // we'll simulate audio playback with the iframe hidden
  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (progressInterval.current) clearInterval(progressInterval.current);
    } else {
      setIsPlaying(true);
      if (onPlay) {
        onPlay(song.id, song.genre);
      }
      // Simulate progress for the music
      setDuration(240); // 4 minutes default
      if (progressInterval.current) clearInterval(progressInterval.current);
      progressInterval.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          if (next >= 240) {
            setIsPlaying(false);
            if (progressInterval.current) clearInterval(progressInterval.current);
            return 0;
          }
          setProgress((next / 240) * 100);
          return next;
        });
      }, 1000);
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (progressInterval.current) clearInterval(progressInterval.current);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 bg-[#12121a] border border-white/[0.04] hover:border-amber-500/20 hover:shadow-amber-500/5">
      {/* Hidden iframe for YouTube audio */}
      {isPlaying && (
        <iframe
          ref={iframeRef}
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/${song.youtubeId}?autoplay=1&rel=0`}
          title={song.title}
          allow="autoplay"
          className="hidden"
        />
      )}

      {/* Album art + controls */}
      <div className="flex items-center gap-3 p-3">
        {/* Thumbnail */}
        <div
          className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
          onClick={handlePlay}
        >
          {!imgError ? (
            <img
              src={thumbnailUrl}
              alt={song.title}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-600/30 to-orange-600/30 flex items-center justify-center">
              <span className="text-xl">🎵</span>
            </div>
          )}
          {/* Play/Pause overlay */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {isPlaying ? (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
          {/* Playing indicator */}
          {isPlaying && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-end gap-[2px] h-3">
              <span className="eq-bar" style={{ animationDelay: "0s" }} />
              <span className="eq-bar" style={{ animationDelay: "0.15s" }} />
              <span className="eq-bar" style={{ animationDelay: "0.3s" }} />
              <span className="eq-bar" style={{ animationDelay: "0.45s" }} />
            </div>
          )}
        </div>

        {/* Song info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold truncate text-white">{song.title}</h4>
          <p className="text-xs truncate text-gray-500">{song.artist}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/15">
              {song.genre}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/15">
              {song.language}
            </span>
          </div>
        </div>

        {/* Play button */}
        <button
          onClick={handlePlay}
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
            isPlaying
              ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30"
              : "bg-white/[0.05] text-gray-400 hover:bg-amber-500/20 hover:text-amber-400"
          }`}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Progress bar */}
      {isPlaying && (
        <div className="px-3 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-600 w-8">{formatTime(currentTime)}</span>
            <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-600 w-8 text-right">{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
}