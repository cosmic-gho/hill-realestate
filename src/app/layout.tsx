import type { Metadata } from "next";
import "@/styles.css";
import { Toaster } from "sonner";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Airbnb | Vacation Rentals, Cabins, Beach Houses & Unique Homes",
    template: "%s | Airbnb",
  },
  description:
    "Find vacation rentals, cabins, beach houses, unique homes and experiences around the world — all made possible by hosts on Airbnb.",
  keywords: [
    "airbnb",
    "vacation rentals",
    "cabins",
    "beach houses",
    "condos",
    "stays",
    "unique homes",
    "experiences",
    "villas",
  ],
  authors: [{ name: "Airbnb" }],
  creator: "Airbnb",
  publisher: "Airbnb",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Airbnb | Vacation Rentals, Cabins, Beach Houses & Unique Homes",
    description:
      "Find vacation rentals, cabins, beach houses, unique homes and experiences around the world.",
    url: "/",
    siteName: "Airbnb",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/hero-home.jpg",
        width: 1200,
        height: 630,
        alt: "Airbnb Vacation Rentals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Airbnb | Vacation Rentals, Cabins, Beach Houses & Unique Homes",
    description:
      "Find vacation rentals, cabins, beach houses, unique homes and experiences around the world.",
    images: ["/assets/hero-home.jpg"],
    creator: "@airbnb",
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
  category: "travel & lodging",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white font-body text-[#222222] antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
