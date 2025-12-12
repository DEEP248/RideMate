import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const HomePage = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const submitHandler = (e) => e.preventDefault();

  // Animate bottom sheet
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "60vh",
        padding: 20,
        duration: 0.35,
        ease: "power2.out",
      });

      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.2,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0vh",
        padding: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });

      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.2,
      });
    }
  }, [panelOpen]);

  return (
    <div className="relative w-full max-w-sm min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="relative w-full max-w-sm min-h-screen bg-white flex flex-col overflow-hidden">
        
        {/* ------------------------------------------------- */}
        {/* ORIGINAL HEADER (Your old style preserved)       */}
        {/* ------------------------------------------------- */}
        <div className="absolute top-4 left-0 right-0 z-10 flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 object-contain"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Eow-IaJR9h3sS8PzlmT0lbb9TB4Ksqd8LA&s"
              alt="Logo"
            />
            <h1 className="text-base font-bold text-gray-900">RideMate</h1>
          </div>

          <span className="text-[11px] font-semibold bg-yellow-400 text-black px-3 py-1 rounded-full shadow-md">
            User Mode
          </span>
        </div>

        {/* ------------------------------------------------- */}
        {/* MAP SECTION                                       */}
        {/* ------------------------------------------------- */}
        <div className="flex-1 mt-20 rounded-xl overflow-hidden shadow-lg mx-4">
          <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:4800/format:webp/0*gwMx05pqII5hbfmX.gif"
            alt="Map"
          />
        </div>

        {/* ------------------------------------------------- */}
        {/* TRIP INPUT (BOTTOM SHEET)                         */}
        {/* ------------------------------------------------- */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="bg-white rounded-t-3xl px-6 pt-7 pb-6 shadow-2xl border-t relative">
            {/* Close icon */}
            <button
              ref={panelCloseRef}
              onClick={() => setPanelOpen(false)}
              className="absolute opacity-0 right-6 top-6 text-2xl text-gray-700 transition-all"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </button>

            <h4 className="text-2xl font-semibold mb-3">Find a trip</h4>

            {/* ------------------------------ */}
            {/* INPUT FIELDS – CLEAN + NO LINE */}
            {/* ------------------------------ */}
            <form onSubmit={submitHandler}>
              {/* Pickup */}
              <div className="relative mt-2">
                <i className="ri-map-pin-fill absolute left-3 top-3.5 text-lg text-gray-500"></i>
                <input
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onClick={() => setPanelOpen(true)}
                  className="bg-gray-100 pl-10 pr-4 py-3 rounded-xl w-full text-sm border border-gray-200 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400"
                  placeholder="Add a pickup location"
                  type="text"
                />
              </div>

              {/* Destination */}
              <div className="relative mt-3">
                <i className="ri-flag-fill absolute left-3 top-3.5 text-lg text-gray-500"></i>
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onClick={() => setPanelOpen(true)}
                  className="bg-gray-100 pl-10 pr-4 py-3 rounded-xl w-full text-sm border border-gray-200 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400"
                  placeholder="Enter your destination"
                  type="text"
                />
              </div>
            </form>
          </div>

          {/* EXPANDING PANEL */}
          <div
            ref={panelRef}
            className="bg-white h-0 overflow-hidden rounded-t-3xl shadow-xl"
            style={{ overflowY: "auto" }} // ✅ enables vertical scroll inside panel
          >
            <LocationSearchPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
