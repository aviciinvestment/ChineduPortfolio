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

  // We add a wrapper div that automatically applies the correct background theme.
  // This simplifies pages significantly.
  const darkThemeClasses = "bg-[#030303] text-white";
  const lightThemeClasses = "bg-[#c0c2c9] bg-gradient-to-br from-[#d4d6dc] to-[#a3a5ac] text-[#222]";
  const currentTheme = isDarkMode ? darkThemeClasses : lightThemeClasses;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`relative min-h-screen font-sans selection:bg-white/20 ${mounted ? 'transition-colors duration-700' : ''} ${currentTheme}`}>
        {/* Faint Grid Lines */}
        <div 
          className="fixed inset-0 pointer-events-none z-0" 
          style={{ 
            backgroundImage: `linear-gradient(to right, ${isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px), linear-gradient(to bottom, ${isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
