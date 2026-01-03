import React from "react";

const LookingForDriver = (props) => {
  return (
    <div className="relative pb-6 px-4 bg-white font-sans">
      {/* Slide-down handle */}
      <div
        className="w-full flex justify-center mb-5 cursor-pointer"
        onClick={() => props.setLookingForDriverPanel(false)}
      >
        <div className="w-12 h-1 rounded-full bg-gray-300"></div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-6 px-2">
        Looking For Driver
      </h3>

      {/* Vehicle Preview */}
      <div className="flex justify-center mb-6">
        <img
          className="h-32 rounded-xl shadow-md object-contain"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy82NDkzYzI1NS04N2M4LTRlMmUtOTQyOS1jZjcwOWJmMWI4MzgucG5n"
          alt="Selected vehicle"
        />
      </div>

      {/* Trip Summary Card */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-md divide-y divide-gray-200">
        {/* Pickup Location */}
        <div className="flex items-start gap-4 p-4">
          <i className="ri-map-pin-user-fill text-lg text-yellow-500 mt-1"></i>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Pickup location
            </h4>
            <p className="text-xs text-gray-500 mt-1">{props.pickup}</p>
          </div>
        </div>

        {/* Drop Location */}
        <div className="flex items-start gap-4 p-4">
          <i className="ri-map-pin-2-fill text-lg text-red-500 mt-1"></i>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Destination</h4>
            <p className="text-xs text-gray-500 mt-1">{props.destination}</p>
          </div>
        </div>

        {/* Fare & Payment */}
        <div className="flex items-start gap-4 p-4">
          <i className="ri-money-rupee-circle-line text-lg text-green-500 mt-1"></i>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              ₹{props.fare[props.vehicleType]}
            </h4>
            <p className="text-xs text-gray-500 mt-1">Cash payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
