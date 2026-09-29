import prisma from "@/lib/prisma";
import CertificationsView from "./CertificationsView";

export const dynamic = "force-dynamic";

export default async function CertificationsPage() {
  const certifications = await prisma.certification.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return <CertificationsView certifications={certifications} />;
}
