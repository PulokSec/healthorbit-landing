import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <h1 className="text-4xl font-semibold">This page has drifted out of orbit</h1>
      <p className="mt-4 text-ink-soft">The link may be old or mistyped. Try the health network or contact a coordinator.</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/health-network">Browse the network</ButtonLink>
        <ButtonLink href="/contact" variant="outline">Contact us</ButtonLink>
      </div>
    </div>
  );
}
