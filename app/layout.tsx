import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { SITE } from "@/lib/site";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  // OG + Twitter images are injected automatically by app/opengraph-image.tsx.
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: SITE.url },
  category: "automotive",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B2545",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} min-h-full flex flex-col bg-background text-foreground`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
