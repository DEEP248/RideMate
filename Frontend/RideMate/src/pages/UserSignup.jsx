import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { toast } from "react-toastify"; // ✅ ADD THIS

const UserSignup = () => {
  // -----------------------------------------
  // Form States
  // -----------------------------------------
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Refs for auto-focus
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  // -----------------------------------------
  // Client-side validation
  // -----------------------------------------
  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim() || firstName.length < 3)
      newErrors.firstName = "First name must be at least 3 characters";

    if (!lastName.trim() || lastName.length < 3)
      newErrors.lastName = "Last name must be at least 3 characters";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email address";

    if (!password.trim() || password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    // Auto-focus first invalid field
    if (newErrors.firstName) firstRef.current?.focus();
    else if (newErrors.lastName) lastRef.current?.focus();
    else if (newErrors.email) emailRef.current?.focus();
    else if (newErrors.password) passRef.current?.focus();

    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------------------
  // Submit Handler
  // -----------------------------------------
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("⚠️ Invalid input detected. Please review and retry.", {
        autoClose: 1000,
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullname: { firstname: firstName, lastname: lastName },
        email,
        password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        payload,
        {
          validateStatus: () => true, // prevents axios throwing noise
        }
      );

      // -----------------------------
      // SUCCESS — Account created
      // -----------------------------
      if (response.status === 201) {
        const data = response.data;

        setUser(data.user);
        localStorage.setItem("token", data.token);

        toast.success("🚀 Your Account created successfully.", {
          autoClose: 1000,
        });

        navigate("/home");
        return;
      }

      // -----------------------------
      // BACKEND FIELD ERRORS (ARRAY)
      // -----------------------------
      if (response.data?.errors) {
        const apiErrors = {};

        response.data.errors.forEach((err) => {
          const key = err.path?.includes(".")
            ? err.path.split(".").pop()
            : err.path;
          apiErrors[key] = err.msg;
        });

        setErrors(apiErrors);

        toast.error("⚠️ Invalid input detected. Please review and retry.", {
          autoClose: 1000,
        });

        // Autofocus sequence
        if (apiErrors.firstName) firstRef.current?.focus();
        else if (apiErrors.lastName) lastRef.current?.focus();
        else if (apiErrors.email) emailRef.current?.focus();
        else if (apiErrors.password) passRef.current?.focus();

        return;
      }

      // -----------------------------
      // SIMPLE BACKEND MESSAGE (Email exists, etc.)
      // -----------------------------
      if (response.data?.message) {
        setErrors({ general: response.data.message });

        toast.error(`🔐 ${response.data.message}`, {
          autoClose: 1000,
        });

        return;
      }

      // -----------------------------
      // UNKNOWN FAILURE
      // -----------------------------
      toast.error("⚠️ Unexpected system error. Please try again.", {
        autoClose: 1000,
      });
    } catch (err) {
      toast.error("🌐 Network issue detected. Please retry.", {
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
            Office Commute
          </span>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-between mt-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Create your RideMate account
            </h2>
            <p className="text-xs text-gray-500 italic mb-6">
              Join RideMate and start sharing your daily office commute.
            </p>

            {/* Global backend error */}
            {errors.general && (
              <p className="text-red-600 text-xs mb-2">{errors.general}</p>
            )}

            <form className="space-y-5" onSubmit={submitHandler}>
              {/* Name Fields */}
              <div>
                <h3 className="text-sm font-semibold mb-1">Your name</h3>

                <div className="flex gap-3 mb-3">
                  <input
                    ref={firstRef}
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    type="text"
                    placeholder="First name"
                    className={`w-1/2 rounded-xl border px-4 py-2 
                  ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } bg-[#f5f5f5]`}
                  />
                  <input
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    type="text"
                    placeholder="Last name"
                    className={`w-1/2 rounded-xl border px-4 py-2 
                  ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } bg-[#f5f5f5]`}
                  />
                </div>

                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <h3 className="text-sm font-semibold mb-1">Your email</h3>
                <input
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
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
                <h3 className="text-sm font-semibold mb-1">Create password</h3>

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

                  {/* Show/Hide Toggle */}
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
                className={`group relative mt-2 flex items-center justify-center w-full py-3 rounded-xl text-sm font-semibold overflow-hidden shadow-md
                ${
                  loading ? "bg-gray-300 text-gray-600" : "bg-black text-white"
                }`}
              >
                {/* Shimmer Loading */}
                {loading && (
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></span>
                )}

                <span className="relative z-10 tracking-[0.25em] uppercase">
                  {loading ? "Processing..." : "Create Account"}
                </span>
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-gray-900 underline"
              >
                Login Here
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-[10px] leading-tight text-gray-500 mt-4 text-center">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service</span> apply.
          </p>

          <p className="text-[10px] mt-2 text-gray-400 text-center">
            © {new Date().getFullYear()} RideMate · Built by Deep Darji
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
