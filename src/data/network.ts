export type FacilityType = "Hospital" | "Clinic" | "Wellness centre" | "Department";

export type Facility = {
  slug: string;
  name: string;
  /** Omitted when the source list doesn't give one. */
  city?: string;
  country: string;
  type: FacilityType;
  /** One-line summary shown on cards. Only set for featured facilities. */
  highlight?: string;
  specialties?: string[];
  featured?: boolean;
};

export type Country = {
  name: string;
  code: string; // ISO 3166-1 alpha-2, used for flag emoji
  region: "Asia" | "Europe" | "Middle East" | "Africa" | "Americas";
  /** Total partner hospitals in the country, including ones not listed individually. */
  hospitals: number;
};

/** In the order of the partner hospital list shared by the team. */
export const countries: Country[] = [
  { name: "Thailand", code: "TH", region: "Asia", hospitals: 9 },
  { name: "India", code: "IN", region: "Asia", hospitals: 68 },
  { name: "China", code: "CN", region: "Asia", hospitals: 4 },
  { name: "Singapore", code: "SG", region: "Asia", hospitals: 11 },
  { name: "Malaysia", code: "MY", region: "Asia", hospitals: 30 },
  { name: "South Korea", code: "KR", region: "Asia", hospitals: 4 },
  { name: "Saudi Arabia", code: "SA", region: "Middle East", hospitals: 6 },
  { name: "Turkey", code: "TR", region: "Europe", hospitals: 44 },
  { name: "United Arab Emirates", code: "AE", region: "Middle East", hospitals: 35 },
  { name: "Czech Republic", code: "CZ", region: "Europe", hospitals: 4 },
  { name: "Egypt", code: "EG", region: "Africa", hospitals: 13 },
  { name: "Germany", code: "DE", region: "Europe", hospitals: 3 },
  { name: "Kenya", code: "KE", region: "Africa", hospitals: 10 },
  { name: "Mauritius", code: "MU", region: "Africa", hospitals: 5 },
  { name: "Mexico", code: "MX", region: "Americas", hospitals: 2 },
  { name: "Spain", code: "ES", region: "Europe", hospitals: 10 },
  { name: "Switzerland", code: "CH", region: "Europe", hospitals: 1 },
  { name: "Uganda", code: "UG", region: "Africa", hospitals: 1 },
  { name: "United Kingdom", code: "GB", region: "Europe", hospitals: 14 },
  { name: "United States", code: "US", region: "Americas", hospitals: 3 },
  { name: "Vietnam", code: "VN", region: "Asia", hospitals: 10 },
];

export const flag = (code: string) =>
  code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type Seed = [name: string, city?: string, type?: FacilityType, extra?: Partial<Facility>];

const seeds: Record<string, Seed[]> = {
  Thailand: [
    ["Bumrungrad International Hospital", "Bangkok", "Hospital", {
      featured: true,
      highlight: "Over 1,300 specialist physicians, more than 200 of them US board-certified.",
      specialties: ["Cardiology", "Cardiothoracic surgery", "Colorectal surgery"],
    }],
    ["Samitivej Sukhumvit Hospital"],
    ["Vejthani Hospital"],
    ["MedPark Hospital"],
    ["Bangkok Hospital Campus", "Bangkok"],
    ["VitalLife Scientific Wellness Center", "Bangkok", "Wellness centre"],
    ["Bumrungrad Hospital – Cosmetic Procedures", "Bangkok", "Department"],
    ["RXV Wellness Village Sampran", "Sam Phran", "Wellness centre"],
  ],
  India: [
    ["Fortis Hospitals", "Delhi"],
    ["Apollo Hospital", "New Delhi", "Hospital", {
      featured: true,
      highlight: "India’s largest hospital network, with thousands of cardiac surgeries and transplants each year.",
      specialties: ["Fertility", "Cardiology", "Colorectal surgery"],
    }],
    ["Kokilaben Dhirubhai Ambani Hospital", "Mumbai"],
    ["Apollo Children’s Hospital"],
    ["Wockhardt Hospital", "Rajkot"],
    ["Gleneagles Global Hospital", "Hyderabad"],
    ["Medicover Hospitals", "Navi Mumbai"],
    ["Medanta – The Medicity", "Gurugram", "Hospital", {
      highlight: "Founded by a renowned cardiac surgeon; known worldwide for complex heart procedures.",
      specialties: ["Cardiology", "Cardiothoracic surgery", "Colorectal surgery"],
    }],
    ["HCG Hospital", "Ahmedabad"],
    ["Max Super Speciality Hospital", "Vaishali"],
    ["Artemis Hospital", "Delhi"],
    ["Accord Hospital", "Faridabad"],
    ["Rainbow Children's Hospital", "Hyderabad"],
    ["MIOT International Hospital", "Chennai"],
    ["Yashoda Hospitals", "Hyderabad"],
    ["Manipal Hospital", "Bangalore"],
    ["NeuroGen Brain & Spine Institute", "Mumbai"],
    ["MGM Healthcare", "Chennai"],
    ["Kauvery Hospital", "Chennai"],
    ["Aster CMI Hospital", "Bangalore"],
    ["Fortis La Femme Hospital", "New Delhi"],
  ],
  China: [
    ["Kunming Tongren Hospital", "Kunming"],
    ["Beijing GoBroad Hospital", "Beijing"],
    ["Fuda Cancer Hospital", "Guangzhou", "Hospital", {
      highlight: "Specialist oncology centre focused on minimally invasive cancer treatment.",
      specialties: ["Oncology"],
    }],
    ["Beijing Jingdu Children’s Hospital", "Beijing"],
  ],
  Singapore: [
    ["Icon Haematology Centre – Mount Elizabeth", "Singapore"],
    ["Icon Cancer Centre Mount Elizabeth", "Singapore"],
    ["Raffles Hospital", "Singapore", "Hospital", {
      featured: true,
      highlight: "Inpatient, outpatient, specialist and traditional Chinese medicine under one roof.",
      specialties: ["Fertility", "Cardiology", "Cardiothoracic surgery"],
    }],
  ],
  Malaysia: [
    ["Subang Jaya Medical Centre", "Subang Jaya"],
    ["Gleneagles Hospitals", "Kuala Lumpur"],
    ["KPJ Healthcare", "Kuala Lumpur"],
    ["Sunway Fertility Centre", "Kuala Lumpur"],
    ["Sunway Medical Centre", "Selangor"],
    ["Beacon Hospital", "Selangor"],
    ["Bukit Tinggi Medical Centre"],
    ["Monash IVF KPJ Johor Fertility Centre", "Johor Bahru"],
    ["Damansara Specialist Hospital 2"],
    ["Prince Court Medical Centre", "Kuala Lumpur", "Hospital", {
      highlight: "Consistently rated among Asia’s best for international patient experience.",
      specialties: ["Cardiology", "Cardiothoracic surgery", "Dentistry"],
    }],
    ["KPJ Damansara Fertility Centre", "Selangor"],
    ["Island Hospital", "George Town"],
    ["Institut Jantung Negara", "Kuala Lumpur"],
    ["Northern Heart Hospital", "Penang"],
    ["Mahkota Medical Centre", "Melaka", "Clinic"],
    ["Pantai Hospitals", "Kuala Lumpur"],
  ],
  "South Korea": [
    ["Severance Hospital"],
    ["JK Plastic Surgery Centre", "Seoul"],
    ["Samsung Medical Center", "Seoul", "Hospital", {
      featured: true,
      highlight: "Among Asia’s top hospitals for cancer treatment and organ transplants.",
      specialties: ["Oncology", "Organ transplant", "Cardiology"],
    }],
    ["JW Plastic Surgery", "Seoul"],
  ],
  "Saudi Arabia": [
    ["Andalusia Kids Wellness Center", undefined, "Wellness centre"],
    ["Andalusia Dental Center", undefined, "Clinic"],
    ["Andalusia Hospital", "Jeddah", "Hospital", { slug: "andalusia-hospital-jeddah" }],
    ["Saudi German Hospital", "Riyadh"],
    ["King Faisal Specialist Hospital and Research Centre", "Riyadh"],
  ],
  Turkey: [
    ["Acibadem Group of Hospitals", "Istanbul"],
    ["Turan Turan Health Group", "Bursa"],
    ["Liv Hospital", "Istanbul", "Hospital", {
      highlight: "JCI-accredited, with multilingual coordinators for international patients.",
      specialties: ["Pain medicine", "Bariatrics", "Cardiology"],
    }],
    ["Istanbul Aesthetics Centre", "Istanbul"],
    ["Medicana Health Group", "Istanbul"],
    ["Anadolu Medical Center", "Gebze", "Hospital", {
      featured: true,
      highlight: "Turkey’s first hospital affiliated with Johns Hopkins Medicine.",
      specialties: ["Fertility", "Cardiology", "Cardiothoracic surgery"],
    }],
    ["Medipol Hospital", "Istanbul"],
    ["Memorial Healthcare Group", "Istanbul"],
    ["Acibadem Beauty Centre", "Istanbul", "Department"],
    ["Memorial Hospitals – Cosmetic Procedures", "Istanbul", "Department"],
    ["Quartz Clinique", "Istanbul", "Clinic"],
    ["DentSpa", "Istanbul", "Clinic"],
  ],
  "United Arab Emirates": [
    ["Aesthetics by King’s College Hospital UAE", "Dubai", "Department"],
    ["American Hospital Dubai", "Dubai", "Hospital", {
      featured: true,
      highlight: "A quarter century of treating patients who travel in from 90+ countries.",
      specialties: ["Fertility", "Cardiology", "Cardiothoracic surgery"],
    }],
    ["King’s College Hospital Dubai", "Dubai"],
    ["NMC Hospital", "Abu Dhabi"],
    ["Zulekha Hospital", "Dubai"],
    ["Burjeel Hospitals", "Dubai"],
    ["Fakih IVF", "Dubai"],
    ["The Face", "Dubai", "Department"],
    ["Fakeeh University Hospital", "Dubai"],
    ["Moorfields Eye Hospital Dubai", "Dubai"],
    ["CosmeSurge", "Dubai", "Clinic"],
    ["Bourn Hall Fertility Clinic", "Dubai", "Clinic"],
    ["Mediclinic Middle East Hospitals", "Dubai"],
    ["Tajmeel Clinics", "Abu Dhabi"],
    ["Aster Hospitals", "Dubai"],
    ["Medcare Hospitals", "Dubai"],
  ],
  "Czech Republic": [
    ["Horovice Hospital", "Hořovice", "Hospital", {
      highlight: "Rehabilitation for patients recovering from neurological and orthopaedic conditions.",
      specialties: ["Orthopaedics", "Rehabilitation", "General surgery"],
    }],
  ],
  Egypt: [
    ["As-Salam International Hospital", "Cairo"],
    ["Dar Al Fouad Hospitals", "Cairo"],
    ["Andalusia Hospital", "Cairo"],
    ["Cleopatra Hospital", "Cairo"],
    ["Ganzouri Hospital", "Cairo"],
  ],
  Germany: [
    ["Kliniken Schmieder", "Allensbach", "Hospital", {
      featured: true,
      highlight: "Germany’s leading specialist hospital for neurological rehabilitation.",
      specialties: ["Neurorehabilitation", "Neurology"],
    }],
    ["Academic Hospital Solingen", "Solingen"],
  ],
  Kenya: [
    ["Gertrude's Children's Hospital", "Nairobi"],
    ["The Male Sexual Health Wellness Clinic", "Nairobi", "Clinic"],
    ["3rd Park Hospital", "Nairobi"],
    ["HCG CCK Cancer Centre", "Nairobi"],
    ["Victoria IVF & Fertility Centre", "Nairobi"],
    ["Cosmed Plus", "Nairobi", "Clinic"],
  ],
  Mauritius: [["C-Care Hospital & Clinics", "Floréal"]],
  Mexico: [
    ["Marroquín and Sandoval Plastic Surgery Clinic", "Guadalajara", "Clinic"],
    ["Galenia Hospital", "Cancún"],
  ],
  Spain: [
    ["Clínica Tambre", "Madrid", "Clinic"],
    ["Dexeus University Hospital", "Barcelona", "Hospital", {
      highlight: "Over 90 years of clinical heritage in fertility and women’s health.",
      specialties: ["Fertility", "Gynaecology", "Cardiology"],
    }],
  ],
  Switzerland: [
    ["Hirslanden Private Hospital Group", "Zürich", "Hospital", {
      featured: true,
      highlight: "Switzerland’s largest private hospital group, strong in precision oncology and cardiac care.",
      specialties: ["Bariatrics", "Cardiology", "Oncology"],
    }],
  ],
  Uganda: [["International Hospital Kampala", "Kampala"]],
  "United Kingdom": [
    ["The London Clinic Hospital", "London", "Hospital", {
      featured: true,
      highlight: "A leading UK private hospital known for cancer care and surgical innovation.",
      specialties: ["Oncology", "Cardiology", "Colorectal surgery"],
    }],
    ["Ross Hall Hospital", "Glasgow"],
    ["The Blackheath Hospital", "Greenwich"],
    ["Bishops Wood Hospital Cancer Centre", "London"],
    ["The Alexandra Hospital", "Manchester"],
    ["The Priory Hospital", "Birmingham"],
    ["London Independent Hospital", "London"],
    ["The Park Hospital", "Nottingham"],
    ["Beaumont Hospital", "Bolton"],
    ["The Clementine Churchill Hospital", "London"],
    ["Albyn Hospital", "Aberdeen"],
    ["Circle Rehabilitation", "Birmingham"],
    ["Cromwell Hospital", "London", "Hospital", {
      featured: true,
      highlight: "Central London private hospital caring for international patients for four decades.",
      specialties: ["Cardiology", "Dermatology", "Cardiothoracic surgery"],
    }],
    ["King's College Hospital London", "London", "Hospital", {
      highlight: "Complex cases reviewed by multidisciplinary tumour boards.",
      specialties: ["Organ transplant", "Haematology", "Oncology"],
    }],
    ["Cleveland Clinic London", "London"],
  ],
  Vietnam: [["Vinmec Healthcare System", "Hanoi"]],
};

export const facilities: Facility[] = Object.entries(seeds).flatMap(([country, list]) =>
  list.map(([name, city, type = "Hospital", extra = {}]) => ({
    slug: slugify(name),
    name,
    city,
    country,
    type,
    ...extra,
  })),
);

export const featuredFacilities = facilities.filter((f) => f.featured);

export const facilitiesByCountry = (country: string) =>
  facilities.filter((f) => f.country === country);

export const getFacility = (slug: string) => facilities.find((f) => f.slug === slug);

/** "City, Country", or just the country when no city is known. */
export const place = (f: Facility) => (f.city ? `${f.city}, ${f.country}` : f.country);

export const getCountry = (name: string) => countries.find((c) => c.name === name)!;

/** Destination photo in /public/images/countries (Unsplash, free licence). */
export const countryImage = (name: string) => `/images/countries/${slugify(name)}.jpg`;

export const networkStats = {
  partners: "350+",
  patients: "55,000+",
  countries: countries.length,
  rating: "4.8/5",
};
