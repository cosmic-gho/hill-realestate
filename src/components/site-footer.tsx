import Link from "next/link";

const footerLinks = {
  "Real Estate": [
    { label: "Browse Homes", href: "/search" },
    { label: "Featured Listings", href: "/search?featured=true" },
    { label: "New Construction", href: "/search?status=New" },
    { label: "Open Houses", href: "/search" },
    { label: "Recently Sold", href: "/search?status=Sold" },
  ],
  Rentals: [
    { label: "Apartments for Rent", href: "/search?type=Condo&status=Rental" },
    { label: "Houses for Rent", href: "/search?type=House&status=Rental" },
    { label: "All Rental Listings", href: "/search?status=Rental" },
    { label: "Manage Rentals", href: "/admin" },
  ],
  Resources: [
    { label: "Home Loans Hub", href: "/home-loans" },
    { label: "Home Buying Plan", href: "/plan" },
    { label: "BuyAbility™ Calculator", href: "/plan#buyability-calc" },
    { label: "Mortgage Calculator", href: "/home-loans#loan-comparison" },
  ],
  About: [
    { label: "About AetherHomes", href: "/" },
    { label: "Careers", href: "/" },
    { label: "Contact Us", href: "/" },
    { label: "Privacy Policy", href: "/" },
    { label: "Terms of Use", href: "/" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer content */}
      <div className="mx-auto max-w-[1280px] px-4 py-16 lg:px-6">
        {/* Logo */}
        <div className="mb-10">
          <Link href="/" className="text-2xl font-bold text-white">
            Aether<span className="text-[#3b82f6]">Homes</span>
          </Link>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social icons row */}
        <div className="mt-12 flex items-center gap-4">
          {["Facebook", "Instagram", "Twitter", "Pinterest"].map((social) => (
            <a
              key={social}
              href="#"
              className="grid size-10 place-items-center rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors text-xs font-bold"
              aria-label={social}
            >
              {social[0]}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-[1280px] flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-6 lg:px-6">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AetherHomes Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="/" className="hover:text-gray-300">
              Privacy
            </Link>
            <Link href="/" className="hover:text-gray-300">
              Terms
            </Link>
            <Link href="/" className="hover:text-gray-300">
              Cookie Preference
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
