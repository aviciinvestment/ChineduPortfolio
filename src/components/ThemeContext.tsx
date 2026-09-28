"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("chinedu-theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("chinedu-theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`relative min-h-screen font-sans selection:bg-white/20 ${mounted ? 'transition-colors duration-700' : ''} bg-primary text-accent ${isDarkMode ? 'dark' : ''}`}>
        {/* Faint Grid Lines */}
        <div 
          className="fixed inset-0 pointer-events-none z-0 transition-colors duration-700" 
          style={{ 
            backgroundImage: `linear-gradient(to right, ${isDarkMode ? 'rgba(188,204,220,0.05)' : 'rgba(16,42,67,0.05)'} 1px, transparent 1px), linear-gradient(to bottom, ${isDarkMode ? 'rgba(188,204,220,0.05)' : 'rgba(16,42,67,0.05)'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
