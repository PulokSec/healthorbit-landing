import Link from "next/link";
import { cn } from "@/lib/utils";

/** Vector redraw of the HealthOrbit mark: a globe, a tilted orbit, and an upward arrow. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-9 w-9", className)}
      aria-hidden="true"
    >
      <circle cx="22" cy="25" r="14" />
      <ellipse cx="22" cy="25" rx="6.5" ry="14" />
      <path d="M8 25h28M10 18h24M10 32h24" />
      <path d="M5.5 37.5C2 33 15 24 30 17.5" />
      <path d="M30 17.5 42 8" />
      <path d="M34 7.5h8.5V16" />
    </svg>
  );
}

export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="HealthOrbit home"
      className={cn(
        "group inline-flex items-center gap-2.5",
        tone === "ink" ? "text-ink" : "text-paper",
        className,
      )}
    >
      <LogoMark className="transition-transform duration-500 group-hover:rotate-[-8deg]" />
      <span className="font-display text-[1.45rem] font-medium tracking-[-0.03em]">healthorbit</span>
    </Link>
  );
}
