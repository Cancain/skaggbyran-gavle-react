import React from "react";

import classes from "./MobileMenuBtn.module.css";

const MobileMenuBtn = props => {
  const style = {
    backgroundColor: props.backgroundColor,
    width: props.width,
    height: props.height
  };

  const lineStyle = {
    backgroundColor: props.color
  };
  return (
    <div
      className={classes.MobileMenuBtn}
      style={style}
      onClick={props.clicked}
    >
      <div className={classes.Circle1} style={lineStyle} />
      <div className={classes.Circle2} style={lineStyle} />
      <div className={classes.Circle2} style={lineStyle} />
    </div>
  );
};

export default MobileMenuBtn;
