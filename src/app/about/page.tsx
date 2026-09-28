"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeContext";

export default function AboutPage() {
  const { isDarkMode } = useTheme();

  return (
    <div className="w-full">
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
            <span className={`text-xs font-bold uppercase tracking-[0.2em] text-accent/60`}>01 // OVERVIEW</span>
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight uppercase">About This Profile</h2>
          </div>
          <div className={`h-[1px] w-24 mb-4 bg-secondary/50`} />
          <p className={`text-lg md:text-xl leading-[1.8] max-w-3xl text-accent/90`}>
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
            <span className={`text-xs font-bold uppercase tracking-[0.2em] text-accent/60`}>02 // BACKGROUND</span>
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight uppercase">About Me</h2>
          </div>
          <div className={`h-[1px] w-24 mb-4 bg-secondary/50`} />
          <div className={`text-lg md:text-xl leading-[1.8] max-w-4xl flex flex-col gap-8 text-accent/90`}>
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
