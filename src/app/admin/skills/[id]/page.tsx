export const dynamic = 'force-dynamic';

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import SkillForm from "../SkillForm";
import { BackLink, PageHeader } from "../../ui";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await prisma.skill.findUnique({ where: { id } });

  if (!skill) notFound();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <BackLink href="/admin/skills" label="Back to Skills" />
        <PageHeader title="Edit Skill" description={`Update "${skill.name}".`} />
      </div>

      <SkillForm skill={skill} />
    </div>
  );
}
