import React from 'react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>
          WHERE <span className="highlight">LEGENDS</span> ARE MADE
        </h1>
        <p>
          Transform your body, mind, and life at the world's most legendary gym
        </p>
        <div className="hero-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => scrollToSection('membership')}
          >
            JOIN NOW
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => scrollToSection('about')}
          >
            LEARN MORE
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
