import React from "react";
import { Link } from "react-router-dom";

import classes from "./Card.module.css";

const Card = props => {
  const style = {
    backgroundColor: props.backgroundColor
      ? props.backgroundColor
      : "rgba(0,0,0,0.58)",
    width: props.width,
    height: props.height,
    color: props.textColor,
    borderRadius: props.borderRadius
  };

  const linkStyle = {
    color: props.linkColor ? props.linkColor : "white",
    fontSize: "1.2rem",
    cursor: "pointer",
    textDecoration: "none"
  };

  let linkHandler = null;
  if (props.linkURL) {
    linkHandler = (
      <Link style={{ textDecoration: "none" }} to={props.linkURL}>
        {props.linkText ? (
          <p style={linkStyle}>{props.linkText}</p>
        ) : (
          <p style={linkStyle}>Läs mer</p>
        )}
        ;
      </Link>
    );
  }

  return (
    <div className={classes.Card} style={style}>
      {props.children}
      {linkHandler}
    </div>
  );
};

export default Card;
