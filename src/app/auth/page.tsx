"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Lock, Mail, UserCheck, Shield } from "lucide-react";

export default function AuthPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return (
      <div className="min-h-screen w-full bg-white font-body text-[#222222]">
        <SiteHeader />
        <main className="mx-auto max-w-md px-6 py-20 text-center">
          <div className="rounded-3xl border border-[#DDDDDD] bg-white p-8 shadow-xl">
            <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-[#FFF0F2] text-[#FF385C]">
              <UserCheck className="size-7" />
            </div>
            <h1 className="text-2xl font-bold text-[#222222]">You are signed in</h1>
            <p className="mt-2 text-sm text-[#717171]">{user.email}</p>
            <div className="mt-6 flex flex-col gap-2.5">
              <button
                onClick={() => router.push("/saved")}
                className="gradient-brand rounded-xl py-3 text-sm font-bold text-white shadow-md hover:opacity-95"
              >
                View Wishlists
              </button>
              <button
                onClick={() => router.push("/admin")}
                className="rounded-xl border border-[#DDDDDD] bg-white py-2.5 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7]"
              >
                Go to Admin Portal
              </button>
              <button
                onClick={() => supabase.auth.signOut()}
                className="text-xs font-semibold text-[#717171] hover:text-rose-600 pt-2 transition-colors"
              >
                Sign out of this account
              </button>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Welcome back to Airbnb!");
        router.push("/");
      } else {
        const isAdminEmail = email.toLowerCase().includes("admin");
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: isAdminEmail ? "admin" : "user",
              is_admin: isAdminEmail,
            },
          },
        });
        if (error) throw error;
        toast.success("Account created successfully! Welcome to Airbnb.");
        router.push("/");
      }
    } catch (err: unknown) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Authentication failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-white font-body text-[#222222]">
      <SiteHeader />

      <main className="mx-auto max-w-[520px] px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-[#DDDDDD] bg-white p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:p-10">
          {/* Header */}
          <div className="text-center">
            <svg
              viewBox="0 0 32 32"
              className="mx-auto h-10 w-10 fill-[#FF385C] mb-3"
              aria-hidden="true"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.34-3.35 7.806-7.75 7.806-2.618 0-4.839-1.282-6.195-3.238l-.555-.838-.555.838C12.589 30.718 10.368 32 7.75 32 3.35 32 0 28.534 0 24.194c0-.987.242-1.892.909-3.483l.207-.481c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C10.037 2.037 11.992 1 16 1zm0 2c-1.239 0-2.344.664-3.447 2.656l-.544 1.047C10.05 10.536 5.9 19.227 4.92 21.514l-.19.44C4.15 23.36 4 23.957 4 24.194 4 26.332 5.688 28 7.75 28c1.688 0 3.2-1.096 4.14-2.82l.485-.92 1.488 2.247c1.077 1.624 2.872 2.64 4.887 2.64 2.062 0 3.75-1.668 3.75-3.806 0-.294-.17-.962-.777-2.399l-.168-.415c-.98-2.287-5.13-10.978-7.089-14.811l-.544-1.047C16.827 3.718 16.544 3 16 3zm0 15c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zm0 2c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z" />
            </svg>
            <h1 className="text-2xl font-extrabold text-[#222222]">
              {mode === "signin" ? "Welcome back to Airbnb" : "Create an Airbnb account"}
            </h1>
            <p className="mt-1.5 text-sm text-[#717171]">
              {mode === "signin"
                ? "Sign in to manage your bookings, wishlists, and host properties"
                : "Sign up to start booking unique stays and experiences worldwide"}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="mt-6 flex rounded-xl bg-[#F7F7F7] p-1 border border-[#EBEBEB]">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all ${
                mode === "signin" ? "bg-white text-[#222222] shadow-sm" : "text-[#717171] hover:text-[#222222]"
              }`}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all ${
                mode === "signup" ? "bg-white text-[#222222] shadow-sm" : "text-[#717171] hover:text-[#222222]"
              }`}
            >
              Sign up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#222222] mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-[#DDDDDD] bg-white px-3.5 py-3 focus-within:border-[#222222]">
                <Mail className="size-4 text-[#717171]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-transparent text-sm text-[#222222] outline-none placeholder:text-[#717171]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#222222] mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-[#DDDDDD] bg-white px-3.5 py-3 focus-within:border-[#222222]">
                <Lock className="size-4 text-[#717171]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  minLength={6}
                  className="w-full bg-transparent text-sm text-[#222222] outline-none placeholder:text-[#717171]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full gradient-brand rounded-xl py-3.5 text-[15px] font-bold text-white shadow-md hover:opacity-95 active:scale-[0.99] disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? "Please wait..." : mode === "signin" ? "Log in" : "Agree and continue"}
            </button>
          </form>

          <p className="mt-4 text-center text-[11px] text-[#717171] leading-relaxed">
            By continuing, you agree to Airbnb's Terms of Service and acknowledge the Privacy Policy.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
