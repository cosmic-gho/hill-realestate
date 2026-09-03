import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In or Register",
  description:
    "Sign in to your AetherHomes account to manage saved homes, track your property inquiries, and schedule private showings.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
