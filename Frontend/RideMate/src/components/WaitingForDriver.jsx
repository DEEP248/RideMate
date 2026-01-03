import React from "react";

/**
 * WaitingForDriver
 * ------------------------------------------------------------
 * Purpose:
 * - Display the state where a driver has been assigned
 * - User is waiting for the driver to arrive
 * - Read-only informational screen (no primary CTA yet)
 *
 * Notes:
 * - Uses same bottom-sheet pattern as VehiclePanel / ConfirmedVehicle
 * - Height & overflow are controlled by parent (HomePage)
 * - Dummy data for now (driver + trip info)
 * - Real-time updates will later come via socket / polling
 */
const WaitingForDriver = (props) => {
  return (
    <div className="relative pb-6 px-4 bg-white font-sans">
      {/* Slide-down handle */}
      <div
        className="w-full flex justify-center mb-5 cursor-pointer"
        onClick={() => props.setWaitingForDriverPanel(false)}
      >
        <div className="w-12 h-1 rounded-full bg-gray-300"></div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-6 px-2">
        Waiting For Driver
      </h3>


      {/* Driver & Vehicle Summary Header */}
      <div className="flex items-center justify-between mb-5">
        {/* Vehicle thumbnail */}
        <img
          className="h-32 rounded-xl shadow-md"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy82NDkzYzI1NS04N2M4LTRlMmUtOTQyOS1jZjcwOWJmMWI4MzgucG5n"
          alt="Selected vehicle"
        />

        {/* Driver details */}
        <div className="text-right">
          <h2 className="text-lg font-medium text-gray-800 capitalize">
            {props.ride?.captain.fullname.firstname}
          </h2>
          <h4 className="text-2xl font-bold text-gray-900 mt-1">
            {props.ride?.captain.vehicle.plate}
          </h4>
          <p className="text-sm text-gray-500 mt-1">Maruti Suzuki Alto</p>
          <h4 className="text-sm text-gray-600 mt-2">
            OTP:{" "}
            <span className="font-semibold text-gray-800">
              {props.ride?.otp}
            </span>
          </h4>
        </div>
      </div>

      {/* Trip Summary Card */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-md divide-y divide-gray-200">
        {/* Pickup location */}
        <div className="flex items-start gap-4 p-4">
          <i className="ri-map-pin-user-fill text-lg text-yellow-500 mt-1"></i>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Pickup location
            </h4>
            <p className="text-xs text-gray-500 mt-1">{props.ride?.pickup}</p>
          </div>
        </div>

        {/* Drop location */}
        <div className="flex items-start gap-4 p-4">
          <i className="ri-map-pin-2-fill text-lg text-red-500 mt-1"></i>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Destination</h4>
            <p className="text-xs text-gray-500 mt-1">
              {props.ride?.destination}
            </p>
          </div>
        </div>

        {/* Fare & payment method */}
        <div className="flex items-start gap-4 p-4">
          <i className="ri-money-rupee-circle-line text-lg text-green-500 mt-1"></i>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              ₹{props.ride?.fare}
            </h4>
            <p className="text-xs text-gray-500 mt-1">Cash payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
