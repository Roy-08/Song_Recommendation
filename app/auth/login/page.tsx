/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth-context";

const musicNotes = ["♪", "♫", "♬", "♩", "🎵", "🎶", "🎧", "🎤", "🎸", "🎹"];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const success = await login(email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#050508]">
      <style jsx>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes eqBar {
          0%,100% { height: 6px; }
          25% { height: 20px; }
          50% { height: 12px; }
          75% { height: 28px; }
        }
      `}</style>

      {/* Floating notes */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {musicNotes.map((n, i) => (
            <div key={i} className="absolute" style={{
              left: `${5 + i * 10}%`, bottom: "-30px", opacity: 0,
              fontSize: `${16 + (i % 4) * 6}px`,
              animation: `floatUp ${9 + (i % 5) * 2}s linear infinite`,
              animationDelay: `${i * 1.1}s`,
            }}>{n}</div>
          ))}
        </div>
      )}

      {/* Left Panel - Branding (Desktop) */}
      <div className="hidden lg:flex lg:w-[52%] relative items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a14] via-[#0d0d1a] to-[#050508]" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/[0.07] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/[0.07] rounded-full blur-[150px]" />

        <div className="relative z-10 px-14 max-w-lg w-full space-y-10">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-4 group">
            
              
          </Link>

          {/* Headline */}
          <div>
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
              Your Music,<br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
                Perfectly Curated
              </span>
            </h2>
            <p className="mt-4 text-gray-400 text-lg leading-relaxed max-w-md">
              Tell us your mood, and our AI chatbot will find the perfect songs for every moment.
            </p>
          </div>

          {/* Decorative image - small, rounded */}
          <div className="rounded-2xl overflow-hidden h-44 w-full shadow-2xl shadow-amber-500/10 border border-white/[0.06]">
            <img
              src="https://mgx-backend-cdn.metadl.com/generate/images/1012928/2026-03-09/eaa51583-1dc4-4691-af05-1e6b7efb5498.png"
              alt="Music visualization"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Equalizer */}
          <div className="flex items-end gap-1.5 h-8">
            {[...Array(14)].map((_, i) => (
              <div key={i} className="w-2 rounded-full bg-gradient-to-t from-amber-500 to-orange-400"
                style={{ animation: `eqBar 1.2s ease-in-out infinite`, animationDelay: `${i * 0.08}s`, minHeight: "6px" }} />
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {[
              { val: "10K+", label: "Songs Recommended" },
              { val: "50+", label: "Music Genres" },
              { val: "AI", label: "Powered Engine" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-white">{s.val}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-[48%] flex items-center justify-center relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-500/[0.05] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-600/[0.05] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-[420px] mx-6">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex flex-col items-center gap-3 group">
              <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/25 group-hover:scale-110 transition-transform ring-2 ring-amber-400/20">
                <Image src="/peakbotlogo.png" alt="PeakUp" width={80} height={80} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl font-bold text-white">PeakUp</h1>
              <p className="text-xs text-amber-400/80">Song Recommendation AI</p>
            </Link>
          </div>

          {/* Mobile decorative image */}
          <div className="lg:hidden mb-6 rounded-2xl overflow-hidden h-32 relative border border-white/[0.06]">
            <img
              src="https://mgx-backend-cdn.metadl.com/generate/images/1012928/2026-03-09/eaa51583-1dc4-4691-af05-1e6b7efb5498.png"
              alt="Music visualization"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent" />
            <div className="absolute bottom-3 left-4 text-white text-sm font-medium">🎵 AI-Powered Music Discovery</div>
          </div>

          {/* Welcome */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Welcome back! 🎵</h2>
            <p className="mt-2 text-gray-400">Sign in to continue your music journey</p>
          </div>

          {/* Card */}
          <div className="rounded-3xl p-8 bg-[#0e0e16]/90 backdrop-blur-xl border border-white/[0.06] shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-sm text-red-400 flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Email Address</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40 bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 hover:border-white/[0.15]" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                    className="w-full pl-12 pr-14 py-4 rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40 bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 hover:border-white/[0.15]" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-amber-400 transition-colors">
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                </label>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-amber-500/25 transition-all disabled:opacity-50 text-sm hover:scale-[1.02] active:scale-[0.98]">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">🎧 Sign In to PeakBot</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </div>

            {/* Social */}
            

            {/* Sign up link */}
            <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
              <p className="text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="text-amber-400 hover:text-amber-300 font-semibold">Sign up free →</Link>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-600 mt-6">🎵 Discover music that matches your soul</p>
        </div>
      </div>
    </div>
  );
}