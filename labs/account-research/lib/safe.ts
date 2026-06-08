// SSRF protection. The research endpoint fetches user-supplied domains, so we
// must never let it reach internal/private/cloud-metadata addresses. We reject
// obvious internal names, and resolve the hostname to verify no resolved IP is
// private before any fetch.

import { lookup } from "node:dns/promises";
import net from "node:net";

export function isPrivateIp(ip: string): boolean {
  const v = ip.toLowerCase();

  // IPv6
  if (v === "::1" || v === "::") return true;
  if (v.startsWith("fc") || v.startsWith("fd")) return true; // unique-local fc00::/7
  if (v.startsWith("fe80")) return true; // link-local
  if (v.startsWith("::ffff:")) {
    const mapped = v.slice("::ffff:".length);
    if (net.isIPv4(mapped)) return isPrivateIp(mapped);
  }

  // IPv4
  if (net.isIPv4(v)) {
    const p = v.split(".").map(Number);
    if (p.some((n) => Number.isNaN(n) || n < 0 || n > 255)) return true;
    if (p[0] === 0) return true; // "this" network
    if (p[0] === 10) return true; // private
    if (p[0] === 127) return true; // loopback
    if (p[0] === 169 && p[1] === 254) return true; // link-local + cloud metadata
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true; // private
    if (p[0] === 192 && p[1] === 168) return true; // private
    if (p[0] === 100 && p[1] >= 64 && p[1] <= 127) return true; // CGNAT
    if (p[0] === 192 && p[1] === 0 && p[2] === 0) return true; // IETF
    if (p[0] >= 224) return true; // multicast + reserved
  }
  return false;
}

// Throws if the hostname is internal, unresolvable, or resolves to a private IP.
export async function assertPublicHost(hostname: string): Promise<void> {
  const h = hostname.toLowerCase().replace(/\.$/, "").trim();
  if (
    !h ||
    h === "localhost" ||
    h.endsWith(".localhost") ||
    h.endsWith(".local") ||
    h.endsWith(".internal") ||
    h.endsWith(".lan") ||
    h.endsWith(".home") ||
    h === "metadata.google.internal"
  ) {
    throw new Error("That host is not allowed.");
  }

  // Literal IP: check directly.
  if (net.isIP(h)) {
    if (isPrivateIp(h)) throw new Error("That host is not allowed.");
    return;
  }

  let addrs: { address: string }[];
  try {
    addrs = await lookup(h, { all: true });
  } catch {
    throw new Error("Could not resolve that host.");
  }
  if (!addrs.length) throw new Error("Could not resolve that host.");
  for (const a of addrs)
    if (isPrivateIp(a.address)) throw new Error("That host is not allowed.");
}

// Best-effort host check that never throws (for secondary fetches like deep
// sitemap pages). Returns true only when the host is safe to fetch.
export async function isPublicHost(hostname: string): Promise<boolean> {
  try {
    await assertPublicHost(hostname);
    return true;
  } catch {
    return false;
  }
}
