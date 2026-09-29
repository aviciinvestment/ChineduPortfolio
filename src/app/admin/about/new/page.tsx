export const dynamic = 'force-dynamic';

import SectionForm from "../SectionForm";
import { BackLink, PageHeader } from "../../ui";

export default function NewAboutSectionPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <BackLink href="/admin/about" label="Back to About" />
        <PageHeader
          title="Add New Section"
          description="Create a new section for your About page."
        />
      </div>

      <SectionForm />
    </div>
  );
}
