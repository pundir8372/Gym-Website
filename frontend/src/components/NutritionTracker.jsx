import React, { useState } from "react";
import { toast } from "react-toastify";

const NutritionTracker = () => {
  const [activeTab, setActiveTab] = useState("calculator");
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    activity: "moderate",
    goal: "maintain"
  });
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const calculateNutrition = (e) => {
    e.preventDefault();
    const { age, weight, height, activity, goal } = formData;
    
    if (!age || !weight || !height) {
      toast.error("Please fill all required fields");
      return;
    }

    // BMR calculation (Mifflin-St Jeor Equation)
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    
    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    let calories = bmr * activityMultipliers[activity];
    
    // Goal adjustments
    if (goal === "lose") calories -= 500;
    if (goal === "gain") calories += 500;

    const protein = weight * 2.2; // 2.2g per kg
    const fat = calories * 0.25 / 9; // 25% of calories
    const carbs = (calories - (protein * 4) - (fat * 9)) / 4;

    setResults({
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
      bmr: Math.round(bmr)
    });
    
    setShowResults(true);
    toast.success("Nutrition plan calculated successfully!");
  };

  const resetCalculator = () => {
    setFormData({
      age: "",
      weight: "",
      height: "",
      activity: "moderate",
      goal: "maintain"
    });
    setResults(null);
    setShowResults(false);
  };

  const closeResults = () => {
    setShowResults(false);
  };

  const mealPlans = [
    {
      name: "Muscle Building",
      calories: "2800-3200",
      description: "High protein diet for muscle growth",
      meals: [
        "Breakfast: Oatmeal with berries and protein powder",
        "Lunch: Grilled chicken salad with quinoa",
        "Snack: Protein smoothie with banana",
        "Dinner: Salmon with sweet potato and vegetables"
      ]
    },
    {
      name: "Fat Loss",
      calories: "1800-2200",
      description: "Calorie deficit with balanced macros",
      meals: [
        "Breakfast: Greek yogurt parfait with nuts",
        "Lunch: Turkey and avocado wrap",
        "Snack: Apple with almond butter",
        "Dinner: Grilled fish with steamed vegetables"
      ]
    },
    {
      name: "Maintenance",
      calories: "2200-2600",
      description: "Balanced nutrition for weight maintenance",
      meals: [
        "Breakfast: Whole grain toast with avocado",
        "Lunch: Quinoa bowl with mixed vegetables",
        "Snack: Mixed nuts and fruit",
        "Dinner: Lean beef with brown rice and vegetables"
      ]
    }
  ];

  return (
    <section className="nutrition-tracker section" id="nutrition">
      <div className="container">
        <h2 className="section-title">Nutrition Tracker</h2>
        <p className="section-subtitle">Fuel your fitness journey with proper nutrition</p>
        
        <div className="nutrition-tabs">
          <button 
            className={`tab-btn ${activeTab === "calculator" ? "active" : ""}`}
            onClick={() => setActiveTab("calculator")}
          >
            Calculator
          </button>
          <button 
            className={`tab-btn ${activeTab === "plans" ? "active" : ""}`}
            onClick={() => setActiveTab("plans")}
          >
            Meal Plans
          </button>
        </div>

        {activeTab === "calculator" && (
          <div className="nutrition-calculator">
            <form className="calculator-form" onSubmit={calculateNutrition}>
              <h3>Calculate Your Daily Nutrition Needs</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Age *</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="25"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Weight (kg) *</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    placeholder="70"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Height (cm) *</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                    placeholder="175"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Activity Level</label>
                  <select
                    value={formData.activity}
                    onChange={(e) => setFormData({...formData, activity: e.target.value})}
                  >
                    <option value="sedentary">Sedentary (little/no exercise)</option>
                    <option value="light">Light Exercise (1-3 days/week)</option>
                    <option value="moderate">Moderate Exercise (3-5 days/week)</option>
                    <option value="active">Active (6-7 days/week)</option>
                    <option value="very_active">Very Active (2x/day, intense)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Goal</label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({...formData, goal: e.target.value})}
                >
                  <option value="lose">Lose Weight (-500 cal/day)</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Gain Weight (+500 cal/day)</option>
                </select>
              </div>

              <div className="calculator-buttons">
                <button type="submit" className="btn btn-primary">
                  Calculate Nutrition
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetCalculator}>
                  Reset
                </button>
              </div>
            </form>

            {showResults && results && (
              <div className="nutrition-results">
                <div className="results-header">
                  <h3>Your Daily Nutrition Goals</h3>
                  <button className="close-result-btn" onClick={closeResults}>&times;</button>
                </div>
                
                <div className="macro-grid">
                  <div className="macro-card calories">
                    <h4>Daily Calories</h4>
                    <span className="macro-value">{results.calories}</span>
                    <small>kcal/day</small>
                  </div>
                  <div className="macro-card protein">
                    <h4>Protein</h4>
                    <span className="macro-value">{results.protein}g</span>
                    <small>{Math.round((results.protein * 4 / results.calories) * 100)}% of calories</small>
                  </div>
                  <div className="macro-card carbs">
                    <h4>Carbohydrates</h4>
                    <span className="macro-value">{results.carbs}g</span>
                    <small>{Math.round((results.carbs * 4 / results.calories) * 100)}% of calories</small>
                  </div>
                  <div className="macro-card fat">
                    <h4>Fat</h4>
                    <span className="macro-value">{results.fat}g</span>
                    <small>{Math.round((results.fat * 9 / results.calories) * 100)}% of calories</small>
                  </div>
                </div>
                
                <div className="bmr-info">
                  <p><strong>Your BMR:</strong> {results.bmr} calories/day</p>
                  <p><small>This is the minimum calories your body needs at rest</small></p>
                </div>

                <div className="results-actions">
                  <button className="btn btn-primary" onClick={() => setActiveTab("plans")}>
                    View Meal Plans
                  </button>
                  <button className="btn btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})}>
                    Get Nutrition Consultation
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "plans" && (
          <div className="meal-plans">
            {mealPlans.map((plan, index) => (
              <div key={index} className="meal-plan-card">
                <h3>{plan.name}</h3>
                <p className="calories-range">{plan.calories} calories/day</p>
                <p className="plan-description">{plan.description}</p>
                
                <div className="meal-list">
                  <h4>Sample Meals:</h4>
                  <ul>
                    {plan.meals.map((meal, i) => (
                      <li key={i}>{meal}</li>
                    ))}
                  </ul>
                </div>
                
                <button className="btn btn-secondary">Get Full Plan</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NutritionTracker;
