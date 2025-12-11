import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignup = () => {
  // ----------------------------------------------------
  // Local state for captain registration input fields
  // ----------------------------------------------------
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Vehicle-related fields
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  // ----------------------------------------------------
  // Submit handler: Register captain → Save user → Redirect
  // ----------------------------------------------------
  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    // Reset all fields after submit
    setfirstName("");
    setlastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    // Global shell for mobile-size screen (same across RideMate)
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-sm min-h-screen bg-white flex flex-col px-5 pb-6 pt-20">

        {/* ----------------------------------------------------
            Header: Brand identity (consistent across all pages)
           ---------------------------------------------------- */}
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

        {/* ----------------------------------------------------
            Main content: Form + Footer 
            Reduced spacing to avoid scrollbar on mobile
           ---------------------------------------------------- */}
        <div className="flex-1 flex flex-col justify-between mt-2">

          {/* ------------------ Form Block ------------------ */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Become a RideMate Captain
            </h2>

            <p className="text-xs text-gray-500 italic mb-4">
              Create your account and start offering seats on your daily route.
            </p>

            {/* Form container - compact spacing */}
            <form className="space-y-4" onSubmit={submitHandler}>

              {/* ------------------ Name Fields ------------------ */}
              <div>
                <h3 className="text-sm font-semibold mb-1">Your name</h3>

                <div className="flex gap-3 mb-3">
                  <input
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    type="text"
                    required
                    placeholder="First name"
                    className="w-1/2 rounded-xl border border-gray-300 bg-[#f5f5f5] 
                               px-4 py-2 text-sm outline-none placeholder:text-gray-400
                               focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                  />

                  <input
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    type="text"
                    required
                    placeholder="Last name"
                    className="w-1/2 rounded-xl border border-gray-300 bg-[#f5f5f5] 
                               px-4 py-2 text-sm outline-none placeholder:text-gray-400
                               focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                  />
                </div>
              </div>

              {/* ------------------ Email Field ------------------ */}
              <div>
                <h3 className="text-sm font-semibold mb-1">Your email</h3>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="captain@example.com"
                  className="w-full rounded-xl border border-gray-300 bg-[#f5f5f5] px-4 py-2 
                             text-sm outline-none placeholder:text-gray-400
                             focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                />
              </div>

              {/* ------------------ Password Field ------------------ */}
              <div>
                <h3 className="text-sm font-semibold mb-1">Create password</h3>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-300 bg-[#f5f5f5] px-4 py-2 
                             text-sm outline-none placeholder:text-gray-400
                             focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                />
              </div>

              {/* ----------------------------------------------------
                  Vehicle Information Section
                  Fully aligned + compact spacing
                 ---------------------------------------------------- */}
              <h3 className="text-sm font-semibold mb-1">Vehicle Information</h3>

              {/* Row 1: Color + Plate */}
              <div className="flex gap-3 mb-3">
                <input
                  required
                  type="text"
                  placeholder="Vehicle color"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  className="w-1/2 rounded-xl border border-gray-300 bg-[#f5f5f5] 
                             px-4 py-2 text-sm outline-none placeholder:text-gray-400
                             focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                />

                <input
                  required
                  type="text"
                  placeholder="Vehicle plate"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  className="w-1/2 rounded-xl border border-gray-300 bg-[#f5f5f5] 
                             px-4 py-2 text-sm outline-none placeholder:text-gray-400
                             focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                />
              </div>

              {/* Row 2: Capacity + Type */}
              <div className="flex gap-3 mb-4">
                <input
                  required
                  type="number"
                  placeholder="Capacity"
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  className="w-1/2 rounded-xl border border-gray-300 bg-[#f5f5f5] 
                             px-4 py-2 text-sm outline-none placeholder:text-gray-400
                             focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                />

                <select
                  required
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-1/2 rounded-xl border border-gray-300 bg-[#f5f5f5]
                             px-4 py-2 text-sm outline-none text-gray-700
                             focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                >
                  <option value="" disabled>
                    Vehicle type
                  </option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="moto">Motorcycle</option>
                </select>
              </div>

              {/* Primary CTA – Animated Black/Yellow Button */}
              <button
                type="submit"
                className="group relative flex items-center justify-center w-full 
                           bg-black text-white py-3 rounded-xl text-sm font-semibold 
                           overflow-hidden shadow-md cursor-pointer"
              >
                <span
                  className="absolute top-0 left-0 h-1/2 w-0 bg-yellow-400 
                             transition-all duration-300 ease-[cubic-bezier(.785,.135,.15,.86)]
                             group-hover:w-full"
                ></span>

                <span
                  className="absolute bottom-0 right-0 h-1/2 w-0 bg-yellow-400 
                             transition-all duration-300 ease-[cubic-bezier(.785,.135,.15,.86)]
                             group-hover:w-full"
                ></span>

                <span className="relative z-10 transition-colors duration-300 
                                 group-hover:text-black tracking-[0.25em] uppercase">
                  Create Account
                </span>
              </button>
            </form>

            {/* Switch to login */}
            <p className="mt-3 text-center text-xs text-gray-600">
              Already a captain?{" "}
              <Link
                to="/captain-login"
                className="font-semibold text-gray-900 underline"
              >
                Login Here
              </Link>
            </p>
          </div>

          {/* ------------------ Footer ------------------ */}
          <p className="text-[10px] leading-tight text-gray-500 mt-3 text-center">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service</span> apply.
          </p>

          <p className="text-[10px] mt-1 text-gray-400 text-center">
            © {new Date().getFullYear()} RideMate · Built by Deep Darji
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;