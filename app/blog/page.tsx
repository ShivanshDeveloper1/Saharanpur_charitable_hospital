
import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    <main className="bg-background text-foreground">
      <section className="relative flex min-h-[60vh] items-center overflow-hidden sm:min-h-[65vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/blog/Hero.avif"
            alt="Healthcare insights and medical information"
            fill={true}
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Brand-colored Overlay */}
        <div className="absolute inset-0 bg-primary-dark/20" />

        {/* Subtle Medical Blue Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/70 to-medical-line/30" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            {/* <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-medical-blue/30 bg-medical-blue/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-medical-blue sm:text-sm">
              Healthcare Insights
            </span> */}

       <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-light sm:text-5xl lg:text-7xl">
              Tips <span className="text-medical-blue">&amp; Tricks</span>
            </h1> 

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg lg:text-xl">
              Explore expert insights and practical guidance on healthcare,
              illnesses, treatments, and medical advancements to make informed
              decisions about your health.
            </p>

            <div className="mt-8 h-1 w-20 rounded-full bg-accent-red" />
          </div>
        </div>

        {/* Bottom transition */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-primary-dark/30 to-transparent" />
      </section>


      <section>
        
      </section>
    </main>
  )
}

export default Page
