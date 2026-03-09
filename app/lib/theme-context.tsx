"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always default to "dark" for both server and client initial render
  const [theme, setTheme] = useState<Theme>("dark");

  // On mount, read the saved theme from localStorage and apply it
  useEffect(() => {
    let savedTheme: Theme = "dark";
    try {
      const stored = localStorage.getItem("peakbot_theme") as Theme | null;
      if (stored === "dark" || stored === "light") {
        savedTheme = stored;
      } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        savedTheme = "light";
      }
    } catch {
      // localStorage may not be available
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(savedTheme);
  }, []);

  // Apply theme to DOM whenever theme changes
  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    try {
      localStorage.setItem("peakbot_theme", theme);
    } catch {
      // localStorage may not be available
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  // Always render children — never return a placeholder div
  // This ensures server HTML matches client HTML on first render
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
