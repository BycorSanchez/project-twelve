import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Slice extends Component {

    static propTypes = {
        item: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
        width: PropTypes.number.isRequired,
        onHover: PropTypes.func
    }

    static fullPolygon = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";

    state = {
        isHover: false,
        isSelected: false
    }

    hover = (isHover = true) => {
        const { data, onHover } = this.props;
        if (onHover){
            onHover(data);
        }
        this.setState({ isHover });
    };

    select = (isSelected = true) => this.setState({ isSelected });

    polygon = (i, width, offset = 0) => {
        const x1 = i * width;
        const x2 = (i + 1) * width;
        const x3 = (i - 1) * width;
        return `polygon(${x1 - offset}% 0, ${x2 + offset}% 0, ${x1 + offset}% 100%, ${x3 - offset}% 100%)`;
    }

    render() {
        const { data, item, width } = this.props;
        const { isHover, isSelected } = this.state;
        const polygon = isSelected ? Slice.fullPolygon : this.polygon(item, width, isHover ? (width / 4) : 0);

        return (
            <div
                className={classnames("slice", { "slice-front": (isHover || isSelected) })}
                style={{
                    clipPath: polygon,
                    WebkitClipPath: polygon,
                    backgroundImage: `url(${data.url})`,
                }}
                onMouseEnter={() => this.hover()}
                onMouseOut={() => this.hover(false)}
                onClick={() => this.select()}
            />
        );
    }
}

export default Slice;