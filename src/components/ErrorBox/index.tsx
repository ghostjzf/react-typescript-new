import React, { Component } from "react";
import { Button, Icon, Typography } from "antd";
import "./style.scss";

class ErrorBox extends Component<{
  title?: string;
  error?: any;
  onClick?(): void;
}> {
  render() {
    const { title, error } = this.props;
    const msg = error instanceof Error ? error.message : error;

    return (
      <div className="site-error">
        <Icon type="frown" theme="filled" />
        {title && <h4 className="error-title">{title}</h4>}
        <div className="error-msg">
          <Typography.Text mark>{msg}</Typography.Text>
        </div>
        {this.props.onClick && (
          <Button
            className="error-btn"
            type="primary"
            onClick={this.props.onClick}
          >
            Retry
          </Button>
        )}
      </div>
    );
  }
}

export default ErrorBox;
