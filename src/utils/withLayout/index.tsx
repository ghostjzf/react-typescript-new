import React, { Component } from "react";

const withLayout = (WrappedComponent: any) => {
  return class extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return <WrappedComponent {...this.props} a={2} />;
    }
  };
};

export default withLayout;
