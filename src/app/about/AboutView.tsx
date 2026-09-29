"use client";

import { motion } from "framer-motion";

type Section = {
  id: string;
  label: string;
  heading: string;
  content: string;
};

const paragraphs = (content: string) =>
  content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

export default function AboutView({ sections }: { sections: Section[] }) {
  return (
    <div className="w-full">
      <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 lg:px-20 pt-16 pb-28 md:pt-24 md:pb-28 flex flex-col gap-20">
        {sections.length === 0 ? (
          <section className="flex justify-center items-center py-20">
            <p className="text-lg uppercase tracking-widest text-accent/60">
              Content coming soon...
            </p>
          </section>
        ) : (
          sections.map((section, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent/60">
                  {section.label}
                </span>
                <h2 className="text-3xl md:text-5xl font-normal tracking-tight uppercase">
                  {section.heading}
                </h2>
              </div>
              <div className="h-[1px] w-24 mb-4 bg-gradient-to-r from-warm to-transparent" />

              <div className="text-lg md:text-xl leading-[1.8] max-w-4xl flex flex-col gap-8 text-accent/90">
                {paragraphs(section.content).map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
            </motion.section>
          ))
        )}
      </main>
    </div>
  );
}
