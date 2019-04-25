import { Component } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";

/**
 * <Echarts onInit={dom => this.props.echarts.init(dom)}>
 *      <div className="my-chart"></div>
 * </Echarts>
 */
class Echarts extends Component {
  static propTypes = {
    onInit: PropTypes.func.isRequired
  };

  componentDidMount() {
    const dom = findDOMNode(this);
    const chart = this.props.onInit(dom);

    if (chart) {
      this.chart = chart;
    }
  }

  componentWillUnmount() {
    this.chart && this.chart.despose();
  }

  render() {
    return this.props.children;
  }
}

export default Echarts;
