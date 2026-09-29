import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const project = await prisma.project.create({
      data: {
        title: "Test Project Media",
        description: "Test description media",
        contributions: "Test contributions",
        resultImpact: "Test result impact",
        tools: "Test tools",
        media: {
          create: [
            { type: "image", url: "https://example.com/image.jpg", order: 10 },
            { type: "video", url: "https://example.com/video.mp4", order: 20 },
          ]
        }
      },
    });
    console.log("Successfully created with media:", project.id);
    await prisma.project.delete({ where: { id: project.id } });
    console.log("Successfully deleted test project with media.");
  } catch (e) {
    console.error("Prisma error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
