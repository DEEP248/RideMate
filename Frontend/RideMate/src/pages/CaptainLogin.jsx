import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import { toast } from "react-toastify"; // ✅ ADD THIS

const CaptainLogin = () => {
  // ----------------------------------------------------
  // Local form state
  // ----------------------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Refs for auto-focus behavior
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  // ----------------------------------------------------
  // Client-side validation
  // ----------------------------------------------------
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email address";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    // Autofocus invalid field
    if (newErrors.email) emailRef.current?.focus();
    else if (newErrors.password) passRef.current?.focus();

    return Object.keys(newErrors).length === 0;
  };

  // ----------------------------------------------------
  // Submit handler
  // ----------------------------------------------------
  const submitHandler = async (e) => {
    e.preventDefault();

    // Local validation first
    if (!validateForm()) {
      toast.error("⚠️ Invalid input detected. Please review and retry.", {
        autoClose: 1000,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        { email, password },
        {
          validateStatus: () => true, // prevents axios console noise
        }
      );

      // SUCCESS → Captain authenticated
      if (response.status === 200) {
        const data = response.data;

        setCaptain(data.captain);
        localStorage.setItem("token", data.token);

        toast.success("🚀 Login successful.", {
          autoClose: 1000,
        });

        navigate("/captain-home");
        return;
      }

      // VALIDATION ERRORS (array)
      if (response.data?.errors) {
        const apiErrors = {};

        response.data.errors.forEach((err) => {
          apiErrors[err.path] = err.msg;
        });

        setErrors(apiErrors);

        // Auto-focus first invalid field
        if (apiErrors.email) emailRef.current?.focus();
        else if (apiErrors.password) passRef.current?.focus();

        toast.error("⚠️ Invalid input detected. Please review and retry.", {
          autoClose: 1000,
        });

        return;
      }

      // GENERIC MESSAGE (invalid credentials)
      if (response.data?.message) {
        setErrors({ general: response.data.message });

        toast.error(`🔐 ${response.data.message}`, {
          autoClose: 1000,
        });

        return;
      }

      // Unexpected fallback
      toast.error("⚠️ Unexpected system error. Please try again.", {
        autoClose: 1000,
      });
    } catch (err) {
      toast.error("🌐 Network connectivity issue. Please retry.", {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-sm min-h-screen bg-white flex flex-col px-5 pb-6 pt-20">
        {/* Header */}
        <div className="absolute top-4 left-0 right-0 z-10 flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 object-contain"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Eow-IaJR9h3sS8PzlmT0lbb9TB4Ksqd8LA&s"
              alt="Logo"
            />
            <h1 className="text-base font-bold text-gray-900">RideMate</h1>
          </div>

          <span className="text-[11px] font-semibold bg-yellow-400 text-black px-3 py-1 rounded-full shadow-md">
            Captain Access
          </span>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-between mt-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Captain Login
            </h2>
            <p className="text-xs text-gray-500 italic mb-6">
              Log in to manage your daily office rides.
            </p>

            {/* Global backend error */}
            {errors.general && (
              <p className="text-red-600 text-xs mb-2">{errors.general}</p>
            )}

            <form className="space-y-5" onSubmit={submitHandler}>
              {/* Email */}
              <div>
                <h3 className="text-sm font-semibold mb-1">
                  What's your email?
                </h3>
                <input
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="captain@example.com"
                  className={`w-full rounded-xl border bg-[#f5f5f5] px-4 py-2.5 text-sm outline-none
                  ${errors.email ? "border-red-500" : "border-gray-300"}
                  focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200`}
                />

                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <h3 className="text-sm font-semibold mb-1">Enter password</h3>

                <div className="relative">
                  <input
                    ref={passRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full rounded-xl border bg-[#f5f5f5] px-4 py-2.5 text-sm outline-none
                    ${errors.password ? "border-red-500" : "border-gray-300"}
                    focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200`}
                  />

                  {/* Show/Hide toggle */}
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-xs font-semibold text-gray-700 cursor-pointer"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`group relative mt-2 flex items-center justify-center w-full 
                py-3 rounded-xl text-sm font-semibold overflow-hidden shadow-md
                ${
                  loading ? "bg-gray-300 text-gray-600" : "bg-black text-white"
                }`}
              >
                {/* Shimmer loader */}
                {loading && (
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></span>
                )}

                <span className="relative z-10 tracking-[0.25em] uppercase">
                  {loading ? "Processing..." : "Login"}
                </span>
              </button>
            </form>

            {/* Signup link */}
            <p className="mt-4 text-center text-xs text-gray-600">
              Want to join RideMate?{" "}
              <Link
                to="/captain-signup"
                className="font-semibold text-gray-900 underline"
              >
                Register as Captain
              </Link>
            </p>
          </div>

          {/* Switch to user login */}
          <div className="mt-6">
            <Link
              to="/login"
              className="w-full py-2.5 rounded-xl text-sm font-semibold 
              border border-gray-300 flex items-center justify-center
              text-black bg-yellow-400 hover:bg-black hover:text-yellow-400 hover:border-black transition-all"
            >
              Sign in as User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
