// src/components/PBLogo.jsx

import React from 'react';

const PBLogo = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`${className} relative`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circular background with gradient */}
        <defs>
          <linearGradient id="pbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff0055" />
            <stop offset="100%" stopColor="#e6004c" />
          </linearGradient>
        </defs>
        
        {/* Pink circular background */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="url(#pbGradient)"
          className="drop-shadow-lg"
        />
        
        {/* White PB text */}
        <text 
          x="50" 
          y="62" 
          textAnchor="middle" 
          className="fill-white font-bold text-[32px] font-sans"
          style={{ fontSize: '32px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}
        >
          PB
        </text>
      </svg>
    </div>
  );
};

export default PBLogo;