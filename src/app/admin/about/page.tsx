export const dynamic = 'force-dynamic';

import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { deleteAboutSection } from "../actions";
import { PageHeader, EmptyRow, dangerButtonClass, primaryButtonClass } from "../ui";

export default async function AdminAbout() {
  const sections = await prisma.aboutSection.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="About"
        description="Manage the sections shown on your About page."
        action={
          <Link href="/admin/about/new" className={primaryButtonClass}>
            <Plus className="w-5 h-5" />
            Add Section
          </Link>
        }
      />

      <div className="bg-panel border border-line rounded-xl overflow-x-auto">
        <table className="w-full text-left min-w-[640px]">
          <thead className="bg-panel-soft border-b border-line">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Section</th>
              <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Preview</th>
              <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Order</th>
              <th className="px-6 py-4 text-sm font-semibold text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {sections.length === 0 ? (
              <EmptyRow colSpan={4} message="No about sections yet. Add your first one!" />
            ) : (
              sections.map((section) => (
                <tr key={section.id} className="hover:bg-panel-soft/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-widest text-muted">
                        {section.label}
                      </span>
                      <span className="font-medium">{section.heading}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted">
                    <div className="max-w-[280px] truncate" title={section.content}>
                      {section.content}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted">{section.order}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/about/${section.id}`}
                        aria-label="Edit section"
                        className="p-2.5 rounded-lg text-muted hover:text-accent hover:bg-panel-soft transition-colors"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <form action={deleteAboutSection}>
                        <input type="hidden" name="id" value={section.id} />
                        <button type="submit" className={dangerButtonClass}>
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
