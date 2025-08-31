import mongoose from "mongoose";

const bmiRecordSchema = new mongoose.Schema({
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  bmi: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Underweight', 'Normal weight', 'Overweight', 'Obese']
  },
  email: {
    type: String,
    default: 'anonymous'
  }
}, {
  timestamps: true
});

export default mongoose.model('BMIRecord', bmiRecordSchema);
