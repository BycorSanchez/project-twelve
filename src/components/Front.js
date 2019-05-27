import React, { Component } from "react";
import PropTypes from "prop-types";
import Slice from "./Slice";
import Rotable from "./Rotable";
import classnames from "classnames";
import styles from "../styles/Front.module.css";
import backIcon from "../images/back1.svg";
import backIconHover from "../images/back2.svg";

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
    if (!this.state.isSelected) {
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
    const titles = dataList.map(d => d.title);

    return (
      <section className={styles.front}>
        {/* Overlapped information */}
        <div
          className={classnames(styles.frontInfo, styles.overlap, {
            [styles.noInteraction]: !isSelected
          })}
        >
          <h1>
            <span className={styles.title}>Discover</span>
            <Rotable
              current={current}
              options={titles}
              defaultValue="Countries"
            />
            {isSelected && (
              <button
                className={styles.back}
                onClick={this._onDeselect}
                title="Back"
                aria-label="Back"
              >
                <object
                  type="image/svg+xml"
                  data={backIcon}
                  id={styles.backIcon}
                  className={styles.icon}
                >
                  Back
                </object>
                <object
                  type="image/svg+xml"
                  data={backIconHover}
                  id={styles.backIconHover}
                  className={styles.icon}
                >
                  Back
                </object>
              </button>
            )}
          </h1>

          <h2>{isSelected ? data.description : "Select a country"}</h2>

          {isSelected && (
            <a
              className={[styles.arrow, styles.hideText].join(" ")}
              href="#gallery"
            >Next</a>
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
                image={data.src}
                isHover={index === current && !isSelected}
                isSelected={index === current && isSelected}
                type={isMobile ? "horizontal" : "vertical"}
                onHover={this._onHover}
                onSelect={this._onSelect}
                ariaLabel={data.title}
              />
            ))}
        </div>
      </section>
    );
  }
}

export default Front;
