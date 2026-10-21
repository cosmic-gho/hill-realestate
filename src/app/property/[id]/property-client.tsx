"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { submitInquiry, type Property } from "@/actions/properties";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  formatPrice,
  imageFor,
  getPropertyImages,
  isExternalImage,
} from "@/lib/property-images";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import {
  Share2,
  Check,
  ArrowLeft,
  Heart,
  Images,
  Star,
  ShieldCheck,
  Key,
  MapPin,
  Sparkles,
  Wifi,
  Car,
  Utensils,
  Tv,
  Coffee,
  Calendar,
} from "lucide-react";

export function PropertyClient({ property }: { property: Property }) {
  const router = useRouter();
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const allImages = getPropertyImages(property.image_key);
  const [active, setActive] = useState(allImages[0] || "living");
  const [copied, setCopied] = useState(false);

  // Deterministic rating between 4.88 and 5.0
  const ratingHash = property.id
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rating = (4.85 + (ratingHash % 15) * 0.01).toFixed(2);
  const reviewCount = 42 + (ratingHash % 160);

  const isNightly =
    property.property_type === "Airbnb" ||
    property.status === "Airbnb" ||
    (property.price < 2000 && property.property_type !== "Rental");
  const isMonthly =
    property.status === "For rent" ||
    property.status === "Rental" ||
    property.property_type === "Rental";

  // Tour booking / reservation form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferred_date: "",
    guests: "2 guests",
    message: "",
  });
  const [submittingInquiry, setSubmittingInquiry] = useState(false);

  useEffect(() => {
    async function checkSaved() {
      if (!user) return;
      const { data } = await supabase
        .from("saved_homes")
        .select("id")
        .eq("user_id", user.id)
        .eq("property_id", property.id)
        .maybeSingle();
      if (data) setSaved(true);
    }
    checkSaved();
  }, [user, property.id]);

  async function toggleSave() {
    if (!user) {
      toast.error("Please sign in to save stays to your Wishlist");
      router.push("/auth");
      return;
    }

    if (saved) {
      await supabase
        .from("saved_homes")
        .delete()
        .eq("user_id", user.id)
        .eq("property_id", property.id);
      setSaved(false);
      toast.success("Removed from your Wishlist");
    } else {
      await supabase.from("saved_homes").insert({
        user_id: user.id,
        property_id: property.id,
      });
      setSaved(true);
      toast.success("Saved to your Wishlist!");
    }
  }

  async function handleReservationSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmittingInquiry(true);

    try {
      const inquiry = await submitInquiry({
        property_id: property.id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        preferred_date: form.preferred_date || undefined,
        message: form.message
          ? `${form.guests} · ${form.message}`
          : `Reservation request for ${form.guests}`,
      });

      toast.success("Reservation request created! Redirecting to verification...");
      router.push(`/payment?inquiryId=${inquiry.id}&propertyId=${property.id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit reservation";
      toast.error(msg);
      setSubmittingInquiry(false);
    }
  }

  function handleCopyShare() {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Listing link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const standardKeys = ["living", "kitchen", "bedroom", "hero"];
  const hasCustomImages = allImages.some(isExternalImage);
  const gallery = hasCustomImages ? allImages : standardKeys;

  return (
    <div className="min-h-screen w-full bg-white font-body text-[#222222]">
      <SiteHeader />

      <main className="mx-auto max-w-[1280px] px-4 pt-6 pb-24 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Action Row */}
        <div className="flex items-center justify-between pb-4">
          <Link
            href="/search"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#222222] hover:underline"
          >
            <ArrowLeft className="size-4" /> Back to all stays
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShare}
              className="flex items-center gap-1.5 rounded-full border border-[#DDDDDD] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors"
            >
              {copied ? <Check className="size-3.5 text-emerald-600" /> : <Share2 className="size-3.5" />}
              {copied ? "Link Copied" : "Share"}
            </button>

            <button
              onClick={toggleSave}
              className="flex items-center gap-1.5 rounded-full border border-[#DDDDDD] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors"
            >
              <Heart
                className={`size-3.5 ${
                  saved ? "fill-[#FF385C] stroke-[#FF385C]" : "text-[#222222]"
                }`}
              />
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* Listing Title & Location Header */}
        <div className="mt-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight">
            {property.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-[#222222]">
            <span className="flex items-center gap-1 font-semibold">
              <Star className="size-4 fill-[#222222] text-[#222222]" /> {rating}
            </span>
            <span>·</span>
            <span className="underline font-semibold cursor-pointer">{reviewCount} reviews</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="size-4" /> Superhost
            </span>
            <span>·</span>
            <span className="text-[#717171] underline cursor-pointer">
              {property.address}, {property.city}, {property.state} {property.zip}
            </span>
          </div>
        </div>

        {/* Main Photo Gallery Hero Container */}
        <div className="relative overflow-hidden rounded-3xl bg-[#EEEEEE] shadow-sm">
          <img
            src={imageFor(active)}
            alt={`${property.title} exterior and interior view`}
            className="aspect-[16/10] sm:aspect-[21/9] w-full object-cover transition-all duration-300"
          />

          <div className="absolute bottom-4 right-4 rounded-xl bg-black/70 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md flex items-center gap-1.5">
            <Images className="size-3.5" />
            {gallery.indexOf(active) + 1} / {gallery.length} photos
          </div>
        </div>

        {/* Photo Thumbnail Strip */}
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {gallery.map((key, idx) => (
            <button
              key={`${key}-${idx}`}
              onClick={() => setActive(key)}
              className={`shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                active === key
                  ? "border-[#222222] ring-2 ring-[#222222]/20 opacity-100"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`View photo ${idx + 1}`}
            >
              <img
                src={imageFor(key)}
                alt={`${property.title} thumbnail ${idx + 1}`}
                className="h-20 w-28 object-cover"
              />
            </button>
          ))}
        </div>

        {/* 2-Column Split: Details on Left, Reservation Card on Right */}
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr]">
          {/* Left Column: Host info, Highlights, Space description, Amenities */}
          <div>
            {/* Host overview row */}
            <div className="flex items-center justify-between border-b border-[#EBEBEB] pb-6">
              <div>
                <h2 className="text-xl font-bold text-[#222222]">
                  Entire {property.property_type.toLowerCase()} hosted by {property.agent_name}
                </h2>
                <p className="mt-1 text-sm text-[#717171]">
                  {property.beds} guests · {property.beds} bedrooms · {property.baths} baths · {property.sqft.toLocaleString()} sqft
                </p>
              </div>
              <div className="grid size-14 place-items-center rounded-full bg-[#FF385C] text-white font-bold text-lg shadow-sm">
                {property.agent_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>

            {/* Airbnb Highlights */}
            <div className="border-b border-[#EBEBEB] py-6 space-y-5">
              <div className="flex items-start gap-4">
                <Key className="size-6 text-[#222222] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[15px] text-[#222222]">Self check-in</h3>
                  <p className="text-sm text-[#717171]">Check yourself in with the smart lock keypad.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <ShieldCheck className="size-6 text-[#222222] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[15px] text-[#222222]">Experienced Superhost</h3>
                  <p className="text-sm text-[#717171]">
                    {property.agent_name} has 100% 5-star ratings from recent guests.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="size-6 text-[#222222] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[15px] text-[#222222]">Free cancellation</h3>
                  <p className="text-sm text-[#717171]">Cancel up to 48 hours before check-in for a full refund.</p>
                </div>
              </div>
            </div>

            {/* AirCover Guarantee */}
            <div className="border-b border-[#EBEBEB] py-6">
              <div className="flex items-center gap-1.5 text-lg font-extrabold text-[#222222]">
                <span className="text-[#FF385C]">air</span>cover
              </div>
              <p className="mt-2 text-sm text-[#717171] leading-relaxed">
                Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
              </p>
            </div>

            {/* About this space */}
            <div className="border-b border-[#EBEBEB] py-6">
              <h3 className="text-lg font-bold text-[#222222] mb-3">About this space</h3>
              <p className="text-[15px] leading-relaxed text-[#222222]/85">
                {property.description}
              </p>
            </div>

            {/* What this place offers (Amenities) */}
            <div className="border-b border-[#EBEBEB] py-6">
              <h3 className="text-lg font-bold text-[#222222] mb-4">What this place offers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#222222]">
                <div className="flex items-center gap-3">
                  <Wifi className="size-5 text-[#717171]" /> High-speed Wi-Fi (450 Mbps)
                </div>
                <div className="flex items-center gap-3">
                  <Utensils className="size-5 text-[#717171]" /> Chef's kitchen & dining
                </div>
                <div className="flex items-center gap-3">
                  <Car className="size-5 text-[#717171]" /> Free on-premise parking
                </div>
                <div className="flex items-center gap-3">
                  <Tv className="size-5 text-[#717171]" /> 65" 4K Smart TV with Netflix
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="size-5 text-[#717171]" /> Nespresso coffee maker
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="size-5 text-[#717171]" /> Dedicated workspace
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Airbnb Reservation Card */}
          <aside className="h-fit rounded-3xl border border-[#DDDDDD] bg-white p-7 shadow-[0_6px_16px_rgba(0,0,0,0.12)] lg:sticky lg:top-24">
            {/* Price Header */}
            <div className="flex items-baseline justify-between border-b border-[#EBEBEB] pb-5">
              <div>
                <span className="text-2xl font-bold text-[#222222]">
                  ${property.price.toLocaleString("en-US")}
                </span>
                {isNightly ? (
                  <span className="text-[#717171] text-sm font-normal"> / night</span>
                ) : isMonthly ? (
                  <span className="text-[#717171] text-sm font-normal"> / month</span>
                ) : (
                  <span className="text-[#717171] text-sm font-normal"> total</span>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-[#222222]">
                <Star className="size-3.5 fill-[#222222]" /> {rating} ·{" "}
                <span className="underline text-[#717171]">{reviewCount} reviews</span>
              </div>
            </div>

            {/* Reservation / Tour Booking Form */}
            <form onSubmit={handleReservationSubmit} className="mt-5 space-y-3">
              <div className="rounded-2xl border border-[#DDDDDD] overflow-hidden">
                <div className="p-3 border-b border-[#DDDDDD]">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#222222]">
                    Preferred Date
                  </label>
                  <input
                    required
                    type="date"
                    value={form.preferred_date}
                    onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                    className="w-full bg-transparent text-sm text-[#222222] outline-none mt-0.5"
                  />
                </div>

                <div className="p-3">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#222222]">
                    Guests
                  </label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="w-full bg-transparent text-sm text-[#222222] outline-none mt-0.5 cursor-pointer"
                  >
                    <option value="1 guest">1 guest</option>
                    <option value="2 guests">2 guests</option>
                    <option value="3 guests">3 guests</option>
                    <option value="4+ guests">4+ guests</option>
                  </select>
                </div>
              </div>

              <div>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name *"
                  className="w-full rounded-xl border border-[#DDDDDD] bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-[#717171] focus:border-[#222222]"
                />
              </div>

              <div>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email address *"
                  className="w-full rounded-xl border border-[#DDDDDD] bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-[#717171] focus:border-[#222222]"
                />
              </div>

              <div>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone number (optional)"
                  className="w-full rounded-xl border border-[#DDDDDD] bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-[#717171] focus:border-[#222222]"
                />
              </div>

              {/* Reserve Button (Airbnb Rausch Coral Gradient) */}
              <button
                type="submit"
                disabled={submittingInquiry}
                className="w-full rounded-xl gradient-brand py-3.5 text-[15px] font-bold text-white shadow-md hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
              >
                {submittingInquiry ? "Reserving stay..." : "Reserve stay"}
              </button>

              <p className="text-center text-xs text-[#717171] pt-1">
                You won't be charged yet
              </p>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-[#EBEBEB] space-y-2 text-sm text-[#717171]">
                <div className="flex justify-between">
                  <span className="underline">
                    ${property.price.toLocaleString()} x 5 nights
                  </span>
                  <span>${(property.price * (isNightly ? 5 : 1)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Cleaning fee</span>
                  <span>$150</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Airbnb service fee</span>
                  <span>$85</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#EBEBEB] text-base font-bold text-[#222222]">
                  <span>Total before taxes</span>
                  <span>
                    ${(
                      property.price * (isNightly ? 5 : 1) +
                      235
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </form>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
