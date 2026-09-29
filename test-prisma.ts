import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const project = await prisma.project.create({
      data: {
        title: "Test Project",
        description: "Test description",
        contributions: "Test contributions",
        resultImpact: "Test result impact",
        tools: "Test tools",
      },
    });
    console.log("Successfully created:", project.id);
    await prisma.project.delete({ where: { id: project.id } });
    console.log("Successfully deleted test project.");
  } catch (e) {
    console.error("Prisma error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
