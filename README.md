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
2. **Inquiry delivery** – `src/app/contact/actions.ts` validates with Zod but only simulates sending. Replace the `TODO` with email (Resend/SES), a CRM webhook or a DB insert.
3. **Terms and privacy** – the form links to `/terms` and `/privacy`, which don't exist yet.
4. **Network data** – `src/data/network.ts`. Add `featured`, `highlight` and `specialties` to promote a hospital to the home page and hero orbit.

## Structure

```
src/
  app/            routes, layout, globals.css (design tokens in @theme)
  components/     header (mega menu), footer, orbit-hero, network-explorer,
                  contact-form, office-card, faq, facility-card, ui/button
  data/           network.ts, contact.ts
  lib/            inquiry-schema.ts (shared Zod schema), utils.ts
```

## Notes

- Reduced-motion preference disables the orbit and transitions.
- The contact form uses `AnimatePresence mode="popLayout"`; `mode="wait"` hangs after the channel pill animates (see comment in `contact-form.tsx`).
