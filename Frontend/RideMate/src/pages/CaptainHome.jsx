import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import CaptainDetails from "./CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";

const CaptainHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(true);
  const [confirmridePopupPanel, setconfirmridePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmridePopupPanelRef = useRef(null);

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmridePopupPanelRef.current, {
      transform: confirmridePopupPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmridePopupPanel]);

  return (
    <div className="relative w-full max-w-sm h-screen bg-gray-100 mx-auto overflow-hidden">
      {/* ================================================= */}
      {/* HEADER OVER MAP                                  */}
      {/* ================================================= */}
      <div className="absolute top-4 left-0 right-0 z-20 px-5 flex items-center justify-between">
        <img
          className="h-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Eow-IaJR9h3sS8PzlmT0lbb9TB4Ksqd8LA&s"
          alt="Logo"
        />

        <Link
          to="/captain-login"
          className="
            h-10 w-10 rounded-full bg-white
            shadow-md flex items-center justify-center
          "
        >
          <i className="ri-logout-box-r-line text-lg"></i>
        </Link>
      </div>

      {/* ================================================= */}
      {/* MAP LAYER                                        */}
      {/* ================================================= */}
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:4800/format:webp/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />
      </div>

      {/* ================================================= */}
      {/* CAPTAIN STATS OVERLAY                             */}
      {/* ================================================= */}
      {/* ================================================== */}
      {/* CAPTAIN DETAILS — BOTTOM SHEET (PRIMARY STATE)     */}
      {/* ================================================== */}
      <div
        className="
    fixed bottom-0 left-0 right-0 z-20
    h-[35vh]
    bg-white
    rounded-t-3xl
    shadow-2xl
    px-4 pt-6
  "
      >
        {/* Slide handle */}
        <div className="w-full flex justify-center mb-4">
          <i className="ri-arrow-down-wide-line text-2xl text-gray-400"></i>
        </div>

        <CaptainDetails />
      </div>

      {/* ================================================= */}
      {/* RIDE REQUEST POPUP (SLIDE SHEET)                  */}
      {/* ================================================= */}
      <div
        ref={ridePopupPanelRef}
        className="
          fixed bottom-0 left-0 right-0 z-30
          bg-white
          translate-y-full
          h-[70vh] max-h-[70vh]
          overflow-hidden
        "
      >
        <RidePopUp
          setridePopupPanel={setridePopupPanel}
          setconfirmridePopupPanel={setconfirmridePopupPanel}
        />
      </div>

      <div
        ref={confirmridePopupPanelRef}
        className="
    fixed inset-0 z-40
    bg-white
    translate-y-full
    flex flex-col
  "
      >
        <ConfirmRidePopUp
          setconfirmridePopupPanel={setconfirmridePopupPanel}
          setridePopupPanel={setridePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
