import { emailConfig } from "./config";
import { renderEmail, type RenderedEmail } from "./layout";
import { topics, type InquiryInput } from "@/lib/inquiry-schema";
import type { ConsultationInput } from "@/lib/consultation-schema";
import { whatsapp } from "@/data/contact";

// Each form produces two emails: a notification the team receives (reply-to is
// the sender, so "Reply" goes straight to them) and an acknowledgement for the
// sender. Templates only build content blocks; layout.ts handles the design.

const site = () => emailConfig.SITE_URL.replace(/\/$/, "");
const topicLabel = (v: string) => topics.find((t) => t.value === v)?.label ?? v;
const firstName = (name: string) => name.trim().split(/\s+/)[0];
const submittedAt = () =>
  new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Dhaka" }) + " (Dhaka)";

const channelPhrase: Record<string, string> = {
  WhatsApp: "on WhatsApp",
  Email: "by email",
  "Phone call": "by phone",
  "No preference": "by phone, email or WhatsApp",
};

/* ---------- Contact / hospital enquiry form ---------- */

export function enquiryTeamEmail(d: InquiryInput, reference: string): RenderedEmail {
  const subject = d.subject?.trim() || topicLabel(d.topic);
  return renderEmail({
    subject: `New enquiry ${reference}: ${subject} — ${d.fullName}`,
    preheader: d.message.slice(0, 120),
    blocks: [
      { type: "heading", text: "New website enquiry" },
      { type: "paragraph", text: `${d.fullName} sent an enquiry. Reply to this email to answer them directly.` },
      {
        type: "details",
        title: "Contact",
        rows: [
          ["Reference", reference],
          ["Name", d.fullName],
          ["Email", d.email],
          ["Phone", d.phone],
          ["Preferred channel", d.channel],
          ["Enquiry type", topicLabel(d.topic)],
          ["Subject", d.subject],
          ["Received", submittedAt()],
        ],
      },
      { type: "quote", label: "Message", text: d.message },
    ],
  });
}

export function enquiryAckEmail(d: InquiryInput, reference: string): RenderedEmail {
  return renderEmail({
    subject: `We’ve received your enquiry (${reference})`,
    preheader: "A patient support specialist will be in touch within 24 hours.",
    blocks: [
      { type: "heading", text: `Thank you, ${firstName(d.fullName)}` },
      {
        type: "paragraph",
        text: `We’ve received your enquiry and a patient support specialist will contact you ${channelPhrase[d.channel] ?? "soon"} within 24 hours.`,
      },
      {
        type: "details",
        title: "Your enquiry",
        rows: [
          ["Reference", reference],
          ["Enquiry type", topicLabel(d.topic)],
          ["Subject", d.subject],
        ],
      },
      { type: "quote", label: "Your message", text: d.message },
      { type: "paragraph", text: "Need to add something or speak to us sooner? Message us on WhatsApp and quote your reference." },
      { type: "button", label: "Chat on WhatsApp", href: whatsapp.link(`Hi HealthOrbit, following up on enquiry ${reference}.`) },
      { type: "note", text: "Please don’t reply with medical reports. We’ll share a secure way to send documents when they’re needed." },
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
