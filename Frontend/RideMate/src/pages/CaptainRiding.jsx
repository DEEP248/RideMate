import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const [finishridePopupPanel, setfinishridePopupPanel] = useState(false);

  const finishidePopupPanelRef = useRef(null);

  useGSAP(() => {
    gsap.to(finishidePopupPanelRef.current, {
      transform: finishridePopupPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [finishridePopupPanel]);

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
      <div className="absolute inset-0 h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:4800/format:webp/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />
      </div>

      {/* ================================================= */}
      {/* BOTTOM RIDE STATUS BAR                            */}
      {/* ================================================= */}
      <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-yellow-300 rounded-t-3xl px-5 pt-4 pb-6"
        onClick={() => setfinishridePopupPanel(true)}
      >
        
        {/* Drag handle */}
        <div className="w-full flex justify-center mb-4 cursor-pointer">
          <i className="ri-arrow-up-wide-line text-2xl text-black/70"></i>
        </div>

        {/* Content row */}
        <div className="flex items-center justify-between gap-4">
          {/* Ride status */}
          <h4 className="text-lg font-semibold whitespace-nowrap">4 KM away</h4>

          {/* CTA */}
          <button
            className="
        px-6 py-3 rounded-xl
        font-semibold text-sm
        bg-black text-white
        hover:bg-white hover:text-black
        active:scale-[0.97]
        transition-all
      "
          >
            Complete Ride
          </button>
        </div>
      </div>

      <div
        ref={finishidePopupPanelRef}
        className="
    fixed inset-0 z-40
    bg-white
    translate-y-full
    flex flex-col
  "
      >
        <FinishRide  setfinishridePopupPanel={setfinishridePopupPanel}/>
      </div>
    </div>
  );
};

export default CaptainRiding;
