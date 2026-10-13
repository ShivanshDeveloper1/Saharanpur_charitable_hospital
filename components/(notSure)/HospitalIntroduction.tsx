"use client";
import React from 'react';

interface HospitalIntroductionProps {
  serviceTitle?: string;
  subtitle?: string;
}

export default function HospitalIntroduction({ serviceTitle = "Orthopedics", subtitle = "Excellence in Care" }: HospitalIntroductionProps) {
  return (
    <section className="relative bg-[#0B0F17] text-white border-t border-b border-slate-800/80 overflow-hidden">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="max-w-7xl h-full mx-auto grid grid-cols-12 divide-x divide-slate-700/20">
          <div className="col-span-4"></div>
          <div className="col-span-4"></div>
          <div className="col-span-4"></div>
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hospital Image Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              
              {/* Hospital Image */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <img 
                  src="/hospital_assets/charitable_hospital_saharanpur.avif" 
                  alt="Saharanpur Charitable Hospital Building" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1000&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent"></div>
              </div>
              {/* Card Footer Badge */}
              <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-medium">SAHARANPUR CAMPUS</span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  OPEN 24/7
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Content & Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Sub-heading & Location Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-0.5 bg-red-500"></span>
                <span className="text-xs font-mono tracking-wider text-cyan-400 uppercase font-semibold">
                  EXCELLENCE IN {serviceTitle.toUpperCase()}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-md text-xs font-mono text-slate-300 self-start">
                <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Saharanpur, Uttar Pradesh</span>
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white uppercase leading-snug">
              Dedicated Care & Advanced <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                {serviceTitle} Precision.
              </span>
            </h2>

            {/* Description Paragraphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-800/80 text-sm text-slate-300 leading-relaxed">
              <div>
                <p>
                  A trusted healthcare institution providing advanced medical care, trauma stabilization, and modern surgical facilities tailored to our community.
                </p>
              </div>
              <div>
                <p>
                  Specialized in comprehensive {serviceTitle.toLowerCase()} care, delivering expert diagnostics, advanced treatments, and dedicated rehabilitation support.
                </p>
              </div>
            </div>

            {/* Quick Feature Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                <span className="text-[10px] font-mono text-slate-400 block">UNIT 01</span>
                <p className="text-xs font-bold text-white mt-1">Modular OT</p>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                <span className="text-[10px] font-mono text-slate-400 block">UNIT 02</span>
                <p className="text-xs font-bold text-white mt-1">3.0T MRI</p>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                <span className="text-[10px] font-mono text-slate-400 block">UNIT 03</span>
                <p className="text-xs font-bold text-white mt-1">Trauma Bay</p>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                <span className="text-[10px] font-mono text-slate-400 block">UNIT 04</span>
                <p className="text-xs font-bold text-white mt-1">Rehab Wing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}