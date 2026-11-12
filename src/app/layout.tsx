import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "@fontsource-variable/instrument-sans";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { countries, networkStats } from "@/data/network";

export const metadata: Metadata = {
  metadataBase: new URL("https://healthorbit.com"),
  title: {
    default: "HealthOrbit — Specialist treatment abroad, coordinated end to end",
    template: "%s · HealthOrbit",
  },
  description:
    `HealthOrbit connects international patients with ${networkStats.partners} accredited hospitals in ${countries.length} countries and coordinates everything from hospital choice to follow-up at home.`,
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#17394a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only z-[60] rounded-pill bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  );
}
