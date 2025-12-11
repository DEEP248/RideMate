import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import UserContextProvider from "./context/UserContextProvider";
import HomePage from "./pages/HomePage.jsx";
import UserLogout from "./pages/UserLogout.jsx";
import UserProtectedWrapper from "./pages/UserProtectedWrapper.jsx";
import CaptainContextProvider from "./context/CaptainContextProvider.jsx";
import CaptainHome from "./pages/CaptainHome.jsx";
import CaptainProtectWrapper from "./pages/CaptainProtectedWrapper.jsx";
import CaptainLogout from "./pages/CaptainLogout.jsx";
const App = () => {
  return (
    <div>
      <CaptainContextProvider>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/captain-login" element={<CaptainLogin />} />
            <Route path="/captain-signup" element={<CaptainSignup />} />
            <Route
              path="/home"
              element={
                <UserProtectedWrapper>
                  <HomePage />
                </UserProtectedWrapper>
              }
            />
            <Route
              path="/user/logout"
              element={
                <UserProtectedWrapper>
                  <UserLogout />
                </UserProtectedWrapper>
              }
            />
            <Route
              path="/captain-home"
              element={
                <CaptainProtectWrapper>
                  <CaptainHome />
                </CaptainProtectWrapper>
              }
            />
            <Route
              path="/captain/logout"
              element={
                <CaptainProtectWrapper>
                  <CaptainLogout />
                </CaptainProtectWrapper>
              }
            />
          </Routes>
        </UserContextProvider>
      </CaptainContextProvider>
    </div>
  );
};

export default App;