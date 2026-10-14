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
    name: "Dr. Ajay Kumar Singh",
    slug: "dr-ajay-kumar-singh",
    specialty: "Consultant Internal Medicine & Cardio Diabetology",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    Experience: "5 years",
    Qualification: "MBBS, MD",
    consultationFee: "₹500",
    opdTimings: { morning: "10:00 AM - 01:00 PM" },
    email: "dr.ajay@sakshamhospital.com",
    location: "Saharanpur Charitable Hospital, Near Officer's Colony, Janta Road, Saharanpur, UP - 247001",
    about: "Specialized in managing complex internal medicine cases and comprehensive cardio-diabetology care.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "2",
    name: "Dr. Ravi Jain",
      slug: "dr-ravi-jain-singh",
    specialty: "Laparoscopy and Laser Surgeon",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
    Experience: "22 years",
    Qualification: "MBBS, MS",
    consultationFee: "₹600",
    opdTimings: { morning: "11:00 AM - 02:00 PM" },
    email: "dr.ravi@sakshamhospital.com",
   location: "Saharanpur Charitable Hospital, Near Officer's Colony, Janta Road, Saharanpur, UP - 247001",
    about: "Expert advanced laparoscopic and minimally invasive laser surgeon with extensive surgical experience.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "3",
    name: "Dr. Sharad Kumar Agarwal",
      slug: "dr-sharad-kumar-singh",
    specialty: "Urologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
    Experience: "14 years",
    Qualification: "MBBS, MS, M.Ch (Urology)",
    consultationFee: "₹700",
    opdTimings: { morning: "10:00 AM - 12:00 PM" },
    email: "dr.sharad@sakshamhospital.com",
   location: "Saharanpur Charitable Hospital, Near Officer's Colony, Janta Road, Saharanpur, UP - 247001",
    about: "Dedicated urological surgeon specializing in stone management, endourology, and men's health.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "4",
    name: "Dr. Ravi Thakkar",
      slug: "dr-ravi-thakkar-singh",
    specialty: "Neurosurgeon",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=800&auto=format&fit=crop",
    Experience: "18 years",
    Qualification: "MBBS, M.Ch (Neurosurgery)",
    consultationFee: "₹800",
    opdTimings: { evening: "04:00 PM - 07:00 PM" },
    email: "dr.thakkar@sakshamhospital.com",
 location: "Saksham Hospital, Near Officer's Colony, Delhi Road, Saharanpur, UP - 247001",
    about: "Experienced neurosurgeon specializing in brain and spine disorders.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "5",
    name: "Dr. Ananya Sharma",
    specialty: "Pediatric Specialist",
      slug: "dr-ananya-sharma-singh",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    Experience: "22 years",
    Qualification: "MBBS, MD (Pediatrics)",
    consultationFee: "₹500",
    opdTimings: { morning: "09:00 AM - 01:00 PM" },
    email: "dr.ananya@sakshamhospital.com",
   location: "Saksham Hospital, Near Officer's Colony, Delhi Road, Saharanpur, UP - 247001",
    about: "Compassionate pediatrician providing comprehensive child healthcare and vaccination services.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "6",
    name: "Dr. Pooja Verma",
    specialty: "Dermatologist & Cosmetologist",
      slug: "dr-pooja-verma-singh",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=800&auto=format&fit=crop",
    Experience: "22 years",
    Qualification: "MBBS, MD (Dermatology)",
    consultationFee: "₹600",
    opdTimings: { morning: "11:00 AM - 03:00 PM" },
    email: "dr.pooja@sakshamhospital.com",
    location: "Saksham Hospital, Near Officer's Colony, Delhi Road, Saharanpur, UP - 247001",
    about: "Expert in clinical dermatology, skin rejuvenation, and advanced aesthetic procedures.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "7",
    name: "Dr. Reena Rashmi",
    specialty: "Ultrasonologist",
      slug: "dr-reena-rashmi-singh",
    image: "https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    Experience: "10 years",
    Qualification: "MBBS, Dip U",
    consultationFee: "₹300",
    opdTimings: { morning: "02:00 PM - 04:00 PM" },
    email: "rr@r.com",
 location: "Saksham Hospital, Near Officer's Colony, Delhi Road, Saharanpur, UP - 247001",
    about: "Profile details are being updated. Please contact the hospital for more information about this consultant.",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
];