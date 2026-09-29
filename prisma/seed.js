const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

if (!process.env.DATABASE_URL) {
  const envPath = path.join(__dirname, "..", ".env");
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
      const match = line.match(/^([A-Za-z0-9_]+)=(.*)$/);
      if (match && !process.env[match[1]]) {
        let value = match[2].trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        process.env[match[1]] = value;
      }
    }
  }
}

const prisma = new PrismaClient();

const skills = [
  {
    name: "Mechanical CAD Design",
    slug: "cad",
    iconName: "PenTool",
    order: 10,
    description:
      "Strong proficiency in developing precise 3D parts, assemblies, and functional mechanical systems, with strong focus on engineering accuracy, performance, and manufacturability.",
  },
  {
    name: "UAV Design",
    slug: "uav",
    iconName: "Plane",
    order: 20,
    description:
      "Experienced in UAV 3D design, from preliminary constraint analysis and design requirements through detailed CAD modelling and development using SOLIDWORKS and CATIA, with emphasis on accuracy, functionality, and manufacturability for 3D printing and moulding applications.",
  },
  {
    name: "Reverse Engineering",
    slug: "rev",
    iconName: "Scan",
    order: 30,
    description:
      "Experienced in reverse engineering worn and damaged mechanical components using Geomagic Design X and SOLIDWORKS, transforming scanned or physical part data into accurate, editable 3D CAD models suitable for manufacturing and 3D printing.",
  },
  {
    name: "ANSYS Simulation",
    slug: "ansys",
    iconName: "Activity",
    order: 40,
    description:
      "Experienced in using ANSYS for engineering simulations, including Finite Element Analysis (FEA) and Computational Fluid Dynamics (CFD), to evaluate structural performance, stress, deformation, fluid behaviour, and overall design performance.",
  },
  {
    name: "Engineering Drawing & Documentation",
    slug: "draw",
    iconName: "FileText",
    order: 50,
    description:
      "Experienced in producing production-ready engineering drawings with proper dimensioning, tolerancing, and industry-standard annotations.",
  },
];

const aboutSections = [
  {
    label: "01 // OVERVIEW",
    heading: "About This Profile",
    order: 10,
    content:
      "This portfolio has been created to complement my résumé and provide an overview of selected projects that highlight my experience and technical capabilities. Each project showcases my practical application of engineering principles, problem-solving skills, attention to detail, and growth in CAD design and engineering. For further information or enquiries regarding any of the projects featured, please feel free to contact me.",
  },
  {
    label: "02 // BACKGROUND",
    heading: "About Me",
    order: 20,
    content: [
      "I am an Aerospace Engineering graduate of the Air Force Institute of Technology (AFIT), with a strong passion for aerospace and mechanical design. My interest in engineering design has driven a continuous commitment to learning and professional development, leading to certifications including the Certified SOLIDWORKS Associate (CSWA), Certified SOLIDWORKS Professional (CSWP) and training in CNC programming and SOLIDWORKS CAM.",
      "My areas of expertise and interest span mechanical component design, UAV development and CAD modelling, reverse engineering using Geomagic Design X, and engineering simulation using ANSYS, including FEA and CFD. I particularly enjoy transforming engineering concepts and design requirements into precise, functional CAD models while applying creative problem-solving to address practical engineering challenges.",
      "Professionally, I work as a remote contract CAD designer with StehaTech, Belgium, where my responsibilities include CAD modelling using SOLIDWORKS and CATIA, as well as reverse engineering of mechanical components. I also currently work on-site as a CAD Designer at Terra Industries, where I am involved in detailed UAV CAD modelling, reverse engineering and modelling of worn mechanical casings for 3D printing, and preparation of CAD files for CNC cutting of materials such as MDF, carbon fibre, and acrylic boards. My work also extends to sheet metal modelling Geometry as well as preparing designs for laser and plasma cutting.",
      "Through these experiences, I continue to develop a strong combination of aerospace engineering knowledge, CAD expertise, reverse engineering capability, and practical manufacturing awareness, with a focus on creating accurate, functional, and manufacturable engineering solutions.",
    ].join("\n\n"),
  },
];

const profile = {
  name: "Chinedu John Ezenkwu",
  title: "Aerospace & Mechanical CAD Design Engineer",
  email: "sosochukwunedum@gmail.com",
  phone: "+234 916 615 9310",
  linkedin: "https://www.linkedin.com/search/results/all/?keywords=Chinedu+John+Ezenkwu",
  whatsapp: "2349166159310",
  contactIntro:
    "Available for full-time opportunities, freelance engineering projects, or technical consulting. Let's discuss how we can build high-fidelity solutions together.",
  avatarUrl: "/profile.png",
};

const projects = [
  {
    title: "V12 Car Engine",
    category: "Mechanical",
    tags: ["SOLIDWORKS", "Parts & Assemblies", "Motion Studies"],
    imageUrl: "/v12-engine-new.jpg",
    videoUrl: null,
    link: "/projects#v12-engine",
    order: 10,
    description: [
      "A detailed 3D CAD model of a V12 internal combustion engine developed to demonstrate advanced mechanical design and assembly modelling capabilities. The project involved modelling key engine components, including the engine block, cylinder heads, pistons, connecting rods, crankshaft, camshafts, valve-train components, intake and exhaust systems, and other supporting components.",
      "The assembly was developed with careful attention to component interfaces, mechanical relationships, clearances, and overall assembly functionality. The project demonstrates proficiency in complex part modelling, multi-component assemblies, design intent, and the integration of numerous mechanical components into a functional engine system.",
    ].join("\n\n"),
  },
];

const projectMedia = [
  { type: "image", url: "/v12-engine-new.jpg", order: 10 },
  { type: "image", url: "/v12-engine.png", order: 20 },
  { type: "image", url: "/engine2.png", order: 30 },
];

async function main() {
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({ data: projects });
    console.log(`Seeded ${projects.length} projects`);
  } else {
    console.log(`Projects already present (${projectCount}), skipping`);
  }

  const mediaCount = await prisma.projectMedia.count();
  if (mediaCount === 0) {
    const project = await prisma.project.findFirst({ orderBy: { createdAt: "asc" } });
    if (project) {
      await prisma.projectMedia.createMany({
        data: projectMedia.map((media) => ({ ...media, projectId: project.id })),
      });
      console.log(`Seeded ${projectMedia.length} media items for "${project.title}"`);
    }
  } else {
    console.log(`Project media already present (${mediaCount}), skipping`);
  }

  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    await prisma.skill.createMany({ data: skills });
    console.log(`Seeded ${skills.length} skills`);
  } else {
    console.log(`Skills already present (${skillCount}), skipping`);
  }

  const sectionCount = await prisma.aboutSection.count();
  if (sectionCount === 0) {
    await prisma.aboutSection.createMany({ data: aboutSections });
    console.log(`Seeded ${aboutSections.length} about sections`);
  } else {
    console.log(`About sections already present (${sectionCount}), skipping`);
  }

  const profileCount = await prisma.profile.count();
  if (profileCount === 0) {
    await prisma.profile.create({ data: profile });
    console.log("Seeded profile");
  } else {
    console.log("Profile already present, skipping");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
