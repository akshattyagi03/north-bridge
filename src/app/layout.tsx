import type { Metadata, Viewport } from "next";
// @ts-ignore Next.js resolves global CSS side-effect imports.
import "./globals.css";

export const metadata: Metadata = {
  title: "North Bridge Tech — Coming Soon",
  description:
    "North Bridge Tech is a digital product studio bringing web, mobile, cloud, design, integrations, and digital marketing together. Coming soon."
};

// Matches --paper in globals.css so mobile browser chrome blends into the page.
export const viewport: Viewport = {
  themeColor: "#11100e"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}