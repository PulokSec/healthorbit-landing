import { MessageCircle } from "lucide-react";
import { whatsapp } from "@/data/contact";

export function WhatsAppFab() {
  return (
    <a
      href={whatsapp.link()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with a patient support specialist on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-0 overflow-hidden rounded-pill bg-care pl-4 pr-4 text-white shadow-[0_12px_30px_-10px_rgb(23_57_74/0.6)] transition-all duration-300 hover:gap-2 hover:pr-5"
    >
      <MessageCircle className="h-6 w-6 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-medium transition-[max-width] duration-300 group-hover:max-w-48">
        Talk to us now
      </span>
    </a>
  );
}
