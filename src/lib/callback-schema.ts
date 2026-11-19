import { z } from "zod";

export const callTimes = ["Any time", "Morning", "Afternoon", "Evening"] as const;

// Just enough to phone someone back. The care team gathers the details on the call.
export const callbackSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s()-]{7,20}$/, "Enter a number with country code, e.g. +880 1712 345678."),
  email: z.string().trim().email("Enter an email address like name@example.com.").optional().or(z.literal("")),
  callTime: z.enum(callTimes).default("Any time"),
  // Where the request came from, e.g. "Enquiry: Evercare Hospital Dhaka". Set by the page, not the visitor.
  context: z.string().trim().max(200).optional().or(z.literal("")),
  consent: z.literal("on", { errorMap: () => ({ message: "Agree to the Privacy Notice so we can call you." }) }),
});

export type CallbackInput = z.infer<typeof callbackSchema>;
export type CallbackErrors = Partial<Record<keyof CallbackInput, string>>;

export type CallbackState =
  | { status: "idle" }
  | { status: "error"; errors: CallbackErrors; message?: string }
  | { status: "success"; reference: string };
