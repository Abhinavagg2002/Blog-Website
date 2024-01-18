import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import EmptyParkingSlot from "components/forms/EmptyParkingSlot";

export default () => {
  return (
    <AnimationRevealPage>
      <Header/>
      <EmptyParkingSlot/>
    </AnimationRevealPage>
  );
};
