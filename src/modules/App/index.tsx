import React, { Component } from "react";
import { Provider, observer } from "mobx-react";
import { BrowserRouter } from "react-router-dom";
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
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default Root;
