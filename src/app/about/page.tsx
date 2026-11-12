import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, HeartHandshake, Hospital, Plane, Stethoscope, UsersRound } from "lucide-react";
import { networkStats } from "@/data/network";

export const metadata: Metadata = {
  title: "About us",
  description:
    "HealthOrbit bridges the gap between patients and quality healthcare across borders, guiding you every step of the way.",
};

const pillars = [
  { icon: Stethoscope, title: "Right Doctors", body: "Connect with experienced and relevant specialists" },
  { icon: CalendarDays, title: "Treatment Planning", body: "Get the most suitable treatment options" },
  { icon: Plane, title: "Travel Coordination", body: "Hassle-free arrangements for your medical trip" },
  { icon: UsersRound, title: "Ongoing Support", body: "Guidance and care before, during, and after your treatment" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-[72px] overflow-hidden bg-gradient-to-br from-white via-paper to-mist pt-[72px]">
        <div className="relative h-64 sm:h-80 lg:absolute lg:bottom-0 lg:right-0 lg:top-[72px] lg:h-auto lg:w-[52%]">
          <Image
            src="/images/pages/about-hero.jpg"
            alt="A doctor talking with a mother and her son"
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover lg:[clip-path:ellipse(100%_135%_at_100%_50%)]"
          />
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-8 lg:py-24">
          <div className="lg:max-w-[46%]">
            <span className="inline-block rounded-pill bg-care/12 px-3.5 py-1.5 text-sm font-semibold text-ink">
              About Us
            </span>
            <h1 className="mt-5 text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.08]">
              Connecting You to Better Healthcare. Guiding You{" "}
              <span className="text-care">Every Step of the Way.</span>
            </h1>
            <p className="mt-6 max-w-[48ch] text-lg text-ink-soft">
              At HealthOrbit, we believe that access to the right healthcare should never feel out of reach.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Story, commitment, stat */}
        <section className="grid gap-10 py-16 lg:grid-cols-[1fr_1fr_0.8fr] lg:gap-0">
          <div className="space-y-5 text-ink-soft lg:border-r lg:border-line lg:pr-10">
            <p>
              We understand the uncertainty and frustration that come with being unable to connect with the right
              doctors, access specialized medical expertise, or receive the treatment you truly need. We know that
              behind every search for healthcare is a person seeking answers, a family looking for reassurance, and a
              hope for a healthier future.
            </p>
            <p>
              HealthOrbit was founded with a clear purpose: to bridge the gap between patients and quality healthcare
              across borders.
            </p>
            <p>
              Through our network of {networkStats.partners} vetted hospitals and trusted healthcare partners, we help
              patients navigate their medical journeys with greater confidence, clarity, and peace of mind — from
              identifying the right specialists and coordinating appointments to managing travel arrangements and
              providing ongoing support.
            </p>
          </div>

          <div className="lg:px-10">
            <h2 className="flex items-center gap-3 text-2xl font-semibold text-care">
              <HeartHandshake className="h-8 w-8 shrink-0" aria-hidden />
              Our Commitment to You
            </h2>
            <div className="mt-5 space-y-5 text-ink-soft">
              <p>
                We recognize that no two patients are alike. Every medical journey comes with its own challenges,
                expectations, and concerns. That is why we are fully committed to identifying the best possible
                healthcare solutions for each patient, with a personalized approach built around their needs and
                well-being.
              </p>
              <p>
                Our commitment goes beyond facilitating medical travel. We strive to provide compassionate guidance,
                transparent communication, and dependable support at every stage of the journey, so you and your family
                feel informed, supported, and confident in the decisions you make.
              </p>
            </div>
          </div>

          <aside className="relative flex min-h-[22rem] flex-col overflow-hidden rounded-[22px] bg-gradient-to-b from-mist to-paper">
            <div className="relative z-10 p-7">
              <div className="flex items-center gap-4 border-b border-care/25 pb-5">
                <Hospital className="h-14 w-14 shrink-0 text-care" strokeWidth={1.5} aria-hidden />
                <p className="leading-tight">
                  <span className="block font-display text-5xl font-semibold text-ink">{networkStats.partners}</span>
                  <span className="text-xl font-semibold">Vetted Hospitals</span>
                </p>
              </div>
              <p className="mt-5 max-w-[24ch] text-ink-soft">
                A carefully selected network of trusted and globally recognized hospitals.
              </p>
            </div>
            <div className="relative mt-auto h-40">
              <Image
                src="/images/pages/about-hospital.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="object-cover object-bottom"
              />
              <div aria-hidden className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-mist to-mist/0" />
            </div>
          </aside>
        </section>

        {/* Pillars */}
        <section className="border-t border-line py-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {pillars.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="flex gap-4 lg:border-r lg:border-line lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-care/12 text-care">
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-ink-soft">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Tagline banner */}
        <section className="relative mt-4 overflow-hidden rounded-[24px] bg-gradient-to-r from-[#0f5f56] to-care px-8 py-10 text-white sm:px-12">
          <p className="relative z-10 max-w-[28ch] text-2xl font-semibold italic sm:max-w-none sm:text-3xl">
            HealthOrbit — A World of Healthcare, Within Your Reach.
          </p>
          <svg
            aria-hidden
            viewBox="0 0 400 160"
            className="pointer-events-none absolute -right-6 top-1/2 hidden h-[180%] -translate-y-1/2 text-white md:block"
          >
            <circle cx="300" cy="150" r="120" fill="currentColor" opacity="0.08" />
            <circle cx="300" cy="150" r="88" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="2 6" />
            <path
              d="M40 150 C 120 120, 190 70, 300 40"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.7"
              strokeWidth="2"
              strokeDasharray="5 6"
            />
          </svg>
          <Plane
            aria-hidden
            className="pointer-events-none absolute right-[4.5rem] top-5 hidden h-9 w-9 rotate-12 text-white md:block"
          />
        </section>
      </div>
    </>
  );
}
