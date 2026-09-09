import type { StaticImageData } from "next/image";
import living from "@/assets/room-living.jpg";
import kitchen from "@/assets/room-kitchen.jpg";
import bedroom from "@/assets/room-bedroom.jpg";
import hero from "@/assets/hero-home.jpg";

export const propertyImages: Record<string, StaticImageData | string> = {
  living,
  kitchen,
  bedroom,
  hero,
};

export function isExternalImage(key: string | null | undefined): boolean {
  if (!key) return false;
  return (
    key.startsWith("http://") ||
    key.startsWith("https://") ||
    key.startsWith("//") ||
    key.startsWith("data:") ||
    key.startsWith("/")
  );
}

export function getPropertyImages(key: string | null | undefined): string[] {
  if (!key) return ["living"];
  const trimmed = key.trim();
  if (!trimmed) return ["living"];

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const filtered = parsed.filter(
          (item) => typeof item === "string" && item.trim().length > 0,
        );
        if (filtered.length > 0) return filtered;
      }
    } catch {
      // ignore json parse error and proceed
    }
  }

  if (trimmed.includes(",")) {
    const split = trimmed
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    if (split.length > 0) return split;
  }

  return [trimmed];
}

export function imageFor(key: string | null | undefined): string {
  if (!key) return (living as StaticImageData).src || (living as unknown as string);
  const images = getPropertyImages(key);
  const primary = images[0] || "living";
  if (isExternalImage(primary)) {
    return primary;
  }
  const img = propertyImages[primary] ?? living;
  return typeof img === "string" ? img : img.src;
}

export function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US")}`;
}
