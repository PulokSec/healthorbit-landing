"use server";

import { inquirySchema, type FieldErrors, type InquiryState } from "@/lib/inquiry-schema";

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

  // TODO: deliver the inquiry — e.g. Resend/SES email, CRM webhook, or a DB insert.
  // await fetch(process.env.INQUIRY_WEBHOOK_URL!, { method: "POST", body: JSON.stringify(parsed.data) });
  await new Promise((r) => setTimeout(r, 700));

  const reference = `HO-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  return { status: "success", reference, channel: parsed.data.channel };
}
