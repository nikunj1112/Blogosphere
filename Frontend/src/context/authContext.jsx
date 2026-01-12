import { createContext, useContext, useState, useEffect } from "react";
import { getProfileApi, signoutApi } from "../utils/api.js";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const res = await getProfileApi();

      if (res && res._id) {
        setUser(res);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
    setLoading(false);
  };

  const logout = async () => {
    try {
      await signoutApi();
      setUser(null);
    } catch (err) {
      console.log("Logout failed");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {/* FIX: Don't render children until auth check is done */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
