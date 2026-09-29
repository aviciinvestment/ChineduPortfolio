import prisma from "@/lib/prisma";
import SkillsView from "./SkillsView";

export const dynamic = "force-dynamic";

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return <SkillsView skills={skills} />;
}
