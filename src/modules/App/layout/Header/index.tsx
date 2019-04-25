import React, { Component } from "react";
import { Menu, Icon, Layout } from "antd";

const { Header } = Layout;

class MyHeader extends Component {
  render() {
    return (
      <Header>
        <Menu mode="horizontal">
          <Menu.Item key="mail">
            <Icon type="mail" />
            Navigation One
          </Menu.Item>
          <Menu.Item key="app" disabled>
            <Icon type="appstore" />
            Navigation Two
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default MyHeader;
