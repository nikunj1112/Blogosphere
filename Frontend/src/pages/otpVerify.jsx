import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signinVerifyApi, signinRequestApi } from "../utils/api";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";

const OtpVerify = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;
  const { setUser } = useAuth();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // TIMER
  const [timer, setTimer] = useState(180); // 3 mins (in seconds)
  const [canResend, setCanResend] = useState(false);

  // TIMER COUNTDOWN
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // FORMAT TIMER (mm:ss)
  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // VERIFY OTP
  const verifyOtp = async () => {
    if (!otp) return toast.error("Enter OTP");
    if (otp.length !== 6) return toast.error("OTP must be 6 digits");

    setLoading(true);
    const res = await signinVerifyApi({ email, otp });
    setLoading(false);

    if (res?.success === true || res?.message === "Signin successful") {
      if (res?.user) setUser(res.user);

      toast.success("OTP Verified! 🎉");
      navigate("/");
    } else {
      toast.error(res?.message || "Invalid OTP");
    }
  };

  // RESEND OTP
  const resendOtp = async () => {
    const res = await signinRequestApi({ email });
    if (res?.success === true || res?.message === "OTP sent to your email") {
      toast.success("New OTP sent! 🔁");
      setTimer(180);
      setCanResend(false);
      setOtp("");
    } else {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#FFEDFA]/80 px-4">
      <div className="bg-white w-full max-w-md shadow-xl border border-[#FFB8E0] rounded-2xl p-8 text-center">

        {/* Logo */}
        <div className="mx-auto w-12 h-12 rounded-xl bg-[#EC7FA9] text-white flex items-center justify-center text-xl shadow-md">
          🔐
        </div>

        <h2 className="text-2xl font-bold text-[#BE5985] mt-3">
          Verify OTP
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          OTP sent to <span className="font-semibold text-[#BE5985]">{email}</span>
        </p>

        {/* OTP INPUT */}
        <input
          type="text"
          maxLength={6}
          value={otp}
          placeholder="• • • • • •"
          onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
          className="mt-6 w-full p-3 text-center tracking-[0.4em] text-xl font-semibold border border-[#FFB8E0] rounded-lg 
            focus:ring-2 focus:ring-[#EC7FA9] outline-none transition"
        />

        {/* VERIFY BUTTON */}
        <button
          onClick={verifyOtp}
          disabled={loading}
          className="mt-6 w-full py-3 bg-[#BE5985] text-white rounded-lg font-semibold shadow-md hover:bg-[#A0436F] transition disabled:bg-[#EC7FA9]"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* TIMER + RESEND */}
        <div className="mt-4 text-sm">
          {!canResend ? (
            <p className="text-gray-600">
              Resend OTP in <span className="font-semibold text-[#BE5985]">{formatTime(timer)}</span>
            </p>
          ) : (
            <button
              onClick={resendOtp}
              className="text-[#BE5985] font-semibold hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Back */}
        <p className="text-xs text-gray-600 mt-3">
          Wrong Email?{" "}
          <span
            className="text-[#BE5985] font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Go back
          </span>
        </p>
      </div>
    </div>
  );
};

export default OtpVerify;
