import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  otp: {
    type: String,
    required: true,
    match: /^[0-9]{6}$/
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // auto-delete after 5 minutes
  }
});

export default mongoose.model("Otp", otpSchema);
