"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { GlassBackdrop } from "@/components/glass-backdrop";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Lock, Mail, UserCheck, ArrowRight, Shield } from "lucide-react";

export default function AuthPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden font-body text-ink">
        <GlassBackdrop />
        <SiteHeader />
        <main className="relative z-20 mx-auto max-w-md px-6 py-20 text-center">
          <div className="rounded-3xl border border-white/60 bg-white/60 p-8 shadow-2xl shadow-sky-900/10 backdrop-blur-2xl">
            <div className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-brand/10 text-brand">
              <UserCheck className="size-6" />
            </div>
            <h1 className="font-display text-2xl font-bold">You are already signed in</h1>
            <p className="mt-2 text-sm text-ink/60">{user.email}</p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => router.push("/saved")}
                className="gradient-brand rounded-2xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/25 hover:opacity-95"
              >
                View Saved Homes
              </button>
              <button
                onClick={() => router.push("/admin")}
                className="rounded-2xl border border-white/80 bg-white/70 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-white"
              >
                Go to Admin Panel
              </button>
              <button
                onClick={() => supabase.auth.signOut()}
                className="text-xs font-semibold text-ink/50 hover:text-ink pt-2"
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
        toast.success("Welcome back!");
        router.push("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Account created successfully! You are now signed in.");
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

  function fillDemoUser(role: "admin" | "buyer") {
    if (role === "admin") {
      setEmail("admin@aetherhomes.com");
      setPassword("Admin@123456");
    } else {
      setEmail("buyer@example.com");
      setPassword("Buyer@123456");
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-body text-ink">
      <GlassBackdrop />
      <SiteHeader />

      <main className="relative z-20 mx-auto max-w-lg px-6 py-12">
        <div className="rounded-3xl border border-white/60 bg-white/55 p-8 shadow-2xl shadow-sky-900/10 backdrop-blur-2xl sm:p-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3.5 py-1 text-xs font-semibold tracking-wider text-brand uppercase backdrop-blur-xl">
              <Shield className="size-3.5" /> Secure Access
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm text-ink/60">
              {mode === "signin"
                ? "Sign in to view saved homes and tour appointments"
                : "Sign up to unlock favorite tracking, alerts, and agent tours"}
            </p>
          </div>

          <div className="mt-6 flex rounded-2xl bg-white/60 p-1 backdrop-blur-xl border border-white/60">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-all ${
                mode === "signin" ? "bg-white text-ink shadow-sm" : "text-ink/60 hover:text-ink"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-all ${
                mode === "signup" ? "bg-white text-ink shadow-sm" : "text-ink/60 hover:text-ink"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider text-ink/70 uppercase mb-1.5">
                Email Address
              </label>
              <div className="flex items-center gap-3 rounded-2xl bg-white/75 px-4 py-3 border border-white/80 focus-within:border-brand">
                <Mail className="size-4 text-ink/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40 text-ink"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider text-ink/70 uppercase mb-1.5">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-2xl bg-white/75 px-4 py-3 border border-white/80 focus-within:border-brand">
                <Lock className="size-4 text-ink/40" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  minLength={6}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40 text-ink"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 gradient-brand rounded-2xl py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/30 hover:opacity-95 disabled:opacity-50 transition-opacity"
            >
              {loading ? (
                "Processing..."
              ) : mode === "signin" ? (
                <>
                  Sign In <ArrowRight className="size-4" />
                </>
              ) : (
                <>
                  Create Free Account <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo helper */}
          <div className="mt-8 border-t border-ink/10 pt-6">
            <p className="text-center text-xs font-semibold text-ink/50 uppercase tracking-wider mb-3">
              Quick Test Credentials
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoUser("admin")}
                className="rounded-xl border border-white/80 bg-white/60 px-3 py-2 text-xs font-medium text-ink hover:bg-white transition-colors"
              >
                Fill Admin Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemoUser("buyer")}
                className="rounded-xl border border-white/80 bg-white/60 px-3 py-2 text-xs font-medium text-ink hover:bg-white transition-colors"
              >
                Fill Buyer Demo
              </button>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
