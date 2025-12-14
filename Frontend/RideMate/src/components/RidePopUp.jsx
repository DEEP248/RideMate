import React from "react";

const RidePopUp = (props) => {
  return (
    <div className="relative pb-6 px-2">
      {/* ===================================================== */}
      {/* SLIDE HANDLE — indicates draggable / dismissible UI */}
      {/* ===================================================== */}
      <div
        className="w-full flex justify-center mb-4 cursor-pointer"
        onClick={() => props.setridePopupPanel(false)}
      >
        <i className="ri-arrow-down-wide-line text-2xl text-gray-400"></i>
      </div>

      {/* ===================================================== */}
      {/* TITLE — Incoming ride alert                         */}
      {/* ===================================================== */}
      <h3 className="text-xl font-semibold mb-5 px-2">New Ride Request</h3>

      {/* ===================================================== */}
      {/* RIDER SUMMARY — highlighted for urgency              */}
      {/* ===================================================== */}
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-xl mb-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://www.shutterstock.com/image-photo/outdoor-photo-middle-eastern-30s-260nw-2543704497.jpg"
            alt="Rider"
          />
          <h2 className="text-base font-semibold">Deep Darji</h2>
        </div>

        <span className="text-sm font-semibold">2.2 km away</span>
      </div>

      {/* ===================================================== */}
      {/* TRIP DETAILS CARD                                   */}
      {/* ===================================================== */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm divide-y">
        {/* Pickup */}
        <div className="flex items-start gap-4 p-4">
          <i className="ri-map-pin-user-fill text-lg text-gray-600 mt-1"></i>
          <div>
            <h4 className="text-sm font-semibold">Pickup</h4>
            <p className="text-xs text-gray-500">
              562/11-A, Kankariya Talav, Ahmedabad
            </p>
          </div>
        </div>

        {/* Drop */}
        <div className="flex items-start gap-4 p-4">
          <i className="ri-map-pin-2-fill text-lg text-gray-600 mt-1"></i>
          <div>
            <h4 className="text-sm font-semibold">Destination</h4>
            <p className="text-xs text-gray-500">
              Near Gitamandir Bus Depot, Ahmedabad
            </p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-4 p-4">
          <i className="ri-money-rupee-circle-line text-lg text-gray-600 mt-1"></i>
          <div>
            <h4 className="text-sm font-semibold">₹193</h4>
            <p className="text-xs text-gray-500">Cash payment</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        {/* Ignore */}
        <button
          onClick={() => props.setridePopupPanel(false)}
          className="
      flex-1 py-3 rounded-xl cursor-pointer
      font-semibold text-sm
      border border-gray-700 text-gray-700
      hover:bg-white hover:text-black
      active:scale-[0.98]
      transition-all
    "
        >
          Ignore
        </button>

        {/* Accept */}
        <button
          onClick={() => {
            props.setconfirmridePopupPanel(true);
          }}
          className="
      flex-1 py-3 rounded-xl cursor-pointer
      font-semibold text-sm
      bg-black text-white
      hover:bg-yellow-500 hover:text-black
      active:scale-[0.98]
      transition-all
    "
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
