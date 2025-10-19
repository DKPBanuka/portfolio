// src/sections/Certification.jsx

import React, { useState } from 'react';
import awsFoundationImg from '../assets/certification/Aws foundation.png';
import dockerBadgeImg from '../assets/certification/Docker-Level1.png';
import gitBadgeImg from '../assets/certification/Git-Level1.png';

const certificationsData = [
  {
    image: awsFoundationImg,
    title: 'AWS Certified Cloud Practitioner',
    org: 'Amazon Web Services',
    issueDate: '2025-10-03',
    credential: 'https://www.credly.com/badges/aws-cloud-practitioner',
    description: 'Fundamental knowledge of AWS Cloud, including Cloud Computing, Security, Billing, and Architecture.',
    category: 'Cloud',
  },
  {
    image: dockerBadgeImg,
    title: 'Docker Level 1',
    org: 'KodeKloud',
    issueDate: '2025-09-25',
    credential: 'https://engineer.kodekloud.com/certificate-verification/b1b0afd3-2227-4ebd-b7cc-1402eba682c8',
    description: 'Basic understanding of Docker containerization, image building, networking, and volume management.',
    category: 'DevOps',
  },
  {
    image: gitBadgeImg,
    title: 'Git Level 1',
    org: 'KodeKloud',
    issueDate: '2025-10-01',
    credential: 'https://engineer.kodekloud.com/certificate-verification/30517bc7-5cdf-4dc8-846f-a180435be4f9',
    description: 'Essential knowledge of Git repositories, branching, merging, commit history, and remote repository management.',
    category: 'Version Control',
  },
  // Add more certifications with category and role
];


const categories = [...new Set(certificationsData.map(c => c.category))];

const Certification = () => {
  // Track if auto-scroll is running
  const autoScrolling = React.useRef(false);
  // Responsive card count (desktop: 3, mobile: 1)
  const [cardCount, setCardCount] = useState(1);
  React.useEffect(() => {
    const updateCardCount = () => {
      setCardCount(window.innerWidth >= 1024 ? 3 : 1);
    };
    updateCardCount();
    window.addEventListener('resize', updateCardCount);
    return () => window.removeEventListener('resize', updateCardCount);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  // Filter logic (only by category)
  const filteredCerts = certificationsData.filter(cert =>
    selectedCategory === 'All' || cert.category === selectedCategory
  );

  // Auto-scroll cards every 8 seconds (responsive)
  React.useEffect(() => {
    if (!filteredCerts.length) return;
    const interval = setInterval(() => {
      autoScrolling.current = true;
      setActiveIndex(prev => {
        const next = prev + cardCount;
        return next >= filteredCerts.length ? 0 : next;
      });
      setTimeout(() => { autoScrolling.current = false; }, 600); // allow scroll to finish
    }, 8000);
    return () => clearInterval(interval);
  }, [filteredCerts.length, cardCount]);

  // Scroll to active card/group when activeIndex changes
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: activeIndex * 340,
        behavior: 'smooth',
      });
    }
  }, [activeIndex, cardCount]);

  const [zoomCert, setZoomCert] = useState(null);
  // Helper: check if certification is new (issued within last 14 days)
  const isNewCertification = (issueDate) => {
    const today = new Date();
    const issued = new Date(issueDate);
    const diffTime = today - issued;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 14;
  };

  // Scroll handler
  const scrollRef = React.useRef(null);
  const handleScroll = (e) => {
    if (autoScrolling.current) return; // ignore scroll events during auto-scroll
    const cardWidth = 340; // px
    const index = Math.round(e.target.scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  return (
    <section id="certification" className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4 tracking-tight animate-fade-in">Certifications & Badges</h2>
        <p className="text-center text-gray-500 mb-8 animate-fade-in">My professional achievements, awards, and badges</p>
        {/* Category Filter Only */}
        {/* Category Filter Only - horizontal scroll on mobile */}
        <div className="flex flex-nowrap gap-3 mb-8 overflow-x-auto scrollbar-hide px-1" style={{ WebkitOverflowScrolling: 'touch' }}>
          <button
            className={`px-4 py-2 rounded-full font-semibold border transition-colors duration-200 ${selectedCategory === 'All' ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-pink-500 border-pink-300 hover:bg-pink-50'}`}
            onClick={() => setSelectedCategory('All')}
          >All</button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full font-semibold border transition-colors duration-200 ${selectedCategory === cat ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-pink-500 border-pink-300 hover:bg-pink-50'}`}
              onClick={() => setSelectedCategory(cat)}
            >{cat}</button>
          ))}
        </div>
        {/* Horizontal Scrollable Cards */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-8 pb-6 scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {filteredCerts.map((cert, index) => (
              <div
                key={index}
                className="min-w-[340px] max-w-[340px] bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-pink-400 relative animate-fade-in cursor-pointer"
                style={{ scrollSnapAlign: 'center', animationDelay: `${index * 150}ms` }}
                onClick={() => setZoomCert(cert)}
              >
                <div className="relative mb-4">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="h-24 w-24 object-contain rounded-xl drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  />
                  {isNewCertification(cert.issueDate) && (
                    <span className="absolute -top-3 -right-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-md animate-bounce">NEW</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1 text-center leading-tight animate-fade-in">{cert.title}</h3>
                <div className="text-sm text-pink-600 font-semibold mb-2 text-center flex items-center gap-2 animate-fade-in">
                  {/* Award/Organization Icon */}
                  <svg className="w-5 h-5 text-yellow-500 inline-block" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.75l-5.5 3.25 1.5-6.25-5-4.25 6.5-.5L12 4.5l2.5 5.5 6.5.5-5 4.25 1.5 6.25z" />
                  </svg>
                  {cert.org}
                </div>
                <div className="flex justify-center gap-3 mb-2 animate-fade-in">
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full shadow">{cert.category}</span>
                </div>
                <div className="text-xs text-gray-400 mb-2 animate-fade-in">Issued: {cert.issueDate}</div>
                <div className="w-full mt-2 mb-3 animate-slide-up">
                  <p className="text-gray-700 text-sm text-center leading-relaxed transition-opacity duration-500 hover:opacity-90">
                    {cert.description}
                  </p>
                </div>
                <a
                  href={cert.credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-semibold shadow hover:scale-105 hover:from-pink-600 hover:to-fuchsia-600 transition-all duration-300 animate-fade-in"
                  onClick={e => e.stopPropagation()}
                >
                  {/* Certificate Icon */}
                  <svg className="w-5 h-5 text-white inline-block" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V2H7v7M7 9v13l5-3 5 3V9" />
                  </svg>
                  View Credential
                </a>
              </div>
            ))}
          </div>
          {/* Dot indicators - show only if more than one card visible */}
          {Math.ceil(filteredCerts.length / cardCount) > 1 && (
            <div className="flex justify-center items-center gap-2 mt-2">
              {Array.from({ length: Math.ceil(filteredCerts.length / cardCount) }).map((_, idx) => {
                // Active dot logic: desktop (group), mobile (card)
                const isActive = Math.floor(activeIndex / cardCount) === idx;
                return (
                  <span
                    key={idx}
                    className={`rounded-full border-2 transition-all duration-500 shadow-md ${isActive
                      ? 'w-6 h-3 bg-gradient-to-r from-pink-300 to-fuchsia-300 border-pink-500 animate-pulse'
                      : 'w-3 h-3 bg-gray-300 border-gray-300 opacity-60'} `}
                    style={{ display: 'inline-block' }}
                  />
                );
              })}
            </div>
          )}
        </div>
        {/* Zoom Modal for certificate image */}
        {zoomCert && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={() => setZoomCert(null)}>
            <div className="relative bg-white rounded-xl shadow-2xl p-6 flex flex-col items-center max-w-lg w-full" onClick={e => e.stopPropagation()}>
              <img
                src={zoomCert.image}
                alt={zoomCert.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl mb-4 animate-zoom-in"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{zoomCert.title}</h3>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-pink-500 text-2xl font-bold"
                onClick={() => setZoomCert(null)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Certification;