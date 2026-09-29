"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Slideshow, { type Slide } from "./[id]/Slideshow";
import { type ProjectView } from "./[id]/ProjectDetail";

export default function ProjectDetailClient({
  project,
  slides,
  index,
}: {
  project: ProjectView;
  slides: Slide[];
  index: number;
}) {
  const isExternal = Boolean(project.link && /^https?:\/\//i.test(project.link));
  const paragraphs = project.description.split(/\n{2,}/).filter(Boolean);

  return (
    <section 
      id={project.id}
      className="flex flex-col gap-10 md:gap-14 scroll-mt-32 target:ring-4 target:ring-warm/50 target:bg-warm/5 target:shadow-[0_0_40px_rgba(234,88,12,0.15)] target:p-6 md:target:p-10 rounded-[3rem] transition-all duration-1000"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col gap-5"
      >
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent/60">
          {`${String(index + 1).padStart(2, '0')} // ${project.category ?? "Portfolio"}`}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tighter uppercase drop-shadow-sm break-words text-balance">
          {project.title}
        </h2>
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 text-[10px] md:text-xs font-bold uppercase tracking-wider text-accent/70">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full border border-secondary/40 bg-secondary/10 backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
      >
        <Slideshow slides={slides} title={project.title} cover={project.imageUrl} />
      </motion.div>

      <div className="flex flex-col gap-6 max-w-4xl w-full text-[15px] md:text-lg leading-[1.8] font-light text-accent/90">
        <div className="flex flex-col gap-6">
          {paragraphs.map((paragraph, idx) => (
            <p key={idx} className={idx === 0 ? "first-letter:text-5xl first-letter:font-bold first-letter:mr-1 first-letter:float-left" : ""}>
              {paragraph}
            </p>
          ))}
        </div>

        {project.contributions && (
          <div className={`p-8 md:p-10 rounded-3xl border backdrop-blur-md bg-secondary/5 border-line`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-[1px] w-12 bg-line`} />
              <h4 className={`text-sm md:text-base font-bold uppercase tracking-[0.2em] text-accent`}>My Contributions</h4>
            </div>
            <div className="flex flex-col gap-4">
              {project.contributions.split(/\n{2,}/).filter(Boolean).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {project.resultImpact && (
          <div className="flex flex-col gap-6 mt-4">
            <div className="flex items-center gap-4 mb-2">
              <div className={`h-[1px] w-12 bg-line`} />
              <h4 className={`text-sm md:text-base font-bold uppercase tracking-[0.2em] text-accent`}>Result & Impact</h4>
            </div>
            {project.resultImpact.split(/\n{2,}/).filter(Boolean).map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        )}

        {project.tools && (
          <div className={`p-8 rounded-3xl border border-dashed bg-secondary/5 border-line mt-4`}>
            <h4 className={`text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-6 text-accent`}>Tools & Reference</h4>
            <ul className="flex flex-col gap-3">
              {project.tools.split(/\n{2,}/).filter(Boolean).map((tool, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <ArrowLeft className="w-4 h-4 rotate-180 opacity-50" />
                  <span>{tool}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {project.link && (
        <div className="mt-2">
          {isExternal ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 md:px-8 py-4 rounded-full border-2 border-accent/40 bg-secondary/10 text-accent font-bold uppercase tracking-[2px] text-xs md:text-sm hover:bg-warm hover:text-warm-fg hover:border-warm hover:shadow-[0_0_30px_rgba(194,87,31,0.45)] transition-all duration-500"
            >
              Open Project Link
              <ExternalLink
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </a>
          ) : (
            <Link
              href={project.link}
              className="group inline-flex items-center gap-3 px-6 md:px-8 py-4 rounded-full border-2 border-accent/40 bg-secondary/10 text-accent font-bold uppercase tracking-[2px] text-xs md:text-sm hover:bg-warm hover:text-warm-fg hover:border-warm hover:shadow-[0_0_30px_rgba(194,87,31,0.45)] transition-all duration-500"
            >
              Open Project Link
              <ExternalLink
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
