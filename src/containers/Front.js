import styles from "../styles/Front.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Slice from "../components/Slice";
import Rotable from "../components/RotableText";
import Clock from "../components/Clock";
import classnames from "classnames";
import pexels from "../images/pexels.png";

class Front extends Component {
    static propTypes = {
        dataList: PropTypes.array.isRequired,
        onSelect: PropTypes.func.isRequired,
        selected: PropTypes.number,
        isMobile: PropTypes.bool
    };

    static defaultProps = {
        isMobile: false
    };

    state = {
        hover: undefined
    };

    _onHover = item =>
        this.setState({ hover: this.props.selected ? undefined : item });

    _onSelect = item => {
        this.setState({ hover: undefined });
        this.props.onSelect(item);
    };

    _unselect = () => this._onSelect(undefined);

    _currentData() {
        const { dataList, selected } = this.props;
        return selected !== undefined ? dataList[selected] : undefined;
    }

    render() {
        const { dataList, selected, isMobile } = this.props;
        const hover = this.state.hover;

        const width = 100 / (dataList.length - 1);
        const data = this._currentData();

        return (
            <div className={styles.front}>
                {/* Overlapped information */}
                <div
                    className={classnames(styles.frontInfo, styles.overlap, {
                        [styles.noInteraction]: !data
                    })}
                >
                    <h1>
                        <span className={styles.title}>Memories of</span>
                        <Rotable
                            start={selected ? selected : hover}
                            options={dataList.map(d => d.title)}
                        />
                        {data && (
                            <span
                                id={styles.clock}
                                onClick={this._unselect}
                                aria-label="Back to front"
                                tabIndex="0"
                            >
                                <Clock />
                            </span>
                        )}
                    </h1>

                    <p>{data ? data.description : "Select a memory"}</p>

                    {data && (
                        <a
                            className={[
                                styles.nextSection,
                                styles.hideText
                            ].join(" ")}
                            href="#gallery"
                        >
                            Next
                        </a>
                    )}
                </div>

                {/* Background slices */}
                <div className={styles.frontBackground}>
                    {dataList &&
                        dataList.map((data, index) => (
                            <Slice
                                key={index}
                                item={index}
                                width={width}
                                image={data.url}
                                isHover={index === hover}
                                isSelected={index === selected}
                                type={isMobile ? "horizontal" : "vertical"}
                                onHover={this._onHover}
                                onSelect={this._onSelect}
                            />
                        ))}
                </div>
                {/* Pexels link */}
                <a
                    className={[styles.pexels, styles.overlap].join(" ")}
                    href="https://www.pexels.com"
                >
                    <img src={pexels} alt="pexels" />
                </a>
            </div>
        );
    }
}

export default Front;
