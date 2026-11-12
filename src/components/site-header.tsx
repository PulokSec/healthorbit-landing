"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { countries, flag, type Country } from "@/data/network";
import { whatsapp } from "@/data/contact";
import { cn } from "@/lib/utils";

const regions: Country["region"][] = ["Asia", "Europe", "Middle East", "Africa", "Americas"];

const links = [
  { href: "/health-network", label: "Health network", mega: true },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow] duration-300",
        scrolled || megaOpen ? "bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-transparent",
      )}
      onKeyDown={(e) => e.key === "Escape" && setMegaOpen(false)}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((l) =>
            l.mega ? (
              <div key={l.href} onMouseEnter={openMega} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  aria-expanded={megaOpen}
                  aria-controls="mega-network"
                  onClick={() => setMegaOpen((o) => !o)}
                  className={cn(
                    "inline-flex h-10 items-center gap-1.5 rounded-pill px-4 text-[0.95rem] transition-colors hover:bg-mist",
                    pathname.startsWith("/health-network") && "font-semibold",
                  )}
                >
                  {l.label}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", megaOpen && "rotate-180")} />
                </button>
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={cn(
                  "inline-flex h-10 items-center rounded-pill px-4 text-[0.95rem] transition-colors hover:bg-mist",
                  pathname === l.href && "font-semibold",
                )}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={whatsapp.link()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-pill px-4 text-[0.95rem] text-ink-soft hover:bg-mist"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <ButtonLink href="/contact">Make an inquiry</ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-pill hover:bg-mist lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Desktop mega menu: every country in the network, grouped by region */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            id="mega-network"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseEnter={openMega}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full hidden border-t border-line bg-paper shadow-[0_24px_40px_-24px_rgb(23_57_74/0.35)] lg:block"
          >
            <div className="mx-auto grid max-w-7xl grid-cols-[1fr_2.6fr] gap-10 px-8 py-9">
              <div className="flex flex-col justify-between border-r border-line pr-10">
                <div>
                  <p className="font-display text-2xl leading-tight">
                    {countries.length} countries, one coordinator.
                  </p>
                  <p className="mt-3 text-ink-soft">
                    Pick a country to see the hospitals and clinics we work with there.
                  </p>
                </div>
                <Link
                  href="/health-network"
                  className="mt-6 inline-flex w-fit items-center gap-2 font-medium underline decoration-signal decoration-2 underline-offset-4"
                >
                  Browse the full network
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                {regions.map((region) => (
                  <div key={region}>
                    <p className="mb-2 text-sm text-ink-mute">{region}</p>
                    <ul className="space-y-0.5">
                      {countries
                        .filter((c) => c.region === region)
                        .map((c) => (
                          <li key={c.code}>
                            <Link
                              href={`/health-network?country=${encodeURIComponent(c.name)}`}
                              className="group -mx-2 flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-mist"
                            >
                              <span className="flex items-center gap-2.5">
                                <span aria-hidden>{flag(c.code)}</span>
                                {c.name}
                              </span>
                              <span className="text-sm tabular-nums text-ink-mute group-hover:text-ink">
                                {c.hospitals}
                              </span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-paper lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 py-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link href={l.href} className="block border-b border-line py-4 font-display text-2xl">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <p className="mt-6 text-sm text-ink-mute">Jump to a country</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {countries.map((c) => (
                  <Link
                    key={c.code}
                    href={`/health-network?country=${encodeURIComponent(c.name)}`}
                    className="rounded-pill border border-line px-3 py-1.5 text-sm"
                  >
                    {flag(c.code)} {c.name}
                  </Link>
                ))}
              </div>
              <div className="mt-8 grid gap-3">
                <ButtonLink href="/contact">Make an inquiry</ButtonLink>
                <ButtonLink href={whatsapp.link()} variant="outline" target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
