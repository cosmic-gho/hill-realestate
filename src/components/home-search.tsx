"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const quickFilters = [
  { label: "Condos", href: "/search?type=Condo" },
  { label: "New build", href: "/search?q=Cedar" },
  { label: "Waterfront", href: "/search?q=Harborview" },
  { label: "Under $650k", href: "/search?maxPrice=650000" },
] as const;

export function HomeSearch({ listingCount }: { listingCount: number }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (beds) params.set("beds", beds);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand uppercase backdrop-blur-xl">
        <span className="size-1.5 rounded-full bg-accent-cyan" /> {listingCount * 800} live
        listings in Portland
      </span>
      <h1 className="mt-6 font-display text-5xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
        Find the home that{" "}
        <span className="gradient-brand bg-clip-text text-transparent">moves</span> with you.
      </h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/60">
        Search, save, and tour verified homes across the Pacific Northwest — with live listing data.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-3 rounded-3xl border border-white/60 bg-white/45 p-4 shadow-xl shadow-sky-900/10 backdrop-blur-2xl sm:flex-row sm:items-center"
      >
        <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white/70 px-4 py-3">
          <span className="text-brand">⌕</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
            placeholder="City, neighborhood, or ZIP"
            aria-label="City, neighborhood, or ZIP"
          />
        </div>
        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          aria-label="Max price"
          className="rounded-2xl bg-white/70 px-4 py-3 text-sm font-medium text-ink/60 outline-none"
        >
          <option value="">Any price</option>
          <option value="600000">Up to $600k</option>
          <option value="800000">Up to $800k</option>
          <option value="1200000">Up to $1.2M</option>
        </select>
        <select
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          aria-label="Minimum beds"
          className="rounded-2xl bg-white/70 px-4 py-3 text-sm font-medium text-ink/60 outline-none"
        >
          <option value="">Any beds</option>
          <option value="2">2+ beds</option>
          <option value="3">3+ beds</option>
          <option value="4">4+ beds</option>
        </select>
        <button
          type="submit"
          className="gradient-brand rounded-2xl px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/30 hover:opacity-95"
        >
          Search
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-ink/50">
        {quickFilters.map((f) => (
          <Link
            key={f.label}
            href={f.href}
            className="rounded-full border border-white/60 bg-white/40 px-3 py-1.5 backdrop-blur-xl hover:text-ink"
          >
            {f.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
