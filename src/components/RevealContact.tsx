"use client";
import { useState } from "react";

export default function RevealContact({
  requestId,
  label,
}: {
  requestId: string;
  label: string;
}) {
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function reveal() {
    setLoading(true);
    try {
      const res = await fetch("/api/reveal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId }),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setValue(`${json.method}: ${json.value}`);
    } catch {
      setValue("—");
    } finally {
      setLoading(false);
    }
  }

  if (value) return <p className="font-medium">{value}</p>;
  return (
    <button
      onClick={reveal}
      disabled={loading}
      className="rounded-full bg-foreground px-5 py-2 text-sm text-background disabled:opacity-50"
    >
      {label}
    </button>
  );
}
