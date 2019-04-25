import React, { Component } from "react";
import {
  withRouter,
  Switch,
  Route,
  RouteComponentProps
} from "react-router-dom";
import { Layout } from "antd";
import Header from "./layout/Header";
import Time from "./layout/Time";
import ErrorBox from "components/ErrorBox";
import VIP from "modules/VIP";
import Staff from "modules/Staff";

const { Footer, Sider, Content } = Layout;

const curYear = new Date().getFullYear();

class App extends Component<RouteComponentProps> {
  state = {
    loading: false,
    error: null
  };

  renderRoutes() {
    const { error } = this.state;

    if (error) {
      return <ErrorBox title={"貌似您的登录有异常"} error={error} />;
    }

    return (
      <Switch>
        <Route path="/:module(am)" component={VIP} />
        <Route path="/:module(om)" component={Staff} />
      </Switch>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <Sider>111</Sider>
        <Content>{}</Content>
        <Footer className="app-footer">
          <Time />
          <br />
          ©React Production {curYear}, Created by Jiangzhifeng.
        </Footer>
      </div>
    );
  }
}

export default withRouter(App);
