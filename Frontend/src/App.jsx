import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";

import Home from "./pages/home.jsx";

import SignIn from "./pages/signIn.jsx";
import Signup from "./pages/Signup.jsx";
import OtpVerify from "./pages/otpVerify.jsx";
import CreateBlog from "./pages/createBlog.jsx";
import BlogDetails from "./pages/blogDetails.jsx";
import Profile from "./pages/profile.jsx";

import ProtectedRoute from "./components/protectedRoute.jsx";


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp-verify" element={<OtpVerify />} />

          {/* Protected Routes */}
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/blog/:id" element={<BlogDetails />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
