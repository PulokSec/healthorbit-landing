import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How HealthOrbit collects, uses, stores, shares and protects your personal and medical information.",
};

const PRIVACY_EMAIL = "privacy@healthorbit.support";
const SITE_URL = "https://healthorbit.support";

const Email = () => (
  <a href={`mailto:${PRIVACY_EMAIL}`} className="font-medium text-care underline-offset-4 hover:underline">
    {PRIVACY_EMAIL}
  </a>
);

const Site = () => (
  <a href={SITE_URL} className="font-medium text-care underline-offset-4 hover:underline">
    {SITE_URL}
  </a>
);

type Section = { id: string; title: string; body: ReactNode };

const sections: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <>
        <p>
          HealthOrbit is an independent international healthcare facilitation service operated under the banner of
          Arbree Limited, with business operations in the United Kingdom and Bangladesh. We respect your privacy and are
          committed to protecting the personal and sensitive information you share with us.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, store, share and protect information when you visit{" "}
          <Site />, contact our team or use our healthcare facilitation services.
        </p>
      </>
    ),
  },
  {
    id: "about",
    title: "About HealthOrbit",
    body: (
      <>
        <p>
          HealthOrbit helps patients and families explore international healthcare options and connect with hospitals,
          clinics, medical professionals and relevant healthcare providers. Services may include healthcare enquiries,
          appointment coordination, medical travel assistance and communication with healthcare institutions.
        </p>
        <p>
          HealthOrbit is a healthcare facilitation service, not a hospital or clinical treatment provider. Medical
          diagnoses, decisions and treatments remain the responsibility of independent qualified healthcare
          professionals and institutions.
        </p>
        <dl className="grid gap-x-6 gap-y-2 rounded-2xl bg-mist/60 p-5 sm:grid-cols-[auto_1fr]">
          <dt className="font-semibold text-ink">Operating brand</dt>
          <dd>HealthOrbit</dd>
          <dt className="font-semibold text-ink">Operating organisation</dt>
          <dd>Arbree Limited</dd>
          <dt className="font-semibold text-ink">Business operations</dt>
          <dd>United Kingdom and Bangladesh</dd>
          <dt className="font-semibold text-ink">Website</dt>
          <dd><Site /></dd>
          <dt className="font-semibold text-ink">Privacy email</dt>
          <dd><Email /></dd>
        </dl>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: (
      <>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-ink">Personal information:</strong> name, email address, telephone number, country
            of residence and contact preferences.
          </li>
          <li>
            <strong className="text-ink">Healthcare information:</strong> medical conditions or treatment requirements
            you disclose, reports, prescriptions, diagnostic documents, treatment preferences and appointment enquiries.
          </li>
          <li>
            <strong className="text-ink">Website information:</strong> browser and device information, IP address,
            approximate geographic location, website activity, cookies and analytics data.
          </li>
        </ul>
        <p>We aim to collect only information reasonably necessary to respond to enquiries and provide requested services.</p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    body: (
      <>
        <ul className="list-disc space-y-2 pl-5">
          <li>Respond to enquiries and communicate with you.</li>
          <li>Coordinate appointments and communications with healthcare providers.</li>
          <li>Help identify suitable hospitals, clinics and treatment options.</li>
          <li>Facilitate medical travel and related administrative arrangements.</li>
          <li>Improve our website, services and customer experience.</li>
          <li>Maintain operational records and meet applicable legal obligations.</li>
        </ul>
        <p>
          We process personal data only where an appropriate lawful basis applies, including consent, contractual
          necessity, legal obligations or legitimate interests where permitted. Health information requires an
          additional applicable condition under relevant data protection law.
        </p>
      </>
    ),
  },
  {
    id: "medical-information",
    title: "Medical Information and Confidentiality",
    body: (
      <>
        <p>
          We recognise that medical information is particularly sensitive. Access is restricted to authorised personnel
          who need the information for legitimate service-related purposes. Where required, we will seek explicit
          consent before processing or sharing sensitive medical information.
        </p>
        <p>
          Medical information may be shared with relevant healthcare providers or authorised coordination partners when
          necessary for your requested services and supported by an appropriate legal basis. We do not sell, rent or
          trade personal medical information.
        </p>
      </>
    ),
  },
  {
    id: "analytics-cookies",
    title: "Google Analytics and Cookies",
    body: (
      <>
        <p>
          HealthOrbit uses Google Analytics to understand website traffic, visitor interactions and website performance.
          It may collect pages visited, time on site, browser and device details, approximate geographic information,
          navigation patterns and referral sources.
        </p>
        <p>
          Where required by law, non-essential analytics cookies or similar tracking technologies will be activated only
          after consent. You may manage cookie preferences through website controls, where available, or your browser
          settings.
        </p>
        <p>
          We do not intentionally send medical records, diagnoses or directly identifying patient information to Google
          Analytics.
        </p>
        <p>
          Google Privacy Policy:{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-care underline-offset-4 hover:underline"
          >
            https://policies.google.com/privacy
          </a>
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Sharing Information with Third Parties",
    body: (
      <p>
        We may share information with hospitals, clinics, healthcare professionals, authorised healthcare coordination
        partners, medical travel or administrative providers, hosting and technology providers, professional advisers,
        and authorities where legally required. Sharing is limited to appropriate service-related purposes and lawful
        grounds. Independent healthcare providers may have their own privacy policies.
      </p>
    ),
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    body: (
      <p>
        HealthOrbit operates across the United Kingdom and Bangladesh and may facilitate care in other countries.
        Personal or medical information may therefore be accessed or transferred internationally to authorised
        personnel, service providers or healthcare institutions. Where required, we will use appropriate legal
        safeguards for international transfers and limit the information shared to what is necessary.
      </p>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    body: (
      <p>
        We take reasonable technical and organisational steps to protect information against unauthorised access,
        disclosure, alteration, loss and misuse. These may include restricted access, secure storage and communication,
        confidentiality procedures and periodic review of data-handling practices. No online or electronic system can
        guarantee absolute security.
      </p>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    body: (
      <p>
        We keep personal information only for as long as reasonably necessary for healthcare coordination,
        communication, administrative records and applicable legal requirements. Retention periods depend on the type
        of information and purpose. When no longer needed, information will be securely deleted or anonymised, unless
        lawful retention is required.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Privacy Rights",
    body: (
      <p>
        Depending on applicable law, you may have rights to access, correct or delete your information; withdraw
        consent; object to or restrict certain processing; request data portability; and complain to an appropriate data
        protection authority. Contact <Email /> to make a request. We will respond in accordance with applicable legal
        requirements.
      </p>
    ),
  },
  {
    id: "third-party-websites",
    title: "Third-Party Websites",
    body: (
      <p>
        Our website may link to independent hospitals, clinics and other third-party sites. Those organisations have
        their own privacy practices and policies. We encourage you to review them before sharing information directly.
      </p>
    ),
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    body: (
      <p>
        We may assist parents or legal guardians with healthcare enquiries concerning children. Where required, we seek
        appropriate authorisation from a parent, legal guardian or another legally authorised person. We do not
        knowingly collect information directly from children without an appropriate legal basis.
      </p>
    ),
  },
  {
    id: "marketing",
    title: "Marketing Communications",
    body: (
      <p>
        We may send relevant service updates or marketing communications where permitted by law. Where consent is
        required, we will obtain it. You may opt out at any time through the unsubscribe method provided or by emailing
        us. We do not sell personal information to third-party advertisers.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy to reflect changes in our services, technology, practices or legal
        requirements. The latest version will be published on this page with an updated effective date.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Information",
    body: (
      <>
        <address className="not-italic">
          <span className="block font-semibold text-ink">HealthOrbit</span>
          <span className="block">Operated under Arbree Limited</span>
          <span className="block">United Kingdom &amp; Bangladesh</span>
          <span className="block">Website: <Site /></span>
          <span className="block">Privacy enquiries: <Email /></span>
        </address>
        <p>
          For questions about this policy, your personal information or your privacy rights, please contact us at the
          email above.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative -mt-[72px] bg-gradient-to-br from-white via-paper to-mist pt-[72px]">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 lg:pb-16 lg:pt-20">
          <span className="inline-block rounded-pill bg-care/12 px-3.5 py-1.5 text-sm font-semibold text-ink">
            Legal
          </span>
          <h1 className="mt-5 text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.08]">Privacy Policy</h1>
          <p className="mt-4 max-w-[60ch] text-lg text-ink-soft">
            HealthOrbit | International Healthcare Facilitation
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Effective date: <time dateTime="2026-11-17">17 November 2026</time>
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[16rem_1fr]">
        <nav aria-label="Privacy policy sections" className="hidden lg:block">
          <ol className="sticky top-28 space-y-2 text-sm text-ink-soft">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:text-care">
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="max-w-3xl space-y-12">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="text-2xl font-semibold">
                <span className="text-care">{i + 1}.</span> {s.title}
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-ink-soft">{s.body}</div>
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
