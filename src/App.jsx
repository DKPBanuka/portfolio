// src/App.jsx

import React from 'react';
import Footer from './components/Footer';

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
    <div>
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
  );
}

export default App;