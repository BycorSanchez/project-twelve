import './App.css'
import React, { Component } from 'react'
import Slice from '../components/Slice'
import Rotable from '../components/RotableText'
import Gallery from '../components/Gallery'
import Clock from '../components/Clock'
import sizes from 'react-sizes'
import classnames from 'classnames'

class App extends Component {

  static sizesToProps({ width }) {
    return { deviceWidth: width };
  };

  state = {
    dataList: [],
    hover: undefined,
    selected: undefined
  }

  componentDidMount() {
    fetch("data/front-data.json")
      .then(r => r.json())
      .then(dataList => this.setState({ dataList }))
      .catch(e => console.error("Front page information could not be loaded"));
  }

  _onHover = item => {
    this.setState(state => ({
      hover: state.selected ? undefined : item
    }));
  }

  _onSelect = item => {
    this.setState({ selected: item, hover: undefined });
  }

  _anySelected() {
    return this.state.selected !== undefined;
  }

  _isMobile() {
    return this.props.deviceWidth < 700;
  }

  render() {
    const { dataList, hover, selected } = this.state;
    const width = 100 / (dataList.length - 1);
    const sliceType = this._isMobile() ? 'horizontal' : 'vertical';

    return (
      <main className="App">
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
                    aria-label="Back to front"
                    onClick={() => this._onSelect()}
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
          <div>
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

        {
          this._anySelected() &&
          (
            <section id="gallery">
              <Gallery images={dataList.map(d => d.url)} />
            </section>
          )
        }
      </main>
    );
  }
}

export default sizes(App.sizesToProps)(App)