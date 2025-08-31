# Gold's Gym Website

A modern, responsive gym website built with React and Node.js featuring class booking, membership management, and admin dashboard.

## 🌟 Features

### Frontend
- **Responsive Design** - Works on all devices
- **Interactive Components** - Class booking, progress tracking, BMI calculator
- **Modern UI** - Smooth animations and professional design
- **Admin Panel** - Real-time statistics and data management

### Backend
- **MongoDB Database** - Persistent data storage
- **Email Notifications** - Automated email system
- **RESTful API** - Clean, documented endpoints
- **Admin Dashboard** - Business analytics and insights

## 🚀 Live Demo

**Website:** https://pundir8372.github.io/Gym_Website/
**Admin Panel:** https://pundir8372.github.io/Gym_Website/admin
**Admin Password:** `goldsgym2024`

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router
- React Toastify
- Vite
- CSS3 with animations

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Nodemailer
- JWT Authentication

## 📦 Installation

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm start
```

## 🔧 Configuration

### Environment Variables
Create `backend/config.env`:
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/goldsgym
SMTP_HOST=smtp.gmail.com
SMTP_SERVICE=gmail
SMTP_PORT=465
SMTP_MAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@goldsgym.com
JWT_SECRET=your-jwt-secret
```

## 📱 Features Overview

### For Members
- **Class Booking** - Reserve spots in fitness classes
- **Membership Plans** - Compare and inquire about plans
- **Progress Tracking** - Set and monitor fitness goals
- **BMI Calculator** - Health assessment tool
- **Nutrition Tracker** - Personalized nutrition planning

### For Gym Owners
- **Admin Dashboard** - Business analytics
- **Member Management** - Track inquiries and bookings
- **Email Notifications** - Automated communication
- **Data Analytics** - Usage statistics and trends

## 🚀 Deployment

### GitHub Pages (Frontend)
```bash
cd frontend
npm run deploy
```

### Backend Deployment
Deploy to Heroku, Railway, or any Node.js hosting service.

## 📊 Admin Panel

Access the admin panel at `/admin` with password: `goldsgym2024`

Features:
- Real-time statistics
- Recent bookings and inquiries
- Member data management
- Business analytics

## 🔐 Security Features

- Input validation
- Rate limiting
- Secure password handling
- Environment variable protection

## 📞 Support

For support or customization requests, contact the development team.

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ for Gold's Gym**
