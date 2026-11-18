import "server-only";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import nodemailer from "nodemailer";
import { emailConfig as env } from "./config";
import type { RenderedEmail } from "./layout";

// Standard SMTP transport — works unmodified against Mailpit locally (no auth,
// just host/port) and against Hostinger's SMTP relay (or any other provider)
// in production.
//
// Use port 465 with SMTP_SECURE=true (implicit TLS) for Hostinger/Titan: their
// port-587 relay intermittently fails nodemailer's STARTTLS upgrade with
// "wrong version number"; 465 sidesteps STARTTLS entirely.
//
// We resolve the SMTP host ourselves and hand nodemailer the IP. Nodemailer
// otherwise filters DNS results by the families it sees on os.networkInterfaces(),
// and Hostinger's sandbox hides the real interfaces, so every address is discarded
// ("Failed to resolve IPv4 addresses with current network") and the send fails.
// TLS still verifies the certificate against the real hostname via `servername`.
async function createTransport() {
  let host = env.SMTP_HOST;
  if (!isIP(host)) {
    try {
      host = (await lookup(env.SMTP_HOST, { family: 4 })).address;
    } catch {
      // No IPv4 record; let nodemailer try with the hostname as before.
    }
  }
  return nodemailer.createTransport({
    host,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    tls: { servername: env.SMTP_HOST },
    auth: env.SMTP_USER && env.SMTP_PASSWORD ? { user: env.SMTP_USER, pass: env.SMTP_PASSWORD } : undefined,
  });
}

type SendEmailInput = RenderedEmail & {
  to: string | string[];
  /** Where replies go — e.g. the patient's address on a team notification. */
  replyTo?: string;
};

/**
 * Returns whether the email actually went out. Never throws: callers decide
 * what a failed send means for the request that triggered it.
 */
export async function sendEmail(input: SendEmailInput): Promise<boolean> {
  try {
    const transporter = await createTransport();
    await transporter.sendMail({ from: env.SMTP_FROM, ...input });
    return true;
  } catch (err) {
    console.error("[email] Failed to send", { to: input.to, subject: input.subject, err });
    return false;
  }
}

/** The team inbox(es) that receive website enquiries. */
export const teamInbox = () =>
  env.EMAIL_TEAM_TO.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
