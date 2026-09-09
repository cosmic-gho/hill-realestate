"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const tabs = [
  { label: "Buy", value: "buy" },
  { label: "Rent", value: "rent" },
  { label: "Airbnb", value: "airbnb" },
  { label: "Condos", value: "condo" },
] as const;

export function HomeSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("buy");
  const [q, setQ] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (activeTab === "rent") params.set("status", "For rent");
    if (activeTab === "airbnb") params.set("type", "Airbnb");
    if (activeTab === "condo") params.set("type", "Condo");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative w-full">
      {/* Full-width hero background */}
      <div className="relative h-[520px] sm:h-[540px] lg:h-[580px] overflow-hidden">
        <img
          src="/assets/hero-zillow.png"
          alt="Real estate agent showing a home to buyers"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

        {/* Hero content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
          {/* Bold headline */}
          <h1
            className="text-center text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Rentals. Homes.
            <br />
            Agents. Loans.
          </h1>

          {/* Search bar */}
          <div className="mt-8 w-full max-w-[600px]">
            {/* Tabs */}
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-5 py-2.5 text-sm font-bold transition-all rounded-t-lg ${activeTab === tab.value
                      ? "bg-white text-gray-900"
                      : "bg-white/30 text-white hover:bg-white/50 backdrop-blur-sm"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search input */}
            <form onSubmit={handleSubmit} className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Enter an address, neighborhood, city, or ZIP code"
                className="w-full rounded-b-lg rounded-tr-lg bg-white py-4 pl-5 pr-14 text-sm text-gray-800 placeholder:text-gray-400 outline-none shadow-lg"
                aria-label="Search address"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-lg bg-[#006AFF] text-white hover:bg-[#0052cc] transition-colors"
                aria-label="Search"
              >
                <Search className="size-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
