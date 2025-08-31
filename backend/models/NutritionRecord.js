import mongoose from "mongoose";

const nutritionRecordSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  activity: {
    type: String,
    required: true,
    enum: ['sedentary', 'light', 'moderate', 'active', 'very_active']
  },
  goal: {
    type: String,
    required: true,
    enum: ['lose', 'maintain', 'gain']
  },
  results: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    bmr: Number
  },
  email: {
    type: String,
    default: 'anonymous'
  }
}, {
  timestamps: true
});

export default mongoose.model('NutritionRecord', nutritionRecordSchema);
