import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Gold's Gym transformed my life completely. The trainers are incredible and the equipment is top-notch. I've never felt stronger or more confident!",
      author: "John Smith",
      role: "Member since 2020",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
      text: "The community at Gold's Gym is amazing. Everyone supports each other, and the trainers really care about your progress. Best decision I ever made!",
      author: "Maria Garcia",
      role: "Member since 2019",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
      text: "I've been to many gyms, but Gold's Gym is in a league of its own. The facilities are world-class and the results speak for themselves.",
      author: "Robert Johnson",
      role: "Member since 2018",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <h2 className="section-title">SUCCESS STORIES</h2>
        <p className="section-subtitle">
          Hear from our members who have achieved legendary transformations
        </p>
        
        <div className="testimonials-slider">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`testimonial-item ${index === currentTestimonial ? 'active' : ''}`}
            >
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src={testimonial.image} alt={testimonial.author} />
                </div>
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="testimonial-nav">
            {testimonials.map((_, index) => (
              <div 
                key={index}
                className={`nav-dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
