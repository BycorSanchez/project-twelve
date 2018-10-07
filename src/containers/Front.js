import './Front.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slice from '../components/Slice'
import Rotable from '../components/RotableText'
import Clock from '../components/Clock'
import classnames from 'classnames'
import sizes from 'react-sizes'

class Front extends Component {

    static propTypes = {
        dataList: PropTypes.array.isRequired,
        onSelect: PropTypes.func.isRequired,
        selected: PropTypes.number,
    }

    static sizesToProps({ width }) {
        return { deviceWidth: width };
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

    _isMobile = () => this.props.deviceWidth < 700;

    _anySelected = () => this.props.selected !== undefined;

    render() {
        const { dataList, selected } = this.props;
        const { hover } = this.state;

        const width = 100 / (dataList.length - 1);
        const sliceType = this._isMobile() ? 'horizontal' : 'vertical';

        return (
            <section className="front">

                {/* Overlapped information */}
                <div className={classnames("front-info", "overlap", { "no-interaction": !this._anySelected() })}>
                    <h1>
                        <Rotable
                            text="Memories of"
                            start={selected ? selected : hover}
                            options={dataList.map(d => d.title)}
                        />
                        {
                            this._anySelected() &&
                            (
                                <a
                                    id="clock"
                                    onClick={() => this._onSelect(undefined)}
                                    aria-label="Back to front"
                                >
                                    <Clock />
                                </a>
                            )
                        }
                    </h1>

                    <p>{this._anySelected() ? (dataList[selected].description) : "Select a memory"}</p>

                    {
                        this._anySelected() &&
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
            </section>
        );
    }
}

export default sizes(Front.sizesToProps)(Front)