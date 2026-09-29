import prisma from "@/lib/prisma";
import ContactView from "./ContactView";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const profile = await prisma.profile.findFirst();

  return <ContactView profile={profile} />;
}
