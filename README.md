# HealthOrbit

Public website for HealthOrbit, a medical travel coordinator. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Zod and lucide-react.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Fonts (Sora, Instrument Sans) come from npm `@fontsource-variable` packages, so builds work offline.

## Pages

| Route | What it does |
| --- | --- |
| `/` | Orbit hero, audiences, featured hospitals, country grid, services, process, contact strip |
| `/health-network` | Searchable, filterable network. `?country=India` and `?q=` deep-link |
| `/health-network/[slug]` | 117 statically generated hospital pages with a prefilled inquiry form |
| `/contact` | Topic cards (`?topic=patient\|referral\|insurer\|provider`), inquiry form, direct lines, live office cards, FAQ |
| `/about` | Mission, stats, principles |

## Before going live

1. **Contact details** – `src/data/contact.ts`. Phone numbers and addresses mirror the parent company; the `@healthorbit.com` emails and social links are placeholders.
2. **Email** – set `SMTP_PASSWORD` (shared by both mailboxes) and the other `SMTP_*` vars from `.env.example`. The contact page's consultation form sends from and logs in as `info@healthorbit.support`; the enquiry form on hospital pages sends from `care@healthorbit.support`. Every team notification from both forms is delivered to `care@healthorbit.support`.
3. **Terms and privacy** – the form links to `/terms` and `/privacy`, which don't exist yet.
4. **Network data** – `src/data/network.ts`. Add `featured`, `highlight` and `specialties` to promote a hospital to the home page and hero orbit.

## Structure

```
src/
  app/            routes, layout, globals.css (design tokens in @theme)
  components/     header (mega menu), footer, orbit-hero, network-explorer,
                  consultation-form, contact-form, office-card, faq, facility-card, ui/button
  data/           network.ts, contact.ts
  lib/            form schemas (Zod), email/ (SMTP + templates), utils.ts
```

## Notes

- Reduced-motion preference disables the orbit and transitions.
