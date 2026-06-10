import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://toomuchbanger.in"),
  title: "Too Much Banger",
  description: "A playful archive of the Bangerlore discourse.",
  openGraph: {
    title: "Too Much Banger",
    description: "The morning-after scrapbook of a party that broke containment.",
    url: "https://toomuchbanger.in",
    siteName: "Too Much Banger",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
