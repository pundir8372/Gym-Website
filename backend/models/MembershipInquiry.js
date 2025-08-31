import mongoose from "mongoose";

const membershipInquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    default: ''
  },
  plan: {
    type: String,
    required: true,
    enum: ['Basic', 'Premium', 'Elite']
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'converted', 'declined'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export default mongoose.model('MembershipInquiry', membershipInquirySchema);
