export const dynamic = 'force-dynamic';

import SkillForm from "../SkillForm";
import { BackLink, PageHeader } from "../../ui";

export default function NewSkillPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <BackLink href="/admin/skills" label="Back to Skills" />
        <PageHeader
          title="Add New Skill"
          description="Create a new skill for your portfolio."
        />
      </div>

      <SkillForm />
    </div>
  );
}
