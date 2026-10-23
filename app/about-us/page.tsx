// app/about/page.jsx  (Next.js App Router + Tailwind CSS)
// Change everything inside CONFIG below. The page layout does not need to change.

const CONFIG = {
  name: "Shivansh Hospital",
  tagline: "Affordable healthcare and exceptional multi-speciality care, close to home.",
  phone: "+91 7618550475",
  emergencyPhone: "+91 7618550475",
  founded: "2026",
  stats: [
    { value: "24/7", label: "Emergency & ICU" },
    { value: "5+", label: "Expert Specialists" },
    { value: "95%", label: "Joint Replacement Success" },
    { value: "100%", label: "Compassionate Care" },
  ],
  locations: [
    {
      name: "Dehradun Chowk",
      address: "Dehradun Chowk, Saharanpur, Uttar Pradesh",
      timing: "OPD: 9 AM – 8 PM · Emergency: 24 hours",
      phone: "+91 7618550475",
      image: "photo-1538108149393-fbbd81895907",
    },
    {
      name: "Delhi Road",
      address: "Delhi Road, Saharanpur, Uttar Pradesh",
      timing: "OPD: 9 AM – 8 PM · Emergency: 24 hours",
      phone: "+91 7618550475",
      image: "photo-1586773860418-d37222d8fce3",
    },
  ],
  departments: [
    ["Emergency & Critical Care", "Round-the-clock emergency team, ICU, trauma surgeries, and intensive care."],
    ["Orthopaedics & Joint Replacement", "Affordable joint replacement center with high success rate, sports injuries, and fractures."],
    ["General Medicine", "Everyday illness, fever, diabetes, blood pressure and long-term medical conditions."],
    ["General Surgery", "General and laparoscopic surgery with a modern operation theatre."],
    ["Gynaecology & Obstetrics", "Pregnancy care, safe delivery and women's health."],
    ["Paediatrics", "Newborn and child care, vaccination and growth checks."],
    ["Diagnostics & Pathology", "In-house lab, X-ray, ultrasound and quick reports."],
  ],
  values: [
    ["Affordable & Transparent", "High-quality healthcare with fixed, transparent pricing and no compromise on patient care."],
    ["Ethical & Compassionate", "We offer personal, compassionate care ensuring no patient is ever wronged."],
    ["Always Reachable", "Doctors and staff available day and night, at both locations."],
  ],
  team: [
    { name: "Dr. Saamarthya Gupta", role: "Orthopaedics (MBBS, MS, FIJR, Gold Medallist)", image: "photo-1612349317150-e413f6a5b16d" },
    { name: "Dr. Rajendran Pillai", role: "General Medicine (MBBS, MD)", image: "photo-1559839734-2b71ea197ec2" },
    { name: "Dr. Javeria Fatimah", role: "Gynaecology (MBBS, DGO)", image: "photo-1594824476967-48c8b964273f" },
    { name: "Dr. Ratnakar", role: "General Surgery (MBBS, MS)", image: "photo-1537368910025-700350fe46c7" },
    { name: "Dr. Surekha Meena", role: "Paediatrics (MBBS, DCH, DNB)", image: "photo-1576091160399-112ba8d25d1d" },
  ],
  // Unsplash photo ids. If any image shows broken, swap the id with another from unsplash.com.
  images: {
    hero: "photo-1519494026892-80bbd2d6fd0d",
    heroSmall: "photo-1576091160399-112ba8d25d1d",
    story1: "photo-1551076805-e1869033e561",
    story2: "photo-1579684385127-1ef15d508118",
    cta: "photo-1631217868264-e5b90bb7e133",
  },
};

const img = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const metadata = {
  title: `About Us | ${CONFIG.name}`,
  description: `${CONFIG.name} is a multi-speciality hospital at Dehradun Chowk and Delhi Road.`,
};

export default function AboutPage() {
  const { images } = CONFIG;

  return (
    <main className="bg-white text-[#0F2A2E]">
      {/* HERO */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-8 md:grid-cols-2 md:py-12 lg:px-8">
        <div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Care that treats you like family, backed by every speciality under one roof.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#35545A]">
            {CONFIG.name} is a multi-speciality hospital serving the city from two locations,
            Dehradun Chowk and Delhi Road. Experienced doctors, modern equipment and an
            emergency team that is always on call.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/appointment"
              className="rounded-full bg-[#0E6B6B] px-6 py-3 font-medium text-white transition hover:bg-[#0B5555] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B6B]"
            >
              Book an appointment
            </a>
            <a
              href={`tel:${CONFIG.emergencyPhone.replace(/\s/g, "")}`}
              className="rounded-full border border-[#0E6B6B] px-6 py-3 font-medium text-[#0E6B6B] transition hover:bg-[#E3F2EF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B6B]"
            >
              Emergency: {CONFIG.emergencyPhone}
            </a>
          </div>
        </div>

        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img(images.hero, 1400)}
            alt="Hospital building and entrance"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover sm:aspect-[5/5]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img(images.heroSmall, 600)}
            alt="Doctor with stethoscope"
            className="absolute -bottom-6 -left-4 hidden aspect-square w-40 rounded-2xl border-4 border-white object-cover shadow-lg sm:block lg:-left-8 lg:w-48"
          />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0E6B6B] text-white">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-12 text-center md:grid-cols-4 lg:px-8">
          {CONFIG.stats.map((s) => (
            <div key={s.label}>
              <dd className="text-4xl font-semibold">{s.value}</dd>
              <dt className="mt-1 text-sm text-white/80">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* STORY */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 lg:px-8">
        <div className="grid grid-cols-2 gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img(images.story1, 700)}
            alt="Doctors discussing a patient's treatment"
            className="mt-10 aspect-[3/4] w-full rounded-2xl object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img(images.story2, 700)}
            alt="Modern medical equipment"
            className="aspect-[3/4] w-full rounded-2xl object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Our story
          </h2>
          <div className="mt-5 max-w-xl space-y-4 leading-relaxed text-[#35545A]">
            <p>
              {CONFIG.name} started in {CONFIG.founded} with a simple goal: people should not
              have to travel to a big city for good treatment. Today we offer more than
              a dozen specialities, a 24-hour emergency unit, ICU and an in-house
              diagnostic lab.
            </p>
            <p>
              Our mission is to give every patient accurate diagnosis, honest advice and
              respectful care, at a cost that families can manage.
            </p>
            <p>
              Whether you visit our Dehradun Chowk or Delhi Road branch, you meet the same
              standards, the same doctors and the same attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="bg-[#EEF6F5] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Our locations, one standard of care
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {CONFIG.locations.map((l) => (
              <article key={l.name} className="overflow-hidden rounded-3xl bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img(l.image, 1000)}
                  alt={`${l.name} branch`}
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold">{l.name}</h3>
                  <p className="mt-2 text-[#35545A]">{l.address}</p>
                  <p className="mt-1 text-sm text-[#35545A]">{l.timing}</p>
                  <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium">
                    <a
                      href={`tel:${l.phone.replace(/\s/g, "")}`}
                      className="rounded-full bg-[#0E6B6B] px-4 py-2 text-white hover:bg-[#0B5555]"
                    >
                      Call {l.phone}
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${CONFIG.name} ${l.name}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[#0E6B6B] px-4 py-2 text-[#0E6B6B] hover:bg-[#E3F2EF]"
                    >
                      Get directions
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[1fr_2fr] lg:px-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Specialities we offer
          </h2>
          <p className="mt-4 max-w-sm leading-relaxed text-[#35545A]">
            Most treatments are available at both branches. Call us if you are unsure which
            doctor to see.
          </p>
        </div>
        <ul className="divide-y divide-[#D5E5E3] border-y border-[#D5E5E3]">
          {CONFIG.departments.map(([title, text]) => (
            <li key={title} className="grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-[#35545A]">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* VALUES */}
      <section className="bg-[#0F2A2E] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            How we work
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {CONFIG.values.map(([title, text]) => (
              <div key={title} className="border-l-2 border-[#5FC4B8] pl-5">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-relaxed text-white/75">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Meet our doctors
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {CONFIG.team.map((d, i) => (
            <figure key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img(d.image, 600)}
                alt={d.name}
                className="aspect-[3/4] w-full rounded-2xl object-cover"
              />
              <figcaption className="mt-3">
                <p className="font-semibold">{d.name}</p>
                <p className="text-sm text-[#35545A]">{d.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(images.cta, 1800)}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[#0F2A2E]/80" />
        <div className="mx-auto max-w-3xl px-5 py-20 text-center text-white">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Need to see a doctor?
          </h2>
          <p className="mt-4 text-white/80">
            Book online or call the branch nearest to you. Emergency care is open 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="/appointment"
              className="rounded-full bg-white px-6 py-3 font-medium text-[#0F2A2E] hover:bg-[#E3F2EF]"
            >
              Book an appointment
            </a>
            <a
              href={`tel:${CONFIG.phone.replace(/\s/g, "")}`}
              className="rounded-full border border-white px-6 py-3 font-medium hover:bg-white/10"
            >
              Call {CONFIG.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}