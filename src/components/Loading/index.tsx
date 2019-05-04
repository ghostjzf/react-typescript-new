import React, { Component } from "react";
import { render as reactRender, unmountComponentAtNode } from "react-dom";
import { Icon } from "antd";
import Spin, { SpinProps } from "antd/lib/spin";
import classlist from "utils/classlist";
import "./style.scss";

const antIcon = <Icon type="loading" spin />;
let el: any;

/**
 * @descrition
 * 默认为半圆转圈式loading，其接收所有Spin组件所接受的属性
 *
 * 全局使用
 * Loading.global(boolean, tip);
 *
 * 例如：Loading.global(true, 'loading...');
 *       Loading.global(false);
 */
class Loading extends Component<SpinProps> {
  container: any;

  render() {
    return (
      <Spin
        indicator={antIcon}
        {...this.props}
        className={classlist("antd-loading-custom", this.props.className)}
      />
    );
  }

  static global = (isShow: boolean, message?: string) => {
    if (isShow) {
      el = document.createElement("div");
      document.body.appendChild(el);

      reactRender(<div className="global-loading">{message}</div>, el);
    } else {
      unmountComponentAtNode(el);

      document.body.removeChild(el);
    }
  };
}

export default Loading;
