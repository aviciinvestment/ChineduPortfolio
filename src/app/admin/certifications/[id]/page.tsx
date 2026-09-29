export const dynamic = 'force-dynamic';

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import CertificationForm from "../CertificationForm";
import { BackLink, PageHeader } from "../../ui";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certification = await prisma.certification.findUnique({ where: { id } });

  if (!certification) notFound();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <BackLink href="/admin/certifications" label="Back to Certifications" />
        <PageHeader title="Edit Certification" description={`Update "${certification.name}".`} />
      </div>

      <CertificationForm certification={certification} />
    </div>
  );
}
