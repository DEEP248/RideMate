import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { useContext } from "react";

const UserSignup = () => {
  // ------------------------------
  // Local signup state
  // ------------------------------
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // ------------------------------
  // Handle signup submit
  // ------------------------------
  const { user, setUser } = useContext(UserDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    // Reset fields (UX clean-up)
    setfirstName("");
    setlastName("");
    setEmail("");
    setPassword("");
  };

  return (
    // Matching full-screen RideMate layout
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      {/* Phone-size card */}
      <div className="relative w-full max-w-sm min-h-screen bg-white flex flex-col px-5 pb-6 pt-20">
        {/* Header (same across all screens) */}
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

        {/* Main block */}
        <div className="flex-1 flex flex-col justify-between mt-4">
          {/* Signup form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Create your RideMate account
            </h2>
            <p className="text-xs text-gray-500 italic mb-6">
              Join RideMate and start sharing your daily office commute.
            </p>

            <form className="space-y-5" onSubmit={submitHandler}>
              {/* Name fields */}
              <div>
                <h3 className="text-sm font-semibold mb-1">Your name</h3>

                <div className="flex gap-4 mb-5">
                  {/* First Name */}
                  <input
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    type="text"
                    required
                    placeholder="First name"
                    className="w-1/2 rounded-xl border border-gray-300 bg-[#f5f5f5] px-4 py-2.5 
                               text-sm outline-none placeholder:text-gray-400
                               focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                  />

                  {/* Last Name */}
                  <input
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    type="text"
                    required
                    placeholder="Last name"
                    className="w-1/2 rounded-xl border border-gray-300 bg-[#f5f5f5] px-4 py-2.5 
                               text-sm outline-none placeholder:text-gray-400
                               focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                  />
                </div>
              </div>

              {/* Email field */}
              <div>
                <h3 className="text-sm font-semibold mb-1">Your email</h3>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-300 bg-[#f5f5f5] px-4 py-2.5 
                             text-sm outline-none placeholder:text-gray-400
                             focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                />
              </div>

              {/* Password field */}
              <div>
                <h3 className="text-sm font-semibold mb-1">Create password</h3>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-300 bg-[#f5f5f5] px-4 py-2.5 
                             text-sm outline-none placeholder:text-gray-400
                             focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                />
              </div>

              {/* Signup Button — Same animated CTA as Login */}
              <button
                type="submit"
                className="group relative mt-2 flex items-center justify-center w-full 
                           bg-black text-white py-3 rounded-xl text-sm font-semibold 
                           overflow-hidden shadow-md cursor-pointer"
              >
                {/* Animated layers */}
                <span
                  className="absolute top-0 left-0 h-1/2 w-0 bg-yellow-400 
                             transition-all duration-300 ease-[cubic-bezier(.785,.135,.15,.86)]
                             group-hover:w-full"
                />
                <span
                  className="absolute bottom-0 right-0 h-1/2 w-0 bg-yellow-400 
                             transition-all duration-300 ease-[cubic-bezier(.785,.135,.15,.86)]
                             group-hover:w-full"
                />

                <span
                  className="relative z-10 transition-colors duration-300 
                                 group-hover:text-black tracking-[0.25em] uppercase"
                >
                  Create Account
                </span>
              </button>
            </form>

            {/* Switch to login */}
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

          {/* Legal text */}
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
