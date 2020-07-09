import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import UsersList from "./components/Users/UsersList";
import Posts from "./components/Posts/Posts";

const loading = (
  <div className="center">
    <p>Loading...</p>
  </div>
);

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/"
              name="Home Page"
              render={(props) => <Home {...props} />}
            />
            <Route
              exact
              path="/users"
              name="Users List Page"
              render={(props) => <UsersList {...props} />}
            />
            <Route
              exact
              path="/posts"
              name="Posts List"
              render={(props) => <Posts {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
