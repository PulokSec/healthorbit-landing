import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, HandCoins, Hospital, MessageCircle, Search, Siren, UserRound } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { OfficeCard } from "@/components/office-card";
import { offices, whatsapp } from "@/data/contact";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Reach a HealthOrbit coordinator by WhatsApp, phone, email, or the inquiry form.",
};

type Route = { title: string; body: string; icon: typeof UserRound } & ({ topic: string } | { href: string });

const routes: Route[] = [
  { topic: "patient", icon: UserRound, title: "I’m a patient", body: "Get matched with a hospital, specialist or treatment within 24 hours." },
  { href: "/health-network", icon: Search, title: "Find a hospital", body: "Browse accredited partner hospitals by country and specialty." },
  { topic: "referral", icon: HandCoins, title: "I refer patients", body: "Earn commission when patients you refer are treated at a partner hospital." },
  { topic: "provider", icon: Hospital, title: "My hospital wants to join", body: "List your hospital, clinic or practice for international patients." },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; subject?: string }>;
}) {
  const { topic = "patient", subject = "" } = await searchParams;

  return (
    <>
      {/* Hero: form + photo */}
      <section id="inquiry" className="graticule -mt-[72px] scroll-mt-0 pt-[72px]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:pt-14">
          <div>
            <h1 className="text-[clamp(2.6rem,6vw,4.4rem)] font-semibold leading-[1.02]">Contact us</h1>
            <p className="mt-4 max-w-[52ch] text-lg text-ink-soft">
              Questions about treatment, help finding the right hospital, or a partnership — a real person reads every
              message and usually replies within a few hours.
            </p>
            <div className="mt-8 rounded-[28px] border border-line bg-white p-6 sm:p-10">
              <ContactForm key={topic} defaultTopic={topic} defaultSubject={subject} />
            </div>
          </div>

          <div className="relative hidden overflow-hidden rounded-[28px] bg-mist lg:block">
            <Image
              src="/images/pages/contact.jpg"
              alt="A woman smiling as she reads a message on her phone"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <a
              href={whatsapp.link()}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-x-6 bottom-6 flex items-center gap-3 rounded-[20px] bg-white/95 p-4 shadow-[0_12px_30px_-16px_rgb(23_57_74/0.6)] backdrop-blur hover:bg-white"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-care text-white">
                <MessageCircle className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm text-ink-mute">Prefer to chat? WhatsApp us</span>
                <span className="block font-semibold">{whatsapp.display}</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Routes */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="text-3xl font-semibold sm:text-4xl">Find exactly what you’re looking for</h2>
        <p className="mt-3 max-w-xl text-ink-soft">Skip the form and go straight to what you need.</p>
        <nav aria-label="Choose your inquiry type" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {routes.map((r) => {
            const Icon = r.icon;
            const active = "topic" in r && r.topic === topic;
            return (
              <Link
                key={r.title}
                href={"topic" in r ? `/contact?topic=${r.topic}#inquiry` : r.href}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "group flex flex-col rounded-[22px] border p-6 transition-colors",
                  active ? "border-ink bg-ink text-paper" : "border-line bg-white hover:border-ink/50",
                )}
              >
                <span className="flex items-start justify-between">
                  <span
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-2xl",
                      active ? "bg-paper/10 text-signal" : "bg-care/12 text-care",
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </span>
                <span className="mt-5 text-lg font-semibold">{r.title}</span>
                <span className={cn("mt-1 text-sm", active ? "text-paper/70" : "text-ink-soft")}>{r.body}</span>
              </Link>
            );
          })}
        </nav>
      </section>

      {/* Presence */}
      <section className="mx-auto mt-24 max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-3xl font-semibold sm:text-4xl">Discover our presence</h2>
            <p className="mt-3 max-w-md text-ink-soft">
              Our team in Dhaka coordinates every patient journey, with one mission: making specialised care abroad
              accessible.
            </p>
          </div>
          {offices.map((o) => (
            <OfficeCard key={o.id} office={o} />
          ))}
          <div className="flex flex-col self-start rounded-[22px] bg-mist p-6">
            <Siren className="h-5 w-5 text-signal-deep" aria-hidden />
            <p className="mt-3 font-semibold">Medical emergency?</p>
            <p className="mt-1 text-sm text-ink-soft">
              Call your local emergency number first. Once you’re safe, we can help arrange transfer to a partner
              hospital.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
