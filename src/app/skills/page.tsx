"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PenTool, Plane, Scan, Activity, FileText } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

export default function SkillsPage() {
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
            <span className={`text-xs font-bold uppercase tracking-[0.2em] text-accent/60`}>03 // EXPERTISE</span>
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight uppercase">Skill & Technical Competencies</h2>
          </div>
          <div className={`h-[1px] w-24 mb-10 bg-secondary/50`} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <motion.div 
              id="cad"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 border border-secondary/30 bg-secondary/10 flex flex-col gap-5 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-300 scroll-mt-32 target:ring-4 target:ring-accent target:bg-secondary/30 target:shadow-[0_0_30px_rgba(188,204,220,0.3)] target:scale-[1.02]"
            >
               <PenTool className="w-10 h-10 text-accent" strokeWidth={1.5} />
               <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-wider text-accent">Mechanical CAD Design</h3>
               <p className="text-base md:text-lg leading-[1.8] text-accent/80 transition-colors">
                 Strong proficiency in developing precise 3D parts, assemblies, and functional mechanical systems, with strong focus on engineering accuracy, performance, and manufacturability.
               </p>
            </motion.div>

            <motion.div 
              id="uav"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 border border-secondary/30 bg-secondary/10 flex flex-col gap-5 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-300 scroll-mt-32 target:ring-4 target:ring-accent target:bg-secondary/30 target:shadow-[0_0_30px_rgba(188,204,220,0.3)] target:scale-[1.02]"
            >
               <Plane className="w-10 h-10 text-accent" strokeWidth={1.5} />
               <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-wider text-accent">UAV Design</h3>
               <p className="text-base md:text-lg leading-[1.8] text-accent/80 transition-colors">
                 Experienced in UAV 3D design, from preliminary constraint analysis and design requirements through detailed CAD modelling and development using SOLIDWORKS and CATIA, with emphasis on accuracy, functionality, and manufacturability for 3D printing and moulding applications.
               </p>
            </motion.div>

            <motion.div 
              id="rev"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-8 border border-secondary/30 bg-secondary/10 flex flex-col gap-5 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-300 scroll-mt-32 target:ring-4 target:ring-accent target:bg-secondary/30 target:shadow-[0_0_30px_rgba(188,204,220,0.3)] target:scale-[1.02]"
            >
               <Scan className="w-10 h-10 text-accent" strokeWidth={1.5} />
               <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-wider text-accent">Reverse Engineering</h3>
               <p className="text-base md:text-lg leading-[1.8] text-accent/80 transition-colors">
                 Experienced in reverse engineering worn and damaged mechanical components using Geomagic Design X and SOLIDWORKS, transforming scanned or physical part data into accurate, editable 3D CAD models suitable for manufacturing and 3D printing.
               </p>
            </motion.div>

            <motion.div 
              id="ansys"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-8 border border-secondary/30 bg-secondary/10 flex flex-col gap-5 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-300 scroll-mt-32 target:ring-4 target:ring-accent target:bg-secondary/30 target:shadow-[0_0_30px_rgba(188,204,220,0.3)] target:scale-[1.02]"
            >
               <Activity className="w-10 h-10 text-accent" strokeWidth={1.5} />
               <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-wider text-accent">ANSYS Simulation</h3>
               <p className="text-base md:text-lg leading-[1.8] text-accent/80 transition-colors">
                 Experienced in using ANSYS for engineering simulations, including Finite Element Analysis (FEA) and Computational Fluid Dynamics (CFD), to evaluate structural performance, stress, deformation, fluid behaviour, and overall design performance.
               </p>
            </motion.div>

            <motion.div 
              id="draw"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-8 border border-secondary/30 bg-secondary/10 flex flex-col gap-5 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-300 lg:col-span-2 scroll-mt-32 target:ring-4 target:ring-accent target:bg-secondary/30 target:shadow-[0_0_30px_rgba(188,204,220,0.3)] target:scale-[1.02]"
            >
               <FileText className="w-10 h-10 text-accent" strokeWidth={1.5} />
               <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-wider text-accent">Engineering Drawing & Documentation</h3>
               <p className="text-base md:text-lg leading-[1.8] text-accent/80 transition-colors">
                 Experienced in producing production-ready engineering drawings with proper dimensioning, tolerancing, and industry-standard annotations.
               </p>
            </motion.div>

          </div>
        </motion.section>

      </main>
    </div>
  );
}
