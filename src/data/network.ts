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

export const countries: Country[] = [
  { name: "Thailand", code: "TH", region: "Asia", hospitals: 9 },
  { name: "United Kingdom", code: "GB", region: "Europe", hospitals: 14 },
  { name: "United Arab Emirates", code: "AE", region: "Middle East", hospitals: 35 },
  { name: "Turkey", code: "TR", region: "Europe", hospitals: 44 },
  { name: "India", code: "IN", region: "Asia", hospitals: 68 },
  { name: "Singapore", code: "SG", region: "Asia", hospitals: 11 },
  { name: "Malaysia", code: "MY", region: "Asia", hospitals: 30 },
  { name: "Kenya", code: "KE", region: "Africa", hospitals: 10 },
  { name: "Egypt", code: "EG", region: "Africa", hospitals: 13 },
  { name: "Uganda", code: "UG", region: "Africa", hospitals: 1 },
  { name: "Germany", code: "DE", region: "Europe", hospitals: 3 },
  { name: "Saudi Arabia", code: "SA", region: "Middle East", hospitals: 6 },
  { name: "Czech Republic", code: "CZ", region: "Europe", hospitals: 4 },
  { name: "Mauritius", code: "MU", region: "Africa", hospitals: 5 },
  { name: "Vietnam", code: "VN", region: "Asia", hospitals: 10 },
  { name: "Switzerland", code: "CH", region: "Europe", hospitals: 1 },
  { name: "Spain", code: "ES", region: "Europe", hospitals: 10 },
  { name: "South Korea", code: "KR", region: "Asia", hospitals: 4 },
  { name: "China", code: "CN", region: "Asia", hospitals: 4 },
  { name: "Mexico", code: "MX", region: "Americas", hospitals: 2 },
  { name: "United States", code: "US", region: "Americas", hospitals: 3 },
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
  "United Arab Emirates": [
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
    ["Aesthetics by King’s College Hospital UAE", "Dubai", "Department"],
    ["CosmeSurge", "Dubai", "Clinic"],
    ["Bourn Hall Fertility Clinic", "Dubai", "Clinic"],
    ["Mediclinic Middle East Hospitals", "Dubai"],
    ["Tajmeel Clinics", "Abu Dhabi"],
    ["Aster Hospitals", "Dubai"],
    ["Medcare Hospitals", "Dubai"],
  ],
  Turkey: [
    ["Anadolu Medical Center", "Gebze", "Hospital", {
      featured: true,
      highlight: "Turkey’s first hospital affiliated with Johns Hopkins Medicine.",
      specialties: ["Fertility", "Cardiology", "Cardiothoracic surgery"],
    }],
    ["Acibadem Group of Hospitals", "Istanbul"],
    ["Medipol Hospital", "Istanbul"],
    ["Memorial Healthcare Group", "Istanbul"],
    ["Acibadem Beauty Centre", "Istanbul", "Department"],
    ["Memorial Hospitals – Cosmetic Procedures", "Istanbul", "Department"],
    ["Turan Turan Health Group", "Bursa"],
    ["Liv Hospital", "Istanbul", "Hospital", {
      highlight: "JCI-accredited, with multilingual coordinators for international patients.",
      specialties: ["Pain medicine", "Bariatrics", "Cardiology"],
    }],
    ["Quartz Clinique", "Istanbul", "Clinic"],
    ["Istanbul Aesthetics Centre", "Istanbul"],
    ["DentSpa", "Istanbul", "Clinic"],
    ["Medicana Health Group", "Istanbul"],
  ],
  India: [
    ["Apollo Hospital", "New Delhi", "Hospital", {
      featured: true,
      highlight: "India’s largest hospital network, with thousands of cardiac surgeries and transplants each year.",
      specialties: ["Fertility", "Cardiology", "Colorectal surgery"],
    }],
    ["Apollo Children’s Hospital"],
    ["Gleneagles Global Hospital", "Hyderabad"],
    ["Fortis Hospitals", "Delhi"],
    ["Wockhardt Hospital", "Rajkot"],
    ["Max Super Speciality Hospital", "Vaishali"],
    ["Artemis Hospital", "Delhi"],
    ["Accord Hospital", "Faridabad"],
    ["Rainbow Children's Hospital", "Hyderabad"],
    ["HCG Hospital", "Ahmedabad"],
    ["MIOT International Hospital", "Chennai"],
    ["Kokilaben Dhirubhai Ambani Hospital", "Mumbai"],
    ["Yashoda Hospitals", "Hyderabad"],
    ["Medanta – The Medicity", "Gurugram", "Hospital", {
      highlight: "Founded by a renowned cardiac surgeon; known worldwide for complex heart procedures.",
      specialties: ["Cardiology", "Cardiothoracic surgery", "Colorectal surgery"],
    }],
    ["Manipal Hospital", "Bangalore"],
    ["NeuroGen Brain & Spine Institute", "Mumbai"],
    ["MGM Healthcare", "Chennai"],
    ["Kauvery Hospital", "Chennai"],
    ["Aster CMI Hospital", "Bangalore"],
    ["Medicover Hospitals", "Navi Mumbai"],
    ["Fortis La Femme Hospital", "New Delhi"],
  ],
  Singapore: [
    ["Raffles Hospital", "Singapore", "Hospital", {
      featured: true,
      highlight: "Inpatient, outpatient, specialist and traditional Chinese medicine under one roof.",
      specialties: ["Fertility", "Cardiology", "Cardiothoracic surgery"],
    }],
    ["Icon Cancer Centre Mount Elizabeth", "Singapore"],
    ["Icon Haematology Centre – Mount Elizabeth", "Singapore"],
  ],
  Malaysia: [
    ["Sunway Medical Centre", "Selangor"],
    ["Prince Court Medical Centre", "Kuala Lumpur", "Hospital", {
      highlight: "Consistently rated among Asia’s best for international patient experience.",
      specialties: ["Cardiology", "Cardiothoracic surgery", "Dentistry"],
    }],
    ["KPJ Healthcare", "Kuala Lumpur"],
    ["Subang Jaya Medical Centre", "Subang Jaya"],
    ["Monash IVF KPJ Johor Fertility Centre", "Johor Bahru"],
    ["Sunway Fertility Centre", "Kuala Lumpur"],
    ["KPJ Damansara Fertility Centre", "Selangor"],
    ["Island Hospital", "George Town"],
    ["Institut Jantung Negara", "Kuala Lumpur"],
    ["Northern Heart Hospital", "Penang"],
    ["Beacon Hospital", "Selangor"],
    ["Mahkota Medical Centre", "Melaka", "Clinic"],
    ["Pantai Hospitals", "Kuala Lumpur"],
    ["Gleneagles Hospitals", "Kuala Lumpur"],
    ["Bukit Tinggi Medical Centre"],
    ["Damansara Specialist Hospital 2"],
  ],
  Kenya: [
    ["Gertrude's Children's Hospital", "Nairobi"],
    ["The Male Sexual Health Wellness Clinic", "Nairobi", "Clinic"],
    ["3rd Park Hospital", "Nairobi"],
    ["HCG CCK Cancer Centre", "Nairobi"],
    ["Victoria IVF & Fertility Centre", "Nairobi"],
    ["Cosmed Plus", "Nairobi", "Clinic"],
  ],
  Egypt: [
    ["As-Salam International Hospital", "Cairo"],
    ["Dar Al Fouad Hospitals", "Cairo"],
    ["Andalusia Hospital", "Cairo"],
    ["Cleopatra Hospital", "Cairo"],
    ["Ganzouri Hospital", "Cairo"],
  ],
  Uganda: [["International Hospital Kampala", "Kampala"]],
  Germany: [
    ["Kliniken Schmieder", "Allensbach", "Hospital", {
      featured: true,
      highlight: "Germany’s leading specialist hospital for neurological rehabilitation.",
      specialties: ["Neurorehabilitation", "Neurology"],
    }],
    ["Academic Hospital Solingen", "Solingen"],
  ],
  "Saudi Arabia": [
    ["Saudi German Hospital", "Riyadh"],
    ["Andalusia Hospital", "Jeddah", "Hospital", { slug: "andalusia-hospital-jeddah" }],
    ["Andalusia Kids Wellness Center", undefined, "Wellness centre"],
    ["Andalusia Dental Center", undefined, "Clinic"],
    ["King Faisal Specialist Hospital and Research Centre", "Riyadh"],
  ],
  "Czech Republic": [
    ["Horovice Hospital", "Hořovice", "Hospital", {
      highlight: "Rehabilitation for patients recovering from neurological and orthopaedic conditions.",
      specialties: ["Orthopaedics", "Rehabilitation", "General surgery"],
    }],
  ],
  Mauritius: [["C-Care Hospital & Clinics", "Floréal"]],
  Vietnam: [["Vinmec Healthcare System", "Hanoi"]],
  Switzerland: [
    ["Hirslanden Private Hospital Group", "Zürich", "Hospital", {
      featured: true,
      highlight: "Switzerland’s largest private hospital group, strong in precision oncology and cardiac care.",
      specialties: ["Bariatrics", "Cardiology", "Oncology"],
    }],
  ],
  Spain: [
    ["Clínica Tambre", "Madrid", "Clinic"],
    ["Dexeus University Hospital", "Barcelona", "Hospital", {
      highlight: "Over 90 years of clinical heritage in fertility and women’s health.",
      specialties: ["Fertility", "Gynaecology", "Cardiology"],
    }],
  ],
  "South Korea": [
    ["Severance Hospital"],
    ["JW Plastic Surgery", "Seoul"],
    ["JK Plastic Surgery Centre", "Seoul"],
    ["Samsung Medical Centre", "Seoul", "Hospital", {
      featured: true,
      highlight: "Among Asia’s top hospitals for cancer treatment and organ transplants.",
      specialties: ["Oncology", "Organ transplant", "Cardiology"],
    }],
  ],
  China: [
    ["Beijing Jingdu Children’s Hospital", "Beijing"],
    ["Kunming Tongren Hospital", "Kunming"],
    ["Fuda Cancer Hospital", "Guangzhou", "Hospital", {
      highlight: "Specialist oncology centre focused on minimally invasive cancer treatment.",
      specialties: ["Oncology"],
    }],
    ["Beijing GoBroad Hospital", "Beijing"],
  ],
  Mexico: [
    ["Marroquín and Sandoval Plastic Surgery Clinic", "Guadalajara", "Clinic"],
    ["Galenia Hospital", "Cancún"],
  ],
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
  partners: String(countries.reduce((sum, c) => sum + c.hospitals, 0)),
  patients: "55,000+",
  countries: countries.length,
  rating: "4.8/5",
};
