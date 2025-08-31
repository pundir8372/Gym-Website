import React from 'react';
import { toast } from 'react-toastify';

const Membership = () => {
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

  const handleMembershipInquiry = async (planName) => {
    const name = prompt('Enter your full name:');
    const email = prompt('Enter your email address:');
    const phone = prompt('Enter your phone number (optional):');
    
    if (!name || !email) {
      toast.error('Please provide your name and email address.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/membership/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone: phone || '',
          plan: planName,
          message: `I'm interested in the ${planName} membership plan.`
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error sending membership inquiry:', error);
      toast.error('Failed to send inquiry. Please try again later.');
    }
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
                onClick={() => handleMembershipInquiry(plan.name)}
              >
                GET STARTED
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Membership;
