import React, { Component } from "react";
import { Menu, Icon, Layout } from "antd";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import "./style.scss";

// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;

interface IProps extends RouteComponentProps {
  menus: any[];
  parentPath: string;
}

class MySider extends Component<IProps> {
  renderMenus = () => {
    const { menus, parentPath } = this.props;

    return (
      menus &&
      menus.length > 0 &&
      menus.map((item: any) => {
        return (
          <Menu.Item key={`${parentPath}${item.path}`}>
            <NavLink to={`${parentPath}${item.path}`}>
              <Icon type="appstore" />
              {item.title}
            </NavLink>
          </Menu.Item>
        );
      })
    );
  };

  getDefaultSelectKeys = () => {
    const { menus, parentPath } = this.props;

    return `${parentPath}${menus[0].path}`;
  };

  getSelectKeys = () => {
    const keys = this.props.location.pathname;

    return keys;
  };

  render() {
    return (
      <Sider className="app-sider">
        <Menu
          style={{ width: 256 }}
          mode="inline"
          defaultSelectedKeys={[this.getDefaultSelectKeys()]}
          selectedKeys={[this.getSelectKeys()]}
        >
          {this.renderMenus()}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(MySider);
