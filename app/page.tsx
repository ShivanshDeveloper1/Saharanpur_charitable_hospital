import Hero from "@/components/(Homepage)/Hero";
import Image from "next/image";
import PatientStories from "../components/(Homepage)/PatientStories";
import ServicesGrid from "@/components/(Homepage)/ServicesGrid";
import DoctorsSection from "@/components/(Homepage)/DoctorsSection";
import Footer from "@/components/(Homepage)/Footer";

export default function Home() {
  return (
<>
<Hero/>
<PatientStories  />
<ServicesGrid />
<DoctorsSection />
<Footer />

</>
  );
}