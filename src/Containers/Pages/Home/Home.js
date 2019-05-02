import React, { useEffect, useState } from "react";
import { wpInstance } from "../../Axios/Axios";

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
    </div>
  );
};

export default Home;
