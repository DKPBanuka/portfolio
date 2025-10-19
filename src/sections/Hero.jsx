// src/sections/Hero.jsx

import React from 'react';
import { TypeAnimation } from 'react-type-animation';

// Import your profile picture
import profileImage from '../assets/profile-image.png';

const Hero = () => {
  return (
  // Main container for the hero section — fill viewport and center content
  <section id="home" className="min-h-screen flex items-center px-4 pt-12 md:pt-2 relative z-0">
      {/* Grid layout for responsiveness */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        
        {/* Left side: Text content */}
  <div className="text-center lg:text-left animate-fade-in" style={{ animationDelay: '150ms' }}>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-3">
            Hi, I'm <span className="text-zinc-900">Pasindu Banuka</span>
          </h1>
          

          {/* TypeAnimation component for the dynamic roles */}
          <TypeAnimation
            sequence={[
              'DevOps Engineer', 2000,
              '', 1, // clear
              'Full Stack Developer', 2000,
              '', 1
            ]}
            speed={50}
            deletionSpeed={70}
            wrapper="h2"
            className="text-2xl md:text-3xl font-semibold text-4xl bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent mb-6"
            repeat={Infinity}
          />

          <p className="text-zinc-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0">
            Passionate about creating innovative digital solutions that bridge technology and creativity. Specialized in full‑stack development and DevOps.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col md:flex-row justify-center lg:justify-start gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-rose-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-rose-700 w-full md:w-auto justify-center"
            >
              {/* Folder Icon */}
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 3h8a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
              </svg>
              View Projects
              <span className="inline-block transform transition-transform group-hover:translate-x-1"></span>
            </a>
            <a
              href="/resume.pdf" // Link to your resume PDF
              download
              className="inline-flex items-center gap-2 bg-white text-rose-600 font-semibold py-3 px-6 rounded-full border-2 border-rose-600 transition-colors duration-300 hover:bg-rose-50 w-full md:w-auto justify-center"
            >
              {/* Download Arrow Icon */}
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 10l5 5 5-5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15V3" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        {/* Right side: Image */}
  <div className="flex justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
          {/* Profile with animated ring and floating tech badges */}
          <div className="relative w-[28rem] h-[28rem] md:w-[32rem] md:h-[32rem]">
            {/* Multi-blob background composition with animations */}
            <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 800 800" className="w-full h-full absolute z-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="blob1Grad" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#e879f9" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  <linearGradient id="blob2Grad" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                
                {/* Large purple blob - top right with morphing animation */}
                <path className="blob-morph-1" d="M650,150Q750,250,680,380Q610,510,480,460Q350,410,320,280Q290,150,410,120Q530,90,650,150Z" 
                      fill="url(#blob1Grad)" opacity="0.8">
                  <animate attributeName="d" dur="20s" repeatCount="indefinite"
                    values="M650,150Q750,250,680,380Q610,510,480,460Q350,410,320,280Q290,150,410,120Q530,90,650,150Z;
                            M680,180Q720,280,650,400Q580,520,450,480Q320,440,300,300Q280,160,400,140Q520,120,680,180Z;
                            M650,150Q750,250,680,380Q610,510,480,460Q350,410,320,280Q290,150,410,120Q530,90,650,150Z" />
                </path>
                
                {/* Medium pink blob - left side with floating animation */}
                <g className="blob-float-1">
                  <path d="M200,200Q300,150,350,250Q400,350,300,420Q200,490,120,370Q40,250,120,180Q200,110,200,200Z" 
                        fill="url(#blob2Grad)" opacity="0.7">
                    <animate attributeName="d" dur="15s" repeatCount="indefinite"
                      values="M200,200Q300,150,350,250Q400,350,300,420Q200,490,120,370Q40,250,120,180Q200,110,200,200Z;
                              M220,220Q320,170,330,270Q340,370,280,440Q220,510,140,390Q60,270,140,200Q220,130,220,220Z;
                              M200,200Q300,150,350,250Q400,350,300,420Q200,490,120,370Q40,250,120,180Q200,110,200,200Z" />
                  </path>
                </g>
                
                {/* Small dark dot - top with pulsing */}
                <circle className="blob-pulse-1" cx="450" cy="100" r="35" fill="#6b7280" opacity="0.8">
                  <animate attributeName="r" dur="4s" repeatCount="indefinite"
                    values="35;45;35" />
                  <animate attributeName="opacity" dur="4s" repeatCount="indefinite"
                    values="0.8;0.5;0.8" />
                </circle>
                
                {/* Small dark dot - bottom right with drift */}
                <g className="blob-drift-1">
                  <circle cx="650" cy="650" r="25" fill="#4b5563" opacity="0.6">
                    <animate attributeName="cy" dur="8s" repeatCount="indefinite"
                      values="650;630;650" />
                    <animate attributeName="cx" dur="12s" repeatCount="indefinite"
                      values="650;670;650" />
                  </circle>
                </g>
              </svg>
            </div>

            {/* Circular profile image in center with gentle float */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="profile-container relative w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-white">
                <img
                  src={profileImage}
                  alt="Pasindu Banuka"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;