"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Shield,
  LogOut,
  Menu,
  X,
  User,
  Globe,
  Heart,
  CreditCard,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export function SiteHeader() {
  const { user, isAdmin } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    toast.success("Signed out successfully");
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#EBEBEB] transition-shadow duration-200">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Airbnb Bélo Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Airbnb homepage">
          <svg
            viewBox="0 0 32 32"
            className="h-8 w-8 fill-[#FF385C] transition-transform group-hover:scale-105"
            aria-hidden="true"
          >
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.34-3.35 7.806-7.75 7.806-2.618 0-4.839-1.282-6.195-3.238l-.555-.838-.555.838C12.589 30.718 10.368 32 7.75 32 3.35 32 0 28.534 0 24.194c0-.987.242-1.892.909-3.483l.207-.481c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C10.037 2.037 11.992 1 16 1zm0 2c-1.239 0-2.344.664-3.447 2.656l-.544 1.047C10.05 10.536 5.9 19.227 4.92 21.514l-.19.44C4.15 23.36 4 23.957 4 24.194 4 26.332 5.688 28 7.75 28c1.688 0 3.2-1.096 4.14-2.82l.485-.92 1.488 2.247c1.077 1.624 2.872 2.64 4.887 2.64 2.062 0 3.75-1.668 3.75-3.806 0-.294-.17-.962-.777-2.399l-.168-.415c-.98-2.287-5.13-10.978-7.089-14.811l-.544-1.047C16.827 3.718 16.544 3 16 3zm0 15c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zm0 2c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z" />
          </svg>
          <span className="text-[20px] font-extrabold tracking-tight text-[#FF385C]">
            airbnb
          </span>
        </Link>

        {/* Center: Airbnb Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="/"
            className="px-4 py-2 text-[15px] font-semibold text-[#222222] rounded-full hover:bg-[#F7F7F7] transition-colors relative"
          >
            Stays
            <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#222222] rounded-full" />
          </Link>
          <Link
            href="/search?type=Airbnb"
            className="px-4 py-2 text-[15px] font-semibold text-[#717171] hover:text-[#222222] rounded-full hover:bg-[#F7F7F7] transition-colors"
          >
            Experiences
          </Link>
          <Link
            href="/search?status=For+rent"
            className="px-4 py-2 text-[15px] font-semibold text-[#717171] hover:text-[#222222] rounded-full hover:bg-[#F7F7F7] transition-colors"
          >
            Services & Rentals
          </Link>
          <Link
            href="/search"
            className="px-4 py-2 text-[15px] font-semibold text-[#717171] hover:text-[#222222] rounded-full hover:bg-[#F7F7F7] transition-colors"
          >
            All Homes
          </Link>
        </nav>

        {/* Right: Host button + Globe + User Pill Menu */}
        <div className="flex items-center gap-2">
          {/* Host CTA */}
          <Link
            href={isAdmin ? "/admin" : "/search?status=Airbnb"}
            className="hidden sm:inline-flex px-3.5 py-2.5 text-sm font-semibold text-[#222222] rounded-full hover:bg-[#F7F7F7] transition-colors"
          >
            Airbnb your home
          </Link>

          {/* Language / Currency Globe */}
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-[#222222] hover:bg-[#F7F7F7] transition-colors"
            aria-label="Language and currency"
          >
            <Globe className="size-4 text-[#222222]" />
          </button>

          {/* User Menu Pill Container */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 rounded-full border border-[#DDDDDD] bg-white p-1.5 pl-3.5 shadow-sm hover:shadow-md transition-all"
              aria-label="User navigation menu"
            >
              <Menu className="size-4 text-[#222222]" />
              <div className="grid size-8 place-items-center rounded-full bg-[#717171] text-white font-semibold text-xs overflow-hidden">
                {user?.email ? (
                  user.email.charAt(0).toUpperCase()
                ) : (
                  <User className="size-4 fill-white" />
                )}
              </div>
            </button>

            {/* Airbnb Style Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-[#EBEBEB] bg-white py-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                {user ? (
                  <>
                    <div className="px-4 py-2.5 border-b border-[#EBEBEB]">
                      <p className="text-xs font-semibold text-[#717171]">Signed in as</p>
                      <p className="text-sm font-bold text-[#222222] truncate">
                        {user.email}
                      </p>
                      {isAdmin && (
                        <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                          <Shield className="size-3" /> HOST / ADMIN
                        </span>
                      )}
                    </div>

                    <Link
                      href="/saved"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                    >
                      <Heart className="size-4 text-[#717171]" /> Wishlists
                    </Link>

                    <Link
                      href="/payment"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                    >
                      <CreditCard className="size-4 text-[#717171]" /> Trips & Payments
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#FF385C] hover:bg-[#FFF0F2] transition-colors"
                      >
                        <Shield className="size-4 text-[#FF385C]" /> Manage Listings (Admin)
                      </Link>
                    )}

                    <div className="my-1 border-t border-[#EBEBEB]" />

                    <Link
                      href="/search"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                    >
                      <HelpCircle className="size-4 text-[#717171]" /> Help Center
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="size-4 text-rose-500" /> Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-sm font-bold text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                    >
                      Sign up
                    </Link>
                    <Link
                      href="/auth"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-sm font-medium text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                    >
                      Log in
                    </Link>

                    <div className="my-1 border-t border-[#EBEBEB]" />

                    <Link
                      href="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-sm font-medium text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                    >
                      Airbnb your home
                    </Link>
                    <Link
                      href="/search"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-sm font-medium text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                    >
                      Help Center
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid size-10 place-items-center rounded-full md:hidden text-[#222222] hover:bg-[#F7F7F7] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#EBEBEB] bg-white p-4 md:hidden animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-bold text-[#222222] rounded-xl hover:bg-[#F7F7F7]"
            >
              Stays
            </Link>
            <Link
              href="/search?type=Airbnb"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-semibold text-[#717171] rounded-xl hover:bg-[#F7F7F7]"
            >
              Experiences
            </Link>
            <Link
              href="/search?status=For+rent"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-semibold text-[#717171] rounded-xl hover:bg-[#F7F7F7]"
            >
              Services & Rentals
            </Link>
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-semibold text-[#717171] rounded-xl hover:bg-[#F7F7F7]"
            >
              All Homes
            </Link>
            <Link
              href="/saved"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-semibold text-[#717171] rounded-xl hover:bg-[#F7F7F7]"
            >
              Wishlists
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center gap-2 px-4 py-3 text-sm font-bold text-[#FF385C] bg-[#FFF0F2] rounded-xl"
              >
                <Shield className="size-4" /> Host / Admin Portal
              </Link>
            )}

            <div className="pt-3 mt-2 border-t border-[#EBEBEB]">
              {user ? (
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#DDDDDD] bg-white py-3 text-sm font-bold text-[#222222]"
                >
                  <LogOut className="size-4 text-rose-500" /> Log out
                </button>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl gradient-brand py-3 text-sm font-bold text-white shadow-md"
                >
                  Sign in or Register
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
