// src/sections/Projects.jsx

import React, { useRef, useState, useEffect } from 'react';
import { projects } from '../data/projects';
import project1Image from '../assets/projects/devops.webp';
import project2Image from '../assets/projects/Portfolio.png';

const imageMap = {
  'devops.webp': project1Image,
  'portfolio.png': project2Image,
};

const Projects = () => {
  // Track mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'React', value: 'react' },
    { label: 'Node.js', value: 'node' },
    { label: 'Tailwind', value: 'tailwind' },
  { label: 'Vite', value: 'vite' },
  { label: 'Cloud', value: 'cloud' },
  { label: 'PHP', value: 'php' },
  ];
  const [activeFilter, setActiveFilter] = React.useState('all');
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.techStack && p.techStack.some(t => t.icon === activeFilter));

  // Carousel logic

  const scrollRef = useRef(null);
  const autoScrolling = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  // Responsive card width
  const cardWidth = window.innerWidth >= 1024 ? 340 : window.innerWidth - 48;
  // Responsive card count (desktop: 2, mobile: 1)
  const [cardCount, setCardCount] = useState(1);
  useEffect(() => {
    const updateCardCount = () => {
  setCardCount(window.innerWidth >= 1024 ? 3 : 1);
    };
    updateCardCount();
    window.addEventListener('resize', updateCardCount);
    return () => window.removeEventListener('resize', updateCardCount);
  }, []);

  // Dots count (groups)
  const dotCount = Math.ceil(filteredProjects.length / cardCount);

  // Autoplay every 30 seconds
  useEffect(() => {
    if (!filteredProjects.length) return;
    const interval = setInterval(() => {
      autoScrolling.current = true;
      setActiveIndex(prev => {
        const next = prev + cardCount;
        return next >= filteredProjects.length ? 0 : next;
      });
      setTimeout(() => { autoScrolling.current = false; }, 600);
    }, 60000); // 60 seconds
    return () => clearInterval(interval);
  }, [filteredProjects.length, cardCount]);

  // Scroll to active card/group when activeIndex changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: activeIndex * cardWidth, behavior: 'smooth' });
    }
  }, [activeIndex, cardCount, cardWidth]);

  // Scroll to group when dot is clicked
  const scrollToIndex = (idx) => {
    setActiveIndex(idx * cardCount);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: idx * cardCount * cardWidth, behavior: 'smooth' });
    }
  };

  // Update activeIndex on manual scroll
  const handleScroll = (e) => {
    if (autoScrolling.current) return;
    const index = Math.round(e.target.scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  // State for zoomed project image
  const [zoomProject, setZoomProject] = useState(null);

  return (
    <section id="projects" className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">Featured Projects</h2>
        <p className="text-center text-gray-500 mb-8">Here are some of my recent works</p>

        {/* Filter Bar - only horizontal scroll on mobile */}
        <div className="mb-8 overflow-x-auto overflow-y-hidden scrollbar-hide">
          <div className="flex flex-nowrap gap-3 md:gap-4 w-max">
            {filterOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setActiveFilter(opt.value)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition whitespace-nowrap border border-pink-100 backdrop-blur-lg ${activeFilter === opt.value ? 'bg-pink-500 text-white scale-105' : 'bg-white/60 text-pink-600 hover:bg-pink-100'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontally scrollable project cards */}
        <div className="relative group">
          {/* Previous Button */}
          <button
            type="button"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-lg border border-pink-200 text-pink-500 hover:bg-pink-500 hover:text-white transition duration-200"
            style={{ display: activeIndex > 0 ? undefined : 'none' }}
            onClick={() => {
              const groupIndex = Math.floor(activeIndex / cardCount);
              const newIndex = Math.max((groupIndex - 1) * cardCount, 0);
              setActiveIndex(newIndex);
            }}
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          {/* Next Button */}
          <button
            type="button"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-lg border border-pink-200 text-pink-500 hover:bg-pink-500 hover:text-white transition duration-200"
            style={{ display: activeIndex < (dotCount - 1) * cardCount ? undefined : 'none' }}
            onClick={() => {
              const groupIndex = Math.floor(activeIndex / cardCount);
              const newIndex = Math.min((groupIndex + 1) * cardCount, (dotCount - 1) * cardCount);
              setActiveIndex(newIndex);
            }}
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto md:overflow-x-hidden gap-6 pb-4 snap-x snap-mandatory w-full md:w-[1062px]"
            style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', maxWidth: '100%' }}
          >
            {(isMobile
              ? filteredProjects
              : filteredProjects.slice(activeIndex, activeIndex + cardCount)
            ).map((project, index) => (
              <div
                key={index}
                className={`snap-start flex flex-col rounded-2xl bg-white/30 backdrop-blur-lg shadow-xl border border-white/40 border-t-2 border-b-2 border-t-pink-200 border-b-fuchsia-200 p-4 md:p-6 mb-4 group ${isMobile ? 'min-w-full max-w-full' : 'min-w-[340px] max-w-[340px]'}`}
              >
                <img
                  src={imageMap[project.image]}
                  alt={project.name}
                  className="w-full h-48 object-cover rounded-xl mb-4 cursor-pointer"
                  onClick={() => setZoomProject(project)}
                />
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  {project.name}
                  <svg className="w-5 h-5 text-pink-400 animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m8-8h2M2 12H4m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m0-13.07l1.41 1.41M17.66 17.66l1.41 1.41" /></svg>
                </h3>
                <p className="text-gray-600 mb-4 text-base md:text-lg">{project.description}</p>
                {project.techStack && (
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-pink-50/60 text-pink-700 text-xs font-semibold shadow">
                        {/* Show icon for tech stack (FontAwesome or SVG) */}
                        {/* ...existing code for icons... */}
                        {tech.name}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-3 mt-auto">
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 h-10 px-4 rounded-lg bg-pink-600/80 text-white font-semibold shadow-lg hover:bg-pink-700/90 hover:scale-105 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 3v4a1 1 0 001 1h4" /><path strokeLinecap="round" strokeLinejoin="round" d="M5 8v10a1 1 0 001 1h10a1 1 0 001-1V8" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6" /></svg>
                    Live Demo
                  </a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 h-10 px-4 rounded-lg bg-gray-700/80 text-white font-semibold shadow-lg hover:bg-gray-900/90 hover:scale-105 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.646.349-1.088.635-1.34-2.221-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .267.18.578.688.48A10.013 10.013 0 0022 12c0-5.523-4.477-10-10-10z" /></svg>
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
          {/* Dot navigation - group based, matches Certification */}
          {dotCount > 1 && (
            // Only show dots if there are more groups than visible cards
            (cardCount === 1 ? filteredProjects.length > 1 : filteredProjects.length > 3)
          ) && (
            <div className="flex justify-center items-center gap-2 mt-4">
              {Array.from({ length: dotCount }).map((_, idx) => {
                const isActive = Math.floor(activeIndex / cardCount) === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToIndex(idx)}
                    className={`rounded-full border-2 transition-all duration-500 shadow-md ${isActive ? 'w-6 h-3 bg-gradient-to-r from-pink-300 to-fuchsia-300 border-pink-500 animate-pulse' : 'w-3 h-3 bg-gray-300 border-gray-300 opacity-60'}`}
                    aria-label={`Go to project group ${idx + 1}`}
                    style={{ display: 'inline-block' }}
                  />
                );
              })}
            </div>
          )}
          {/* Zoom Modal for project image */}
          {zoomProject && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={() => setZoomProject(null)}>
              <div className="relative bg-white rounded-xl shadow-2xl p-6 flex flex-col items-center max-w-lg w-full" onClick={e => e.stopPropagation()}>
                <img
                  src={imageMap[zoomProject.image]}
                  alt={zoomProject.name}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-xl mb-4 animate-zoom-in"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{zoomProject.name}</h3>
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-pink-500 text-2xl font-bold"
                  onClick={() => setZoomProject(null)}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div> {/* <-- Close for .max-w-6xl mx-auto */}
      </div>
    </section>
  );
}

export default Projects;