/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-html-link-for-pages */
"use client"
import React, { useState, useEffect, useRef } from "react";

// Pre-computed particle positions to avoid Math.random() hydration mismatch
const PARTICLE_DATA = [
  { left: 12, top: 68, size: 2.3, color: "#f59e0b", duration: 10, delay: 1.2 },
  { left: 27, top: 75, size: 3.1, color: "#8b5cf6", duration: 14, delay: 2.5 },
  { left: 41, top: 82, size: 1.5, color: "#ec4899", duration: 9, delay: 0.8 },
  { left: 56, top: 71, size: 4.0, color: "#f97316", duration: 16, delay: 3.1 },
  { left: 68, top: 88, size: 2.8, color: "#10b981", duration: 11, delay: 4.2 },
  { left: 8, top: 79, size: 1.8, color: "#f59e0b", duration: 13, delay: 0.3 },
  { left: 33, top: 65, size: 3.5, color: "#8b5cf6", duration: 10, delay: 5.0 },
  { left: 52, top: 90, size: 2.0, color: "#ec4899", duration: 15, delay: 1.7 },
  { left: 74, top: 73, size: 4.2, color: "#f97316", duration: 8, delay: 2.9 },
  { left: 89, top: 85, size: 1.2, color: "#10b981", duration: 12, delay: 0.5 },
  { left: 15, top: 92, size: 3.0, color: "#f59e0b", duration: 17, delay: 3.8 },
  { left: 45, top: 67, size: 2.5, color: "#8b5cf6", duration: 9, delay: 4.6 },
  { left: 62, top: 78, size: 1.7, color: "#ec4899", duration: 14, delay: 1.0 },
  { left: 78, top: 95, size: 3.8, color: "#f97316", duration: 11, delay: 5.5 },
  { left: 3, top: 70, size: 2.1, color: "#10b981", duration: 16, delay: 2.2 },
  { left: 22, top: 86, size: 4.5, color: "#f59e0b", duration: 10, delay: 0.7 },
  { left: 38, top: 74, size: 1.3, color: "#8b5cf6", duration: 13, delay: 3.4 },
  { left: 55, top: 91, size: 3.2, color: "#ec4899", duration: 8, delay: 4.9 },
  { left: 71, top: 66, size: 2.6, color: "#f97316", duration: 15, delay: 1.5 },
  { left: 85, top: 80, size: 1.9, color: "#10b981", duration: 12, delay: 5.2 },
  { left: 10, top: 88, size: 3.7, color: "#f59e0b", duration: 9, delay: 2.8 },
  { left: 30, top: 72, size: 2.2, color: "#8b5cf6", duration: 17, delay: 0.1 },
  { left: 48, top: 83, size: 4.1, color: "#ec4899", duration: 11, delay: 3.6 },
  { left: 65, top: 69, size: 1.6, color: "#f97316", duration: 14, delay: 4.3 },
  { left: 92, top: 76, size: 3.4, color: "#10b981", duration: 10, delay: 1.9 },
];

const features = [
  {
    icon: "🎭",
    title: "Live Mood Detection",
    description:
      "Peakbot detects your emotions in real-time as you type. Watch the mood meter react instantly.",
  },
  {
    icon: "📸",
    title: "Photo Mood Scanner",
    description:
      "Upload a selfie and let AI analyze your expression to guess your mood and recommend songs.",
  },
  {
    icon: "🧠",
    title: "Music Personality",
    description:
      "Discover your unique music personality type based on your moods and listening patterns.",
  },
  {
    icon: "🧘",
    title: "Relaxation Mode",
    description:
      "Guided breathing exercises with calming visuals, followed by curated peaceful music.",
  },
  {
    icon: "🎵",
    title: "Indian Music Focus",
    description:
      "Bollywood, Indie Hindi, Punjabi, Tamil and more — with worldwide music support.",
  },
  {
    icon: "💬",
    title: "AI Emotion Coach",
    description:
      "More than just songs — emotional support, conversation coaching, and personalized suggestions.",
  },
];

const personalities = [
  {
    type: "Emotional Listener",
    emoji: "🎧",
    traits: ["Deep lyrics", "Late night vibes", "Acoustic sounds"],
    genres: ["Indie", "Soft Pop", "Lofi"],
    color: "purple",
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "hover:border-purple-500/30",
    shadow: "hover:shadow-purple-500/10",
  },
  {
    type: "Energy Seeker",
    emoji: "⚡",
    traits: ["Fast beats", "Workout music", "Power anthems"],
    genres: ["EDM", "Hip Hop", "Rock"],
    color: "amber",
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "hover:border-amber-500/30",
    shadow: "hover:shadow-amber-500/10",
  },
  {
    type: "Zen Master",
    emoji: "🧘",
    traits: ["Calm melodies", "Ambient sounds", "Mindful listening"],
    genres: ["Ambient", "Classical", "Sufi"],
    color: "emerald",
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "hover:border-emerald-500/30",
    shadow: "hover:shadow-emerald-500/10",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

export default function LandingPage() {
  const [typedText, setTypedText] = useState("");
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const fullText = "I'm feeling happy today, the weather is beautiful...";

  const howItWorks = useInView();
  const featuresSection = useInView();
  const personalitySection = useInView();
  const ctaSection = useInView();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        i = 0;
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const genreColors: Record<string, string> = {
    purple: "bg-purple-500/15 text-purple-300 border border-purple-500/20",
    amber: "bg-amber-500/15 text-amber-300 border border-amber-500/20",
    emerald: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20",
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0a0f] text-white">
      {/* ─── Navbar ─── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          mounted && navScrolled
            ? "bg-[#0a0a0f]/80 backdrop-blur-2xl border-b border-white/6 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <img
              src="/PeakBot_logo.png"
              alt="Peakbot"
              className="w-50 h-10  object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
          </a>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Personality"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-gray-500 hover:text-amber-400 transition-colors text-sm font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 after:transition-all hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/auth/login"
              className="px-5 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Login
            </a>
            <a
              href="/auth/signup"
              className="relative px-6 py-2.5 text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-105 overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Parallax background orbs - only apply scroll transforms after mount */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-[700px] h-[700px] bg-amber-500/[0.08] rounded-full blur-[200px]"
            style={{
              top: "15%",
              left: "20%",
              transform: mounted ? `translateY(${scrollY * 0.1}px)` : "translateY(0px)",
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] bg-purple-600/[0.08] rounded-full blur-[200px]"
            style={{
              bottom: "10%",
              right: "15%",
              transform: mounted ? `translateY(${scrollY * -0.08}px)` : "translateY(0px)",
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] bg-pink-500/[0.05] rounded-full blur-[150px]"
            style={{
              top: "50%",
              left: "50%",
              transform: mounted ? `translate(-50%, -50%) translateY(${scrollY * 0.05}px)` : "translate(-50%, -50%) translateY(0px)",
            }}
          />
        </div>

        {/* Floating particles - using pre-computed data to avoid hydration mismatch */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {PARTICLE_DATA.map((p, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  background: p.color,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div className="space-y-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-amber-500/[0.08] border border-amber-500/[0.15] text-amber-400 animate-fade-in"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              AI-Powered Music Companion
            </div>

            <h1
              className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight animate-slide-up"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              Feel the
              <span className="gradient-text block mt-1">Music in</span>
              <span className="block">Your Mood</span>
            </h1>

            <p
              className="text-lg md:text-xl max-w-lg leading-relaxed text-gray-400 animate-slide-up"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              Peakbot understands your emotions and recommends the perfect songs.
              Real-time mood detection, AI-powered conversations, and guided
              relaxation — all in one intelligent chatbot.
            </p>

            <div
              className="flex flex-wrap gap-4 animate-slide-up"
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              <a
                href="/auth/signup"
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-full font-semibold text-lg transition-all hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Listening
                  <span className="group-hover:translate-x-1 transition-transform">🎵</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              </a>
              <a
                href="#features"
                className="px-8 py-4 border border-white/[0.08] text-gray-300 hover:border-amber-500/30 hover:text-white rounded-full font-medium text-lg transition-all hover:scale-105 hover:bg-white/[0.02]"
              >
                Explore Features
              </a>
            </div>

            {/* Stats */}
            <div
              className="flex gap-10 pt-6 animate-slide-up"
              style={{ animationDelay: "0.9s", animationFillMode: "both" }}
            >
              {[
                { value: "40+", label: "Songs" },
                { value: "7+", label: "Moods" },
                { value: "6+", label: "Languages" },
                { value: "AI", label: "Powered" },
              ].map((stat) => (
                <div key={stat.label} className="group cursor-default">
                  <p className="text-3xl font-bold gradient-text group-hover:scale-110 transition-transform inline-block">
                    {stat.value}
                  </p>
                  <p className="text-xs mt-1 text-gray-600 group-hover:text-gray-400 transition-colors">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chat Demo */}
          <div
            className="relative animate-float hidden lg:block animate-fade-in"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            {/* Decorative orbiting dots */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-amber-400/60"
                style={{ animation: "orbit 12s linear infinite" }}
              />
              <div
                className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-purple-400/60"
                style={{ animation: "orbit 18s linear infinite reverse" }}
              />
            </div>

            <div className="rounded-3xl p-6 space-y-4 max-w-md mx-auto glass-card glow-amber">
              {/* Chat header */}
              <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                <img
                  src="/chat_logo.png"
                  alt="Peakbot"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-500/30"
                />
                <div>
                  <p className="text-sm font-semibold text-white">Peakbot</p>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </p>
                </div>
                <div className="ml-auto flex gap-1">
                  <div className="music-wave flex items-end gap-0.5 h-4">
                    {[8, 14, 6, 16, 10].map((h, i) => (
                      <span
                        key={i}
                        style={{ animationDelay: `${i * 0.1}s`, height: `${h}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%] bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/20">
                    <p className="text-xs text-amber-100">
                      {typedText}
                      <span className="animate-pulse text-amber-400">|</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <img
                    src="/chat_logo.png"
                    alt="Peakbot"
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="rounded-2xl rounded-bl-sm px-4 py-2.5 bg-white/[0.04] border border-white/[0.06]">
                    <p className="text-xs text-gray-300">
                      That&apos;s wonderful! 🎉 Here are some happy songs for you!
                    </p>
                  </div>
                </div>
              </div>

              {/* Mood indicator */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/[0.12]">
                <span className="text-sm">😊</span>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-emerald-300 font-medium">Happy</span>
                    <span className="text-emerald-400">92%</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-1000" />
                  </div>
                </div>
              </div>

              {/* Mini song cards */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {[
                  { name: "🎵 Badtameez Dil", artist: "Benny Dayal" },
                  { name: "🎶 Blinding Lights", artist: "The Weeknd" },
                ].map((song, i) => (
                  <div
                    key={i}
                    className="rounded-xl px-3 py-2.5 text-[10px] font-medium flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] text-gray-300 hover:bg-white/[0.06] hover:border-amber-500/20 transition-all cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg
                        className="w-3 h-3 text-black"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate">{song.name}</p>
                      <p className="text-[8px] text-gray-500 truncate">{song.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-600">Scroll to explore</span>
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="py-28 relative" ref={howItWorks.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              howItWorks.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-sm font-semibold text-amber-400 uppercase tracking-widest mb-3">
              Simple & Intuitive
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-500">
              Three simple steps to discover music that matches your soul.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

            {[
              {
                step: "01",
                title: "Tell Your Mood",
                desc: "Type how you feel or upload a selfie. Our AI instantly detects your emotional state.",
                icon: "💬",
              },
              {
                step: "02",
                title: "AI Analyzes",
                desc: "Peakbot's AI processes your mood and finds the perfect songs from our curated library.",
                icon: "🧠",
              },
              {
                step: "03",
                title: "Enjoy Music",
                desc: "Listen to personalized recommendations and let the music heal, energize, or calm you.",
                icon: "🎧",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`text-center relative group transition-all duration-700 ${
                  howItWorks.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="relative mx-auto mb-6 w-24 h-24">
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-2xl bg-amber-500/10 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl bg-[#12121a] border border-white/[0.06] group-hover:border-amber-500/30 group-hover:shadow-xl group-hover:shadow-amber-500/10 transition-all duration-500 relative z-10">
                    {item.icon}
                  </div>
                </div>
                <div className="inline-block text-xs font-bold mb-3 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  STEP {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500 max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section id="features" className="py-28 relative" ref={featuresSection.ref}>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/[0.03] rounded-full blur-[180px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              featuresSection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-sm font-semibold text-amber-400 uppercase tracking-widest mb-3">
              Everything You Need
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Powerful <span className="gradient-text">Features</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-500">
              Peakbot is not just a chatbot — it&apos;s your personal music
              therapist, mood analyzer, and relaxation guide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 transition-all duration-500 group hover:-translate-y-2 glass-card glass-card-hover cursor-default ${
                  featuresSection.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-amber-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 group-hover:text-gray-400 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Music Personality Section ─── */}
      <section id="personality" className="py-28 relative" ref={personalitySection.ref}>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-purple-600/[0.05] rounded-full blur-[120px]" />
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-amber-500/[0.05] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              personalitySection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-sm font-semibold text-amber-400 uppercase tracking-widest mb-3">
              Discover Yourself
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Your <span className="gradient-text">Music Personality</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-500">
              Peakbot analyzes your behavior, moods, and listening patterns to
              reveal your unique music personality type.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {personalities.map((p, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-3 glass-card ${p.border} hover:shadow-xl ${p.shadow} cursor-default ${
                  personalitySection.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center`}
                >
                  <span className="text-4xl">{p.emoji}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{p.type}</h3>
                <div className="space-y-2 mb-5">
                  {p.traits.map((t, j) => (
                    <p
                      key={j}
                      className="text-sm text-gray-500 flex items-center justify-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      {t}
                    </p>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {p.genres.map((g, j) => (
                    <span
                      key={j}
                      className={`text-xs px-3 py-1 rounded-full ${genreColors[p.color]}`}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-28 relative" ref={ctaSection.ref}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            className={`rounded-3xl p-12 md:p-16 relative overflow-hidden glass-card transition-all duration-700 ${
              ctaSection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.08] via-purple-600/[0.05] to-pink-500/[0.08]" />
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-3xl border border-amber-500/10" />

            <div className="relative z-10">
              <img
                src="/PeakBot_logo.png"
                alt="Peakbot"
                className="w-120 h-20 mx-auto mb-6  object-contain shadow-2xl "
              />
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Ready to{" "}
                <span className="gradient-text">Feel the Music?</span>
              </h2>
              <p className="text-lg mb-8 max-w-lg mx-auto text-gray-400">
                Join Peakbot and discover songs that truly match your emotions.
                Your AI music companion awaits.
              </p>
              <a
                href="/auth/signup"
                className="group inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-amber-500/25 transition-all hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">Get Started Free</span>
                <svg
                  className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t py-8 border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            
          </div>
          <p className="text-sm text-gray-600">
            © 2026 Peakbot. AI-powered music recommendations for everyone.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-gray-600 hover:text-amber-400 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}