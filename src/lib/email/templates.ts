import { emailConfig } from "./config";
import { renderEmail, type RenderedEmail } from "./layout";
import type { CallbackInput } from "@/lib/callback-schema";
import type { ConsultationInput } from "@/lib/consultation-schema";
import { whatsapp } from "@/data/contact";

// Each form produces two emails: a notification the team receives (reply-to is
// the sender, so "Reply" goes straight to them) and an acknowledgement for the
// sender. Templates only build content blocks; layout.ts handles the design.

const site = () => emailConfig.SITE_URL.replace(/\/$/, "");
const firstName = (name: string) => name.trim().split(/\s+/)[0];
const submittedAt = () =>
  new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Dhaka" }) + " (Dhaka)";

/* ---------- Call-back request (care team) ---------- */

export function callbackTeamEmail(d: CallbackInput, reference: string): RenderedEmail {
  return renderEmail({
    subject: `Call-back request ${reference}: ${d.fullName}${d.context ? ` — ${d.context}` : ""}`,
    preheader: `Call ${d.phone} · ${d.callTime}`,
    blocks: [
      { type: "heading", text: "Please call this person back" },
      { type: "paragraph", text: `${d.fullName} asked for a call back.` },
      {
        type: "details",
        title: "Call back",
        rows: [
          ["Reference", reference],
          ["Name", d.fullName],
          ["Phone / WhatsApp", d.phone],
          ["Email", d.email],
          ["Best time", d.callTime],
          ["About", d.context],
          ["Received", submittedAt()],
        ],
      },
      { type: "button", label: "Open WhatsApp chat", href: `https://wa.me/${d.phone.replace(/[^0-9]/g, "")}` },
    ],
  });
}

export function callbackAckEmail(d: CallbackInput, reference: string): RenderedEmail {
  return renderEmail({
    subject: `We’ll call you back (${reference})`,
    preheader: "Our care team will phone you, usually within a day.",
    blocks: [
      { type: "heading", text: `Thank you, ${firstName(d.fullName)}` },
      {
        type: "paragraph",
        text: `We’ve received your call-back request. Our care team will phone you on ${d.phone}, usually within a day.`,
      },
      {
        type: "details",
        title: "Your request",
        rows: [
          ["Reference", reference],
          ["Best time", d.callTime],
          ["About", d.context],
        ],
      },
      { type: "paragraph", text: "Rather not wait? Message us on WhatsApp and quote your reference." },
      { type: "button", label: "Chat on WhatsApp", href: whatsapp.link(`Hi HealthOrbit, following up on call-back ${reference}.`) },
    ],
  });
}

/* ---------- Consultation booking form ---------- */

const when = (d: ConsultationInput) => [d.preferredDate, d.preferredTime].filter(Boolean).join(" at ") || undefined;

export function consultationTeamEmail(d: ConsultationInput, reference: string): RenderedEmail {
  return renderEmail({
    subject: `New consultation request ${reference}: ${d.treatment} in ${d.destination} — ${d.fullName}`,
    preheader: `${d.consultationType} consultation · ${d.treatment} · ${d.destination}`,
    blocks: [
      { type: "heading", text: "New consultation request" },
      {
        type: "paragraph",
        text: d.email
          ? `${d.fullName} asked for a consultation. Reply to this email to answer them directly.`
          : `${d.fullName} asked for a consultation and gave no email address, so contact them by phone or WhatsApp.`,
      },
      {
        type: "details",
        title: "Request",
        rows: [
          ["Reference", reference],
          ["Name", d.fullName],
          ["Phone / WhatsApp", d.phone],
          ["Email", d.email],
          ["Consultation", d.consultationType],
          ["Treatment", d.treatment],
          ["Destination", d.destination],
          ["Preferred time", when(d)],
          ["Received", submittedAt()],
        ],
      },
      ...(d.message ? [{ type: "quote" as const, label: "Message", text: d.message }] : []),
      { type: "button", label: "Open WhatsApp chat", href: `https://wa.me/${d.phone.replace(/[^0-9]/g, "")}` },
    ],
  });
}

export function consultationAckEmail(d: ConsultationInput, reference: string): RenderedEmail {
  return renderEmail({
    subject: `Your consultation request (${reference})`,
    preheader: "Our team will contact you to confirm your consultation.",
    blocks: [
      { type: "heading", text: `Thank you, ${firstName(d.fullName)}` },
      {
        type: "paragraph",
        text: "We’ve received your consultation request. Our team will contact you on the number you gave us to confirm the details and next steps.",
      },
      {
        type: "details",
        title: "Your request",
        rows: [
          ["Reference", reference],
          ["Consultation", d.consultationType],
          ["Treatment", d.treatment],
          ["Destination", d.destination],
          ["Preferred time", when(d)],
        ],
      },
      { type: "button", label: "Browse our hospital network", href: `${site()}/health-network` },
      { type: "note", text: "Please don’t reply with medical reports. We’ll share a secure way to send documents when they’re needed." },
    ],
  });
}
