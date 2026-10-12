import type { Metadata } from "next";
import ContactPages from "@/components/(pages)/ContactPage";

export const metadata: Metadata = {
  title: "Contact SCHARI in Saharanpur | Hospital Appointments",
  description:
    "Contact SCHARI in Saharanpur, Uttar Pradesh, for hospital enquiries, appointments, department information, visiting hours and directions.",

  alternates: {
    canonical: "https://YOUR-REAL-DOMAIN/contact",
  },

  openGraph: {
    title: "Contact SCHARI | Hospital Appointments in Saharanpur",
    description:
      "Get hospital contact details, appointment assistance and directions to SCHARI in Saharanpur, Uttar Pradesh.",
    url: "https://YOUR-REAL-DOMAIN/contact",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return <ContactPages />;
}