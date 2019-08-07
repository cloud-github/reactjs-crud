import React from "react";
import { Switch, Route } from "react-router";
import Home from "./containers/macros";
import About from "./containers/about";
import Services from "./containers/services";
import Skills from "./containers/skills";
import Experiences from "./containers/experiences";
import Portfolio from "./containers/portfolio";
import Blog from "./containers/blog";
import Contacts from "./containers/contacts";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/services" component={Services} />
    <Route exact path="/skills" component={Skills} />
    <Route exact path="/experiences" component={Experiences} />
    <Route exact path="/portfolio" component={Portfolio} />
    <Route exact path="/blog" component={Blog} />
    <Route exact path="/contacts" component={Contacts} />
  </Switch>
);

export default Routes;
