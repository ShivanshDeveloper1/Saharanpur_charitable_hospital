"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Hero = () => {
  // Hospital-themed slides with custom text for each image
  const slides = [
    {
      src: '/',
      title: '',
      subtitle: 'Proudly accepting Ayushman Bharat cards for comprehensive medical coverage.',
      cta: 'Learn More',
    },
    {
      src: '/',
      title: 'Advanced Medical Excellence',
      subtitle: 'State-of-the-art facilities with compassionate care you can co unt on.',
      cta: 'Book Appointment',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-slide every 6 seconds. 
  // Putting currentIndex in the dependency array ensures the timer resets if the user clicks manually.
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); 

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    // Responsive height: minimum 500px on mobile, and scales nicely on desktop taking remaining screen space.
    <main className="relative w-full min-h-[500px] h-[70vh] lg:h-[calc(100vh-140px)] overflow-hidden bg-slate-900 group">
      
      {/* Images & Overlays */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <Image
            src={slide.src}
            fill
            alt={`Slide ${index + 1}`}
            className="object-cover"
            priority={index === 0}
          />
          
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
            <div className={`transition-all duration-700 delay-300 transform ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-slate-200 mb-8 drop-shadow-md">
                {slide.subtitle}
              </p>
              <button className="rounded-full bg-red-600 hover:bg-red-700 px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-red-600/30 active:scale-95">
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-slate-900 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Previous slide"
      >
        <svg className="h-6 w-6 pr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-slate-900 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Next slide"
      >
        <svg className="h-6 w-6 pl-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-red-600' 
                : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
      
    </main>
  );
};

export default Hero;