import styles from "../styles/Slice.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class Slice extends Component {
  static propTypes = {
    item: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    isHover: PropTypes.bool,
    isSelected: PropTypes.bool,
    onHover: PropTypes.func,
    onSelect: PropTypes.func,
    type: PropTypes.oneOf(["vertical", "horizontal"])
  };

  static defaultProps = {
    isHover: false,
    isSelected: false,
    type: "vertical"
  };

  _callListener(func, item) {
    if (func) func(item);
  }

  _polygon = (i, width, offset = 0) => {
    const p1 = i * width - offset;
    const p3 = i * width + offset;
    const p2 = (i + 1) * width + offset;
    const p4 = (i - 1) * width - offset;
    return this._polygonOf(p1, p2, p3, p4);
  };

  _fullPolygon() {
    return this._polygonOf(0, 100, 100, 0);
  }

  _polygonOf(...points) {
    if (points.length !== 4) return undefined;
    return this.props.type === "vertical"
      ? this._verticalPolygon(points)
      : this._horizontalPolygon(points);
  }

  _verticalPolygon(points) {
    return `polygon(${points[0]}% 0, ${points[1]}% 0, ${points[2]}% 100%, ${points[3]}% 100%)`;
  }

  _horizontalPolygon(points) {
    return `polygon(0 ${points[0]}%, 0 ${points[1]}%, 100% ${points[2]}%, 100% ${points[3]}%)`;
  }

  render() {
    const { item, width, image, isSelected, isHover } = this.props;
    const polygon = isSelected
      ? this._fullPolygon()
      : this._polygon(item, width, isHover ? width / 4 : 0);

    return (
      <div
        className={classnames(styles.slice, {
          [styles.focus]: isSelected || isHover
        })}
        style={{
          clipPath: polygon,
          WebkitClipPath: polygon,
          backgroundImage: `url(${image})`
        }}
        onMouseEnter={() => this._callListener(this.props.onHover, item)}
        onClick={() => this._callListener(this.props.onSelect, item)}
      />
    );
  }
}

export default Slice;
