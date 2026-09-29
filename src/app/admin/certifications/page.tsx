export const dynamic = 'force-dynamic';

import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { deleteCertification } from "../actions";
import { PageHeader, EmptyRow, dangerButtonClass, primaryButtonClass } from "../ui";

const isHostedLocally = (url: string) =>
  url.startsWith("/") || url.includes("res.cloudinary.com");

export default async function AdminCertifications() {
  const certifications = await prisma.certification.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Certifications"
        description="Manage the certifications and awards shown on your portfolio."
        action={
          <Link href="/admin/certifications/new" className={primaryButtonClass}>
            <Plus className="w-5 h-5" />
            Add Certification
          </Link>
        }
      />

      <div className="bg-panel border border-line rounded-xl overflow-x-auto">
        <table className="w-full text-left min-w-[640px]">
          <thead className="bg-panel-soft border-b border-line">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Certification</th>
              <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Issuer</th>
              <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {certifications.length === 0 ? (
              <EmptyRow colSpan={4} message="No certifications yet. Add your first one!" />
            ) : (
              certifications.map((certification) => (
                <tr key={certification.id} className="hover:bg-panel-soft/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {certification.imageUrl && (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-line bg-panel-soft shrink-0">
                          {isHostedLocally(certification.imageUrl) ? (
                            <Image
                              src={certification.imageUrl}
                              alt=""
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={certification.imageUrl}
                              alt=""
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          )}
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{certification.name}</span>
                        {certification.url && (
                          <a
                            href={certification.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted hover:text-accent inline-flex items-center gap-1 w-fit"
                          >
                            View credential <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted">{certification.issuer || "—"}</td>
                  <td className="px-6 py-4 text-muted">{certification.issueDate || "—"}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/certifications/${certification.id}`}
                        aria-label={`Edit ${certification.name}`}
                        className="p-2.5 rounded-lg text-muted hover:text-accent hover:bg-panel-soft transition-colors"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <form action={deleteCertification}>
                        <input type="hidden" name="id" value={certification.id} />
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
