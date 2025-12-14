import React from "react";
import { Link } from "react-router-dom";

const FinishRide = (props) => {
  return (
    <div className="relative h-screen w-full bg-white flex flex-col">
      {/* ===================================================== */}
      {/* DRAG HANDLE                                          */}
      {/* ===================================================== */}
      <div
        className="w-full flex justify-center py-3 cursor-pointer"
        onClick={() => props.setfinishridePopupPanel(false)}
      >
        <i className="ri-arrow-down-wide-line text-2xl text-gray-400"></i>
      </div>

      {/* ===================================================== */}
      {/* HEADER                                               */}
      {/* ===================================================== */}
      <div className="px-5">
        <h3 className="text-2xl font-semibold text-gray-900">
          Complete this ride
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Review details before Completing
        </p>
      </div>

      {/* ===================================================== */}
      {/* RIDER CARD                                           */}
      {/* ===================================================== */}
      <div className="mx-5 mt-5 p-4 bg-yellow-400 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://www.shutterstock.com/image-photo/outdoor-photo-middle-eastern-30s-260nw-2543704497.jpg"
            alt="Rider"
          />
          <div>
            <h2 className="text-base font-semibold">Deep Darji</h2>
            <p className="text-xs text-black/70">Pickup nearby</p>
          </div>
        </div>
        <span className="text-sm font-semibold">2.2 km</span>
      </div>

      {/* ===================================================== */}
      {/* TRIP DETAILS                                         */}
      {/* ===================================================== */}
      <div className="flex-1 overflow-y-auto px-5 mt-6">
        <div className="bg-gray-50 rounded-2xl border border-gray-200 divide-y">
          {/* Pickup */}
          <div className="flex gap-4 p-4">
            <i className="ri-map-pin-user-fill text-lg text-gray-600 mt-1"></i>
            <div>
              <h4 className="text-sm font-semibold">Pickup</h4>
              <p className="text-xs text-gray-500">
                562/11-A, Kankariya Talav, Ahmedabad
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex gap-4 p-4">
            <i className="ri-map-pin-2-fill text-lg text-gray-600 mt-1"></i>
            <div>
              <h4 className="text-sm font-semibold">Destination</h4>
              <p className="text-xs text-gray-500">
                Near Gitamandir Bus Depot, Ahmedabad
              </p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex gap-4 p-4">
            <i className="ri-money-rupee-circle-line text-lg text-gray-600 mt-1"></i>
            <div>
              <h4 className="text-sm font-semibold">₹193</h4>
              <p className="text-xs text-gray-500">Cash payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* ACTION BUTTONS — FIXED BOTTOM                         */}
      {/* ===================================================== */}
      <div className="mb-6 w-full">
        <p className="text-xs text-gray-500 mt-2 text-center"></p>
      </div>

      <div
        className="
  px-5 pb-6 pt-5 border-t bg-white
  mt-auto
"
      >
        {/* Confirm */}
        <Link
          to="/captain-home"
          className="
    w-full flex items-center justify-center
    py-2 rounded-xl
    font-semibold text-base
    bg-green-600 text-white
    hover:bg-yellow-400 hover:text-black
    active:scale-[0.96]
    transition-all
    shadow-lg
  "
        >
          Complete Ride
        </Link>

        <p className="px-5 text-xs text-red-600 font-medium text-center mb-5 mt-4">
          ⚠️ Once completed, this ride cannot be modified or reopened
        </p>
      </div>
    </div>
  );
};

export default FinishRide;
