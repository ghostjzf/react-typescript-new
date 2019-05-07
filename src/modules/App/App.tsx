import React, { Component } from "react";
import {
  withRouter,
  Switch,
  Route,
  RouteComponentProps
} from "react-router-dom";
import { Layout } from "antd";
import Header from "./layout/Header";
// import Sider from "./layout/Sider";
import Time from "./layout/Time";
import ErrorBox from "components/ErrorBox";

import VIP from "modules/VIP";
import Staff from "modules/Staff";

const { Footer } = Layout;
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
        <Route path="/:module(example)" component={VIP} />
        <Route path="/:module(staff)" component={Staff} />
      </Switch>
    );
  }

  render() {
    return (
      <Layout className="app-layout-root">
        <Header />
        {this.renderRoutes()}
        <Footer className="app-footer">
          <Time />
          <br />
          ©React Production {curYear}, Created by Jiangzhifeng.
        </Footer>
      </Layout>
    );
  }
}

export default withRouter(App);
