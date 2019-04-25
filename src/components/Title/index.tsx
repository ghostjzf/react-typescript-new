import { Component } from "react";
import ui from "stores/ui";

interface ITitleProps {
  title: string;
}

class Title extends Component<ITitleProps> {
  preTitle: string;

  componentDidMount() {
    this.preTitle = document.title;

    ui.setTitle(this.props.title);
  }

  componentWillUnmount() {
    // document.title = this.preTitle;
  }

  render() {
    return null;
  }
}

export default Title;
