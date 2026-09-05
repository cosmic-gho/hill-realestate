import { listProperties } from "@/actions/properties";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyCard } from "@/components/property-card";
import { HomeSearch } from "@/components/home-search";
import { HomeRecommendations } from "@/components/home-recommendations";
import { BrowseCategories } from "@/components/browse-categories";
import { ExploreRenting } from "@/components/explore-renting";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await listProperties({ data: { featuredOnly: true } });

  return (
    <div className="min-h-screen w-full bg-white font-body text-ink">
      <SiteHeader />

      {/* Hero with search */}
      <HomeSearch />

      {/* Featured Properties */}
      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                Featured listings
              </h2>
              <p className="mt-2 text-gray-500">
                Hand-picked homes trending this week
              </p>
            </div>
            <Link
              href="/search"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-[#006AFF] hover:underline"
            >
              View all listings →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>

          <Link
            href="/search"
            className="mt-6 flex sm:hidden items-center justify-center gap-1 text-sm font-bold text-[#006AFF] hover:underline"
          >
            View all listings →
          </Link>
        </div>
      </section>

      {/* Recommendations CTA */}
      <HomeRecommendations />

      {/* Browse by category */}
      <BrowseCategories />

      {/* Explore renting */}
      <ExploreRenting />

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
