export interface FooterLink {
  name: string;
  href: string;
}

export const footerData = {
  hospitalInfo: {
    name: "Saharanpur Charitable Hospital",
    address: "Jail Chungi, Saharanpur, Uttar Pradesh 247001",
    landmark: "Near I.P.S Home",
    phone: "+91-8511775579",
    email: "shivanshsingh4539@gmail.com",
    logoUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=300&auto=format&fit=crop", // Replace with your logo path (e.g. /logo.png)
  },
  usefulLinks: [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Vision & Mission", href: "/vision-mission" },
  ],
  ourServices: [
    { name: "Patients Visitors", href: "/patients-visitors" },
    { name: "Find a Doctors", href: "/doctors" },
    { name: "Admission Procedure", href: "/admission-procedure" },
    { name: "Health Package", href: "/health-packages" },
  ],
  newsEvents: [
    { name: "Career", href: "/career" },
    { name: "Blog", href: "/blog" },
    { name: "Video Gallery", href: "/video-gallery" },
    { name: "Contact Us", href: "/contact" },
  ],
  socialLinks: [
    {
      id: "facebook",
      name: "Facebook",
      href: "https://facebook.com",
      bgClass: "bg-[#3b5998]",
    },
    {
      id: "youtube",
      name: "YouTube",
      href: "https://youtube.com",
      bgClass: "bg-[#ff0000]",
    },
    {
      id: "instagram",
      name: "Instagram",
      href: "https://instagram.com",
      bgClass: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      href: "https://linkedin.com",
      bgClass: "bg-[#0077b5]",
    },
  ],
};