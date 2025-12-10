import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  // ------------------------------
  // Local state for captain login
  // ------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setcaptainData] = useState({});

  // ------------------------------
  // Handle captain login submit
  // ------------------------------
  const submitHandler = (e) => {
    e.preventDefault();
    setcaptainData({ email: email, password: password });
    console.log(captainData);
    setEmail("");
    setPassword("");
  };

  return (
    // Full-screen centered app shell (same as User Login)
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      {/* Phone-size card */}
      <div className="relative w-full max-w-sm min-h-screen bg-white flex flex-col px-5 pb-6 pt-20">
        {/* Header: Logo + tag (same as Home & User Login) */}
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

        {/* Main content block */}
        <div className="flex-1 flex flex-col justify-between mt-4">
          {/* Login form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Captain Login
            </h2>
            <p className="text-xs text-gray-500 italic mb-6">
              Log in to manage your daily office rides.
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
                  placeholder="captain@example.com"
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

              {/* Primary CTA – same animated button as User Login */}
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

            {/* Captain signup link */}
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

          {/* Switch to User login */}
          <div className="mt-6">
            <Link
              to="/login"
              className="w-full py-2.5 rounded-xl text-sm font-semibold 
                         border border-gray-300
                         flex items-center justify-center
                         text-black bg-yellow-400
                         transition-all duration-200 ease-out
                         hover:bg-black hover:text-yellow-400 hover:border-black hover:shadow-md"
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
