"use client"

import React, { useState } from 'react';

export default function BookingSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    date: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="bg-background py-16 px-4 sm:px-6 lg:px-8 font-sans" id='Book_appointment'>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {}
          <div className="bg-surface rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col justify-between h-full">
            <div>
              {/* Phone & Address */}
              <div className="mb-6">
                <a href="tel:95684557656" className="text-2xl sm:text-3xl font-bold text-text-dark hover:text-accent-red transition">
                  (+91) 7618550475
                </a>
                <p className="text-text-muted mt-1 text-sm sm:text-base">
                  Saharanpur  ,247001
                </p>
              </div>

              {/* Opening Hours */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-text-dark mb-3">Opening Hours</h3>
                <div className="space-y-2 text-sm sm:text-base text-text-muted">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span>Monday – Friday:</span>
                    <span className="font-medium text-text-dark">8.00–17.00</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span>Saturday:</span>
                    <span className="font-medium text-text-dark">9.30–17.30</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span>Sunday:</span>
                    <span className="font-medium text-text-dark">9.30–15.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Preview Card */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-medical-blue/30 h-56 sm:h-64">
              {/* Stylized Map Background Representation */}
              <div className="absolute inset-0 opacity-75 bg-[radial-gradient(#355775_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {/* Simulated Map Markers & Grid */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 rounded-full bg-accent-red/10 animate-ping absolute"></div>
                <div className="bg-accent-red text-white p-2 rounded-full shadow-lg z-10 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>

              {/* Open in Maps Floating Action Button */}
              <div className="absolute bottom-3 left-3 z-20">
                <a
                  href="https://maps.google.com/?q=165+Canal+New+York+NY+10002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-text-dark text-xs sm:text-sm font-semibold rounded-lg shadow-md hover:bg-slate-50 transition border border-slate-200"
                >
                  <svg className="w-4 h-4 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open in Maps
                </a>
              </div>
            </div>
          </div>

          {}
          <div className="bg-surface rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
                <h3 className="text-xl font-bold text-text-dark">Appointment Requested!</h3>
                <p className="text-text-muted text-sm max-w-sm mx-auto">Thank you for booking with us. Our team will contact you shortly to confirm your schedule.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="field"
                    />
                  </div>
                  <div>
                    <label className="label">Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Preferred Date *</label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="field text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="label">Select Service *</label>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="field bg-white cursor-pointer"
                    >
                      <option value="" disabled>Select one...</option>
                      <option value="Teeth Whitening">Teeth Whitening</option>
                      <option value="Dental Implants">Dental Implants</option>
                      <option value="Root Canal">Root Canal</option>
                      <option value="Braces Treatment">Braces Treatment</option>
                      <option value="Oral Surgery">Oral Surgery</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">Write Message *</label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                    className="field h-32 py-3 resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 h-12 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-medium rounded-lg shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}