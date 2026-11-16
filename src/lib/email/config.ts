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
  SITE_URL: z.string().url().default("http://localhost:3000"),
});

export const emailConfig = schema.parse({
  ...process.env,
  // Treat empty strings in .env as "not set".
  SMTP_USER: process.env.SMTP_USER || undefined,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || undefined,
});
