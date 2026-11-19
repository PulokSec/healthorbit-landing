import "server-only";
import { z } from "zod";

// SMTP settings — deliberately generic (host/port/user/pass/secure), so moving
// from Mailpit in development to Hostinger (or any other provider) in
// production is purely an env change. Mailpit's defaults: SMTP on
// localhost:1025, no auth, web UI at http://localhost:8025.
const schema = z.object({
  SMTP_HOST: z.string().default("localhost"),
  SMTP_PORT: z.coerce.number().default(1025),
  // "true"/"false" from .env — z.coerce.boolean() would treat "false" as true.
  SMTP_SECURE: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
  // One password shared by every mailbox below. Leave blank for Mailpit (no auth).
  SMTP_PASSWORD: z.string().optional(),

  // Each form sends from its own mailbox, which is also the SMTP login, since
  // Hostinger only relays mail whose From matches the authenticated mailbox.
  //   info — the contact page's consultation form
  //   care — call-back requests
  // Every team notification, from either form, goes to the care mailbox.
  EMAIL_FROM_NAME: z.string().default("HealthOrbit"),
  EMAIL_INFO_ADDRESS: z.string().email().default("info@healthorbit.support"),
  EMAIL_CARE_ADDRESS: z.string().email().default("care@healthorbit.support"),

  // Absolute site URL, used for the logo and links inside emails.
  // Accepts a bare domain ("healthorbit.support") by assuming https.
  SITE_URL: z
    .preprocess((v) => (typeof v === "string" && v && !/^https?:\/\//.test(v) ? `https://${v}` : v), z.string().url())
    .default("http://localhost:3000"),
});

const input = {
  ...process.env,
  // Treat empty strings in .env as "not set".
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || undefined,
  SITE_URL: process.env.SITE_URL || undefined,
  EMAIL_INFO_ADDRESS: process.env.EMAIL_INFO_ADDRESS || undefined,
  EMAIL_CARE_ADDRESS: process.env.EMAIL_CARE_ADDRESS || undefined,
};

// A malformed value must not crash the module: that takes the whole form action
// down with an opaque server error. Log what's wrong and fall back to defaults
// for just those fields instead.
const parsed = schema.safeParse(input);
if (!parsed.success) {
  console.error(
    "[email] Invalid email env vars, using defaults for:",
    parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
  );
}
const badKeys = new Set(parsed.success ? [] : parsed.error.issues.map((i) => String(i.path[0])));

export const emailConfig = parsed.success
  ? parsed.data
  : schema.parse(Object.fromEntries(Object.entries(input).filter(([k]) => !badKeys.has(k))));
