export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

export const navData: NavItem[] = [
  {
    label: 'About Us',
    href: '/about-us',
  },
 {
  label: "Services",
  children: [
    {
      label: "Orthopedics",
      href: "/services/orthopedics",
    },
    {
      label: "Gynecology",
      href: "/services/gynecology",
    },
    {
      label: "Pediatrics",
      href: "/services/pediatrics",
    },
    {
      label: "General Physician",
      href: "/services/general-physician",
    },
    {
      label: "General Surgery",
      href: "/services/general-surgery",
    },
    {
      label: "Urology",
      href: "/services/urology",
    },
  ],
},
   {
    label: 'Contact',
    href: '/contact',
  },
{
    label: 'Doctors',
    href: '/#doctors-section', // Smooth scrolls to section ID
    children: [
      // Dynamically populated or explicitly listed list of doctors + View All link
      { label: "Dr. Ajay Kumar Singh", href: "/doctor/1" },
      { label: "Dr. Ravi Jain", href: "/doctor/2" },
      { label: "Dr. Sharad Kumar Agarwal", href: "/doctor/3" },
      { label: "Dr. Ravi Thakkar", href: "/doctor/4" },
      { label: "Dr. Ananya Sharma", href: "/doctor/5" },
      { label: "Dr. Pooja Verma", href: "/doctor/6" },
      { label: "Dr. Reena Rashmi", href: "/doctor/7" },
      { label: "View All Doctors", href: "/#doctors-section" },
    ]
  },
     {
    label: 'Gallery',
    href: '/gallery',
  },
];