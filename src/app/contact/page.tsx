"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, User, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeContext";

export default function ContactPage() {
  const { isDarkMode } = useTheme();

  return (
    <div className="w-full">
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
