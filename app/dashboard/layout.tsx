"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth-context";

const navItems = [
  { href: "/dashboard", label: "Chat", icon: "💬", description: "AI Song Chat" },
  { href: "/dashboard/mood-camera", label: "Mood Camera", icon: "📸", description: "Photo Mood Scan" },
  { href: "/dashboard/personality", label: "Personality", icon: "🧠", description: "Music Profile" },
  { href: "/dashboard/relaxation", label: "Relaxation", icon: "🧘", description: "Breathe & Relax" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#06060e] flex relative overflow-hidden">
      {/* Animated background aurora */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-30%] left-[-20%] w-[70%] h-[70%] rounded-full bg-purple-600/[0.04] blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20%] right-[-15%] w-[60%] h-[60%] rounded-full bg-cyan-500/[0.03] blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-amber-500/[0.02] blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0a0a14]/90 backdrop-blur-2xl border-r border-white/[0.04] flex flex-col transform transition-transform duration-500 ease-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/[0.04]">
          <Link href="/dashboard" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-500 group-hover:scale-105">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">Peakbot</span>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase">AI Music Companion</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5">
          <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-4 mb-3">Navigation</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-violet-500/[0.12] to-fuchsia-500/[0.08] border border-violet-500/20 text-white shadow-lg shadow-violet-500/[0.05]"
                    : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-r-full bg-gradient-to-b from-violet-400 to-fuchsia-400" />
                )}
                <span className={`text-xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
                <div>
                  <p className={`text-sm font-medium ${isActive ? 'text-white' : ''}`}>{item.label}</p>
                  <p className={`text-[10px] ${isActive ? 'text-violet-300/60' : 'text-gray-600'}`}>{item.description}</p>
                </div>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-violet-400 shadow-lg shadow-violet-400/50 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-white/[0.04]">
          <div className="flex items-center gap-3 mb-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.03]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20 ring-2 ring-violet-500/10">
              <span className="text-sm font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || "User"}</p>
              <p className="text-[10px] text-gray-500 truncate">{user?.email || ""}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 text-xs text-gray-500 hover:text-rose-400 hover:bg-rose-500/[0.06] rounded-xl transition-all duration-300 border border-transparent hover:border-rose-500/10"
          >
            ← Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/[0.04] bg-[#0a0a14]/80 backdrop-blur-2xl">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/[0.04] transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-bold bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">Peakbot</span>
          <div className="w-8" />
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}