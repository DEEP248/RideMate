import React from "react";

const dummyLocations = [
  "24B, Near Kapoor's Cafe, Sheriyans Coding School, Bhopal",
  "221B Residency Road, Near Central Mall, Bhopal",
  "18 Sunrise Colony, Lalghati Square, Bhopal",
  "7A Tech Park, MP Nagar Zone-1, Bhopal",
  "11 Harmony Street, Old City Area, Bhopal",
];
const LocationSearchPanel = () => {
  return (
    <div className="px-5 py-4 max-h-[55vh] overflow-y-auto">
      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-500 tracking-wide mb-3">
        Suggested Locations
      </h3>

      <div className="space-y-3">
        {dummyLocations.map((loc, idx) => (
          <div
            key={idx}
            className="
              flex items-start gap-4 p-3 rounded-xl
              hover:bg-gray-100 active:bg-gray-200 
              transition-all cursor-pointer
            "
          >
            <div
              className="
                bg-gray-100 text-gray-600 
                w-10 h-10 flex items-center justify-center 
                rounded-full shadow-sm
              "
            >
              <i className="ri-map-pin-fill text-lg"></i>
            </div>

            <div className="flex-1">
              <p className="text-[13px] font-medium text-gray-800 leading-tight">
                {loc}
              </p>

              <p className="text-[11px] text-gray-400 mt-1">
                Tap to set this location
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-4"></div>
    </div>
  );
};

export default LocationSearchPanel;
