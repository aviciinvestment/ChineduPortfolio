import prisma from "@/lib/prisma";
import HomeView from "@/components/HomeView";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { media: { orderBy: { order: "asc" } } },
  });

  return (
    <HomeView
      projects={projects.map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl,
        media: project.media.map((item) => ({ type: item.type, url: item.url })),
      }))}
    />
  );
}
