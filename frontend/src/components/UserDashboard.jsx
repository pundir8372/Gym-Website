import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { apiCall, API_ENDPOINTS } from '../config/api';

const UserDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userStats, setUserStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await apiCall(API_ENDPOINTS.USER_DASHBOARD, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.success) {
        setUserStats(response.stats);
        setBookings(response.bookings || []);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
    toast.success('Logged out successfully');
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <section className="user-dashboard section">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h2>Welcome back, {user.name}!</h2>
            <p>Manage your fitness journey</p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            My Bookings
          </button>
          <button 
            className={`tab-btn ${activeTab === 'membership' ? 'active' : ''}`}
            onClick={() => setActiveTab('membership')}
          >
            Membership
          </button>
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Bookings</h3>
                  <div className="stat-number">{userStats?.totalBookings || 0}</div>
                </div>
                <div className="stat-card">
                  <h3>BMI Calculations</h3>
                  <div className="stat-number">{userStats?.bmiCalculations || 0}</div>
                </div>
                <div className="stat-card">
                  <h3>Nutrition Plans</h3>
                  <div className="stat-number">{userStats?.nutritionPlans || 0}</div>
                </div>
                <div className="stat-card">
                  <h3>Member Since</h3>
                  <div className="stat-text">{new Date(user.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bookings-section">
              <h3>Your Class Bookings</h3>
              {bookings.length > 0 ? (
                <div className="bookings-list">
                  {bookings.map((booking, index) => (
                    <div key={index} className="booking-card">
                      <h4>{booking.className}</h4>
                      <p><strong>Date:</strong> {booking.day}</p>
                      <p><strong>Time:</strong> {booking.time}</p>
                      <p><strong>Trainer:</strong> {booking.trainer || 'TBD'}</p>
                      <span className="booking-status confirmed">Confirmed</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No bookings yet. <a href="#classes">Book a class</a> to get started!</p>
              )}
            </div>
          )}

          {activeTab === 'membership' && (
            <div className="membership-section">
              <h3>Membership Status</h3>
              <div className="membership-card">
                <h4>Current Plan: Free Member</h4>
                <p>Upgrade to premium for exclusive benefits!</p>
                <button className="btn btn-primary" onClick={() => document.getElementById('membership').scrollIntoView({behavior: 'smooth'})}>
                  Upgrade Membership
                </button>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile-section">
              <h3>Profile Information</h3>
              <div className="profile-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
