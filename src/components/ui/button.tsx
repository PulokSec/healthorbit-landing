import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Variant = "primary" | "signal" | "ghost" | "outline";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-soft",
  signal: "bg-signal text-ink hover:bg-[#f0b558]",
  ghost: "text-ink hover:bg-mist",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-white",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill px-5 h-11 text-[0.95rem] font-medium transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={cn(base, styles[variant], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={cn(base, styles[variant], className)} {...props} />;
}
