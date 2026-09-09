"use client";

import Link from "next/link";
import type { Property } from "@/actions/properties";
import { formatPrice, imageFor, getPropertyImages } from "@/lib/property-images";
import { Heart, Images } from "lucide-react";

export function PropertyCard({ property }: { property: Property }) {
  const isNew = property.status !== "For sale";
  const imageList = getPropertyImages(property.image_key);

  return (
    <Link
      href={`/property/${property.id}`}
      className="group block overflow-hidden rounded-xl bg-white border border-gray-200 zillow-shadow hover:zillow-shadow-lg transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={imageFor(property.image_key)}
          alt={`${property.title} in ${property.city}, ${property.state}`}
          loading="lazy"
          width={800}
          height={600}
          className="aspect-[4/3] w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Status badge */}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
            isNew
              ? "bg-[#006AFF] text-white"
              : "bg-white text-gray-800 shadow-sm"
          }`}
        >
          {property.status}
        </span>
        {/* Save heart */}
        <button
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/90 text-gray-500 shadow-sm hover:text-red-500 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          aria-label="Save property"
        >
          <Heart className="size-4" />
        </button>

        {/* Photos count badge */}
        {imageList.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md flex items-center gap-1 shadow-sm">
            <Images className="size-3" />
            {imageList.length}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-4">
        {/* Price */}
        <p className="text-xl font-bold text-gray-900">
          {formatPrice(property.price)}
        </p>

        {/* Specs */}
        <p className="mt-1 text-sm text-gray-600">
          <span className="font-semibold">{property.beds}</span> bd
          <span className="mx-1 text-gray-300">|</span>
          <span className="font-semibold">{property.baths}</span> ba
          <span className="mx-1 text-gray-300">|</span>
          <span className="font-semibold">{property.sqft.toLocaleString()}</span> sqft
          <span className="mx-1 text-gray-300">|</span>
          <span className="text-gray-500">House for Sale</span>
        </p>

        {/* Address */}
        <p className="mt-1.5 text-sm text-gray-500 truncate">
          {property.address}, {property.city}, {property.state}
        </p>

        {/* Agent */}
        <p className="mt-2 text-xs text-gray-400 uppercase tracking-wide">
          {property.agent_name}
        </p>
      </div>
    </Link>
  );
}
