import React from 'react';

const WorkoutSessions = () => {
  const workouts = [
    {
      title: 'Strength Training',
      description: 'Build muscle and increase power with our comprehensive strength training programs.',
      icon: 'fas fa-dumbbell'
    },
    {
      title: 'Cardio Workouts',
      description: 'Improve cardiovascular health and burn calories with high-intensity cardio sessions.',
      icon: 'fas fa-heartbeat'
    },
    {
      title: 'Group Classes',
      description: 'Join our energetic group fitness classes for motivation and community support.',
      icon: 'fas fa-users'
    },
    {
      title: 'Personal Training',
      description: 'Get personalized attention with one-on-one training sessions tailored to your goals.',
      icon: 'fas fa-user-tie'
    }
  ];

  return (
    <section id="workouts" className="workouts section">
      <div className="container">
        <h2 className="section-title">WORKOUT SESSIONS</h2>
        <p className="section-subtitle">
          Discover our comprehensive range of workout programs designed to help you achieve your fitness goals
        </p>
        
        <div className="workouts-grid">
          {workouts.map((workout, index) => (
            <div key={index} className="workout-card">
              <div className="workout-icon">
                <i className={workout.icon}></i>
              </div>
              <h3>{workout.title}</h3>
              <p>{workout.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkoutSessions;
