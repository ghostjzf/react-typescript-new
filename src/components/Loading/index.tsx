import React, { Component } from "react";
import { Icon } from "antd";
import Spin, { SpinProps } from "antd/lib/spin";
import classlist from "utils/classlist";
import Toast from "components/Toast";
import "./style.scss";

const antIcon = <Icon type="loading" spin />;

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
  render() {
    return (
      <Spin
        indicator={antIcon}
        {...this.props}
        className={classlist("antd-loading-custom", this.props.className)}
      />
    );
  }

  static global = Toast.loading;
}

export default Loading;
