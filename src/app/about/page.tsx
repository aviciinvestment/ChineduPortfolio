"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Profile", path: "/" },
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Certifications", path: "/certifications" },
  { name: "Projects", path: "/#projects" },
  { name: "Contact", path: "/contact" }
];

export default function AboutPage() {
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
      <nav className="relative z-10 flex justify-between items-start md:items-center px-6 md:px-10 lg:px-20 py-6 md:py-10">
        <div className="absolute bottom-0 left-3 md:left-5 lg:left-10 right-3 md:right-5 lg:right-10 h-[1px] mix-blend-difference bg-white/30 pointer-events-none" />
        
        <div className={`flex flex-col gap-2 font-bold text-sm tracking-widest uppercase cursor-pointer group ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <Link href="/">
            <span>JOHN CHINEDU<span className="md:hidden"><br/></span><span className="hidden md:inline"> </span>SYSTEMS</span>
          </Link>
        </div>

        <ul className="hidden md:flex gap-12 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path} className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-center gap-[7px] p-2 -mr-2 cursor-pointer z-50"
        >
          <span className={`block h-[2px] w-8 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
          <span className={`block h-[2px] w-8 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
          <span className={`block h-[2px] w-8 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
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
              transition={{ duration: 0.4, ease: [0.165, 0.84, 0.44, 1] }}
              className={`md:hidden fixed top-0 right-0 h-full w-[80%] max-w-xs z-50 flex flex-col p-8 shadow-2xl ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#d4d6dc] text-[#222]'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className={`p-2 -mr-2 cursor-pointer text-xl leading-none transition-opacity hover:opacity-60 ${isDarkMode ? 'text-white' : 'text-black'}`}
                >
                  &#10005;
                </button>
              </div>

              <div className={`h-[1px] w-full my-6 ${isDarkMode ? 'bg-white/15' : 'bg-black/15'}`} />

              <ul className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-3 text-2xl font-light uppercase tracking-tight transition-colors ${isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-[#555] hover:text-black'}`}
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
      <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 lg:px-20 py-16 md:py-24 flex flex-col gap-20">
        
        {/* ABOUT THIS PROFILE */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <span className={`text-xs font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>01 // OVERVIEW</span>
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight uppercase">About This Profile</h2>
          </div>
          <div className={`h-[1px] w-24 mb-4 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`} />
          <p className={`text-lg md:text-xl leading-[1.8] max-w-3xl ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
            This portfolio has been created to complement my résumé and provide an overview of selected projects that highlight my experience and technical capabilities. Each project showcases my practical application of engineering principles, problem-solving skills, attention to detail, and growth in CAD design and engineering. For further information or enquiries regarding any of the projects featured, please feel free to contact me.
          </p>
        </motion.section>

        {/* ABOUT ME */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <span className={`text-xs font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>02 // BACKGROUND</span>
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight uppercase">About Me</h2>
          </div>
          <div className={`h-[1px] w-24 mb-4 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`} />
          <div className={`text-lg md:text-xl leading-[1.8] max-w-4xl flex flex-col gap-8 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
            <p>
              I am an Aerospace Engineering graduate of the Air Force Institute of Technology (AFIT), with a strong passion for aerospace and mechanical design. My interest in engineering design has driven a continuous commitment to learning and professional development, leading to certifications including the Certified SOLIDWORKS Associate (CSWA), Certified SOLIDWORKS Professional (CSWP) and training in CNC programming and SOLIDWORKS CAM.
            </p>
            <p>
              My areas of expertise and interest span mechanical component design, UAV development and CAD modelling, reverse engineering using Geomagic Design X, and engineering simulation using ANSYS, including FEA and CFD. I particularly enjoy transforming engineering concepts and design requirements into precise, functional CAD models while applying creative problem-solving to address practical engineering challenges.
            </p>
            <p>
              Professionally, I work as a remote contract CAD designer with StehaTech, Belgium, where my responsibilities include CAD modelling using SOLIDWORKS and CATIA, as well as reverse engineering of mechanical components. I also currently work on-site as a CAD Designer at Terra Industries, where I am involved in detailed UAV CAD modelling, reverse engineering and modelling of worn mechanical casings for 3D printing, and preparation of CAD files for CNC cutting of materials such as MDF, carbon fibre, and acrylic boards. My work also extends to sheet metal modelling Geometry as well as preparing designs for laser and plasma cutting.
            </p>
            <p>
              Through these experiences, I continue to develop a strong combination of aerospace engineering knowledge, CAD expertise, reverse engineering capability, and practical manufacturing awareness, with a focus on creating accurate, functional, and manufacturable engineering solutions.
            </p>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
