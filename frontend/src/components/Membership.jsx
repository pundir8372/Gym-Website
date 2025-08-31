import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Membership = () => {
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [membershipForm, setMembershipForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const plans = [
    {
      name: 'Basic',
      price: '$29',
      period: '/month',
      features: [
        'Access to gym equipment',
        'Locker room access',
        'Basic fitness assessment',
        'Mobile app access',
        'Guest privileges (2/month)'
      ]
    },
    {
      name: 'Premium',
      price: '$59',
      period: '/month',
      featured: true,
      features: [
        'All Basic features',
        'Group fitness classes',
        'Personal training session',
        'Nutrition consultation',
        'Unlimited guest privileges',
        'Towel service',
        'Priority booking'
      ]
    },
    {
      name: 'Elite',
      price: '$99',
      period: '/month',
      features: [
        'All Premium features',
        'Unlimited personal training',
        'Custom meal planning',
        'Recovery services',
        'VIP locker room',
        'Exclusive member events',
        'Priority equipment access'
      ]
    }
  ];

  const handleMembershipInquiry = (plan) => {
    setSelectedPlan(plan);
    setShowMembershipModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!membershipForm.name || !membershipForm.email) {
      toast.error('Please provide your name and email address.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/membership/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...membershipForm,
          plan: selectedPlan.name,
          message: membershipForm.message || `I'm interested in the ${selectedPlan.name} membership plan.`
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        closeModal();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error sending membership inquiry:', error);
      toast.error('Failed to send inquiry. Please try again later.');
    }
  };

  const closeModal = () => {
    setShowMembershipModal(false);
    setSelectedPlan(null);
    setMembershipForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="membership" className="membership section">
      <div className="container">
        <h2 className="section-title">MEMBERSHIP PLANS</h2>
        <p className="section-subtitle">
          Choose the perfect plan to start your legendary fitness journey
        </p>
        
        <div className="membership-plans">
          {plans.map((plan, index) => (
            <div key={index} className={`plan-card ${plan.featured ? 'featured' : ''}`}>
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">{plan.price}</div>
              <div className="plan-period">{plan.period}</div>
              
              <ul className="plan-features">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <i className="fas fa-check"></i>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                className="btn btn-primary"
                onClick={() => handleMembershipInquiry(plan)}
              >
                GET STARTED
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Membership Modal */}
      {showMembershipModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Join {selectedPlan?.name} Plan</h3>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            
            <div className="membership-info">
              <h4>{selectedPlan?.name} - {selectedPlan?.price}{selectedPlan?.period}</h4>
              <p>Fill out the form below and our team will contact you within 24 hours.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="membership-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={membershipForm.name}
                  onChange={(e) => setMembershipForm({...membershipForm, name: e.target.value})}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={membershipForm.email}
                  onChange={(e) => setMembershipForm({...membershipForm, email: e.target.value})}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={membershipForm.phone}
                  onChange={(e) => setMembershipForm({...membershipForm, phone: e.target.value})}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label>Additional Message</label>
                <textarea
                  value={membershipForm.message}
                  onChange={(e) => setMembershipForm({...membershipForm, message: e.target.value})}
                  placeholder="Any specific questions or requirements?"
                  rows="3"
                />
              </div>

              <div className="modal-buttons">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Membership;
