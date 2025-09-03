import React, { useState, useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../utils/scrollLock';

const Navbar = ({ user, onLoginClick, onDashboardClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (isMobileMenuOpen) {
        enableBodyScroll();
      }
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      enableBodyScroll();
    }
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    if (newState) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#home" className="logo" onClick={() => scrollToSection('home')}>
          THE LIFE GYM
        </a>
        
        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
          <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
          <li><a href="#workouts" onClick={() => scrollToSection('workouts')}>Workouts</a></li>
          <li><a href="#membership" onClick={() => scrollToSection('membership')}>Membership</a></li>
          <li><a href="#trainers" onClick={() => scrollToSection('trainers')}>Trainers</a></li>
          <li><a href="#testimonials" onClick={() => scrollToSection('testimonials')}>Testimonials</a></li>
          <li><a href="#gallery" onClick={() => scrollToSection('gallery')}>Gallery</a></li>
          <li><a href="#bmi" onClick={() => scrollToSection('bmi')}>BMI</a></li>
          <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
          
          {user ? (
            <li className="user-menu">
              <span className="user-name">Hi, {user.name}</span>
              <button onClick={onDashboardClick} className="btn btn-primary">Dashboard</button>
            </li>
          ) : (
            <li>
              <button onClick={onLoginClick} className="btn btn-primary">Login</button>
            </li>
          )}
        </ul>

        <div 
          className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
