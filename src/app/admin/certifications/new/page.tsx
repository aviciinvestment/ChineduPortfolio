export const dynamic = 'force-dynamic';

import CertificationForm from "../CertificationForm";
import { BackLink, PageHeader } from "../../ui";

export default function NewCertificationPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <BackLink href="/admin/certifications" label="Back to Certifications" />
        <PageHeader
          title="Add New Certification"
          description="Create a new certification or award entry."
        />
      </div>

      <CertificationForm />
    </div>
  );
}
