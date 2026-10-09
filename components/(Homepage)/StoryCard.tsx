"use client"; 

import React, { useState } from "react"; 
import Image from "next/image"; 
import { Story } from "@/data/stories"; 

interface StoryCardProps { 
  story: Story; 
  isFeatured?: boolean; 
} 

export const StoryCard: React.FC<StoryCardProps> = ({ story, isFeatured = false }) => { 
  const [isPlaying, setIsPlaying] = useState(false); 

  return ( 
    <div 
      className={`relative rounded-xl overflow-hidden shadow-md border border-slate-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col justify-between p-6 text-center bg-primary-dark text-text-light ${ 
        isFeatured ? "min-h-[480px] lg:min-h-[560px]" : "min-h-[240px] sm:min-h-[260px]" 
      }`} 
    > 
      {/* Background Subtle Accent Overlay (Using Rose/Red tint) */} 
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-accent-red/10 rounded-full blur-2xl pointer-events-none" /> 
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-accent-red/15 to-transparent pointer-events-none" /> 

      {/* Media Layer: Video or Image */} 
      {isPlaying && story.videoUrl ? ( 
        <video 
          src={story.videoUrl} 
          controls 
          autoPlay 
          className="absolute inset-0 w-full h-full object-cover z-20" 
          onEnded={() => setIsPlaying(false)} 
        /> 
      ) : ( 
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3"> 
          {/* Avatar Image with Red Accent Ring */} 
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-accent-red shadow-md"> 
            <Image 
              src={story.image} 
              alt={story.name} 
              fill 
              sizes="(max-width: 768px) 100px, 120px" 
              className="object-cover" 
            /> 
            {/* Play Button Trigger */} 
            <button 
              onClick={() => story.videoUrl && setIsPlaying(true)} 
              aria-label="Play video" 
              className="absolute inset-0 bg-primary-dark/40 flex items-center justify-center hover:bg-primary-dark/60 transition-colors group" 
            > 
              <div className="w-10 h-10 rounded-full bg-surface group-hover:scale-110 transition-transform flex items-center justify-center shadow-lg"> 
                <svg 
                  className="w-5 h-5 text-accent-red fill-current translate-x-0.5" 
                  viewBox="0 0 24 24" 
                > 
                  <path d="M8 5v14l11-7z" /> 
                </svg> 
              </div> 
            </button> 
          </div> 

          {/* Text Content */} 
          <div className="mt-2 flex flex-col gap-1"> 
            <h3 className="font-extrabold text-text-light text-lg sm:text-xl drop-shadow-sm"> 
              {story.title} 
            </h3> 
            {story.subtitle && ( 
              <p className="text-xs sm:text-sm font-medium text-slate-300 leading-snug"> 
                {story.subtitle} 
              </p> 
            )} 
            <p className="text-xs sm:text-sm font-bold text-accent-red mt-1"> 
              ~{story.name}~ 
            </p> 
          </div> 
        </div> 
      )} 
    </div> 
  ); 
};