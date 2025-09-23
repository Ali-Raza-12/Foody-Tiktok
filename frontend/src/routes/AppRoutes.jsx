import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "../pages/auth/UserLogin";
import UserRegister from "../pages/auth/UserRegister";
import PartnerLogin from "../pages/auth/PartnerLogin";
import PartnerRegister from "../pages/auth/PartnerRegister";
import Home from "../pages/dashboard/Home";
import Profile from "../pages/userScreens/Profile";
import CreateFood from "../pages/userScreens/CreateFood";
import EditProfile from "../pages/UserScreens/editProfile";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/createFood" element={<CreateFood />} />
        <Route path="/user/editProfile" element={<EditProfile />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<PartnerRegister />} />
        <Route path="/food-partner/login" element={<PartnerLogin />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
