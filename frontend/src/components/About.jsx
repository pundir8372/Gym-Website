import React from 'react';

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>THE LEGEND CONTINUES</h2>
            <p>
              Since 1965, Gold's Gym has been the mecca of bodybuilding and fitness. 
              We've built our reputation on providing the most serious fitness experience 
              on the planet.
            </p>
            <p>
              Our state-of-the-art facilities, world-class equipment, and expert trainers 
              create an environment where champions are forged and legends are born.
            </p>
            
            <div className="about-features">
              <div className="feature-item">
                <i className="fas fa-dumbbell"></i>
                <span>Premium Equipment</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-users"></i>
                <span>Expert Trainers</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-clock"></i>
                <span>24/7 Access</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-trophy"></i>
                <span>Proven Results</span>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Gold's Gym Interior"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
