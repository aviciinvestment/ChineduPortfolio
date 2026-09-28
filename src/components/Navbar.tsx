"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeContext";

const navItems = [
  { name: "Profile", path: "/" },
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Certifications", path: "/certifications" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const pathname = usePathname();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Drafting Guides - Persistent across app */}
      <div className="fixed inset-y-0 left-3 md:left-5 lg:left-10 w-[1px] z-[100] pointer-events-none mix-blend-difference bg-white/30" />
      <div className="fixed inset-y-0 right-3 md:right-5 lg:right-10 w-[1px] z-[100] pointer-events-none mix-blend-difference bg-white/30" />

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 md:right-10 lg:right-10 z-[100] p-4 md:p-5 rounded-full border border-secondary/50 backdrop-blur-sm bg-primary/80 text-accent hover:bg-secondary/20 transition-all duration-300 shadow-lg"
        aria-label="Toggle Theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isDarkMode ? "dark" : "light"}
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.div>
        </AnimatePresence>
      </button>
      {/* Desktop & Mobile Top Navbar */}
      <nav className="relative z-[90] flex justify-between items-start md:items-center px-6 md:px-10 lg:px-20 py-6 md:py-10">
        <div className="absolute bottom-0 left-3 md:left-5 lg:left-10 right-3 md:right-5 lg:right-10 h-[1px] mix-blend-difference bg-white/30 pointer-events-none" />
        
        <div className="flex flex-col gap-2 font-bold text-sm tracking-widest uppercase cursor-pointer group text-accent">
          <Link href="/">
            <span>JOHN CHINEDU<span className="md:hidden"><br/></span><span className="hidden md:inline"> </span>SYSTEMS</span>
          </Link>
        </div>

        <ul className="hidden md:flex gap-12 text-xs font-semibold text-accent/50 uppercase tracking-widest">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link 
                  href={item.path} 
                  className={`transition-colors hover:text-accent ${isActive ? 'text-accent' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col justify-center gap-[7px] p-2 -mr-2 cursor-pointer z-[120]"
        >
          <span className={`block h-[2px] w-8 transition-all duration-300 bg-accent ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
          <span className={`block h-[2px] w-8 transition-all duration-300 bg-accent ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-[2px] w-8 transition-all duration-300 bg-accent ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Slide-In Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 z-[105] bg-black/60 backdrop-blur-[2px]"
            />
            <motion.nav
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 h-full w-[80vw] max-w-[300px] z-[110] shadow-2xl flex flex-col pt-24 px-8 border-l bg-primary border-secondary/50"
            >
              <ul className="flex flex-col gap-8 text-sm font-semibold tracking-widest uppercase">
                {navItems.map((item, i) => {
                  const isActive = pathname === item.path;
                  return (
                    <motion.li 
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                    >
                      <Link 
                        href={item.path} 
                        onClick={() => setIsMenuOpen(false)}
                        className={`block py-2 border-b border-secondary/30 text-accent/60 hover:text-accent ${isActive ? 'text-accent border-accent/50' : ''}`}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
