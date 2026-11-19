"use server";

import { callbackSchema, type CallbackErrors, type CallbackState } from "@/lib/callback-schema";
import {
  consultationSchema,
  type ConsultationErrors,
  type ConsultationState,
} from "@/lib/consultation-schema";
import { sendEmail, teamInbox } from "@/lib/email/send";
import {
  callbackAckEmail,
  callbackTeamEmail,
  consultationAckEmail,
  consultationTeamEmail,
} from "@/lib/email/templates";

const newReference = () => `HO-${Date.now().toString(36).toUpperCase().slice(-6)}`;
const deliveryFailed =
  "We couldn’t send your message just now. Please try again in a few minutes, or message us on WhatsApp.";

export async function submitCallback(_prev: CallbackState, formData: FormData): Promise<CallbackState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = callbackSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: CallbackErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof CallbackErrors;
      errors[key] ??= issue.message;
    }
    return { status: "error", errors, message: "Check the highlighted fields and send again." };
  }

  // Honeypot: bots fill hidden fields, people don't.
  if (formData.get("company_website")) return { status: "success", reference: "HO-000000" };

  const reference = newReference();
  const d = parsed.data;

  // Goes out from, and to, the care mailbox. The care team must receive it; the
  // sender's acknowledgement is best-effort and only if they gave an email.
  const delivered = await sendEmail({
    from: "care",
    to: teamInbox(),
    replyTo: d.email || undefined,
    ...callbackTeamEmail(d, reference),
  });
  if (!delivered) return { status: "error", errors: {}, message: deliveryFailed };
  if (d.email) await sendEmail({ from: "care", to: d.email, ...callbackAckEmail(d, reference) });

  return { status: "success", reference };
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
    from: "info",
    to: teamInbox(),
    replyTo: d.email || undefined,
    ...consultationTeamEmail(d, reference),
  });
  if (!delivered) return { status: "error", errors: {}, message: deliveryFailed };
  if (d.email) await sendEmail({ from: "info", to: d.email, ...consultationAckEmail(d, reference) });

  return { status: "success", reference };
}
