import type { Metadata } from "next";
import "@/styles.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "AetherHomes — Homes for sale in the Pacific Northwest",
  description:
    "Search, save, and tour verified homes across Portland, Seattle, and the Pacific Northwest with live MLS listings.",
  openGraph: {
    title: "AetherHomes — Find the home that moves with you",
    description: "Browse verified listings, filter by price and beds, and save the homes you love.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
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
