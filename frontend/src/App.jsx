import React from "react";
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

const HomePage = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <WorkoutSessions />
    <ClassSchedule />
    <Membership />
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <ToastContainer theme="dark" position="top-center" />
    </Router>
  );
};

export default App;
