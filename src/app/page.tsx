import {
  Ambulance,
  BriefcaseMedical,
  FileText,
  Globe,
  Hospital,
  Sparkles,
  CalendarCheck,
  FileSearch,
  HeartPulse,
  MessageCircle,
  Plane,
  Stethoscope,
  Video,
} from "lucide-react";
import { OrbitHero } from "@/components/orbit-hero";
import { FacilityCard } from "@/components/facility-card";
import { CountryCard } from "@/components/country-card";
import { ButtonLink } from "@/components/ui/button";
import { countries, featuredFacilities, flag, networkStats } from "@/data/network";
import { offices, whatsapp } from "@/data/contact";

const capabilities = [
  {
    icon: Globe,
    tone: "border-cyan-400/30 bg-cyan-500/15 text-cyan-300",
    title: "Multi-Country Network",
    highlight: "Singapore, Malaysia, Thailand, China, India & many more",
    body: "Access leading international healthcare systems across Asia through one dedicated team in Dhaka.",
  },
  {
    icon: Hospital,
    tone: "border-emerald-400/30 bg-emerald-500/15 text-emerald-300",
    title: "Foreign Hospitals Under One Roof",
    highlight: "350+ Accredited Partner Hospitals",
    body: "Compare hospital facilities, doctor credentials, and cost estimates without needing to travel or hire multiple agents.",
  },
  {
    icon: Plane,
    tone: "border-rose-400/30 bg-rose-500/15 text-rose-300",
    title: "Air Ambulance",
    highlight: null,
    body: "Fully equipped airborne ICU charters with dedicated aeromedical doctors, ventilator support, and bed-to-bed transfers.",
  },
  {
    icon: BriefcaseMedical,
    tone: "border-emerald-400/30 bg-emerald-500/15 text-emerald-300",
    title: "Direct Hospital Bed Admission",
    highlight: "Airport Buggy & Ambulance Liaison",
    body: "Tarmac ambulance pick-up directly from aircraft to hospital room, bypassing emergency room queues.",
  },
  {
    icon: FileText,
    tone: "border-amber-400/30 bg-amber-500/15 text-amber-300",
    title: "Multi Hospital Quotation",
    highlight: "Compare Costs Across Hospitals",
    body: "Receive itemised treatment estimates from several partner hospitals at once, so you can compare side by side.",
  },
];

const services = [
  { icon: CalendarCheck, title: "In-person appointments", body: "Face-to-face consultations with specialists anywhere in the network." },
  { icon: FileSearch, title: "Second medical opinion", body: "An international specialist reviews your diagnosis before you commit to treatment." },
  { icon: Stethoscope, title: "Treatment abroad", body: "Surgery and specialist care that isn’t available, or isn’t timely, at home." },
  { icon: HeartPulse, title: "Health check packages", body: "Screening plans built to catch serious conditions early." },
  { icon: Ambulance, title: "Emergency evacuation", body: "Urgent transfers and air ambulance to a partner hospital." },
  { icon: Video, title: "Video consultations", body: "Speak with a specialist from home, with no travel." },
];

const steps = [
  { title: "Tell us what you need", body: "Send your condition, preferred treatment and destination through the form or WhatsApp." },
  { title: "Compare your options", body: "Get a shortlist of hospitals and specialists with treatment plans and cost estimates." },
  { title: "We arrange the travel", body: "Visa letters, flights and accommodation, with an itinerary shared with your family." },
  { title: "Treatment and follow-up", body: "A coordinator stays with you during treatment and checks in on recovery at home." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="graticule relative -mt-[72px] overflow-hidden pt-[72px]">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:pb-24 lg:pt-16">
          <div className="relative z-10">
            <h1 className="max-w-[13ch] text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[1.02]">
              Specialist care abroad, planned around you.
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg text-ink-soft">
              Faster access, a second opinion, or treatment you can’t get at home. We connect you with accredited
              hospitals in {networkStats.countries} countries and handle everything until you’re home again.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/health-network">Explore the network</ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Talk to a coordinator
              </ButtonLink>
            </div>
            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-ink-soft">
              <div className="flex items-baseline gap-2">
                <dt className="sr-only">Partner hospitals</dt>
                <dd className="font-display text-xl font-semibold text-ink">{networkStats.partners}</dd>
                <span>partner hospitals</span>
              </div>
              <div className="flex items-baseline gap-2">
                <dt className="sr-only">Patients assisted</dt>
                <dd className="font-display text-xl font-semibold text-ink">{networkStats.patients}</dd>
                <span>patients assisted</span>
              </div>
              <div className="flex items-baseline gap-2">
                <dt className="sr-only">Support hours</dt>
                <dd className="font-display text-xl font-semibold text-ink">24/7</dd>
                <span>patient support</span>
              </div>
            </dl>
          </div>
          <OrbitHero />
        </div>
      </section>

      {/* Why choose HealthOrbit */}
      <section className="bg-[#0c1426] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              <Sparkles className="h-4 w-4" aria-hidden />
              Why choose HealthOrbit
            </span>
            <h2 className="mt-6 text-3xl font-semibold text-white sm:text-5xl">Specialized Facilitation Capabilities</h2>
          </div>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {capabilities.map(({ icon: Icon, tone, title, highlight, body }) => (
              <li key={title} className="rounded-3xl border border-white/10 bg-[#1b2538] p-6 sm:p-7">
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border ${tone}`}>
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-6 text-xl font-semibold leading-snug text-white">{title}</h3>
                {highlight && <p className="mt-3 text-sm font-semibold text-teal-300">{highlight}</p>}
                <p className="mt-3 text-slate-300">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured hospitals */}
      {/* <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">Hospitals patients travel for</h2>
              <p className="mt-3 max-w-xl text-ink-soft">
                Accredited, vetted partners that treat patients from around the world.
              </p>
            </div>
            <ButtonLink href="/health-network" variant="outline">
              See all {countries.length} countries
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredFacilities.slice(0, 6).map((f) => (
              <FacilityCard key={f.slug} facility={f} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Countries */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-signal-deep">International hospital network</p>
        <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Where our partners are</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Pick a destination to see the accredited hospitals and specialist centres we work with there.
        </p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {countries.map((c) => (
            <li key={c.code}>
              <CountryCard country={c} />
            </li>
          ))}
        </ul>
      </section>

      {/* Services + process */}
      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">What we arrange</h2>
            <dl className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {services.map(({ icon: Icon, title, body }) => (
                <div key={title}>
                  <dt className="flex items-center gap-2.5 font-semibold">
                    <Icon className="h-5 w-5 text-signal-deep" aria-hidden />
                    {title}
                  </dt>
                  <dd className="mt-1.5 text-ink-soft">{body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-[28px] bg-ink p-8 text-paper sm:p-10">
            <h2 className="text-3xl font-semibold">How it works</h2>
            <ol className="mt-8 space-y-0">
              {steps.map((s, i) => (
                <li key={s.title} className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-8 last:pb-0">
                  {i < steps.length - 1 && (
                    <span aria-hidden className="absolute left-[1.2rem] top-10 h-[calc(100%-2.5rem)] w-px bg-paper/20" />
                  )}
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-paper/30 font-display text-sm">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="mt-1 text-paper/70">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href={whatsapp.link()}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex h-11 items-center gap-2 rounded-pill bg-signal px-5 font-medium text-ink"
            >
              <Plane className="h-4 w-4" /> Start on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Contact band */}
      <section className="mx-auto mt-20 max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 rounded-[28px] border border-line bg-white p-8 sm:p-12 lg:grid-cols-[1.1fr_1.9fr]">
          <div>
            <h2 className="text-3xl font-semibold">Talk to a real coordinator</h2>
            <p className="mt-3 text-ink-soft">We usually reply within a few hours. For anything urgent, WhatsApp is fastest.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Send an inquiry</ButtonLink>
              <ButtonLink href={whatsapp.link()} variant="outline" target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" /> {whatsapp.display}
              </ButtonLink>
            </div>
          </div>
          <ul className="grid gap-6 sm:grid-cols-3">
            {offices.map((o) => (
              <li key={o.id} className="border-t-2 border-ink pt-4">
                <p className="font-semibold">
                  <span aria-hidden className="mr-1.5">{flag(o.code)}</span>
                  {o.country}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{o.address}</p>
                <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="mt-2 block text-sm font-medium hover:underline">
                  {o.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
