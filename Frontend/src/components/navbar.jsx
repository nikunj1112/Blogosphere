import { useAuth } from "../context/authContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-[#FFF7FB] border-b border-[#F2C8D8] shadow-sm font-playfair backdrop-blur-lg">
        
        <nav className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Blogos<span className="text-[#C05A82]">Phere</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium">

            {/* HOME LINK */}
            <Link to="/" className="hover:text-[#B1557F] transition">
              Home
            </Link>

            {!user ? (
              <>
                <Link to="/signin" className="hover:text-[#B1557F] transition">
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-1.5 rounded-lg text-white bg-gradient-to-r from-[#C05A82] to-[#9D4F73] hover:opacity-95 transition shadow-md"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/create" className="hover:text-[#B1557F] transition">
                  Write ✍️
                </Link>

                <Link
                  to="/profile"
                  className="px-4 py-1.5 rounded-lg border border-[#B1557F] text-[#B1557F] hover:bg-[#B1557F]/10 transition"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-1.5 rounded-lg text-white bg-gradient-to-r from-[#C05A82] to-[#9D4F73] hover:opacity-95 transition shadow-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="sm:hidden text-xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </nav>

        {/* MOBILE DROPDOWN */}
        {open && (
          <div className="sm:hidden px-5 py-4 border-t border-[#F2C8D8] bg-[#FFF7FB] flex flex-col gap-3 text-sm font-medium">

            {/* HOME MOBILE */}
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="hover:text-[#B1557F] transition"
            >
              Home
            </Link>

            {!user ? (
              <>
                <Link
                  to="/signin"
                  onClick={() => setOpen(false)}
                  className="hover:text-[#B1557F] transition"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg text-center text-white bg-gradient-to-r from-[#C05A82] to-[#9D4F73] hover:opacity-95 transition shadow-md"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/create"
                  onClick={() => setOpen(false)}
                  className="hover:text-[#B1557F] transition"
                >
                  Write ✍️
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#B1557F] text-[#B1557F] text-center hover:bg-[#B1557F]/10 transition"
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg text-center text-white bg-gradient-to-r from-[#C05A82] to-[#9D4F73] hover:opacity-95 transition shadow-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </header>

      {/* Prevent content getting hidden behind navbar */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
