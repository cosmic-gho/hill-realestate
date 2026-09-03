import { Suspense } from "react";
import { SearchClient } from "./search-client";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search Homes for Sale & Rent in the Pacific Northwest",
  description:
    "Filter live MLS real estate listings across Portland, Seattle, and the Pacific Northwest. Explore condos, single-family homes, and luxury estates by price, bedrooms, and location.",
  alternates: {
    canonical: "/search",
  },
  openGraph: {
    title: "Search Pacific Northwest Real Estate & Homes for Sale — AetherHomes",
    description:
      "Find verified homes and condos in Portland, Seattle, and beyond with transparent pricing, filterable specs, and immersive photo galleries.",
    url: "/search",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Homes for Sale in the Pacific Northwest — AetherHomes",
    description:
      "Filter active MLS listings across Portland & Seattle by price, bedrooms, and property type.",
  },
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
