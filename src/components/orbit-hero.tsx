"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { flag, getCountry, getFacility, type Facility } from "@/data/network";

type Ring = { radius: number; duration: number; reverse?: boolean; items: Facility[] };

/** Partner hospitals shown in the orbit, in ring order. */
const orbitSlugs = [
  "bumrungrad-international-hospital",
  "apollo-hospital",
  "raffles-hospital",
  "samsung-medical-center",
  "anadolu-medical-center",
  "american-hospital-dubai",
  "fuda-cancer-hospital",
  "prince-court-medical-centre",
];

/**
 * The page's one orchestrated moment: the logo's globe draws itself, then featured
 * partner hospitals settle into slow orbits around it. Chips counter-rotate to stay upright.
 */
export function OrbitHero() {
  const reduce = useReducedMotion();
  const items = orbitSlugs.map((slug) => getFacility(slug)!);
  const rings: Ring[] = [
    { radius: 31, duration: 80, items: items.slice(0, 3) },
    { radius: 46, duration: 120, reverse: true, items: items.slice(3, 8) },
  ];

  const draw = (delay: number) => ({
    initial: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { duration: 1.4, delay, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.2, delay } },
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[600px] select-none">
      {/* Orbit rings */}
      {rings.map((ring, i) => (
        <motion.div
          key={ring.radius}
          aria-hidden
          initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.9 + i * 0.2, ease: "easeOut" }}
          className="absolute rounded-full border border-dashed border-ink/25"
          style={{
            inset: `${50 - ring.radius}%`,
          }}
        />
      ))}

      {/* Globe — redrawn from the brand mark */}
      <svg
        viewBox="0 0 48 48"
        className="absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 text-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
        aria-hidden
      >
        <circle cx="24" cy="24" r="22" className="fill-mist" stroke="none" />
        <motion.circle cx="24" cy="24" r="20" {...draw(0)} />
        <motion.ellipse cx="24" cy="24" rx="9" ry="20" {...draw(0.25)} />
        <motion.path d="M4 24h40M7 14h34M7 34h34" {...draw(0.45)} />
        <motion.path d="M2.5 38C-1 32 18 20 40 12" stroke="var(--color-signal-deep)" strokeWidth={1.6} {...draw(0.8)} />
      </svg>

      {/* Orbiting partner chips */}
      {rings.map((ring, ri) => (
        <div
          key={`orbit-${ri}`}
          className="absolute inset-0"
          style={{
            animation: reduce ? undefined : `orbit ${ring.duration}s linear infinite${ring.reverse ? " reverse" : ""}`,
          }}
        >
          {ring.items.map((f, i) => {
            const angle = (360 / ring.items.length) * i + ri * 30;
            const rad = (angle * Math.PI) / 180;
            const x = 50 + ring.radius * Math.cos(rad);
            const y = 50 + ring.radius * Math.sin(rad);
            const c = getCountry(f.country);
            return (
              <div
                key={f.slug}
                className="absolute"
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div
                  style={{
                    animation: reduce
                      ? undefined
                      : `orbit ${ring.duration}s linear infinite${ring.reverse ? "" : " reverse"}`,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: reduce ? 1 : 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3 + ri * 0.25 + i * 0.08, type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <Link
                      href={`/health-network/${f.slug}`}
                      title={`${f.name}, ${f.city}`}
                      className="group flex max-w-[13.5rem] items-center gap-2 rounded-pill border border-line bg-white/95 p-1 sm:py-1.5 sm:pl-1.5 sm:pr-3 text-left shadow-[0_8px_20px_-12px_rgb(23_57_74/0.5)] backdrop-blur transition-colors hover:border-ink"
                    >
                      <span
                        aria-hidden
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mist text-base sm:h-7 sm:w-7 sm:text-sm"
                      >
                        {flag(c.code)}
                      </span>
                      <span className="hidden min-w-0 leading-tight sm:block">
                        <span className="block truncate text-[0.78rem] font-semibold">{f.name}</span>
                        <span className="block truncate text-[0.7rem] text-ink-mute">{f.city}</span>
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
