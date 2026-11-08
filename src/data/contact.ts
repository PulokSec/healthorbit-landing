// Contact details mirrored from the parent organisation’s public contact page.
// Replace with HealthOrbit-specific details before going live.

export type Office = {
  id: string;
  country: string;
  code: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  timeZone: string; // IANA zone used to show the office's local time
  hours: { open: number; close: number; days: number[] }; // 24h, days 1=Mon..7=Sun
};

export const offices: Office[] = [
  {
    id: "us",
    country: "United States",
    code: "US",
    city: "Dover, Delaware",
    address: "1151 Walker Rd, Ste 233, Dover, DE, USA",
    phone: "+1 401 400 0015",
    email: "usa@healthorbit.com",
    timeZone: "America/New_York",
    hours: { open: 9, close: 18, days: [1, 2, 3, 4, 5] },
  },
  {
    id: "uae",
    country: "United Arab Emirates",
    code: "AE",
    city: "Business Bay, Dubai",
    address: "Empire Heights A, 16F-A-04, Business Bay, Dubai, UAE",
    phone: "+971 54 391 2015",
    email: "uae@healthorbit.com",
    timeZone: "Asia/Dubai",
    hours: { open: 9, close: 18, days: [1, 2, 3, 4, 5] },
  },
  {
    id: "ke",
    country: "Kenya",
    code: "KE",
    city: "Westlands, Nairobi",
    address: "The Westwood Office Building, Westlands, Nairobi, Kenya",
    phone: "+254 711 082 072",
    email: "kenya@healthorbit.com",
    timeZone: "Africa/Nairobi",
    hours: { open: 8, close: 17, days: [1, 2, 3, 4, 5, 6] },
  },
];

export const whatsapp = {
  display: "+1 718 550 0880",
  number: "17185500880",
  link: (text = "Hi HealthOrbit, I’d like help from a patient support specialist.") =>
    `https://wa.me/17185500880?text=${encodeURIComponent(text)}`,
};

export const socials = [
  { name: "X", href: "https://x.com/" },
  { name: "Instagram", href: "https://instagram.com/" },
  { name: "Facebook", href: "https://facebook.com/" },
  { name: "LinkedIn", href: "https://linkedin.com/" },
  { name: "YouTube", href: "https://youtube.com/" },
];
