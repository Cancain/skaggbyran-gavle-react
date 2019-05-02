import React, { useEffect, useState } from "react";
import { wpInstance } from "../../Axios/Axios";

import Card from "../../../Components/Card/Card";

import style from "./Home.module.css";

const Home = props => {
  useState(() => {
    wpInstance
      .get()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  });

  return (
    <div className={style.Home}>
      <h1>Home</h1>
      <Card width="20%" height="20%">
        <h1>Card</h1>
        <p>This is a card</p>
      </Card>
    </div>
  );
};

export default Home;
