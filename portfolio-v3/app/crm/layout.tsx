import type { Metadata } from "next";

export const metadata: Metadata = {
  // v2-era page: kept reachable, out of search until it is rebuilt on v3.
  robots: { index: false, follow: true },
  title: "Outbound CRM",
  description:
    "A lightweight outbound CRM: import leads from the Account Research engine, track them through stages, and run your pipeline. Free, saved in your browser.",
  alternates: { canonical: "/crm" },
};

export default function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
