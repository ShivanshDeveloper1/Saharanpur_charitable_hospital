import React from 'react';

interface ProblemItem {
  id: string;
  track: string;
  title: string;
  description: string;
}

interface ProblemsWeTreatProps {
  problems?: ProblemItem[];
  serviceTitle?: string;
}

export default function ProblemsWeTreat({ problems = [], serviceTitle = "Specialized" }: ProblemsWeTreatProps) {
  // Fallback default conditions if none provided
  const displayProblems = problems.length > 0 ? problems : [
    { id: '01', track: 'Clinical Care', title: 'Comprehensive Evaluation', description: 'Advanced diagnostic review and personalized care protocols.' },
    { id: '02', track: 'Intervention', title: 'Targeted Treatments', description: 'Minimally invasive therapies and expert surgical options.' },
    { id: '03', track: 'Rehabilitation', title: 'Recovery & Support', description: 'Structured post-procedure care for long-term health.' }
  ];

  const defaultImages = [
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <section className="relative w-full bg-background text-foreground px-4 sm:px-8 lg:px-12 py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end pb-12 border-b border-medical-line/20">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-5 h-[2px] bg-accent-red"></span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent-red font-heading">
                Clinical Specializations
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary-dark leading-[1.1] uppercase font-heading">
              Problems We <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #090D16' }}>Treat</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-text-muted text-sm sm:text-base leading-relaxed font-sans max-w-md">
              Precision diagnostics, restorative procedures, and expedited care pathways engineered for vitality and lifelong wellness.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {displayProblems.map((item, index) => {
            const isFeatured = index === 1;
            const cardImage = defaultImages[index % defaultImages.length];

            return (
              <article
                key={item.id}
                className={`lg:col-span-4 flex flex-col rounded-xl transition-all duration-300 group overflow-hidden border ${
                  isFeatured
                    ? 'bg-primary-dark text-text-light border-primary-dark shadow-xl lg:-translate-y-1.5'
                    : 'bg-surface text-foreground border-medical-line/15 hover:border-medical-line/40 shadow-sm hover:shadow-lg'
                }`}
              >
                {isFeatured && <div className="h-1 w-full bg-accent-red"></div>}
                
                <div className={`p-6 pb-4 flex items-start justify-between border-b ${isFeatured ? 'border-white/10' : 'border-medical-line/10'}`}>
                  <div>
                    <span className={`text-[10px] font-mono tracking-widest uppercase block ${isFeatured ? 'text-accent-red' : 'text-text-muted'}`}>
                      {item.track}
                    </span>
                    <span className={`text-xs font-semibold tracking-wider uppercase font-heading ${isFeatured ? 'text-white' : 'text-primary-dark'}`}>
                      {serviceTitle} Care
                    </span>
                  </div>
                  <span className={`text-2xl font-extrabold font-heading tracking-tighter ${isFeatured ? 'text-white/20' : 'text-primary-dark/20'}`}>
                    {item.id}
                  </span>
                </div>

                <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-medical-blue/30">
                  <img
                    src={cardImage}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className={`absolute bottom-2.5 left-2.5 text-[9px] tracking-widest uppercase font-mono px-2 py-1 backdrop-blur-md ${
                    isFeatured ? 'bg-black/80 text-white' : 'bg-primary-dark/85 text-white'
                  }`}>
                    {serviceTitle} Protocol
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="w-6 h-[2px] bg-accent-red mb-3"></div>
                    <h3 className={`text-xl font-bold font-heading tracking-tight leading-snug uppercase mb-2.5 ${isFeatured ? 'text-white' : 'text-primary-dark'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed font-sans ${isFeatured ? 'text-slate-300' : 'text-text-muted'}`}>
                      {item.description}
                    </p>
                  </div>

                  <div className={`pt-6 mt-5 border-t flex items-center justify-between ${isFeatured ? 'border-white/10' : 'border-medical-line/10'}`}>
                    <span className={`text-xs font-medium tracking-wide uppercase font-heading transition-colors ${
                      isFeatured ? 'text-white group-hover:text-accent-red' : 'text-primary-dark group-hover:text-accent-red'
                    }`}>
                      Explore Care Pathway
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isFeatured 
                        ? 'bg-white/10 border border-white/20 text-white group-hover:bg-accent-red group-hover:border-accent-red' 
                        : 'border border-medical-line/30 text-primary-dark group-hover:bg-accent-red group-hover:text-white group-hover:border-accent-red'
                    }`}>
                      <svg
                        className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.75}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}