import './Front.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slice from '../components/Slice'
import Rotable from '../components/RotableText'
import Clock from '../components/Clock'
import classnames from 'classnames'

import pexels from '../images/pexels.png'

class Front extends Component {

    static propTypes = {
        dataList: PropTypes.array.isRequired,
        onSelect: PropTypes.func.isRequired,
        selected: PropTypes.number,
        isMobile: PropTypes.bool
    }

    static defaultProps = {
        isMobile: false
    }

    state = {
        hover: undefined
    }

    _onHover = item => {
        this.setState({ hover: this.props.selected ? undefined : item });
    }

    _onSelect = item => {
        this.setState({ hover: undefined });
        this.props.onSelect(item);
    }

    _currentData(dataList, selected) {
        return (selected !== undefined) ? dataList[selected] : undefined;
    }

    render() {
        const { dataList, selected, isMobile } = this.props;
        const { hover } = this.state;

        const width = 100 / (dataList.length - 1);
        const sliceType = isMobile ? 'horizontal' : 'vertical';
        const data = this._currentData(dataList, selected);

        return (
            <section className="front">

                {/* Overlapped information */}
                <div className={classnames("front-info", "overlap", { "no-interaction": !data })}>
                    <h1>
                        {"Memories of "}
                        {
                            //Show rotable text while none is selected
                            data ?
                                data.title :
                                (
                                    <Rotable
                                        start={selected ? selected : hover}
                                        options={dataList.map(d => d.title)}
                                    />
                                )
                        }
                        {
                            data &&
                            (
                                <a
                                    id="clock"
                                    onClick={() => this._onSelect(undefined)}
                                    aria-label="Back to front"
                                    tabIndex="0"
                                >
                                    <Clock />
                                </a>
                            )
                        }
                    </h1>

                    <p>{data ? data.description : "Select a memory"}</p>

                    {
                        data &&
                        (<a className="next-section hide-text" href="#gallery">Next</a>)
                    }
                </div>

                {/* Background slices */}
                <div className="front-background">
                    {
                        dataList &&
                        dataList.map((data, index) => (
                            <Slice
                                key={index}
                                item={index}
                                width={width}
                                image={data.url}
                                isHover={index === hover}
                                isSelected={index === selected}
                                type={sliceType}
                                onHover={this._onHover}
                                onSelect={this._onSelect}
                            />
                        ))
                    }
                </div>
                {/* Pexels link */}
                <a className="pexels overlap" href="https://www.pexels.com">
                    <img src={pexels} alt="pexels" />
                </a>
            </section>
        );
    }
}

export default Front