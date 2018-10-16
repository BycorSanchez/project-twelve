import './RotableText.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RotableText extends Component {

    static propTypes = {
        options: PropTypes.array.isRequired,
        start: PropTypes.number,
        timeout: PropTypes.number,
        mode: PropTypes.oneOf(["manual", "auto", "loop"])
    }

    static defaultProps = {
        start: 0,
        timeout: 2,
        mode: "manual"
    }

    state = {
        selected: this.props.start
    }

    componentDidMount() {
        this._autoUpdate();
    }

    _selectedItem() {
        return (this.props.mode === "manual") ? this.props.start : this.state.selected;
    }

    _autoUpdate() {
        setTimeout(this._update.bind(this), this.props.timeout * 1000);
    }

    _update() {
        const { mode, options } = this.props;
        const { selected } = this.state;
        let next = selected + 1;

        if (mode === "loop" || (mode === "auto" && next < options.length)) {
            this.setState({ selected: next % options.length });
            this._autoUpdate();
        }
    }

    render() {
        const { options } = this.props;
        let selected = this._selectedItem();

        return (
            <div className="rotable-text">
                <div
                    className="options"
                    style={{
                        transform: "translate(0, " + (selected * -1.2) + "em)"
                    }}
                >
                    {
                        options &&
                        options.map((text, index) => (
                            <span key={index}>{text}</span>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default RotableText