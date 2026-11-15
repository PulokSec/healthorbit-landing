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
  { name: "Turkey", code: "TR", region: "Europe", hospitals: 49 },
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
  { name: "Vietnam", code: "VN", region: "Asia", hospitals: 7 },
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
    ["VitalLife Scientific Wellness Center", "Bangkok", "Wellness centre"],
    ["Bumrungrad International Hospital", "Bangkok", "Hospital", {
      featured: true,
      highlight: "Over 1,300 specialist physicians, more than 200 of them US board-certified.",
      specialties: ["Cardiology", "Cardiothoracic surgery", "Colorectal surgery"],
    }],
    ["Vejthani Hospital"],
    ["MedPark Hospital"],
    ["Samitivej Sukhumvit Hospital"],
    ["Bangkok Hospital Campus", "Bangkok"],
    ["Asia Cosmetic Hospital"],
  ],
  India: [
    ["Fortis Hospitals", "Delhi"],
    ["Apollo Hospital", "New Delhi", "Hospital", {
      featured: true,
      highlight: "India’s largest hospital network, with thousands of cardiac surgeries and transplants each year.",
      specialties: ["Fertility", "Cardiology", "Colorectal surgery"],
    }],
    ["Apollo Hospital", "New Delhi"],
    ["Fortis Hospitals", "Delhi"],
    ["Apollo Hospital", "New Delhi"],
    ["Apollo Hospital", "New Delhi"],
    ["Fortis Hospitals", "Delhi"],
    ["Fortis Hospitals", "Delhi"],
    ["Apollo Hospital", "New Delhi"],
    ["Fortis Hospitals", "Delhi"],
    ["Apollo Hospital", "New Delhi"],
    ["Fortis Hospitals", "Delhi"],
    ["Apollo One Greams Road", "Chennai"],
    ["Medanta – The Medicity", "Gurugram", "Hospital", {
      highlight: "Founded by a renowned cardiac surgeon; known worldwide for complex heart procedures.",
      specialties: ["Cardiology", "Cardiothoracic surgery", "Colorectal surgery"],
    }],
    ["Gleneagles Global Hospital", "Hyderabad"],
    ["HCG Cancer Hospital – Borivali", "Mumbai"],
    ["Apollo Athenaa Women’s Hospital", "Delhi"],
    ["Yashoda Hospitals", "Hyderabad"],
    ["Apollo Heart Centre", "Chennai"],
    ["Apollo Speciality Hospitals, Vanagaram", "Chennai"],
    ["Medicover Fertility Centre", "Hyderabad", "Clinic"],
    ["Apollo AyurVAID Hospitals", "Bengaluru"],
    ["Wockhardt Hospital, Nashik", "Nashik"],
    ["BLK-Max Super Speciality Hospital", "Delhi"],
    ["Yashoda Hospitals", "Hyderabad"],
    ["Rainbow Children’s Hospital & BirthRight – Bengaluru", "Bengaluru"],
    ["Wockhardt Hospital, Mumbai Central", "Mumbai"],
    ["HCG Cancer Hospital – Newtown", "Kolkata"],
    ["Apollo One Greams Road", "Chennai"],
    ["Gleneagles Global Health City"],
    ["Max Super Speciality Hospital, Vaishali", "Vaishali"],
    ["Medicover Cancer Institute", "Hyderabad"],
    ["Max Super Speciality Hospital, Patparganj", "Delhi"],
    ["Apollo AyurVAID Hospitals", "Bengaluru"],
    ["HCG Hospital", "Ahmedabad"],
    ["Yashoda Hospitals", "Hyderabad"],
    ["Wockhardt Hospital, Mumbai Central", "Mumbai"],
    ["Wockhardt Super Speciality Hospital, Mira Road", "Mumbai"],
    ["Accord Hospital", "Faridabad"],
    ["Medanta Super Speciality Hospital, Lucknow", "Lucknow"],
    ["Nanavati Max Hospital", "Mumbai"],
    ["Artemis Hospital", "Gurugram"],
    ["Apollo Multispeciality Hospitals", "Kolkata"],
    ["Rainbow Children’s Hospital & BirthRight – Hyderabad", "Hyderabad"],
    ["Rainbow Children’s Hospital & BirthRight – Bengaluru", "Bengaluru"],
    ["Max Super Speciality Hospital, Patparganj", "Delhi"],
    ["Apollo Speciality Hospitals, Vanagaram", "Chennai"],
    ["Gleneagles Global Hospital", "Hyderabad"],
    ["Jay Prabha Medanta Super Speciality Hospital", "Patna"],
    ["Artemis Hospital", "Gurugram"],
    ["HCG Cancer Hospital – Borivali", "Mumbai"],
    ["HCG Cancer Hospital – Newtown", "Kolkata"],
    ["BLK-Max Super Speciality Hospital", "Delhi"],
    ["Medicover Hospitals, Navi Mumbai", "Navi Mumbai"],
    ["Apollo Excelcare Hospital", "Guwahati"],
    ["Kokilaben Dhirubhai Ambani Hospital", "Mumbai"],
    ["Wockhardt Super Speciality Hospital, Nagpur", "Nagpur"],
    ["Apollo Excelcare Hospital", "Guwahati"],
    ["Apollo Cancer Centre Teynampet", "Chennai"],
    ["Gleneagles Global Health City"],
    ["Max Hospital, Gurugram", "Gurugram"],
    ["Medicover Hospitals, Hitech City", "Hyderabad"],
    ["Nanavati Max Hospital", "Mumbai"],
    ["Wockhardt Hospital, Rajkot", "Rajkot"],
    ["HCG Cancer Hospital – Newtown", "Kolkata"],
    ["Max Super Speciality Hospital, Mohali", "Mohali"],
    ["Kokilaben Dhirubhai Ambani Hospital", "Mumbai"],
    ["Rainbow Children’s Hospital & BirthRight – Bengaluru", "Bengaluru"],
  ],
  China: [
    ["Fuda Cancer Hospital", "Guangzhou", "Hospital", {
      highlight: "Specialist oncology centre focused on minimally invasive cancer treatment.",
      specialties: ["Oncology"],
    }],
    ["Beijing GoBroad Hospital", "Beijing"],
    ["Beijing Jingdu Children’s Hospital", "Beijing"],
    ["Kunming Tongren Hospital", "Kunming"],
  ],
  Singapore: [
    ["Raffles Hospital", "Singapore", "Hospital", {
      featured: true,
      highlight: "Inpatient, outpatient, specialist and traditional Chinese medicine under one roof.",
      specialties: ["Fertility", "Cardiology", "Cardiothoracic surgery"],
    }],
    ["Icon Haematology Centre – Mount Elizabeth", "Singapore"],
  ],
  Malaysia: [
    ["Sunway Medical Centre", "Selangor"],
    ["Gleneagles Hospitals"],
    ["Beacon Hospital", "Selangor"],
    ["KPJ Healthcare", "Kuala Lumpur"],
    ["Subang Jaya Medical Centre", "Subang Jaya"],
    ["Prince Court Medical Centre", "Kuala Lumpur", "Hospital", {
      highlight: "Consistently rated among Asia’s best for international patient experience.",
      specialties: ["Cardiology", "Cardiothoracic surgery", "Dentistry"],
    }],
    ["Ara Damansara Medical Centre"],
    ["Monash IVF KPJ Johor Fertility Centre", "Johor Bahru", "Clinic"],
    ["Island Hospital", "Penang"],
    ["Pantai Hospital Melaka", "Melaka"],
    ["Gleneagles Hospital Kuala Lumpur", "Kuala Lumpur"],
    ["Pantai Hospital Kuala Lumpur", "Kuala Lumpur"],
    ["Northern Heart Hospital", "Penang"],
    ["Pantai Hospital Penang", "Penang"],
    ["Sunway Fertility Centre", "Kuala Lumpur", "Clinic"],
    ["ParkCity Medical Centre"],
    ["KPJ Damansara Fertility Centre", "Selangor", "Clinic"],
  ],
  "South Korea": [
    ["JK Plastic Surgery Centre", "Seoul", "Clinic"],
    ["Severance Hospital"],
    ["JW Plastic Surgery", "Seoul", "Clinic"],
    ["Samsung Medical Center", "Seoul", "Hospital", {
      featured: true,
      highlight: "Among Asia’s top hospitals for cancer treatment and organ transplants.",
      specialties: ["Oncology", "Organ transplant", "Cardiology"],
    }],
  ],
  "Saudi Arabia": [
    ["Andalusia Ladies Wellness Center", undefined, "Wellness centre"],
    ["Andalusia Hospital", "Jeddah", "Hospital", { slug: "andalusia-hospital-jeddah" }],
    ["Andalusia Dental Center", undefined, "Clinic"],
    ["Andalusia Kids Wellness Center", undefined, "Wellness centre"],
    ["Andalusia Family Health Clinics", undefined, "Clinic"],
    ["Andalusia Hai Al-Jamaa"],
  ],
  Turkey: [
    ["Acibadem Group of Hospitals", "Istanbul"],
    ["Turan Turan Health Group", "Bursa"],
    ["Istanbul Aesthetics Centre", "Istanbul", "Clinic"],
    ["DentSpa", "Istanbul", "Clinic"],
    ["Liv Hospital", "Istanbul", "Hospital", {
      highlight: "JCI-accredited, with multilingual coordinators for international patients.",
      specialties: ["Pain medicine", "Bariatrics", "Cardiology"],
    }],
    ["Medicana Health Group", "Istanbul"],
    ["Istanbul Florence Nightingale Hospital", "Istanbul"],
    ["Medipol Mega University Hospital", "Istanbul"],
    ["Kadıköy Florence Nightingale Hospital", "Istanbul"],
    ["Kadıköy Florence Nightingale Medical Center", "Istanbul", "Clinic"],
    ["Liv Hospital Gaziantep", "Gaziantep"],
    ["Quartz Clinique", "Istanbul", "Clinic"],
    ["Acibadem Altunizade Hospital", "Istanbul"],
    ["Medipol Acıbadem Regional Hospital", "Istanbul"],
    ["Acibadem Ataşehir Hospital", "Istanbul"],
    ["Memorial Bahçelievler Hospital", "Istanbul"],
    ["Medicana Çamlıca Hospital", "Istanbul"],
    ["Medicana Ankara Hospital", "Ankara"],
    ["Anadolu Medical Center", "Gebze", "Hospital", {
      featured: true,
      highlight: "Turkey’s first hospital affiliated with Johns Hopkins Medicine.",
      specialties: ["Fertility", "Cardiology", "Cardiothoracic surgery"],
    }],
    ["Memorial Antalya Hospital", "Antalya"],
    ["Memorial Şişli Hospital", "Istanbul"],
    ["Medicana Avcılar Hospital", "Istanbul"],
    ["Ataşehir Florence Nightingale Hospital", "Istanbul"],
    ["Gayrettepe Florence Nightingale Hospital", "Istanbul"],
    ["Acibadem Beauty Centre", "Istanbul", "Department"],
  ],
  "United Arab Emirates": [
    ["NMC Royal Hospital Sharjah", "Sharjah"],
    ["Medcare Royal Specialty Hospital", "Dubai"],
    ["NMC Royal Women’s Hospital", "Abu Dhabi"],
    ["Medcare Hospital Sharjah", "Sharjah"],
    ["NMC Royal Hospital, DIP", "Dubai"],
    ["Medcare Women & Children Hospital", "Dubai"],
    ["American Hospital Dubai", "Dubai", "Hospital", {
      featured: true,
      highlight: "A quarter century of treating patients who travel in from 90+ countries.",
      specialties: ["Fertility", "Cardiology", "Cardiothoracic surgery"],
    }],
    ["American Hospital Dubai – Cosmetic Procedures", "Dubai", "Department"],
    ["NMC Specialty Hospital", "Abu Dhabi"],
    ["Fakih IVF Fertility Center", "Dubai", "Clinic"],
    ["NMC Specialty Hospital, Al Nahda", "Dubai"],
    ["NMC Royal Hospital, Mohammed Bin Zayed City", "Abu Dhabi"],
    ["Medcare Hospital Al Safa", "Dubai"],
    ["Medcare Orthopaedics and Spine Hospital", "Dubai"],
    ["CosmeSurge Clinic Dubai Marina", "Dubai", "Clinic"],
    ["Mediclinic Middle East Hospitals", "Dubai"],
    ["Bourn Hall Fertility Clinic", "Dubai", "Clinic"],
    ["Aster Hospitals", "Dubai"],
    ["King’s College Hospital Dubai", "Dubai"],
  ],
  "Czech Republic": [
    ["Multiscan Cancer Center", "Pardubice"],
    ["Beroun Rehabilitation Hospital", "Beroun"],
    ["Diagnostic Centre in Prague", "Prague", "Clinic"],
    ["Hořovice Hospital", "Hořovice", "Hospital", {
      highlight: "Rehabilitation for patients recovering from neurological and orthopaedic conditions.",
      specialties: ["Orthopaedics", "Rehabilitation", "General surgery"],
    }],
  ],
  Egypt: [
    ["Cleopatra Hospital", "Cairo"],
    ["Antoniadis Clinics", "Alexandria", "Clinic"],
    ["Andalusia Hospital Shallalat", "Alexandria"],
    ["Andalusia Hospital Maadi", "Cairo"],
    ["Ganzouri Specialized Hospital", "Cairo"],
    ["Dar Al Fouad Hospital", "6th of October City"],
  ],
  Germany: [
    ["Academic Hospital Solingen", "Solingen"],
    ["Kliniken Schmieder Heidelberg", "Heidelberg"],
    ["Kliniken Schmieder Allensbach", "Allensbach", "Hospital", {
      featured: true,
      highlight: "Germany’s leading specialist hospital for neurological rehabilitation.",
      specialties: ["Neurorehabilitation", "Neurology"],
    }],
  ],
  Kenya: [
    ["Gertrude's Children's Hospital", "Nairobi"],
    ["3rd Park Hospital", "Nairobi"],
    ["Harley Street Fertility Centre", "Nairobi", "Clinic"],
    ["Victoria IVF & Fertility Centre", "Nairobi", "Clinic"],
    ["The Nairobi West Hospital", "Nairobi"],
    ["HCG CCK Cancer Centre", "Nairobi"],
    ["Myra IVF Centre", undefined, "Clinic"],
    ["HCG CCK Daycare Chemotherapy Unit", "Nairobi", "Department"],
  ],
  Mauritius: [
    ["C-Care Grand Baie", "Grand Baie"],
    ["C-Care Hospital Darné", "Floréal"],
    ["C-Care Cancer Centre"],
    ["C-Care Wellkin"],
    ["C-Care Tamarin", "Tamarin"],
  ],
  Mexico: [
    ["Marroquín and Sandoval Plastic Surgery Clinic", "Guadalajara", "Clinic"],
    ["Galenia Hospital", "Cancún"],
  ],
  Spain: [
    ["Ruber Juan Bravo Hospital", "Madrid"],
    ["Hospital Ruber Internacional", "Madrid"],
    ["Clínica Tambre Madrid", "Madrid", "Clinic"],
    ["Clínica Tambre Alicante", "Alicante", "Clinic"],
    ["Hospital Universitario Fundación Jiménez Díaz", "Madrid"],
    ["Quirónsalud Torrevieja Hospital", "Torrevieja"],
    ["Dexeus University Hospital", "Barcelona", "Hospital", {
      highlight: "Over 90 years of clinical heritage in fertility and women’s health.",
      specialties: ["Fertility", "Gynaecology", "Cardiology"],
    }],
    ["Hospital Quirónsalud Barcelona", "Barcelona"],
    ["University Hospital Quirónsalud Madrid", "Madrid"],
    ["Sagrat Cor University Hospital", "Barcelona"],
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
    ["The Alexandra Hospital", "Manchester"],
    ["The Priory Hospital", "Birmingham"],
    ["Cleveland Clinic Moorgate Outpatient Centre", "London", "Clinic"],
    ["Circle Rehabilitation", "Birmingham"],
    ["Ross Hall Hospital", "Glasgow"],
    ["Beaumont Hospital", "Bolton"],
    ["The Blackheath Hospital", "Greenwich"],
    ["Cleveland Clinic London Hospital", "London"],
    ["King's College Hospital London", "London", "Hospital", {
      highlight: "Complex cases reviewed by multidisciplinary tumour boards.",
      specialties: ["Organ transplant", "Haematology", "Oncology"],
    }],
    ["Cleveland Clinic Portland Place Outpatient Centre", "London", "Clinic"],
    ["Cromwell Hospital", "London", "Hospital", {
      featured: true,
      highlight: "Central London private hospital caring for international patients for four decades.",
      specialties: ["Cardiology", "Dermatology", "Cardiothoracic surgery"],
    }],
    ["The London Clinic Hospital", "London", "Hospital", {
      featured: true,
      highlight: "A leading UK private hospital known for cancer care and surgical innovation.",
      specialties: ["Oncology", "Cardiology", "Colorectal surgery"],
    }],
    // London hospitals the partner sheet lists under "United States".
    ["London Independent Hospital", "London"],
    ["Bishops Wood Hospital Cancer Centre", "London"],
  ],
  Vietnam: [
    ["Vinmec Healthcare System", "Hanoi"],
    ["Vinmec Ha Long", "Ha Long"],
    ["Vinmec Da Nang", "Da Nang"],
    ["Vinmec Can Tho", "Can Tho"],
  ],
};

// The sheet lists some hospitals more than once; repeats get "-2", "-3"… slugs.
const slugCounts = new Map<string, number>();
const uniqueSlug = (name: string) => {
  const base = slugify(name);
  const n = (slugCounts.get(base) ?? 0) + 1;
  slugCounts.set(base, n);
  return n === 1 ? base : `${base}-${n}`;
};

export const facilities: Facility[] = Object.entries(seeds).flatMap(([country, list]) =>
  list.map(([name, city, type = "Hospital", extra = {}]) => ({
    slug: uniqueSlug(name),
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
