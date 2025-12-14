import React from "react";
import { Link } from "react-router-dom";

/**
 * Riding
 * ------------------------------------------------------------
 * Purpose:
 * - Active ride tracking screen (ride has started)
 * - Shows live map + driver & vehicle details
 * - Displays destination and fare summary
 *
 * Status:
 * - Currently using static / dummy data
 * - Map is placeholder (future Google Maps integration)
 * - Payment CTA is a placeholder for upcoming payment flow
 *
 * UX Pattern:
 * - Full-screen layout (no bottom sheet)
 * - Split screen: Map (top 50%) + Ride details (bottom 50%)
 */
const Riding = () => {
  return (
    <div className="h-screen">
      {/* -------------------------------------------------- */}
      {/* Floating Home Shortcut                             */}
      {/* Allows user to exit ride screen (temporary)        */}
      {/* In production: may become minimized / disabled     */}
      {/* -------------------------------------------------- */}
      <Link
        to="/home"
        className="absolute right-4 top-4 z-20 h-10 w-10 
             bg-white rounded-full shadow-lg 
             flex items-center justify-center"
      >
        <i className="text-lg font-medium ri-home-4-line"></i>
      </Link>

      {/* ================================================== */}
      {/* MAP SECTION (Live Ride Tracking)                   */}
      {/* ================================================== */}
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:4800/format:webp/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />
      </div>

      {/* ================================================== */}
      {/* RIDE DETAILS SECTION                               */}
      {/* ================================================== */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4">
        {/* -------------------------------------------------- */}
        {/* Driver & Vehicle Header                           */}
        {/* -------------------------------------------------- */}
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy82NDkzYzI1NS04N2M4LTRlMmUtOTQyOS1jZjcwOWJmMWI4MzgucG5n"
            alt="Selected vehicle"
          />

          <div className="text-right">
            <h2 className="text-lg font-medium">Deep</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">MP04 AB 1234</h4>
            <p className="text-sm text-gray-500">Maruti Suzuki Alto</p>
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* Trip Summary Card                                 */}
        {/* -------------------------------------------------- */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm divide-y mt-4">
          {/* Destination */}
          <div className="flex items-start gap-4 p-4">
            <i className="ri-map-pin-2-fill text-lg text-gray-600 mt-1"></i>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                Destination
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Near Gitamandir Bus Depot, Ahmedabad
              </p>
            </div>
          </div>

          {/* Fare & Payment */}
          <div className="flex items-start gap-4 p-4">
            <i className="ri-money-rupee-circle-line text-lg text-gray-600 mt-1"></i>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">₹193</h4>
              <p className="text-xs text-gray-500 mt-0.5">Cash payment</p>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* Payment CTA (Placeholder)                          */}
        {/* -------------------------------------------------- */}
        <button
          className="
    w-full mt-6 py-3 rounded-xl cursor-pointer
    font-semibold text-sm
    bg-black text-white
    hover:bg-yellow-500 hover:text-black
    active:scale-[0.98]
    transition-all
  "
        >
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
