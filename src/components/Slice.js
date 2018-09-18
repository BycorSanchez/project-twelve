import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Slice = props => {
    const { image, item, isHover, isSelected, onHover, onClick } = props;
    const polygon = clipPath(props);

    return (
        <div
            className={classnames("slice", { "slice-front": (isHover || isSelected) })}
            style={{
                clipPath: polygon,
                WebkitClipPath: polygon
            }}
            onMouseEnter={() => onHover(item)}
            onClick={() => onClick(item)}
        >
            <img src={image.url} alt={image.alt}/>
        </div>
    );
}

const clipPath = (props) => {
    const { item, width, isSelected, isHover } = props;
    return isSelected ? fullscreen() : polygon(item, width, isHover ? (width / 4) : 0);
}

const polygon = (i, width, offset = 0) => {
    const x1 = i * width;
    const x2 = (i + 1) * width;
    const x3 = (i - 1) * width;
    return `polygon(${x1 - offset}% 0, ${x2 + offset}% 0, ${x1 + offset}% 100%, ${x3 - offset}% 100%)`;
}

const fullscreen = () => "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";

Slice.propTypes = {
    item: PropTypes.number.isRequired,
    image: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    isHover: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onHover: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Slice;