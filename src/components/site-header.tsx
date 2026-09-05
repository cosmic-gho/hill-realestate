"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Shield,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
} from "lucide-react";

export function SiteHeader() {
  const { user, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white border-b border-gray-200 shadow-sm"
        : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-2 lg:px-6">
        {/* Left nav links (desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          {[
            { label: "Buy", href: "/search" },
            { label: "Rent", href: "/search?status=Rental" },
            { label: "Sell", href: "/search?status=For+sale" },
            { label: "Home Buying Plan", href: "/plan" },
            { label: "Home Loans", href: "/home-loans" },
            { label: "Find an Agent", href: "/search" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`px-3 py-2 text-sm font-semibold transition-colors rounded-lg hover:bg-black/5 ${scrolled ? "text-gray-800" : "text-white"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Center logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <span
            className={`text-2xl font-bold tracking-tight transition-colors ${scrolled ? "text-[#006AFF]" : "text-white"
              }`}
          >
            Aether<span className={scrolled ? "text-gray-900" : "text-white"}>Homes</span>
          </span>
        </Link>

        {/* Right nav links + sign in (desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          <Link
            href="/admin"
            className={`px-3 py-2 text-sm font-semibold transition-colors rounded-lg hover:bg-black/5 ${scrolled ? "text-gray-800" : "text-white"
              }`}
          >
            Manage Rentals
          </Link>
          <Link
            href="/search"
            className={`px-3 py-2 text-sm font-semibold transition-colors rounded-lg hover:bg-black/5 ${scrolled ? "text-gray-800" : "text-white"
              }`}
          >
            Advertise
          </Link>
          <Link
            href="/search"
            className={`px-3 py-2 text-sm font-semibold transition-colors rounded-lg hover:bg-black/5 ${scrolled ? "text-gray-800" : "text-white"
              }`}
          >
            Get help
          </Link>

          {user ? (
            <div className="flex items-center gap-1 ml-2">
              <span
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${scrolled
                  ? "bg-gray-100 text-gray-700"
                  : "bg-white/20 text-white backdrop-blur-sm"
                  }`}
              >
                <User className="size-3" />
                {user.email?.split("@")[0]}
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="ml-1 rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700"
                  >
                    ADMIN
                  </Link>
                )}
              </span>
              <button
                onClick={handleSignOut}
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${scrolled
                  ? "text-gray-600 hover:bg-gray-100"
                  : "text-white/80 hover:bg-white/20"
                  }`}
              >
                <LogOut className="size-3" /> Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="ml-2 rounded-full bg-[#006AFF] px-5 py-2 text-sm font-bold text-white shadow-md hover:bg-[#0052cc] transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`grid size-10 place-items-center rounded-full lg:hidden transition-colors ${scrolled
            ? "text-gray-800 hover:bg-gray-100"
            : "text-white hover:bg-white/20"
            }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full bg-white border-b border-gray-200 shadow-xl lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col p-4">
            {[
              { label: "Buy", href: "/search" },
              { label: "Rent", href: "/search?status=Rental" },
              { label: "Sell", href: "/search?status=For+sale" },
              { label: "Home Buying Plan", href: "/plan" },
              { label: "Home Loans", href: "/home-loans" },
              { label: "Find an Agent", href: "/search" },
              { label: "Manage Rentals", href: "/admin" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-gray-800 rounded-lg hover:bg-gray-50"
              >
                {item.label}
              </Link>
            ))}

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 flex items-center gap-2 px-4 py-3 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-lg"
              >
                <Shield className="size-4" /> Admin Portal
              </Link>
            )}

            <div className="mt-3 pt-3 border-t border-gray-100">
              {user ? (
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700"
                >
                  <LogOut className="size-4" /> Sign Out
                </button>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#006AFF] px-4 py-3 text-sm font-bold text-white"
                >
                  Sign in
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
