"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const text = (value: FormDataEntryValue | null): string =>
  typeof value === "string" ? value.trim() : "";

const optional = (value: FormDataEntryValue | null): string | null => {
  const result = text(value);
  return result === "" ? null : result;
};

const integer = (value: FormDataEntryValue | null, fallback = 0): number => {
  const parsed = parseInt(text(value), 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

function revalidate(pages: string[]) {
  for (const page of pages) revalidatePath(page);
}

const SKILL_PAGES = ["/admin/skills", "/skills"];
const CERTIFICATION_PAGES = ["/admin/certifications", "/certifications"];
const ABOUT_PAGES = ["/admin/about", "/about"];
const CONTACT_PAGES = ["/admin/contact", "/contact"];
const PROJECT_PAGES = ["/admin/projects", "/projects", "/"];

type MediaInput = { type: "image" | "video"; url: string };

function mediaFrom(formData: FormData): MediaInput[] {
  const urls = formData.getAll("mediaUrl");
  const types = formData.getAll("mediaType");

  return urls
    .map((url, index) => ({
      url: text(url),
      type: text(types[index] ?? null) === "video" ? ("video" as const) : ("image" as const),
    }))
    .filter((item) => item.url !== "");
}

function projectFrom(formData: FormData) {
  const media = mediaFrom(formData);
  const tagsStr = text(formData.get("tags"));
  const tags = tagsStr
    ? tagsStr.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];
  const firstImage = media.find((item) => item.type === "image")?.url ?? null;

  return {
    media,
    data: {
      title: text(formData.get("title")),
      description: text(formData.get("description")),
      imageUrl: optional(formData.get("imageUrl")) ?? firstImage,
      videoUrl: optional(formData.get("videoUrl")),
      category: optional(formData.get("category")),
      contributions: optional(formData.get("contributions")),
      resultImpact: optional(formData.get("resultImpact")),
      tools: optional(formData.get("tools")),
      link: optional(formData.get("link")),
      tags,
    },
  };
}

function mediaRows(media: MediaInput[]) {
  return media.map((item, index) => ({
    ...item,
    order: (index + 1) * 10,
  }));
}

export async function createProject(formData: FormData) {
  const { data, media } = projectFrom(formData);

  await prisma.project.create({
    data: { ...data, media: { create: mediaRows(media) } },
  });

  revalidate(PROJECT_PAGES);
  redirect("/admin/projects");
}

export async function updateProject(formData: FormData) {
  const id = text(formData.get("id"));
  const { data, media } = projectFrom(formData);

  await prisma.$transaction([
    prisma.projectMedia.deleteMany({ where: { projectId: id } }),
    prisma.project.update({
      where: { id },
      data: { ...data, media: { create: mediaRows(media) } },
    }),
  ]);

  revalidate(PROJECT_PAGES);
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const id = text(formData.get("id"));

  await prisma.project.delete({ where: { id } });
  revalidate(PROJECT_PAGES);
  revalidatePath("/projects/[id]", "page");
}

export async function createSkill(formData: FormData) {
  await prisma.skill.create({
    data: {
      name: text(formData.get("name")),
      description: text(formData.get("description")),
      iconName: optional(formData.get("iconName")),
      slug: optional(formData.get("slug")),
      order: integer(formData.get("order")),
    },
  });

  revalidate(SKILL_PAGES);
  redirect("/admin/skills");
}

export async function updateSkill(formData: FormData) {
  const id = text(formData.get("id"));

  await prisma.skill.update({
    where: { id },
    data: {
      name: text(formData.get("name")),
      description: text(formData.get("description")),
      iconName: optional(formData.get("iconName")),
      slug: optional(formData.get("slug")),
      order: integer(formData.get("order")),
    },
  });

  revalidate(SKILL_PAGES);
  redirect("/admin/skills");
}

export async function deleteSkill(formData: FormData) {
  const id = text(formData.get("id"));

  await prisma.skill.delete({ where: { id } });

  revalidate(SKILL_PAGES);
}

export async function createCertification(formData: FormData) {
  await prisma.certification.create({
    data: {
      name: text(formData.get("name")),
      issuer: optional(formData.get("issuer")),
      issueDate: optional(formData.get("issueDate")),
      credentialId: optional(formData.get("credentialId")),
      url: optional(formData.get("url")),
      imageUrl: optional(formData.get("imageUrl")),
      order: integer(formData.get("order")),
    },
  });

  revalidate(CERTIFICATION_PAGES);
  redirect("/admin/certifications");
}

export async function updateCertification(formData: FormData) {
  const id = text(formData.get("id"));

  await prisma.certification.update({
    where: { id },
    data: {
      name: text(formData.get("name")),
      issuer: optional(formData.get("issuer")),
      issueDate: optional(formData.get("issueDate")),
      credentialId: optional(formData.get("credentialId")),
      url: optional(formData.get("url")),
      imageUrl: optional(formData.get("imageUrl")),
      order: integer(formData.get("order")),
    },
  });

  revalidate(CERTIFICATION_PAGES);
  redirect("/admin/certifications");
}

export async function deleteCertification(formData: FormData) {
  const id = text(formData.get("id"));

  await prisma.certification.delete({ where: { id } });

  revalidate(CERTIFICATION_PAGES);
}

export async function createAboutSection(formData: FormData) {
  await prisma.aboutSection.create({
    data: {
      label: text(formData.get("label")),
      heading: text(formData.get("heading")),
      content: text(formData.get("content")),
      order: integer(formData.get("order")),
    },
  });

  revalidate(ABOUT_PAGES);
  redirect("/admin/about");
}

export async function updateAboutSection(formData: FormData) {
  const id = text(formData.get("id"));

  await prisma.aboutSection.update({
    where: { id },
    data: {
      label: text(formData.get("label")),
      heading: text(formData.get("heading")),
      content: text(formData.get("content")),
      order: integer(formData.get("order")),
    },
  });

  revalidate(ABOUT_PAGES);
  redirect("/admin/about");
}

export async function deleteAboutSection(formData: FormData) {
  const id = text(formData.get("id"));

  await prisma.aboutSection.delete({ where: { id } });

  revalidate(ABOUT_PAGES);
}

export async function updateProfile(formData: FormData) {
  const data = {
    name: text(formData.get("name")),
    title: text(formData.get("title")),
    email: text(formData.get("email")),
    phone: optional(formData.get("phone")),
    linkedin: optional(formData.get("linkedin")),
    whatsapp: optional(formData.get("whatsapp")),
    bio: optional(formData.get("bio")),
    contactIntro: optional(formData.get("contactIntro")),
    avatarUrl: optional(formData.get("avatarUrl")),
  };

  const existing = await prisma.profile.findFirst();

  if (existing) {
    await prisma.profile.update({ where: { id: existing.id }, data });
  } else {
    await prisma.profile.create({ data });
  }

  revalidate(CONTACT_PAGES);
  redirect("/admin/contact");
}
