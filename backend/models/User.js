import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  membershipPlan: { type: String, enum: ['basic', 'premium', 'vip'], default: 'basic' },
  membershipStatus: { type: String, enum: ['active', 'inactive', 'expired'], default: 'inactive' },
  joinDate: { type: Date, default: Date.now },
  bmiHistory: [{
    bmi: Number,
    weight: Number,
    height: Number,
    date: { type: Date, default: Date.now }
  }],
  role: { type: String, enum: ['user', 'trainer', 'admin'], default: 'user' }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);
