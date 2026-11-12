import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarCheck, FileSearch, MessageCircle, Plane, Video } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { facilities, facilitiesByCountry, flag, getCountry, getFacility, place } from "@/data/network";
import { whatsapp } from "@/data/contact";

export function generateStaticParams() {
  return facilities.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = getFacility(slug);
  if (!f) return {};
  return {
    title: f.city ? `${f.name}, ${f.city}` : f.name,
    description: f.highlight ?? `Arrange treatment at ${f.name} in ${place(f)} with HealthOrbit.`,
  };
}

const support = [
  { icon: FileSearch, text: "Review of your reports by a specialist here before you travel" },
  { icon: CalendarCheck, text: "Appointments booked and confirmed for your travel dates" },
  { icon: Plane, text: "Visa invitation letters, flights and nearby accommodation" },
  { icon: Video, text: "Video follow-ups with your treating doctor once you’re home" },
];

export default async function FacilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = getFacility(slug);
  if (!f) notFound();

  const c = getCountry(f.country);
  const siblings = facilitiesByCountry(f.country).filter((x) => x.slug !== f.slug).slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
      <Link
        href={`/health-network?country=${encodeURIComponent(f.country)}`}
        className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" /> All partners in {f.country}
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="flex items-center gap-2 text-ink-soft">
            <span aria-hidden className="text-xl">{flag(c.code)}</span>
            {place(f)}
            <span className="ml-1 rounded-pill bg-mist px-2.5 py-0.5 text-sm">{f.type}</span>
          </p>
          <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.05]">{f.name}</h1>
          {f.highlight && <p className="mt-5 max-w-[56ch] text-xl text-ink-soft">{f.highlight}</p>}

          {f.specialties && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold">Known for</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {f.specialties.map((s) => (
                  <li key={s} className="rounded-pill border border-line bg-white px-4 py-2">{s}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-12">
            <h2 className="text-xl font-semibold">What we arrange for you</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {support.map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-signal-deep" aria-hidden />
                  <span className="text-ink-soft">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {siblings.length > 0 && (
            <div className="mt-14">
              <h2 className="text-xl font-semibold">Other partners in {f.country}</h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/health-network/${s.slug}`} className="flex justify-between gap-4 py-3.5 hover:underline">
                      <span className="font-medium">{s.name}</span>
                      <span className="text-ink-mute">{s.city}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[28px] border border-line bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Ask about this hospital</h2>
            <p className="mt-2 text-ink-soft">Get treatment options and a cost estimate, usually within a day.</p>
            <div className="mt-6">
              <ContactForm compact defaultSubject={`Inquiry: ${f.name}`} />
            </div>
          </div>
          <a
            href={whatsapp.link(`Hello, I have an inquiry about ${f.name} in ${place(f)}.`)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-pill bg-care px-5 py-3 font-medium text-white"
          >
            <MessageCircle className="h-4 w-4" /> Ask on WhatsApp instead
          </a>
        </aside>
      </div>
    </div>
  );
}
