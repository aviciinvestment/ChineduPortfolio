import prisma from "@/lib/prisma";
import AboutView from "./AboutView";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const sections = await prisma.aboutSection.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return <AboutView sections={sections} />;
}
