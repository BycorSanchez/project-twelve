import styles from "../styles/Front.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Slice from "./Slice";
import Rotable from "./Rotable";
import Clock from "./Clock";
import classnames from "classnames";
import pexels from "../images/pexels.png";

class Front extends Component {
  static propTypes = {
    dataList: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onDeselect: PropTypes.func.isRequired,
    isMobile: PropTypes.bool
  };

  static defaultProps = {
    isMobile: false
  };

  state = {
    current: undefined,
    isSelected: false
  };

  _onHover = item => {
    if (!this.state.isSelected){
      this.setState({ current: item });
    }
  }

  _onSelect = item => {
    this.setState({ current: item, isSelected: true });
    this.props.onSelect(item);
  }

  _onDeselect = () => {
    this.setState({ current: undefined, isSelected: false });
    this.props.onDeselect();
  }

  render() {
    const { dataList, isMobile } = this.props;
    const { current, isSelected } = this.state;

    const width = 100 / (dataList.length - 1);
    const data = isSelected ? dataList[current] : undefined;

    return (
      <section className={styles.front}>
        {/* Overlapped information */}
        <div
          className={classnames(styles.frontInfo, styles.overlap, {
            [styles.noInteraction]: !isSelected
          })}
        >
          <h1>
            <span className={styles.title}>Memories of</span>
            <Rotable
              current={current}
              options={dataList.map(d => d.title)}
            />
            {isSelected && (
              <span
                id={styles.clock}
                onClick={this._onDeselect}
                aria-label="Back to front"
              >
                <Clock />
              </span>
            )}
          </h1>

          <p>{isSelected ? data.description : "Select a memory"}</p>

          {isSelected && (
            <a
              className={[styles.arrow, styles.hideText].join(" ")}
              href="#gallery"
            >
              Next
            </a>
          )}
        </div>

        {/* Background slices */}
        <div className={styles.background}>
          {dataList &&
            dataList.map((data, index) => (
              <Slice
                key={index}
                item={index}
                width={width}
                image={data.url}
                isHover={index === current && !isSelected}
                isSelected={index === current && isSelected}
                type={isMobile ? "horizontal" : "vertical"}
                onHover={this._onHover}
                onSelect={this._onSelect}
              />
            ))}
        </div>
      </section>
    );
  }
}

export default Front;
