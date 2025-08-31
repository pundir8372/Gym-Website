import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config/api.js';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Simple password authentication (replace with proper auth in production)
  const ADMIN_PASSWORD = 'goldsgym2024';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchStats();
      toast.success('Welcome to Admin Panel');
    } else {
      toast.error('Invalid password');
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
      } else {
        toast.error('Failed to fetch statistics');
      }
    } catch (error) {
      toast.error('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setStats(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Gold's Gym - Admin Dashboard</h1>
        <button onClick={logout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      <div className="admin-tabs">
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
          Recent Bookings
        </button>
        <button 
          className={`tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
          onClick={() => setActiveTab('inquiries')}
        >
          Membership Inquiries
        </button>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="loading">Loading statistics...</div>
        ) : (
          <>
            {activeTab === 'overview' && stats && (
              <div className="overview-section">
                <div className="stats-grid">
                  <div className="stat-card">
                    <h3>Total Bookings</h3>
                    <div className="stat-number">{stats.totalBookings}</div>
                  </div>
                  <div className="stat-card">
                    <h3>Membership Inquiries</h3>
                    <div className="stat-number">{stats.totalInquiries}</div>
                  </div>
                  <div className="stat-card">
                    <h3>Contact Messages</h3>
                    <div className="stat-number">{stats.totalContacts}</div>
                  </div>
                  <div className="stat-card">
                    <h3>BMI Calculations</h3>
                    <div className="stat-number">{stats.totalBMICalculations}</div>
                  </div>
                  <div className="stat-card">
                    <h3>Nutrition Calculations</h3>
                    <div className="stat-number">{stats.totalNutritionCalculations}</div>
                  </div>
                </div>
                
                <button 
                  onClick={fetchStats} 
                  className="btn btn-primary refresh-btn"
                >
                  Refresh Data
                </button>
              </div>
            )}

            {activeTab === 'bookings' && stats && (
              <div className="bookings-section">
                <h3>Recent Class Bookings</h3>
                <div className="data-table">
                  {stats.recentBookings.length > 0 ? (
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Class</th>
                          <th>Day</th>
                          <th>Time</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentBookings.map((booking) => (
                          <tr key={booking._id}>
                            <td>{booking.name}</td>
                            <td>{booking.email}</td>
                            <td>{booking.className}</td>
                            <td>{booking.day}</td>
                            <td>{booking.time}</td>
                            <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No recent bookings</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'inquiries' && stats && (
              <div className="inquiries-section">
                <h3>Recent Membership Inquiries</h3>
                <div className="data-table">
                  {stats.recentInquiries.length > 0 ? (
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Plan</th>
                          <th>Phone</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentInquiries.map((inquiry) => (
                          <tr key={inquiry._id}>
                            <td>{inquiry.name}</td>
                            <td>{inquiry.email}</td>
                            <td>{inquiry.plan}</td>
                            <td>{inquiry.phone || 'N/A'}</td>
                            <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No recent inquiries</p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
