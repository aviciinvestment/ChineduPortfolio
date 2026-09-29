export const dynamic = 'force-dynamic';

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectForm from "../new/ProjectForm";
import { BackLink, PageHeader } from "../../ui";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { media: { orderBy: { order: "asc" } } },
  });

  if (!project) notFound();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <BackLink href="/admin/projects" label="Back to Projects" />
        <PageHeader title="Edit Project" description={`Update "${project.title}".`} />
      </div>

      <ProjectForm
        project={{
          id: project.id,
          title: project.title,
          description: project.description,
          imageUrl: project.imageUrl,
          videoUrl: project.videoUrl,
          tags: project.tags,
          link: project.link,
          category: project.category,
          media: project.media.map((item) => ({ type: item.type as "image" | "video", url: item.url })),
        }}
      />
    </div>
  );
}
