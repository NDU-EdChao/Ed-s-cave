import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getServiceSupabase } from "@/lib/supabase/service";

// Gated contact reveal: logs the reveal, rate-limits per viewer, and returns
// the contact (which lives in a table with no public read policy).
export async function POST(request: NextRequest) {
  const svc = getServiceSupabase();
  if (!svc) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  const body = (await request.json().catch(() => ({}))) as { requestId?: string };
  const requestId = body.requestId;
  if (!requestId) return NextResponse.json({ error: "bad request" }, { status: 400 });

  const { data: jr } = await svc
    .from("job_requests")
    .select("id,status")
    .eq("id", requestId)
    .maybeSingle();
  if (!jr || jr.status !== "open") {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const viewer = createHash("sha256").update(ip).digest("hex").slice(0, 32);

  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count } = await svc
    .from("contact_reveals")
    .select("id", { count: "exact", head: true })
    .eq("viewer_hash", viewer)
    .gte("created_at", since);
  if ((count ?? 0) >= 20) {
    return NextResponse.json({ error: "rate limited" }, { status: 429 });
  }

  await svc
    .from("contact_reveals")
    .insert({ job_request_id: requestId, viewer_hash: viewer });

  const { data: contact } = await svc
    .from("job_request_contacts")
    .select("contact_method,contact_value")
    .eq("job_request_id", requestId)
    .maybeSingle();
  if (!contact) return NextResponse.json({ error: "no contact" }, { status: 404 });

  return NextResponse.json({
    method: contact.contact_method,
    value: contact.contact_value,
  });
}
