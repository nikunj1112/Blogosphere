import User from "../models/authModel.js";
import Otp from "../models/otpModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../services/service.js";


// ================= SIGNUP =================
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({ message: "Signup successful" });

  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// ================= DIRECT SIGNIN (OPTIONAL) =================
export const signIn = async (req, res) => {
  return res.status(400).json({
    message: "Use /signin-request for OTP login"
  });
};


// ================= SIGNIN REQUEST (SEND OTP) =================
export const signinRequest = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ message: "Email & Password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Incorrect Password" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiry = new Date(Date.now() + 3 * 60 * 1000);

    await Otp.deleteMany({ email });
    await Otp.create({ email, otp, expiry });

    await sendOtpEmail(email, otp);

    return res.status(200).json({ message: "OTP sent to your email" });

  } catch (err) {
    return res.status(500).json({ message: "Signin failed", error: err.message });
  }
};


// ================= SIGNIN VERIFY (OTP LOGIN) =================
export const signinVerify = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = await Otp.findOne({ email, otp });

    if (!record)
      return res.status(400).json({ message: "Invalid OTP" });

    if (record.expiry < new Date()) {
      await Otp.deleteMany({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    await Otp.deleteMany({ email });

    const user = await User.findOne({ email });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({ message: "Signin successful" });

  } catch (err) {
    return res.status(500).json({ message: "OTP verification failed", error: err.message });
  }
};


// ================= SIGNOUT =================
export const signOut = async (req, res) => {
  try {
    res.clearCookie("auth_token");
    return res.status(200).json({ message: "Signout successful" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};


// ================= GET PROFILE =================
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};
