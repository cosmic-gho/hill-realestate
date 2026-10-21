"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyCard } from "@/components/property-card";
import type { Property } from "@/actions/properties";
import { Heart, ArrowRight } from "lucide-react";

export default function WishlistsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchSaved() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("saved_homes")
          .select("id, property_id, properties(*)")
          .eq("user_id", user!.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Filter and map to Property objects
        const list: Property[] = (data || [])
          .map((item: any) => item.properties)
          .filter(Boolean);

        setProperties(list);
      } catch {
        toast.error("Failed to load wishlists");
      } finally {
        setLoading(false);
      }
    }

    fetchSaved();
  }, [user, authLoading]);

  return (
    <div className="min-h-screen w-full bg-white font-body text-[#222222]">
      <SiteHeader />

      <main className="mx-auto max-w-[1280px] px-4 pt-8 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EBEBEB] pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#222222] tracking-tight">
              Wishlists
            </h1>
            <p className="mt-1 text-sm text-[#717171]">
              Collect and manage your favorite stays and vacation homes
            </p>
          </div>
          <Link
            href="/search"
            className="flex items-center gap-2 rounded-full border border-[#DDDDDD] bg-white px-5 py-2.5 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] shadow-xs"
          >
            Explore more stays <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Not logged in state */}
        {!authLoading && !user && (
          <div className="mt-16 rounded-3xl border border-[#EBEBEB] bg-[#F7F7F7] p-12 text-center max-w-lg mx-auto">
            <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-[#FFF0F2] text-[#FF385C]">
              <Heart className="size-7 fill-[#FF385C]" />
            </div>
            <h2 className="text-2xl font-bold text-[#222222]">
              Log in to view your wishlists
            </h2>
            <p className="mt-2 text-sm text-[#717171] leading-relaxed">
              You can create, view, or edit wishlists once you've logged in.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => router.push("/auth")}
                className="gradient-brand rounded-xl px-8 py-3 text-sm font-bold text-white shadow-md hover:opacity-95"
              >
                Log in
              </button>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {(authLoading || loading) && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="aspect-[20/19] rounded-2xl bg-[#EEEEEE] mb-3" />
                <div className="h-4 bg-[#EEEEEE] rounded w-3/4 mb-2" />
                <div className="h-3 bg-[#EEEEEE] rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Saved properties list in Airbnb grid */}
        {!loading && user && properties.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && user && properties.length === 0 && (
          <div className="mt-16 rounded-3xl border border-[#EBEBEB] bg-[#F7F7F7] p-12 text-center max-w-lg mx-auto">
            <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-white text-[#717171] shadow-xs">
              <Heart className="size-7" />
            </div>
            <h2 className="text-2xl font-bold text-[#222222]">No saved stays yet</h2>
            <p className="mt-2 text-sm text-[#717171] leading-relaxed">
              As you search, tap the heart icon to save your favorite stays and experiences to a wishlist.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/search"
                className="rounded-xl bg-[#222222] px-7 py-3 text-sm font-bold text-white shadow-sm hover:bg-black transition-all"
              >
                Start exploring
              </Link>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
