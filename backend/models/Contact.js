import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'responded', 'resolved'],
    default: 'pending'
  },
  type: {
    type: String,
    enum: ['general', 'complaint', 'suggestion', 'support'],
    default: 'general'
  }
}, {
  timestamps: true
});

export default mongoose.model('Contact', contactSchema);
