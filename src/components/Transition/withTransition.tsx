import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import { CSSTransitionProps } from "./types";

const events = ["onEntering", "onEntered", "onExiting", "onExited"];

export default function withTransition(defaultProps: CSSTransitionProps) {
  return class Transition extends React.Component<Partial<CSSTransitionProps>> {
    static defaultProps = {
      timeout: 600,
      unmountOnExit: true,
      addEndListener: (node, done) => {
        const onTransitionEnd = ev => {
          node.removeEventListener("transitionend", onTransitionEnd, false);

          if (ev.target === node) {
            done();
          }
        };

        node.addEventListener("transitionend", onTransitionEnd, false);
      },
      ...defaultProps
    };

    transitionEvents = events.reduce((props, name) => {
      props[name] = (...args) => {
        this[name](...args);
        if (this.props[name]) {
          this.props[name](...args);
        }
      };
      return props;
    }, {});

    onEntering = node => {
      if (node) {
        node.style.transitionDuration = node.style.WebkitTransitionDuration = node.style.MozTransitionDuration =
          this.props.timeout + "ms";
      }
    };

    onEntered = node => {
      if (node) {
        node.style.transitionDuration = node.style.WebkitTransitionDuration = node.style.MozTransitionDuration =
          "";
      }
    };

    onExiting = this.onEntering;
    onExited = this.onEntered;

    render() {
      const { children, timeout, classNames, ...props } = this.props;

      return (
        <CSSTransition
          timeout={timeout!}
          classNames={classNames!}
          {...props}
          {...this.transitionEvents}
        >
          {children}
        </CSSTransition>
      );
    }
  };
}
