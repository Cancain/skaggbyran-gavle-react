import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../Containers/Pages/Home/Home";

const Router = props => {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Fragment>
  );
};

export default Router;
