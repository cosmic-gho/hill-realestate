import { listProperties } from "@/actions/properties";
import { GlassBackdrop } from "@/components/glass-backdrop";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyCard } from "@/components/property-card";
import { HomeSearch } from "@/components/home-search";
import heroHome from "@/assets/hero-home.jpg";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await listProperties({ data: { featuredOnly: true } });

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-body text-ink">
      <GlassBackdrop />
      <SiteHeader />

      <section className="relative z-20 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 pt-10 pb-24 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <HomeSearch listingCount={featured.length} />

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rotate-[-6deg] rounded-[36px] border border-white/50 bg-white/20 backdrop-blur-xl" />
          <Image
            src={heroHome}
            alt="Modern Pacific Northwest home with floor-to-ceiling windows among evergreens"
            priority
            width={1088}
            height={1200}
            className="relative aspect-[9/10] w-full rotate-[2deg] rounded-[30px] border border-white/60 object-cover shadow-2xl shadow-sky-900/15"
          />
          <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-xl shadow-sky-900/10 backdrop-blur-xl">
            <span className="gradient-brand grid size-10 place-items-center rounded-xl text-primary-foreground font-bold">
              $
            </span>
            <div>
              <p className="font-display text-lg leading-none font-bold">$812,000</p>
              <p className="mt-1 text-xs text-ink/50">3 bd · 2 ba · 2,140 sqft</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto max-w-7xl px-8 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">Featured this week</h2>
            <p className="mt-2 text-sm text-ink/55">Hand-picked homes trending in the metro</p>
          </div>
          <Link
            href="/search"
            className="text-sm font-semibold text-brand hover:text-ink"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
