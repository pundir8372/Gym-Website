import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [bmi, setBmi] = useState('');
  const [status, setStatus] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculateBMI = (e) => {
    e.preventDefault();

    if (!height || !weight || !gender) {
      toast.error('Please fill in all fields');
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setStatus('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setStatus('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setStatus('Overweight');
    } else {
      setStatus('Obese');
    }

    setShowResult(true);
    toast.success('BMI calculated successfully!');
  };

  const resetCalculator = () => {
    setHeight('');
    setWeight('');
    setGender('');
    setBmi('');
    setStatus('');
    setShowResult(false);
  };

  const closeResult = () => {
    setShowResult(false);
  };

  return (
    <section id="bmi" className="bmi section">
      <div className="container">
        <h2 className="section-title">BMI CALCULATOR</h2>
        <p className="section-subtitle">
          Calculate your Body Mass Index to understand your current fitness level
        </p>
        
        <div className="bmi-content">
          <form className="bmi-form" onSubmit={calculateBMI}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="height">Height (cm)</label>
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter your height"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter your weight"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <div className="bmi-buttons">
              <button type="submit" className="btn btn-primary">
                CALCULATE BMI
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetCalculator}>
                RESET
              </button>
            </div>
          </form>
          
          {showResult && bmi && (
            <div className="bmi-result">
              <div className="result-header">
                <h3>Your BMI Result</h3>
                <button className="close-result-btn" onClick={closeResult}>&times;</button>
              </div>
              
              <div className="bmi-value">{bmi}</div>
              <div className={`bmi-status ${status.toLowerCase().replace(' ', '-')}`}>
                {status}
              </div>
              
              <div className="bmi-details">
                <p><strong>Height:</strong> {height} cm</p>
                <p><strong>Weight:</strong> {weight} kg</p>
                <p><strong>Gender:</strong> {gender}</p>
              </div>
              
              <p className="bmi-advice">
                {status === 'Normal weight' 
                  ? 'Great! You have a healthy BMI. Keep up the good work!'
                  : status === 'Underweight'
                  ? 'Consider a muscle-building program with our trainers.'
                  : status === 'Overweight'
                  ? 'A balanced diet and cardio program can help you reach your goals.'
                  : 'We recommend consulting with our nutrition and fitness experts.'
                }
              </p>
              
              <div className="bmi-actions">
                <button className="btn btn-primary" onClick={() => document.getElementById('membership').scrollIntoView({behavior: 'smooth'})}>
                  Join Our Gym
                </button>
                <button className="btn btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})}>
                  Get Consultation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BMICalculator;
