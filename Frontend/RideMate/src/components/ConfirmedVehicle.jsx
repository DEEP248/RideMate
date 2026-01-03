import React from "react";

const ConfirmedVehicle = (props) => {
  return (
    <div className="relative pb-4 px-4 bg-white font-sans flex flex-col min-h-[400px]">
      {/* Slide-down handle */}
      <div
        className="w-full flex justify-center mb-4 cursor-pointer"
        onClick={() => props.setConfirmVehiclePanel(false)}
      >
        <div className="w-12 h-1 rounded-full bg-gray-300"></div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-4 px-2">
        Confirm your ride
      </h3>

      {/* Vehicle Preview */}
      <div className="flex justify-center mb-4">
        <img
          className="h-20 rounded-xl shadow-md object-contain"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy82NDkzYzI1NS04N2M4LTRlMmUtOTQyOS1jZjcwOWJmMWI4MzgucG5n"
          alt="Selected vehicle"
        />
      </div>

      {/* Trip Summary Card */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-md divide-y divide-gray-200">
        {/* Pickup Location */}
        <div className="flex items-start gap-3 p-3">
          <i className="ri-map-pin-user-fill text-lg text-yellow-500 mt-1"></i>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Pickup location
            </h4>
            <p className="text-xs text-gray-500 mt-1">{props.pickup}</p>
          </div>
        </div>

        {/* Drop Location */}
        <div className="flex items-start gap-3 p-3">
          <i className="ri-map-pin-2-fill text-lg text-red-500 mt-1"></i>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Destination</h4>
            <p className="text-xs text-gray-500 mt-1">{props.destination}</p>
          </div>
        </div>

        {/* Fare & Payment */}
        <div className="flex items-start gap-3 p-3">
          <i className="ri-money-rupee-circle-line text-lg text-green-500 mt-1"></i>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              ₹{props.fare[props.vehicleType]}
            </h4>
            <p className="text-xs text-gray-500 mt-1">Cash payment</p>
          </div>
        </div>
      </div>

      {/* Spacer to push button down */}
      <div className="flex-grow"></div>

      {/* Confirm CTA */}
      <button
        onClick={() => {
          props.setConfirmVehiclePanel(false);
          props.setLookingForDriverPanel(true);
          props.createRide();
        }}
        className="
          w-full mt-8 py-2.5 rounded-xl cursor-pointer
          font-semibold text-sm
          bg-black text-white
          hover:bg-yellow-500 hover:text-black
          active:scale-[0.98]
          transition-all
        "
      >
        Confirm ride
      </button>
    </div>
  );
};

export default ConfirmedVehicle;
