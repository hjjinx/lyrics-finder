import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Search from "./Search";
import Lyrics from "./Lyrics";
import Results from "./Results.js";
import * as serviceWorker from "./serviceWorker";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <Search />
    <Switch>
      <Route exact path="/search/:track/" component={Results} />
      <Route exact path="/lyrics/:id/" component={Lyrics} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
