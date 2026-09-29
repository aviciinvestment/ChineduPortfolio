import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectDetail, { type ProjectView } from "./ProjectDetail";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: { media: { orderBy: { order: "asc" } } },
  });

  if (!project) notFound();

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
    category: project.category,
    tags: project.tags,
    link: project.link,
    imageUrl: project.imageUrl,
  };

  return { view, slides };
}

export async function generateMetadata({ params }: Params) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return { title: "Project not found" };
  return { title: `${project.title} | Chinedu John Ezenkwu` };
}

export default async function ProjectPage({ params }: Params) {
  const { id } = await params;
  const { view, slides } = await getProject(id);

  return <ProjectDetail project={view} slides={slides} />;
}
