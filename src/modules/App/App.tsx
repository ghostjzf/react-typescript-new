import React, { Component } from "react";
import { Layout } from "antd";
import Header from "./layout/Header";
const { Footer, Sider, Content } = Layout;
import { inject } from "mobx-react";

@inject("UI")
class App extends Component<any> {
  render() {
    console.log(this.props.UI.siteName);

    return (
      <div>
        <Header />
        <Sider>111</Sider>
        <Content>222</Content>
        <Footer>333</Footer>
      </div>
    );
  }
}

export default App;
