import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { countryImage, facilitiesByCountry, flag, type Country } from "@/data/network";

const PREVIEW = 3;

export function CountryCard({ country }: { country: Country }) {
  const items = facilitiesByCountry(country.name);
  const preview = items.slice(0, PREVIEW).map((f) => f.name);
  const more = preview.length > 0 ? country.hospitals - preview.length : 0;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-ink/40 hover:shadow-[0_18px_40px_-20px_rgba(23,57,74,0.45)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        <Image
          src={countryImage(country.name)}
          alt=""
          fill
          sizes="(min-width: 1280px) 22rem, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-ink/0" />
        <span className="absolute bottom-3 left-4 rounded-pill bg-white/90 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur">
          {country.hospitals} {country.hospitals === 1 ? "partner" : "partners"}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-7">
        <span
          aria-hidden
          className="absolute -top-6 right-5 grid h-12 w-12 place-items-center rounded-full border-4 border-white bg-mist text-2xl shadow-sm"
        >
          {flag(country.code)}
        </span>
        <p className="text-xs uppercase tracking-[0.14em] text-ink-mute">{country.region}</p>
        <h3 className="mt-1 text-xl font-semibold">
          <Link
            href={`/health-network?country=${encodeURIComponent(country.name)}`}
            className="after:absolute after:inset-0"
          >
            {country.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-signal-deep">
          {country.hospitals} partner {country.hospitals === 1 ? "hospital" : "hospitals"}
        </p>
        <p className="mt-3 line-clamp-2 text-sm text-ink-soft">{preview.join(", ")}</p>
        {more > 0 && <p className="mt-1 text-sm text-ink-mute">+ {more} more</p>}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-ink">
          View hospitals
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
