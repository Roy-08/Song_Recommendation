/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth-context";

const musicNotes = ["♪", "♫", "♬", "♩", "🎵", "🎶", "🎧", "🎤", "🎸", "🎹", "🎷", "🎻"];

const genres = [
  { name: "Pop", emoji: "🎤" },
  { name: "Rock", emoji: "🎸" },
  { name: "Jazz", emoji: "🎷" },
  { name: "Hip-Hop", emoji: "🎧" },
  { name: "Classical", emoji: "🎻" },
  { name: "EDM", emoji: "🎹" },
];

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pwStrength, setPwStrength] = useState(0);
  const { signup } = useAuth();
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    let s = 0;
    if (password.length >= 6) s++;
    if (password.length >= 10) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    setPwStrength(s);
  }, [password]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    const success = await signup(name, email, password);
    if (success) { router.push("/dashboard"); }
    else { setError("An account with this email already exists."); }
    setLoading(false);
  };

  const sColors = ["bg-gray-600", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-green-500"];
  const sLabels = ["", "Weak", "Fair", "Good", "Strong", "Excellent"];

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#050508]">
      <style jsx>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes eqBar {
          0%,100% { height: 4px; }
          25% { height: 16px; }
          50% { height: 10px; }
          75% { height: 22px; }
        }
      `}</style>

      {/* Floating notes */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {musicNotes.map((n, i) => (
            <div key={i} className="absolute" style={{
              left: `${3 + (i * 8) % 94}%`, bottom: "-30px", opacity: 0,
              fontSize: `${14 + (i % 5) * 5}px`,
              animation: `floatUp ${9 + (i % 5) * 2}s linear infinite`,
              animationDelay: `${i * 0.9}s`,
            }}>{n}</div>
          ))}
        </div>
      )}

      {/* Left Panel - Form */}
      <div className="w-full lg:w-[50%] flex items-center justify-center relative py-6">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-600/[0.05] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-amber-500/[0.05] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-[440px] mx-6">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <Link href="/" className="inline-flex flex-col items-center gap-3 group">
                <Image src="/Peakbot_logo.png" alt="PeakUp" width={200} height={200} className="w-full h-full object-cover" />
              <p className="text-xs text-amber-400/80">Song Recommendation AI</p>
            </Link>
          </div>

          {/* Mobile image */}
          <div className="lg:hidden mb-5 rounded-2xl overflow-hidden h-28 relative border border-white/[0.06]">
            <img src="https://mgx-backend-cdn.metadl.com/generate/images/1012928/2026-03-09/8e0e8cd0-1371-4f4b-b94a-2a56a70da1da.png"
              alt="Music" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent" />
          </div>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white">Join PeakBot 🎶</h2>
            <p className="mt-2 text-gray-400">Create your account and start discovering music</p>
          </div>

          {/* Card */}
          <div className="rounded-3xl p-7 bg-[#0e0e16]/90 backdrop-blur-xl border border-white/[0.06] shadow-2xl">
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-sm text-red-400 flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-300">Full Name</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40 bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 hover:border-white/[0.15]" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-300">Email Address</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40 bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 hover:border-white/[0.15]" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                    className="w-full pl-12 pr-14 py-3.5 rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40 bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 hover:border-white/[0.15]" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-amber-400 transition-colors">
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < pwStrength ? sColors[pwStrength] : "bg-white/[0.06]"}`} />
                      ))}
                    </div>
                    <p className={`text-xs ${pwStrength <= 1 ? "text-red-400" : pwStrength <= 3 ? "text-yellow-400" : "text-green-400"}`}>{sLabels[pwStrength]}</p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
                <div className="relative group">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                    confirmPassword.length > 0 ? (confirmPassword === password ? "text-green-400" : "text-red-400") : "text-gray-500 group-focus-within:text-amber-400"
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required
                    className={`w-full pl-12 pr-12 py-3.5 rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 bg-white/[0.04] border text-white placeholder-gray-600 ${
                      confirmPassword.length > 0
                        ? (confirmPassword === password ? "border-green-500/30 focus:ring-green-500/40" : "border-red-500/30 focus:ring-red-500/40")
                        : "border-white/[0.08] focus:ring-amber-500/40 hover:border-white/[0.15]"
                    }`} />
                  {confirmPassword.length > 0 && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {confirmPassword === password ? (
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">
                <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-amber-500 focus:ring-amber-500/30 focus:ring-offset-0" />
                <p className="text-xs text-gray-400">
                  I agree to the <Link href="#" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">Terms</Link> and <Link href="#" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">Privacy Policy</Link>
                </p>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-amber-500/25 transition-all disabled:opacity-50 text-sm hover:scale-[1.02] active:scale-[0.98] mt-1">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">🎵 Create My Account</span>
                )}
              </button>
            </form>

            {/* Divider */}
           

            {/* Social */}
            

            {/* Sign in link */}
            <div className="mt-5 pt-5 border-t border-white/[0.06] text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-amber-400 hover:text-amber-300 font-semibold">Sign In →</Link>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Right Panel - Branding (Desktop) */}
      <div className="hidden lg:flex lg:w-[50%] relative items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#0a0a14] via-[#0d0d1a] to-[#050508]" />
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-purple-600/[0.07] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-amber-500/[0.07] rounded-full blur-[150px]" />

        <div className="relative z-10 px-14 max-w-lg w-full space-y-10">
          {/* Logo */}
          <div className="flex justify-end">
            
          </div>

          {/* Headline */}
          <div>
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
              Discover Music<br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                That Moves You
              </span>
            </h2>
            <p className="mt-4 text-gray-400 text-lg leading-relaxed max-w-md">
              AI-powered recommendations tailored to your taste, mood, and moment.
            </p>
          </div>

          {/* Decorative image */}
          <div className="rounded-2xl overflow-hidden h-44 w-full shadow-2xl shadow-purple-500/10 border border-white/[0.06]">
            <img
              src="https://mgx-backend-cdn.metadl.com/generate/images/1012928/2026-03-09/8e0e8cd0-1371-4f4b-b94a-2a56a70da1da.png"
              alt="Headphones and music"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Genre tags */}
          <div>
            <p className="text-sm text-gray-400 mb-3 font-medium">Explore genres you love</p>
            <div className="flex flex-wrap gap-2">
              {genres.map((g, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.12] transition-all cursor-default">
                  <span>{g.emoji}</span>
                  <span className="text-sm text-gray-200 font-medium">{g.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {[
              { icon: "🤖", title: "AI-Powered Chat", desc: "Tell us your mood in natural language" },
              { icon: "🎯", title: "Personalized Picks", desc: "Recommendations that improve over time" },
              { icon: "⚡", title: "Instant Discovery", desc: "Find new favorites in seconds" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-lg group-hover:scale-110 transition-transform">{f.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-white">{f.title}</p>
                  <p className="text-xs text-gray-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Spinning vinyl + mini equalizer */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden shadow-2xl shadow-amber-500/20 ring-2 ring-white/10"
              style={{ animation: "spinSlow 20s linear infinite" }}>
              <img src="https://mgx-backend-cdn.metadl.com/generate/images/1012928/2026-03-09/701551cb-4aef-4811-8356-a897b1a9dbf9.png"
                alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Now Playing</p>
              <p className="text-xs text-gray-400">Your next favorite song awaits...</p>
            </div>
            <div className="flex items-end gap-0.5 h-5 ml-auto">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 rounded-full bg-gradient-to-t from-amber-500 to-orange-400"
                  style={{ animation: `eqBar 1.2s ease-in-out infinite`, animationDelay: `${i * 0.15}s`, minHeight: "4px" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}