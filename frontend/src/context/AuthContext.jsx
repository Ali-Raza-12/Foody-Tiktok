import { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile } from "../services/profileService";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await getUserProfile();
        setUser(profileRes.data);
      } catch (error) {
        setUser(null);
        toast.error(
          error.response?.data?.message || "Failed to load profile data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
