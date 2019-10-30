import React from 'react';
import { Layout } from 'antd';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import Sider from './Sider';

const { Content } = Layout;

interface IState {
  routes: any;
  error: any;
  loading: boolean;
}

// 解析路由配置
function parseRoutes(config, allComps) {
  return config.reduce((ret, item) => {
    if (item.children) {
      return ret.concat(parseRoutes(item.children, allComps));
    }

    if (!item.component && item.componentName) {
      item.component = allComps[item.componentName];

      console.log(
        item.component,
        `页面地址 ${item.path} 的路由配置中的 {componentName: "${item.componentName}"} 所对应的组件貌似没有导出！`
      );
    }

    if (item.component) {
      item.component = allComps[item.component];

      return ret.concat(item);
    }

    return ret;
  }, []);
}

function createModule(config, moduleId, loader): React.ComponentClass {
  let parsedRoutes: any = null;

  return class ModulePages extends React.Component<
    RouteComponentProps,
    IState
  > {
    readonly state = {
      routes: parsedRoutes,
      loading: !parsedRoutes
    } as IState;

    public componentDidMount() {
      if (!this.state.routes) {
        this.tryLoad();
      }
    }

    // 异步载入所有组件导出
    tryLoad = async () => {
      this.setState({
        loading: true
      });

      try {
        const allComps = loader ? await loader() : {};

        const routes = (parsedRoutes = parseRoutes(config, allComps));

        this.setState({
          routes
        });
      } catch (error) {
        this.setState({
          error
        });
      }

      this.setState({
        loading: false
      });
    };

    public render() {
      const { routes, loading } = this.state;
      const { url } = this.props.match;

      if (loading) {
        return 'loading...';
      }

      return (
        <Layout>
          <Sider menus={config} parentPath={this.props.match.url} />
          <Content className="app-content">
            <Switch>
              {routes.map(item => {
                return (
                  <Route
                    path={`${url}${item.path}`}
                    exact={item.exact}
                    key={item.path}
                    component={item.component}
                  />
                );
              })}
              <Redirect to={`${url}${routes[0].path}`} />
            </Switch>
          </Content>
        </Layout>
      );
    }
  };
}

export default createModule;
