import React from "react";

// ----------------------------------------------------------------------
// TEMPORARY STATIC LOCATION DATA
// Will be replaced by real-time Google Places / backend search results
// ----------------------------------------------------------------------
const dummyLocations = [
  "24B, Near Kapoor's Cafe, Sheriyans Coding School, Bhopal",
  "221B Residency Road, Near Central Mall, Bhopal",
  "18 Sunrise Colony, Lalghati Square, Bhopal",
  "7A Tech Park, MP Nagar Zone-1, Bhopal",
  "11 Harmony Street, Old City Area, Bhopal"
];

const LocationSearchPanel = ({
  setvehiclePanel,
  setPanelOpen
}) => {
  return (
    <div className="px-5 py-4 max-h-[55vh] overflow-y-auto">

      {/* ------------------------------------------------------------------ */}
      {/* SECTION TITLE                                                     */}
      {/* ------------------------------------------------------------------ */}
      <h3 className="text-sm font-semibold text-gray-500 tracking-wide mb-3">
        Suggested Locations
      </h3>

      {/* ------------------------------------------------------------------ */}
      {/* LOCATION RESULTS LIST                                              */}
      {/* - Maps through static dummy data now                               */}
      {/* - Each item triggers:                                              */}
      {/*      1) Close search panel                                          */}
      {/*      2) Open vehicle selection panel                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-2">
        {dummyLocations.map((loc, idx) => (
          <div
            key={idx}
            onClick={() => {
              setvehiclePanel(true);  // Open vehicle panel
              setPanelOpen(false);    // Close location panel
            }}
            className="
              flex items-start gap-3 p-3 
              rounded-xl bg-gray-50 border border-gray-200 
              hover:bg-gray-100 active:bg-gray-200 
              transition-all cursor-pointer shadow-sm
            "
          >
            {/* Location icon bubble */}
            <div
              className="
                bg-white w-10 h-10 rounded-full 
                flex items-center justify-center 
                border border-gray-200 shadow-sm
              "
            >
              <i className="ri-map-pin-fill text-lg text-gray-600"></i>
            </div>

            {/* Location text block */}
            <div className="flex-1">
              <p className="text-[13px] font-medium text-gray-800">
                {loc}
              </p>

              <p className="text-[11px] text-gray-400 mt-1">
                Tap to set this location
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom padding for clean scroll experience */}
      <div className="h-6"></div>
    </div>
  );
};

export default LocationSearchPanel;