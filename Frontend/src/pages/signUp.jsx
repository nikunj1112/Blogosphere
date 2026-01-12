import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupApi } from "../utils/api.js";
import toast from "react-hot-toast";

export default function Signup() {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password || !form.confirm) {
      return toast.error("All fields are required");
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(form.email)) {
      return toast.error("Enter a valid Email");
    }

    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (form.password !== form.confirm) {
      return toast.error("Passwords do not match!");
    }

    setLoading(true);
    const res = await signupApi(form);
    setLoading(false);

    console.log("Signup Response:", res);

    // ----- SUCCESS CONDITIONS -----
    if (
      res?.success === true ||
      res?.message?.toLowerCase().includes("signup") ||
      res?.email
    ) {
      toast.success("Signup Successful 🎉 Redirecting...", { duration: 2000 });

      setTimeout(() => navigate("/signin"), 1200);
    } else {
      toast.error(res?.message || "Signup failed");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-[#FFEDFA]/80"
      onKeyDown={handleEnter}
    >
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 w-[90%] max-w-md border border-[#FFB8E0]">

        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#EC7FA9] flex items-center justify-center text-white text-xl shadow-md">
            📖
          </div>
          <h1 className="text-2xl font-bold text-[#BE5985] mt-3">Blogosphere</h1>
          <p className="text-gray-500 text-sm mt-1 text-center">
            Start your blogging journey today
          </p>
        </div>

        {/* FULL NAME */}
        <label className="text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1 mb-3 w-full p-3 border border-[#FFB8E0] rounded-lg focus:ring-2 focus:ring-[#EC7FA9] outline-none transition"
        />

        {/* EMAIL */}
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-1 mb-3 w-full p-3 border border-[#FFB8E0] rounded-lg focus:ring-2 focus:ring-[#EC7FA9] outline-none transition"
        />

        {/* PASSWORD */}
        <label className="text-sm font-medium text-gray-700">Password</label>
        <div className="relative mb-3">
          <input
            type={showPass ? "text" : "password"}
            placeholder="•••••••••"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 w-full p-3 border border-[#FFB8E0] rounded-lg focus:ring-2 focus:ring-[#EC7FA9] outline-none transition"
          />
          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-4 cursor-pointer text-[#BE5985] text-sm select-none"
          >
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="•••••••••"
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            className="mt-1 w-full p-3 border border-[#FFB8E0] rounded-lg focus:ring-2 focus:ring-[#EC7FA9] outline-none transition"
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-4 cursor-pointer text-[#BE5985] text-sm select-none"
          >
            {showConfirm ? "🙈" : "👁️"}
          </span>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full py-3 bg-[#BE5985] text-white rounded-lg font-semibold shadow-md hover:bg-[#A0436F] transition disabled:bg-[#EC7FA9]"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* FOOTER LINK */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-[#BE5985] font-semibold cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
