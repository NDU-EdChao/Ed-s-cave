"use client";
import { useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";
import type { Dictionary } from "@/i18n/dictionaries";

export default function LoginForm({
  locale,
  next,
  dict,
}: {
  locale: string;
  next: string;
  dict: Dictionary;
}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = getBrowserSupabase();
      const redirectTo = `${window.location.origin}/${locale}/auth/callback?next=${encodeURIComponent(next)}`;
      await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  if (sent) return <p className="text-sm">{dict.auth.linkSent}</p>;
  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <label className="text-sm">
        {dict.auth.emailLabel}
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded border border-black/15 px-3 py-2 dark:border-white/20"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-foreground px-5 py-2 text-sm text-background disabled:opacity-50"
      >
        {dict.auth.sendLink}
      </button>
    </form>
  );
}
