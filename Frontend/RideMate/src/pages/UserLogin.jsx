import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { useContext } from "react";

/**
 * UserLogin is a React component for logging in to the RideMate app.
 * It provides a form with email and password fields and submits the form to the backend API.
 * If the submission is successful, it stores the user data and token in local storage and navigates to the home page.
 */
const UserLogin = () => {
  // ------------------------------
  // Local state for login form
  // ------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  // ------------------------------
  // Handle login submit
  // ------------------------------
  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = { email: email, password: password };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    // Full-screen centered app shell (same pattern as Home)
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      {/* Phone-size card */}
      <div className="relative w-full max-w-sm min-h-screen bg-white flex flex-col px-5 pb-6 pt-20">
        {/* Header: Logo + tag (matches Home) */}
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

        {/* Main content block */}
        <div className="flex-1 flex flex-col justify-between mt-4">
          {/* Login form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Login to RideMate
            </h2>
            <p className="text-xs text-gray-500 italic mb-6">
              Use your registered email to continue your daily office ride.
            </p>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              {/* Email field */}
              <div>
                <h3 className="text-sm font-semibold mb-1">
                  What&apos;s your email?
                </h3>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  required
                  className="w-full rounded-xl border border-gray-300 bg-[#f5f5f5] px-4 py-2.5 text-sm outline-none
                             placeholder:text-gray-400
                             focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password field */}
              <div>
                <h3 className="text-sm font-semibold mb-1">Enter password</h3>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  type="password"
                  className="w-full rounded-xl border border-gray-300 bg-[#f5f5f5] px-4 py-2.5 text-sm outline-none
                             placeholder:text-gray-400
                             focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                  placeholder="••••••••"
                />
              </div>

              {/* Primary CTA – reusing animated button pattern from Home */}
              <button
                type="submit"
                className="group relative mt-2 flex items-center justify-center w-full 
                           bg-black text-white py-3 rounded-xl text-sm font-semibold 
                           overflow-hidden shadow-md cursor-pointer"
              >
                {/* Animated yellow layers */}
                <span
                  className="absolute top-0 left-0 h-1/2 w-0 bg-yellow-400 transition-all duration-300 ease-[cubic-bezier(.785,.135,.15,.86)]
                             group-hover:w-full"
                ></span>

                <span
                  className="absolute bottom-0 right-0 h-1/2 w-0 bg-yellow-400 transition-all duration-300 ease-[cubic-bezier(.785,.135,.15,.86)]
                             group-hover:w-full"
                ></span>

                {/* Button label */}
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black tracking-[0.25em] uppercase">
                  Login
                </span>
              </button>
            </form>

            {/* Signup link */}
            <p className="mt-4 text-center text-xs text-gray-600">
              New here?{" "}
              <Link
                to="/signup"
                className="font-semibold text-gray-900 underline"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Switch to Captain login */}
          <div className="mt-6">
            <Link
              to="/captain-login"
              className="w-full py-2.5 rounded-xl text-sm font-semibold 
             border border-gray-300
             flex items-center justify-center
             text-black bg-yellow-400
             transition-all duration-200 ease-out
             hover:bg-black hover:text-yellow-400 hover:border-black hover:shadow-md"
            >
              Sign in as Captain
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
