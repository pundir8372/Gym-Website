// API Configuration for different environments
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:4000/api',
  },
  production: {
    baseURL: 'https://your-backend-url.herokuapp.com/api', // Replace with actual backend URL
  }
};

const environment = import.meta.env.MODE || 'development';
export const API_BASE_URL = API_CONFIG[environment].baseURL;

// API endpoints
export const API_ENDPOINTS = {
  CONTACT: '/send/mail',
  MEMBERSHIP: '/membership/inquiry',
  CLASS_BOOKING: '/classes/book',
  BMI_CALCULATE: '/bmi/calculate',
  NUTRITION_CALCULATE: '/nutrition/calculate',
  NEWSLETTER: '/newsletter/subscribe',
  ADMIN_STATS: '/admin/stats',
  HEALTH: '/health'
};

// API utility function
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.'
    };
  }
};
