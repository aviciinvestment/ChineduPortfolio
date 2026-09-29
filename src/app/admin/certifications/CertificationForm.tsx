"use client";

import { useState } from "react";
import Link from "next/link";
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import { ImagePlus, X } from "lucide-react";
import { createCertification, updateCertification } from "../actions";
import { inputClass, labelClass, primaryButtonClass } from "../ui";

type CertificationValue = {
  id?: string;
  name: string;
  issuer: string | null;
  issueDate: string | null;
  credentialId: string | null;
  url: string | null;
  imageUrl: string | null;
  order: number;
};

export default function CertificationForm({
  certification,
}: {
  certification?: CertificationValue;
}) {
  const [imageUrl, setImageUrl] = useState(certification?.imageUrl ?? "");

  return (
    <form
      action={certification ? updateCertification : createCertification}
      className="flex flex-col gap-6 bg-panel p-6 md:p-8 rounded-xl border border-line"
    >
      {certification?.id && <input type="hidden" name="id" value={certification.id} />}
      <input type="hidden" name="imageUrl" value={imageUrl} />

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={labelClass}>
          Certification Name
        </label>
        <input
          id="name"
          required
          name="name"
          type="text"
          defaultValue={certification?.name ?? ""}
          className={inputClass}
          placeholder="e.g. Certified SOLIDWORKS Professional (CSWP)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="issuer" className={labelClass}>
            Issuing Organization
          </label>
          <input
            id="issuer"
            name="issuer"
            type="text"
            defaultValue={certification?.issuer ?? ""}
            className={inputClass}
            placeholder="e.g. Dassault Systemes"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="issueDate" className={labelClass}>
            Issue Date
          </label>
          <input
            id="issueDate"
            name="issueDate"
            type="text"
            defaultValue={certification?.issueDate ?? ""}
            className={inputClass}
            placeholder="e.g. March 2024"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="credentialId" className={labelClass}>
            Credential ID (optional)
          </label>
          <input
            id="credentialId"
            name="credentialId"
            type="text"
            defaultValue={certification?.credentialId ?? ""}
            className={inputClass}
            placeholder="e.g. CSWP-123456"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="url" className={labelClass}>
            Credential URL (optional)
          </label>
          <input
            id="url"
            name="url"
            type="url"
            defaultValue={certification?.url ?? ""}
            className={inputClass}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-4 border-t border-line">
        <span className={labelClass}>Certificate Image (optional)</span>
        <div className="flex flex-wrap items-center gap-4">
          <CldUploadWidget
            uploadPreset="ml_default"
            onSuccess={(result: CloudinaryUploadWidgetResults) => {
              const { info } = result;
              if (info && typeof info !== "string") setImageUrl(info.secure_url);
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="flex items-center gap-2 border-2 border-dashed border-line hover:border-accent bg-panel-soft text-accent/70 hover:text-accent px-4 py-3 rounded-xl transition-all text-sm font-medium"
              >
                <ImagePlus className="w-5 h-5" />
                {imageUrl ? "Replace image" : "Upload image"}
              </button>
            )}
          </CldUploadWidget>

          {imageUrl && (
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Certificate preview"
                className="w-16 h-16 object-cover rounded-lg border border-line bg-panel-soft"
              />
              <button
                type="button"
                onClick={() => setImageUrl("")}
                aria-label="Remove image"
                className="text-red-600 dark:text-red-400 hover:text-red-500 p-2.5 rounded-lg hover:bg-red-500/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <p className="text-xs text-muted">Display image or badge shown on the public Certifications page.</p>
      </div>

      <div className="flex flex-col gap-2 md:max-w-xs">
        <label htmlFor="order" className={labelClass}>
          Sort Order
        </label>
        <input
          id="order"
          name="order"
          type="number"
          defaultValue={certification?.order ?? 0}
          className={inputClass}
        />
        <p className="text-xs text-muted">Lower numbers appear first.</p>
      </div>

      <div className="pt-6 border-t border-line flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <Link
          href="/admin/certifications"
          className="px-6 py-3 rounded-lg border border-line text-muted hover:text-accent transition-colors font-medium text-center"
        >
          Cancel
        </Link>
        <button type="submit" className={`${primaryButtonClass} px-6 py-3`}>
          {certification ? "Save Changes" : "Add Certification"}
        </button>
      </div>
    </form>
  );
}
