"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeContext";

export default function CertificationsPage() {
  const { isDarkMode } = useTheme();

  return (
    <div className="w-full">
      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 lg:px-20 py-16 md:py-24 flex flex-col gap-20">
        
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <span className={`text-xs font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>04 // AWARDS</span>
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight uppercase">Certifications</h2>
          </div>
          <div className={`h-[1px] w-24 mb-10 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`} />
          
          <div className="flex justify-center items-center py-20">
             <p className={`text-lg uppercase tracking-widest ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Content coming soon...</p>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
