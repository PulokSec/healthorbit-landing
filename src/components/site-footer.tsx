import Link from "next/link";
import { Logo } from "@/components/logo";
import { countries, flag } from "@/data/network";
import { offices, socials, whatsapp } from "@/data/contact";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-paper/70">
              We match international patients with accredited hospitals abroad and coordinate the trip from first
              inquiry to follow-up at home.
            </p>
            <a
              href={whatsapp.link()}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-pill bg-signal px-4 py-2 font-medium text-ink"
            >
              WhatsApp {whatsapp.display}
            </a>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-normal text-paper/55">Company</h2>
            <ul className="space-y-2.5">
              <li><Link href="/" className="hover:text-signal">Home</Link></li>
              <li><Link href="/about" className="hover:text-signal">About us</Link></li>
              <li><Link href="/health-network" className="hover:text-signal">Health network</Link></li>
              <li><Link href="/contact" className="hover:text-signal">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-normal text-paper/55">Work with us</h2>
            <ul className="space-y-2.5">
              <li><Link href="/contact?topic=referral" className="hover:text-signal">Become a referral partner</Link></li>
              <li><Link href="/contact?topic=provider" className="hover:text-signal">Join our hospital network</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-normal text-paper/55">Offices</h2>
            <ul className="space-y-3">
              {offices.map((o) => (
                <li key={o.id}>
                  <span className="mr-1.5" aria-hidden>{flag(o.code)}</span>
                  {o.city}
                  <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="block text-sm text-paper/60 hover:text-signal">
                    {o.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-paper/15 pt-8">
          <h2 className="mb-3 text-sm font-normal text-paper/55">Hospital locations</h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-paper/80">
            {countries.map((c) => (
              <li key={c.code}>
                <Link href={`/health-network?country=${encodeURIComponent(c.name)}`} className="hover:text-signal">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 text-sm text-paper/55 sm:flex-row">
          <p>© {new Date().getFullYear()} HealthOrbit. Not for medical emergencies — call your local emergency number.</p>
          <ul className="flex gap-4">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-signal">{s.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
