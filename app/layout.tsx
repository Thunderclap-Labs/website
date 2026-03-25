import { Metadata } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import bannersmall from "@/components/images/bannersmall.png";

import "./styles/globals.css";
import "swiper/css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thunderclaplabs.com"),
  title: {
    default: siteConfig.name,
    template: `%s | Thunderclap Labs`,
  },
  description: siteConfig.description,
  keywords: [
    "aerospace",
    "defense",
    "propulsion systems",
    "cloud seeding",
    "atmospheric technology",
    "autonomous systems",
    "Thunderclap Labs",
  ],
  openGraph: {
    type: "website",
    url: "https://thunderclaplabs.com/",
    siteName: "Thunderclap Labs",
    title: "Thunderclap Labs | R&D, Aerospace & Defense",
    description:
      "Pioneering next-generation aerospace and atmospheric technologies. We specialize in advanced propulsion & defense systems.",
    images: [
      {
        url: bannersmall.src,
        width: bannersmall.width,
        height: bannersmall.height,
        alt: "Thunderclap Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thunderclap Labs | R&D, Aerospace & Defense",
    description:
      "Pioneering next-generation aerospace and atmospheric technologies. We specialize in advanced propulsion & defense systems.",
    images: [bannersmall.src],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Thunderclap Labs",
    url: "https://thunderclaplabs.com",
    description: siteConfig.description,
    logo: "https://thunderclaplabs.com" + bannersmall.src,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.youtube,
      siteConfig.links.instagram,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "thunderclaplabs@gmail.com",
      contactType: "customer support",
    },
  };

  return (
    <html suppressHydrationWarning className="overflow-x-hidden" lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </head>
      <body
        className={clsx(
          "relative overflow-x-hidden min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <Navbar />
          <main className="relative !overflow-hidden">{children}</main>
          <footer className="w-full flex items-center justify-center py-3">
            <Link
              className="flex items-center gap-1 text-current"
              href="/team"
              title="Thunderclap Group"
            >
              <span className="text-default-600">Powered by</span>
              <p className="text-primary">Passion</p>{" "}
              <span className="text-default-600">;)</span>
            </Link>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
