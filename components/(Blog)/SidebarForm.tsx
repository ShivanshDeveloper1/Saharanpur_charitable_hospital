'use client'

import { useState, FormEvent } from 'react'

export default function SidebarForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    service: 'General Consultation',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="rounded-2xl border border-medical-line/20 bg-surface p-5 shadow-sm">
      <h3 className="text-lg font-bold text-foreground">Get The Solution Today</h3>
      <p className="mt-1 text-xs text-text-muted">Fill out this quick form for instant medical guidance.</p>

      {submitted ? (
        <div className="mt-4 rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-center text-xs font-semibold text-green-600">
          ✓ Request received! Our team will contact you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="sr-only">Full Name</label>
            <input
              type="text"
              required
              placeholder="Full Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-medical-line/20 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red"
            />
          </div>

          <div>
            <label className="sr-only">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-lg border border-medical-line/20 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red"
            />
          </div>

          <div>
            <label className="sr-only">City</label>
            <input
              type="text"
              required
              placeholder="City *"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full rounded-lg border border-medical-line/20 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red"
            />
          </div>

          <div>
            <label className="sr-only">Choose Service</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full rounded-lg border border-medical-line/20 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red"
            >
              <option value="General Consultation">General Consultation</option>
              <option value="Cardiology">Cardiology Specialist</option>
              <option value="Neurology">Neurology Specialist</option>
              <option value="Orthopedics">Orthopedics & Joint Care</option>
              <option value="Diagnostics">Diagnostic Testing</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-accent-red py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-opacity-90"
          >
            Submit Request
          </button>
        </form>
      )}
    </div>
  )
}