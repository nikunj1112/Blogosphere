import express from 'express';
import {
  signUp,
  signIn,
  signinRequest,
  signinVerify,
  signOut,
  getUserProfile
} from '../controllers/authController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// USER AUTH ROUTES
router.post('/signup', signUp);                      // Normal Signup
router.post('/signin', signIn);                      // OPTIONAL Direct Login (not used)
router.post('/signin-request', signinRequest);       // Email + Password -> OTP send
router.post('/signin-verify', signinVerify);         // OTP Verification -> Login Cookie

// PROTECTED ROUTES
router.post('/signout', authMiddleware, signOut);    // Logout
router.get('/profile', authMiddleware, getUserProfile);  // Get Logged In User

export default router;
