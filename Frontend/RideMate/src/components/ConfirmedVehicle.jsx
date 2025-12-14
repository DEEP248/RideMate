import React from "react";

const ConfirmedVehicle = (props) => {
  return (
    <div className="relative pb-6 px-2">
      {/* -------------------------------- */}
      {/* Slide-down handle (UX indicator) */}
      {/* -------------------------------- */}
      <div
        className="w-full flex justify-center mb-5 cursor-pointer"
        onClick={() => props.setConfirmVehiclePanel(false)}
      >
        <i className="ri-arrow-down-wide-line text-2xl text-gray-400"></i>
      </div>

      {/* -------------------------------- */}
      {/* Title                             */}
      {/* -------------------------------- */}
      <h3 className="text-xl font-semibold mb-6 px-2">Confirm your ride</h3>

      {/* -------------------------------- */}
      {/* Vehicle Preview                   */}
      {/* -------------------------------- */}
      <div className="flex justify-center mb-6">
        <img
          className="h-20 object-contain"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy82NDkzYzI1NS04N2M4LTRlMmUtOTQyOS1jZjcwOWJmMWI4MzgucG5n"
          alt="Selected vehicle"
        />
      </div>

      {/* -------------------------------- */}
      {/* Trip Summary Card                */}
      {/* -------------------------------- */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm divide-y">
        {/* Pickup Location */}
        <div className="flex items-start gap-4 p-4">
          <i className="ri-map-pin-user-fill text-lg text-gray-600 mt-1"></i>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Pickup location
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              562/11-A, Kankariya Talav, Ahmedabad
            </p>
          </div>
        </div>

        {/* Drop Location */}
        <div className="flex items-start gap-4 p-4">
          <i className="ri-map-pin-2-fill text-lg text-gray-600 mt-1"></i>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Destination</h4>
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

      {/* -------------------------------- */}
      {/* Confirm CTA                      */}
      {/* -------------------------------- */}
      <button
        onClick={()=>{
          props.setConfirmVehiclePanel(true);
          props.setLookingForDriverPanel(true);
        }}
        className="
    w-full mt-6 py-3 rounded-xl cursor-pointer
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
