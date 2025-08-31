import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import WorkoutSessions from "./components/WorkoutSessions";
import Membership from "./components/Membership";
import Trainers from "./components/Trainers";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import BMICalculator from "./components/BMICalculator";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Hero />
      <About />
      <WorkoutSessions />
      <Membership />
      <Trainers />
      <Testimonials />
      <Gallery />
      <BMICalculator />
      <Contact />
      <Footer />
      <ToastContainer theme="dark" position="top-center" />
    </Router>
  );
};

export default App;
