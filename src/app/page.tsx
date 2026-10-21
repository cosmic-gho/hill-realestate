import { listProperties } from "@/actions/properties";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HomeStaysView } from "@/components/home-stays-view";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const properties = await listProperties();

  return (
    <div className="min-h-screen w-full bg-white font-body text-[#222222]">
      {/* Airbnb Navigation Header */}
      <SiteHeader />

      {/* Interactive Stays, Hero Search, Category Bar & Grid */}
      <HomeStaysView initialProperties={properties} />

      {/* Airbnb Footer */}
      <SiteFooter />
    </div>
  );
}
