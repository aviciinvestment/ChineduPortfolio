"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Moon, Sun, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Profile", path: "/" },
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Certifications", path: "/certifications" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" }
];

export default function Projects() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.className = isDarkMode ? "bg-neutral-950 text-white" : "bg-neutral-50 text-black";
  }, [isDarkMode]);

  const currentTheme = isDarkMode ? "bg-neutral-950 text-white" : "bg-neutral-50 text-black";

  return (
    <div className={`min-h-screen w-full flex flex-col font-sans transition-colors duration-700 ${currentTheme}`}>
      
      {/* Global Drafting Guides (Background) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 bottom-0 left-5 md:left-10 w-[1px] mix-blend-difference bg-white/20" />
        <div className="absolute top-0 bottom-0 right-5 md:right-10 w-[1px] mix-blend-difference bg-white/20" />
        <div className="absolute top-5 md:top-10 left-0 right-0 h-[1px] mix-blend-difference bg-white/20" />
        <div className="absolute bottom-5 md:bottom-10 left-0 right-0 h-[1px] mix-blend-difference bg-white/20" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 md:p-10 z-50 flex justify-between items-center mix-blend-difference text-white">
        <Link href="/" className="text-sm font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">
          Chinedu<br/>Portfolio
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center text-xs tracking-widest uppercase font-medium">
          {navItems.map((item) => (
            <Link key={item.name} href={item.path} className="hover:opacity-70 transition-opacity">
              {item.name}
            </Link>
          ))}
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="ml-4 p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
            {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden p-2 uppercase text-xs tracking-widest" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 ${isDarkMode ? 'bg-neutral-950' : 'bg-neutral-50'}`}>
          {navItems.map((item) => (
            <Link key={item.name} href={item.path} onClick={() => setIsMenuOpen(false)} className={`text-2xl font-light uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {item.name}
            </Link>
          ))}
          <button onClick={() => { setIsDarkMode(!isDarkMode); setIsMenuOpen(false); }} className={`mt-8 p-4 rounded-full border ${isDarkMode ? 'border-white/20 text-white' : 'border-black/20 text-black'}`}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 relative z-10 px-6 md:px-10 lg:px-20 pt-32 pb-24 max-w-5xl mx-auto w-full">
        
        <Link href="/#projects" className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-12 hover:opacity-70 transition-opacity ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Project Section: V12 Engine */}
        <section id="v12-engine" className="flex flex-col gap-12">
          
          {/* Main Hero Image at the TOP */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full relative aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden border ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'} shadow-2xl p-4`}
          >
            <div className={`relative w-full h-full rounded-2xl overflow-hidden ${isDarkMode ? 'bg-white/90' : 'bg-black/10'}`}>
              <Image 
                src="/v12-engine-new.jpg" 
                alt="V12 Car Engine CAD Model" 
                fill
                className="object-cover md:object-contain drop-shadow-2xl mix-blend-multiply"
              />
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-6xl font-normal tracking-tight uppercase">V12 CAR ENGINE</h1>
            <div className={`flex flex-wrap gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              <span className={`px-3 py-1.5 rounded-full border ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}>SOLIDWORKS</span>
              <span className={`px-3 py-1.5 rounded-full border ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}>Parts & Assemblies</span>
              <span className={`px-3 py-1.5 rounded-full border ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}>Motion Studies</span>
            </div>
          </div>

          <div className={`flex flex-col gap-6 text-[15px] md:text-lg leading-[1.8] ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
            <p>
              A detailed 3D CAD model of a V12 internal combustion engine developed to demonstrate advanced mechanical design and assembly modelling capabilities. The project involved modelling key engine components, including the engine block, cylinder heads, pistons, connecting rods, crankshaft, camshafts, valve-train components, intake and exhaust systems, and other supporting components.
            </p>
            <p>
              The assembly was developed with careful attention to component interfaces, mechanical relationships, clearances, and overall assembly functionality. The project demonstrates proficiency in complex part modelling, multi-component assemblies, design intent, and the integration of numerous mechanical components into a functional engine system.
            </p>
            
            <h4 className={`text-sm md:text-base font-bold uppercase tracking-[0.15em] mt-8 border-l-2 pl-4 py-1 ${isDarkMode ? 'text-white border-white' : 'text-black border-black'}`}>My Contributions</h4>
            <p>
              I was responsible for the 3D CAD development and assembly of the V12 engine model, translating the engine concept into detailed, accurately constrained components and assemblies. My contribution included:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-3">
              <li><strong>Full 3D Modelling:</strong> Developing detailed 3D models of major engine components, including the engine block, cylinder heads, pistons, connecting rods, crankshaft, camshafts, valves, intake and exhaust systems.</li>
              <li><strong>Assembling:</strong> Creating and managing the complete engine assembly using appropriate mates and component relationships.</li>
              <li><strong>Analysis Prep:</strong> Preparing the CAD model and associated components for further engineering analysis, and potential manufacturing applications.</li>
              <li><strong>Attention to Details:</strong> Applying design intent, dimensional accuracy, clearances, and component interfaces throughout the modelling process.</li>
            </ul>

            <h4 className={`text-sm md:text-base font-bold uppercase tracking-[0.15em] mt-8 border-l-2 pl-4 py-1 ${isDarkMode ? 'text-white border-white' : 'text-black border-black'}`}>Result & Impact</h4>
            <p>
              The project resulted in a detailed and fully assembled 3D CAD representation of a V12 engine, with its major mechanical components accurately modelled and integrated into a cohesive assembly. The completed model demonstrates my ability to manage complex mechanical assemblies, maintain component relationships and clearances, and apply precision throughout the design process.
            </p>
            <p>
              The project also strengthened my proficiency in advanced CAD modelling, assembly design, and mechanical system development, while providing a detailed digital representation that can support design visualization, engineering analysis, documentation, and future manufacturing considerations.
            </p>

            <h4 className={`text-sm md:text-base font-bold uppercase tracking-[0.15em] mt-8 border-l-2 pl-4 py-1 ${isDarkMode ? 'text-white border-white' : 'text-black border-black'}`}>Tools & Reference</h4>
            <ul className="list-disc pl-6 flex flex-col gap-3">
              <li><strong>Software:</strong> SOLIDWORKS (Parts, Assemblies, Motion Studies)</li>
              <li><strong>Reference sources:</strong> Automotive technical manuals, industry design standards</li>
            </ul>
          </div>
        </section>

      </main>
    </div>
  );
}
