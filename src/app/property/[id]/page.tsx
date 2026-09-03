import { getProperty } from "@/actions/properties";
import { notFound } from "next/navigation";
import { PropertyClient } from "./property-client";
import { formatPrice } from "@/lib/property-images";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty({ id });
  if (!property) {
    return { title: "Listing Not Found — AetherHomes" };
  }

  return {
    title: `${property.title} — ${formatPrice(property.price)} in ${property.city}`,
    description: property.description.slice(0, 155),
    openGraph: {
      title: `${property.title} — ${formatPrice(property.price)}`,
      description: property.description.slice(0, 155),
      type: "article",
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = await getProperty({ id });

  if (!property) {
    notFound();
  }

  return <PropertyClient property={property} />;
}
