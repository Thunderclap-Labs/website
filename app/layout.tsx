import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className="overflow-x-hidden">
      <head />
      <body
        className={clsx(
          "relative overflow-x-hidden min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <Navbar />
          <main className="relative -top-16 overflow-hidden">
            {children}
          </main>
          <footer className="-mt-16 w-full flex items-center justify-center py-3">
            <Link
              className="flex items-center gap-1 text-current"
              href="/team"
              title="Thunderclap Group"
            >
              <span className="text-default-600">Powered by</span>
              <p className="text-primary">Passion</p> <span className="text-default-600">;)</span>
            </Link>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
