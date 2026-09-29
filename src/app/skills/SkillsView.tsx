"use client";

import { motion } from "framer-motion";
import { getSkillIcon } from "@/lib/icons";

type Skill = {
  id: string;
  name: string;
  description: string;
  iconName: string | null;
  slug: string | null;
};

export default function SkillsView({ skills }: { skills: Skill[] }) {
  return (
    <div className="w-full">
      <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 lg:px-20 pt-16 pb-28 md:pt-24 md:pb-28 flex flex-col gap-20">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent/60">
              03 // EXPERTISE
            </span>
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight uppercase">
              Skill &amp; Technical Competencies
            </h2>
          </div>
          <div className="h-[1px] w-24 mb-10 bg-gradient-to-r from-warm to-transparent" />

          {skills.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <p className="text-lg uppercase tracking-widest text-accent/60">
                Skills coming soon...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {skills.map((skill, index) => {
                const Icon = getSkillIcon(skill.iconName);
                return (
                  <motion.div
                    key={skill.id}
                    id={skill.slug || skill.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    className={`p-6 md:p-8 border border-secondary/30 bg-secondary/10 flex flex-col gap-5 backdrop-blur-sm group hover:-translate-y-2 hover:border-warm/50 hover:shadow-[0_18px_40px_-24px_rgba(194,87,31,0.6)] transition-all duration-300 scroll-mt-32 target:ring-4 target:ring-warm target:bg-secondary/30 target:shadow-[0_0_30px_rgba(240,145,63,0.4)] target:scale-[1.02] ${
                      index === skills.length - 1 && skills.length % 2 === 1 ? "lg:col-span-2" : ""
                    }`}
                  >
                    <Icon className="w-10 h-10 text-accent" strokeWidth={1.5} />
                    <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-wider text-accent">
                      {skill.name}
                    </h3>
                    <p className="text-base md:text-lg leading-[1.8] text-accent/80 transition-colors">
                      {skill.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.section>
      </main>
    </div>
  );
}
