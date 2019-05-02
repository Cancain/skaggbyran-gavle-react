import React from "react";

import style from "./Content.module.css";
import Router from "../../hoc/Router";

const Content = props => {
  return (
    <div className={style.Content}>
      <h1>Content</h1>
      <Router />
    </div>
  );
};

export default Content;
