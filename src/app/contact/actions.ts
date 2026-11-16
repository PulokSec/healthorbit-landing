"use server";

import { inquirySchema, type FieldErrors, type InquiryState } from "@/lib/inquiry-schema";
import {
  consultationSchema,
  type ConsultationErrors,
  type ConsultationState,
} from "@/lib/consultation-schema";
import { sendEmail, teamInbox } from "@/lib/email/send";
import {
  consultationAckEmail,
  consultationTeamEmail,
  enquiryAckEmail,
  enquiryTeamEmail,
} from "@/lib/email/templates";

const newReference = () => `HO-${Date.now().toString(36).toUpperCase().slice(-6)}`;
const deliveryFailed =
  "We couldn’t send your message just now. Please try again in a few minutes, or message us on WhatsApp.";

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = inquirySchema.safeParse(raw);

  if (!parsed.success) {
    const errors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof FieldErrors;
      errors[key] ??= issue.message;
    }
    return { status: "error", errors, message: "Check the highlighted fields and send again." };
  }

  // Honeypot: bots fill hidden fields, people don't.
  if (formData.get("company_website")) {
    return { status: "success", reference: "HO-000000", channel: parsed.data.channel };
  }

  const reference = newReference();
  const d = parsed.data;

  // The team must receive the enquiry; if that fails, tell the sender rather than
  // pretend it went through. The sender's acknowledgement is best-effort.
  const delivered = await sendEmail({ to: teamInbox(), replyTo: d.email, ...enquiryTeamEmail(d, reference) });
  if (!delivered) return { status: "error", errors: {}, message: deliveryFailed };
  await sendEmail({ to: d.email, ...enquiryAckEmail(d, reference) });

  return { status: "success", reference, channel: d.channel };
}

export async function submitConsultation(
  _prev: ConsultationState,
  formData: FormData,
): Promise<ConsultationState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = consultationSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: ConsultationErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ConsultationErrors;
      errors[key] ??= issue.message;
    }
    return { status: "error", errors, message: "Check the highlighted fields and submit again." };
  }

  // Honeypot: bots fill hidden fields, people don't.
  if (formData.get("company_website")) return { status: "success", reference: "HO-000000" };

  const reference = newReference();
  const d = parsed.data;

  const delivered = await sendEmail({
    to: teamInbox(),
    replyTo: d.email || undefined,
    ...consultationTeamEmail(d, reference),
  });
  if (!delivered) return { status: "error", errors: {}, message: deliveryFailed };
  if (d.email) await sendEmail({ to: d.email, ...consultationAckEmail(d, reference) });

  return { status: "success", reference };
}
