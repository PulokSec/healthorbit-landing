"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { countries, facilities, flag, type FacilityType } from "@/data/network";
import { cn } from "@/lib/utils";

const types: ("All" | FacilityType)[] = ["All", "Hospital", "Clinic", "Wellness centre", "Department"];

export function NetworkExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const initialCountry = params.get("country");
  const [country, setCountry] = useState<string | null>(
    initialCountry && countries.some((c) => c.name === initialCountry) ? initialCountry : null,
  );
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [query, setQuery] = useState(params.get("q") ?? "");

  const selectCountry = (name: string | null) => {
    setCountry(name);
    const next = new URLSearchParams(params.toString());
    if (name) next.set("country", name);
    else next.delete("country");
    startTransition(() => router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false }));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return facilities.filter(
      (f) =>
        (!country || f.country === country) &&
        (type === "All" || f.type === type) &&
        (!q || `${f.name} ${f.city ?? ""} ${f.country} ${(f.specialties ?? []).join(" ")}`.toLowerCase().includes(q)),
    );
  }, [country, type, query]);

  const groups = useMemo(
    () =>
      countries
        .map((c) => ({ country: c, items: filtered.filter((f) => f.country === c.name) }))
        .filter((g) => g.items.length > 0),
    [filtered],
  );

  const countFor = (name: string) =>
    facilities.filter(
      (f) => f.country === name && (type === "All" || f.type === type),
    ).length;

  const hasFilters = Boolean(country || type !== "All" || query);

  return (
    <div className="grid gap-10 lg:grid-cols-[17rem_1fr]">
      {/* Country rail */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p id="country-label" className="mb-3 text-sm text-ink-mute">Country</p>
        <div
          role="listbox"
          aria-labelledby="country-label"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:max-h-[calc(100dvh-9rem)] lg:flex-col lg:gap-0.5 lg:overflow-y-auto lg:px-0 lg:pb-0"
        >
          <CountryOption
            label="All countries"
            count={facilities.filter((f) => type === "All" || f.type === type).length}
            active={!country}
            onSelect={() => selectCountry(null)}
          />
          {countries.map((c) => (
            <CountryOption
              key={c.code}
              label={c.name}
              icon={flag(c.code)}
              count={countFor(c.name)}
              active={country === c.name}
              onSelect={() => selectCountry(c.name)}
            />
          ))}
        </div>
      </aside>

      <div>
        {/* Search + type */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search hospitals, cities or specialties</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-mute" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by hospital, city or specialty"
              className="h-12 w-full rounded-pill border border-line bg-white pl-12 pr-11 outline-none transition-colors placeholder:text-ink-mute focus:border-ink"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full hover:bg-mist"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
          <LayoutGroup id="type-filter">
            <div role="radiogroup" aria-label="Facility type" className="flex flex-wrap gap-1 rounded-pill bg-mist p-1">
              {types.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="radio"
                  aria-checked={type === t}
                  onClick={() => setType(t)}
                  className="relative h-10 rounded-pill px-3.5 text-sm"
                >
                  {type === t && (
                    <motion.span
                      layoutId="type-pill"
                      className="absolute inset-0 rounded-pill bg-white shadow-sm"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className={cn("relative", type === t ? "font-semibold" : "text-ink-soft")}>{t}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-ink-mute" aria-live="polite">
          <span>
            {filtered.length} {filtered.length === 1 ? "partner" : "partners"}
            {country ? ` in ${country}` : ` across ${groups.length} countries`}
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setType("All");
                selectCountry(null);
              }}
              className="font-medium text-ink underline underline-offset-4"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results */}
        <div className="mt-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {groups.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-[22px] border border-dashed border-line px-6 py-14 text-center"
              >
                <p className="font-display text-xl font-semibold">No partners match those filters.</p>
                <p className="mx-auto mt-2 max-w-md text-ink-soft">
                  This list shows our core partners only. Tell a coordinator what you need and we’ll check the wider
                  network for you.
                </p>
                <Link
                  href={`/contact${query ? `?subject=${encodeURIComponent(query)}` : ""}`}
                  className="mt-6 inline-flex h-11 items-center rounded-pill bg-ink px-5 font-medium text-paper"
                >
                  Ask a coordinator
                </Link>
              </motion.div>
            ) : (
              groups.map(({ country: c, items }) => (
                <motion.section
                  key={c.code}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-10"
                  aria-labelledby={`group-${c.code}`}
                >
                  <h2
                    id={`group-${c.code}`}
                    className="sticky top-[72px] z-10 -mx-1 flex items-center gap-3 bg-paper/95 px-1 py-3 text-xl font-semibold backdrop-blur"
                  >
                    <span aria-hidden>{flag(c.code)}</span>
                    {c.name}
                    <span className="font-sans text-sm font-normal text-ink-mute">{items.length}</span>
                  </h2>
                  <ul className="divide-y divide-line border-y border-line">
                    {items.map((f) => (
                      <motion.li
                        layout="position"
                        key={f.slug}
                        className="group relative grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6"
                      >
                        <div>
                          <Link
                            href={`/health-network/${f.slug}`}
                            className="text-[1.05rem] font-semibold after:absolute after:inset-0 group-hover:underline group-hover:decoration-signal group-hover:decoration-2 group-hover:underline-offset-4"
                          >
                            {f.name}
                          </Link>
                          <p className="text-sm text-ink-mute">
                            {f.city}
                            {f.type !== "Hospital" && (
                              <span className="ml-2 rounded-pill bg-mist px-2 py-0.5 text-xs text-ink-soft">{f.type}</span>
                            )}
                          </p>
                          {f.highlight && <p className="mt-1.5 max-w-2xl text-ink-soft">{f.highlight}</p>}
                        </div>
                        <ArrowUpRight
                          aria-hidden
                          className="hidden h-5 w-5 text-ink-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink sm:block"
                        />
                      </motion.li>
                    ))}
                  </ul>
                </motion.section>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function CountryOption({
  label,
  icon,
  count,
  active,
  onSelect,
}: {
  label: string;
  icon?: string;
  count: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      disabled={count === 0}
      onClick={onSelect}
      className={cn(
        "flex shrink-0 items-center justify-between gap-3 rounded-pill border px-3.5 py-2 text-left text-sm transition-colors lg:rounded-xl lg:border-transparent lg:py-2",
        active ? "border-ink bg-ink text-paper" : "border-line hover:bg-mist",
        count === 0 && "opacity-40",
      )}
    >
      <span className="flex items-center gap-2 whitespace-nowrap">
        {icon && <span aria-hidden>{icon}</span>}
        {label}
      </span>
      <span className={cn("tabular-nums", active ? "text-paper/70" : "text-ink-mute")}>{count}</span>
    </button>
  );
}
