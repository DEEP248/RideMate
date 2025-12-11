import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If token missing → no API call → clean redirect
    if (!token) {
      navigate("/login");
      return;
    }

    const verifyUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Valid token → set user & continue
        setUser(response.data);
      } catch (error) {
        // Block 401 logs
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []); // <-- Must be empty to avoid double API calls

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default UserProtectedWrapper;