import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";

import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedVehicle from "../components/ConfirmedVehicle";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

const HomePage = () => {
  // -------------------------------------------------------------
  // STATE MANAGEMENT
  // -------------------------------------------------------------
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  // Controls "Find a trip" bottom panel
  const [panelOpen, setPanelOpen] = useState(false);

  // Controls Vehicle selection panel
  const [vehiclePanel, setvehiclePanel] = useState(false);

  // Controls Confirm Ride panel
  const [confirmvehiclePanel, setConfirmVehiclePanel] = useState(false);

  // Controls "Looking for a driver" bottom panel
  const [lookingForDriverPanel, setLookingForDriverPanel] = useState(false);

  // Controls "Waiting for a driver" bottom panel
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);

  // -------------------------------------------------------------
  // REFS USED FOR GSAP ANIMATIONS
  // -------------------------------------------------------------
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const bottomContainerRef = useRef(null);

  const vehiclepanelRef = useRef(null);
  const confirmVehiclepanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);

  const lookingForDriverpanelRef = useRef(null);
  const waitingForDriverpanelRef = useRef(null);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const { user } = useContext(UserDataContext);

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const submitHandler = (e) => e.preventDefault();

  // -------------------------------------------------------------
  // GSAP: SEARCH PANEL EXPANSION / COLLAPSE
  // -------------------------------------------------------------
  useGSAP(() => {
    if (!bottomContainerRef.current) return;

    gsap.to(bottomContainerRef.current, {
      top: panelOpen ? 80 : 468, // 👈 numeric → numeric
      duration: 0.35,
      ease: panelOpen ? "power2.out" : "power2.in",
    });
  }, [panelOpen]);

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

  // -------------------------------------------------------------
  // GSAP: VEHICLE PANEL SLIDE-IN / SLIDE-OUT
  // -------------------------------------------------------------
  useGSAP(() => {
    gsap.to(vehiclepanelRef.current, {
      transform: vehiclePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehiclePanel]);

  // -------------------------------------------------------------
  // GSAP: CONFIRM VEHICLE PANEL SLIDE-IN / SLIDE-OUT
  // -------------------------------------------------------------
  useGSAP(() => {
    gsap.to(confirmVehiclepanelRef.current, {
      transform: confirmvehiclePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmvehiclePanel]);

  // -------------------------------------------------------------
  // GSAP: LOOKING FOR DRIVER PANEL SLIDE-IN / SLIDE-OUT
  // -------------------------------------------------------------
  useGSAP(() => {
    gsap.to(lookingForDriverpanelRef.current, {
      transform: lookingForDriverPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [lookingForDriverPanel]);

  // -------------------------------------------------------------
  // GSAP: WAITING FOR DRIVER PANEL SLIDE-IN / SLIDE-OUT
  // -------------------------------------------------------------
  useGSAP(() => {
    gsap.to(waitingForDriverpanelRef.current, {
      transform: waitingForDriverPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [waitingForDriverPanel]);

  // -------------------------------------------------------------
  // GSAP: VEHICLE FOUND PANEL SLIDE-IN / SLIDE-OUT
  // -------------------------------------------------------------
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  async function findTrip() {
    setvehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status !== 200) return;

    setFare(response.data);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status !== 200) return;
  }

  // -------------------------------------------------------------
  // RENDER UI
  // -------------------------------------------------------------
  return (
    <div className="relative w-full max-w-sm h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-sm h-screen bg-white flex flex-col overflow-hidden">
        {/* ========================================================= */}
        {/* HEADER — original preserved as requested                  */}
        {/* ========================================================= */}
        <div className="absolute top-4 left-0 right-0 z-10 flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 object-contain"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Eow-IaJR9h3sS8PzlmT0lbb9TB4Ksqd8LA&s"
              alt="Logo"
            />
            <h1 className="text-base font-bold text-gray-900">RideMate</h1>
          </div>
          <Link
            to="/login"
            className="
            h-10 w-10 rounded-full bg-white
            shadow-md flex items-center justify-center
          "
          >
            <i className="ri-logout-box-r-line text-lg"></i>
          </Link>
          <span className="text-[11px] font-semibold bg-yellow-400 text-black px-3 py-1 rounded-full shadow-md">
            User Mode
          </span>
        </div>

        {/* ========================================================= */}
        {/* MAP PLACEHOLDER                                           */}
        {/* ========================================================= */}
        <div className="flex-1 mt-20 rounded-xl overflow-hidden shadow-lg mx-4">
          <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:4800/format:webp/0*gwMx05pqII5hbfmX.gif"
            alt="Map"
          />
        </div>

        {/* ========================================================= */}
        {/* FIND TRIP — SEARCH INPUT PANEL                            */}
        {/* ========================================================= */}
        <div ref={bottomContainerRef} className="absolute bottom-0 left-0 right-0">
          <div className="bg-white rounded-t-3xl px-6 pt-7 pb-6 shadow-2xl border-t relative">
            {/* ------------------------------------------------------ */}
            {/* SLIDE-DOWN HANDLE (Improved UX — clean rounded bar)    */}
            {/* ------------------------------------------------------ */}
            <div className="absolute top-3 left-0 right-0 mx-auto w-12 h-1.5 bg-gray-300 rounded-full"></div>

            {/* Close button for expanded panel */}
            <button
              ref={panelCloseRef}
              onClick={() => setPanelOpen(false)}
              className="absolute opacity-0 right-6 top-6 text-2xl text-gray-700 transition-all"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </button>

            <h4 className="text-2xl font-semibold mb-3">Find a trip</h4>

            {/* Search Inputs */}
            <form onSubmit={submitHandler}>
              {/* Pickup Field */}
              <div className="relative mt-2">
                <i className="ri-map-pin-fill absolute left-3 top-3.5 text-lg text-gray-500"></i>
                <input
                  value={pickup}
                  onChange={handlePickupChange}
                  onClick={() => {
                    setPanelOpen(true);
                    setActiveField("pickup");
                  }}
                  className="bg-gray-100 pl-10 pr-4 py-3 rounded-xl w-full text-sm border border-gray-200 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400"
                  placeholder="Add a pickup location"
                  type="text"
                />
              </div>

              {/* Destination Field */}
              <div className="relative mt-3">
                <i className="ri-flag-fill absolute left-3 top-3.5 text-lg text-gray-500"></i>
                <input
                  value={destination}
                  onChange={handleDestinationChange}
                  onClick={() => {
                    setPanelOpen(true);
                    setActiveField("destination");
                  }}
                  className="bg-gray-100 pl-10 pr-4 py-3 rounded-xl w-full text-sm border border-gray-200 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400"
                  placeholder="Enter your destination"
                  type="text"
                />
              </div>
            </form>
            {panelOpen && (
              <button
                onClick={findTrip}
                className="
      mt-4 w-full py-1 rounded-xl
      bg-black text-white
      font-semibold text-sm cursor-pointer
      flex items-center justify-center gap-2
      hover:bg-yellow-400 hover:text-black
      active:scale-[0.98]
      transition-all
      shadow-md
    "
              >
                <i className="ri-search-line text-lg"></i>
                Find Ride
              </button>
            )}
          </div>

          {/* EXPANDING SEARCH RESULTS PANEL */}
          <div
            ref={panelRef}
            className="bg-white h-0 overflow-hidden rounded-t-3xl shadow-xl"
            style={{ overflowY: "auto" }}
          >
            <LocationSearchPanel
              suggestions={
                activeField === "pickup"
                  ? pickupSuggestions
                  : destinationSuggestions
              }
              setPanelOpen={setPanelOpen}
              setvehiclePanel={setvehiclePanel}
              vehiclePanel={vehiclePanel}
              panelOpen={panelOpen}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* VEHICLE SELECTION PANEL                                   */}
        {/* ========================================================= */}
        <div
          ref={vehiclepanelRef}
          className="
  fixed bottom-0 w-full z-10 bg-white
  translate-y-full
  h-[70vh] max-h-[70vh]
  overflow-hidden
"
        >
          <VehiclePanel
            fare={fare}
            selectVehicle={setVehicleType}
            setvehiclePanel={setvehiclePanel}
            setConfirmVehiclePanel={setConfirmVehiclePanel}
          />
        </div>

        {/* ========================================================= */}
        {/* CONFIRM VEHICLE PANEL                                     */}
        {/* ========================================================= */}
        <div
          ref={confirmVehiclepanelRef}
          className="
  fixed bottom-0 w-full z-10 bg-white
  translate-y-full
  h-[70vh] max-h-[70vh]
  overflow-hidden
"
        >
          <ConfirmedVehicle
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setConfirmVehiclePanel={setConfirmVehiclePanel}
            setLookingForDriverPanel={setLookingForDriverPanel}
          />
        </div>

        <div
          ref={lookingForDriverpanelRef}
          className="
  fixed bottom-0 w-full z-10 bg-white
  translate-y-full
  h-[70vh] max-h-[70vh]
  overflow-hidden
"
        >
          <LookingForDriver
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setVehicleFound={setVehicleFound}
            setLookingForDriverPanel={setLookingForDriverPanel}
          />
        </div>

        <div
          ref={waitingForDriverpanelRef}
          className="
  fixed bottom-0 w-full z-10 bg-white
  translate-y-full
  h-[70vh] max-h-[70vh]
  overflow-hidden
"
        >
          <WaitingForDriver
            ride={ride}
            setVehicleFound={setVehicleFound}
            setWaitingForDriver={setWaitingForDriver}
            waitingForDriver={waitingForDriver}
            setWaitingForDriverPanel={setWaitingForDriverPanel}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
