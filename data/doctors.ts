export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
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
    specialty: "Consultant Internal Medicine & Cardio Diabetology",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "2",
    name: "Dr. Ravi Jain",
    specialty: "Laparoscopy and Laser Surgeon",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "3",
    name: "Dr. Sharad Kumar Agarwal",
    specialty: "Urologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "4",
    name: "Dr. Ravi Thakkar",
    specialty: "Neurosurgeon",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=800&auto=format&fit=crop",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "5",
    name: "Dr. Ananya Sharma",
    specialty: "Pediatric Specialist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
 
  {
    id: "8",
    name: "Dr. Pooja Verma",
    specialty: "Dermatologist & Cosmetologist",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=800&auto=format&fit=crop",
    socials: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" },
  },
];