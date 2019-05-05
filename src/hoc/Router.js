import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../Containers/Pages/Home/Home";
import SinglePost from "../Containers/Pages/SinglePost/SinglePost";

const Router = props => {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/post/:id" exact component={SinglePost} />
      </Switch>
    </Fragment>
  );
};

export default Router;
