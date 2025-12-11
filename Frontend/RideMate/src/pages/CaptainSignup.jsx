import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import { toast } from "react-toastify"; // ✅ ADD THIS

const CaptainSignup = () => {
  // ------------------------------
  // Local state
  // ------------------------------
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Vehicle
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  // UI/UX state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Refs for autofocus
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const colorRef = useRef(null);
  const plateRef = useRef(null);
  const capacityRef = useRef(null);
  const typeRef = useRef(null);

  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  // ------------------------------
  // Validation Logic
  // ------------------------------
  const validateForm = () => {
    const newErr = {};

    if (!firstName.trim() || firstName.length < 3)
      newErr.firstName = "First name must be at least 3 characters";

    if (!lastName.trim() || lastName.length < 3)
      newErr.lastName = "Last name must be at least 3 characters";

    if (!email.trim()) newErr.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErr.email = "Enter a valid email";

    if (!password.trim() || password.length < 6)
      newErr.password = "Password must be at least 6 characters";

    if (!vehicleColor.trim() || vehicleColor.length < 3)
      newErr.vehicleColor = "Color must be at least 3 characters";

    if (!vehiclePlate.trim() || vehiclePlate.length < 3)
      newErr.vehiclePlate = "Plate must be at least 3 characters";

    if (!vehicleCapacity || vehicleCapacity < 1)
      newErr.vehicleCapacity = "Capacity must be at least 1";

    if (!vehicleType) newErr.vehicleType = "Please select a valid vehicle type";

    setErrors(newErr);

    // Auto focus first error
    if (newErr.firstName) return firstRef.current?.focus();
    if (newErr.lastName) return lastRef.current?.focus();
    if (newErr.email) return emailRef.current?.focus();
    if (newErr.password) return passRef.current?.focus();
    if (newErr.vehicleColor) return colorRef.current?.focus();
    if (newErr.vehiclePlate) return plateRef.current?.focus();
    if (newErr.vehicleCapacity) return capacityRef.current?.focus();
    if (newErr.vehicleType) return typeRef.current?.focus();

    return Object.keys(newErr).length === 0;
  };

  // ------------------------------
  // Submit handler
  // ------------------------------
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
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType,
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        payload,
        {
          validateStatus: () => true, // clean axios behavior
        }
      );

      // -----------------------------
      // SUCCESS — Captain created
      // -----------------------------
      if (response.status === 201) {
        const data = response.data;

        setCaptain(data.captain);
        localStorage.setItem("token", data.token);

        toast.success("🛞 Captain onboarding completed. Welcome aboard!", {
          autoClose: 1000,
        });

        navigate("/captain-home");
        return;
      }

      // -----------------------------
      // BACKEND FIELD VALIDATION
      // -----------------------------
      if (response.data?.errors) {
        const apiErr = {};

        response.data.errors.forEach((err) => {
          const key = err.path.includes(".")
            ? err.path.split(".").pop()
            : err.path;
          apiErr[key] = err.msg;
        });

        setErrors(apiErr);

        // Autofocus priority field
        if (apiErr.firstName) firstRef.current?.focus();
        else if (apiErr.lastName) lastRef.current?.focus();
        else if (apiErr.email) emailRef.current?.focus();
        else if (apiErr.password) passRef.current?.focus();
        else if (apiErr.vehicleColor) colorRef.current?.focus();
        else if (apiErr.vehiclePlate) plateRef.current?.focus();
        else if (apiErr.vehicleCapacity) capacityRef.current?.focus();
        else if (apiErr.vehicleType) typeRef.current?.focus();

        toast.error("⚠️ Invalid input detected. Please review and retry.", {
          autoClose: 1000,
        });

        return;
      }

      // -----------------------------
      // GENERAL SERVER MESSAGE
      // -----------------------------
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
            Captain Access
          </span>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-between mt-2">
          {/* Global error */}
          {errors.general && (
            <p className="text-red-600 text-xs mb-2">{errors.general}</p>
          )}
          <h2 className="text-2xl font-bold text-gray-900">
            Become a RideMate Captain
          </h2>
          <p className="text-xs text-gray-500 italic mb-2">
            Create your account and start offering seats on your daily route.
          </p>

          <form className="space-y-4" onSubmit={submitHandler}>
            {/* ----------------- NAME ----------------- */}
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
                  ref={lastRef}
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

            {/* ----------------- EMAIL ----------------- */}
            <div>
              <h3 className="text-sm font-semibold mb-1">Your email</h3>
              <input
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="captain@example.com"
                className={`w-full rounded-xl border px-4 py-2 
                ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } bg-[#f5f5f5]`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* ----------------- PASSWORD ----------------- */}
            <div>
              <h3 className="text-sm font-semibold mb-1">Create password</h3>
              <div className="relative">
                <input
                  ref={passRef}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full rounded-xl border px-4 py-2 
                  ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } bg-[#f5f5f5]`}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-xs font-semibold cursor-pointer text-gray-800"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* ----------------- VEHICLE ----------------- */}
            <h3 className="text-sm font-semibold mb-1">Vehicle Information</h3>

            {/* Color + Plate */}
            <div className="flex gap-3 mb-3">
              <input
                ref={colorRef}
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                type="text"
                placeholder="Vehicle color"
                className={`w-1/2 rounded-xl border px-4 py-2 
                ${
                  errors.vehicleColor ? "border-red-500" : "border-gray-300"
                } bg-[#f5f5f5]`}
              />
              <input
                ref={plateRef}
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                type="text"
                placeholder="Vehicle plate"
                className={`w-1/2 rounded-xl border px-4 py-2 
                ${
                  errors.vehiclePlate ? "border-red-500" : "border-gray-300"
                } bg-[#f5f5f5]`}
              />
            </div>

            {errors.vehicleColor && (
              <p className="text-red-500 text-xs">{errors.vehicleColor}</p>
            )}
            {errors.vehiclePlate && (
              <p className="text-red-500 text-xs">{errors.vehiclePlate}</p>
            )}

            {/* Capacity + Type */}
            <div className="flex gap-3 mb-4">
              <input
                ref={capacityRef}
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                type="number"
                placeholder="Capacity"
                className={`w-1/2 rounded-xl border px-4 py-2 
                ${
                  errors.vehicleCapacity ? "border-red-500" : "border-gray-300"
                } bg-[#f5f5f5]`}
              />

              <select
                ref={typeRef}
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className={`w-1/2 rounded-xl border px-4 py-2 text-gray-700 
                ${
                  errors.vehicleType ? "border-red-500" : "border-gray-300"
                } bg-[#f5f5f5]`}
              >
                <option value="" disabled>
                  Vehicle type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
            </div>

            {errors.vehicleCapacity && (
              <p className="text-red-500 text-xs">{errors.vehicleCapacity}</p>
            )}
            {errors.vehicleType && (
              <p className="text-red-500 text-xs">{errors.vehicleType}</p>
            )}

            {/* ----------------- SUBMIT BUTTON ----------------- */}
            <button
              type="submit"
              disabled={loading}
              className={`group relative flex items-center justify-center w-full 
              py-3 rounded-xl text-sm font-semibold overflow-hidden shadow-md
              ${loading ? "bg-gray-300 text-gray-500" : "bg-black text-white"}`}
            >
              {loading && (
                <span
                  className="absolute inset-0 bg-gradient-to-r 
                from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                ></span>
              )}

              <span className="relative z-10 tracking-[0.25em] uppercase">
                {loading ? "Processing..." : "Create Account"}
              </span>
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs mt-3">
            Already a captain?{" "}
            <Link to="/captain-login" className="underline font-semibold">
              Login Here
            </Link>
          </p>

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

export default CaptainSignup;
