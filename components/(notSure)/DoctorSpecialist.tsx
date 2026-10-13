import Image from 'next/image';
import Link from 'next/link';

interface DoctorSpecialistProps {
  doctor?: {
    name: string;
    title: string;
    qualification: string;
    experience: string;
    philosophy: string;
    image: string;
    badge: string;
  };
  serviceTitle?: string;
  serviceSlug?: string;
}

export default function DoctorSpecialist({ doctor, serviceTitle = "Specialist", serviceSlug = "general" }: DoctorSpecialistProps) {
  // Fallback doctor info if none provided
  const doc = doctor || {
    name: "Dr. Samarthya Gupta, MD",
    title: "Senior Consultant Specialist",
    qualification: "Advanced Board Certified Specialist",
    experience: "15+ Years Clinical Experience",
    philosophy: "Dedicated to restoring optimal health through precision treatments and compassionate care.",
    image: "/doctors/samarthya_gupta_orthopedic surgen.webp",
    badge: "CHIEF CONSULTANT"
  };

  return (
    <div className="bg-background min-h-screen text-foreground antialiased selection:bg-accent-red selection:text-white">
      <section className="max-w-[1480px] mx-auto px-6 lg:px-16 py-12 lg:py-20">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#355775]/20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-accent-red"></span>
              <span className="text-xs uppercase font-mono tracking-widest text-accent-red font-bold">EXPERT CLINICAL LEADERSHIP</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text-dark uppercase">
              CONSULTING <span className="text-[#355775]">SPECIALIST</span>
            </h2>
          </div>
          <div className="text-xs font-mono text-text-muted flex items-center gap-4">
            <span>REF: SPEC-{serviceSlug.toUpperCase()}-LEAD</span>
            <span className="text-[#355775]/30">/</span>
            <span>PATIENT-FIRST CARE PATHWAY</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT COLUMN: PORTRAIT */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative bg-primary-dark p-2.5 sm:p-3 border border-[#355775]/25 shadow-sm group">
              <div className="relative overflow-hidden bg-primary-dark aspect-[3/4] max-h-[580px]">
                <Image 
                  src={doc.image} 
                  alt={doc.name} 
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="w-full h-full object-cover object-top filter grayscale-[10%] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-primary-dark/85 backdrop-blur-md px-3 py-1.5 border border-[#355775]/30 z-10">
                  <span className="text-[10px] font-mono tracking-widest text-[#DCEAF2] uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-red"></span>
                    {doc.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-primary-dark/85 backdrop-blur-md px-3 py-1.5 border border-[#355775]/30 z-10">
                  <span className="text-[10px] font-mono tracking-wider text-white uppercase">
                    ACTIVE IN-CLINIC TODAY
                  </span>
                </div>
              </div>

              <div className="mt-3 px-2 py-2 flex items-center justify-between text-[11px] font-mono text-[#DCEAF2] border-t border-[#355775]/30">
                <span className="text-text-muted">[{doc.title}]</span>
                <span className="text-[#DCEAF2] font-semibold">CAMPUS ID: 0{serviceSlug.length}-MED</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-surface border border-[#355775]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-none bg-[#DCEAF2]/60 border border-[#355775]/30 flex items-center justify-center text-primary-dark">
                  <svg className="w-4 h-4 text-primary-dark" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-text-muted">DIRECT VERIFICATION</p>
                  <p className="text-xs font-semibold text-text-dark">State Medical Board Registered</p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase text-[#355775] font-semibold bg-[#DCEAF2]/40 px-2 py-1 border border-[#355775]/20">CURRENT & ACTIVE</span>
            </div>
          </div>

          {/* RIGHT COLUMN: DOCTOR INFO */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-xs font-mono uppercase tracking-widest text-text-muted">{doc.title}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#355775]"></span>
                  <span className="text-xs font-mono uppercase tracking-wider text-accent-red font-bold">[{serviceTitle} DIVISION]</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black uppercase text-text-dark tracking-tight leading-none mb-3">
                  [{doc.name}]
                </h1>

                <p className="text-base sm:text-lg text-[#355775] font-semibold tracking-wide">
                  {doc.qualification}
                </p>
              </div>

              <div className="mb-8 p-6 bg-surface border-l-4 border-l-accent-red border-y border-r border-[#355775]/20 shadow-sm">
                <p className="text-xs font-mono uppercase text-text-muted mb-2 tracking-wider">CLINICAL PHILOSOPHY // DOCTOR STATEMENT</p>
                <p className="text-text-dark text-sm sm:text-base leading-relaxed">
                  [“{doc.philosophy}”]
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-surface border border-[#355775]/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">CREDENTIALS</span>
                    <span className="text-xs font-mono text-[#355775] font-semibold">01</span>
                  </div>
                  <h3 className="text-sm font-bold text-text-dark uppercase mb-1">[BOARD CERTIFICATION]</h3>
                  <p className="text-xs text-text-muted leading-relaxed">[{doc.qualification}]</p>
                </div>

                <div className="p-4 bg-surface border border-[#355775]/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">PRACTICE EXPERIENCE</span>
                    <span className="text-xs font-mono text-[#355775] font-semibold">02</span>
                  </div>
                  <h3 className="text-sm font-bold text-text-dark uppercase mb-1">[CLINICAL TENURE]</h3>
                  <p className="text-xs text-text-muted leading-relaxed">[{doc.experience}]</p>
                </div>
              </div>

              <div className="border-t border-b border-[#355775]/20 py-3 mb-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-text-dark">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-dark"></span>
                  <span className="text-text-muted">SECOND OPINIONS:</span>
                  <span className="font-bold">[AVAILABLE WEEKLY]</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-dark"></span>
                  <span className="text-text-muted">INSURANCE:</span>
                  <span className="font-bold">[MAJOR NETWORKS ACCEPTED]</span>
                </div>
              </div>
            </div>

            <div className="bg-primary-dark p-6 sm:p-8 border border-[#355775]/30 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent-red animate-ping"></span>
                    <span className="text-[11px] font-mono text-[#DCEAF2] tracking-wider uppercase font-semibold">NEXT AVAILABLE CLINIC: THIS WEEK</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase">
                    SCHEDULE CONSULTATION WITH [{doc.name}]
                  </h4>
                  <p className="text-xs text-[#DCEAF2]/80 mt-1">
                    Direct clinical evaluation, diagnostics review, and individualized treatment pathways.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-shrink-0 items-start sm:items-end gap-2">
                  <Link 
                    href="#book-appointment" 
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent-red hover:bg-[#c9183d] text-white font-bold text-xs uppercase tracking-widest transition-all duration-200 border border-accent-red shadow-md group w-full sm:w-auto"
                  >
                    <span>BOOK APPOINTMENT</span>
                  </Link>
                  <span className="text-[10px] font-mono text-[#DCEAF2]/60 tracking-wider">NO REFERRAL REQUIRED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-[#355775]/20 flex flex-wrap items-center justify-between text-xs font-mono text-text-muted gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-primary-dark"></span>
            <span>SECTION: CLINICAL_FACULTY // REF 10-DOC</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-text-dark cursor-pointer transition-colors">VIEW SURGICAL TEAM DIRECTORY</span>
            <span>/</span>
            <span className="text-text-dark font-semibold">NEXT: WHY CHOOSE OUR HOSPITAL &rarr;</span>
          </div>
        </div>

      </section>
    </div>
  );
}