import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get token safely
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/captain-login");
      return;
    }

    // Hit logout API ONCE (no repeated re-renders)
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/captain-login");
        }
      })
      .catch(() => {
        // Even if token is invalid → clean logout anyway
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
  }, []);

  return <div>CaptainLogout</div>;
};

export default CaptainLogout;