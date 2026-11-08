import type { Metadata } from "next";
import { Suspense } from "react";
import { NetworkExplorer } from "@/components/network-explorer";
import { countries, facilities, networkStats } from "@/data/network";

export const metadata: Metadata = {
  title: "Health network",
  description: `Browse HealthOrbit’s partner hospitals and clinics across ${countries.length} countries.`,
};

export default function HealthNetworkPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:pt-14">
      <header className="mb-12 grid gap-6 border-b border-line pb-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <h1 className="text-[clamp(2.4rem,5vw,3.8rem)] font-semibold leading-[1.04]">Our health network</h1>
        <p className="text-lg text-ink-soft">
          {facilities.length} core partners listed here, out of {networkStats.partners} hospitals we work with in{" "}
          {countries.length} countries. Every partner is accredited and vetted before we refer a patient.
        </p>
      </header>
      <Suspense fallback={<div className="h-96" />}>
        <NetworkExplorer />
      </Suspense>
    </div>
  );
}
