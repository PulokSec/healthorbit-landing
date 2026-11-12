import { z } from "zod";

export const topics = [
  { value: "patient", label: "I’m a patient or family member" },
  { value: "referral", label: "I want to refer patients" },
  { value: "provider", label: "My hospital wants to join" },
  { value: "other", label: "Something else" },
] as const;

export const channels = ["WhatsApp", "Email", "Phone call", "No preference"] as const;

export const inquirySchema = z.object({
  topic: z.enum(topics.map((t) => t.value) as [string, ...string[]]),
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter an email address like name@example.com."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s()-]{7,20}$/, "Enter a phone number with country code, e.g. +880 1712 345678."),
  channel: z.enum(channels),
  subject: z.string().trim().max(140).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more — at least a sentence.").max(4000),
  consent: z.literal("on", { errorMap: () => ({ message: "Accept the terms so we can contact you." }) }),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type FieldErrors = Partial<Record<keyof InquiryInput, string>>;

export type InquiryState =
  | { status: "idle" }
  | { status: "error"; errors: FieldErrors; message?: string }
  | { status: "success"; reference: string; channel: string };
