"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";

export const AIRBNB_CATEGORIES = [
  { id: "all", label: "All Stays", icon: "✨", query: "" },
  { id: "beachfront", label: "Beachfront", icon: "🏖️", query: "Beach" },
  { id: "cabins", label: "Cabins", icon: "🪵", query: "Cabin" },
  { id: "mansions", label: "Mansions", icon: "🏰", query: "Villa" },
  { id: "views", label: "Amazing views", icon: "🌄", query: "View" },
  { id: "pools", label: "Amazing pools", icon: "🏊", query: "Pool" },
  { id: "lakefront", label: "Lakefront", icon: "⛵", query: "Lake" },
  { id: "condos", label: "City lofts", icon: "🏙️", query: "Condo" },
  { id: "iconic", label: "Icons", icon: "⭐", query: "Penthouse" },
  { id: "ski", label: "Skiing", icon: "🎿", query: "Ski" },
  { id: "tiny", label: "Cottages", icon: "🏡", query: "Cottage" },
  { id: "luxe", label: "Luxe", icon: "💎", query: "Luxury" },
];

export function HomeSearch({
  activeCategory = "all",
  onSelectCategory,
}: {
  activeCategory?: string;
  onSelectCategory?: (id: string, query: string) => void;
}) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [selectedCat, setSelectedCat] = useState(activeCategory);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.set("q", destination.trim());
    if (dates.trim()) params.set("dates", dates.trim());
    if (guests.trim()) params.set("guests", guests.trim());
    router.push(`/search?${params.toString()}`);
  };

  const handleCategoryClick = (cat: typeof AIRBNB_CATEGORIES[0]) => {
    setSelectedCat(cat.id);
    if (onSelectCategory) {
      onSelectCategory(cat.id, cat.query);
    } else {
      const params = new URLSearchParams();
      if (cat.query) params.set("q", cat.query);
      router.push(`/search?${params.toString()}`);
    }
  };

  return (
    <section className="w-full bg-white border-b border-[#EBEBEB]">
      {/* Floating Airbnb Pill Search Bar */}
      <div className="mx-auto max-w-[1280px] px-4 pt-4 pb-2 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSearchSubmit}
          className="mx-auto flex max-w-[850px] items-center rounded-full border border-[#DDDDDD] bg-white p-2 shadow-[0_3px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.14)] transition-all"
        >
          {/* Section 1: Where */}
          <div className="flex-1 px-4 py-1.5 rounded-full hover:bg-[#F7F7F7] cursor-pointer transition-colors">
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#222222]">
              Where
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Search destinations, cities, or lakes"
              className="w-full bg-transparent text-sm text-[#222222] placeholder:text-[#717171] outline-none font-medium truncate"
            />
          </div>

          <div className="h-8 w-[1px] bg-[#EBEBEB] hidden sm:block" />

          {/* Section 2: When / Dates */}
          <div className="flex-1 px-4 py-1.5 rounded-full hover:bg-[#F7F7F7] cursor-pointer transition-colors hidden sm:block">
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#222222]">
              Check in / out
            </label>
            <input
              type="text"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              placeholder="Add dates"
              className="w-full bg-transparent text-sm text-[#222222] placeholder:text-[#717171] outline-none font-medium truncate"
            />
          </div>

          <div className="h-8 w-[1px] bg-[#EBEBEB] hidden md:block" />

          {/* Section 3: Who / Guests */}
          <div className="flex-1 px-4 py-1.5 rounded-full hover:bg-[#F7F7F7] cursor-pointer transition-colors hidden md:block">
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#222222]">
              Who
            </label>
            <input
              type="text"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Add guests"
              className="w-full bg-transparent text-sm text-[#222222] placeholder:text-[#717171] outline-none font-medium truncate"
            />
          </div>

          {/* Red/Coral Search Button */}
          <button
            type="submit"
            className="grid size-12 shrink-0 place-items-center rounded-full bg-[#FF385C] text-white hover:bg-[#E00B41] transition-all hover:scale-105 active:scale-95 shadow-md ml-1"
            aria-label="Search listings"
          >
            <Search className="size-4 stroke-[3]" />
          </button>
        </form>
      </div>

      {/* Horizontal Category Icons Scrollbar */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-7 overflow-x-auto scrollbar-none py-3 pt-4">
          {AIRBNB_CATEGORIES.map((cat) => {
            const isActive = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className={`flex shrink-0 flex-col items-center gap-1.5 pb-2.5 transition-all cursor-pointer border-b-2 ${
                  isActive
                    ? "border-[#222222] text-[#222222] font-semibold opacity-100"
                    : "border-transparent text-[#717171] opacity-70 hover:opacity-100 hover:text-[#222222] hover:border-[#DDDDDD]"
                }`}
              >
                <span className="text-2xl leading-none">{cat.icon}</span>
                <span className="text-[12px] whitespace-nowrap tracking-tight">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
