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
  // Using the new monochromatic cool blue palette for rebranding
  const darkThemeClasses = "bg-primary text-accent";
  const lightThemeClasses = "bg-primary text-accent";
  const currentTheme = isDarkMode ? darkThemeClasses : lightThemeClasses;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`relative min-h-screen font-sans selection:bg-white/20 ${mounted ? 'transition-colors duration-700' : ''} ${currentTheme}`}>
        {/* Faint Grid Lines */}
        <div 
          className="fixed inset-0 pointer-events-none z-0" 
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(188,204,220,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(188,204,220,0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
