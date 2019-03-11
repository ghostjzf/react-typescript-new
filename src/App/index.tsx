import React, { Component } from "react";
import { Button } from "antd";
import withLayout from "../utils/withLayout";
import "./style.scss";

interface IProps {
  a?: number;
}

class App extends Component<IProps> {
  render() {
    return (
      <div className="app">
        Welcome To Use React!
        <img
          src="https://webpack.js.org/bf176a25b4f8227fea804854c98dc5e2.png"
          alt="logo"
        />
        <h3>{this.props.a!}</h3>
        <Button type="primary">antd Button</Button>
      </div>
    );
  }
}

export default withLayout(App);
