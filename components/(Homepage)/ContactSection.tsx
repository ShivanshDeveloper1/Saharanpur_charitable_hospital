'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    service: 'Select a department',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: false, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ success: false, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ success: true, message: 'Message sent successfully to your Gmail!' });
        setFormData({ fullName: '', phoneNumber: '', service: 'Select a department', message: '' });
      } else {
        setStatus({ success: false, message: data.error || 'Something went wrong.' });
      }
    } catch (error) {
      setStatus({ success: false, message: 'Failed to connect to the server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm text-gray-600">
            Contact our team to ask a question, request an appointment, or get help finding the right department.
          </p>
        </div>

        {/* Top Grid: Map & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Left: Map Card */}
          <div className="relative bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm overflow-hidden h-[480px]">
            <div className="absolute top-6 left-6 z-10">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg text-xs font-medium text-blue-600 shadow-md hover:bg-gray-50 border border-gray-100 transition-colors"
              >
                Open in Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.570775952673!2d77.5458!3d29.964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU3JzUwLjQiTiA3N8KwMzInNDQuOSJF!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
              className="w-full h-full rounded-xl border-0"
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>

          {/* Right: Form Card */}
          <div className="bg-white rounded-2xl border border-indigo-100 p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Row 1: Full Name & Phone Number (Email field removed) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Jane Smith"
                    className="w-full bg-slate-50 border border-indigo-50 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="+1 123 456 789"
                    className="w-full bg-slate-50 border border-indigo-50 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>

              {/* Row 2: Select Service */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Select Service
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-indigo-50 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option disabled>Select a department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              {/* Row 3: Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Enter message here.."
                  className="w-full bg-slate-50 border border-indigo-50 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8b82f6] hover:bg-[#7c72f5] text-white font-medium py-3.5 rounded-xl transition-colors shadow-md disabled:opacity-50 text-sm"
              >
                {loading ? 'Sending...' : 'Submit'}
              </button>

              {/* Status Message */}
              {status.message && (
                <p className={`text-xs text-center mt-2 ${status.success ? 'text-green-600' : 'text-red-600'}`}>
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Grid: 3 Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Email us */}
          <div className="bg-[#f5f3ff]/60 border border-indigo-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-gray-900 text-base mb-1">Email us</h4>
              <p className="text-sm text-gray-600">info@medicorehospital.com</p>
            </div>
          </div>

          {/* Card 2: Visit us */}
          <div className="bg-[#f5f3ff]/60 border border-indigo-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-gray-900 text-base mb-1">Visit us</h4>
              <p className="text-sm text-gray-600">San Francisco, CA, USA</p>
            </div>
          </div>

          {/* Card 3: Emergency hotline */}
          <div className="bg-[#f5f3ff]/60 border border-indigo-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-gray-900 text-base mb-1">Emergency hotline</h4>
              <p className="text-sm text-gray-600">+1 (234) 567-8900</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}