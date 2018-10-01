import './App.css'
import React, { Component } from 'react'
import Slice from '../components/Slice'
import Rotable from '../components/RotableText'
import Gallery from '../components/Gallery'
import Clock from '../components/Clock'

class App extends Component {

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
    this.setState({ selected: item });
  }

  _anySelected() {
    return this.state.selected !== undefined;
  }

  render() {
    const { dataList, hover, selected } = this.state;
    const width = 100 / (dataList.length - 1);

    return (
      <div className="App">
        <header>
          <h1>
            <Rotable
              text="Memories of"
              mode="manual"
              start={selected ? selected : hover}
              options={dataList.map(d => d.title)} />
          </h1>
        </header>
        <section className="front">
          {
            this._anySelected() &&
            (
              <a
                className="overlap back"
                aria-label="Back to front"
                onClick={() => this._onSelect()}
              >
                <Clock />
              </a>
            )
          }
          {
            this._anySelected() &&
            (<a className="overlap next hide-text" href="#gallery">Next</a>)
          }
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
                onHover={this._onHover}
                onSelect={this._onSelect}
              />
            ))
          }
        </section>
        {
          this._anySelected() &&
          (
            <section id="gallery">
              <Gallery images={dataList.map(d => d.url)} />
            </section>
          )
        }
      </div>
    );
  }
}

export default App