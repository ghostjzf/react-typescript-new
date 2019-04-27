import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import "./style.scss";

@observer
class Logo extends Component {
  render() {
    return (
      <div className="app-brand-root">
        <Link to="/" className="app-logo">
          System Name At Here
        </Link>
      </div>
    );
  }
}

export default Logo;
