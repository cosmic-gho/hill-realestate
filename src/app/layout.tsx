import type { Metadata } from "next";
import "@/styles.css";
import { Toaster } from "sonner";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AetherHomes — Homes for Sale & Rent in the Pacific Northwest",
    template: "%s | AetherHomes",
  },
  description:
    "Explore verified MLS real estate listings across Portland, Seattle, and the Pacific Northwest. Schedule private home tours, view floor plans, and find your dream home with AetherHomes.",
  keywords: [
    "real estate",
    "homes for sale",
    "Portland real estate",
    "Seattle homes for sale",
    "Pacific Northwest homes",
    "MLS listings",
    "buy a house",
    "luxury condominiums",
    "property tour",
    "AetherHomes",
  ],
  authors: [{ name: "AetherHomes Realty" }],
  creator: "AetherHomes",
  publisher: "AetherHomes",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AetherHomes — Find the Home That Moves With You",
    description:
      "Search, save, and tour verified homes across Portland, Seattle, and the Pacific Northwest with live MLS listings.",
    url: "/",
    siteName: "AetherHomes",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/hero-home.jpg",
        width: 1200,
        height: 630,
        alt: "AetherHomes Modern Pacific Northwest Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AetherHomes — Verified Homes for Sale & Rent",
    description:
      "Explore luxury homes, condos, and townhouses with live MLS listings in Portland & Seattle.",
    images: ["/assets/hero-home.jpg"],
    creator: "@aetherhomes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "real estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-body text-ink antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
