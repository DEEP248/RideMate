import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-sm min-h-screen bg-white flex flex-col pt-10">
        {/* Top Image Section */}
        <div
          className="w-full shrink-0 bg-no-repeat bg-top bg-contain"
          style={{
            backgroundImage:
              "url(https://img.freepik.com/free-vector/taxi-app-concept_23-2148496627.jpg?semt=ais_hybrid&w=740&q=80)",
            height: "55vh",
            marginTop: "64px",
          }}
        />

        {/* Logo + Right Side Tag */}
        <div className="absolute top-4 left-0 right-0 z-10 flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 object-contain"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Eow-IaJR9h3sS8PzlmT0lbb9TB4Ksqd8LA&s"
              alt="Logo"
            />
            <h1 className="text-base font-bold text-gray-900">RideMate</h1>
          </div>

          <span className="text-[11px] font-semibold bg-yellow-400 text-black px-3 py-1 rounded-full shadow">
            Office Commute
          </span>
        </div>

        {/* Bottom Content */}
        <div className="flex-1 px-5 pt-4 pb-6 flex flex-col justify-end">
          <h2 className="text-2xl font-bold text-black-900">
            Get Started With RideMate
          </h2>

          {/* ✅ SAME MESSAGE – ONLY UI IMPROVED */}
          <p className="mt-2 text-sm text-gray-800 leading-relaxed italic">
            Offer a seat on your office route or join a RideMate going the same
            way. Share the ride, split the cost.
          </p>

          {/* ✅ ONLY HOVER + PRESS UI ADDED */}
          <Link
            to="/login"
            className="group relative mt-5 flex items-center justify-center w-full 
             bg-black text-white py-3 rounded-xl text-sm font-semibold 
             overflow-hidden shadow-md"
          >
            {/* Animated white layers */}
            <span
              className="absolute top-0 left-0 h-1/2 w-0 bg-yellow-400 transition-all duration-350 ease-[cubic-bezier(.785,.135,.15,.86)]
                   group-hover:w-full"
            ></span>

            <span
              className="absolute bottom-0 right-0 h-1/2 w-0 bg-yellow-400 transition-all duration-350 ease-[cubic-bezier(.785,.135,.15,.86)]
                   group-hover:w-full"
            ></span>

            {/* Text */}
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black tracking-widest uppercase">
              Continue
            </span>
            {/* Animated arrow (VISIBLE by default, animates on hover) */}
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-sm font-bold
             transition-all duration-300 ease-out
             group-hover:text-black group-hover:translate-x-2"
            >
              -----&gt;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
