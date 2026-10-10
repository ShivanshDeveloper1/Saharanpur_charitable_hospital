'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, ArrowLeftRight } from 'lucide-react'

// Before & After Slider Component with interactive mouse/touch drag handle
const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clientX = e.clientX || e.touches?.[0]?.clientX
    if (!clientX) return
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  return (
    <div 
      className="relative w-full h-[420px] rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-md"
      onMouseMove={(e) => isDragging && handleSliderMove(e)}
      onTouchMove={(e) => handleSliderMove(e)}
      onMouseUp={() => setIsDragging(false)}
      onTouchEnd={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      {/* After Image (Background) */}
      <Image 
        src={afterImage} 
        alt="After Treatment" 
        fill 
        className="object-cover" 
      />
      <span className="absolute top-4 right-4 bg-black/60 text-[var(--color-text-light)] text-xs px-2.5 py-1 rounded-full font-medium tracking-wide z-10">
        AFTER
      </span>

      {/* Before Image (Clipped dynamically by sliderPosition) */}
      <div 
        className="absolute inset-0 overflow-hidden" 
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="absolute inset-0 w-full h-full" style={{ width: 'var(--slider-width, 100%)' }}>
          <Image 
            src={beforeImage} 
            alt="Before Treatment" 
            fill 
            className="object-cover max-w-none" 
          />
        </div>
        <span className="absolute top-4 left-4 bg-black/60 text-[var(--color-text-light)] text-xs px-2.5 py-1 rounded-full font-medium tracking-wide z-10">
          BEFORE
        </span>
      </div>

      {/* Interactive Divider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[var(--color-primary-dark)] text-[var(--color-text-light)] flex items-center justify-center shadow-lg border-2 border-white">
          <ArrowLeftRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}

const TreatmentResults = () => {
  // Load Elfsight Script Only Once and Prevent Duplicate Calls
  useEffect(() => {
    const scriptId = 'elfsight-platform-script'
    
    // Check if script already exists in the document
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://elfsightcdn.com/platform.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <main className="min-h-screen bg-[var(--color-bg-light)] py-16 px-4 flex flex-col items-center justify-center">
      
      {/* Section Header */}
      <div className="text-center max-w-xl mb-12 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)]"></span>
          TREATMENT RESULTS
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-dark)] tracking-tight">
          Real Results From<br />Before & After Treatment
        </h2>
      </div>

      {/* Before & After Comparison Cards Grid */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <BeforeAfterSlider 
          beforeImage="/Patient_ortho.jpg" 
          afterImage="/after_surgery.jpg" 
        />
        <BeforeAfterSlider 
          beforeImage="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80" 
          afterImage="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&auto=format&fit=crop&q=80" 
        />
      </div>

      {/* Elfsight Google Reviews Integration Section */}
      <div className="max-w-6xl w-full mb-12">
        <div className="elfsight-app-dca957c8-cfc2-4abb-9352-f1cad1f8fa83" data-elfsight-app-lazy></div>
      </div>

      {/* Bottom Action Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
        <button className="bg-[var(--color-primary-dark)] hover:opacity-90 text-[var(--color-text-light)] font-medium px-8 py-4 rounded-full flex items-center gap-2 shadow-md transition group">
          <span>Book appointment</span>
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>
        </button>
      </div>

    </main>
  )
}

export default TreatmentResults