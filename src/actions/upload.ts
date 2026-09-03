"use server";

import { v2 as cloudinary } from "cloudinary";

function isValidValue(val: string | undefined): boolean {
  if (!val) return false;
  const trimmed = val.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("your_") || trimmed.includes("placeholder")) return false;
  return true;
}

function configureCloudinary() {
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey =
    process.env.CLOUDINARY_API_KEY ||
    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudinaryUrl = process.env.CLOUDINARY_URL;

  if (isValidValue(cloudinaryUrl)) {
    cloudinary.config({
      cloudinary_url: cloudinaryUrl,
      secure: true,
    });
    return true;
  }

  if (isValidValue(cloudName) && isValidValue(apiKey) && isValidValue(apiSecret)) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    return true;
  }

  return false;
}

export async function checkCloudinaryConfigured(): Promise<{ configured: boolean; cloudName?: string }> {
  const configured = configureCloudinary();
  const rawCloudName =
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const cloudName = isValidValue(rawCloudName) ? rawCloudName : undefined;
  return { configured, cloudName };
}

export type UploadResult =
  | { success: true; url: string; publicId: string }
  | { success: false; error: string };

export async function uploadImageToCloudinary(formData: FormData): Promise<UploadResult> {
  try {
    const isConfigured = configureCloudinary();
    if (!isConfigured) {
      return {
        success: false,
        error:
          "Cloudinary credentials are not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file.",
      };
    }

    const file = formData.get("file") as File | null;
    if (!file) {
      return { success: false, error: "No image file provided." };
    }

    // Check size limit (max 10MB)
    const MAX_SIZE_BYTES = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      return { success: false, error: "File size exceeds 10MB limit." };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mime = file.type || "image/jpeg";
    const base64Data = `data:${mime};base64,${buffer.toString("base64")}`;

    const uploadResponse = await cloudinary.uploader.upload(base64Data, {
      folder: "aetherhomes/properties",
      resource_type: "image",
    });

    return {
      success: true,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred during upload.";
    return { success: false, error: message };
  }
}
