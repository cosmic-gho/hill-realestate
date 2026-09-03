"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { GlassBackdrop } from "@/components/glass-backdrop";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { formatPrice, imageFor } from "@/lib/property-images";
import type { Property } from "@/actions/properties";
import { Bookmark, Heart, Trash2, ArrowRight } from "lucide-react";

export default function SavedHomesPage() {
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
        toast.error("Failed to load saved homes");
      } finally {
        setLoading(false);
      }
    }

    fetchSaved();
  }, [user, authLoading]);

  async function handleRemove(propertyId: string) {
    if (!user) return;
    try {
      const { error } = await supabase
        .from("saved_homes")
        .delete()
        .eq("user_id", user.id)
        .eq("property_id", propertyId);

      if (error) throw error;

      setProperties((prev) => prev.filter((p) => p.id !== propertyId));
      toast.success("Removed from saved homes");
    } catch {
      toast.error("Could not remove property");
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-body text-ink">
      <GlassBackdrop />
      <SiteHeader />

      <main className="relative z-20 mx-auto max-w-7xl px-8 pb-24 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-3.5 py-1 text-xs font-semibold tracking-wider text-brand uppercase backdrop-blur-xl">
              <Bookmark className="size-3.5" /> Bookmarks
            </span>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Saved Homes
            </h1>
            <p className="mt-1 text-sm text-ink/60">
              Keep track of properties you're considering touring or buying
            </p>
          </div>
          <Link
            href="/search"
            className="flex items-center gap-2 rounded-2xl bg-white/70 px-5 py-2.5 text-sm font-semibold text-ink border border-white/80 hover:bg-white shadow-sm"
          >
            Explore more listings <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Not logged in state */}
        {!authLoading && !user && (
          <div className="mt-12 rounded-3xl border border-white/60 bg-white/50 p-12 text-center backdrop-blur-2xl shadow-xl shadow-sky-900/5 max-w-xl mx-auto">
            <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-brand/10 text-brand">
              <Heart className="size-7" />
            </div>
            <h2 className="font-display text-2xl font-bold">Sign in to see your saved homes</h2>
            <p className="mt-2 text-sm text-ink/60">
              Create an account or sign in to save your favorite listings and sync them across all
              your devices.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => router.push("/auth")}
                className="gradient-brand rounded-2xl px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/25 hover:opacity-95"
              >
                Sign In or Register
              </button>
            </div>
          </div>
        )}

        {/* Loading state */}
        {(authLoading || loading) && (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-80 animate-pulse rounded-3xl border border-white/60 bg-white/40"
              />
            ))}
          </div>
        )}

        {/* Saved properties list */}
        {!loading && user && properties.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <div
                key={property.id}
                className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/55 shadow-xl shadow-sky-900/5 backdrop-blur-2xl transition-transform hover:-translate-y-1"
              >
                <Link href={`/property/${property.id}`} className="block">
                  <div className="relative">
                    <img
                      src={imageFor(property.image_key)}
                      alt={`${property.title}`}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur">
                      {property.status}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-baseline justify-between">
                      <p className="font-display text-xl font-bold">
                        {formatPrice(property.price)}
                      </p>
                      <p className="text-xs text-ink/45">
                        {property.city}, {property.state}
                      </p>
                    </div>
                    <p className="mt-1 text-sm font-medium text-ink/70">{property.title}</p>
                    <p className="mt-3 text-xs text-ink/50">
                      {property.beds} bd · {property.baths} ba · {property.sqft.toLocaleString()}{" "}
                      sqft
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => handleRemove(property.id)}
                  aria-label="Remove saved home"
                  className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-rose-600 shadow-md backdrop-blur hover:bg-rose-50 transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && user && properties.length === 0 && (
          <div className="mt-12 rounded-3xl border border-white/60 bg-white/50 p-12 text-center backdrop-blur-2xl shadow-xl shadow-sky-900/5 max-w-xl mx-auto">
            <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-ink/5 text-ink/50">
              <Bookmark className="size-7" />
            </div>
            <h2 className="font-display text-2xl font-bold">No saved homes yet</h2>
            <p className="mt-2 text-sm text-ink/60">
              Click the "Save home" button on any listing to bookmark it and track updates here.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/search"
                className="gradient-brand rounded-2xl px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/25 hover:opacity-95"
              >
                Browse Available Homes
              </Link>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
