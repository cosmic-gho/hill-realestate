"use client";

import React, { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import {
  UploadCloud,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  X,
  AlertCircle,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { uploadImageToCloudinary, checkCloudinaryConfigured } from "@/actions/upload";
import { imageFor, isExternalImage, propertyImages } from "@/lib/property-images";

interface ImageUploaderProps {
  value: string;
  onChange: (urlOrKey: string) => void;
  disabled?: boolean;
}

const PRESET_OPTIONS = [
  { key: "living", label: "Living Room" },
  { key: "kitchen", label: "Kitchen Island" },
  { key: "bedroom", label: "Master Bedroom" },
  { key: "hero", label: "Modern Villa" },
];

export function ImageUploader({ value, onChange, disabled }: ImageUploaderProps) {
  const [tab, setTab] = useState<"upload" | "url" | "presets">("upload");
  const [uploading, setUploading] = useState(false);
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

  const isCustomUrl = isExternalImage(value);

  async function handleFileSelect(file: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPEG, PNG, WebP, etc.)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image file size must be less than 10MB");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadImageToCloudinary(formData);
      if (res.success) {
        onChange(res.url);
        toast.success("Image uploaded to Cloudinary successfully!");
      } else {
        toast.error(res.error || "Failed to upload image");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error uploading file";
      toast.error(msg);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    if (disabled || uploading) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }

  function handleApplyUrl() {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    setUrlInput("");
    toast.success("Custom image URL applied");
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-ink/70 uppercase tracking-wider">
          Property Image *
        </label>
        {isConfigured && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Cloudinary Ready {cloudName ? `(${cloudName})` : ""}
          </span>
        )}
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
          Upload (Cloudinary)
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
              accept="image/*"
              className="hidden"
              disabled={disabled || uploading}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />

            {uploading ? (
              <div className="flex flex-col items-center gap-2 py-2">
                <Loader2 className="size-8 animate-spin text-brand" />
                <p className="text-xs font-semibold text-ink">
                  Uploading to Cloudinary...
                </p>
                <p className="text-[11px] text-ink/50">Optimizing and generating secure URL</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="grid size-11 place-items-center rounded-2xl bg-sky-500/10 text-brand">
                  <UploadCloud className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Click to browse or drag & drop photo
                  </p>
                  <p className="text-xs text-ink/50 mt-0.5">
                    JPG, PNG, WebP, GIF up to 10MB
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
              placeholder="https://res.cloudinary.com/... or any image URL"
              className="flex-1 rounded-2xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              disabled={!urlInput.trim()}
              className="rounded-2xl gradient-brand px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-50 hover:opacity-95"
            >
              Apply
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
            const isSelected = value === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onChange(item.key)}
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
              </button>
            );
          })}
        </div>
      )}

      {/* CURRENT SELECTED PREVIEW */}
      {value && (
        <div className="rounded-2xl border border-white/80 bg-white/70 p-3 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={imageFor(value)}
              alt="Selected property photo preview"
              className="size-14 rounded-xl object-cover border border-black/10 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-semibold text-ink truncate">
                  {isCustomUrl ? "Custom Cloudinary Photo" : PRESET_OPTIONS.find((p) => p.key === value)?.label || value}
                </p>
                {isCustomUrl && (
                  <span className="inline-flex items-center rounded-md bg-sky-500/10 px-1.5 py-0.5 text-[10px] font-medium text-brand">
                    Cloudinary
                  </span>
                )}
              </div>
              <p className="text-[11px] text-ink/50 truncate max-w-xs mt-0.5">
                {isCustomUrl ? value : "Using local stock photography asset"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {isCustomUrl && (
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
              title="Reset to default preset"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
