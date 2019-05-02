import React from "react";
import style from "./Layout.module.css";

import Header from "../Header/Header";
import Content from "../Content/Content";
import MobileMenuBtn from "../../Components/UI/MobileMenuBtn/MobileMenuBtn";

function Layout() {
  return (
    <div className={style.Layout}>
      <Header />
      <Content />
      <MobileMenuBtn
        backgroundColor="#5681A0"
        color="white"
        clicked={event => console.log("clicked")}
      />
    </div>
  );
}

export default Layout;
