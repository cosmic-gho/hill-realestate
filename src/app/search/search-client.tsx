"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { listProperties, type Property } from "@/actions/properties";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyCard } from "@/components/property-card";
import { formatPrice, imageFor } from "@/lib/property-images";
import { RotateCcw, MapPin, Search } from "lucide-react";
import Link from "next/link";

export function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [results, setResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

  const q = searchParams.get("q") ?? "";
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
  const beds = searchParams.get("beds") ? Number(searchParams.get("beds")) : undefined;
  const baths = searchParams.get("baths") ? Number(searchParams.get("baths")) : undefined;
  const type = searchParams.get("type") ?? "";
  const status = searchParams.get("status") ?? "";

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listProperties({
        data: {
          q: q || undefined,
          minPrice,
          maxPrice,
          beds,
          baths,
          type: type || undefined,
          status: status || undefined,
        },
      });
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [q, minPrice, maxPrice, beds, baths, type, status]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const updateParam = (key: string, value: string | undefined) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (!value) {
      current.delete(key);
    } else {
      current.set(key, value);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`/search${query}`);
  };

  const resetFilters = () => {
    router.push("/search");
  };

  const activeFiltersCount = [q, minPrice, maxPrice, beds, baths, type, status].filter(
    (v) => v !== undefined && v !== "",
  ).length;

  const selectedProperty = results.find((p) => p.id === selectedPinId);

  return (
    <div className="min-h-screen w-full bg-white font-body text-[#222222]">
      <SiteHeader />

      <main className="mx-auto max-w-[1280px] px-4 pt-6 pb-24 sm:px-6 lg:px-8">
        {/* Results title and reset button */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EBEBEB] pb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#222222]">
              {loading ? "Searching..." : `${results.length} stay${results.length === 1 ? "" : "s"} & properties available`}
            </h1>
            <p className="mt-1 text-sm text-[#717171]">
              {q ? `Matching “${q}”` : "Explore vacation homes, apartments, and luxury villas"}
            </p>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 rounded-full border border-[#DDDDDD] bg-white px-4 py-2 text-xs font-semibold text-[#222222] hover:bg-[#F7F7F7] shadow-xs transition-colors"
            >
              <RotateCcw className="size-3.5" /> Reset {activeFiltersCount} filters
            </button>
          )}
        </div>

        {/* Filter controls row */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {/* Search text input */}
          <div className="flex min-w-[220px] flex-1 items-center gap-2.5 rounded-full border border-[#DDDDDD] bg-white px-4 py-2 text-sm shadow-xs focus-within:border-[#222222]">
            <Search className="size-4 text-[#717171]" />
            <input
              value={q}
              onChange={(e) => updateParam("q", e.target.value)}
              className="w-full bg-transparent text-sm text-[#222222] outline-none placeholder:text-[#717171]"
              placeholder="City, neighborhood, or keyword"
              aria-label="City, neighborhood, or keyword"
            />
          </div>

          {/* Min price */}
          <select
            aria-label="Min price"
            value={minPrice ? String(minPrice) : ""}
            onChange={(e) => updateParam("minPrice", e.target.value)}
            className="rounded-full border border-[#DDDDDD] bg-white px-4 py-2 text-xs font-semibold text-[#222222] shadow-xs outline-none hover:border-[#222222] cursor-pointer"
          >
            <option value="">Price: Min</option>
            <option value="200">$200+</option>
            <option value="400">$400+</option>
            <option value="600">$600+</option>
            <option value="500000">$500k+</option>
            <option value="1000000">$1M+</option>
          </select>

          {/* Max price */}
          <select
            aria-label="Max price"
            value={maxPrice ? String(maxPrice) : ""}
            onChange={(e) => updateParam("maxPrice", e.target.value)}
            className="rounded-full border border-[#DDDDDD] bg-white px-4 py-2 text-xs font-semibold text-[#222222] shadow-xs outline-none hover:border-[#222222] cursor-pointer"
          >
            <option value="">Price: Max</option>
            <option value="350">Up to $350</option>
            <option value="500">Up to $500</option>
            <option value="1000">Up to $1k</option>
            <option value="800000">Up to $800k</option>
            <option value="1500000">Up to $1.5M</option>
          </select>

          {/* Beds */}
          <select
            aria-label="Minimum beds"
            value={beds ? String(beds) : ""}
            onChange={(e) => updateParam("beds", e.target.value)}
            className="rounded-full border border-[#DDDDDD] bg-white px-4 py-2 text-xs font-semibold text-[#222222] shadow-xs outline-none hover:border-[#222222] cursor-pointer"
          >
            <option value="">Beds: Any</option>
            <option value="1">1+ beds</option>
            <option value="2">2+ beds</option>
            <option value="3">3+ beds</option>
            <option value="4">4+ beds</option>
          </select>

          {/* Baths */}
          <select
            aria-label="Minimum baths"
            value={baths ? String(baths) : ""}
            onChange={(e) => updateParam("baths", e.target.value)}
            className="rounded-full border border-[#DDDDDD] bg-white px-4 py-2 text-xs font-semibold text-[#222222] shadow-xs outline-none hover:border-[#222222] cursor-pointer"
          >
            <option value="">Baths: Any</option>
            <option value="1">1+ baths</option>
            <option value="2">2+ baths</option>
            <option value="3">3+ baths</option>
          </select>

          {/* Property type */}
          <select
            aria-label="Property type"
            value={type}
            onChange={(e) => updateParam("type", e.target.value)}
            className="rounded-full border border-[#DDDDDD] bg-white px-4 py-2 text-xs font-semibold text-[#222222] shadow-xs outline-none hover:border-[#222222] cursor-pointer"
          >
            <option value="">Type: All</option>
            <option value="Airbnb">Airbnb / Vacation</option>
            <option value="Condo">Condo / Loft</option>
            <option value="Rental">Rental Apartment</option>
            <option value="Villa">Luxury Villa</option>
            <option value="House">House</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Cottage">Cottage</option>
          </select>

          {/* Status */}
          <select
            aria-label="Listing status"
            value={status}
            onChange={(e) => updateParam("status", e.target.value)}
            className="rounded-full border border-[#DDDDDD] bg-white px-4 py-2 text-xs font-semibold text-[#222222] shadow-xs outline-none hover:border-[#222222] cursor-pointer"
          >
            <option value="">Status: All</option>
            <option value="Airbnb">Airbnb</option>
            <option value="For rent">For rent</option>
            <option value="For sale">For sale</option>
            <option value="New">New</option>
            <option value="Price drop">Price drop</option>
          </select>
        </div>

        {/* Results layout: Map on left, Cards on right */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.15fr]">
          {/* Interactive Map View with Airbnb Style Map Pins */}
          <div className="relative h-[620px] overflow-hidden rounded-3xl border border-[#EBEBEB] bg-[#F7F7F7] shadow-sm lg:sticky lg:top-24">
            <div className="absolute inset-0 bg-[radial-gradient(#DDDDDD_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

            {results.map((p, i) => {
              const isSelected = selectedPinId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPinId(isSelected ? null : p.id)}
                  className={`absolute rounded-full px-3 py-1 text-xs font-bold transition-all duration-200 cursor-pointer shadow-md ${
                    isSelected
                      ? "bg-[#222222] text-white scale-110 z-30 ring-2 ring-white"
                      : "bg-white text-[#222222] hover:scale-105 hover:bg-[#222222] hover:text-white border border-[#DDDDDD] z-10"
                  }`}
                  style={{
                    top: `${14 + ((i * 11) % 72)}%`,
                    left: `${10 + ((i * 23) % 75)}%`,
                  }}
                  aria-label={`View listing ${p.title}`}
                >
                  {formatPrice(p.price, p.property_type, p.status)}
                </button>
              );
            })}

            {/* Selected property popup card */}
            {selectedProperty && (
              <div className="absolute bottom-16 left-6 right-6 z-20 overflow-hidden rounded-2xl border border-[#EBEBEB] bg-white p-3 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150">
                <div className="flex gap-3">
                  <img
                    src={imageFor(selectedProperty.image_key)}
                    alt={selectedProperty.title}
                    className="size-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-1">
                      <p className="text-base font-bold text-[#222222] truncate">
                        {formatPrice(selectedProperty.price, selectedProperty.property_type, selectedProperty.status)}
                      </p>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        {selectedProperty.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#222222] truncate mt-0.5">
                      {selectedProperty.title}
                    </p>
                    <p className="text-[12px] text-[#717171] truncate">
                      {selectedProperty.city}, {selectedProperty.state}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] text-[#717171]">
                        {selectedProperty.beds} bd · {selectedProperty.baths} ba
                      </span>
                      <Link
                        href={`/property/${selectedProperty.id}`}
                        className="text-xs font-bold text-[#FF385C] hover:underline"
                      >
                        View stay →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full border border-[#DDDDDD] bg-white/95 px-3 py-1 text-xs font-medium text-[#717171] shadow-xs">
              <MapPin className="size-3 text-[#FF385C]" /> Map view
            </div>
          </div>

          {/* Cards list */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
            {results.map((p) => (
              <div
                key={p.id}
                className={`transition-all duration-200 ${
                  selectedPinId === p.id ? "ring-2 ring-[#222222] rounded-2xl p-1" : ""
                }`}
              >
                <PropertyCard property={p} />
              </div>
            ))}

            {!loading && results.length === 0 && (
              <div className="col-span-full rounded-2xl border border-[#EBEBEB] bg-[#F7F7F7] p-12 text-center text-sm text-[#717171]">
                <p className="text-base font-bold text-[#222222] mb-1">
                  No matching stays found
                </p>
                <p className="max-w-sm mx-auto">
                  Try broadening your price range, beds, or clearing filter criteria to view more listings.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 rounded-full bg-[#222222] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
