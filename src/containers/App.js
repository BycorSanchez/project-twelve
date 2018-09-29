import './App.css';
import React, { Component } from 'react';
import Slice from '../components/Slice';
import Rotable from '../components/RotableText';
import Gallery from '../components/Gallery';
import Clock from '../components/Clock';

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

  onHover = item => {
    this.setState({ hover: item });
  }

  onSelect = item => {
    this.setState({ selected: item });
  }

  anySelected() {
    return this.state.selected !== undefined;
  }

  render() {
    const { dataList, hover, selected } = this.state;
    const width = 100 / (dataList.length - 1);

    return (
      <div className="App">
        <header>
          <h1>
            <Rotable text="Memories of" mode="manual" start={hover} options={dataList.map(d => d.title)} />
          </h1>
        </header>
        <section className="front">
          {
            this.anySelected() &&
            (
              <a className="overlap back" onClick={() => this.onSelect()}>
                <Clock />
              </a>
            )
          }
          {
            this.anySelected() &&
            (
              <a className="overlap forth" href="#gallery"/>
            )
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
                onHover={this.onHover}
                onSelect={this.onSelect}
              />
            ))
          }
        </section>
        {
          this.anySelected() &&
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

export default App;