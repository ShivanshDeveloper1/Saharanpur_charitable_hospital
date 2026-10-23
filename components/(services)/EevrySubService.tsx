"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Service, Problem } from "@/data/services";

interface SpecialtyPageProps {
  service: Service;
  problem: Problem;
}

export default function SpecialtyPage({ service, problem }: SpecialtyPageProps) {


const [isAboutExpanded, setIsAboutExpanded] = useState(false);


  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    date: "",
    time: "",
    service: problem.title,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Appointment Request Submitted:", {
      ...formData,
      specialty: service.title,
      condition: problem.title,
    });
    alert("Thank you! Your appointment request has been submitted.");
  };

  const heroImage = service.images?.[0] || problem.img;

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-800">
      {/* HERO */}
      <section className="relative w-full h-[320px] md:h-[450px] flex items-end pb-12 overflow-hidden bg-slate-900">
        {heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url("${heroImage}")` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b36]/95 via-[#0d1b36]/65 to-[#0d1b36]/20" />

        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="md:max-w-xl">
            <p className="text-sm text-pink-300 font-semibold uppercase tracking-widest mb-3">
              {problem.track} / {service.title}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              {problem.title}
            </h1>
          </div>
          <div className="md:max-w-md">
            <p className="text-slate-200 text-base md:text-lg leading-relaxed font-light">
              {problem.description}
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-16">
            {/* OTHER PROBLEMS */}
            <nav className="flex flex-wrap gap-2">
              {service.problems.map((p) => (
                <Link
                  key={p.id}
                  href={`/services/${service.slug}/${p.slug}`}
                  className={`px-4 py-2 rounded-full text-sm border transition ${
                    p.id === problem.id
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:border-pink-400"
                  }`}
                >
                  {p.title}
                </Link>
              ))}
            </nav>

    {/* ABOUT / STEP BY STEP CONTENT */}


<section className="space-y-8">
  <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
    About {problem.title}
  </h2>

  <div className="space-y-8">
    {problem.content.map((section, index) => (
      <div
        key={section.heading}
        className={`flex gap-4 ${
          !isAboutExpanded && index >= 2 ? "hidden" : ""
        }`}
      >
        <div className="shrink-0 w-10 h-10 rounded-full bg-pink-100 text-pink-600 font-bold flex items-center justify-center">
          {index + 1}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            {section.heading}
          </h3>

          <p className="text-slate-600 leading-relaxed">
            {section.body}
          </p>
        </div>
      </div>
    ))}
  </div>

  {problem.content.length > 2 && (
  
<button
  type="button"
  onClick={() => setIsAboutExpanded((prev) => !prev)}
  aria-expanded={isAboutExpanded}
  className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-pink-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-600/30 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
>
  {isAboutExpanded ? "Read Less" : "Read More"}

  <span
    className={`text-base transition-transform duration-300 ${
      isAboutExpanded ? "rotate-180" : ""
    }`}
  >
    ↓
  </span>
</button>

  )}
</section>


            {/* SYMPTOMS */}
            <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Symptoms of {problem.title}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {problem.symptoms.map((symptom) => (
                  <li
                    key={symptom}
                    className="flex items-start gap-3 bg-slate-50 rounded-xl px-4 py-3 text-slate-700"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-pink-400" />
                    <span className="text-sm leading-relaxed">{symptom}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* WHY CHOOSE US */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                {service.why.title}
              </h2>
              <p className="text-slate-500 mt-2 mb-6">{service.why.subtitle}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.why.points.map((point, i) => (
                  <div
                    key={point}
                    className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
                  >
                    <div className="text-pink-500 font-bold text-sm mb-2">
                      0{i + 1}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3 EASY STEPS */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-8">
                {service.steps.title}
              </h2>
              <ol className="space-y-4">
                {service.steps.items.map((step, i) => (
                  <li
                    key={step.title}
                    className="flex gap-4 bg-white rounded-2xl p-5 border border-slate-100"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#f472b6] text-white font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{step.title}</h3>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* TESTIMONIALS */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-8">
                Patient Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.testimonials.map((t) => (
                  <figure
                    key={t.name}
                    className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
                  >
                    <div className="text-amber-400 mb-3" aria-label={`${t.rating} out of 5 stars`}>
                      {"★".repeat(t.rating)}
                      <span className="text-slate-200">{"★".repeat(5 - t.rating)}</span>
                    </div>
                    <blockquote className="text-slate-600 text-sm leading-relaxed">
                      “{t.text}”
                    </blockquote>
                    <figcaption className="mt-4 text-sm font-semibold text-slate-900">
                      {t.name}
                      <span className="font-normal text-slate-500"> · {t.location}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {service.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group bg-white rounded-2xl border border-slate-100 px-5 py-4 open:shadow-sm"
                  >
                    <summary className="cursor-pointer list-none flex justify-between items-center font-semibold text-slate-900">
                      {faq.question}
                      <span className="ml-4 text-pink-500 transition group-open:rotate-45 text-xl leading-none">
                        +
                      </span>
                    </summary>
                    <p className="text-slate-600 text-sm leading-relaxed mt-3">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* SPECIALIST */}
            <section className="pt-8 border-t border-slate-200">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Meet Your Specialist
              </h2>
              <div className="flex items-start gap-5 bg-white rounded-3xl p-6 border border-slate-100">
                {service.doctor.image && (
                  <img
                    src={service.doctor.image}
                    alt={service.doctor.name}
                    className="w-24 h-24 rounded-2xl object-cover shrink-0"
                  />
                )}
                <div>
                  {service.doctor.badge && (
                    <span className="inline-block text-[10px] font-bold tracking-widest text-pink-600 bg-pink-50 px-2 py-1 rounded mb-2">
                      {service.doctor.badge}
                    </span>
                  )}
                  <h3 className="font-bold text-slate-900">{service.doctor.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{service.doctor.title}</p>
                  {service.doctor.qualification && (
                    <p className="text-sm text-slate-500 mt-1">
                      {service.doctor.qualification}
                    </p>
                  )}
                  <p className="text-sm text-slate-500 mt-1">{service.doctor.experience}</p>
                  {service.doctor.philosophy && (
                    <p className="text-sm text-slate-600 italic mt-3">
                      “{service.doctor.philosophy}”
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT: STICKY APPOINTMENT FORM */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/60 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Book an Appointment</h2>
              <p className="text-sm text-slate-500 mb-6">
                Request a consultation for {problem.title}.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      name="date"
                      required
                      min={new Date().toLocaleDateString("en-CA")}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Preferred Time *</label>
                    <select
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                    >
                      <option value="">Select time</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Treatment / Condition *</label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    {service.problems.map((item) => (
                      <option key={item.id} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Message *</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us how we can help"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f472b6] hover:bg-[#e8559e] text-white font-medium py-3.5 px-6 rounded-2xl shadow-md transition-all duration-200 text-sm"
                >
                  Send Appointment Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}