import React, { Component } from "react";
import { Provider, observer } from "mobx-react";
import { HashRouter } from "react-router-dom";
import App from "./App";
import UI from "stores/ui";
import Security from "stores/security";
import { hot } from "react-hot-loader";
import "./style.scss";

const stores = { UI, Security };

@observer
class Root extends Component {
  render() {
    return (
      <div className="app">
        <Provider {...stores}>
          <HashRouter>
            <App />
          </HashRouter>
        </Provider>
      </div>
    );
  }
}

export default hot(module)(Root);
