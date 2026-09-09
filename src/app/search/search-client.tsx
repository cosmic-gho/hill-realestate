"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { listProperties, type Property } from "@/actions/properties";
import { GlassBackdrop } from "@/components/glass-backdrop";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyCard } from "@/components/property-card";
import { formatPrice, imageFor } from "@/lib/property-images";
import { RotateCcw, MapPin } from "lucide-react";

export function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
  const beds = searchParams.get("beds") ? Number(searchParams.get("beds")) : undefined;
  const baths = searchParams.get("baths") ? Number(searchParams.get("baths")) : undefined;
  const type = searchParams.get("type") ?? "";
  const status = searchParams.get("status") ?? "";

  const [results, setResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

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
    <div className="relative min-h-screen w-full overflow-hidden font-body text-ink">
      <GlassBackdrop />
      <SiteHeader />

      <main className="relative z-20 mx-auto max-w-7xl px-8 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {loading ? "Searching..." : `${results.length} home${results.length === 1 ? "" : "s"} available`}
            </h1>
            <p className="mt-1 text-sm text-ink/55">
              {q ? `Matching “${q}”` : "Across the Pacific Northwest"}
            </p>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 rounded-2xl border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold text-ink/70 hover:bg-white hover:text-ink transition-colors shadow-sm"
            >
              <RotateCcw className="size-3.5" /> Reset {activeFiltersCount} filters
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div className="mt-6 flex flex-wrap gap-2.5 rounded-3xl border border-white/60 bg-white/45 p-4 shadow-xl shadow-sky-900/10 backdrop-blur-2xl">
          {/* Search text input */}
          <div className="flex min-w-[200px] flex-1 items-center gap-2.5 rounded-2xl bg-white/75 px-4 py-2.5 border border-white/80">
            <span className="text-brand font-bold">⌕</span>
            <input
              value={q}
              onChange={(e) => updateParam("q", e.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
              placeholder="City, neighborhood, or ZIP"
              aria-label="City, neighborhood, or ZIP"
            />
          </div>

          {/* Min price */}
          <select
            aria-label="Min price"
            value={minPrice ? String(minPrice) : ""}
            onChange={(e) => updateParam("minPrice", e.target.value)}
            className="rounded-2xl bg-white/75 px-3.5 py-2.5 text-xs font-semibold text-ink/70 outline-none border border-white/80 hover:bg-white"
          >
            <option value="">Min Price</option>
            <option value="400000">$400k+</option>
            <option value="600000">$600k+</option>
            <option value="800000">$800k+</option>
            <option value="1000000">$1M+</option>
          </select>

          {/* Max price */}
          <select
            aria-label="Max price"
            value={maxPrice ? String(maxPrice) : ""}
            onChange={(e) => updateParam("maxPrice", e.target.value)}
            className="rounded-2xl bg-white/75 px-3.5 py-2.5 text-xs font-semibold text-ink/70 outline-none border border-white/80 hover:bg-white"
          >
            <option value="">Max Price</option>
            <option value="650000">Up to $650k</option>
            <option value="850000">Up to $850k</option>
            <option value="1100000">Up to $1.1M</option>
            <option value="1500000">Up to $1.5M</option>
          </select>

          {/* Beds */}
          <select
            aria-label="Minimum beds"
            value={beds ? String(beds) : ""}
            onChange={(e) => updateParam("beds", e.target.value)}
            className="rounded-2xl bg-white/75 px-3.5 py-2.5 text-xs font-semibold text-ink/70 outline-none border border-white/80 hover:bg-white"
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
            className="rounded-2xl bg-white/75 px-3.5 py-2.5 text-xs font-semibold text-ink/70 outline-none border border-white/80 hover:bg-white"
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
            className="rounded-2xl bg-white/75 px-3.5 py-2.5 text-xs font-semibold text-ink/70 outline-none border border-white/80 hover:bg-white"
          >
            <option value="">Type: All</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Airbnb">Airbnb / Vacation</option>
            <option value="Rental">Rental Apartment</option>
            <option value="Villa">Luxury Villa</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Cottage">Cottage</option>
            <option value="Duplex">Duplex</option>
          </select>

          {/* Status */}
          <select
            aria-label="Listing status"
            value={status}
            onChange={(e) => updateParam("status", e.target.value)}
            className="rounded-2xl bg-white/75 px-3.5 py-2.5 text-xs font-semibold text-ink/70 outline-none border border-white/80 hover:bg-white"
          >
            <option value="">Status: All</option>
            <option value="For sale">For sale</option>
            <option value="For rent">For rent</option>
            <option value="Airbnb">Airbnb</option>
            <option value="New">New</option>
            <option value="Price drop">Price drop</option>
            <option value="Open house">Open house</option>
          </select>
        </div>

        {/* Results layout: Interactive Map on left, Cards on right */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr]">
          {/* Map view */}
          <div className="relative h-[600px] overflow-hidden rounded-3xl border border-white/60 bg-white/40 shadow-xl shadow-sky-900/10 backdrop-blur-2xl lg:sticky lg:top-6">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.14)_1px,transparent_1px)] bg-[size:44px_44px]" />

            {results.map((p, i) => {
              const isSelected = selectedPinId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPinId(isSelected ? null : p.id)}
                  className={`absolute rounded-2xl px-3 py-1.5 font-display text-xs font-bold shadow-lg backdrop-blur transition-all duration-200 ${
                    isSelected
                      ? "bg-brand text-white ring-4 ring-sky-400/40 scale-110 z-30"
                      : "bg-ink/85 text-primary-foreground hover:bg-brand hover:scale-105 z-10"
                  }`}
                  style={{
                    top: `${14 + ((i * 11) % 72)}%`,
                    left: `${10 + ((i * 23) % 75)}%`,
                  }}
                >
                  {formatPrice(p.price, p.property_type, p.status)}
                </button>
              );
            })}

            {selectedProperty && (
              <div className="absolute bottom-16 left-6 right-6 z-20 overflow-hidden rounded-3xl border border-white/80 bg-white/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
                <div className="flex gap-4">
                  <img
                    src={imageFor(selectedProperty.image_key)}
                    alt={selectedProperty.title}
                    className="size-20 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <p className="font-display text-lg font-bold text-ink">
                        {formatPrice(selectedProperty.price, selectedProperty.property_type, selectedProperty.status)}
                      </p>
                      <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand">
                        {selectedProperty.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-ink/80 mt-0.5">
                      {selectedProperty.title}
                    </p>
                    <p className="text-[11px] text-ink/50">
                      {selectedProperty.address}, {selectedProperty.city}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] text-ink/60">
                        {selectedProperty.beds} bd · {selectedProperty.baths} ba ·{" "}
                        {selectedProperty.sqft} sqft
                      </span>
                      <Link
                        href={`/property/${selectedProperty.id}`}
                        className="text-xs font-semibold text-brand hover:underline"
                      >
                        View details →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3.5 py-1 text-xs font-medium text-ink/60 backdrop-blur-xl shadow-sm">
              <MapPin className="size-3 text-brand" /> Interactive map pins
            </div>
          </div>

          {/* Cards list */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {results.map((p) => (
              <div
                key={p.id}
                className={`transition-all duration-200 rounded-3xl ${
                  selectedPinId === p.id ? "ring-2 ring-brand scale-[1.01]" : ""
                }`}
              >
                <PropertyCard property={p} />
              </div>
            ))}
            {!loading && results.length === 0 && (
              <div className="col-span-full rounded-3xl border border-white/60 bg-white/50 p-12 text-center text-sm text-ink/60 backdrop-blur-2xl">
                <p className="font-display text-lg font-bold text-ink mb-1">
                  No matching homes found
                </p>
                <p className="max-w-sm mx-auto">
                  Try broadening your price range, beds, or clearing filter criteria to view more
                  listings.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 rounded-2xl bg-ink px-5 py-2.5 text-xs font-semibold text-white"
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
