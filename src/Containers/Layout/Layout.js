import React, { useState } from "react";
import style from "./Layout.module.css";

import Header from "../Header/Header";
import Content from "../Content/Content";
import MobileMenuBtn from "../../Components/UI/MobileMenuBtn/MobileMenuBtn";
import Sidedrawer from "../Sidedrawer/Sidedrawer";
import Navigation from "../Navigation/Navigation";
function Layout() {
  const [sidedrawerOpen, setSidedrawerOpen] = useState(false);

  const sidedrawerHandler = sidedrawerState => {
    setSidedrawerOpen(sidedrawerState);
  };

  return (
    <div className={style.Layout}>
      <Header />
      <Sidedrawer open={sidedrawerOpen}>
        <Navigation />
      </Sidedrawer>
      <Content />
      <MobileMenuBtn
        backgroundColor="#5681A0"
        color="white"
        clicked={() => sidedrawerHandler(!sidedrawerOpen)}
      />
    </div>
  );
}

export default Layout;
