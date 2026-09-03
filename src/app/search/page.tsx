import { Suspense } from "react";
import { SearchClient } from "./search-client";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Browse Homes for Sale & Rent — AetherHomes",
  description:
    "Filter Pacific Northwest listings by location, price, beds, baths, and property type with interactive map view.",
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
