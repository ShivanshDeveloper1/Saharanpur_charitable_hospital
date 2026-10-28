export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  Experience?: string;
  Qualification?: string;
  consultationFee?: string;
  slug: string;
  opdTimings?: {
    morning?: string;
    evening?: string;
  };
  email?: string;
  location?: string;
  about?: string;
  socials: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export const doctorsData: Doctor[] = [
  {
    id: "1",
    name: "Dr. Saamarthya Gupta",
    slug: "dr-saamarthya-gupta",
    specialty: "Orthopedics / Joint Replacement",
    image: "/doctors/samarthya_gupta_orthopedic_surgen.webp",
    Experience: "10 years +",
    Qualification: "MBBS, MS, FIJR (Fellowship in Joint Replacement), Gold Medallist",
    consultationFee: "₹100",
    opdTimings: { morning: "10:00 AM - 01:00 PM" },
    email: "saharanpurcharitablehospital@gmail.com",
    location: "Saharanpur Charitable Hospital, Jail Chungi, Dehradun Road, Opposite District Jail, Beribagh, Saharanpur, UP - 247001",
    about: "Gold Medallist in Orthopedics with over 10 years of experience and a Fellowship in Joint Replacement. Specializing in advanced joint surgeries, trauma care, and rehabilitation.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "2",
    name: "Dr. Rajendran Pillai",
    slug: "dr-rajendran-pillai",
    specialty: "General Physician",
    image: "/doctors/rajendra_pillai_General Medicine.jpeg",
    Experience: "40 years +",
    Qualification: "MBBS, MD (General Medicine)",
    consultationFee: "₹100",
    opdTimings: { morning: "11:00 AM - 02:00 PM" },
    email: "saharanpurcharitablehospital@gmail.com",
    location: "Saharanpur Charitable Hospital, Jail Chungi, Dehradun Road, Opposite District Jail, Beribagh, Saharanpur, UP - 247001",
    about: "Experienced General Medicine consultant with over 40 years of expertise in chronic disease management, infectious diseases, and comprehensive diagnostic evaluations.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "3",
    name: "Dr. Ratnakar",
    slug: "dr-ratnakar",
    specialty: "General Surgery",
    image: "/doctors/dr_ratnakar_general_surgery.jpeg",
    Experience: "10 years +",
    Qualification: "MBBS, MS (General Surgery)",
    consultationFee: "₹100",
    opdTimings: { evening: "04:00 PM - 07:00 PM" },
    email: "saharanpurcharitablehospital@gmail.com",
    location: "Saharanpur Charitable Hospital, Jail Chungi, Dehradun Road, Opposite District Jail, Beribagh, Saharanpur, UP - 247001",
    about: "Expert general surgeon specializing in laparoscopic procedures, emergency trauma management, and soft-tissue surgeries with a patient-first focus.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "4",
    name: "Dr. Javeria Fatimah",
    slug: "dr-jaaveria-fatimah",
    specialty: "Gynaecology & Obstetrics",
    image: "/doctors/Javeria_Fatimah_ gynecologist.jpeg",
    Experience: "8 years +",
    Qualification: "MBBS, DGO (Gynaecology)",
    consultationFee: "₹100",
    opdTimings: { morning: "09:00 AM - 01:00 PM" },
    email: "saharanpurcharitablehospital@gmail.com",
    location: "Saharanpur Charitable Hospital, Jail Chungi, Dehradun Road, Opposite District Jail, Beribagh, Saharanpur, UP - 247001",
    about: "Compassionate gynaecologist specializing in maternal care, high-risk pregnancies, adolescent health, and laparoscopic gynaecological procedures.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "5",
    name: "Dr. Surekha Meena",
    slug: "dr-surekha-meena",
    specialty: "Paediatrics",
    image: "/doctors/surekha_meena_paediatrics.jpeg",
    Experience: "10 years +",
    Qualification: "MBBS, DCH, DNB (Paediatrics)",
    consultationFee: "₹100",
    opdTimings: { morning: "10:00 AM - 01:00 PM" },
    email: "saharanpurcharitablehospital@gmail.com",
    location: "Saharanpur Charitable Hospital, Jail Chungi, Dehradun Road, Opposite District Jail, Beribagh, Saharanpur, UP - 247001",
    about: "Dedicated Paediatrician with over 10 years of experience in newborn care, childhood growth and development, immunizations, and paediatric emergency management.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
];


// data/doctors.ts (doctorsData ke neeche)
export function getDoctorBySlug(slug?: string): Doctor | undefined {
  if (!slug) return undefined;
  return doctorsData.find((d) => d.slug === slug);
}