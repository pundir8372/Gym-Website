import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProgressTracker = () => {
  const [activeTab, setActiveTab] = useState("goals");
  const [goals, setGoals] = useState([
    { id: 1, title: "Weight Loss", current: 75, target: 70, unit: "kg" },
    { id: 2, title: "Muscle Gain", current: 15, target: 20, unit: "%" },
    { id: 3, title: "Cardio Endurance", current: 30, target: 45, unit: "min" }
  ]);
  const [achievements, setAchievements] = useState([
    { id: 1, title: "First Month Complete", date: "2024-01-15", icon: "🏆" },
    { id: 2, title: "10kg Weight Loss", date: "2024-02-20", icon: "🎯" },
    { id: 3, title: "100 Workouts", date: "2024-03-10", icon: "💪" }
  ]);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [goalForm, setGoalForm] = useState({
    title: "",
    current: "",
    target: "",
    unit: "kg"
  });

  const handleAddGoal = () => {
    setEditingGoal(null);
    setGoalForm({ title: "", current: "", target: "", unit: "kg" });
    setShowGoalModal(true);
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setGoalForm({
      title: goal.title,
      current: goal.current.toString(),
      target: goal.target.toString(),
      unit: goal.unit
    });
    setShowGoalModal(true);
  };

  const handleSaveGoal = (e) => {
    e.preventDefault();
    
    if (!goalForm.title || !goalForm.current || !goalForm.target) {
      toast.error("Please fill all fields");
      return;
    }

    const newGoal = {
      id: editingGoal ? editingGoal.id : Date.now(),
      title: goalForm.title,
      current: parseFloat(goalForm.current),
      target: parseFloat(goalForm.target),
      unit: goalForm.unit
    };

    if (editingGoal) {
      setGoals(goals.map(g => g.id === editingGoal.id ? newGoal : g));
      toast.success("Goal updated successfully!");
    } else {
      setGoals([...goals, newGoal]);
      toast.success("Goal added successfully!");
    }

    closeGoalModal();
  };

  const handleDeleteGoal = (goalId) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      setGoals(goals.filter(g => g.id !== goalId));
      toast.success("Goal deleted successfully!");
    }
  };

  const updateProgress = (goalId, newCurrent) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const updated = { ...goal, current: parseFloat(newCurrent) };
        
        // Check if goal is achieved
        if (updated.current >= updated.target && goal.current < goal.target) {
          const newAchievement = {
            id: Date.now(),
            title: `${goal.title} Goal Achieved!`,
            date: new Date().toISOString().split('T')[0],
            icon: "🎉"
          };
          setAchievements([newAchievement, ...achievements]);
          toast.success(`Congratulations! You achieved your ${goal.title} goal!`);
        }
        
        return updated;
      }
      return goal;
    });
    
    setGoals(updatedGoals);
  };

  const closeGoalModal = () => {
    setShowGoalModal(false);
    setEditingGoal(null);
    setGoalForm({ title: "", current: "", target: "", unit: "kg" });
  };

  return (
    <section className="progress-tracker section" id="progress">
      <div className="container">
        <h2 className="section-title">Track Your Progress</h2>
        <p className="section-subtitle">Set goals, monitor progress, and celebrate achievements</p>
        
        <div className="progress-tabs">
          <button 
            className={`tab-btn ${activeTab === "goals" ? "active" : ""}`}
            onClick={() => setActiveTab("goals")}
          >
            My Goals
          </button>
          <button 
            className={`tab-btn ${activeTab === "achievements" ? "active" : ""}`}
            onClick={() => setActiveTab("achievements")}
          >
            Achievements
          </button>
        </div>

        {activeTab === "goals" && (
          <div className="goals-section">
            <div className="goals-header">
              <button className="btn btn-primary" onClick={handleAddGoal}>
                Add New Goal
              </button>
            </div>
            
            <div className="goals-grid">
              {goals.map((goal) => (
                <div key={goal.id} className="goal-card">
                  <div className="goal-header">
                    <h3>{goal.title}</h3>
                    <div className="goal-actions">
                      <button onClick={() => handleEditGoal(goal)} className="edit-btn">✏️</button>
                      <button onClick={() => handleDeleteGoal(goal.id)} className="delete-btn">🗑️</button>
                    </div>
                  </div>
                  
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="progress-stats">
                    <span>{goal.current}{goal.unit}</span>
                    <span>/ {goal.target}{goal.unit}</span>
                  </div>
                  
                  <div className="progress-update">
                    <input
                      type="number"
                      placeholder="Update progress"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          updateProgress(goal.id, e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">{achievement.icon}</div>
                <h3>{achievement.title}</h3>
                <p>{achievement.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="modal-overlay" onClick={closeGoalModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingGoal ? "Edit Goal" : "Add New Goal"}</h3>
              <button className="close-btn" onClick={closeGoalModal}>&times;</button>
            </div>

            <form onSubmit={handleSaveGoal} className="goal-form">
              <div className="form-group">
                <label>Goal Title</label>
                <input
                  type="text"
                  value={goalForm.title}
                  onChange={(e) => setGoalForm({...goalForm, title: e.target.value})}
                  placeholder="e.g., Weight Loss, Muscle Gain"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Current Value</label>
                  <input
                    type="number"
                    value={goalForm.current}
                    onChange={(e) => setGoalForm({...goalForm, current: e.target.value})}
                    placeholder="75"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Target Value</label>
                  <input
                    type="number"
                    value={goalForm.target}
                    onChange={(e) => setGoalForm({...goalForm, target: e.target.value})}
                    placeholder="70"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Unit</label>
                <select
                  value={goalForm.unit}
                  onChange={(e) => setGoalForm({...goalForm, unit: e.target.value})}
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                  <option value="%">%</option>
                  <option value="min">minutes</option>
                  <option value="reps">reps</option>
                  <option value="km">km</option>
                </select>
              </div>

              <div className="modal-buttons">
                <button type="button" className="btn btn-secondary" onClick={closeGoalModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingGoal ? "Update Goal" : "Add Goal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProgressTracker;
