import Link from "next/link";
import { GlassBackdrop } from "@/components/glass-backdrop";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden font-body text-ink">
      <GlassBackdrop />
      <SiteHeader />

      <main className="relative z-20 mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-20 text-center">
        <div className="rounded-3xl border border-white/60 bg-white/60 p-10 shadow-2xl shadow-sky-900/10 backdrop-blur-2xl">
          <span className="font-display text-7xl font-bold text-brand">404</span>
          <h1 className="mt-4 font-display text-2xl font-bold">Page Not Found</h1>
          <p className="mt-2 text-sm text-ink/65">
            The page you are looking for doesn't exist or may have been moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="gradient-brand rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:opacity-95"
            >
              Back to Home
            </Link>
            <Link
              href="/search"
              className="rounded-2xl border border-white/80 bg-white/70 px-5 py-3 text-sm font-semibold text-ink hover:bg-white"
            >
              Browse Homes
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
