"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { flag } from "@/data/network";
import type { Office } from "@/data/contact";
import { cn } from "@/lib/utils";

function localNow(timeZone: string) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hour = Number(get("hour")) % 24;
  return {
    label: `${get("hour")}:${get("minute")}`,
    weekday: weekdays.indexOf(get("weekday")) + 1,
    hour,
  };
}

const dayRange = (days: number[]) => {
  const names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return `${names[days[0] - 1]}–${names[days[days.length - 1] - 1]}`;
};

export function OfficeCard({ office }: { office: Office }) {
  const [now, setNow] = useState<ReturnType<typeof localNow> | null>(null);

  useEffect(() => {
    const tick = () => setNow(localNow(office.timeZone));
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, [office.timeZone]);

  const open =
    now !== null &&
    office.hours.days.includes(now.weekday) &&
    now.hour >= office.hours.open &&
    now.hour < office.hours.close;

  const tel = office.phone.replace(/\s/g, "");

  return (
    <article className="flex flex-col overflow-hidden rounded-[22px] border border-line bg-white">
      {office.image && (
        <div className="relative aspect-[16/9] bg-mist">
          <Image src={office.image} alt="" fill sizes="(min-width: 768px) 28rem, 100vw" className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-ink-mute">{office.city}</p>
            <h3 className="mt-0.5 text-xl font-semibold">
              <span aria-hidden className="mr-2">{flag(office.code)}</span>
              {office.country}
            </h3>
          </div>
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-pill px-2.5 py-1 text-xs font-medium",
              now === null ? "bg-mist text-ink-mute" : open ? "bg-care/12 text-care" : "bg-mist text-ink-soft",
            )}
          >
            <span
              className={cn("h-2 w-2 rounded-full", open ? "animate-pulse-dot bg-care" : "bg-ink-mute")}
              aria-hidden
            />
            {now === null ? "Checking" : open ? "Open now" : "Closed"}
          </span>
        </div>

        <dl className="mt-5 space-y-3 text-[0.95rem]">
          <div className="flex gap-3">
            <dt className="sr-only">Local time</dt>
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-ink-mute" aria-hidden />
            <dd>
              <span className="tabular-nums font-medium">{now?.label ?? "--:--"}</span>
              <span className="text-ink-mute"> local · {dayRange(office.hours.days)}, {office.hours.open}:00–{office.hours.close}:00</span>
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="sr-only">Address</dt>
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-mute" aria-hidden />
            <dd className="text-ink-soft">{office.address}</dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <a
            href={`tel:${tel}`}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-pill bg-ink px-4 text-sm font-medium text-paper hover:bg-ink-soft"
          >
            <Phone className="h-4 w-4" /> {office.phone}
          </a>
          <a
            href={`mailto:${office.email}`}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-pill border border-ink/25 px-4 text-sm font-medium hover:border-ink"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
        </div>
      </div>
    </article>
  );
}
