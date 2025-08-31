import React, { useState } from "react";
import { toast } from "react-toastify";

const ClassSchedule = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const schedule = {
    Monday: [
      { id: 1, time: "06:00", class: "Morning Yoga", trainer: "Sarah Johnson", spots: 5, duration: "60 min" },
      { id: 2, time: "08:00", class: "HIIT Training", trainer: "Mike Wilson", spots: 2, duration: "45 min" },
      { id: 3, time: "18:00", class: "Strength Training", trainer: "David Brown", spots: 8, duration: "90 min" }
    ],
    Tuesday: [
      { id: 4, time: "07:00", class: "Cardio Blast", trainer: "Emma Davis", spots: 3, duration: "45 min" },
      { id: 5, time: "12:00", class: "Pilates", trainer: "Sarah Johnson", spots: 6, duration: "60 min" },
      { id: 6, time: "19:00", class: "CrossFit", trainer: "Mike Wilson", spots: 1, duration: "60 min" }
    ],
    Wednesday: [
      { id: 7, time: "06:30", class: "Spin Class", trainer: "Lisa Garcia", spots: 4, duration: "45 min" },
      { id: 8, time: "17:30", class: "Boxing", trainer: "David Brown", spots: 7, duration: "60 min" },
      { id: 9, time: "20:00", class: "Zumba", trainer: "Emma Davis", spots: 10, duration: "45 min" }
    ],
    Thursday: [
      { id: 10, time: "06:00", class: "Morning Yoga", trainer: "Sarah Johnson", spots: 3, duration: "60 min" },
      { id: 11, time: "18:30", class: "Functional Training", trainer: "Mike Wilson", spots: 5, duration: "75 min" }
    ],
    Friday: [
      { id: 12, time: "07:00", class: "HIIT Training", trainer: "David Brown", spots: 4, duration: "45 min" },
      { id: 13, time: "19:00", class: "Dance Fitness", trainer: "Emma Davis", spots: 8, duration: "60 min" }
    ],
    Saturday: [
      { id: 14, time: "09:00", class: "Weekend Warrior", trainer: "Mike Wilson", spots: 6, duration: "90 min" },
      { id: 15, time: "11:00", class: "Family Yoga", trainer: "Sarah Johnson", spots: 12, duration: "45 min" }
    ],
    Sunday: [
      { id: 16, time: "10:00", class: "Recovery Yoga", trainer: "Sarah Johnson", spots: 8, duration: "75 min" },
      { id: 17, time: "16:00", class: "Sunday Strength", trainer: "David Brown", spots: 5, duration: "60 min" }
    ]
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleBookClass = (classItem) => {
    setSelectedClass(classItem);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/classes/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: bookingForm.name,
          email: bookingForm.email,
          phone: bookingForm.phone,
          className: selectedClass.class,
          day: selectedDay,
          time: selectedClass.time,
          trainer: selectedClass.trainer
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setShowBookingModal(false);
        setBookingForm({ name: "", email: "", phone: "" });
        setSelectedClass(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error("Booking failed. Please try again.");
    }
  };

  const closeModal = () => {
    setShowBookingModal(false);
    setSelectedClass(null);
    setBookingForm({ name: "", email: "", phone: "" });
  };

  return (
    <section className="class-schedule section" id="classes">
      <div className="container">
        <h2 className="section-title">Class Schedule</h2>
        <p className="section-subtitle">Book your spot in our expert-led fitness classes</p>
        
        <div className="schedule-nav">
          {days.map(day => (
            <button
              key={day}
              className={`day-btn ${selectedDay === day ? "active" : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>

        <div className="schedule-content">
          <h3 className="schedule-day">{selectedDay}</h3>
          <div className="classes-list">
            {schedule[selectedDay]?.map((classItem) => (
              <div key={classItem.id} className="class-item">
                <div className="class-time">{classItem.time}</div>
                <div className="class-details">
                  <h4>{classItem.class}</h4>
                  <p>with {classItem.trainer}</p>
                  <span className="class-duration">{classItem.duration}</span>
                  <span className="spots-left">{classItem.spots} spots left</span>
                </div>
                <button 
                  className="book-btn"
                  onClick={() => handleBookClass(classItem)}
                  disabled={classItem.spots === 0}
                >
                  {classItem.spots === 0 ? "Full" : "Book Now"}
                </button>
              </div>
            )) || <p className="no-classes">No classes scheduled for this day</p>}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Book Class</h3>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            
            <div className="class-booking-info">
              <h4>{selectedClass?.class}</h4>
              <p>{selectedDay} at {selectedClass?.time}</p>
              <p>Trainer: {selectedClass?.trainer}</p>
              <p>Duration: {selectedClass?.duration}</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="booking-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="modal-buttons">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
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
    </section>
  );
};

export default ClassSchedule;
