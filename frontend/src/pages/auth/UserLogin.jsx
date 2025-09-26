import { useRef, useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const UserLogin = () => {

  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!emailRef.current?.value || !passwordRef.current?.value) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }

    const userData = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    try {
      const response = await loginUser(userData);
      setUser(response.data.user)
      toast.success("Login Successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl heading-elegant text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 font-poppins">Sign in to your <span className="brand-text text-xl">FoodHub</span> account</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                ref={emailRef}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                ref={passwordRef}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label className="ml-2 text-sm text-gray-600">Remember me</label>
            </div>
            <a href="#" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
              Forgot password?
            </a>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105"
          >
            { loading ? "Signing In..." : "Sign In"}
          </button>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a
              href="/user/register"
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
