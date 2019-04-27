import React, { Component } from "react";
import { Menu } from "antd";
import { withRouter, RouteComponentProps, NavLink } from "react-router-dom";
import { modulePages } from "stores/menus";

class Menus extends Component<RouteComponentProps> {
  onNavigateTab = ev => {
    this.props.history.push(ev.key);
  };

  getSelectKeys = () => {
    const keys = this.props.location.pathname.split("/")[1];

    return "/" + keys;
  };

  render() {
    return (
      <Menu
        mode="horizontal"
        onClick={this.onNavigateTab}
        selectedKeys={[this.getSelectKeys()]}
      >
        {modulePages.map(item => {
          return (
            <Menu.Item key={item.path}>
              <NavLink to={item.path}>{item.title}</NavLink>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}

export default withRouter(Menus);
