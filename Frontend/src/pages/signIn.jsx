import { useState } from "react";
import { signinRequestApi } from "../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  const sendOtp = async () => {
    const email = form.email.trim();
    const password = form.password.trim();

    if (!email || !password) {
      return toast.error("Email & Password are required");
    }

    // Optional Email Validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      return toast.error("Enter a valid email");
    }

    const res = await signinRequestApi({ email, password });

    if (res?.success === true || res?.message === "OTP sent to your email") {
      toast.success("OTP Sent! Check your email 🎉");
      navigate("/otp-verify", { state: { email } });
    } else {
      toast.error(res?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#FFEDFA]/80">

      <div className="bg-white shadow-xl rounded-2xl px-8 py-14 w-[90%] max-w-md border border-[#FFB8E0]">
        
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-[#EC7FA9] flex items-center justify-center text-white text-xl shadow-md">
            📖
          </div>
          <h1 className="text-2xl font-bold text-[#BE5985] mt-3">Blogosphere</h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to continue to your account
          </p>
        </div>

        {/* Email */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full p-3 border border-[#FFB8E0] rounded-lg focus:ring-2 focus:ring-[#EC7FA9] outline-none transition"
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full p-3 border border-[#FFB8E0] rounded-lg focus:ring-2 focus:ring-[#EC7FA9] outline-none transition"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-4 cursor-pointer text-[#BE5985] text-1xl select-none"
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={sendOtp}
          className="mt-6 w-full py-3 bg-[#BE5985] text-white rounded-lg font-semibold shadow-md hover:bg-[#A0436F] transition"
        >
          Sign In
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#BE5985] font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
