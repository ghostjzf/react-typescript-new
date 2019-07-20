import React, { Component } from "react";
import { Layout, Menu, Dropdown, Avatar, Icon } from "antd";
import Logo from "../Logo";
import TopMenus from "../Menus";
import Security from "stores/security";
// import { Menu, Icon, Layout } from "antd";
import "./style.scss";

const { Header } = Layout;

// @ts-ignore
class MyHeader extends Component {
    logout = () => {
        console.log("log out");
    };

    render() {
        const { currentUser } = Security;

        const menu = (
            <Menu>
                <Menu.Item onClick={this.logout}>退出登录</Menu.Item>
            </Menu>
        );

        return (
            <Header className="app-header">
                <Logo />

                <div className="app-header-menu">
                    <TopMenus />
                </div>

                {true ? (
                    <Dropdown overlay={menu} className="app-user">
                        <div>
                            <Avatar icon="user" />
                            {currentUser}
                            <Icon type="down" />
                        </div>
                    </Dropdown>
                ) : (
                    <div>登录</div>
                )}
            </Header>
        );
    }
}

export default MyHeader;
