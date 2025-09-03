import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import WorkoutSessions from "./components/WorkoutSessions";
import ClassSchedule from "./components/ClassSchedule";
import Membership from "./components/Membership";
import Trainers from "./components/Trainers";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import BMICalculator from "./components/BMICalculator";
import NutritionTracker from "./components/NutritionTracker";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import Chatbot from "./components/Chatbot";
import AuthModal from "./components/Auth/AuthModal";
import UserDashboard from "./components/UserDashboard";
import PaymentModal from "./components/PaymentModal";

const HomePage = ({ user, onLoginClick, onDashboardClick, onPlanSelect }) => (
  <>
    <Navbar 
      user={user} 
      onLoginClick={onLoginClick}
      onDashboardClick={onDashboardClick}
    />
    <Hero />
    <About />
    <WorkoutSessions />
    <ClassSchedule user={user} />
    <Membership onPlanSelect={onPlanSelect} />
    <Trainers />
    <Testimonials />
    <Gallery />
    <BMICalculator />
    <NutritionTracker />
    <FAQ />
    <Contact />
    <Footer />
    <Chatbot />
  </>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleAuth = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowDashboard(false);
  };

  const handlePlanSelect = (plan) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            showDashboard && user ? (
              <UserDashboard user={user} onLogout={handleLogout} />
            ) : (
              <HomePage 
                user={user}
                onLoginClick={() => setShowAuthModal(true)}
                onDashboardClick={() => setShowDashboard(true)}
                onPlanSelect={handlePlanSelect}
              />
            )
          } 
        />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />
      
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        plan={selectedPlan}
        user={user}
      />
      
      <ToastContainer theme="dark" position="top-center" />
    </Router>
  );
};

export default App;
