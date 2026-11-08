"use client";

import { useActionState, useId, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Check, Loader2, MessageCircle } from "lucide-react";
import { submitInquiry } from "@/app/contact/actions";
import { channels, topics, type InquiryState } from "@/lib/inquiry-schema";
import { whatsapp } from "@/data/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  defaultTopic?: string;
  defaultSubject?: string;
  compact?: boolean;
};

const channelPhrase: Record<string, string> = {
  WhatsApp: "message you on WhatsApp",
  Email: "email you",
  "Phone call": "call you",
  "No preference": "contact you",
};

const initial: InquiryState = { status: "idle" };

export function ContactForm({ defaultTopic = "patient", defaultSubject = "", compact = false }: Props) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const [values, setValues] = useState({
    topic: topics.some((t) => t.value === defaultTopic) ? defaultTopic : "patient",
    fullName: "",
    email: "",
    phone: "",
    channel: "WhatsApp" as (typeof channels)[number],
    subject: defaultSubject,
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const set = (k: keyof typeof values) => (v: string) => setValues((s) => ({ ...s, [k]: v }));
  const errors = state.status === "error" ? state.errors : {};

  return (
    <div className="relative">
      {/* popLayout, not "wait": with "wait", the exit never completed after the
          channel pill's layout animation ran, leaving the form stuck on "Sending". */}
      <AnimatePresence mode="popLayout" initial={false}>
        {state.status === "success" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="py-6 text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}
              className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-care text-white"
            >
              <Check className="h-8 w-8" strokeWidth={2.5} />
            </motion.span>
            <h3 className="mt-6 text-2xl font-semibold">Inquiry sent</h3>
            <p className="mx-auto mt-2 max-w-sm text-ink-soft">
              A patient support specialist will {channelPhrase[state.channel] ?? "contact you"} within 24 hours. Your
              reference is <strong className="font-semibold text-ink">{state.reference}</strong>.
            </p>
            <p className="mx-auto mt-4 max-w-sm text-sm text-ink-mute">
              Urgent? Message us on WhatsApp at {whatsapp.display}.
            </p>
            <a
              href={whatsapp.link(`Hi HealthOrbit, following up on inquiry ${state.reference}.`)}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-pill border border-ink/25 px-5 font-medium hover:border-ink"
            >
              <MessageCircle className="h-4 w-4" /> Follow up on WhatsApp
            </a>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            action={action}
            noValidate
            initial={false}
            exit={{ opacity: 0, y: -8 }}
            className="grid gap-5"
          >
            {!compact && (
              <Field label="What can we help with?" error={errors.topic}>
                {(id) => (
                  <select
                    id={id}
                    name="topic"
                    value={values.topic}
                    onChange={(e) => set("topic")(e.target.value)}
                    className={inputCls(!!errors.topic)}
                  >
                    {topics.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                )}
              </Field>
            )}
            {compact && <input type="hidden" name="topic" value={values.topic} />}

            <div className={cn("grid gap-5", !compact && "sm:grid-cols-2")}>
              <Field label="Full name" error={errors.fullName} className={cn(!compact && "sm:col-span-2")}>
                {(id, describedBy) => (
                  <input
                    id={id}
                    name="fullName"
                    autoComplete="name"
                    value={values.fullName}
                    onChange={(e) => set("fullName")(e.target.value)}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={describedBy}
                    className={inputCls(!!errors.fullName)}
                  />
                )}
              </Field>
              <Field label="Email" error={errors.email}>
                {(id, describedBy) => (
                  <input
                    id={id}
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => set("email")(e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={describedBy}
                    className={inputCls(!!errors.email)}
                  />
                )}
              </Field>
              <Field label="Phone, with country code" error={errors.phone}>
                {(id, describedBy) => (
                  <input
                    id={id}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+880"
                    value={values.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    aria-invalid={!!errors.phone}
                    aria-describedby={describedBy}
                    className={inputCls(!!errors.phone)}
                  />
                )}
              </Field>
            </div>

            <fieldset>
              <legend className="mb-2 text-sm font-medium">How should we contact you?</legend>
              <input type="hidden" name="channel" value={values.channel} />
              <LayoutGroup id={compact ? "channel-compact" : "channel"}>
                <div role="radiogroup" className="grid grid-cols-2 gap-1 rounded-2xl bg-mist p-1 sm:flex sm:rounded-pill">
                  {channels.map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="radio"
                      aria-checked={values.channel === c}
                      onClick={() => set("channel")(c)}
                      className="relative h-10 flex-1 rounded-xl px-3 text-sm sm:rounded-pill"
                    >
                      {values.channel === c && (
                        <motion.span
                          layoutId="channel-pill"
                          className="absolute inset-0 rounded-xl bg-white shadow-sm sm:rounded-pill"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className={cn("relative", values.channel === c ? "font-semibold" : "text-ink-soft")}>{c}</span>
                    </button>
                  ))}
                </div>
              </LayoutGroup>
            </fieldset>

            {!compact && (
              <Field label="Subject" optional error={errors.subject}>
                {(id) => (
                  <input
                    id={id}
                    name="subject"
                    value={values.subject}
                    onChange={(e) => set("subject")(e.target.value)}
                    className={inputCls(!!errors.subject)}
                  />
                )}
              </Field>
            )}
            {compact && <input type="hidden" name="subject" value={values.subject} />}

            <Field
              label={values.topic === "patient" ? "Your condition and what you’re looking for" : "Message"}
              error={errors.message}
            >
              {(id, describedBy) => (
                <textarea
                  id={id}
                  name="message"
                  rows={compact ? 4 : 5}
                  value={values.message}
                  onChange={(e) => set("message")(e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={describedBy}
                  className={cn(inputCls(!!errors.message), "h-auto resize-y py-3")}
                />
              )}
            </Field>

            {/* Honeypot */}
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <label className="flex items-start gap-3 text-sm text-ink-soft">
              <input
                type="checkbox"
                name="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[var(--color-ink)]" />
              <span>
                I agree to the <a href="/terms" className="underline">terms of use</a> and{" "}
                <a href="/privacy" className="underline">privacy policy</a>, and to be contacted about my inquiry.
                {errors.consent && <span className="mt-1 block text-alert">{errors.consent}</span>}
              </span>
            </label>

            {state.status === "error" && state.message && (
              <p role="alert" className="rounded-xl bg-alert/10 px-4 py-3 text-sm text-alert">
                {state.message}
              </p>
            )}

            <Button type="submit" disabled={pending} className="h-12 w-full sm:w-auto sm:justify-self-start">
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending
                </>
              ) : (
                "Send inquiry"
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
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
  className,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: (id: string, describedBy?: string) => React.ReactNode;
}) {
  const id = useId();
  const errId = `${id}-error`;
  return (
    <div className={className}>
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
