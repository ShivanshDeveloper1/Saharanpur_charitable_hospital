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
    href: '/doctors',
  },
     {
    label: 'Gallery',
    href: '/gallery',
  },
];