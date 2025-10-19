// src/components/Navbar.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll'; // For smooth scrolling
import { FaBars, FaTimes } from 'react-icons/fa'; // Hamburger menu icons
import PBLogo from '../assets/profile-image.png';

const Navbar = () => {
  // State to manage mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { to: 'home', label: 'Home' },
    { to: 'about', label: 'About' },
    { to: 'certification', label: 'Certification' },
    { to: 'skills', label: 'Skills' },
    { to: 'projects', label: 'Projects' },
    { to: 'contact', label: 'Contact' },
  ];

  const containerRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const orb = orbRef.current;
    if (!container || !orb) return;

    let raf = null;
    let lastX = orb.offsetLeft || 0;
    let lastY = orb.offsetTop || 0;

    const update = () => {
      const mx = parseFloat(container.dataset.mx || (container.clientWidth / 2));
      const my = parseFloat(container.dataset.my || (container.clientHeight / 2));
      // lerp the orb position for smooth trailing effect
      lastX += (mx - lastX) * 0.12;
      lastY += (my - lastY) * 0.12;
      orb.style.left = `${lastX}px`;
      orb.style.top = `${lastY}px`;
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, []);

  const NAVBAR_OFFSET = 72; // px, adjust to your navbar height

  return (
    <nav className="sticky top-3 z-50">
      {/* centered pill navbar */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-6xl ">
          <div
            ref={containerRef}
            className="relative flex items-center justify-between rounded-3xl bg-white/80 backdrop-blur-2xl shadow-[0_8px_30px_-18px_rgba(0,0,0,.10)] ring-1 ring-pink-50 border border-pink-50/40 px-5 py-2 overflow-hidden"
            onMouseMove={(e) => {
              const container = containerRef.current;
              const rect = container.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              container.dataset.mx = String(x);
              container.dataset.my = String(y);
              container.dataset.hover = '1';
            }}
            onMouseLeave={() => {
              const container = containerRef.current;
              if (container) container.dataset.hover = '0';
            }}
          >
          {/* Brand - left rounded corner */}
          <a href="/" className="flex items-center gap-3 rounded-l-3xl px-2 py-1 bg-transparent z-20 logo-badge">
            <div className="relative flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center shadow-lg">
                <img src={PBLogo} alt="PB logo" className="h-full w-full object-cover rounded-full" />
              </div>
              <span className="text-base font-bold tracking-tight text-gray-800 hidden sm:inline">Pasindu Banuka</span>
            </div>
          </a>

          {/* mouse-follow orb */}
          <div aria-hidden="true" ref={orbRef} className="mouse-orb" />

          {/* Desktop nav (centered) */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="nav-link text-sm font-bold tracking-wide uppercase px-4 py-2 rounded-full text-gray-900 transition-all duration-200 font-barlow"
                activeClass="bg-[#ff0055] text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              className={`grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#e6004c] to-pink-500 text-white shadow-lg transition-transform ${isOpen ? 'rotate-90' : ''}`}
              onClick={toggleMenu}
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

        {/* Mobile menu drawer */}
        <div className={`md:hidden fixed inset-0 z-40 transition ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={toggleMenu}
          />
          {/* Panel */}
          <div
            className={`absolute left-0 top-0 h-full w-96 bg-white/30 backdrop-blur-xl border-l-4 border-pink-300 shadow-2xl rounded-r-3xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            {/* Close button for mobile drawer */}
            <button
              aria-label="Close menu"
              className="absolute top-4 right-4 z-50 bg-white/80 rounded-full p-2 shadow-lg hover:bg-pink-100 transition"
              onClick={toggleMenu}
            >
              <FaTimes size={24} className="text-pink-500" />
            </button>
            <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto">
              {/* Navigation Sections */}
              <div className="flex flex-col gap-2 mt-2">
                {/* Liquid glass nav links with active highlight and icons */}
                {navLinks.map(link => {
                  const icons = {
                    home: <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 21V9h6v12" /></svg>,
                    about: <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M5.5 21a7.5 7.5 0 0113 0" /></svg>,
                    certification: <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4" /></svg>,
                    skills: <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 18v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 6h8m-4 0v12" /></svg>,
                    projects: <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 3h8a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></svg>,
                    contact: <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8z" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 10h.01" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 14h.01" /></svg>
                  };
                  const hash = `#${link.to}`;
                  const isActive = window.location.hash === hash;
                  const handleMobileNavClick = (e) => {
                    if (link.to === 'home') {
                      e.preventDefault();
                      toggleMenu();
                      setTimeout(() => {
                        const el = document.getElementById('home');
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }, 320); // match drawer transition
                    } else {
                      toggleMenu();
                    }
                  };
                  return (
                    <a
                      key={link.to}
                      href={hash}
                      onClick={handleMobileNavClick}
                      className={`flex items-center gap-4 px-4 py-3 rounded-2xl shadow-lg backdrop-blur-lg transition-all ${isActive ? 'bg-pink-200/60 scale-105' : 'bg-white/40 hover:bg-pink-100'}`}
                      style={{
                        boxShadow: '0 8px 32px 0 rgba(236,72,153,0.10)',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                      }}
                    >
                      <span className="bg-white/60 rounded-xl p-3 shadow flex items-center justify-center">{icons[link.to]}</span>
                      <span className={`font-bold text-gray-700 text-lg tracking-wide`}>{link.label}</span>
                    </a>
                  );
                })}
              </div>
              {/* Profile */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3 mb-2">
                  {/* Left-side icon */}
                  <span className="bg-pink-100 rounded-full p-2 shadow">
                    <svg className="w-7 h-7 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M5.5 21a7.5 7.5 0 0113 0" /></svg>
                  </span>
                  <div className="h-16 w-16 rounded-full overflow-hidden shadow-lg">
                    <img src={PBLogo} alt="Profile" className="h-full w-full object-cover rounded-full border-4 border-pink-200" />
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">Pasindu Banuka</span>
                <span className="text-xs text-gray-500"> DevOps | Full Stack</span>
              </div>
              {/* Social Links */}
              <div>
                <div className="text-xs font-bold text-pink-600 mb-2">FOLLOW ME</div>
                <div className="flex gap-3">
                  <a href="https://github.com/DKPBanuka" target="_blank" rel="noopener" className="bg-white rounded-xl p-3 shadow hover:bg-pink-50 transition"><svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.646.349-1.088.635-1.34-2.221-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .267.18.578.688.48A10.013 10.013 0 0022 12c0-5.523-4.477-10-10-10z" /></svg></a>
                  <a href="https://www.linkedin.com/in/pasindu-banuka-216b7133b" target="_blank" rel="noopener" className="bg-white rounded-xl p-3 shadow hover:bg-pink-50 transition"><svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 01-12 0C4 4.686 7.134 2 12 2s8 2.686 8 6a6 6 0 01-4 6z" /></svg></a>
                  <a href="https://wa.me/94789287469" target="_blank" rel="noopener" className="bg-white rounded-xl p-3 shadow hover:bg-pink-50 transition"><svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.13 1.61 5.93L0 24l6.07-1.59A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-2.12-.55-4.13-1.61-5.93zM12 22c-1.85 0-3.63-.5-5.18-1.44l-.37-.22-3.6.95.96-3.51-.24-.38A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.61-.48-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1.01-1 2.46s1.03 2.85 1.18 3.05c.15.2 2.03 3.2 5.01 4.36.7.3 1.25.48 1.68.61.43.13.82.12 1.13.07.31-.05.96-.39 1.1-.77.14-.38.14-.71.1-.77-.04-.06-.15-.1-.43-.24z" /></svg></a>
                </div>
              </div>
              {/* Quick Actions */}
              <div>
                <div className="text-xs font-bold text-pink-600 mb-2">QUICK ACTIONS</div>
                <div className="flex flex-col gap-4">
                  <a href="/resume.pdf" download className="flex items-center gap-3 bg-pink-500 text-white rounded-xl px-4 py-3 shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 10l5 5 5-5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 15V3" /></svg>
                    <div>
                      <div className="font-bold">Download Resume</div>
                      <div className="text-xs text-pink-100">Get my latest CV</div>
                    </div>
                  </a>
                  <a href="#projects" className="flex items-center gap-3 bg-pink-500 text-white rounded-xl px-4 py-3 shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 3v4a1 1 0 001 1h4" /><path strokeLinecap="round" strokeLinejoin="round" d="M5 8v10a1 1 0 001 1h10a1 1 0 001-1V8" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6" /></svg>
                    <div>
                      <div className="font-bold">View Projects</div>
                      <div className="text-xs text-pink-100">See my work</div>
                    </div>
                  </a>
                  <a href="#contact" className="flex items-center gap-3 bg-pink-500 text-white rounded-xl px-4 py-3 shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8z" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 10h.01" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 14h.01" /></svg>
                    <div>
                      <div className="font-bold">Hire Me</div>
                      <div className="text-xs text-pink-100">Let's work together</div>
                    </div>
                  </a>
                </div>
              </div>
              {/* Contact Info */}
              <div>
                <div className="text-xs font-bold text-pink-600 mb-2 mt-4">CONTACT</div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 11h8M8 15h6" /></svg>
                    <div>
                      <div className="font-bold">Call Now</div>
                      <div className="text-xs text-gray-500">+94 789287469</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12v1a4 4 0 01-8 0v-1" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v2m0-6V8m0 0a4 4 0 014-4h0a4 4 0 00-4 4z" /></svg>
                    <div>
                      <div className="font-bold">Mail Us</div>
                      <div className="text-xs text-gray-500">pasindubanuka155@gmail.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;