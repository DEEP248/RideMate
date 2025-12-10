import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A higher-order component that wraps its children in a protected route.
 * If there is no token stored in local storage, it will redirect to the login page.
 * @param {ReactNode} children - The children of the component.
 * @returns {ReactNode} - The protected route with the children wrapped inside it.
 */
/*******  1632de9c-6328-480e-826b-c90e4c7f4bcd  *******/
const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  },[token]);

  return <>{children}</>;
};

export default UserProtectedWrapper;
