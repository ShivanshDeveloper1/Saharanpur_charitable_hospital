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
    label: 'Services',
    children: [
      {
        label: 'Orthopedics',
        href: '/orthopedics',
      },
      {
        label: 'Gynecology',
        href: '/gynecology',
      },
      {
        label: 'Pediatrics',
        href: '/pediatrics',
      },
      {
        label: 'General Physician',
        href: '/general-physician',
      },
      {
        label: 'General Surgery',
        href: '/general-surgery',
      },
    ],
  },
   {
    label: 'Contact',
    href: '/contact-us',
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