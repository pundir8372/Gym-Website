import React, { useState } from "react";
import { toast } from "react-toastify";

const ClassSchedule = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const classes = [
    {
      id: 1,
      name: "HIIT Training",
      instructor: "Mike Johnson",
      time: "6:00 AM - 7:00 AM",
      days: "Mon, Wed, Fri",
      duration: "60 min",
      level: "Intermediate",
      spots: 12
    },
    {
      id: 2,
      name: "Yoga Flow",
      instructor: "Sarah Wilson",
      time: "7:30 AM - 8:30 AM",
      days: "Tue, Thu, Sat",
      duration: "60 min",
      level: "All Levels",
      spots: 15
    },
    {
      id: 3,
      name: "Strength Training",
      instructor: "David Brown",
      time: "6:00 PM - 7:00 PM",
      days: "Mon, Wed, Fri",
      duration: "60 min",
      level: "Beginner",
      spots: 10
    },
    {
      id: 4,
      name: "Cardio Blast",
      instructor: "Emma Davis",
      time: "7:00 PM - 8:00 PM",
      days: "Tue, Thu",
      duration: "60 min",
      level: "All Levels",
      spots: 20
    },
    {
      id: 5,
      name: "Pilates",
      instructor: "Lisa Garcia",
      time: "9:00 AM - 10:00 AM",
      days: "Mon, Wed, Fri",
      duration: "60 min",
      level: "Beginner",
      spots: 8
    },
    {
      id: 6,
      name: "CrossFit",
      instructor: "Tom Wilson",
      time: "5:30 PM - 6:30 PM",
      days: "Mon, Tue, Wed, Thu, Fri",
      duration: "60 min",
      level: "Advanced",
      spots: 6
    }
  ];

  const handleBookClass = (classItem) => {
    setSelectedClass(classItem);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.email || !bookingData.phone) {
      toast.error("Please fill all fields");
      return;
    }
    
    toast.success(`Successfully booked ${selectedClass.name}! We'll contact you soon.`);
    setSelectedClass(null);
    setBookingData({ name: "", email: "", phone: "" });
  };

  const closeBooking = () => {
    setSelectedClass(null);
    setBookingData({ name: "", email: "", phone: "" });
  };

  return (
    <section id="classes" className="section class-schedule">
      <div className="container">
        <h2 className="section-title">Class Schedule</h2>
        <p className="section-subtitle">
          Join our expert-led fitness classes designed for all fitness levels
        </p>

        <div className="schedule-grid">
          {classes.map((classItem) => (
            <div key={classItem.id} className="class-card">
              <div className="class-header">
                <h3>{classItem.name}</h3>
                <span className={`level-badge ${classItem.level.toLowerCase().replace(' ', '-')}`}>
                  {classItem.level}
                </span>
              </div>
              
              <div className="class-details">
                <div className="detail-item">
                  <i className="fas fa-user"></i>
                  <span>{classItem.instructor}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-clock"></i>
                  <span>{classItem.time}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-calendar"></i>
                  <span>{classItem.days}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-hourglass-half"></i>
                  <span>{classItem.duration}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-users"></i>
                  <span>{classItem.spots} spots available</span>
                </div>
              </div>

              <button 
                className="btn btn-primary"
                onClick={() => handleBookClass(classItem)}
              >
                Book This Class
              </button>
            </div>
          ))}
        </div>

        {selectedClass && (
          <div className="booking-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Book {selectedClass.name}</h3>
                <button className="close-modal" onClick={closeBooking}>×</button>
              </div>
              
              <div className="class-summary">
                <p><strong>Instructor:</strong> {selectedClass.instructor}</p>
                <p><strong>Time:</strong> {selectedClass.time}</p>
                <p><strong>Days:</strong> {selectedClass.days}</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="booking-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={closeBooking}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClassSchedule;
