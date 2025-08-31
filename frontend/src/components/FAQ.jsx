import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What are your operating hours?",
      answer: "We're open 24/7, 365 days a year. Our staffed hours are Monday-Friday 6AM-10PM, weekends 8AM-8PM. You can access the gym anytime with your membership card."
    },
    {
      question: "Do you offer personal training?",
      answer: "Yes! We have certified personal trainers available for one-on-one sessions. Book a consultation to discuss your fitness goals and create a personalized workout plan."
    },
    {
      question: "What's included in the membership?",
      answer: "All memberships include access to gym equipment, group classes, locker rooms, showers, and basic fitness assessment. Premium and VIP plans include additional perks like personal training sessions."
    },
    {
      question: "Can I freeze my membership?",
      answer: "Yes, you can freeze your membership for up to 3 months per year for medical reasons, travel, or other valid circumstances. A small administrative fee may apply."
    },
    {
      question: "Do you have a trial period?",
      answer: "We offer a 7-day free trial for new members. No commitment required! This gives you full access to try our facilities and classes before deciding on a membership."
    },
    {
      question: "What safety measures do you have?",
      answer: "We maintain high cleanliness standards, have emergency protocols in place, and our staff is trained in first aid and CPR. We also have security cameras and 24/7 monitoring."
    },
    {
      question: "Do you provide nutrition guidance?",
      answer: "Yes! We offer nutrition consultations, meal planning, and have a nutrition tracker tool on our website. Our trainers can also provide basic dietary advice."
    },
    {
      question: "What if I want to cancel my membership?",
      answer: "You can cancel your membership with 30 days written notice. There are no cancellation fees for monthly memberships. Annual memberships have specific terms outlined in your contract."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section faq">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Got questions? We've got answers to help you get started on your fitness journey.
        </p>
        
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>
                <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="faq-contact">
          <p>Still have questions? <a href="#contact" className="contact-link">Contact us</a> and we'll be happy to help!</p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
