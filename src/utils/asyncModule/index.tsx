import React, { Component } from "react";
import Loading from "components/Loading";
import ErrorBox from "components/ErrorBox";

interface IAsyncModuleState {
  loading: boolean;
  error: any;
  component: any;
}

/*!
 * const AsyncComponent = asyncModule(() => import('xxx'), 'ModuleName');
 */
function asyncModule(loader: () => Promise<any>, name: string) {
  return class AsyncModule extends Component<any, IAsyncModuleState> {
    readonly state = {
      loading: true
    } as IAsyncModuleState;

    public componentDidMount() {
      this.tryLoad();
    }

    tryLoad = async () => {
      this.setState({
        loading: true
      });

      try {
        const allModules = await loader();

        if (allModules[name]) {
          this.setState({
            component: allModules[name]
          });
        } else {
          throw new Error(`未找到 “${name}” 对应的组件！`);
        }
      } catch (error) {
        this.setState({
          error
        });
      }

      this.setState({
        loading: false
      });
    };

    render() {
      const { loading, error, component: TheComponent } = this.state;

      if (loading) {
        return <Loading />;
      }

      if (error) {
        return <ErrorBox error={error} onClick={this.tryLoad} />;
      }

      return <TheComponent {...this.props} />;
    }
  };
}

export default asyncModule;
