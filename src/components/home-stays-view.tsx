"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Property } from "@/actions/properties";
import { PropertyCard } from "@/components/property-card";
import { HomeSearch } from "@/components/home-search";

export function HomeStaysView({ initialProperties }: { initialProperties: Property[] }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("recommended");
  const [visibleCount, setVisibleCount] = useState(12);

  // Filter properties based on category, price, and sorting
  const filtered = useMemo(() => {
    let list = [...initialProperties];

    // Filter by category
    if (selectedCategory !== "all") {
      const catMap: Record<string, string[]> = {
        beachfront: ["beach", "coast", "ocean", "waterfront"],
        cabins: ["cabin", "timber", "cottage", "chalet", "wood"],
        mansions: ["villa", "estate", "sanctuary", "mansion"],
        views: ["view", "sky", "ridge", "high", "mountain"],
        pools: ["pool", "jacuzzi", "spa", "terrace"],
        lakefront: ["lake", "creek", "water", "river"],
        condos: ["condo", "loft", "flat", "apartment"],
        iconic: ["penthouse", "harborview", "icon", "masterpiece"],
        ski: ["timberline", "ski", "alpine", "mountain", "snow"],
        tiny: ["cottage", "duplex", "studio"],
        luxe: ["villa", "penthouse", "estate", "modern"],
      };

      const keywords = catMap[selectedCategory] || [selectedCategory];
      list = list.filter((p) => {
        const text = `${p.title} ${p.description} ${p.property_type} ${p.city}`.toLowerCase();
        return keywords.some((kw) => text.includes(kw));
      });
    }

    // Filter by price
    if (priceFilter === "under300") {
      list = list.filter((p) => p.price < 300 || (p.price < 600000 && p.price > 10000));
    } else if (priceFilter === "300to600") {
      list = list.filter(
        (p) => (p.price >= 300 && p.price <= 600) || (p.price >= 600000 && p.price <= 1000000),
      );
    } else if (priceFilter === "over600") {
      list = list.filter((p) => p.price > 600 || p.price > 1000000);
    }

    // Sort
    if (sortOrder === "priceLow") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "priceHigh") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "topRated") {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [initialProperties, selectedCategory, priceFilter, sortOrder]);

  const displayed = filtered.slice(0, visibleCount);

  return (
    <div className="w-full">
      {/* Airbnb Hero Search & Category Filter Bar */}
      <HomeSearch
        activeCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          setVisibleCount(12);
        }}
      />

      {/* Main Stays Content Container */}
      <main className="mx-auto max-w-[1280px] px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        {/* Section Header with Stays Count and Select Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EBEBEB] pb-6 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#222222]">
              Stays & Vacation Rentals and Sales across the globe
            </h1>
            <p className="mt-1 text-sm text-[#717171]">
              Showing {filtered.length} stay{filtered.length === 1 ? "" : "s"} & properties
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Price filter dropdown */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="rounded-full border border-[#DDDDDD] bg-white px-4 py-2 text-sm font-semibold text-[#222222] shadow-xs outline-none hover:border-[#222222] cursor-pointer"
              aria-label="Filter by price"
            >
              <option value="all">Any price</option>
              <option value="under300">Under $300</option>
              <option value="300to600">$300 – $600</option>
              <option value="over600">$600+</option>
            </select>

            {/* Sort order dropdown */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-full border border-[#DDDDDD] bg-white px-4 py-2 text-sm font-semibold text-[#222222] shadow-xs outline-none hover:border-[#222222] cursor-pointer"
              aria-label="Sort listings"
            >
              <option value="recommended">Recommended</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="topRated">Top Rated</option>
            </select>
          </div>
        </div>

        {/* 4-Column Airbnb Card Grid */}
        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {displayed.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg font-bold text-[#222222]">No stays found</p>
            <p className="mt-1 text-sm text-[#717171]">
              Try choosing a different category or clearing your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setPriceFilter("all");
                setSortOrder("recommended");
              }}
              className="mt-4 rounded-full bg-[#222222] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filtered.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="rounded-lg bg-[#222222] px-7 py-3 text-[15px] font-bold text-white shadow-md hover:bg-black transition-all"
            >
              Show more stays
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
