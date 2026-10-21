import Link from "next/link";
import { Globe } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#F7F7F7] border-t border-[#DDDDDD] text-[#222222] mt-16">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        {/* Main 3-Column Footer Grid */}
        <div className="grid grid-cols-1 gap-8 border-b border-[#DDDDDD] pb-12 sm:grid-cols-3">
          {/* Support */}
          <div>
            <h3 className="text-sm font-bold text-[#222222] mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-[#717171]">
              <li>
                <Link href="/search" className="hover:text-[#222222] hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#222222] hover:underline">
                  AirCover & Guest Protection
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#222222] hover:underline">
                  Anti-discrimination
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#222222] hover:underline">
                  Disability support
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#222222] hover:underline">
                  Cancellation options
                </Link>
              </li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="text-sm font-bold text-[#222222] mb-4">Hosting</h3>
            <ul className="space-y-3 text-sm text-[#717171]">
              <li>
                <Link href="/admin" className="hover:text-[#222222] hover:underline">
                  Airbnb your home
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#222222] hover:underline">
                  AirCover for Hosts
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#222222] hover:underline">
                  Hosting resources
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#222222] hover:underline">
                  Community forum
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#222222] hover:underline">
                  Hosting responsibly
                </Link>
              </li>
            </ul>
          </div>

          {/* Airbnb / Company */}
          <div>
            <h3 className="text-sm font-bold text-[#222222] mb-4">Airbnb</h3>
            <ul className="space-y-3 text-sm text-[#717171]">
              <li>
                <Link href="/" className="hover:text-[#222222] hover:underline">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="/search?type=Airbnb" className="hover:text-[#222222] hover:underline">
                  New features
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#222222] hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#222222] hover:underline">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#222222] hover:underline">
                  Gift cards
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Settings */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-sm text-[#717171]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© {new Date().getFullYear()} Airbnb, Inc.</span>
            <span>·</span>
            <Link href="/" className="hover:underline">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/" className="hover:underline">
              Terms
            </Link>
            <span>·</span>
            <Link href="/sitemap.xml" className="hover:underline">
              Sitemap
            </Link>
            <span>·</span>
            <Link href="/" className="hover:underline">
              Company details
            </Link>
          </div>

          <div className="flex items-center gap-6 font-semibold text-[#222222]">
            <button
              type="button"
              className="flex items-center gap-2 hover:underline"
              aria-label="Change language"
            >
              <Globe className="size-4" /> English (US)
            </button>
            <button
              type="button"
              className="hover:underline"
              aria-label="Change currency"
            >
              $ USD
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
