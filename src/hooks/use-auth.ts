import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function isUserAdmin(user: User | null): boolean {
  if (!user) return false;
  const metaRole = user.user_metadata?.role;
  const appRole = (user.app_metadata as Record<string, unknown> | undefined)?.role;
  const isAdm = user.user_metadata?.is_admin;
  return metaRole === "admin" || appRole === "admin" || isAdm === true;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const isAdmin = isUserAdmin(user);

  return { user, loading, isAdmin };
}

