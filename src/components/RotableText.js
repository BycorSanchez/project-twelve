import styles from "../styles/RotableText.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class RotableText extends Component {
    static propTypes = {
        options: PropTypes.array.isRequired,
        start: PropTypes.number,
        timeout: PropTypes.number,
        mode: PropTypes.oneOf(["manual", "auto", "loop"])
    };

    static defaultProps = {
        start: 0,
        timeout: 2,
        mode: "manual"
    };

    state = {
        selected: this.props.start
    };

    componentDidMount() {
        this._autoUpdate();
    }

    _selectedItem() {
        return this.props.mode === "manual"
            ? this.props.start
            : this.state.selected;
    }

    _autoUpdate() {
        setTimeout(this._update, this.props.timeout * 1000);
    }

    _update = () => {
        const { mode, options } = this.props;
        const selected = this.state.selected;
        let next = selected + 1;

        if (mode === "loop" || (mode === "auto" && next < options.length)) {
            this.setState({ selected: next % options.length });
            this._autoUpdate();
        }
    };

    render() {
        const options = this.props.options;
        let selected = this._selectedItem();

        return (
            <div className={styles.rotableText}>
                <TransitionGroup component="span" className={styles.options}>
                    <CSSTransition
                        classNames={{
                            appear: styles.option,
                            enter: styles.optionEnter,
                            enterActive: styles.optionEnterActive,
                            exit: styles.optionExit,
                            exitActive: styles.optionExitActive
                        }}
                        key={selected}
                        timeout={{ enter: 600, exit: 600 }}
                    >
                        <span>{options[selected]}</span>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        );
    }
}

export default RotableText;
