import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroSlides = [
    {
      title: "WHERE LEGENDS ARE MADE",
      subtitle: "Transform your body, mind, and life at the world's most legendary gym",
      bg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3"
    },
    {
      title: "UNLEASH YOUR POTENTIAL",
      subtitle: "State-of-the-art equipment and expert trainers to guide your journey",
      bg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3"
    },
    {
      title: "ACHIEVE GREATNESS",
      subtitle: "Join thousands who've transformed their lives with us",
      bg: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slide.bg})` }}
        >
          <div className={`hero-content ${isVisible ? 'fade-in-up' : ''}`}>
            <h1>
              {slide.title.split(' ').map((word, i) => (
                <span key={i} className={word === 'LEGENDS' || word === 'POTENTIAL' || word === 'GREATNESS' ? 'highlight' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p>{slide.subtitle}</p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary floating-animation"
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
        </div>
      ))}
      
      <div className="hero-indicators">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;
