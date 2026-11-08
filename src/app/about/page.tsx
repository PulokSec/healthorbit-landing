import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { LogoMark } from "@/components/logo";
import { countries, networkStats } from "@/data/network";
import { offices } from "@/data/contact";

export const metadata: Metadata = {
  title: "About us",
  description: "HealthOrbit guides international patients to specialist treatment at accredited hospitals worldwide.",
};

const principles = [
  { title: "You choose, we inform", body: "We give you options with costs and trade-offs laid out, then respect the decision you make." },
  { title: "Vetted before listed", body: "Every partner is accredited and reviewed before we refer a single patient there." },
  { title: "No cost to patients", body: "Hospitals and partners fund our coordination, so patients never pay us a fee." },
  { title: "With you after you fly home", body: "Follow-up calls and video consultations continue until your recovery is on track." },
];

const officeList = offices.map((o) => o.country);
const officeSentence =
  officeList.length > 1 ? `${officeList.slice(0, -1).join(", ")} and ${officeList.at(-1)}` : officeList[0];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:pt-14">
      <section className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <h1 className="text-[clamp(2.6rem,6vw,4.4rem)] font-semibold leading-[1.02]">
            Travelling for treatment shouldn’t mean doing it alone.
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg text-ink-soft">
            HealthOrbit is a medical travel coordinator. We help patients reach specialised treatment at accredited
            hospitals abroad, whether it’s their first time considering care overseas or they’re facing a diagnosis that
            needs a specialist they can’t see at home.
          </p>
          <p className="mt-4 max-w-[58ch] text-lg text-ink-soft">
            One coordinator handles hospital selection, appointments, travel and follow-up, so patients and families can
            focus on getting well.
          </p>
        </div>
        <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center rounded-full bg-mist">
          <LogoMark className="h-1/2 w-1/2 text-ink" />
          <span className="absolute inset-6 rounded-full border border-dashed border-ink/25" aria-hidden />
        </div>
      </section>

      <section className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-line bg-line lg:grid-cols-4">
        {[
          [networkStats.partners, "vetted partner hospitals"],
          [networkStats.patients, "patients assisted"],
          [String(countries.length), "countries in the network"],
          [networkStats.rating, "average Google rating"],
        ].map(([n, l]) => (
          <div key={l} className="bg-paper p-6 sm:p-8">
            <p className="font-display text-3xl font-semibold sm:text-4xl">{n}</p>
            <p className="mt-1 text-ink-soft">{l}</p>
          </div>
        ))}
      </section>

      <section className="mt-24 grid gap-10 lg:grid-cols-[1fr_2fr]">
        <h2 className="text-3xl font-semibold sm:text-4xl">How we work</h2>
        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="border-t-2 border-ink pt-4">
              <dt className="text-lg font-semibold">{p.title}</dt>
              <dd className="mt-2 text-ink-soft">{p.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-24 rounded-[28px] bg-ink p-8 text-paper sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Teams in {offices.length} regions</h2>
            <p className="mt-3 max-w-lg text-paper/70">
              Offices in {officeSentence}, plus coordinators on call around the clock.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink href="/contact" variant="signal">Contact a coordinator</ButtonLink>
            <ButtonLink href="/health-network" className="bg-paper/10 text-paper hover:bg-paper/20">
              Browse the network
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
