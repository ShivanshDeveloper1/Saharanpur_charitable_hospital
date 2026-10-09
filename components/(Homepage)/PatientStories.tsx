import React from "react"; 
import { STORIES_DATA } from "@/data/stories"; 
import { StoryCard } from "@/components/(Homepage)/StoryCard"; 

const PatientStories = () => { 
  return ( 
    <main className="min-h-screen bg-bg-light py-12 px-4 sm:px-8"> 
      <div className="max-w-8xl mx-auto"> 
        {/* Header Title with Theme Branding */} 
        <div className="text-center mb-10"> 
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide"> 
            <span className="text-primary-dark">PATIENTS </span> 
            <span className="text-accent-red">STORIES</span> 
          </h1> 
        </div> 

        {/* Responsive Grid Layout */} 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-center"> 
          {/* 1. Far Left Card */} 
          <div className="flex flex-col justify-center h-full"> 
            <StoryCard story={STORIES_DATA.farLeft} /> 
          </div> 

          {/* 2. Left Stacked Column */} 
          <div className="flex flex-col gap-6"> 
            {STORIES_DATA.leftColumn.map((story) => ( 
              <StoryCard key={story.id} story={story} /> 
            ))} 
          </div> 

          {/* 3. Center Featured Card (Taller) */} 
          <div className="flex flex-col justify-center h-full"> 
            <StoryCard story={STORIES_DATA.centerFeatured} isFeatured /> 
          </div> 

          {/* 4. Right Stacked Column */} 
          <div className="flex flex-col gap-6"> 
            {STORIES_DATA.rightColumn.map((story) => ( 
              <StoryCard key={story.id} story={story} /> 
            ))} 
          </div> 

          {/* 5. Far Right Card */} 
          <div className="flex flex-col justify-center h-full"> 
            <StoryCard story={STORIES_DATA.farRight} /> 
          </div> 
        </div> 
      </div> 
    </main> 
  ); 
}; 

export default PatientStories;