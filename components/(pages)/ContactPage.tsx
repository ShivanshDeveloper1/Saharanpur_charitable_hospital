'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Clock, PhoneCall, Send, CheckCircle2, Loader2 } from 'lucide-react'

const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'General Consultation']

const info = [
  { icon: Mail, title: 'Email Us', text: 'support@hospital.com', href: 'mailto:support@hospital.com' },
  { icon: Clock, title: 'Visiting Hours', text: 'Mon – Sat: 8 AM – 8 PM', sub: 'Sunday: Emergency only' },
  { icon: PhoneCall, title: 'Emergency 24/7', text: '+1 (800) 555-1234', href: 'tel:+18005551234', red: true },
]

export default function ContactPages() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  const [sent, setSent] = useState<{ name: string; email: string } | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    setStatus('sending')
    try {
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
      await new Promise((r) => setTimeout(r, 1000))
      setSent({ name: data.name.split(' ')[0], email: data.email })
      form.reset()
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[260px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=70&w=1400&auto=format&fit=crop"
          alt="Hospital contact banner"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-12 text-center text-text-light">
          <h1 className="text-4xl md:text-5xl">Contact Us</h1>
          <p className="mt-3 max-w-xl text-slate-300">
            Reach our team for appointments, consultations and personal help.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="relative z-10 mx-auto -mt-8 max-w-3xl px-4">
        <div className="rounded-2xl border border-slate-100 bg-surface p-6 shadow-xl sm:p-8">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center"
              role="status"
            >
              <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />
              <h2 className="mt-4 text-2xl">Thank you, {sent.name}!</h2>
              <p className="mx-auto mt-2 max-w-sm text-text-muted">
                We got your message and will reply to <b className="break-all">{sent.email}</b> within one working day.
              </p>
              <button
                onClick={() => setSent(null)}
                className="mt-6 h-11 rounded-lg border border-slate-200 px-5 text-sm font-medium hover:border-accent-red hover:text-accent-red"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="label">Full Name</label>
                <input id="name" name="name" required minLength={2} autoComplete="name" placeholder="Jane Smith" className="field" />
              </div>
              <div>
                <label htmlFor="email" className="label">Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@example.com" className="field" />
              </div>
              <div>
                <label htmlFor="phone" className="label">Phone Number</label>
                <input id="phone" name="phone" type="tel" required pattern="[0-9+\s()\-]{7,18}" autoComplete="tel" placeholder="+91 98765 43210" className="field" />
              </div>
              <div>
                <label htmlFor="department" className="label">Department</label>
                <select id="department" name="department" required defaultValue="" className="field">
                  <option value="" disabled>Select a department</option>
                  {departments.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="label">Message</label>
                <textarea id="message" name="message" required minLength={10} rows={5} placeholder="How can we help you?" className="field h-auto resize-none py-3" />
              </div>

              {status === 'error' && (
                <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-accent-red sm:col-span-2">
                  Could not send your message. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex h-12 items-center justify-center gap-2 rounded-lg bg-primary-dark font-medium text-text-light transition hover:bg-accent-red disabled:opacity-70 sm:col-span-2"
              >
                {status === 'sending' ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</>
                ) : (
                  <><Send className="h-4 w-4" /> Send Message</>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Info */}
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-14 md:grid-cols-3">
        {info.map(({ icon: Icon, title, text, sub, href, red }) => (
          <div key={title} className="flex flex-col items-center rounded-2xl border border-slate-100 bg-surface p-7 text-center shadow-sm">
            <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${red ? 'bg-red-50 text-accent-red' : 'bg-slate-100 text-primary-dark'}`}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg">{title}</h3>
            {href ? (
              <a href={href} className={`mt-2 break-all font-medium hover:underline ${red ? 'text-accent-red' : 'text-text-dark'}`}>{text}</a>
            ) : (
              <p className="mt-2 text-text-muted">{text}</p>
            )}
            {sub && <p className="mt-1 text-sm font-medium">{sub}</p>}
          </div>
        ))}
      </section>

      {/* Map */}
      <section className="px-4 pb-16">
        <iframe
          title="Hospital location map"
          src="https://www.google.com/maps?q=Sardhana,Uttar+Pradesh,India&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mx-auto h-[320px] w-full max-w-6xl rounded-2xl border border-slate-200 md:h-[420px]"
        />
      </section>
    </main>
  )
}