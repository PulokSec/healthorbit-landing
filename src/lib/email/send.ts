import "server-only";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import nodemailer from "nodemailer";
import { emailConfig as env } from "./config";
import type { RenderedEmail } from "./layout";

/** Which mailbox a form sends from (and logs in as). See config.ts. */
export type Mailbox = "info" | "care";

const mailboxAddress = (m: Mailbox) => (m === "care" ? env.EMAIL_CARE_ADDRESS : env.EMAIL_INFO_ADDRESS);

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
async function createTransport(user: string) {
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
    auth: env.SMTP_PASSWORD ? { user, pass: env.SMTP_PASSWORD } : undefined,
  });
}

type SendEmailInput = RenderedEmail & {
  from: Mailbox;
  to: string | string[];
  /** Where replies go — e.g. the patient's address on a team notification. */
  replyTo?: string;
};

/**
 * Returns whether the email actually went out. Never throws: callers decide
 * what a failed send means for the request that triggered it.
 */
export async function sendEmail({ from, ...input }: SendEmailInput): Promise<boolean> {
  const address = mailboxAddress(from);
  try {
    const transporter = await createTransport(address);
    await transporter.sendMail({ from: { name: env.EMAIL_FROM_NAME, address }, ...input });
    return true;
  } catch (err) {
    console.error("[email] Failed to send", { to: input.to, subject: input.subject, err });
    return false;
  }
}

/** The care team's inbox, which receives every website enquiry. */
export const teamInbox = () => env.EMAIL_CARE_ADDRESS;
