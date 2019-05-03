import React from "react";

import style from "./Sidedrawer.module.css";

const Sidedrawer = props => {
  let classes = [style.Sidedrawer, props.open ? style.Open : null];
  return <div className={classes.join(" ")}>{props.children}</div>;
};

export default Sidedrawer;
