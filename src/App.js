import React from "react";
import GlobalStyles from './styles/GlobalStyles';
import { css } from "styled-components/macro"; //eslint-disable-line
import SaaSProductLandingPage from "./demos/SaaSProductLandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import NumberPlate from "./pages/NumberPlate";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProfileThreeColGrid from "./components/cards/ProfileThreeColGrid";
//import Dashboard2 from "Dashboard_2/Dashboard2";
import ProfilePage from "./pages/Profile/ProfilePage";
import ParkingSlot from "./pages/ParkingSlot";
import AccidentDetection from "./components/forms/AccidentDetection";
export default function App() {
  return (
    <>
      <GlobalStyles />
        <Routes>
          <Route path = "/" element = {<SaaSProductLandingPage/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/signup" element = {<Signup/>}/>
          <Route path = "/contact" element = {<ContactUs/>}/>
          <Route path = "/numplate" element = {<NumberPlate/>}/>
          <Route path = "/accidentdetect" element = {<AccidentDetection/>}/>
          <Route path = "/parkslot" element = {<ParkingSlot/>}/>
          <Route path="terms" element = {<TermsOfService/>}/>
          <Route path="privacy" element = {<PrivacyPolicy/>}/>
          <Route path="team" element = {<ProfileThreeColGrid/>}/>
          
          <Route path = "profile" element = {<ProfilePage/>}/>
        </Routes>
    </>
  );
}
