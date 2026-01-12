// import Otp from '../models/otpModel.js';
// import User from '../models/authModel.js';
// import bcrypt from 'bcrypt';
// import { sendOtpEmail } from '../services/service.js';

// // 🔹 STEP-1: SEND OTP for Signup
// export const sendOtp = async (req, res) => {
//     const { email } = req.body;

//     if (!email) return res.status(400).json({ message: "Email is required" });

//     // If email already exists → don't allow signup
//     const userExist = await User.findOne({ email });
//     if (userExist) {
//         return res.status(400).json({ message: "Email already registered" });
//     }

//     const otp = String(Math.floor(100000 + Math.random() * 900000));
//     const expiry = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes

//     try {
//         await Otp.deleteMany({ email });
//         await Otp.create({ email, otp, expiry });

//         const status = await sendOtpEmail(email, otp);

//         if (status) {
//             return res.status(200).json({ message: "OTP sent successfully" });
//         }

//         return res.status(500).json({ message: "Failed to send OTP email" });

//     } catch (error) {
//         return res.status(500).json({ message: "OTP generation failed", error: error.message });
//     }
// };


// // 🔹 STEP-2: VERIFY OTP + CREATE USER (Signup)
// export const VerifyOtp = async (req, res) => {
//     const { name, email, password, otp } = req.body;

//     if (!name || !email || !password || !otp) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     try {
//         const record = await Otp.findOne({ email, otp });

//         if (!record) {
//             return res.status(400).json({ message: "Invalid OTP" });
//         }

//         if (record.expiry < new Date()) {
//             await Otp.deleteMany({ email });
//             return res.status(400).json({ message: "OTP expired" });
//         }

//         // hash password
//         const hashedPassword = await bcrypt.hash(password, 12);

//         // Create user in DB
//         await User.create({
//             name,
//             email,
//             password: hashedPassword
//         });

//         // delete otp after use
//         await Otp.deleteMany({ email });

//         return res.status(200).json({ message: "Signup completed successfully" });

//     } catch (error) {
//         return res.status(500).json({ message: "Signup failed", error: error.message });
//     }
// };
