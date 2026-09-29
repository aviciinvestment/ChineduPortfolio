import { updateProfile } from "../actions";
import { inputClass, labelClass, primaryButtonClass } from "../ui";

type ProfileValue = {
  name: string;
  title: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  whatsapp: string | null;
  bio: string | null;
  contactIntro: string | null;
  avatarUrl: string | null;
} | null;

export default function ContactForm({ profile }: { profile: ProfileValue }) {
  return (
    <form
      action={updateProfile}
      className="flex flex-col gap-6 bg-panel p-6 md:p-8 rounded-xl border border-line"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Full Name
          </label>
          <input
            id="name"
            required
            name="name"
            type="text"
            defaultValue={profile?.name ?? ""}
            className={inputClass}
            placeholder="e.g. Chinedu John Ezenkwu"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className={labelClass}>
            Professional Title
          </label>
          <input
            id="title"
            required
            name="title"
            type="text"
            defaultValue={profile?.title ?? ""}
            className={inputClass}
            placeholder="e.g. Aerospace & Mechanical CAD Design Engineer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            required
            name="email"
            type="email"
            defaultValue={profile?.email ?? ""}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClass}>
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            defaultValue={profile?.phone ?? ""}
            className={inputClass}
            placeholder="e.g. +234 916 615 9310"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="whatsapp" className={labelClass}>
            WhatsApp Number (optional)
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="text"
            defaultValue={profile?.whatsapp ?? ""}
            className={inputClass}
            placeholder="e.g. 2349166159310"
          />
          <p className="text-xs text-muted">Digits only, used for the wa.me link.</p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="linkedin" className={labelClass}>
            LinkedIn URL (optional)
          </label>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            defaultValue={profile?.linkedin ?? ""}
            className={inputClass}
            placeholder="https://linkedin.com/in/..."
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contactIntro" className={labelClass}>
          Contact Intro (optional)
        </label>
        <textarea
          id="contactIntro"
          name="contactIntro"
          rows={3}
          defaultValue={profile?.contactIntro ?? ""}
          className={inputClass}
          placeholder="Short paragraph shown above your contact details..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="bio" className={labelClass}>
          Bio (optional)
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={5}
          defaultValue={profile?.bio ?? ""}
          className={inputClass}
          placeholder="A short biography..."
        />
      </div>

      <div className="flex flex-col gap-2 md:max-w-xl">
        <label htmlFor="avatarUrl" className={labelClass}>
          Profile Image URL (optional)
        </label>
        <input
          id="avatarUrl"
          name="avatarUrl"
          type="text"
          defaultValue={profile?.avatarUrl ?? ""}
          className={inputClass}
          placeholder="/profile.png or https://res.cloudinary.com/..."
        />
      </div>

      <div className="pt-6 border-t border-line flex justify-end">
        <button type="submit" className={`${primaryButtonClass} px-6 py-3`}>
          Save Changes
        </button>
      </div>
    </form>
  );
}
