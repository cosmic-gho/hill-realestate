import type { Metadata } from "next";
import "@/styles.css";
import { Toaster } from "sonner";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AetherHomes: Real Estate, Apartments, Mortgages & Home Values",
    template: "%s | AetherHomes",
  },
  description:
    "The leading real estate marketplace. Search millions of for-sale and rental listings, compare home values and connect with local professionals.",
  keywords: [
    "real estate",
    "homes for sale",
    "apartments for rent",
    "real estate listings",
    "home values",
    "mortgage",
    "buy a house",
    "sell your home",
    "find an agent",
    "AetherHomes",
  ],
  authors: [{ name: "AetherHomes" }],
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
    title: "AetherHomes: Real Estate, Apartments, Mortgages & Home Values",
    description:
      "The leading real estate marketplace. Search millions of for-sale and rental listings, compare home values and connect with local professionals.",
    url: "/",
    siteName: "AetherHomes",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/hero-zillow.png",
        width: 1200,
        height: 630,
        alt: "AetherHomes Real Estate Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AetherHomes: Real Estate, Apartments, Mortgages & Home Values",
    description:
      "Search for-sale and rental listings, compare home values, and connect with local real estate professionals.",
    images: ["/assets/hero-zillow.png"],
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white font-body text-ink antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
