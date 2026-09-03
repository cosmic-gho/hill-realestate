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

export function imageFor(key: string | null | undefined): string {
  if (!key) return (living as StaticImageData).src || (living as unknown as string);
  if (isExternalImage(key)) {
    return key;
  }
  const img = propertyImages[key] ?? living;
  return typeof img === "string" ? img : img.src;
}

export function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US")}`;
}
