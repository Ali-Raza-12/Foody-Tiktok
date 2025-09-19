import React, {useRef, useState} from "react";
import { Mail, Lock, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginPartner } from "../../services/authService";

const PartnerLogin = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!emailRef.current?.value || !passwordRef.current?.value) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    const partnerData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await loginPartner(partnerData);
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Partner Portal
          </h2>
          <p className="text-gray-600">Sign in to manage your restaurant</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                ref={emailRef}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your business email"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have a partner account?{" "}
            <a
              href="/food-partner/register"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Become a partner
            </a>
          </p>
        </div>

        {/* Customer Login Link */}
        <div className="mt-6 text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Are you a customer?
            <a
              href="/user/login"
              className="ml-1 text-blue-500 hover:text-blue-600 font-medium"
            >
              Customer Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;
