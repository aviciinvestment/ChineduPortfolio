import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import SectionForm from "../SectionForm";
import { BackLink, PageHeader } from "../../ui";

export default async function EditAboutSectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const section = await prisma.aboutSection.findUnique({ where: { id } });

  if (!section) notFound();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <BackLink href="/admin/about" label="Back to About" />
        <PageHeader title="Edit Section" description={`Update "${section.heading}".`} />
      </div>

      <SectionForm section={section} />
    </div>
  );
}
