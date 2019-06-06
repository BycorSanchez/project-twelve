import React, { Component } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styles from "../styles/Rotable.module.css";

class Rotable extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    current: PropTypes.number,
    defaultValue: PropTypes.string
  };

  static defaultProps = {
    defaultValue: ""
  };

  render() {
    const { options, current, defaultValue } = this.props;

    return (
      <div className={styles.container}>
        <TransitionGroup component="span" className={styles.options}>
          <CSSTransition
            classNames={{
              appear: styles.option,
              enter: styles.optionEnter,
              enterActive: styles.optionEnterActive,
              exit: styles.optionExit,
              exitActive: styles.optionExitActive
            }}
            key={current}
            timeout={{ enter: 600, exit: 600 }}
          >
            <span>{current !== undefined ? options[current] : defaultValue}</span>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default Rotable;
