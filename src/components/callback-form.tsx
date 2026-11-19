"use client";

import { useActionState, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, MessageCircle, PhoneCall } from "lucide-react";
import { submitCallback } from "@/app/contact/actions";
import { callTimes, type CallbackState } from "@/lib/callback-schema";
import { whatsapp } from "@/data/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initial: CallbackState = { status: "idle" };

/** Name and number only: the care team calls back and takes it from there. */
export function CallbackForm({ context = "" }: { context?: string }) {
  const [state, action, pending] = useActionState(submitCallback, initial);
  // Controlled so values survive a failed submit (React resets uncontrolled form fields).
  const [values, setValues] = useState({
    fullName: "",
    phone: "",
    email: "",
    callTime: "Any time" as (typeof callTimes)[number],
  });
  const [consent, setConsent] = useState(false);
  const set = (k: keyof typeof values) => (v: string) => setValues((s) => ({ ...s, [k]: v }));
  const errors = state.status === "error" ? state.errors : {};

  if (state.status === "success") {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-6 text-center" role="status">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-care text-white"
        >
          <Check className="h-8 w-8" strokeWidth={2.5} />
        </motion.span>
        <h3 className="mt-6 text-2xl font-semibold">We’ll call you back</h3>
        <p className="mx-auto mt-2 max-w-sm text-ink-soft">
          Our care team will phone you, usually within a day. Your reference is{" "}
          <strong className="font-semibold text-ink">{state.reference}</strong>.
        </p>
        <a
          href={whatsapp.link(`Hi HealthOrbit, following up on call-back ${state.reference}.`)}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-pill border border-ink/25 px-5 font-medium hover:border-ink"
        >
          <MessageCircle className="h-4 w-4" /> Message us on WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-5">
      <input type="hidden" name="context" value={context} />

      <Field label="Full name" error={errors.fullName}>
        {(id, d) => (
          <input id={id} name="fullName" autoComplete="name" maxLength={100}
            value={values.fullName} onChange={(e) => set("fullName")(e.target.value)}
            aria-invalid={!!errors.fullName} aria-describedby={d} className={inputCls(!!errors.fullName)} />
        )}
      </Field>
      <Field label="Phone / WhatsApp, with country code" error={errors.phone}>
        {(id, d) => (
          <input id={id} name="phone" type="tel" autoComplete="tel" placeholder="+880"
            value={values.phone} onChange={(e) => set("phone")(e.target.value)}
            aria-invalid={!!errors.phone} aria-describedby={d} className={inputCls(!!errors.phone)} />
        )}
      </Field>
      <Field label="Email" optional error={errors.email}>
        {(id, d) => (
          <input id={id} name="email" type="email" autoComplete="email" placeholder="you@example.com"
            value={values.email} onChange={(e) => set("email")(e.target.value)}
            aria-invalid={!!errors.email} aria-describedby={d} className={inputCls(!!errors.email)} />
        )}
      </Field>
      <Field label="Best time to call">
        {(id) => (
          <select id={id} name="callTime" value={values.callTime} onChange={(e) => set("callTime")(e.target.value)}
            className={inputCls(false)}>
            {callTimes.map((t) => <option key={t}>{t}</option>)}
          </select>
        )}
      </Field>

      {/* Honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-ink)]" />
        <span>
          I agree to the <a href="/privacy-policy" className="underline">Privacy Notice</a> and to be called about my
          enquiry.
          {errors.consent && <span className="mt-1 block text-alert">{errors.consent}</span>}
        </span>
      </label>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl bg-alert/10 px-4 py-3 text-sm text-alert">{state.message}</p>
      )}

      <Button type="submit" disabled={pending} className="h-12 w-full">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          <>
            <PhoneCall className="h-4 w-4" /> Request a call back
          </>
        )}
      </Button>
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
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: (id: string, describedBy?: string) => React.ReactNode;
}) {
  const id = useId();
  const errId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
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
