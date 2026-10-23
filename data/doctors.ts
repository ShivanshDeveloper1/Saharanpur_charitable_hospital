export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  Experience?: string;
  Qualification?: string;
  consultationFee?: string;
  slug: string; // <-- Add this
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
    slug: "dr-ajay-saamarthya-gupta",
    specialty: "Orthopedics / Joint Replacement",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    Experience: "10 years +",
    Qualification: "MBBS, MS",
    consultationFee: "₹500",
    opdTimings: { morning: "10:00 AM - 01:00 PM" },
    email: "dr.ajay@sakshamhospital.com",
    location: "Saharanpur Charitable Hospital, Near Officer's Colony, Janta Road, Saharanpur, UP - 247001",
    about: "Gold Medallist (Orthopedics) .",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "2",
    name: "Dr. Rajendran Pillai",
      slug: "dr-rajendran-pillai",
    specialty: "General Medicine",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
    Experience: "40 years +",
    Qualification: "MBBS, MD",
    consultationFee: "₹600",
    opdTimings: { morning: "11:00 AM - 02:00 PM" },
    email: "dr.ravi@sakshamhospital.com",
   location: "Saharanpur Charitable Hospital, Near Officer's Colony, Janta Road, Saharanpur, UP - 247001",
    about: "Expert advanced laparoscopic and minimally invasive laser surgeon with extensive surgical experience.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  // {
  //   id: "3",
  //   name: "Dr. Sharad Kumar Agarwal",
  //     slug: "dr-sharad-kumar-singh",
  //   specialty: "Urologist",
  //   image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
  //   Experience: "14 years",
  //   Qualification: "MBBS, MS, M.Ch (Urology)",
  //   consultationFee: "₹700",
  //   opdTimings: { morning: "10:00 AM - 12:00 PM" },
  //   email: "dr.sharad@sakshamhospital.com",
  //  location: "Saharanpur Charitable Hospital, Near Officer's Colony, Janta Road, Saharanpur, UP - 247001",
  //   about: "Dedicated urological surgeon specializing in stone management, endourology, and men's health.",
  //   socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  // },
  {
    id: "4",
    name: "Dr. Ratnakar",
      slug: "dr-ratnakar",
    specialty: "General Surgery",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=800&auto=format&fit=crop",
    Experience: "10 years +",
    Qualification: "MBBS, MS",
    consultationFee: "₹800",
    opdTimings: { evening: "04:00 PM - 07:00 PM" },
    email: "dr.thakkar@sakshamhospital.com",
 location: "Saksham Hospital, Near Officer's Colony, Delhi Road, Saharanpur, UP - 247001",
    about: "Experienced neurosurgeon specializing in brain and spine disorders.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "5",
    name: "Dr. Javeria Fatimah",
    specialty: "Gynaecology",
      slug: "dr-jaaveria-fatimah",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    Experience: "8 years +",
    Qualification: "MBBS, DGO",
    consultationFee: "₹500",
    opdTimings: { morning: "09:00 AM - 01:00 PM" },
    email: "dr.ananya@sakshamhospital.com",
   location: "Saksham Hospital, Near Officer's Colony, Delhi Road, Saharanpur, UP - 247001",
    about: "Compassionate pediatrician providing comprehensive child healthcare and vaccination services.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "6",
    name: "Dr. Surekha Meena",
    specialty: "Paediatrics",
      slug: "dr-surekha-meena",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=800&auto=format&fit=crop",
    Experience: "10 years +",
    Qualification: "MBBS, DCH, DNB",
    consultationFee: "₹600",
    opdTimings: { morning: "11:00 AM - 03:00 PM" },
    email: "dr.pooja@sakshamhospital.com",
    location: "Saksham Hospital, Near Officer's Colony, Delhi Road, Saharanpur, UP - 247001",
    about: "Expert in clinical dermatology, skin rejuvenation, and advanced aesthetic procedures.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
];