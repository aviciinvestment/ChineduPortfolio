"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { PenTool, Plane, Scan, Activity, Box, ArrowRight } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

const skills = [
  { name: "Mechanical CAD Design", icon: PenTool, id: "cad" },
  { name: "UAV Design", icon: Plane, id: "uav" },
  { name: "Reverse Engineering", icon: Scan, id: "rev" },
  { name: "ANSYS Simulation", icon: Activity, id: "sim" },
  { name: "Engineering Drawing", icon: Box, id: "draw" }
];

export type HomeProject = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  media: { type: string; url: string }[];
};

const coverFor = (project: HomeProject) =>
  project.imageUrl ??
  project.media.find((item) => item.type === "image")?.url ??
  "/v12-engine-new.jpg";

const excerpt = (text: string) =>
  text.length > 160 ? `${text.slice(0, 160).trimEnd()}...` : text;

export default function HomeView({ projects }: { projects: HomeProject[] }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const containerRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation variants
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
  };

  const spellVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.1
      }
    })
  };

  return (
    <div ref={containerRef} className="w-full relative">
      
      {/* Background Flowing Models */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10 md:opacity-20 mix-blend-overlay">
        {[1, 2, 3, 4].map((num, i) => (
          <motion.div
            key={`flow-${num}`}
            initial={{ y: "-20vh" }}
            animate={{ y: "120vh", rotate: 360 }}
            transition={{ 
              repeat: Infinity, 
              duration: 25 + i * 5, 
              ease: "linear",
              delay: i * 4
            }}
            className="absolute w-24 md:w-40 aspect-square"
            style={{ left: `${15 + i * 20}%` }}
          >
            <Image 
              src={`/part2_${num}.png`}
              alt="Background Model"
              fill
              className="object-contain"
            />
          </motion.div>
        ))}
      </div>

      {/* SECTION 1 */}
      <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
        {/* Background Huge Text Wrapper */}
        <div 
          className="absolute top-1/2 left-1/2 w-full z-0 pointer-events-none select-none mix-blend-plus-lighter"
          style={{ transform: `translate(calc(-50% + ${mousePos.x * -60}px), calc(-50% + ${mousePos.y * -60}px))` }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex justify-between w-full px-[5vw] text-[30vw] font-black leading-none text-transparent tracking-tighter"
            style={{ WebkitTextStroke: isDarkMode ? "1px rgba(255, 255, 255, 0.05)" : "1px rgba(0, 0, 0, 0.05)" }}
          >
            <span>O</span>
            <span>N</span>
            <span>E</span>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative flex-1 flex flex-col lg:flex-row items-center justify-center pt-4 md:pt-20 lg:pt-32 px-6 md:px-10 lg:px-20 z-10 w-full max-w-6xl mx-auto pb-20 lg:pb-0 gap-6 md:gap-8 lg:gap-12">
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerVariants}
            className="relative z-20 w-full lg:w-auto flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 mt-4 md:mt-0"
          >
            {/* Name Block */}
            <motion.div variants={fadeUpVariants} className="flex flex-col items-center lg:items-start gap-1 w-full">
              <span className="text-xl md:text-2xl font-black uppercase tracking-[0.3em] text-accent">
                John Chinedu
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="flex flex-col items-center lg:items-start w-full z-10">
              <h1 className="text-[clamp(2.75rem,8.5vw,7rem)] font-light leading-[0.95] tracking-tighter w-full text-accent whitespace-nowrap">
                {Array.from("DYNAMIC 3D").map((char, i) => (
                  <motion.span key={`d-${i}`} custom={i} variants={spellVariants} initial="hidden" animate="visible" className="inline-block">
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}<br/>
                {Array.from("MECHANICAL").map((char, i) => (
                  <motion.span key={`m-${i}`} custom={i + 10} variants={spellVariants} initial="hidden" animate="visible" className="inline-block font-medium">
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}<br/>
                <span className="font-black not-italic text-white">
                  {Array.from("DESIGN").map((char, i) => (
                    <motion.span key={`des-${i}`} custom={i + 20} variants={spellVariants} initial="hidden" animate="visible" className="inline-block">
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </div>

            {/* Bio & Button Block */}
              <motion.div variants={fadeUpVariants} className="flex flex-col items-center lg:items-start gap-8 max-w-[450px]">
                <p className="text-[clamp(0.75rem,1.5vw,0.9rem)] uppercase tracking-[3px] leading-[1.8] font-medium text-center lg:text-left text-accent/80">
                  CRAFTING HIGH-FIDELITY<br/>
                  MECHANISMS AND FUNCTIONAL<br/>
                  PROTOTYPES
                </p>
                <Link href="/projects" className="group relative flex items-center justify-center gap-3 px-8 sm:px-10 py-5 border-2 border-accent/40 rounded-full text-[clamp(0.65rem,1.5vw,0.9rem)] font-bold uppercase tracking-[2px] overflow-hidden transition-all duration-500 cursor-pointer backdrop-blur-md text-accent hover:text-warm-fg hover:border-warm bg-secondary/20 hover:shadow-[0_0_40px_rgba(234,88,12,0.45)] hover:scale-105 active:scale-95">
                  <span className="absolute inset-0 w-full h-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-x-100 -z-10 bg-warm" />
                  Explore Designs
                </Link>
              </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="relative w-full lg:w-auto flex justify-center lg:justify-start z-10 shrink-0 mt-4 lg:mt-0"
            style={{ transform: `translate(calc(${mousePos.x * 15}px), calc(${mousePos.y * 15}px))` }}
          >
            <div className="relative w-72 h-72 max-w-full md:w-96 md:h-96 lg:w-[480px] lg:h-[580px] rounded-[3rem] overflow-hidden border-[6px] border-warm/40 shadow-[0_0_80px_rgba(234,88,12,0.4)] bg-secondary/10 hover:shadow-[0_0_100px_rgba(234,88,12,0.55)] transition-shadow duration-700 group">
              <Image 
                src="/profile.png" 
                alt="John Chinedu Profile" 
                fill
                sizes="(max-width: 768px) 288px, (max-width: 1024px) 384px, 480px"
                quality={100}
                unoptimized={true}
                className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 border-[2px] border-accent/30 rounded-[3rem] pointer-events-none mix-blend-overlay" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="relative z-50 w-full h-0">
        <div className="absolute top-0 left-3 md:left-5 lg:left-10 right-3 md:right-5 lg:right-10 h-[1px] bg-gradient-to-r from-transparent via-warm/70 to-transparent pointer-events-none" />
      </div>

      {/* SKILLS PLAYGROUND SECTION */}
      <section id="skills" className="relative min-h-[70vh] w-full overflow-hidden flex flex-col z-20 transition-colors duration-700 py-20">
        <div className="absolute inset-0 z-0 pointer-events-none flex flex-col items-center justify-center opacity-[0.03]">
          <h2 className="text-[clamp(4rem,15vw,12rem)] font-black uppercase tracking-tighter">SKILLS</h2>
        </div>
        
        <div className="relative flex-1 flex flex-col items-center justify-center px-6 md:px-20 z-10 w-full gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent/60">03 // EXPERTISE</span>
            <p className="text-sm uppercase tracking-widest text-accent/70">Drag and throw to explore</p>
          </div>

          <div ref={skillsRef} className="relative w-full max-w-5xl h-auto min-h-[400px] md:h-[50vh] border border-dashed rounded-3xl flex flex-wrap gap-3 md:gap-8 items-center justify-center p-4 md:p-8 z-10 overflow-hidden border-warm/40">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.id}
                  drag
                  dragConstraints={skillsRef}
                  dragElastic={0.2}
                  whileDrag={{ scale: 1.1, zIndex: 50, cursor: "grabbing" }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => router.push(`/skills#${skill.id}`)}
                  className="relative flex flex-col items-center justify-center gap-2 md:gap-3 p-3 md:p-6 w-28 sm:w-32 md:w-40 aspect-square rounded-2xl cursor-grab backdrop-blur-md border shadow-[0_0_20px_rgba(233,151,91,0.25)] transition-colors duration-300 bg-secondary/20 border-secondary/40 hover:bg-warm/25 hover:border-warm/60 text-accent"
                  style={{ zIndex: index }}
                >
                  <Icon className="w-8 h-8 md:w-10 md:h-10 pointer-events-none shrink-0" strokeWidth={1.5} />
                  <span className="text-[10px] md:text-xs font-bold text-center leading-tight uppercase tracking-wider pointer-events-none w-full px-1 break-words">{skill.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="relative z-50 w-full h-0">
        <div className="absolute top-0 left-3 md:left-5 lg:left-10 right-3 md:right-5 lg:right-10 h-[1px] bg-gradient-to-r from-transparent via-warm/70 to-transparent pointer-events-none" />
      </div>

      {/* PROJECTS SECTION */}
      {projects.length > 0 && (
        <section id="projects" className="relative min-h-screen w-full flex flex-col z-20 transition-colors duration-700 py-24 md:py-32">
          <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-20 w-full flex flex-col gap-16 z-10">
            
            {/* Section Header */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent/60">04 // FEATURED WORK</span>
              <h2 className="text-4xl md:text-6xl font-normal tracking-tight uppercase text-accent">Projects</h2>
              <div className="h-[1px] w-24 mt-4 bg-gradient-to-r from-warm to-transparent" />
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => {
                const cover = coverFor(project);
                return (
                  <Link key={project.id} href={`/projects#${project.id}`} className="group">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="flex flex-col gap-6 rounded-3xl overflow-hidden border border-secondary/40 bg-secondary/10 hover:bg-secondary/20 hover:border-warm/50 hover:shadow-[0_18px_45px_-20px_rgba(194,87,31,0.55)] p-6 transition-all duration-300"
                    >
                      <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden bg-accent/10">
                        {cover.startsWith("/") || cover.includes("res.cloudinary.com") ? (
                          <Image 
                            src={cover} 
                            alt={`${project.title} cover image`} 
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover md:object-contain drop-shadow-xl transition-transform duration-700 group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={cover} alt={`${project.title} cover image`} className="absolute inset-0 w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex flex-col gap-3">
                        <h3 className="text-2xl font-semibold uppercase tracking-tight text-accent">{project.title}</h3>
                        <p className="text-sm leading-relaxed text-accent/80">
                          {excerpt(project.description)}
                        </p>
                        <div className="text-xs font-bold uppercase tracking-wider mt-4 flex items-center gap-2 text-accent">
                          View Project <ArrowRight size={14} className="text-warm group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
            
          </div>
        </section>
      )}

    </div>
  );
}
