import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal — Management Console",
  description: "AetherHomes Real Estate Administration & Broker Dispatch System.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
