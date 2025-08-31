import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
const router = express.Router();

config({ path: "./config.env" });

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
    const emailContent = `
New Contact Form Submission from Gold's Gym Website

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
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
    const emailContent = `
New Membership Inquiry from Gold's Gym Website

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Interested Plan: ${plan}

Additional Message:
${message || 'None'}

---
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
    });
  } catch (error) {
    console.error("Membership inquiry error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send inquiry. Please try again later.",
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
  });
});

app.use("/api", router);

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Gold's Gym API",
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Gold's Gym API server listening on port ${PORT}`);
});
