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
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.string().default("HealthOrbit <no-reply@healthorbit.com>"),

  // Team inbox that receives website enquiries. Comma-separate several addresses.
  EMAIL_TEAM_TO: z.string().default("bd@healthorbit.com"),

  // Absolute site URL, used for the logo and links inside emails.
  // Accepts a bare domain ("healthorbit.support") by assuming https.
  SITE_URL: z
    .preprocess((v) => (typeof v === "string" && v && !/^https?:\/\//.test(v) ? `https://${v}` : v), z.string().url())
    .default("http://localhost:3000"),
});

const input = {
  ...process.env,
  // Treat empty strings in .env as "not set".
  SMTP_USER: process.env.SMTP_USER || undefined,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || undefined,
  SITE_URL: process.env.SITE_URL || undefined,
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
