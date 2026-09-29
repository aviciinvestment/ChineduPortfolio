import Link from "next/link";
import { createSkill, updateSkill } from "../actions";
import { skillIconNames } from "@/lib/icons";
import { inputClass, labelClass, primaryButtonClass } from "../ui";

type SkillValue = {
  id?: string;
  name: string;
  description: string;
  iconName: string | null;
  slug: string | null;
  order: number;
};

export default function SkillForm({ skill }: { skill?: SkillValue }) {
  return (
    <form
      action={skill ? updateSkill : createSkill}
      className="flex flex-col gap-6 bg-panel p-6 md:p-8 rounded-xl border border-line"
    >
      {skill?.id && <input type="hidden" name="id" value={skill.id} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Skill Name
          </label>
          <input
            id="name"
            required
            name="name"
            type="text"
            defaultValue={skill?.name ?? ""}
            className={inputClass}
            placeholder="e.g. Mechanical CAD Design"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="slug" className={labelClass}>
            Anchor Slug (optional)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            defaultValue={skill?.slug ?? ""}
            className={inputClass}
            placeholder="e.g. cad"
          />
          <p className="text-xs text-muted">Used for deep links such as /skills#cad</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          required
          name="description"
          rows={5}
          defaultValue={skill?.description ?? ""}
          className={inputClass}
          placeholder="What this skill covers..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="iconName" className={labelClass}>
            Icon
          </label>
          <select
            id="iconName"
            name="iconName"
            defaultValue={skill?.iconName ?? "PenTool"}
            className={inputClass}
          >
            {skillIconNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="order" className={labelClass}>
            Sort Order
          </label>
          <input
            id="order"
            name="order"
            type="number"
            defaultValue={skill?.order ?? 0}
            className={inputClass}
          />
          <p className="text-xs text-muted">Lower numbers appear first.</p>
        </div>
      </div>

      <div className="pt-6 border-t border-line flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <Link
          href="/admin/skills"
          className="px-6 py-3 rounded-lg border border-line text-muted hover:text-accent transition-colors font-medium text-center"
        >
          Cancel
        </Link>
        <button type="submit" className={`${primaryButtonClass} px-6 py-3`}>
          {skill ? "Save Changes" : "Add Skill"}
        </button>
      </div>
    </form>
  );
}
