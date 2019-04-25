import React, { Component } from "react";
import { Layout } from "antd";
import Logo from "../Logo";
// import { Menu, Icon, Layout } from "antd";
import "./style.scss";

const { Header } = Layout;

class MyHeader extends Component {
  render() {
    return (
      <Header className="app-header">
        <Logo />

        {/* <Menu mode="horizontal">
          <Menu.Item key="mail">
            <Icon type="mail" />
            Navigation One
          </Menu.Item>
          <Menu.Item key="app" disabled>
            <Icon type="appstore" />
            Navigation Two
          </Menu.Item>
        </Menu> */}
      </Header>
    );
  }
}

export default MyHeader;
