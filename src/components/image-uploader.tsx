"use client";

import React, { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import {
  UploadCloud,
  Link as LinkIcon,
  Loader2,
  X,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Star,
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Images,
} from "lucide-react";
import { uploadImageToCloudinary, checkCloudinaryConfigured } from "@/actions/upload";
import {
  imageFor,
  isExternalImage,
  getPropertyImages,
} from "@/lib/property-images";

interface ImageUploaderProps {
  value: string;
  onChange: (urlOrKey: string) => void;
  disabled?: boolean;
  multiple?: boolean;
}

const PRESET_OPTIONS = [
  { key: "living", label: "Living Room" },
  { key: "kitchen", label: "Kitchen Island" },
  { key: "bedroom", label: "Master Bedroom" },
  { key: "hero", label: "Modern Villa" },
];

export function ImageUploader({
  value,
  onChange,
  disabled,
  multiple = false,
}: ImageUploaderProps) {
  const [tab, setTab] = useState<"upload" | "url" | "presets">("upload");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const [cloudName, setCloudName] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkCloudinaryConfigured().then((res) => {
      setIsConfigured(res.configured);
      if (res.cloudName) setCloudName(res.cloudName);
    });
  }, []);

  // Parse all images in multiple mode
  const imageList = multiple ? getPropertyImages(value) : value ? [value] : [];
  const isPreset = (k: string) =>
    ["living", "kitchen", "bedroom", "hero"].includes(k);

  async function handleFilesSelect(files: FileList | File[]) {
    const fileArray = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );

    if (fileArray.length === 0) {
      toast.error("Please select a valid image file (JPEG, PNG, WebP, etc.)");
      return;
    }

    const oversized = fileArray.filter((f) => f.size > 10 * 1024 * 1024);
    if (oversized.length > 0) {
      toast.error(`${oversized.length} file(s) exceed the 10MB limit.`);
      return;
    }

    setUploading(true);
    setUploadProgress({ current: 0, total: fileArray.length });

    const newUploadedUrls: string[] = [];
    let failureCount = 0;

    for (let i = 0; i < fileArray.length; i++) {
      setUploadProgress({ current: i + 1, total: fileArray.length });
      const file = fileArray[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await uploadImageToCloudinary(formData);
        if (res.success && res.url) {
          newUploadedUrls.push(res.url);
        } else {
          failureCount++;
        }
      } catch {
        failureCount++;
      }
    }

    setUploading(false);
    setUploadProgress(null);

    if (newUploadedUrls.length > 0) {
      if (multiple) {
        // If current image is just a single placeholder stock photo, replace it
        const currentClean =
          imageList.length === 1 && isPreset(imageList[0]) ? [] : imageList;
        const updated = [...currentClean, ...newUploadedUrls];
        onChange(JSON.stringify(updated));
        toast.success(`Uploaded ${newUploadedUrls.length} image(s) to Cloudinary!`);
      } else {
        onChange(newUploadedUrls[0]);
        toast.success("Image uploaded to Cloudinary successfully!");
      }
    }

    if (failureCount > 0) {
      toast.error(`Failed to upload ${failureCount} image(s). Please try again.`);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    if (disabled || uploading) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelect(e.dataTransfer.files);
    }
  }

  function handleApplyUrl() {
    if (!urlInput.trim()) return;

    const urls = urlInput
      .split(/[\n,]+/)
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    if (urls.length === 0) return;

    if (multiple) {
      const currentClean =
        imageList.length === 1 && isPreset(imageList[0]) ? [] : imageList;
      const updated = [...currentClean, ...urls];
      onChange(JSON.stringify(updated));
      toast.success(`Added ${urls.length} image URL(s)`);
    } else {
      onChange(urls[0]);
      toast.success("Custom image URL applied");
    }

    setUrlInput("");
  }

  function setCover(index: number) {
    if (index === 0) return;
    const updated = [...imageList];
    const [item] = updated.splice(index, 1);
    updated.unshift(item);
    onChange(JSON.stringify(updated));
    toast.success("Cover photo updated!");
  }

  function moveImage(from: number, to: number) {
    if (to < 0 || to >= imageList.length) return;
    const updated = [...imageList];
    const [item] = updated.splice(from, 1);
    updated.splice(to, 0, item);
    onChange(JSON.stringify(updated));
  }

  function removeImage(index: number) {
    const updated = imageList.filter((_, i) => i !== index);
    if (updated.length === 0) {
      onChange("living");
    } else if (updated.length === 1 && !isExternalImage(updated[0])) {
      onChange(updated[0]);
    } else {
      onChange(JSON.stringify(updated));
    }
    toast.success("Photo removed");
  }

  function clearAll() {
    onChange("living");
    toast.success("Reset to default stock photo");
  }

  function handleSelectPreset(presetKey: string) {
    if (multiple) {
      const currentClean =
        imageList.length === 1 && isPreset(imageList[0]) ? [] : imageList;
      const updated = [...currentClean, presetKey];
      onChange(JSON.stringify(updated));
      toast.success(`Added ${presetKey} photo`);
    } else {
      onChange(presetKey);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider">
          {multiple ? "Property Photos (Upload Multiple)" : "Image Upload"} *
        </label>
        <div className="flex items-center gap-2">
          {multiple && imageList.length > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
              <Images className="size-3" />
              {imageList.length} photo{imageList.length === 1 ? "" : "s"}
            </span>
          )}
          {isConfigured && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Cloudinary Ready {cloudName ? `(${cloudName})` : ""}
            </span>
          )}
        </div>
      </div>

      {/* Mode navigation tabs */}
      <div className="flex gap-1.5 rounded-2xl bg-ink/5 p-1 border border-ink/10 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setTab("upload")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl transition-all ${
            tab === "upload"
              ? "bg-white text-ink shadow-sm"
              : "text-ink/60 hover:text-ink hover:bg-white/50"
          }`}
        >
          <UploadCloud className="size-3.5" />
          {multiple ? "Upload Photos" : "Upload (Cloudinary)"}
        </button>
        <button
          type="button"
          onClick={() => setTab("url")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl transition-all ${
            tab === "url"
              ? "bg-white text-ink shadow-sm"
              : "text-ink/60 hover:text-ink hover:bg-white/50"
          }`}
        >
          <LinkIcon className="size-3.5" />
          Image URL
        </button>
        <button
          type="button"
          onClick={() => setTab("presets")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl transition-all ${
            tab === "presets"
              ? "bg-white text-ink shadow-sm"
              : "text-ink/60 hover:text-ink hover:bg-white/50"
          }`}
        >
          <Sparkles className="size-3.5" />
          Stock Presets
        </button>
      </div>

      {/* TAB 1: CLOUDINARY UPLOAD */}
      {tab === "upload" && (
        <div>
          {isConfigured === false && (
            <div className="mb-3 rounded-2xl border border-amber-500/20 bg-amber-50 p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="size-4 shrink-0 mt-0.5 text-amber-600" />
              <div>
                <p className="font-semibold">Cloudinary Credentials Required</p>
                <p className="mt-0.5 text-amber-800/80 leading-relaxed">
                  Add <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono text-[11px]">CLOUDINARY_CLOUD_NAME</code>,{" "}
                  <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono text-[11px]">CLOUDINARY_API_KEY</code>, and{" "}
                  <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono text-[11px]">CLOUDINARY_API_SECRET</code> to your <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono text-[11px]">.env</code> file.
                </p>
              </div>
            </div>
          )}

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => {
              if (!disabled && !uploading) {
                fileInputRef.current?.click();
              }
            }}
            className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
              dragOver
                ? "border-brand bg-sky-50/70"
                : "border-ink/15 bg-white/50 hover:bg-white hover:border-brand/50"
            } ${disabled || uploading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple={multiple}
              accept="image/*"
              className="hidden"
              disabled={disabled || uploading}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFilesSelect(e.target.files);
                }
              }}
            />

            {uploading ? (
              <div className="flex flex-col items-center gap-2 py-2">
                <Loader2 className="size-8 animate-spin text-brand" />
                <p className="text-xs font-semibold text-ink">
                  {uploadProgress && uploadProgress.total > 1
                    ? `Uploading photo ${uploadProgress.current} of ${uploadProgress.total} to Cloudinary...`
                    : "Uploading to Cloudinary..."}
                </p>
                <p className="text-[11px] text-ink/50">
                  Optimizing and generating high-res CDN delivery URLs
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="grid size-11 place-items-center rounded-2xl bg-sky-500/10 text-brand">
                  <UploadCloud className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {multiple
                      ? "Click to browse or drag & drop multiple photos"
                      : "Click to browse or drag & drop photo"}
                  </p>
                  <p className="text-xs text-ink/50 mt-0.5">
                    {multiple
                      ? "Select multiple images at once (JPG, PNG, WebP, max 10MB each)"
                      : "JPG, PNG, WebP, GIF up to 10MB"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: IMAGE URL */}
      {tab === "url" && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={
                multiple
                  ? "Paste image URL or comma-separated URLs..."
                  : "https://res.cloudinary.com/... or any image URL"
              }
              className="flex-1 rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              disabled={!urlInput.trim()}
              className="rounded-2xl gradient-brand px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-50 hover:opacity-95"
            >
              {multiple ? "Add Photo" : "Apply"}
            </button>
          </div>
          <p className="text-[11px] text-ink/50">
            Paste a direct Cloudinary URL or image address from the web.
          </p>
        </div>
      )}

      {/* TAB 3: DEMO STOCK PRESETS */}
      {tab === "presets" && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PRESET_OPTIONS.map((item) => {
            const isSelected = imageList.includes(item.key);
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleSelectPreset(item.key)}
                className={`flex flex-col items-center gap-1.5 rounded-2xl border p-2 text-left transition-all ${
                  isSelected
                    ? "border-brand bg-sky-50/70 ring-2 ring-brand/30"
                    : "border-ink/10 bg-white hover:border-ink/30"
                }`}
              >
                <img
                  src={imageFor(item.key)}
                  alt={item.label}
                  className="h-14 w-full rounded-xl object-cover"
                />
                <span className="text-[11px] font-semibold text-ink line-clamp-1">
                  {item.label}
                </span>
                {multiple && isSelected && (
                  <span className="text-[9px] text-brand font-bold">Added</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* GALLERY PREVIEWS SECTION */}
      {multiple ? (
        /* Multiple Images Management Grid */
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-ink/70">
              Uploaded Photos ({imageList.length})
            </span>
            {imageList.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-rose-500 hover:text-rose-700 font-semibold transition-colors"
              >
                Reset all
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {imageList.map((imgUrl, index) => {
              const isCover = index === 0;
              const isCustom = isExternalImage(imgUrl);
              return (
                <div
                  key={`${imgUrl}-${index}`}
                  className={`group relative rounded-2xl border overflow-hidden bg-white shadow-sm transition-all ${
                    isCover
                      ? "ring-2 ring-brand border-brand shadow-md"
                      : "border-ink/10 hover:border-ink/30"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/5">
                    <img
                      src={imageFor(imgUrl)}
                      alt={`Photo ${index + 1}`}
                      className="size-full object-cover"
                    />

                    {/* Cover Photo Badge */}
                    {isCover ? (
                      <span className="absolute top-2 left-2 rounded-lg bg-brand px-2 py-0.5 text-[10px] font-bold text-white shadow-md flex items-center gap-1">
                        <Star className="size-2.5 fill-white" /> Cover
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCover(index)}
                        className="absolute top-2 left-2 rounded-lg bg-black/60 opacity-0 group-hover:opacity-100 hover:bg-brand px-2 py-0.5 text-[10px] font-semibold text-white transition-all shadow-sm"
                        title="Set as primary listing cover photo"
                      >
                        Set Cover
                      </button>
                    )}

                    {/* Delete single image button */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 grid size-6 place-items-center rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-rose-600 transition-all shadow-sm"
                      title="Remove this photo"
                    >
                      <X className="size-3.5" />
                    </button>

                    {/* Image index badge */}
                    <span className="absolute bottom-2 right-2 rounded-md bg-black/50 px-1.5 py-0.2 text-[9px] font-mono text-white">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Card bottom toolbar */}
                  <div className="p-2 flex items-center justify-between gap-1 text-xs border-t border-ink/5 bg-white/90">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveImage(index, index - 1)}
                        className="p-1 rounded-md text-ink/60 hover:text-ink hover:bg-ink/5 disabled:opacity-20"
                        title="Move photo left"
                      >
                        <ArrowLeft className="size-3" />
                      </button>
                      <button
                        type="button"
                        disabled={index === imageList.length - 1}
                        onClick={() => moveImage(index, index + 1)}
                        className="p-1 rounded-md text-ink/60 hover:text-ink hover:bg-ink/5 disabled:opacity-20"
                        title="Move photo right"
                      >
                        <ArrowRight className="size-3" />
                      </button>
                    </div>

                    {isCustom && (
                      <a
                        href={imgUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded-md text-ink/50 hover:text-brand hover:bg-sky-50"
                        title="View photo full size"
                      >
                        <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Quick Add More Card */}
            <button
              type="button"
              disabled={disabled || uploading}
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center aspect-[4/3] rounded-2xl border-2 border-dashed border-ink/15 bg-white/40 hover:bg-white hover:border-brand/40 text-ink/60 hover:text-brand transition-all gap-1 text-xs font-semibold p-3 cursor-pointer"
            >
              <div className="grid size-8 place-items-center rounded-xl bg-sky-500/10 text-brand">
                <Plus className="size-4" />
              </div>
              <span>Add More</span>
            </button>
          </div>
        </div>
      ) : (
        /* Single Image Preview (for QR Code or Payment Proof) */
        value && (
          <div className="rounded-2xl border border-white/80 bg-white/70 p-3 shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={imageFor(value)}
                alt="Selected image preview"
                className="size-14 rounded-xl object-cover border border-black/10 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-semibold text-ink truncate">
                    {isExternalImage(value)
                      ? "Custom Cloudinary Photo"
                      : PRESET_OPTIONS.find((p) => p.key === value)?.label ||
                        value}
                  </p>
                  {isExternalImage(value) && (
                    <span className="inline-flex items-center rounded-md bg-sky-500/10 px-1.5 py-0.5 text-[10px] font-medium text-brand">
                      Cloudinary
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-ink/50 truncate max-w-xs mt-0.5">
                  {isExternalImage(value)
                    ? value
                    : "Using local stock photography asset"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {isExternalImage(value) && (
                <a
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-8 place-items-center rounded-xl text-ink/50 hover:text-ink hover:bg-ink/5"
                  title="Open image in new tab"
                >
                  <ExternalLink className="size-3.5" />
                </a>
              )}
              <button
                type="button"
                onClick={() => onChange("living")}
                className="grid size-8 place-items-center rounded-xl text-ink/50 hover:text-rose-600 hover:bg-rose-50"
                title="Reset"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
