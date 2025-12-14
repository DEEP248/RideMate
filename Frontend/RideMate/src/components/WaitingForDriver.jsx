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
    <div className="relative pb-6 px-2">
      
      {/* ------------------------------------------------------ */}
      {/* Slide-down handle                                      */}
      {/* UX cue: indicates this panel can be dismissed          */}
      {/* ------------------------------------------------------ */}
      <div
        className="w-full flex justify-center mb-5 cursor-pointer"
        onClick={() => props.setWaitingForDriverPanel(false)}
      >
        <i className="ri-arrow-down-wide-line text-2xl text-gray-400"></i>
      </div>

      {/* ------------------------------------------------------ */}
      {/* Driver & Vehicle Summary Header                        */}
      {/* ------------------------------------------------------ */}
      <div className="flex items-center justify-between mb-4">
        
        {/* Vehicle thumbnail */}
        <img
          className="h-12"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy82NDkzYzI1NS04N2M4LTRlMmUtOTQyOS1jZjcwOWJmMWI4MzgucG5n"
          alt="Selected vehicle"
        />

        {/* Driver details */}
        <div className="text-right">
          <h2 className="text-lg font-medium">Deep</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">
            MP04 AB 1234
          </h4>
          <p className="text-sm text-gray-500">
            Maruti Suzuki Alto
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------ */}
      {/* Trip Summary Card                                      */}
      {/* ------------------------------------------------------ */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm divide-y">
        
        {/* Pickup location */}
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

        {/* Drop location */}
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

        {/* Fare & payment method */}
        <div className="flex items-start gap-4 p-4">
          <i className="ri-money-rupee-circle-line text-lg text-gray-600 mt-1"></i>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              ₹193
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Cash payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;