import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>GOLD'S GYM</h3>
            <p>
              The legendary gym where champions are made. Join us and become part 
              of the fitness legacy that has been inspiring greatness since 1965.
            </p>
            <div className="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#membership">Membership</a></li>
              <li><a href="#trainers">Trainers</a></li>
              <li><a href="#gallery">Gallery</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><a href="#">Personal Training</a></li>
              <li><a href="#">Group Classes</a></li>
              <li><a href="#">Nutrition Coaching</a></li>
              <li><a href="#">Recovery Services</a></li>
              <li><a href="#">Online Training</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p><i className="fas fa-map-marker-alt"></i> 123 Fitness Street, Los Angeles, CA 90210</p>
            <p><i className="fas fa-phone"></i> (555) 123-4567</p>
            <p><i className="fas fa-envelope"></i> info@goldsgym.com</p>
            <p><i className="fas fa-clock"></i> Mon-Fri: 5AM-11PM | Sat-Sun: 6AM-10PM</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Gold's Gym. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
