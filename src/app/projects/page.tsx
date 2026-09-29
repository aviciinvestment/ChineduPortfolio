"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";
import Slideshow from "./[id]/Slideshow";

export default function Projects() {
  const { isDarkMode } = useTheme();

  return (
    <div className="w-full">
      {/* Main Content */}
      <main className="flex-1 relative z-10 px-6 md:px-10 lg:px-20 pt-8 md:pt-12 pb-32 max-w-6xl mx-auto w-full">
        
        <div className="flex justify-between items-center mb-10 md:mb-16">
          <Link 
            href="/#projects" 
            className={`group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full border transition-all duration-300 backdrop-blur-sm hover:scale-105 ${isDarkMode ? 'border-white/10 text-neutral-400 hover:text-white hover:bg-white/5 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'border-black/10 text-neutral-600 hover:text-black hover:bg-black/5 hover:border-black/30 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]'}`}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <span className={`hidden md:inline-block text-[10px] uppercase tracking-[0.3em] font-bold ${isDarkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>Project Details</span>
        </div>

        {/* Project Section: V12 Engine */}
        <section id="v12-engine" className="flex flex-col gap-12 md:gap-20">
          
          <div className="flex flex-col-reverse md:flex-col gap-10">
            <div className="flex flex-col gap-6 w-full text-center md:text-left">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tighter uppercase drop-shadow-sm break-words text-balance">
                V12 CAR ENGINE
              </h1>
              <div className={`flex flex-wrap justify-center md:justify-start gap-3 text-[10px] md:text-xs font-bold uppercase tracking-wider text-accent/70`}>
                <span className={`px-4 py-2 rounded-full border bg-opacity-20 backdrop-blur-md ${isDarkMode ? 'border-white/20 bg-white/5 text-white' : 'border-black/20 bg-black/5 text-black'}`}>SOLIDWORKS</span>
                <span className={`px-4 py-2 rounded-full border bg-opacity-20 backdrop-blur-md ${isDarkMode ? 'border-white/20 bg-white/5 text-white' : 'border-black/20 bg-black/5 text-black'}`}>Parts & Assemblies</span>
                <span className={`px-4 py-2 rounded-full border bg-opacity-20 backdrop-blur-md ${isDarkMode ? 'border-white/20 bg-white/5 text-white' : 'border-black/20 bg-black/5 text-black'}`}>Motion Studies</span>
              </div>
            </div>

            {/* Main Hero Image via Slideshow */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <Slideshow 
                slides={[{ type: "image", url: "/v12-engine-new.jpg" }]} 
                title="V12 CAR ENGINE" 
                cover="/v12-engine-new.jpg" 
              />
            </motion.div>
          </div>

          <div className={`flex flex-col gap-8 md:gap-12 max-w-4xl mx-auto w-full text-[15px] md:text-lg leading-[1.8] font-light text-accent/90`}>
            <div className="flex flex-col gap-6">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                A detailed 3D CAD model of a V12 internal combustion engine developed to demonstrate advanced mechanical design and assembly modelling capabilities. The project involved modelling key engine components, including the engine block, cylinder heads, pistons, connecting rods, crankshaft, camshafts, valve-train components, intake and exhaust systems, and other supporting components.
              </p>
              <p>
                The assembly was developed with careful attention to component interfaces, mechanical relationships, clearances, and overall assembly functionality. The project demonstrates proficiency in complex part modelling, multi-component assemblies, design intent, and the integration of numerous mechanical components into a functional engine system.
              </p>
            </div>
            
            <div className={`p-8 md:p-10 rounded-3xl border backdrop-blur-md ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-white/30' : 'bg-black/30'}`} />
                <h4 className={`text-sm md:text-base font-bold uppercase tracking-[0.2em] text-accent`}>My Contributions</h4>
              </div>
              <p className="mb-6">
                I was responsible for the 3D CAD development and assembly of the V12 engine model, translating the engine concept into detailed, accurately constrained components and assemblies. My contribution included:
              </p>
              <ul className="flex flex-col gap-4">
                {[
                  { title: "Full 3D Modelling", desc: "Developing detailed 3D models of major engine components, including the engine block, cylinder heads, pistons, connecting rods, crankshaft, camshafts, valves, intake and exhaust systems." },
                  { title: "Assembling", desc: "Creating and managing the complete engine assembly using appropriate mates and component relationships." },
                  { title: "Analysis Prep", desc: "Preparing the CAD model and associated components for further engineering analysis, and potential manufacturing applications." },
                  { title: "Attention to Details", desc: "Applying design intent, dimensional accuracy, clearances, and component interfaces throughout the modelling process." }
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}>
                    <div className={`mt-1 p-1.5 rounded-full bg-secondary/20`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-warm`} />
                    </div>
                    <div>
                      <strong className={`block text-sm uppercase tracking-wider mb-1 text-accent`}>{item.title}</strong>
                      <span className="text-sm md:text-base leading-relaxed opacity-90">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 mb-2">
                <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-white/30' : 'bg-black/30'}`} />
                <h4 className={`text-sm md:text-base font-bold uppercase tracking-[0.2em] text-accent`}>Result & Impact</h4>
              </div>
              <p>
                The project resulted in a detailed and fully assembled 3D CAD representation of a V12 engine, with its major mechanical components accurately modelled and integrated into a cohesive assembly. The completed model demonstrates my ability to manage complex mechanical assemblies, maintain component relationships and clearances, and apply precision throughout the design process.
              </p>
              <p>
                The project also strengthened my proficiency in advanced CAD modelling, assembly design, and mechanical system development, while providing a detailed digital representation that can support design visualization, engineering analysis, documentation, and future manufacturing considerations.
              </p>
            </div>

            <div className={`p-8 rounded-3xl border border-dashed ${isDarkMode ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'}`}>
              <h4 className={`text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-6 text-accent`}>Tools & Reference</h4>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3">
                  <ArrowLeft className="w-4 h-4 rotate-180 opacity-50" />
                  <span><strong>Software:</strong> SOLIDWORKS (Parts, Assemblies, Motion Studies)</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowLeft className="w-4 h-4 rotate-180 opacity-50" />
                  <span><strong>Reference sources:</strong> Automotive technical manuals, industry design standards</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
