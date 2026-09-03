import { getProperty } from "@/actions/properties";
import { notFound } from "next/navigation";
import { PropertyClient } from "./property-client";
import { formatPrice, imageFor } from "@/lib/property-images";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty({ id });
  if (!property) {
    return {
      title: "Listing Not Found",
      description: "This property listing could not be found on AetherHomes.",
      robots: { index: false, follow: true },
    };
  }

  const imageUrl = imageFor(property.image_key);
  const formattedPrice = formatPrice(property.price);
  const pageTitle = `${property.title} — ${formattedPrice} | ${property.beds} Bed, ${property.baths} Bath in ${property.city}, ${property.state}`;
  const pageDescription = `${property.title} for sale in ${property.city}, ${property.state}. Offered at ${formattedPrice}. Features ${property.beds} bedrooms, ${property.baths} bathrooms, and ${property.sqft.toLocaleString()} sqft. ${property.description.slice(0, 120)}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `/property/${id}`,
    },
    openGraph: {
      title: `${property.title} — ${formattedPrice}`,
      description: pageDescription,
      url: `/property/${id}`,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 800,
          alt: `${property.title} in ${property.city}, ${property.state}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.title} — ${formattedPrice}`,
      description: pageDescription,
      images: [imageUrl],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = await getProperty({ id });

  if (!property) {
    notFound();
  }

  // Schema.org RealEstateListing & SingleFamilyResidence JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: property.title,
    description: property.description,
    image: imageFor(property.image_key),
    numberOfRooms: property.beds,
    numberOfBedrooms: property.beds,
    numberOfBathroomsTotal: property.baths,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.sqft,
      unitCode: "FTK",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.state,
      postalCode: property.zip,
      addressCountry: "US",
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: property.created_at,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyClient property={property} />
    </>
  );
}
