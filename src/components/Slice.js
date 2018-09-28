import './Slice.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Slice extends Component {

    static propTypes = {
        item: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        onHover: PropTypes.func,
        onSelect: PropTypes.func
    }

    state = {
        isHover: false,
        isSelected: false
    }

    static fullPolygon = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";

    hover(isHover = true) {
        const { item, onHover } = this.props;
        this.setState({ isHover });

        if (isHover && onHover) {
            onHover(item);
        }
    };

    select(isSelected = true) {
        const { item, onSelect } = this.props;
        this.setState({ isSelected });

        if (isSelected && onSelect) {
            onSelect(item);
        }
    }

    anySelected() {
        return this.state.isSelected !== undefined && this.state.isSelected !== null;
    }

    polygon = (i, width, offset = 0) => {
        const x1 = i * width;
        const x2 = (i + 1) * width;
        const x3 = (i - 1) * width;
        return `polygon(${x1 - offset}% 0, ${x2 + offset}% 0, ${x1 + offset}% 100%, ${x3 - offset}% 100%)`;
    }

    render() {
        const { item, width, image } = this.props;
        const { isSelected, isHover } = this.state;
        const polygon = isSelected ? Slice.fullPolygon : this.polygon(item, width, isHover ? (width / 4) : 0);

        return (
            <div className={classnames("slice", { "slice-front": (isSelected || isHover) })}
                style={{
                    clipPath: polygon,
                    WebkitClipPath: polygon,
                    backgroundImage: `url(${image})`,
                }}
                onMouseEnter={() => this.hover()}
                onMouseOut={() => this.hover(false)}
                onClick={() => this.select()}
            >
            </div >
        );
    }
}

export default Slice;