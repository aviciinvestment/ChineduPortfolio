"use client";

import { useState } from "react";
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import { createProject, updateProject } from "../../actions";
import { inputClass, labelClass, primaryButtonClass } from "../../ui";
import { ImagePlus, Video, Loader2, X, Film, Image as ImageIcon, Plus } from "lucide-react";

type MediaItem = { type: "image" | "video"; url: string };

export type ProjectFormInput = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  videoUrl: string | null;
  tags: string[];
  link: string | null;
  category: string | null;
  contributions: string | null;
  resultImpact: string | null;
  tools: string | null;
  media: MediaItem[];
};

const isHostedLocally = (url: string) =>
  url.startsWith("/") || url.includes("res.cloudinary.com");

const looksLikeImage = (url: string) =>
  /\.(png|jpe?g|webp|gif|avif|svg)(\?|#|$)/i.test(url);

export default function ProjectForm({ project }: { project?: ProjectFormInput }) {
  const [imageUrl, setImageUrl] = useState(project?.imageUrl ?? "");
  const [media, setMedia] = useState<MediaItem[]>(project?.media ?? []);
  const [pastedUrl, setPastedUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addMedia = (item: MediaItem) => {
    setMedia((current) =>
      current.some((entry) => entry.url === item.url) ? current : [...current, item],
    );
  };

  const addPastedUrl = () => {
    const url = pastedUrl.trim();
    if (!url) return;
    addMedia({ type: looksLikeImage(url) ? "image" : "video", url });
    setPastedUrl("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.set("imageUrl", imageUrl);
    formData.set("videoUrl", project?.videoUrl ?? "");
    if (project) formData.set("id", project.id);
    for (const item of media) {
      formData.append("mediaType", item.type);
      formData.append("mediaUrl", item.url);
    }

    try {
      await (project ? updateProject : createProject)(formData);
    } catch (error: any) {
      // Next.js redirect() throws an error that should not be caught as a failure
      if (error?.message === "NEXT_REDIRECT") {
        throw error;
      }
      console.error("Failed to save project:", error);
      alert("Failed to save project. Check the console for details.");
      setIsSubmitting(false);
    }
  };

  const mediaButtonClass =
    "flex items-center gap-2 border-2 border-dashed border-line hover:border-warm bg-panel-soft text-accent/70 hover:text-warm px-4 py-3 rounded-xl transition-all text-sm font-medium";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-panel p-6 md:p-8 rounded-xl border border-line">
      <div className="flex flex-col gap-2">
        <label className={labelClass}>Project Title</label>
        <input
          required
          name="title"
          type="text"
          defaultValue={project?.title}
          className={inputClass}
          placeholder="e.g. V12 Engine Model"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>Description / Overview</label>
        <textarea
          required
          name="description"
          rows={5}
          defaultValue={project?.description}
          className={inputClass}
          placeholder="Main description of the project..."
        />
        <p className="text-xs text-muted">Use double line breaks to create separate paragraphs.</p>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>My Contributions (Optional)</label>
        <textarea
          name="contributions"
          rows={5}
          defaultValue={project?.contributions ?? ""}
          className={inputClass}
          placeholder="Details about your specific contributions..."
        />
        <p className="text-xs text-muted">Use double line breaks to create separate paragraphs.</p>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>Result & Impact (Optional)</label>
        <textarea
          name="resultImpact"
          rows={5}
          defaultValue={project?.resultImpact ?? ""}
          className={inputClass}
          placeholder="Impact and results of the project..."
        />
        <p className="text-xs text-muted">Use double line breaks to create separate paragraphs.</p>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>Tools & Reference (Optional)</label>
        <textarea
          name="tools"
          rows={3}
          defaultValue={project?.tools ?? ""}
          className={inputClass}
          placeholder="e.g. SOLIDWORKS (Parts, Assemblies, Motion Studies)"
        />
        <p className="text-xs text-muted">Use double line breaks to separate tools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Category</label>
          <input
            name="category"
            type="text"
            defaultValue={project?.category ?? ""}
            className={inputClass}
            placeholder="e.g. Mechanical, UAV"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Tags (comma separated)</label>
          <input
            name="tags"
            type="text"
            defaultValue={project?.tags.join(", ")}
            className={inputClass}
            placeholder="e.g. SOLIDWORKS, ANSYS"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>External Link (optional)</label>
        <input
          name="link"
          type="url"
          defaultValue={project?.link ?? ""}
          className={inputClass}
          placeholder="https://..."
        />
      </div>

      <div className="flex flex-col gap-3 pt-4 border-t border-line">
        <label className={labelClass}>Cover Image</label>
        <CldUploadWidget
          uploadPreset="ml_default"
          onSuccess={(result: CloudinaryUploadWidgetResults) => {
            const { info } = result;
            if (info && typeof info !== "string") setImageUrl(info.secure_url);
          }}
        >
          {({ open }) => (
            <button type="button" onClick={() => open()} className={mediaButtonClass}>
              <ImagePlus className="w-5 h-5" />
              {imageUrl ? "Replace cover image" : "Upload cover image"}
            </button>
          )}
        </CldUploadWidget>
        {imageUrl && <p className="text-xs text-emerald-600 dark:text-emerald-400">Cover image set.</p>}
      </div>

      <div className="flex flex-col gap-3 pt-4 border-t border-line">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Project Media</label>
          <p className="text-xs text-muted">
            Add two or more images or videos — visitors view them as a slideshow on the project page.
          </p>
        </div>

        {media.length === 0 ? (
          <p className="text-sm text-muted bg-panel-soft border border-line rounded-lg px-4 py-3">
            No media added yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {media.map((item, index) => (
              <li
                key={`${item.url}-${index}`}
                className="flex items-center gap-3 bg-panel-soft border border-line rounded-lg px-3 py-2"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent/60 w-12 shrink-0">
                  {item.type}
                </span>
                {item.type === "image" && isHostedLocally(item.url) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt="" className="w-9 h-9 rounded object-cover border border-line shrink-0" />
                ) : item.type === "image" ? (
                  <ImageIcon className="w-5 h-5 text-accent/60 shrink-0" />
                ) : (
                  <Film className="w-5 h-5 text-accent/60 shrink-0" />
                )}
                <span className="flex-1 truncate text-sm text-muted" title={item.url}>
                  {item.url}
                </span>
                <button
                  type="button"
                  aria-label="Remove media"
                  onClick={() => setMedia((current) => current.filter((_, i) => i !== index))}
                  className="text-red-600 dark:text-red-400 hover:text-red-500 p-2.5 -my-1 rounded-lg hover:bg-red-500/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-3">
          <CldUploadWidget
            uploadPreset="ml_default"
            onSuccess={(result: CloudinaryUploadWidgetResults) => {
              const { info } = result;
              if (info && typeof info !== "string") addMedia({ type: "image", url: info.secure_url });
            }}
          >
            {({ open }) => (
              <button type="button" onClick={() => open()} className={mediaButtonClass}>
                <ImagePlus className="w-5 h-5" />
                Add image
              </button>
            )}
          </CldUploadWidget>

          <CldUploadWidget
            uploadPreset="ml_default"
            onSuccess={(result: CloudinaryUploadWidgetResults) => {
              const { info } = result;
              if (info && typeof info !== "string") addMedia({ type: "video", url: info.secure_url });
            }}
          >
            {({ open }) => (
              <button type="button" onClick={() => open()} className={mediaButtonClass}>
                <Video className="w-5 h-5" />
                Add video
              </button>
            )}
          </CldUploadWidget>
        </div>

        <div className="flex gap-2">
          <input
            type="url"
            value={pastedUrl}
            onChange={(e) => setPastedUrl(e.target.value)}
            className={`${inputClass} flex-1 min-w-0 text-sm`}
            placeholder="...or paste a video/image URL (YouTube, mp4, png)"
          />
          <button
            type="button"
            onClick={addPastedUrl}
            className="flex items-center gap-2 shrink-0 bg-panel-soft border border-line hover:border-warm text-accent/70 hover:text-warm px-4 py-3 rounded-lg transition-all text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-line flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${primaryButtonClass} px-8 py-3 disabled:opacity-60`}
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
          {isSubmitting ? "Saving..." : project ? "Update Project" : "Save Project"}
        </button>
      </div>
    </form>
  );
}
