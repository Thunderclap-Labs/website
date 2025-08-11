import { Metadata, Viewport } from "next";
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
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="overflow-x-hidden" lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thunderclaplabs.com/" />
        <meta property="og:title" content="Thunderclap Labs | Aerospace & Defense" />
        <meta property="og:description" content="Pioneering next-generation aerospace and atmospheric technologies. We specialize in advanced propulsion & defense systems." />
        <meta property="og:image" content={bannersmall.src} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://thunderclaplabs.com/" />
        <meta property="twitter:title" content="Thunderclap Labs | Aerospace & Defense" />
        <meta property="twitter:description" content="Pioneering next-generation aerospace and atmospheric technologies. We specialize in advanced propulsion & defense systems." />
        <meta property="twitter:image" content={bannersmall.src} />
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