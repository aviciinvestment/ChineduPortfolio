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

      {/* Floating Toggle Button */}
      <button 
        onClick={toggleTheme}
        className={`fixed bottom-6 right-6 z-[110] p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      {/* Desktop & Mobile Top Navbar */}
      <nav className="relative z-[90] flex justify-between items-start md:items-center px-6 md:px-10 lg:px-20 py-6 md:py-10">
        <div className="absolute bottom-0 left-3 md:left-5 lg:left-10 right-3 md:right-5 lg:right-10 h-[1px] mix-blend-difference bg-white/30 pointer-events-none" />
        
        <div className={`flex flex-col gap-2 font-bold text-sm tracking-widest uppercase cursor-pointer group ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <Link href="/">
            <span>JOHN CHINEDU<span className="md:hidden"><br/></span><span className="hidden md:inline"> </span>SYSTEMS</span>
          </Link>
        </div>

        <ul className="hidden md:flex gap-12 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link 
                  href={item.path} 
                  className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'} ${isActive ? (isDarkMode ? 'text-white' : 'text-black') : ''}`}
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
          <span className={`block h-[2px] w-8 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-black'} ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
          <span className={`block h-[2px] w-8 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-black'} ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-[2px] w-8 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-black'} ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
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
              className={`md:hidden fixed top-0 right-0 h-full w-[80vw] max-w-[300px] z-[110] shadow-2xl flex flex-col pt-24 px-8 border-l ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-[#e5e7eb] border-black/10'}`}
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
                        className={`block py-2 border-b ${isDarkMode ? 'border-white/10 text-neutral-400 hover:text-white' : 'border-black/10 text-neutral-500 hover:text-black'} ${isActive ? (isDarkMode ? 'text-white border-white/30' : 'text-black border-black/30') : ''}`}
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
