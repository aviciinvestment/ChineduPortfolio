export const dynamic = 'force-dynamic';

import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { deleteSkill } from "../actions";
import { getSkillIcon } from "@/lib/icons";
import { PageHeader, EmptyRow, dangerButtonClass, primaryButtonClass } from "../ui";

export default async function AdminSkills() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Skills"
        description="Manage the skills shown on your portfolio."
        action={
          <Link href="/admin/skills/new" className={primaryButtonClass}>
            <Plus className="w-5 h-5" />
            Add Skill
          </Link>
        }
      />

      <div className="bg-panel border border-line rounded-xl overflow-x-auto">
        <table className="w-full text-left min-w-[640px]">
          <thead className="bg-panel-soft border-b border-line">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Skill</th>
              <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Anchor</th>
              <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Order</th>
              <th className="px-6 py-4 text-sm font-semibold text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {skills.length === 0 ? (
              <EmptyRow colSpan={4} message="No skills yet. Add your first one!" />
            ) : (
              skills.map((skill) => {
                const Icon = getSkillIcon(skill.iconName);
                return (
                  <tr key={skill.id} className="hover:bg-panel-soft/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 shrink-0 text-accent" strokeWidth={1.5} />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted">
                      {skill.slug ? `#${skill.slug}` : "—"}
                    </td>
                    <td className="px-6 py-4 text-muted">{skill.order}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/skills/${skill.id}`}
                          aria-label={`Edit ${skill.name}`}
                          className="p-2.5 rounded-lg text-muted hover:text-accent hover:bg-panel-soft transition-colors"
                        >
                          <Pencil className="w-5 h-5" />
                        </Link>
                        <form action={deleteSkill}>
                          <input type="hidden" name="id" value={skill.id} />
                          <button type="submit" className={dangerButtonClass}>
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
