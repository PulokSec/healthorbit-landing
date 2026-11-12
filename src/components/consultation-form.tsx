"use client";

import { useActionState, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, MessageCircle, ShieldCheck } from "lucide-react";
import { submitConsultation } from "@/app/contact/actions";
import {
  consultationTypes,
  treatmentCategories,
  type ConsultationState,
} from "@/lib/consultation-schema";
import { countries } from "@/data/network";
import { whatsapp } from "@/data/contact";
import { cn } from "@/lib/utils";

const initial: ConsultationState = { status: "idle" };

export function ConsultationForm({ defaultMessage = "" }: { defaultMessage?: string }) {
  const [state, action, pending] = useActionState(submitConsultation, initial);
  // Controlled so values survive a failed submit (React resets uncontrolled form fields).
  const [values, setValues] = useState({
    fullName: "",
    phone: "",
    email: "",
    consultationType: "Online" as (typeof consultationTypes)[number],
    treatment: "",
    destination: "",
    preferredDate: "",
    preferredTime: "",
    message: defaultMessage,
  });
  const [consent, setConsent] = useState(false);
  const set = (k: keyof typeof values) => (v: string) => setValues((s) => ({ ...s, [k]: v }));
  const errors = state.status === "error" ? state.errors : {};

  if (state.status === "success") {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center" role="status">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-care text-white">
          <Check className="h-8 w-8" strokeWidth={2.5} />
        </span>
        <h2 className="mt-6 text-2xl font-semibold">Enquiry received</h2>
        <p className="mx-auto mt-2 max-w-sm text-ink-soft">
          A member of our team will contact you to confirm your consultation. Your reference is{" "}
          <strong className="font-semibold text-ink">{state.reference}</strong>.
        </p>
        <a
          href={whatsapp.link(`Hi HealthOrbit, following up on enquiry ${state.reference}.`)}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-pill border border-ink/25 px-5 font-medium hover:border-ink"
        >
          <MessageCircle className="h-4 w-4" /> Follow up on WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <form action={action} noValidate>
      <div className="border-b border-line pb-5">
        <h2 className="text-2xl font-semibold sm:text-3xl">Book a Consultation</h2>
        <p className="mt-1.5 text-sm text-ink-soft">
          Fields marked with <span className="text-alert">*</span> are required.
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required error={errors.fullName}>
          {(id, d) => (
            <input id={id} name="fullName" autoComplete="name" maxLength={100} placeholder="Enter your full name"
              value={values.fullName} onChange={(e) => set("fullName")(e.target.value)}
              aria-invalid={!!errors.fullName} aria-describedby={d} className={inputCls(!!errors.fullName)} />
          )}
        </Field>
        <Field label="Mobile / WhatsApp" required error={errors.phone}>
          {(id, d) => (
            <input id={id} name="phone" type="tel" autoComplete="tel" placeholder="Include country code"
              value={values.phone} onChange={(e) => set("phone")(e.target.value)}
              aria-invalid={!!errors.phone} aria-describedby={d} className={inputCls(!!errors.phone)} />
          )}
        </Field>
        <Field label="Email address" error={errors.email}>
          {(id, d) => (
            <input id={id} name="email" type="email" autoComplete="email" placeholder="you@example.com"
              value={values.email} onChange={(e) => set("email")(e.target.value)}
              aria-invalid={!!errors.email} aria-describedby={d} className={inputCls(!!errors.email)} />
          )}
        </Field>

        <fieldset>
          <legend className="mb-2 text-sm font-medium">
            Consultation type <span className="text-alert">*</span>
          </legend>
          <div className="grid h-12 grid-cols-2 gap-1 rounded-xl bg-mist p-1">
            {consultationTypes.map((t) => (
              <label
                key={t}
                className={cn(
                  "flex cursor-pointer items-center justify-center rounded-lg text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal",
                  values.consultationType === t ? "bg-white font-semibold shadow-sm" : "text-ink-soft hover:text-ink",
                )}
              >
                <input type="radio" name="consultationType" value={t} checked={values.consultationType === t}
                  onChange={() => set("consultationType")(t)} className="sr-only" />
                {t}
              </label>
            ))}
          </div>
        </fieldset>

        <Field label="Treatment category" required error={errors.treatment}>
          {(id, d) => (
            <select id={id} name="treatment" value={values.treatment} onChange={(e) => set("treatment")(e.target.value)}
              aria-invalid={!!errors.treatment} aria-describedby={d} className={inputCls(!!errors.treatment)}>
              <option value="">Select a category</option>
              {treatmentCategories.map((c) => <option key={c}>{c}</option>)}
            </select>
          )}
        </Field>
        <Field label="Preferred destination" required error={errors.destination}>
          {(id, d) => (
            <select id={id} name="destination" value={values.destination} onChange={(e) => set("destination")(e.target.value)}
              aria-invalid={!!errors.destination} aria-describedby={d} className={inputCls(!!errors.destination)}>
              <option value="">Select a destination</option>
              {countries.map((c) => <option key={c.code}>{c.name}</option>)}
              <option>Not sure</option>
            </select>
          )}
        </Field>
        <Field label="Preferred date">
          {(id) => (
            <input id={id} name="preferredDate" type="date" value={values.preferredDate}
              onChange={(e) => set("preferredDate")(e.target.value)} className={inputCls(false)} />
          )}
        </Field>
        <Field label="Preferred time">
          {(id) => (
            <input id={id} name="preferredTime" type="time" value={values.preferredTime}
              onChange={(e) => set("preferredTime")(e.target.value)} className={inputCls(false)} />
          )}
        </Field>
        <Field label="Brief enquiry message" optional className="sm:col-span-2">
          {(id) => (
            <textarea id={id} name="message" rows={3} maxLength={1000}
              placeholder="Tell us briefly how we can help. Please do not include medical records or sensitive clinical details."
              value={values.message} onChange={(e) => set("message")(e.target.value)}
              className={cn(inputCls(false), "h-auto resize-y py-3")} />
          )}
        </Field>
      </div>

      {/* Honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <label className="mt-6 flex items-start gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="privacyConsent" checked={consent} onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-ink)]" />
        <span>
          I have read and agree to the <a href="/privacy" className="underline">Privacy Notice</a> and consent to being
          contacted about my enquiry. <span className="text-alert">*</span>
          {errors.privacyConsent && <span className="mt-1 block text-alert">{errors.privacyConsent}</span>}
        </span>
      </label>

      <div className="mt-5 flex items-start gap-3 rounded-2xl bg-care/10 p-4 text-sm text-ink-soft">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-care" aria-hidden />
        <p>
          Please do not upload or send medical reports through this general enquiry form. Secure document sharing can be
          arranged separately.
        </p>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="mt-5 rounded-xl bg-alert/10 px-4 py-3 text-sm text-alert">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-pill bg-ink px-6 font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-60"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting
          </>
        ) : (
          <>
            Submit Enquiry <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-ink-mute">
        Your preferred date and time are requests only. Appointments are subject to staff confirmation.
      </p>
    </form>
  );
}

function inputCls(invalid: boolean) {
  return cn(
    "h-12 w-full rounded-xl border bg-white px-4 outline-none transition-colors placeholder:text-ink-mute focus:border-ink",
    invalid ? "border-alert" : "border-line",
  );
}

function Field({
  label,
  required,
  optional,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  className?: string;
  children: (id: string, describedBy?: string) => React.ReactNode;
}) {
  const id = useId();
  const errId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-alert">*</span>}
        {optional && <span className="ml-1 font-normal text-ink-mute">(optional)</span>}
      </label>
      {children(id, error ? errId : undefined)}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-sm text-alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
