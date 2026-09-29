export const dynamic = 'force-dynamic';

import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { deleteProject } from "../actions";

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { media: true },
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted">Manage your portfolio projects.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-warm text-warm-fg px-4 py-2.5 rounded-lg font-medium transition-all hover:brightness-110 hover:shadow-[0_8px_24px_-8px_rgba(194,87,31,0.65)]"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </Link>
      </div>

      <div className="bg-panel border border-line rounded-xl overflow-x-auto">
        <table className="w-full text-left min-w-[640px]">
          <thead className="bg-panel-soft border-b border-line">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Title</th>
              <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Category</th>
              <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Media</th>
              <th className="px-6 py-4 text-sm font-semibold text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted">
                  No projects found. Create one!
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-panel-soft/60 transition-colors">
                  <td className="px-6 py-4 font-medium">{project.title}</td>
                  <td className="px-6 py-4 text-muted">{project.category || "Uncategorized"}</td>
                  <td className="px-6 py-4 text-muted">
                    {project.media.length} {project.media.length === 1 ? "item" : "items"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        aria-label="Edit project"
                        className="text-accent hover:text-accent/70 p-2.5 hover:bg-accent/10 rounded-lg transition-colors"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <form action={deleteProject}>
                        <input type="hidden" name="id" value={project.id} />
                        <button
                          type="submit"
                          aria-label="Delete project"
                          className="inline-flex items-center justify-center text-red-600 dark:text-red-400 hover:text-red-500 p-2.5 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
