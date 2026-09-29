export const dynamic = 'force-dynamic';

import ProjectForm from "./ProjectForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Link href="/admin/projects" className="text-muted hover:text-accent flex items-center gap-2 text-sm w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
        <div>
          <h1 className="text-3xl font-bold mb-2">Add New Project</h1>
          <p className="text-muted">Create a new engineering project for your portfolio.</p>
        </div>
      </div>

      <ProjectForm />
    </div>
  );
}
