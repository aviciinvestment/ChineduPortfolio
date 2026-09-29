import prisma from "@/lib/prisma";
import { type ProjectView } from "./[id]/ProjectDetail";
import ProjectDetailClient from "./ProjectDetailClient";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { media: { orderBy: { order: "asc" } } },
  });

  const formattedProjects = projects.map((project) => {
    const slides: { type: "video" | "image"; url: string }[] = [];
    
    if (project.imageUrl) {
      slides.push({ type: "image", url: project.imageUrl });
    }
  
    for (const item of project.media) {
      if (!slides.some((s) => s.url === item.url)) {
        slides.push({
          type: item.type === "video" ? "video" : "image",
          url: item.url,
        });
      }
    }
  
    if (project.videoUrl && !slides.some((slide) => slide.url === project.videoUrl)) {
      slides.push({ type: "video", url: project.videoUrl });
    }
  
    const view: ProjectView = {
      id: project.id,
      title: project.title,
      description: project.description,
      category: (project as any).category,
      contributions: (project as any).contributions,
      resultImpact: (project as any).resultImpact,
      tools: (project as any).tools,
      tags: project.tags,
      link: project.link,
      imageUrl: project.imageUrl,
    };

    return { view, slides };
  });

  return (
    <div className="w-full">
      <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 lg:px-20 pt-8 md:pt-12 pb-32 flex flex-col gap-24 md:gap-32">
        <div className="flex flex-col gap-4 text-center items-center">
          <h1 className="text-4xl md:text-6xl font-normal tracking-tight uppercase text-accent">All Projects</h1>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-warm to-transparent" />
        </div>
        
        <div className="flex flex-col gap-32">
          {formattedProjects.map((p, index) => (
            <ProjectDetailClient key={p.view.id} project={p.view} slides={p.slides} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
