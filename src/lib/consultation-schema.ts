import { z } from "zod";

export const consultationTypes = ["Online", "In-person"] as const;

export const treatmentCategories = [
  "Cardiology & Cardiac Surgery",
  "Oncology",
  "Neurology & Neurosurgery",
  "Orthopaedics",
  "Fertility & IVF",
  "Gastroenterology",
  "Ophthalmology",
  "Paediatrics",
  "General Surgery",
  "Rehabilitation",
  "Diagnostics & Health Check-ups",
  "Not sure",
] as const;

export const consultationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s()-]{7,20}$/, "Enter a number with country code, e.g. +880 1712 345678."),
  email: z.string().trim().email("Enter an email address like name@example.com.").optional().or(z.literal("")),
  consultationType: z.enum(consultationTypes),
  treatment: z.string().trim().min(1, "Choose a treatment category."),
  destination: z.string().trim().min(1, "Choose a destination."),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().trim().max(1000).optional(),
  privacyConsent: z.literal("on", { errorMap: () => ({ message: "Agree to the Privacy Notice so we can contact you." }) }),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
export type ConsultationErrors = Partial<Record<keyof ConsultationInput, string>>;

export type ConsultationState =
  | { status: "idle" }
  | { status: "error"; errors: ConsultationErrors; message?: string }
  | { status: "success"; reference: string };
