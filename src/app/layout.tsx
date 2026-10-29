import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "North Bridge Tech — Digital Product Studio",
  description:
    "Engineering high-performance web applications, scalable cloud infrastructure, mobile products, and bespoke UI/UX design systems.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-[#141312] antialiased min-h-screen selection:bg-[#C42625] selection:text-white">
        {children}
      </body>
    </html>
  );
}
