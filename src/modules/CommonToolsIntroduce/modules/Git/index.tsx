import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Git extends Component {
  state = {
    name: ''
  };
  componentDidMount() {}

  onSubmit = ev => {
    ev.preventDefault();

    console.log(ev);
  };

  render() {
    return <div>Git</div>;
  }
}

export default hot(module)(Git);
