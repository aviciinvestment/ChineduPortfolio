import prisma from "@/lib/prisma";
import ContactForm from "./ContactForm";
import { BackLink, PageHeader } from "../ui";

export default async function AdminContact() {
  const profile = await prisma.profile.findFirst();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <BackLink href="/admin" label="Back to Dashboard" />
        <PageHeader
          title="Contact & Profile"
          description="Edit the profile card and contact details shown on your Contact page."
        />
      </div>

      <ContactForm profile={profile} />
    </div>
  );
}
