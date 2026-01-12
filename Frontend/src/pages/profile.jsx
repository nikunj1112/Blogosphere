import { useEffect, useState } from "react";
import { getProfileApi } from "../utils/api";
import { FiMail, FiUser, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getProfileApi();
    if (res?.email) setUser(res);
    else setUser(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#BE5985] text-lg">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-[#FFEDFA]/80 px-4 py-12 relative">

      {/* BACK BUTTON */}
      {/* <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 px-3 py-2 rounded-lg border border-[#FFB8E0] text-[#BE5985] bg-white shadow-sm hover:bg-[#FFEDFA] transition"
      >
        <FiArrowLeft size={18} />
        Back
      </button> */}

      <div className="w-full max-w-md mx-auto mt-28 bg-white/90 backdrop-blur-xl shadow-xl border border-[#FFB8E0] rounded-2xl p-8 text-center">

        {/* Avatar */}
        <div className="w-24 h-24 mx-auto rounded-full bg-[#EC7FA9] text-white flex items-center justify-center text-4xl shadow-md">
          {user.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold text-[#BE5985] mt-4">
          {user.name}
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Welcome to your profile dashboard!
        </p>

        {/* Info Card */}
        <div className="mt-6 space-y-3 text-left">

          <div className="flex items-center gap-3 p-3 border border-[#FFB8E0] rounded-lg bg-white shadow-sm">
            <FiUser className="text-[#BE5985]" size={18} />
            <span className="text-gray-700">{user.name}</span>
          </div>

          <div className="flex items-center gap-3 p-3 border border-[#FFB8E0] rounded-lg bg-white shadow-sm">
            <FiMail className="text-[#BE5985]" size={18} />
            <span className="text-gray-700">{user.email}</span>
          </div>

        </div>

      

      </div>
    </div>
  );
};

export default Profile;
