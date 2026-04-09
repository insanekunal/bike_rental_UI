import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/
  },
  name: {
    type: String,
    default: "New User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);
