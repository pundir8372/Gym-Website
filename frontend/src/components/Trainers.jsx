import React from 'react';

const Trainers = () => {
  const trainers = [
    {
      name: 'Mike Johnson',
      specialty: 'Strength & Conditioning',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      bio: 'Former powerlifting champion with 15+ years of experience in strength training and muscle building.',
      social: {
        instagram: '#',
        facebook: '#',
        twitter: '#'
      }
    },
    {
      name: 'Sarah Williams',
      specialty: 'HIIT & Cardio',
      image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      bio: 'Certified fitness instructor specializing in high-intensity workouts and cardiovascular conditioning.',
      social: {
        instagram: '#',
        facebook: '#',
        twitter: '#'
      }
    },
    {
      name: 'David Rodriguez',
      specialty: 'Bodybuilding & Nutrition',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      bio: 'Professional bodybuilder and nutritionist helping clients achieve their physique goals.',
      social: {
        instagram: '#',
        facebook: '#',
        twitter: '#'
      }
    },
    {
      name: 'Lisa Chen',
      specialty: 'Yoga & Flexibility',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      bio: 'Certified yoga instructor focusing on flexibility, mindfulness, and holistic wellness.',
      social: {
        instagram: '#',
        facebook: '#',
        twitter: '#'
      }
    }
  ];

  return (
    <section id="trainers" className="trainers section">
      <div className="container">
        <h2 className="section-title">EXPERT TRAINERS</h2>
        <p className="section-subtitle">
          Train with the best in the business and achieve legendary results
        </p>
        
        <div className="trainers-grid">
          {trainers.map((trainer, index) => (
            <div key={index} className="trainer-card">
              <div className="trainer-image">
                <img src={trainer.image} alt={trainer.name} />
                <div className="trainer-social">
                  <a href={trainer.social.instagram} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href={trainer.social.facebook} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href={trainer.social.twitter} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
              
              <div className="trainer-info">
                <h3 className="trainer-name">{trainer.name}</h3>
                <p className="trainer-specialty">{trainer.specialty}</p>
                <p className="trainer-bio">{trainer.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
