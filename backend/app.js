import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectDB } from "./config/database.js";
import { sendEmail } from "./utils/sendEmail.js";

// Import models
import ClassBooking from "./models/ClassBooking.js";
import MembershipInquiry from "./models/MembershipInquiry.js";
import Contact from "./models/Contact.js";
import BMIRecord from "./models/BMIRecord.js";
import NutritionRecord from "./models/NutritionRecord.js";

const app = express();
const router = express.Router();

config({ path: "./config.env" });

// Connect to MongoDB
connectDB();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173", "https://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Contact form endpoint
router.post("/send/mail", async (req, res) => {
  const { name, email, phone, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, and message",
    });
  }

  try {
    // Save to database
    const contact = await Contact.create({
      name,
      email,
      phone: phone || '',
      message
    });

    const emailContent = `
New Contact Form Submission from Gold's Gym Website

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
Submission ID: ${contact._id}
This message was sent from the Gold's Gym website contact form.
    `;

    await sendEmail({
      email: process.env.ADMIN_EMAIL || "admin@goldsgym.com",
      subject: "New Contact Form Submission - Gold's Gym",
      message: emailContent,
      userEmail: email,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
      submissionId: contact._id
    });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
});

// Membership inquiry endpoint
router.post("/membership/inquiry", async (req, res) => {
  const { name, email, phone, plan, message } = req.body;
  
  if (!name || !email || !plan) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, and membership plan",
    });
  }

  try {
    // Save to database
    const inquiry = await MembershipInquiry.create({
      name,
      email,
      phone: phone || '',
      plan,
      message: message || ''
    });

    const emailContent = `
New Membership Inquiry from Gold's Gym Website

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Interested Plan: ${plan}

Additional Message:
${message || 'None'}

---
Inquiry ID: ${inquiry._id}
This inquiry was sent from the Gold's Gym website membership section.
    `;

    await sendEmail({
      email: process.env.ADMIN_EMAIL || "membership@goldsgym.com",
      subject: `New Membership Inquiry - ${plan} Plan`,
      message: emailContent,
      userEmail: email,
    });

    res.status(200).json({
      success: true,
      message: "Membership inquiry sent successfully! Our team will contact you soon.",
      inquiryId: inquiry._id
    });
  } catch (error) {
    console.error("Membership inquiry error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send inquiry. Please try again later.",
    });
  }
});

// Class booking endpoint
router.post("/classes/book", async (req, res) => {
  const { name, email, phone, className, day, time, trainer } = req.body;
  
  if (!name || !email || !phone || !className || !day || !time) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required booking information",
    });
  }

  try {
    // Save to database
    const booking = await ClassBooking.create({
      name,
      email,
      phone,
      className,
      day,
      time,
      trainer: trainer || ''
    });

    const emailContent = `
New Class Booking from Gold's Gym Website

Name: ${name}
Email: ${email}
Phone: ${phone}
Class: ${className}
Day: ${day}
Time: ${time}
Trainer: ${trainer || 'TBD'}

---
Booking ID: ${booking._id}
Status: Confirmed
    `;

    await sendEmail({
      email: process.env.ADMIN_EMAIL || "classes@goldsgym.com",
      subject: `New Class Booking - ${className}`,
      message: emailContent,
      userEmail: email,
    });

    res.status(200).json({
      success: true,
      message: "Class booked successfully! You'll receive a confirmation email shortly.",
      bookingId: booking._id
    });
  } catch (error) {
    console.error("Class booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to book class. Please try again later.",
    });
  }
});

// BMI calculation and storage endpoint
router.post("/bmi/calculate", async (req, res) => {
  const { height, weight, gender, email } = req.body;
  
  if (!height || !weight || !gender) {
    return res.status(400).json({
      success: false,
      message: "Please provide height, weight, and gender",
    });
  }

  try {
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    
    let status;
    if (bmi < 18.5) status = 'Underweight';
    else if (bmi < 25) status = 'Normal weight';
    else if (bmi < 30) status = 'Overweight';
    else status = 'Obese';

    // Save to database
    const record = await BMIRecord.create({
      height,
      weight,
      gender,
      bmi: parseFloat(bmi),
      status,
      email: email || 'anonymous'
    });

    res.status(200).json({
      success: true,
      bmi: parseFloat(bmi),
      status,
      height,
      weight,
      gender,
      recordId: record._id
    });
  } catch (error) {
    console.error("BMI calculation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to calculate BMI. Please try again later.",
    });
  }
});

// Nutrition calculation and storage endpoint
router.post("/nutrition/calculate", async (req, res) => {
  const { age, weight, height, activity, goal, email } = req.body;
  
  if (!age || !weight || !height || !activity || !goal) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required information",
    });
  }

  try {
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

    const results = {
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
      bmr: Math.round(bmr)
    };

    // Save to database
    const record = await NutritionRecord.create({
      age,
      weight,
      height,
      activity,
      goal,
      results,
      email: email || 'anonymous'
    });

    res.status(200).json({
      success: true,
      ...results,
      recordId: record._id
    });
  } catch (error) {
    console.error("Nutrition calculation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to calculate nutrition. Please try again later.",
    });
  }
});

// Get dashboard stats (for admin)
router.get("/admin/stats", async (req, res) => {
  try {
    const [
      totalBookings,
      totalInquiries,
      totalContacts,
      totalBMICalculations,
      totalNutritionCalculations,
      recentBookings,
      recentInquiries
    ] = await Promise.all([
      ClassBooking.countDocuments(),
      MembershipInquiry.countDocuments(),
      Contact.countDocuments(),
      BMIRecord.countDocuments(),
      NutritionRecord.countDocuments(),
      ClassBooking.find().sort({ createdAt: -1 }).limit(5),
      MembershipInquiry.find().sort({ createdAt: -1 }).limit(5)
    ]);

    const stats = {
      totalBookings,
      totalInquiries,
      totalContacts,
      totalBMICalculations,
      totalNutritionCalculations,
      recentBookings,
      recentInquiries
    };

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stats"
    });
  }
});

// Newsletter subscription endpoint
router.post("/newsletter/subscribe", async (req, res) => {
  const { email, name } = req.body;
  
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Please provide email address",
    });
  }

  try {
    const emailContent = `
New Newsletter Subscription from Gold's Gym Website

Name: ${name || 'Not provided'}
Email: ${email}

---
This subscription was made from the Gold's Gym website.
    `;

    await sendEmail({
      email: process.env.ADMIN_EMAIL || "newsletter@goldsgym.com",
      subject: "New Newsletter Subscription - Gold's Gym",
      message: emailContent,
      userEmail: email,
    });

    res.status(200).json({
      success: true,
      message: "Successfully subscribed to newsletter!",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to subscribe. Please try again later.",
    });
  }
});

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Gold's Gym API is running successfully",
    timestamp: new Date().toISOString(),
    version: "2.0.0"
  });
});

app.use("/api", router);

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Gold's Gym Enhanced API with MongoDB",
    features: [
      "Contact Forms",
      "Membership Inquiries", 
      "Class Bookings",
      "BMI Calculator",
      "Nutrition Tracker",
      "Admin Dashboard",
      "MongoDB Integration"
    ]
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Gold's Gym Enhanced API server listening on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
