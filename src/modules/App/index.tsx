import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Provider, observer } from "mobx-react";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import UI from "stores/ui";
import Security from "stores/security";
import "./style.scss";

const stores = { UI, Security };

@observer
class Root extends Component {
  render() {
    return (
      <div className="app">
        <Provider {...stores}>
          <Router>
            <App />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default hot(module)(Root);
