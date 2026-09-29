import Link from "next/link";
import { createAboutSection, updateAboutSection } from "../actions";
import { inputClass, labelClass, primaryButtonClass } from "../ui";

type SectionValue = {
  id?: string;
  label: string;
  heading: string;
  content: string;
  order: number;
};

export default function SectionForm({ section }: { section?: SectionValue }) {
  return (
    <form
      action={section ? updateAboutSection : createAboutSection}
      className="flex flex-col gap-6 bg-panel p-6 md:p-8 rounded-xl border border-line"
    >
      {section?.id && <input type="hidden" name="id" value={section.id} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="label" className={labelClass}>
            Section Label
          </label>
          <input
            id="label"
            required
            name="label"
            type="text"
            defaultValue={section?.label ?? ""}
            className={inputClass}
            placeholder="e.g. 01 // OVERVIEW"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="heading" className={labelClass}>
            Heading
          </label>
          <input
            id="heading"
            required
            name="heading"
            type="text"
            defaultValue={section?.heading ?? ""}
            className={inputClass}
            placeholder="e.g. About This Profile"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="content" className={labelClass}>
          Content
        </label>
        <textarea
          id="content"
          required
          name="content"
          rows={12}
          defaultValue={section?.content ?? ""}
          className={inputClass}
          placeholder="Write the section text here..."
        />
        <p className="text-xs text-muted">
          Leave a blank line between paragraphs to split them into separate paragraphs.
        </p>
      </div>

      <div className="flex flex-col gap-2 md:max-w-xs">
        <label htmlFor="order" className={labelClass}>
          Sort Order
        </label>
        <input
          id="order"
          name="order"
          type="number"
          defaultValue={section?.order ?? 0}
          className={inputClass}
        />
        <p className="text-xs text-muted">Lower numbers appear first.</p>
      </div>

      <div className="pt-6 border-t border-line flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <Link
          href="/admin/about"
          className="px-6 py-3 rounded-lg border border-line text-muted hover:text-accent transition-colors font-medium text-center"
        >
          Cancel
        </Link>
        <button type="submit" className={`${primaryButtonClass} px-6 py-3`}>
          {section ? "Save Changes" : "Add Section"}
        </button>
      </div>
    </form>
  );
}
