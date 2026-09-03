"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Bookmark, Shield, LogOut, LogIn, Menu, X, User } from "lucide-react";

export function SiteHeader() {
  const { user, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleSignOut() {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
  }

  return (
    <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8">
      {/* Brand logo */}
      <Link href="/" className="flex items-center gap-2 font-display text-xl tracking-tight">
        <span className="gradient-brand grid size-9 place-items-center rounded-xl text-primary-foreground shadow-lg shadow-sky-500/30">
          A
        </span>
        <span className="font-bold text-ink">
          Aether<span className="text-brand">Homes</span>
        </span>
      </Link>

      {/* Desktop navigation */}
      <nav className="hidden items-center gap-8 text-sm font-medium text-ink/75 md:flex">
        <Link href="/search" className="transition-colors hover:text-ink font-semibold">
          Buy
        </Link>
        <Link
          href="/search?type=Condo"
          className="transition-colors hover:text-ink font-semibold"
        >
          Condos
        </Link>
        <Link
          href="/search?status=New"
          className="transition-colors hover:text-ink font-semibold"
        >
          New Listings
        </Link>
        <Link
          href="/saved"
          className="transition-colors hover:text-ink font-semibold flex items-center gap-1.5"
        >
          <Bookmark className="size-3.5 text-brand" /> Saved
        </Link>
        <Link
          href="/admin"
          className={`transition-colors hover:text-ink font-semibold flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${
            isAdmin
              ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-700"
              : "bg-sky-500/10 text-brand"
          }`}
        >
          <Shield className="size-3" /> Admin
        </Link>
      </nav>

      {/* Desktop action buttons */}
      <div className="hidden items-center gap-3 md:flex">
        {user ? (
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-2xl border border-white/70 bg-white/60 px-3 py-1.5 text-xs font-semibold text-ink/80 backdrop-blur-md">
              <User className="size-3 text-brand" />
              {user.email?.split("@")[0]}
              {isAdmin && (
                <span className="ml-1 rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                  ADMIN
                </span>
              )}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1 rounded-2xl px-3 py-2 text-xs font-semibold text-ink/70 hover:bg-white/60 transition-colors"
              title="Sign out"
            >
              <LogOut className="size-3.5" /> Sign out
            </button>
          </div>
        ) : (
          <Link
            href="/auth"
            className="flex items-center gap-1.5 rounded-2xl px-4 py-2 text-sm font-semibold text-ink/80 hover:bg-white/60 transition-colors"
          >
            <LogIn className="size-4" /> Sign in
          </Link>
        )}

        <Link
          href="/saved"
          className="flex items-center gap-1.5 rounded-2xl bg-ink px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-ink/20 hover:bg-ink/90 transition-colors"
        >
          <Bookmark className="size-3.5" /> Saved homes
        </Link>
      </div>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="grid size-10 place-items-center rounded-2xl border border-white/60 bg-white/60 text-ink md:hidden shadow-sm"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className="absolute left-6 right-6 top-20 z-40 rounded-3xl border border-white/80 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl md:hidden animate-in fade-in zoom-in-95 duration-150">
          <nav className="flex flex-col gap-3 font-semibold text-ink">
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-2xl p-3 hover:bg-ink/5"
            >
              Buy Homes
            </Link>
            <Link
              href="/search?type=Condo"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-2xl p-3 hover:bg-ink/5"
            >
              Condos
            </Link>
            <Link
              href="/saved"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-2xl p-3 hover:bg-ink/5"
            >
              <Bookmark className="size-4 text-brand" /> Saved Homes
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-2xl p-3 text-brand hover:bg-brand/10"
            >
              <Shield className="size-4" /> Admin Portal
            </Link>
          </nav>

          <div className="mt-4 border-t border-ink/10 pt-4 flex flex-col gap-2">
            {user ? (
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-2xl border border-ink/10 bg-white p-3 text-sm font-semibold text-rose-600"
              >
                <LogOut className="size-4" /> Sign Out ({user.email})
              </button>
            ) : (
              <Link
                href="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 gradient-brand rounded-2xl p-3 text-sm font-semibold text-white shadow-md shadow-sky-500/20"
              >
                <LogIn className="size-4" /> Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
