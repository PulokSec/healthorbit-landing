import type { Metadata } from "next";
import { MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { ConsultationForm } from "@/components/consultation-form";
import { offices, whatsapp } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Book a consultation with HealthOrbit, or reach our team by WhatsApp or phone.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ subject?: string }> }) {
  const { subject = "" } = await searchParams;
  const phone = offices[0].phone;

  const methods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      body: "Chat with our team",
      value: whatsapp.display,
      href: whatsapp.link(),
      external: true,
    },
    {
      icon: Phone,
      title: "Call Us",
      body: "Speak to our team",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
      external: false,
    },
  ];

  return (
    <section id="inquiry" className="graticule -mt-[72px] scroll-mt-0 pt-[72px]">
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 pb-8 pt-10 sm:px-8 lg:grid-cols-[1.45fr_1fr] lg:pt-14">
        <div className="rounded-[28px] border border-line bg-white p-6 shadow-[0_24px_60px_-40px_rgb(23_57_74/0.45)] sm:p-10">
          <ConsultationForm defaultMessage={subject} />
        </div>

        <aside className="rounded-[28px] bg-ink p-6 text-paper sm:p-10 lg:sticky lg:top-24">
          <span className="inline-block rounded-pill bg-paper/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.12em] text-signal">
            WE’RE HERE TO HELP
          </span>
          <h1 className="mt-5 text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.1]">
            Let’s Talk About Your Healthcare Journey
          </h1>
          <p className="mt-4 text-paper/70">
            Contact our team to discuss your enquiry and explore possible next steps.
          </p>

          <ul className="mt-8 space-y-3">
            {methods.map(({ icon: Icon, title, body, value, href, external }) => (
              <li key={title}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="flex items-center gap-4 rounded-[20px] bg-paper/[0.06] p-4 transition-colors hover:bg-paper/[0.12]"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-care text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="leading-tight">
                    <span className="block font-semibold">{title}</span>
                    <span className="block text-sm text-paper/60">{body}</span>
                    <span className="mt-1 block font-medium text-signal">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-start gap-3 border-t border-paper/15 pt-6 text-sm text-paper/70">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-signal" aria-hidden />
            <p>
              Our service coordinates healthcare enquiries. Medical advice and treatment decisions must come from
              qualified healthcare professionals.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
