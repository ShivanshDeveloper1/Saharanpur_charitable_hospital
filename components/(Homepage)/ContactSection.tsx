'use client' // Needed for Next.js App Router (framer-motion + useState)

import { useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import {
  AlertCircle,
  Clock,
  Loader2,
  Mail,
  PhoneCall,
  Send,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Config – edit these in one place                                   */
/* ------------------------------------------------------------------ */
const HOSPITAL = {
  email: 'support@hospital.com',
  phone: '+1 (800) 555-1234',
  phoneHref: 'tel:+18005551234',
  // Used for the map. Replace with your real address.
  address: 'Sardhana, Uttar Pradesh, India',
}

const DEPARTMENTS = [
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'general', label: 'General Consultation' },
]

/* ------------------------------------------------------------------ */
/*  Form types + validation                                            */
/* ------------------------------------------------------------------ */
type FormValues = {
  name: string
  email: string
  phone: string
  department: string
  message: string
}
type FormErrors = Partial<Record<keyof FormValues, string>>

const EMPTY: FormValues = {
  name: '',
  email: '',
  phone: '',
  department: '',
  message: '',
}

const MAX_MESSAGE = 500

function validate(v: FormValues): FormErrors {
  const e: FormErrors = {}
  if (v.name.trim().length < 2) e.name = 'Enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = 'Enter a valid email, like name@example.com.'
  const digits = v.phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15 || !/^[+\d\s()-]+$/.test(v.phone))
    e.phone = 'Enter a phone number with 7 to 15 digits.'
  if (!v.department) e.department = 'Choose a department.'
  if (v.message.trim().length < 10)
    e.message = 'Tell us a little more (at least 10 characters).'
  return e
}

/* ------------------------------------------------------------------ */
/*  Small reusable field wrapper                                       */
/* ------------------------------------------------------------------ */
function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="field-label">
          {label}
        </label>
        {hint}
      </div>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="field-error flex items-center gap-1.5 overflow-hidden"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Success message                                                    */
/* ------------------------------------------------------------------ */
function SuccessMessage({
  name,
  email,
  department,
  reference,
  onReset,
}: {
  name: string
  email: string
  department: string
  reference: string
  onReset: () => void
}) {
  const firstName = name.trim().split(' ')[0]
  const deptLabel =
    DEPARTMENTS.find((d) => d.value === department)?.label ?? 'care'

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center py-6 text-center sm:py-10"
      role="status"
      aria-live="polite"
    >
      {/* Animated check mark */}
      <svg
        width="88"
        height="88"
        viewBox="0 0 88 88"
        fill="none"
        aria-hidden
        className="mb-6"
      >
        <motion.circle
          cx="44"
          cy="44"
          r="40"
          stroke="var(--color-success)"
          strokeWidth="4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.path
          d="M27 45 L39 57 L62 33"
          stroke="var(--color-success)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
        />
      </svg>

      <h2 className="text-2xl font-bold text-[var(--color-text-dark)] sm:text-3xl">
        Message sent, {firstName}
      </h2>

      <p className="mt-3 max-w-md text-[var(--color-text-muted)]">
        Our {deptLabel} team will reply to{' '}
        <span className="font-medium text-[var(--color-text-dark)] break-all">
          {email}
        </span>{' '}
        within one working day.
      </p>

      <p className="mt-6 rounded-full bg-[var(--color-primary-soft)] px-4 py-1.5 text-sm font-medium text-[var(--color-primary-dark)]">
        Reference: {reference}
      </p>

      <p className="mt-6 max-w-md text-sm text-[var(--color-text-muted)]">
        This form is not for emergencies. If someone needs urgent care, call{' '}
        <a
          href={HOSPITAL.phoneHref}
          className="font-semibold text-[var(--color-accent-red)] hover:underline"
        >
          {HOSPITAL.phone}
        </a>
        .
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 rounded-xl border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-text-dark)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
      >
        Send another message
      </button>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Page() {
  const [values, setValues] = useState<FormValues>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>(
    'idle'
  )
  const [reference, setReference] = useState('')
  const [submitted, setSubmitted] = useState<FormValues>(EMPTY)
  const formRef = useRef<HTMLFormElement>(null)

  const set =
    (key: keyof FormValues) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const value = e.target.value
      setValues((v) => ({ ...v, [key]: value }))
      // Clear the error as soon as the person starts fixing the field
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
    }

  const ariaFor = (key: keyof FormValues) => ({
    'aria-invalid': errors[key] ? (true as const) : undefined,
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return

    const found = validate(values)
    setErrors(found)

    const firstInvalid = (Object.keys(found) as (keyof FormValues)[])[0]
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus()
      return
    }

    setStatus('sending')
    try {
      // 👉 Replace this block with your real API call, for example:
      // const res = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // })
      // if (!res.ok) throw new Error('Request failed')
      await new Promise((r) => setTimeout(r, 1400))

      setSubmitted(values)
      setReference(
        'HC-' + Math.random().toString(36).slice(2, 8).toUpperCase()
      )
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  function reset() {
    setValues(EMPTY)
    setErrors({})
    setStatus('idle')
  }

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    HOSPITAL.address
  )}&output=embed`

  return (
    // reducedMotion="user" makes every framer-motion animation respect
    // the visitor's "reduce motion" system setting.
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
        {/* 1. Hero */}
        <section className="relative h-[55vh] min-h-[360px] w-full overflow-hidden md:h-[60vh]">
          <Image
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600&auto=format&fit=crop"
            alt="Hospital corridor"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a3a40]/70 via-[#0a3a40]/60 to-[#0a3a40]/85" />

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-16 text-center text-white"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Contact us
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-100 md:text-lg">
              Book an appointment, ask about a treatment, or tell us how we can
              help. A member of our team will get back to you.
            </p>
          </motion.div>
        </section>

        {/* 2. Contact form */}
        <section className="relative z-20 mx-auto -mt-24 max-w-3xl px-4 pb-8 md:-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_20px_50px_-20px_rgba(10,58,64,0.35)] sm:p-8 md:p-10"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === 'sent' ? (
                <SuccessMessage
                  key="success"
                  name={submitted.name}
                  email={submitted.email}
                  department={submitted.department}
                  reference={reference}
                  onReset={reset}
                />
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-bold text-[var(--color-text-dark)] sm:text-2xl">
                      Send us a message
                    </h2>
                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                      The more detail you share, the faster we can help. We
                      reply within one working day.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Field id="name" label="Full name" error={errors.name}>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Smith"
                        value={values.name}
                        onChange={set('name')}
                        className="field-input"
                        {...ariaFor('name')}
                      />
                    </Field>

                    <Field id="email" label="Email" error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="jane@example.com"
                        value={values.email}
                        onChange={set('email')}
                        className="field-input"
                        {...ariaFor('email')}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Field id="phone" label="Phone number" error={errors.phone}>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="+91 98765 43210"
                        value={values.phone}
                        onChange={set('phone')}
                        className="field-input"
                        {...ariaFor('phone')}
                      />
                    </Field>

                    <Field
                      id="department"
                      label="Department"
                      error={errors.department}
                    >
                      <select
                        id="department"
                        name="department"
                        value={values.department}
                        onChange={set('department')}
                        className="field-input"
                        {...ariaFor('department')}
                      >
                        <option value="" disabled>
                          Select a department
                        </option>
                        {DEPARTMENTS.map((d) => (
                          <option key={d.value} value={d.value}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field
                    id="message"
                    label="Message"
                    error={errors.message}
                    hint={
                      <span
                        className={`text-xs tabular-nums ${
                          values.message.length > MAX_MESSAGE - 30
                            ? 'text-[var(--color-accent-red)]'
                            : 'text-[var(--color-text-muted)]'
                        }`}
                      >
                        {values.message.length}/{MAX_MESSAGE}
                      </span>
                    }
                  >
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      maxLength={MAX_MESSAGE}
                      placeholder="How can we help you?"
                      value={values.message}
                      onChange={set('message')}
                      className="field-input resize-none"
                      {...ariaFor('message')}
                    />
                  </Field>

                  <AnimatePresence>
                    {status === 'failed' && (
                      <motion.div
                        role="alert"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden rounded-xl bg-[var(--color-accent-red-soft)] text-sm text-[var(--color-accent-red)]"
                      >
                        <p className="flex items-start gap-2 p-3">
                          <AlertCircle
                            className="mt-0.5 h-4 w-4 shrink-0"
                            aria-hidden
                          />
                          We couldn&apos;t send your message. Check your
                          connection and try again, or call {HOSPITAL.phone}.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={status === 'sending' ? undefined : { scale: 1.01 }}
                    whileTap={status === 'sending' ? undefined : { scale: 0.98 }}
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] py-3.5 font-semibold text-white shadow-md shadow-[var(--color-primary)]/25 transition-colors hover:bg-[var(--color-primary-dark)] disabled:cursor-not-allowed disabled:opacity-80"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden />
                        Send message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* 3. Info blocks */}
        <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
            className="grid grid-cols-1 gap-5 md:grid-cols-3"
          >
            {[
              {
                icon: Mail,
                title: 'Email us',
                body: 'For general questions and support:',
                content: (
                  <a
                    href={`mailto:${HOSPITAL.email}`}
                    className="mt-3 break-all font-semibold text-[var(--color-primary)] hover:underline"
                  >
                    {HOSPITAL.email}
                  </a>
                ),
                tone: 'primary' as const,
              },
              {
                icon: Clock,
                title: 'Visiting hours',
                body: 'Monday to Saturday, 8:00 AM to 8:00 PM',
                content: (
                  <p className="mt-3 text-sm font-semibold text-[var(--color-text-dark)]">
                    Sunday: emergency only
                  </p>
                ),
                tone: 'primary' as const,
              },
              {
                icon: PhoneCall,
                title: 'Emergency hotline',
                body: 'Open 24 hours, every day:',
                content: (
                  <a
                    href={HOSPITAL.phoneHref}
                    className="mt-3 text-lg font-bold text-[var(--color-accent-red)] hover:underline"
                  >
                    {HOSPITAL.phone}
                  </a>
                ),
                tone: 'red' as const,
              },
            ].map(({ icon: Icon, title, body, content, tone }) => (
              <motion.div
                key={title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                }}
                className={`flex flex-col items-center rounded-2xl border bg-[var(--color-surface)] p-7 text-center ${
                  tone === 'red'
                    ? 'border-[var(--color-accent-red)]/25'
                    : 'border-[var(--color-border)]'
                }`}
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full ${
                    tone === 'red'
                      ? 'bg-[var(--color-accent-red-soft)] text-[var(--color-accent-red)]'
                      : 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                  }`}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-dark)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  {body}
                </p>
                {content}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 4. Map */}
        <section className="w-full px-4 pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto h-[320px] max-w-6xl overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-sm sm:h-[400px] md:h-[450px]"
          >
            <iframe
              title="Hospital location map"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </section>
      </main>
    </MotionConfig>
  )
}