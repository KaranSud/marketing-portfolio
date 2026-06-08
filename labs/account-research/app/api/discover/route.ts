import { NextResponse } from "next/server";
import { buildIcp } from "@/lib/agent";
import { discoverForIcp } from "@/lib/discover";
import { rateLimit, clientIp } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const rl = rateLimit(`discover:${clientIp(req)}`, 12, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down and try again shortly." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  let body: { brand?: string; offer?: string; country?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const offer = (body.offer || "").trim();
  const brand = (body.brand || "").trim().slice(0, 300);
  const country = (body.country || "").trim().slice(0, 60) || undefined;

  if (!offer) {
    return NextResponse.json(
      { error: "Describe what you sell so I can build the ICP." },
      { status: 400 }
    );
  }
  if (offer.length > 2000) {
    return NextResponse.json({ error: "Offer is too long." }, { status: 400 });
  }

  try {
    const icp = await buildIcp(brand, offer);
    const companies = await discoverForIcp(icp.industries, country);
    return NextResponse.json({ icp, companies, country: country ?? null });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
