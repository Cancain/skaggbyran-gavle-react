import React from "react";
import { Link } from "react-router-dom";

import classes from "./RouterLink.module.css";

const RouterLink = props => {
  const linkStyle = {
    color: props.color,
    fontSize: props.fontSize
  };

  const link = (
    <Link className={classes.RouterLink} style={linkStyle} to={props.to}>
      {props.text}
    </Link>
  );
  const buttonStyle = {
    color: props.color,
    fontSize: props.fontSize,
    border: props.border ? props.border : "1px solid black",
    backgroundColor: props.backgroundColor
      ? props.backgroundColor
      : "rgba(0,0,0,3)"
  };

  const button = (
    <div style={buttonStyle} className={classes.Button}>
      {link}
    </div>
  );

  if (props.isButton) {
    return button;
  }

  return link;
};

export default RouterLink;
