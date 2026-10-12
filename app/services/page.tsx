import Image from "next/image";
import { Poppins, Playfair_Display } from "next/font/google";

const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
});

const serif = Playfair_Display({
  subsets: ["latin"],
  style: "italic",
  weight: "600",
});

// Dot grid with CSS only
const dots = (color: string) => ({
  backgroundImage: `radial-gradient(${color} 2px, transparent 2.5px)`,
  backgroundSize: "24px 24px",
});

export default function Page() {
  return (
 <main className={`${sans.className} min-h-screen overflow-hidden bg-medical-blue text-foreground`}>
      <section className="mx-auto grid max-w-8xl items-start gap-10 p-6 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:p-0 lg:pt-6">
        {/* LEFT */}
        <div className="relative mb-10 mr-8 lg:mb-12 lg:mr-10">
          {/* Offset frame line */}
          <div className="absolute inset-0 translate-x-8 translate-y-9 border border-primary-dark/40" />

          <div className="relative bg-surface p-8 lg:p-16">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-text-muted">
              Experience and quality
            </p>

            <h1 className="mt-6 text-6xl font-extrabold uppercase leading-[0.95] text-primary-dark lg:text-7xl">
              ADVANCED
              <span
                className={`${serif.className} block text-7xl font-semibold normal-case lg:text-8xl`}
              >
                ORTHOPEDIC
              </span>
              CARE
            </h1>

            <p className="mt-10 max-w-md text-base leading-7 text-text-muted">
              Expert care for bones, joints, and orthopedic surgery in
              Saharanpur. Your trusted partner for better movement and a
              healthier life.
            </p>

            <div className="mt-12 flex items-center">
              <button className="bg-accent-red px-4 py-5 text-base font-semibold text-text-light transition hover:bg-accent-red/90">
                Book appointment
              </button>

              <span className="h-px w-20 bg-primary-dark/40" />

              <span className="grid h-10 w-10 place-items-center rounded-full border border-primary-dark/40">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Red dots */}
            <div
              className="absolute bottom-3 right-3 hidden h-36 w-48 sm:block"
              style={dots("#E11D48")}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative aspect-[839/750] w-full">
          {/* L-shaped background panels */}
          <div className="absolute right-0 top-0 h-full w-[24%] bg-background" />
          <div className="absolute bottom-0 right-0 h-[27%] w-[52%] bg-background" />

          {/* Dot patterns */}
          <div
            className="absolute right-0 top-[17%] h-[20%] w-[20%]"
            style={dots("#E11D48")}
          />

          <div
            className="absolute bottom-[2%] left-[26%] h-[19%] w-[17%]"
            style={dots("#CBD5E1")}
          />

          {/* Photo */}
          <div className="relative h-[73%] w-[76%]">
            <Image
              src="https://plus.unsplash.com/premium_photo-1681967162693-4ad328adef4f?q=80&w=1152&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              alt="Physical therapy session"
              fill
              priority
              sizes="(min-width:1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>

          {/* Offer frame */}
          <div className="absolute bottom-[8%] right-[13%] grid h-[12%] w-[35%] place-items-center border border-primary-dark/40 bg-surface">
            <span className="text-2xl font-extrabold text-accent-red lg:text-4xl">
              20% OFF
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
