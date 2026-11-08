import Link from "next/link";
import { MapPin } from "lucide-react";
import { flag, getCountry, type Facility } from "@/data/network";
import { cn } from "@/lib/utils";

export function FacilityCard({ facility, className }: { facility: Facility; className?: string }) {
  const c = getCountry(facility.country);
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-[22px] border border-line bg-white p-6 transition-colors hover:border-ink/50",
        className,
      )}
    >
      <div className="flex items-center justify-between text-sm text-ink-mute">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {facility.city}, {facility.country}
        </span>
        <span aria-hidden className="text-xl">{flag(c.code)}</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold leading-snug">
        <Link href={`/health-network/${facility.slug}`} className="after:absolute after:inset-0">
          {facility.name}
        </Link>
      </h3>
      {facility.highlight && <p className="mt-2 text-ink-soft">{facility.highlight}</p>}
      {facility.specialties && (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label="Known for">
          {facility.specialties.map((s) => (
            <li key={s} className="rounded-pill bg-mist px-2.5 py-1 text-[0.8rem] text-ink-soft">
              {s}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
