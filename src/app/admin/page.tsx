import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const [projectsCount, skillsCount, certificationsCount, sectionsCount] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.certification.count(),
    prisma.aboutSection.count(),
  ]);

  const stats = [
    { label: "Total Projects", value: projectsCount },
    { label: "Total Skills", value: skillsCount },
    { label: "Certifications", value: certificationsCount },
    { label: "About Sections", value: sectionsCount },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted">Welcome to your portfolio admin panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-panel p-6 rounded-xl border border-line flex flex-col gap-2"
          >
            <span className="text-sm font-medium text-muted uppercase tracking-wider">
              {stat.label}
            </span>
            <span className="text-4xl font-bold text-warm">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-panel p-6 rounded-xl border border-line flex flex-col gap-2">
        <span className="text-sm font-medium text-muted uppercase tracking-wider">
          Profile Status
        </span>
        <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-warm/15 border border-warm/40 text-warm text-xl font-bold">
          Active
        </span>
      </div>
    </div>
  );
}
