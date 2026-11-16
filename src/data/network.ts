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
  { name: "China", code: "CN", region: "Asia", hospitals: 5 },
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
    ["Asia Cosmetic Hospital", "Nonthaburi"],
    ["Bangkok Hospital Campus", "Bangkok"],
    ["Bumrungrad International Hospital", "Bangkok", "Hospital", {
      featured: true,
      highlight: "Over 1,300 specialist physicians, more than 200 of them US board-certified.",
      specialties: ["Cardiology", "Cardiothoracic surgery", "Colorectal surgery"],
    }],
    ["MedPark Hospital", "Bangkok"],
    ["Phyathai 2 Hospital", "Bangkok"],
    ["Samitivej Sukhumvit Hospital", "Bangkok"],
    ["Vejthani Hospital", "Bangkok"],
    ["VitalLife Scientific Wellness Center", "Bangkok", "Wellness centre"],
    ["VitalLife Scientific Wellness Center Phuket", "Phuket", "Wellness centre"],
  ],
  India: [
    ["Accord Hospital", "Faridabad"],
    ["Apollo Athenaa Women’s Hospital", "Defence Colony, New Delhi"],
    ["Apollo AyurVAID Hospitals, Bengaluru", "Domlur, Bengaluru"],
    ["Apollo Cancer Centre Teynampet", "Teynampet, Chennai"],
    ["Apollo Children’s Hospital", "Thousand Lights, Chennai"],
    ["Apollo Excelcare Hospital", "Guwahati"],
    ["Apollo Heart Centre, Chennai", "Greams Road, Chennai"],
    ["Apollo Hospital, Mumbai", "CBD Belapur, Navi Mumbai"],
    ["Apollo Hospitals, Bangalore", "Bannerghatta Road, Bengaluru"],
    ["Apollo Hyderabad", "Hyderabad"],
    ["Apollo Main Hospitals, Greams Lane Chennai", "Greams Road, Chennai"],
    ["Apollo Multispeciality Hospitals, Kolkata", "Kolkata"],
    ["Apollo One Greams Road Chennai", "Greams Road, Chennai"],
    ["Apollo Proton Cancer Centre, Chennai", "Taramani, Chennai"],
    ["Apollo Speciality Hospitals, Vanagaram", "Vanagaram, Chennai"],
    ["Artemis Hospital Gurgaon", "Gurugram"],
    ["BLK-Max Super Speciality Hospital Delhi", "Rajinder Nagar, New Delhi"],
    ["Fortis Hospital, Anandapur, Kolkata", "Kolkata"],
    ["Fortis Hospital, Bannerghatta Road, Bangalore", "Bengaluru"],
    ["Fortis Hospital, Mulund, Mumbai", "Mumbai"],
    ["Fortis Hospital, Noida", "Noida"],
    ["Fortis Hospital, Shalimar Bagh, New Delhi", "Shalimar Bagh, New Delhi"],
    ["Fortis La Femme, Greater Kailash II, New Delhi", "Greater Kailash II, New Delhi"],
    ["Fortis Memorial Research Institute (FMRI)", "Gurugram"],
    ["Gleneagles BGS Hospital, Kengeri, Bengaluru", "Bengaluru"],
    ["Gleneagles Global Health City", "Chennai"],
    ["Gleneagles Global Hospital, Hyderabad", "Hyderabad"],
    ["Gleneagles Hospital, Parel, Mumbai", "Mumbai"],
    ["HCG Cancer Centre K. R. Road, Bengaluru", "Bengaluru"],
    ["HCG Cancer Hospital – Borivali, Mumbai", "Mumbai"],
    ["HCG Cancer Hospital – Newtown, Kolkata", "Kolkata"],
    ["HCG Hospital, Ahmedabad", "Ahmedabad"],
    ["Indraprastha Apollo Hospitals, New Delhi", "Sarita Vihar, New Delhi", "Hospital", {
      featured: true,
      highlight: "India’s largest hospital network, with thousands of cardiac surgeries and transplants each year.",
      specialties: ["Fertility", "Cardiology", "Colorectal surgery"],
    }],
    ["Jay Prabha Medanta Super Speciality Hospital, Patna", "Patna"],
    ["Kokilaben Dhirubhai Ambani Hospital", "Mumbai"],
    ["Manipal Hospital, Bangalore", "Bengaluru"],
    ["Manipal Hospital, Dwarka Delhi", "Dwarka, New Delhi"],
    ["Manipal Hospital, Jaipur", "Jaipur"],
    ["Max Hospital, Gurgaon, Haryana", "Gurugram"],
    ["Max Super Speciality Hospital, Dehradun", "Dehradun"],
    ["Max Super Speciality Hospital, Mohali", "Mohali"],
    ["Max Super Speciality Hospital, Saket (West Block)", "Saket, New Delhi"],
    ["Max Super Speciality Hospital, Vaishali", "Vaishali, Ghaziabad"],
    ["Max Super Speciality Hospital, Patparganj", "Patparganj, Delhi"],
    ["Medanta – The Medicity, Gurugram", "Gurugram", "Hospital", {
      highlight: "Founded by a renowned cardiac surgeon; known worldwide for complex heart procedures.",
      specialties: ["Cardiology", "Cardiothoracic surgery", "Colorectal surgery"],
    }],
    ["Medanta Super Speciality Hospital, Lucknow", "Lucknow"],
    ["Medicover Cancer Institute, Hyderabad", "HITEC City, Hyderabad"],
    ["Medicover Cancer Institute, Visakhapatnam", "Arilova, Visakhapatnam"],
    ["Medicover Fertility Centre, Hyderabad", "HITEC City, Hyderabad", "Clinic"],
    ["Medicover Hospitals Financial District, Hyderabad", "Financial District, Hyderabad"],
    ["Medicover Hospitals Hitech City, Hyderabad", "HITEC City, Hyderabad"],
    ["Medicover Hospitals MVP, Visakhapatnam", "MVP Colony, Visakhapatnam"],
    ["Medicover Hospitals, Bengaluru", "Bengaluru"],
    ["Medicover Hospitals, Navi Mumbai", "Navi Mumbai"],
    ["MIOT International", "Chennai"],
    ["Nanavati Max Hospital", "Mumbai"],
    ["NeuroGen Brain & Spine Institute", "Mumbai"],
    ["Rainbow Children’s Hospital & BirthRight – Bengaluru", "Bengaluru"],
    ["Rainbow Children’s Hospital & BirthRight – Chennai", "Chennai"],
    ["Rainbow Children’s Hospital & BirthRight – Delhi", "Delhi"],
    ["Rainbow Children’s Hospital & BirthRight – Hyderabad", "Hyderabad"],
    ["Wockhardt Hospital Heart Speciality, Nagpur", "Gandhi Nagar, Nagpur"],
    ["Wockhardt Hospital, Mumbai Central", "Mumbai Central, Mumbai"],
    ["Wockhardt Hospital, Nashik", "Nashik"],
    ["Wockhardt Hospital, Rajkot", "Rajkot"],
    ["Wockhardt Super Speciality Hospital, Mira Road", "Mira Road, Mumbai"],
    ["Wockhardt Super Speciality Hospital, Nagpur", "Gandhi Nagar, Nagpur"],
    ["Yashoda Hospitals", "Hyderabad"],
  ],
  China: [
    ["Beijing GoBroad Hospital", "Beijing"],
    ["Beijing Jingdu Children’s Hospital", "Beijing"],
    ["Foshan Fosun Chancheng Hospital", "Foshan"],
    ["Fuda Cancer Hospital, Guangzhou", "Guangzhou", "Hospital", {
      highlight: "Specialist oncology centre focused on minimally invasive cancer treatment.",
      specialties: ["Oncology"],
    }],
    ["Kunming Tongren Hospital", "Kunming"],
  ],
  Singapore: [
    ["Icon Cancer Centre Farrer Park", "Farrer Park", "Clinic"],
    ["Icon Cancer Centre Gleneagles", "Napier Road", "Clinic"],
    ["Icon Cancer Centre Mount Alvernia", "Thomson Road", "Clinic"],
    ["Icon Cancer Centre Mount Elizabeth", "Mount Elizabeth", "Clinic"],
    ["Icon Cancer Centre Novena", "Novena", "Clinic"],
    ["Icon Haematology Centre – Mount Elizabeth", "Mount Elizabeth", "Clinic"],
    ["Raffles Hospital Bugis", "Bugis", "Hospital", {
      featured: true,
      highlight: "Inpatient, outpatient, specialist and traditional Chinese medicine under one roof.",
      specialties: ["Fertility", "Cardiology", "Cardiothoracic surgery"],
    }],
    ["Raffles Medical Centre Holland V", "Holland Village", "Clinic"],
    ["Raffles Medical Centre Orchard", "Orchard", "Clinic"],
    ["Raffles Medical Changi Airport Terminal 3", "Changi Airport", "Clinic"],
    ["Raffles Medical Marina Bay Financial Centre (MBFC)", "Marina Bay", "Clinic"],
  ],
  Malaysia: [
    ["Ara Damansara Medical Centre", "Shah Alam"],
    ["Beacon Hospital", "Petaling Jaya"],
    ["Bukit Tinggi Medical Centre", "Klang"],
    ["Damansara Specialist Hospital 2", "Bukit Lanjan, Kuala Lumpur"],
    ["Gleneagles Hospital Johor", "Johor Bahru"],
    ["Gleneagles Hospital Kota Kinabalu", "Kota Kinabalu"],
    ["Gleneagles Hospital Kuala Lumpur", "Kuala Lumpur"],
    ["Gleneagles Hospital Penang", "George Town"],
    ["Island Hospital Penang", "George Town"],
    ["KPJ Ampang Puteri Specialist Hospital", "Ampang"],
    ["KPJ Damansara Fertility Centre", "Petaling Jaya", "Clinic"],
    ["KPJ Damansara Specialist Hospital", "Jalan Tun Razak, Kuala Lumpur"],
    ["KPJ Damansara Specialist Hospital", "Petaling Jaya"],
    ["KPJ Johor Specialist Hospital", "Johor Bahru"],
    ["KPJ Penang Specialist Hospital", "Bukit Mertajam"],
    ["KPJ Sentosa KL Specialist Hospital", "Titiwangsa, Kuala Lumpur"],
    ["KPJ Tawakkal KL Specialist Hospital", "Pekeliling, Kuala Lumpur"],
    ["Mahkota Medical Centre", "Melaka"],
    ["Monash IVF KPJ Johor Fertility Centre", "Johor Bahru", "Clinic"],
    ["National Heart Institute", "Kuala Lumpur"],
    ["Northern Heart Hospital Penang", "Penang"],
    ["Pantai Hospital Kuala Lumpur", "Kuala Lumpur"],
    ["Pantai Hospital Melaka", "Melaka"],
    ["Pantai Hospital Penang", "Penang"],
    ["ParkCity Medical Centre", "Kuala Lumpur"],
    ["Prince Court Medical Centre", "Kuala Lumpur", "Hospital", {
      highlight: "Consistently rated among Asia’s best for international patient experience.",
      specialties: ["Cardiology", "Cardiothoracic surgery", "Dentistry"],
    }],
    ["Subang Jaya Medical Centre (SJMC)", "Subang Jaya"],
    ["Sunway Fertility Centre", "Subang Jaya", "Clinic"],
    ["Sunway Fertility Centre, Sunway Velocity", "Kuala Lumpur", "Clinic"],
    ["Sunway Medical Centre", "Petaling Jaya"],
  ],
  "South Korea": [
    ["JK Plastic Surgery Centre", "Seoul", "Clinic"],
    ["JW Plastic Surgery", "Seoul", "Clinic"],
    ["Samsung Medical Center", "Seoul", "Hospital", {
      featured: true,
      highlight: "Among Asia’s top hospitals for cancer treatment and organ transplants.",
      specialties: ["Oncology", "Organ transplant", "Cardiology"],
    }],
    ["Severance Hospital", "Seoul"],
  ],
  "Saudi Arabia": [
    ["Andalusia Dental Center", "Mishrifah, Jeddah", "Clinic"],
    ["Andalusia Family Health Clinics", "Al Sanabel, Jeddah", "Clinic"],
    ["Andalusia Hai Al-Jamaa", "Al Jamiah, Jeddah"],
    ["Andalusia Hospital Jeddah", "Al Jamiah, Jeddah"],
    ["Andalusia Kids Wellness Center", "Al Bawadi, Jeddah", "Wellness centre"],
    ["Andalusia Ladies Wellness Center", "Al Mohammadiyyah, Jeddah", "Wellness centre"],
  ],
  Turkey: [
    ["Acibadem Altunizade Hospital", "Üsküdar, Istanbul"],
    ["Acibadem Altunizade Hospital", "Üsküdar, Istanbul"],
    ["Acibadem Atakent Hospital", "Küçükçekmece, Istanbul"],
    ["Acibadem Ataşehir Hospital", "Ataşehir, Istanbul"],
    ["Acibadem Bakırköy Hospital", "Bakırköy, Istanbul"],
    ["Acibadem Beauty Center", "Bakırköy, Istanbul", "Clinic"],
    ["Acibadem International Hospital", "Bakırköy, Istanbul"],
    ["Acibadem Kadıköy Hospital", "Kadıköy, Istanbul"],
    ["Acibadem Maslak Hospital", "Sarıyer, Istanbul"],
    ["Acibadem Poliklinikleri A.Ş.", "Kadıköy, Istanbul", "Clinic"],
    ["Acibadem Taksim Hospital", "Şişli, Istanbul"],
    ["Acıbadem Beauty Center", "Ataşehir, Istanbul", "Clinic"],
    ["Acıbadem Bodrum", "Bodrum"],
    ["Acıbadem Fulya Hospital", "Beşiktaş, Istanbul"],
    ["Acıbadem Kartal Hastanesi", "Kartal, Istanbul"],
    ["Acıbadem Sağlık Hizmetleri ve Ticaret A.Ş.", "Ataşehir, Istanbul"],
    ["Anadolu Medical Center", "Gebze, Kocaeli", "Hospital", {
      featured: true,
      highlight: "Turkey’s first hospital affiliated with Johns Hopkins Medicine.",
      specialties: ["Fertility", "Cardiology", "Cardiothoracic surgery"],
    }],
    ["Ataşehir Florence Nightingale Hospital", "Ataşehir, Istanbul"],
    ["Ataşehir Outpatient Clinic", "Ataşehir, Istanbul", "Clinic"],
    ["Bağdat Outpatient Clinic", "Kadıköy, Istanbul", "Clinic"],
    ["DentSpa Healthcare Group", "Şişli, Istanbul", "Clinic"],
    ["Gayrettepe Florence Nightingale Hospital", "Beşiktaş, Istanbul"],
    ["İstanbul Aesthetic Center", "Beşiktaş, Istanbul", "Clinic"],
    ["Istanbul Florence Nightingale Hospital", "Şişli, Istanbul"],
    ["İSÜ Liv Hospital Bahçeşehir", "Esenyurt, Istanbul"],
    ["Kadıköy Florence Nightingale Hospital", "Kadıköy, Istanbul"],
    ["Kadıköy Florence Nightingale Medical Center", "Kadıköy, Istanbul", "Clinic"],
    ["Liv Hospital", "Beşiktaş, Istanbul", "Hospital", {
      highlight: "JCI-accredited, with multilingual coordinators for international patients.",
      specialties: ["Pain medicine", "Bariatrics", "Cardiology"],
    }],
    ["Liv Hospital Ankara", "Ankara"],
    ["Liv Hospital Gaziantep", "Gaziantep"],
    ["Liv Hospital Vadistanbul", "Sarıyer, Istanbul"],
    ["Medicana Ankara Hospital", "Ankara"],
    ["Medicana Avcılar Hospital", "Avcılar, Istanbul"],
    ["Medicana Bahçelievler Hospital", "Bahçelievler, Istanbul"],
    ["Medicana Çamlıca Hospital", "Üsküdar, Istanbul"],
    ["Medicana International Istanbul Hospital", "Beylikdüzü, Istanbul"],
    ["Medicana Konya Hospital", "Konya"],
    ["Medicana Samsun Hospital", "Samsun"],
    ["Medipol Acıbadem Regional Hospital", "Kadıköy, Istanbul"],
    ["Medipol Bahçelievler Hospital", "Bahçelievler, Istanbul"],
    ["Medipol Mega University Hospital", "Bağcılar, Istanbul"],
    ["Memorial Ankara Hospital", "Ankara"],
    ["Memorial Antalya Hospital", "Antalya"],
    ["Memorial Ataşehir Hospital", "Ataşehir, Istanbul"],
    ["Memorial Bahçelievler Hospital", "Bahçelievler, Istanbul"],
    ["Memorial Şişli Hastanesi", "Şişli, Istanbul"],
    ["Memorial Şişli Hospital", "Şişli, Istanbul"],
    ["Quartz Clinique", "Şişli, Istanbul", "Clinic"],
    ["Turan Turan Health Group", "Bursa"],
  ],
  "United Arab Emirates": [
    ["Aesthetics by King’s College Hospital London in Dubai", "Dubai", "Clinic"],
    ["American Hospital Dubai", "Dubai", "Hospital", {
      featured: true,
      highlight: "A quarter century of treating patients who travel in from 90+ countries.",
      specialties: ["Fertility", "Cardiology", "Cardiothoracic surgery"],
    }],
    ["American Hospital Dubai – Cosmetic Procedures", "Dubai", "Department"],
    ["Aster Hospital, Al Qusais", "Al Qusais, Dubai"],
    ["Aster Hospital, Mankhool", "Mankhool, Dubai"],
    ["Aster Hospital, Sharjah", "Sharjah"],
    ["Bourn Hall Fertility Clinic Dubai", "Dubai", "Clinic"],
    ["Burjeel Hospital for Advanced Surgery", "Dubai"],
    ["Burjeel Medical City", "Abu Dhabi"],
    ["Burjeel Speciality Hospital", "Sharjah"],
    ["CosmeSurge Clinic Dubai Marina", "Dubai", "Clinic"],
    ["Dubai Jumeirah Clinic Medical Centre", "Jumeirah, Dubai", "Clinic"],
    ["Dubai Marina Clinic Medical Centre", "Dubai Marina, Dubai", "Clinic"],
    ["Fakeeh University Hospital", "Dubai"],
    ["Fakih IVF Fertility Center Dubai", "Dubai", "Clinic"],
    ["Fakih IVF Fertility Centre Abu Dhabi", "Abu Dhabi", "Clinic"],
    ["King’s College Hospital London – Dubai", "Dubai Hills, Dubai"],
    ["Medcare Hospital, Al Safa", "Al Safa, Dubai"],
    ["Medcare Hospital, Sharjah", "Sharjah"],
    ["Medcare Orthopaedics and Spine Hospital", "Sheikh Zayed Road, Dubai"],
    ["Medcare Royal Speciality Hospital", "Al Qusais, Dubai"],
    ["Medcare Women & Children Hospital", "Sheikh Zayed Road, Dubai"],
    ["Mediclinic City Hospital", "Dubai Healthcare City, Dubai"],
    ["Mediclinic Parkview Hospital", "Al Barsha South, Dubai"],
    ["Mediclinic Welcare Hospital", "Al Garhoud, Dubai"],
    ["Moorfields Eye Hospital Dubai", "Dubai"],
    ["NMC Royal Hospital, Mohammed Bin Zayed City", "Mohammed Bin Zayed City, Abu Dhabi"],
    ["NMC Royal Hospital Sharjah", "Sharjah"],
    ["NMC Royal Hospital, DIP", "Dubai Investments Park, Dubai"],
    ["NMC Royal Hospital, Khalifa City", "Khalifa City, Abu Dhabi"],
    ["NMC Royal Women’s Hospital", "Al Manhal, Abu Dhabi"],
    ["NMC Speciality Hospital, Abu Dhabi", "Al Danah, Abu Dhabi"],
    ["NMC Speciality Hospital, Dubai Investments Park", "Dubai Investments Park, Dubai"],
    ["NMC Speciality Hospital, Al Nahda", "Al Nahda, Dubai"],
    ["Tajmeel Clinic, Al Karamah", "Abu Dhabi", "Clinic"],
  ],
  "Czech Republic": [
    ["Beroun Rehabilitation Hospital", "Beroun"],
    ["Diagnostic Centre in Prague", "Prague", "Clinic"],
    ["Hořovice Hospital", "Hořovice", "Hospital", {
      highlight: "Rehabilitation for patients recovering from neurological and orthopaedic conditions.",
      specialties: ["Orthopaedics", "Rehabilitation", "General surgery"],
    }],
    ["Multiscan Cancer Center", "Pardubice", "Clinic"],
  ],
  Egypt: [
    ["Al Shorouk Hospital", "Al Sahafeyeen, Giza"],
    ["Alkatib Hospital", "Dokki, Giza"],
    ["Andalusia Hospital Maadi", "Cairo"],
    ["Andalusia Hospital Smouha", "Smouha, Alexandria"],
    ["Andalusia Hospital Shallalat", "Shallalat, Alexandria"],
    ["Antoniadis Clinics", "Sidi Gaber, Alexandria", "Clinic"],
    ["As-Salam International Hospital", "Cairo"],
    ["Cairo Specialized Hospital", "Heliopolis, Cairo"],
    ["Cleopatra October Hospital", "6th of October City, Giza"],
    ["Cleopatra Hospital", "Heliopolis, Cairo"],
    ["Dar Al Fouad Hospital, 6th of October", "Giza"],
    ["Ganzouri Specialized Hospital", "Cairo"],
    ["Nile Badrawy Hospital", "Maadi, Cairo"],
  ],
  Germany: [
    ["Academic Hospital Solingen", "Solingen"],
    ["Kliniken Schmieder Allensbach", "Allensbach", "Hospital", {
      featured: true,
      highlight: "Germany’s leading specialist hospital for neurological rehabilitation.",
      specialties: ["Neurorehabilitation", "Neurology"],
    }],
    ["Kliniken Schmieder Heidelberg", "Heidelberg"],
  ],
  Kenya: [
    ["3rd Park Hospital", "Nairobi"],
    ["Cosmed Plus", "Nairobi", "Clinic"],
    ["Gertrude’s Children’s Hospital", "Nairobi"],
    ["Harley Street Fertility Centre", "Nairobi", "Clinic"],
    ["HCG CCK Cancer Center", "Parklands, Nairobi"],
    ["HCG CCK Daycare Chemotherapy Unit", "Upper Hill, Nairobi", "Department"],
    ["Myra IVF Centre Mombasa", "Mombasa", "Clinic"],
    ["Myra IVF Centre Nairobi", "Nairobi", "Clinic"],
    ["The Nairobi West Hospital", "Nairobi"],
    ["Victoria IVF & Fertility Centre", "Nairobi", "Clinic"],
  ],
  Mauritius: [
    ["C-Care Cancer Centre", "Floréal, Curepipe"],
    ["C-Care Grand Baie", "Grand Baie"],
    ["C-Care Hospital Darné", "Floréal, Curepipe"],
    ["C-Care Tamarin", "Tamarin"],
    ["C-Care Wellkin", "Moka"],
  ],
  Mexico: [
    ["Galenia Hospital", "Cancún"],
    ["Marroquín & Sandoval Plastic Surgery", "Guadalajara", "Clinic"],
  ],
  Spain: [
    ["Clínica Tambre Alicante", "Alicante", "Clinic"],
    ["Clínica Tambre Madrid", "Madrid", "Clinic"],
    ["Dexeus University Hospital", "Barcelona", "Hospital", {
      highlight: "Over 90 years of clinical heritage in fertility and women’s health.",
      specialties: ["Fertility", "Gynaecology", "Cardiology"],
    }],
    ["Hospital Quirónsalud Barcelona", "Barcelona"],
    ["Hospital Ruber Internacional", "Madrid"],
    ["Hospital Ruber Juan Bravo", "Madrid"],
    ["Hospital Universitario Fundación Jiménez Díaz", "Madrid"],
    ["Quirónsalud Torrevieja Hospital", "Torrevieja, Alicante"],
    ["Sagrat Cor University Hospital", "Barcelona"],
    ["University Hospital Quirónsalud Madrid", "Madrid"],
  ],
  Switzerland: [
    ["Hirslanden Klinik", "Zürich", "Hospital", {
      featured: true,
      highlight: "Part of Switzerland’s largest private hospital group, strong in precision oncology and cardiac care.",
      specialties: ["Bariatrics", "Cardiology", "Oncology"],
    }],
  ],
  Uganda: [["International Hospital Kampala", "Kampala"]],
  "United Kingdom": [
    ["Albyn Hospital", "Aberdeen"],
    ["Beaumont Hospital", "Bolton"],
    ["Circle Rehabilitation Birmingham", "Birmingham"],
    ["Cleveland Clinic London Hospital", "Belgravia, London"],
    ["Cleveland Clinic Moorgate Outpatient Centre", "Moorgate, London", "Clinic"],
    ["Cleveland Clinic Portland Place Outpatient Centre", "Portland Place, London", "Clinic"],
    ["Cromwell Hospital", "London", "Hospital", {
      featured: true,
      highlight: "Central London private hospital caring for international patients for four decades.",
      specialties: ["Cardiology", "Dermatology", "Cardiothoracic surgery"],
    }],
    ["King’s College Hospital", "London", "Hospital", {
      highlight: "Complex cases reviewed by multidisciplinary tumour boards.",
      specialties: ["Organ transplant", "Haematology", "Oncology"],
    }],
    ["Ross Hall Hospital", "Glasgow"],
    ["The Alexandra Hospital", "Cheadle, Manchester"],
    ["The Blackheath Hospital", "London"],
    ["The London Clinic", "London", "Hospital", {
      featured: true,
      highlight: "A leading UK private hospital known for cancer care and surgical innovation.",
      specialties: ["Oncology", "Cardiology", "Colorectal surgery"],
    }],
    ["The Park Hospital", "Nottingham"],
    ["The Priory Hospital", "Birmingham"],
  ],
  Vietnam: [
    ["Vinmec Can Tho", "Can Tho"],
    ["Vinmec Central Park International Hospital", "Ho Chi Minh City"],
    ["Vinmec Da Nang", "Da Nang"],
    ["Vinmec Ha Long", "Ha Long"],
    ["Vinmec Nha Trang International Hospital", "Nha Trang"],
    ["Vinmec Phu Quoc International Hospital", "Phu Quoc"],
    ["Vinmec Times City International Hospital", "Hanoi"],
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
