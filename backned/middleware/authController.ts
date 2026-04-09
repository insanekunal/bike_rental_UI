import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Otp from "../models/Otp";
import { generateOtp } from "../utils/generateOtp";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

// Request OTP
export const requestOtp = async (req: Request, res: Response) => {
  const { phone } = req.body;
  if (!phone || phone.length !== 10) {
    return res.status(400).json({ success: false, message: "Invalid phone number" });
  }

  const otp = generateOtp();
  await Otp.deleteMany({ phone });
  await Otp.create({ phone, otp });

  // TODO: integrate SMS provider
  console.log(`Sending OTP ${otp} to +91${phone}`);

  return res.json({ success: true, message: "OTP sent successfully" });
};

// Verify OTP
export const verifyOtp = async (req: Request, res: Response) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ success: false, message: "Phone and OTP required" });
  }

  const otpDoc = await Otp.findOne({ phone, otp });
  if (!otpDoc) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }

  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({ phone });
  }

  const token = jwt.sign({ id: user._id, phone: user.phone }, JWT_SECRET, { expiresIn: "7d" });

  await Otp.deleteMany({ phone });

  return res.json({ success: true, user, token });
};
