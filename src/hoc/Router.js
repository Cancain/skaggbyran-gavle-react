import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../Containers/Pages/Home/Home";
import SinglePost from "../Containers/Pages/Home/SinglePost/SinglePost";
import Portfolio from "../Containers/Pages/Portfolio/Portfolio";

const Router = props => {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/post/:id" exact component={SinglePost} />
        <Route path="/portfolio" exact component={Portfolio} />
      </Switch>
    </Fragment>
  );
};

export default Router;
