import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Saved Homes",
  description:
    "View, compare, and organize your favorite saved real estate properties and listings on AetherHomes.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SavedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
