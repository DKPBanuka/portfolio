// src/sections/About.jsx

import React from 'react';

// Importing icons from react-icons library
import { FaBriefcase, FaCode, FaGraduationCap, FaCoffee } from 'react-icons/fa';

// Data for the stats cards. This makes it easy to add or remove cards later.
const stats = [
  {
    icon: <FaBriefcase size={40} />, // Icon component
    value: '5+', // The stat value
    label: 'Projects Completed', // The description
  },
  {
    icon: <FaCode size={40} />,
    value: '10+',
    label: 'Technologies',
  },
  {
    icon: <FaGraduationCap size={40} />,
    value: '2nd',
    label: 'Year Undergraduate',
  },
  {
    icon: <FaCoffee size={40} />,
    value: '100+',
    label: 'Coding Hours/Week',
  },
];

const About = () => {
  return (
    // Main container for the About section with an ID for navigation
    <section id="about" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">About Me</h2>
        <p className="text-center text-gray-500 mb-12">My introduction</p>
        
        {/* Two-column layout for description and stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Bio/Description */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">DevOps & Full Stack Developer</h3>
            <p className="text-gray-600 mb-4">
              I'm an undergraduate at the <strong className="text-pink-600">University of Sri Jayawardenepura</strong> with a strong passion for building reliable systems and scalable applications.
            </p>
            <p className="text-gray-600">
              My technical expertise includes <strong className="text-pink-600">DevOps (CI/CD, Docker, Linux), Cloud, React, Node.js, Python, SQL, and MongoDB</strong>. I love bridging development and operations for smooth delivery.
            </p>
          </div>

          {/* Right Column: Stats Cards */}
          <div>
            {/* Grid layout for the 2x2 cards */}
            <div className="grid grid-cols-2 gap-6">
              {/* Mapping over the stats array to dynamically render each card */}
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="text-pink-600 mb-3 inline-block">
                    {stat.icon}
                  </div>
                  <h4 className="text-3xl font-bold text-gray-800">{stat.value}</h4>
                  <p className="text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;