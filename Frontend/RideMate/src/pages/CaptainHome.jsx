import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import CaptainDetails from "./CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useEffect, useContext } from "react";
import { SocketDataContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(false);
  const [confirmridePopupPanel, setconfirmridePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const ridePopupPanelRef = useRef(null);
  const confirmridePopupPanelRef = useRef(null);
  const { socket } = useContext(SocketDataContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!socket || !captain?._id) return;

    const updateLocation = () => {
      if (!navigator.geolocation) {
        console.log("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });

          console.log("Location sent");
        },
        (err) => {
          console.error("Location error:", err.message);
        },
        { enableHighAccuracy: true }
      );
    };

    updateLocation(); // 🔥 THIS triggers permission popup
    const interval = setInterval(updateLocation, 10000);

    return () => clearInterval(interval);
  }, [socket, captain?._id]);

  useEffect(() => {
    if (!socket || !captain?._id) return;

    console.log("🟢 Captain joining socket:", socket.id);

    // 🔗 Join socket (VERY IMPORTANT)
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    // 👂 Listen for new ride
    const onNewRide = (data) => {
      console.log("🚕 NEW RIDE RECEIVED:", data);

      setRide(data); // ✅ set ride
      setridePopupPanel(true); // ✅ open popup
    };

    socket.on("new-ride", onNewRide);

    return () => {
      socket.off("new-ride", onNewRide);
    };
  }, [socket, captain?._id]);

  async function confirmRide() {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("❌ No token found, redirecting to login");
      // optional redirect
      window.location.href = "/captain-login";
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setridePopupPanel(false);
      setconfirmridePopupPanel(true);
    } catch (error) {
      console.error(
        "Confirm ride failed:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        window.location.href = "/captain-login";
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("❌ Captain not logged in");
      window.location.href = "/captain-login";
    }
  }, []);

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
        <LiveTracking />
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
          ride={ride}
          setridePopupPanel={setridePopupPanel}
          setconfirmridePopupPanel={setconfirmridePopupPanel}
          confirmRide={confirmRide}
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
          ride={ride}
          setconfirmridePopupPanel={setconfirmridePopupPanel}
          setridePopupPanel={setridePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
