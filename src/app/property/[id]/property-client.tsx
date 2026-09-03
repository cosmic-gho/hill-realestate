"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { submitInquiry, type Property } from "@/actions/properties";
import { GlassBackdrop } from "@/components/glass-backdrop";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MortgageCalculator } from "@/components/mortgage-calculator";
import { formatPrice, imageFor, propertyImages } from "@/lib/property-images";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Share2, Check, ArrowLeft, Bookmark } from "lucide-react";

export function PropertyClient({ property }: { property: Property }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [active, setActive] = useState(property.image_key);
  const [copied, setCopied] = useState(false);

  // Tour booking form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferred_date: "",
    message: "",
  });
  const [submittingInquiry, setSubmittingInquiry] = useState(false);

  useEffect(() => {
    if (!user) {
      setSaved(false);
      return;
    }
    supabase
      .from("saved_homes")
      .select("id")
      .eq("property_id", property.id)
      .maybeSingle()
      .then(({ data: row }) => setSaved(Boolean(row)));
  }, [user, property.id]);

  async function toggleSave() {
    if (!user) {
      toast.error("Please sign in to save homes to your collection");
      return;
    }
    if (saved) {
      await supabase.from("saved_homes").delete().eq("property_id", property.id);
      setSaved(false);
      toast.success("Removed from saved homes");
    } else {
      const { error } = await supabase
        .from("saved_homes")
        .insert({ property_id: property.id, user_id: user.id });
      if (error) {
        toast.error("Could not save this home");
        return;
      }
      setSaved(true);
      toast.success("Saved to your homes");
    }
  }

  async function handleTourSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please enter your name and email.");
      return;
    }
    setSubmittingInquiry(true);
    try {
      await submitInquiry({
        data: {
          property_id: property.id,
          name: form.name,
          email: form.email,
          phone: form.phone || "",
          preferred_date: form.preferred_date || undefined,
          message: form.message || `Interested in touring ${property.title}`,
        },
      });
      toast.success(
        `Tour request submitted to ${property.agent_name}! They will contact you shortly.`,
      );
      setForm({ name: "", email: "", phone: "", preferred_date: "", message: "" });
    } catch {
      toast.error("Could not send tour request. Please try again.");
    } finally {
      setSubmittingInquiry(false);
    }
  }

  function handleCopyShare() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const standardKeys = ["living", "kitchen", "bedroom", "hero"];
  const gallery =
    property.image_key && !standardKeys.includes(property.image_key)
      ? [property.image_key, ...standardKeys]
      : [
          property.image_key || "living",
          ...standardKeys.filter((k) => k !== (property.image_key || "living")),
        ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-body text-ink">
      <GlassBackdrop />
      <SiteHeader />

      <main className="relative z-20 mx-auto max-w-7xl px-8 pb-24">
        <div className="flex items-center justify-between">
          <Link
            href="/search"
            className="flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-ink transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to search
          </Link>

          <button
            onClick={handleCopyShare}
            className="flex items-center gap-1.5 rounded-xl border border-white/70 bg-white/60 px-3.5 py-1.5 text-xs font-semibold text-ink/70 hover:bg-white transition-colors"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-600" />
            ) : (
              <Share2 className="size-3.5" />
            )}
            {copied ? "Link Copied" : "Share Listing"}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_1fr]">
          {/* Main content column */}
          <div>
            <img
              src={imageFor(active)}
              alt={`${property.title} interior`}
              width={1088}
              height={720}
              className="aspect-[3/2] w-full rounded-[30px] border border-white/60 object-cover shadow-2xl shadow-sky-900/15"
            />
            <div className="mt-4 flex gap-3">
              {gallery.map((key) => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`overflow-hidden rounded-2xl border transition-opacity ${
                    active === key
                      ? "border-brand ring-2 ring-brand/30"
                      : "border-white/60 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View ${key} photo`}
                >
                  <img
                    src={imageFor(key)}
                    alt={`${property.title} ${key}`}
                    loading="lazy"
                    width={160}
                    height={120}
                    className="h-20 w-28 object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-white/60 bg-white/55 p-7 shadow-xl shadow-sky-900/5 backdrop-blur-2xl">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="font-display text-3xl font-bold tracking-tight">
                    {property.title}
                  </h1>
                  <p className="mt-1 text-sm text-ink/55">
                    {property.address}, {property.city}, {property.state} {property.zip}
                  </p>
                </div>
                <p className="font-display text-3xl font-bold text-ink">
                  {formatPrice(property.price)}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ["Beds", property.beds],
                  ["Baths", property.baths],
                  ["Sqft", property.sqft.toLocaleString()],
                ].map(([label, value]) => (
                  <div
                    key={label as string}
                    className="rounded-2xl bg-white/70 p-4 border border-white/80"
                  >
                    <p className="text-xs tracking-[0.15em] text-ink/45 uppercase">{label}</p>
                    <p className="mt-1 font-display text-2xl font-bold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-ink/10 pt-6">
                <h3 className="font-display text-lg font-bold text-ink">About this home</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                  {property.description}
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  onClick={toggleSave}
                  className="flex items-center gap-2 gradient-brand rounded-2xl px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/30 hover:opacity-95 transition-opacity"
                >
                  <Bookmark className={`size-4 ${saved ? "fill-white" : ""}`} />
                  {saved ? "Saved to Favorites" : "Save Home"}
                </button>
                <span className="rounded-2xl border border-white/60 bg-white/50 px-5 py-3 text-sm font-medium text-ink/60 backdrop-blur-xl">
                  {property.property_type} · {property.status}
                </span>
              </div>
            </div>

            {/* Zillow-like Interactive Mortgage Calculator */}
            <MortgageCalculator initialPrice={property.price} />
          </div>

          {/* Sidebar / Tour Booking Form */}
          <aside className="h-fit rounded-3xl border border-white/60 bg-white/55 p-7 shadow-xl shadow-sky-900/5 backdrop-blur-2xl lg:sticky lg:top-6">
            <p className="text-xs tracking-[0.15em] text-ink/45 uppercase">Listing Agent</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="gradient-brand grid size-12 place-items-center rounded-2xl font-display font-bold text-primary-foreground shadow-md shadow-sky-500/20">
                {property.agent_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div>
                <p className="text-base font-semibold">{property.agent_name}</p>
                <p className="text-xs text-ink/50">{property.agent_title}</p>
              </div>
            </div>

            <div className="mt-6 border-t border-ink/10 pt-5">
              <h3 className="font-display text-lg font-bold">Schedule a Tour</h3>
              <p className="mt-1 text-xs text-ink/60">
                Pick a preferred time and our certified agent will confirm your appointment.
              </p>
            </div>

            <form className="mt-4 space-y-3" onSubmit={handleTourSubmit}>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name *"
                aria-label="Your name"
                className="w-full rounded-2xl bg-white/70 px-4 py-3 text-sm outline-none placeholder:text-ink/40 border border-white/80 focus:border-brand"
              />
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email address *"
                aria-label="Your email"
                className="w-full rounded-2xl bg-white/70 px-4 py-3 text-sm outline-none placeholder:text-ink/40 border border-white/80 focus:border-brand"
              />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone number (optional)"
                aria-label="Phone number"
                className="w-full rounded-2xl bg-white/70 px-4 py-3 text-sm outline-none placeholder:text-ink/40 border border-white/80 focus:border-brand"
              />
              <div>
                <label className="block text-xs font-semibold text-ink/50 uppercase tracking-wider mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={form.preferred_date}
                  onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                  aria-label="Preferred date"
                  className="w-full rounded-2xl bg-white/70 px-4 py-2.5 text-sm outline-none text-ink/70 border border-white/80 focus:border-brand"
                />
              </div>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="I'd love to schedule a private walkthrough…"
                aria-label="Message"
                className="w-full resize-none rounded-2xl bg-white/70 px-4 py-3 text-sm outline-none placeholder:text-ink/40 border border-white/80 focus:border-brand"
              />
              <button
                type="submit"
                disabled={submittingInquiry}
                className="w-full rounded-2xl bg-ink px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-ink/20 hover:bg-ink/90 disabled:opacity-50 transition-opacity"
              >
                {submittingInquiry ? "Submitting Request..." : "Request a Tour"}
              </button>
            </form>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
