import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";

export const metadata: Metadata = {
  title: "NorthBridge Tech — Digital Product Studio | Innovative Tech. Lasting Impact.",
  description:
    "We build digital solutions that move. From your idea to a scalable digital product: Web, Mobile, Cloud, UI/UX, Integrations & Digital Marketing.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F7F5",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth light" data-theme="light">
      <body className="antialiased min-h-screen selection:bg-[#C52623] selection:text-white transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
