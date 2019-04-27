import React, { Component } from "react";
import { Menu, Icon, Layout } from "antd";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";
import Menus from "stores/menus";
import "./style.scss";

// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;

@observer
class MySider extends Component {
  renderMenus = () => {
    const data = Menus.menus;
    const parentPath = Menus.moduleId ? `/${Menus.moduleId}` : "";

    return (
      data &&
      data.length > 0 &&
      data.map((item: any) => {
        return (
          <Menu.Item key={item.path}>
            <NavLink to={`${parentPath}${item.path}`}>
              <Icon type="appstore" />
              {item.title}
            </NavLink>
          </Menu.Item>
        );
      })
    );
  };

  render() {
    return (
      <Sider className="app-sider">
        <Menu style={{ width: 256 }} mode="inline">
          {this.renderMenus()}
        </Menu>
      </Sider>
    );
  }
}

export default MySider;
