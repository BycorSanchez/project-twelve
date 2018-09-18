import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Slice = props => {
    const { item, width, isHover, onHover, onClick } = props;
    const offset = isHover ? (width / 4) : 0;

    return (
        <div
            className={classnames("slice", { "slice-hover": isHover })}
            style={polygonShape(item, width, offset)}
            onMouseEnter={() => onHover(item)}
            onClick={() => onClick(item)}
        />
    );
}

const polygonShape = (i, width, offset = 0) => {
    const x1 = i * width;
    const x2 = (i + 1) * width;
    const x3 = (i - 1) * width;
    return ({ "clipPath": "polygon(" + (x1 - offset) + "% 0," + (x2 + offset) + "% 0," + (x1 + offset) + "% 100%, " + (x3 - offset) + "% 100%)" });
}

Slice.propTypes = {
    item: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    isHover: PropTypes.bool.isRequired,
    onHover: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Slice;