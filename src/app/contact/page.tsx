import type { Metadata } from "next";
import Link from "next/link";
import { Siren, HandCoins, Hospital, MessageCircle, ShieldCheck, UserRound } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { OfficeCard } from "@/components/office-card";
import { Faq } from "@/components/faq";
import { offices, whatsapp } from "@/data/contact";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Reach a HealthOrbit patient support specialist by WhatsApp, phone, email, or the inquiry form.",
};

const routes = [
  { topic: "patient", icon: UserRound, title: "I’m a patient", body: "Get matched with a hospital, specialist or treatment within 24 hours." },
  { topic: "referral", icon: HandCoins, title: "I refer patients", body: "Earn commission when patients you refer are treated at a partner hospital." },
  { topic: "insurer", icon: ShieldCheck, title: "I’m an insurer or TPA", body: "Direct billing, group purchasing and case coordination across the network." },
  { topic: "provider", icon: Hospital, title: "My hospital wants to join", body: "List your hospital, clinic or practice for international patients." },
];

const faqs = [
  {
    q: "How quickly will someone reply?",
    a: "Most inquiries get a reply within a few hours, and always within 24 hours. WhatsApp is staffed around the clock if you need us sooner.",
  },
  {
    q: "Do I pay for your coordination?",
    a: "No. Patients pay the hospital for treatment; our matching, travel planning and follow-up are free to you.",
  },
  {
    q: "What should I include in my message?",
    a: "Your diagnosis or symptoms, any treatment you’ve already had, where you’d like to be treated, and when you hope to travel. Medical reports can be shared once a coordinator contacts you.",
  },
  {
    q: "Is this an emergency service?",
    a: "We can arrange urgent medical evacuations, but we are not a first-response service. In a medical emergency, call your local emergency number first.",
  },
  {
    q: "Who sees my medical information?",
    a: "Only your coordinator and the hospitals you agree to share it with. We don’t pass your details to anyone else.",
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; subject?: string }>;
}) {
  const { topic = "patient", subject = "" } = await searchParams;

  return (
    <>
      <section className="graticule -mt-[72px] pt-[72px]">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 lg:pt-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="text-[clamp(2.6rem,6vw,4.4rem)] font-semibold leading-[1.02]">Contact us</h1>
              <p className="mt-4 max-w-[52ch] text-lg text-ink-soft">
                Questions about treatment, help finding the right hospital, or a partnership — a real person reads every
                message.
              </p>
            </div>
            <a
              href={whatsapp.link()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-pill border border-line bg-white py-2 pl-3 pr-5 shadow-[0_8px_24px_-16px_rgb(23_57_74/0.5)] hover:border-ink"
            >
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-care text-white">
                <MessageCircle className="h-5 w-5" />
                <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-pulse-dot rounded-full border-2 border-white bg-care" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm text-ink-mute">Patient support, 24/7</span>
                <span className="block font-semibold">WhatsApp {whatsapp.display}</span>
              </span>
            </a>
          </div>

          {/* Routes */}
          <nav aria-label="Choose your inquiry type" className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {routes.map(({ topic: t, icon: Icon, title, body }) => {
              const active = t === topic;
              return (
                <Link
                  key={t}
                  href={`/contact?topic=${t}#inquiry`}
                  scroll={false}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "group rounded-[20px] border p-5 transition-colors",
                    active ? "border-ink bg-ink text-paper" : "border-line bg-white hover:border-ink/50",
                  )}
                >
                  <Icon className={cn("h-5 w-5", active ? "text-signal" : "text-signal-deep")} aria-hidden />
                  <p className="mt-4 font-semibold">{title}</p>
                  <p className={cn("mt-1 text-sm", active ? "text-paper/70" : "text-ink-soft")}>{body}</p>
                </Link>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Form + direct lines */}
      <section id="inquiry" className="mx-auto max-w-7xl scroll-mt-24 px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
          <div className="rounded-[28px] border border-line bg-white p-6 sm:p-10">
            <h2 className="text-2xl font-semibold sm:text-3xl">Send an inquiry</h2>
            <p className="mt-2 text-ink-soft">Fields are all required unless marked optional.</p>
            <div className="mt-8">
              <ContactForm key={topic} defaultTopic={topic} defaultSubject={subject} />
            </div>
          </div>

          <aside className="space-y-8 lg:pt-4">
            <div>
              <h2 className="text-2xl font-semibold">Prefer to talk?</h2>
              <p className="mt-2 text-ink-soft">
                Call any office during local hours. Outside them, WhatsApp reaches the on-call coordinator.
              </p>
            </div>
            <dl className="divide-y divide-line border-y border-line">
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="text-ink-soft">WhatsApp, any time</dt>
                <dd>
                  <a href={whatsapp.link()} target="_blank" rel="noreferrer" className="font-semibold hover:underline">
                    {whatsapp.display}
                  </a>
                </dd>
              </div>
              {offices.map((o) => (
                <div key={o.id} className="flex items-center justify-between gap-4 py-4">
                  <dt className="text-ink-soft">{o.country}</dt>
                  <dd>
                    <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="font-semibold tabular-nums hover:underline">
                      {o.phone}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="rounded-[22px] bg-mist p-6">
              <Siren className="h-5 w-5 text-signal-deep" aria-hidden />
              <p className="mt-3 font-semibold">Medical emergency?</p>
              <p className="mt-1 text-sm text-ink-soft">
                Call your local emergency number first. Once you’re safe, we can help arrange transfer to a partner
                hospital.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Offices */}
      <section className="mx-auto mt-24 max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold sm:text-4xl">Our offices</h2>
          <p className="max-w-md text-ink-soft">Three regional teams, so someone is usually working when you write.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {offices.map((o) => (
            <OfficeCard key={o.id} office={o} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-24 grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-3xl font-semibold sm:text-4xl">Before you write</h2>
          <p className="mt-3 text-ink-soft">Answers to what patients ask us most.</p>
        </div>
        <Faq items={faqs} />
      </section>
    </>
  );
}
