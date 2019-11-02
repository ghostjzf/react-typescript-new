import React, { Component } from 'react';

class TestA extends Component {
  onChange(ev) {
    console.log(ev.target.value);
  }

  onSubmit = ev => {
    console.log((this.props as any).$formutil);
    console.log(ev);
  };

  render() {
    return <div>111</div>;
  }
}

export default TestA;
