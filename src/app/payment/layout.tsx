import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Reservation Payment & Verification",
  description:
    "Complete your tour verification deposit to reserve your private home viewing slot with AetherHomes.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
