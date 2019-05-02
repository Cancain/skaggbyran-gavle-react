import React from "react";

import classes from "./Card.module.css";

const Card = props => {
  const style = {
    width: props.width,
    height: props.height,
    color: props.textColor,
    borderRadius: props.borderRadius
  };

  return (
    <div className={classes.Card} style={style}>
      {props.children}
    </div>
  );
};

export default Card;
