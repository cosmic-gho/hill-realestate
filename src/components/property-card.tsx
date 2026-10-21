"use client";

import Link from "next/link";
import { useState } from "react";
import type { Property } from "@/actions/properties";
import { formatPrice, imageFor, getPropertyImages } from "@/lib/property-images";
import { Heart, Images, Star } from "lucide-react";
import { toast } from "sonner";

export function PropertyCard({ property }: { property: Property }) {
  const [saved, setSaved] = useState(false);
  const imageList = getPropertyImages(property.image_key);

  // Deterministic rating between 4.88 and 5.0 based on property ID
  const ratingHash = property.id
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rating = (4.85 + (ratingHash % 15) * 0.01).toFixed(2);
  const reviewCount = 42 + (ratingHash % 160);

  const isFavorite = property.featured || property.price > 500000;
  const isNightly =
    property.property_type === "Airbnb" ||
    property.status === "Airbnb" ||
    (property.price < 2000 && property.property_type !== "Rental");
  const isMonthly =
    property.status === "For rent" ||
    property.status === "Rental" ||
    property.property_type === "Rental";

  const handleToggleHeart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
    toast.success(
      !saved ? "Saved to your Wishlist!" : "Removed from your Wishlist",
    );
  };

  return (
    <Link
      href={`/property/${property.id}`}
      className="group block cursor-pointer transition-all duration-200"
    >
      {/* Aspect Ratio 20/19 Image Container */}
      <div className="relative aspect-[20/19] w-full overflow-hidden rounded-2xl bg-[#EEEEEE] mb-3">
        <img
          src={imageFor(property.image_key)}
          alt={`${property.title} in ${property.city}, ${property.state}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Guest favorite / Rare find Badge */}
        {isFavorite ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-bold text-[#222222] shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
            Guest favorite
          </span>
        ) : property.status === "New" ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-bold text-[#222222] shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
            New
          </span>
        ) : null}

        {/* Wishlist Heart Icon Button */}
        <button
          type="button"
          onClick={handleToggleHeart}
          className="absolute right-3 top-3 grid size-8 place-items-center transition-transform hover:scale-115 active:scale-90"
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart
            className={`size-6 transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] ${
              saved
                ? "fill-[#FF385C] stroke-[#FF385C]"
                : "fill-black/30 stroke-white stroke-2"
            }`}
          />
        </button>

        {/* Multi-photo count badge */}
        {imageList.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-xs flex items-center gap-1 shadow-sm">
            <Images className="size-3" />
            {imageList.length}
          </span>
        )}
      </div>

      {/* Property Information */}
      <div className="flex flex-col text-[#222222]">
        {/* Row 1: Title/Location + Star Rating */}
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-semibold text-[15px] text-[#222222] truncate">
            {property.city}, {property.state}
          </h3>
          <div className="flex items-center gap-1 shrink-0 text-[14px] font-medium text-[#222222]">
            <Star className="size-3.5 fill-[#222222] text-[#222222]" />
            <span>{rating}</span>
            <span className="text-[#717171] text-[13px]">({reviewCount})</span>
          </div>
        </div>

        {/* Row 2: Subtitle / View / Type */}
        <p className="text-[14px] text-[#717171] truncate mt-0.5">
          {property.title}
        </p>

        {/* Row 3: Specs / Beds & Baths */}
        <p className="text-[14px] text-[#717171] mt-0.5">
          {property.beds} bed{property.beds === 1 ? "" : "s"} · {property.baths} bath{property.baths === 1 ? "" : "s"} · {property.sqft.toLocaleString()} sqft
        </p>

        {/* Row 4: Airbnb Price format */}
        <p className="text-[15px] mt-1.5 text-[#222222]">
          <strong className="font-bold">
            ${property.price.toLocaleString("en-US")}
          </strong>
          {isNightly ? (
            <span className="font-normal text-[#717171]"> / night</span>
          ) : isMonthly ? (
            <span className="font-normal text-[#717171]"> / month</span>
          ) : (
            <span className="font-normal text-[#717171]"> total</span>
          )}
        </p>
      </div>
    </Link>
  );
}
