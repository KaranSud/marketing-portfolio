import type { Metadata } from "next";

export const metadata: Metadata = {
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
