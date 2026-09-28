"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Mail, Phone, User, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { name: "Profile", path: "/" },
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Certifications", path: "/certifications" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" }
];

export default function ContactPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const darkThemeClasses = "bg-[#030303] text-white";
  const lightThemeClasses = "bg-[#c0c2c9] bg-gradient-to-br from-[#d4d6dc] to-[#a3a5ac] text-[#222]";
  const currentTheme = isDarkMode ? darkThemeClasses : lightThemeClasses;

  return (
    <div className={`relative min-h-screen font-sans selection:bg-white/20 transition-colors duration-700 ${currentTheme}`}>
      
      {/* Drafting Guides */}
      <div className="fixed inset-y-0 left-3 md:left-5 lg:left-10 w-[1px] z-[100] pointer-events-none mix-blend-difference bg-white/30" />
      <div className="fixed inset-y-0 right-3 md:right-5 lg:right-10 w-[1px] z-[100] pointer-events-none mix-blend-difference bg-white/30" />

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      {/* Navbar */}
      <nav className="relative z-50 flex justify-between items-start md:items-center px-6 md:px-10 lg:px-20 py-6 md:py-10">
        <div className="absolute bottom-0 left-3 md:left-5 lg:left-10 right-3 md:right-5 lg:right-10 h-[1px] mix-blend-difference bg-white/30 pointer-events-none" />
        
        <div className={`flex flex-col gap-2 font-bold text-sm tracking-widest uppercase cursor-pointer group ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <Link href="/">
            <span>JOHN CHINEDU<span className="md:hidden"><br/></span><span className="hidden md:inline"> </span>SYSTEMS</span>
          </Link>
        </div>

        <ul className="hidden md:flex gap-12 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path} className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'} ${item.name === 'Contact' ? (isDarkMode ? 'text-white' : 'text-black') : ''}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col justify-center gap-[7px] p-2 -mr-2 cursor-pointer z-50"
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
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
            />
            <motion.nav
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`md:hidden fixed top-0 right-0 h-full w-[80vw] max-w-[300px] z-50 shadow-2xl flex flex-col pt-24 px-8 border-l ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-[#e5e7eb] border-black/10'}`}
            >
              <ul className="flex flex-col gap-8 text-sm font-semibold tracking-widest uppercase">
                {navItems.map((item, i) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link 
                      href={item.path} 
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-2 border-b ${isDarkMode ? 'border-white/10 text-neutral-400 hover:text-white' : 'border-black/10 text-neutral-500 hover:text-black'} ${item.name === 'Contact' ? (isDarkMode ? 'text-white border-white/30' : 'text-black border-black/30') : ''}`}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative pt-24 pb-32 px-6 md:px-10 lg:px-20 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 z-10">
        
        {/* Left Column: Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`flex-1 flex flex-col items-center lg:items-start max-w-md mx-auto lg:mx-0 w-full rounded-3xl border p-8 md:p-12 shadow-2xl backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}
        >
          {/* Profile Image with frame */}
          <div className="relative w-40 h-40 md:w-56 md:h-56 mb-8 group">
            <div className={`absolute inset-0 rounded-full border-2 border-dashed animate-[spin_20s_linear_infinite] ${isDarkMode ? 'border-white/30' : 'border-black/30'}`} />
            <div className={`absolute inset-2 rounded-full overflow-hidden border-4 ${isDarkMode ? 'border-[#0a0a0a] bg-white/5' : 'border-[#e5e7eb] bg-black/5'}`}>
              <Image 
                src="/profile.png" 
                alt="Chinedu John Ezenkwu" 
                fill
                className="object-contain object-bottom scale-[1.2] origin-bottom transition-transform duration-700 group-hover:scale-[1.3]"
              />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-normal tracking-tight text-center lg:text-left font-sans uppercase">
            Chinedu John<br/>
            <span className="font-bold">Ezenkwu</span>
          </h1>
          
          <div className={`h-[1px] w-24 my-6 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`} />
          
          <p className={`text-sm uppercase tracking-[2px] leading-relaxed text-center lg:text-left ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Aerospace & Mechanical<br/>CAD Design Engineer
          </p>
        </motion.div>

        {/* Right Column: Contact Info */}
        <div className="flex-1 flex flex-col justify-center gap-12 w-full mt-8 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <span className={`text-xs font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>06 // GET IN TOUCH</span>
            <h2 className="text-4xl md:text-6xl font-normal tracking-tight uppercase">Contact</h2>
            <p className={`text-sm md:text-base leading-relaxed max-w-lg mt-2 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Available for full-time opportunities, freelance engineering projects, or technical consulting. Let's discuss how we can build high-fidelity solutions together.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            
            {/* Email */}
            <motion.a 
              href="mailto:sosochukwunedum@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`group flex items-center gap-6 p-6 rounded-2xl border transition-all duration-300 ${isDarkMode ? 'border-white/10 hover:border-white/30 hover:bg-white/5' : 'border-black/10 hover:border-black/30 hover:bg-black/5'}`}
            >
              <div className={`p-4 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>
                <Mail strokeWidth={1.5} className="w-6 h-6" />
              </div>
              <div className="flex flex-col flex-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Email</span>
                <span className="text-base md:text-lg tracking-wide font-medium truncate">sosochukwunedum@gmail.com</span>
              </div>
              <ArrowUpRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${isDarkMode ? 'text-white/30 group-hover:text-white' : 'text-black/30 group-hover:text-black'}`} />
            </motion.a>

            {/* LinkedIn */}
            <motion.a 
              href="https://www.linkedin.com/search/results/all/?keywords=Chinedu+John+Ezenkwu"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`group flex items-center gap-6 p-6 rounded-2xl border transition-all duration-300 ${isDarkMode ? 'border-white/10 hover:border-white/30 hover:bg-white/5' : 'border-black/10 hover:border-black/30 hover:bg-black/5'}`}
            >
              <div className={`p-4 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div className="flex flex-col flex-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>LinkedIn</span>
                <span className="text-base md:text-lg tracking-wide font-medium">Chinedu John Ezenkwu</span>
              </div>
              <ArrowUpRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${isDarkMode ? 'text-white/30 group-hover:text-white' : 'text-black/30 group-hover:text-black'}`} />
            </motion.a>

            {/* WhatsApp */}
            <motion.a 
              href="https://wa.me/2349166159310"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`group flex items-center gap-6 p-6 rounded-2xl border transition-all duration-300 ${isDarkMode ? 'border-white/10 hover:border-white/30 hover:bg-white/5' : 'border-black/10 hover:border-black/30 hover:bg-black/5'}`}
            >
              <div className={`p-4 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>
                <Phone strokeWidth={1.5} className="w-6 h-6" />
              </div>
              <div className="flex flex-col flex-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>WhatsApp</span>
                <span className="text-base md:text-lg tracking-wide font-medium">+234 916 615 9310</span>
              </div>
              <ArrowUpRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${isDarkMode ? 'text-white/30 group-hover:text-white' : 'text-black/30 group-hover:text-black'}`} />
            </motion.a>

          </div>
        </div>
      </main>
    </div>
  );
}
