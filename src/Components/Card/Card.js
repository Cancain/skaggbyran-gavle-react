import React from "react";
import Link from "../UI/RouterLink/RouterLink";

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

  let linkHandler = null;
  if (props.linkURL) {
    linkHandler = (
      <Link
        to={props.linkURL}
        text={props.linkText ? props.linkText : "Läs mer"}
        color={props.linkColor ? props.linkColor : "white"}
        fontSize="1.3rem"
      />
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
