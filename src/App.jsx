// src/App.jsx

import React from 'react';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';

// Import all the components and sections
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Certification from './sections/Certification';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

function App() {
  return (
    <ThemeProvider>
      <div className="dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Certification />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;