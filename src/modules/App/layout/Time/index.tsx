import React, { Component } from "react";
import moment from "moment";
import "./style.scss";

class Time extends Component {
  timer: any;

  public componentDidMount() {
    this.timer = setTimeout(() => this.forceUpdate(), 30 * 1000);
  }

  public componentWillUnmount() {
    clearTimeout(this.timer);
  }

  public render() {
    return <span className="footer-time-root">{moment().format("LLLL")}</span>;
  }
}

export default Time;
